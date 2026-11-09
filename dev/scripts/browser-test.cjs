const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.mp4': 'video/mp4' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, pathname.replace(/^\/portfolio\/dev\//, '') || 'index.html');
    if (!file.startsWith(root + path.sep)) { res.writeHead(404).end(); return; }
    const bytes = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }).end(bytes);
  } catch { res.writeHead(404).end(); }
});

async function ready(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('#site-loader').waitFor({ state: 'hidden', timeout: 8000 });
}

async function run() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:' + server.address().port + '/portfolio/dev/';
  const browser = await chromium.launch(process.env.PORTFOLIO_BROWSER_CHANNEL ? { channel: process.env.PORTFOLIO_BROWSER_CHANNEL } : {});
  try {
    for (const [width, height] of [[320, 568], [390, 844], [844, 390], [1280, 800], [5120, 2200]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: width < 600 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => {
        if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.status() + ' ' + response.url());
      });
      await ready(page, base);
      const layout = await page.evaluate(() => {
        const rect = selector => document.querySelector(selector).getBoundingClientRect();
        const letter = rect('.canva-he'), bar = rect('body > .custom-scroll .custom-scroll-thumb');
        const header = ['.wordmark', '.header-controls', '.top-nav'].map(rect);
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          headerFits: header.every(item => item.left >= 0 && item.right <= innerWidth + 1) && header[0].right <= header[1].left + 1 && header[1].right <= header[2].left + 1,
          scrollbarGap: bar.left - letter.right,
          alignment: Math.abs(bar.top - letter.top - letter.height * .034),
          hasTile: !!document.querySelector('.carousel-tile'),
          desktopFooter: getComputedStyle(document.querySelector('.footer-desktop')).display !== 'none'
        };
      });
      assert(layout.overflow <= 1 && layout.headerFits, JSON.stringify({ width, layout }));
      assert(layout.scrollbarGap >= 3 && layout.alignment < 2 && layout.hasTile, JSON.stringify({ width, layout }));
      assert.equal(layout.desktopFooter, width >= 640);
      await page.getByRole('link', { name: 'יצירת קשר', exact: true }).click();
      await page.waitForFunction(() => location.hash === '#contact' && scrollY > 0);
      assert(await page.getByRole('heading', { name: 'בואו ניצור משהו יפה ביחד :)' }).isVisible());
      for (const scheme of ['instagram.com', 'wa.me', 'mailto:']) {
        assert(await page.locator('#contact a[href*="' + scheme + '"]').isVisible());
      }
      await page.getByRole('link', { name: 'לראש הדף', exact: true }).click();
      await page.waitForFunction(() => scrollY <= 1);
      assert.deepEqual(errors, []);
      console.log('PASS layout, assets, contact and return-to-top at ' + width + ' × ' + height);
      await page.close();
    }

    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce', colorScheme: 'light' });
    await ready(page, base);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.activeElement.id === 'content');
    await page.evaluate(() => scrollTo(0, 0));
    const theme = page.locator('#theme-toggle');
    await theme.click();
    assert.equal(await theme.getAttribute('aria-checked'), 'true');
    await page.getByRole('link', { name: 'יצירת קשר', exact: true }).click();
    await page.waitForFunction(() => scrollY > 0);
    await page.reload();
    await page.locator('#site-loader').waitFor({ state: 'hidden' });
    assert.equal(await theme.getAttribute('aria-checked'), 'true');
    assert(await page.evaluate(() => scrollY <= 1 && location.hash === ''));
    const music = page.locator('#music-toggle');
    if (await music.getAttribute('aria-pressed') !== 'true') await music.click();
    await page.waitForFunction(() => document.querySelector('#music-toggle').dataset.musicState === 'playing');
    await music.click();
    assert.equal(await music.getAttribute('aria-pressed'), 'false');
    const pencil = page.locator('#pencil-toggle');
    await pencil.click();
    assert.equal(await pencil.getAttribute('aria-pressed'), 'true');
    await page.mouse.move(140, 300);
    await page.mouse.down();
    await page.mouse.move(230, 310, { steps: 8 });
    await page.mouse.up();
    await page.waitForFunction(() => {
      const canvas = document.querySelector('.background-drawing');
      return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data.some((v, i) => i % 4 === 3 && v > 0);
    });
    await pencil.click();
    assert.equal(await pencil.getAttribute('aria-pressed'), 'false');
    await page.locator('body > .custom-scroll').click();
    await page.waitForFunction(() => scrollY > 0);
    await ready(page, base + '#project/mix');
    assert(await page.locator('#project-page').isVisible());
    await page.keyboard.press('Escape');
    await page.locator('#project-page').waitFor({ state: 'hidden' });
    console.log('PASS keyboard skip link, theme persistence, reload, audio state, drawing, scrollbar and project dialog');
    await page.close();

    const race = await browser.newPage();
    await ready(race, base + '#project/mix');
    await race.locator('#close-project').click();
    await race.evaluate(() => { location.hash = '#tag/test'; });
    await race.waitForFunction(() => !document.querySelector('#project-page').dataset.project);
    await race.waitForTimeout(450);
    assert.equal(new URL(race.url()).hash, '#tag/test');
    assert(await race.locator('#project-page').isVisible());
    await race.keyboard.press('Escape');
    await race.locator('#project-page').waitFor({ state: 'hidden' });
    await race.close();
    console.log('PASS dialog route survives an interrupted close');

    const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    await touch.addInitScript(() => {
      const measure = Element.prototype.getBoundingClientRect;
      const counts = new WeakMap();
      window.duplicateCarouselReads = 0;
      let frame = 0;
      function nextFrame() { frame++; requestAnimationFrame(nextFrame); }
      requestAnimationFrame(nextFrame);
      Element.prototype.getBoundingClientRect = function () {
        if (this.matches('.carousel-tile')) {
          if (counts.get(this) === frame) window.duplicateCarouselReads++;
          counts.set(this, frame);
        }
        return measure.call(this);
      };
    });
    await ready(touch, base);
    await touch.waitForFunction(() => document.querySelector('.carousel-tile').style.getPropertyValue('--reading-strength'));
    assert.equal(await touch.evaluate(() => window.duplicateCarouselReads), 0);
    await touch.close();
    console.log('PASS touch carousel reads each tile once per frame');

    const noJs = await browser.newPage({ javaScriptEnabled: false });
    await ready(noJs, base);
    assert(await noJs.locator('main').isVisible());
    assert(await noJs.getByRole('link', { name: 'יצירת קשר', exact: true }).isVisible());
    await noJs.close();
    console.log('PASS no-JavaScript fallback');

    const slow = await browser.newPage({ reducedMotion: 'reduce' });
    await slow.route('**/skating-cycle-1.webp', () => {});
    await ready(slow, base);
    assert(await slow.locator('main').isVisible());
    await slow.waitForFunction(() => window.portfolioLoadHistory.read().at(-1)?.assetWaitTimedOut === true);
    await slow.close();
    console.log('PASS stalled asset does not block the page');
  } finally { await browser.close(); }
}

run().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
