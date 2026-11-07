const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const context = { window: {} };
vm.createContext(context);
for (const file of ['src/config/site-config.js', 'src/data/content.js', 'src/data/lettering.js', 'src/data/shapes.js', 'src/js/shapes.js']) vm.runInContext(read(file), context);
const { projects, carouselItems } = context.window.PORTFOLIO_CONTENT;
assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
for (const project of projects) for (const char of project.title) {
  if (/\p{Script=Hebrew}/u.test(char)) assert(context.window.PORTFOLIO_LETTERING[char], 'Missing handwritten letter: ' + char);
}
const resource = (url, parent = root) => {
  if (!url || !url.startsWith('.')) return;
  const target = path.resolve(parent, url.split('?')[0].split('#')[0]);
  assert(target.startsWith(root + path.sep), 'Resource escapes project: ' + url);
  assert(fs.existsSync(target), 'Missing resource: ' + url);
};
for (const project of projects) {
  resource(project.cover);
  for (const item of project.media) { resource(item.src); resource(item.poster); }
}
for (const item of carouselItems) { resource(item.src); for (const frame of item.frames || []) resource(frame); }
for (const url of Object.values(context.window.PORTFOLIO_CONFIG.favicons)) resource(url);
for (const match of read('index.html').matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)) resource(match[1]);
for (const match of read('src/css/style.css').matchAll(/url\(['"]?(\.\.[^'"\)]+)['"]?\)/g)) resource(match[1], path.join(root, 'src/css'));
const app = read('src/js/portfolio.js');
const paletteFunctions = app.slice(app.indexOf('function activePaletteSize'), app.indexOf('function refreshCarouselColors'));
for (let size = 2; size <= 9; size++) {
  const paletteContext = {
    window: { PORTFOLIO_CONFIG: { palettePresets: { test: Array(size).fill('#123456') } } },
    document: { documentElement: { dataset: { palette: 'test' } } }
  };
  vm.createContext(paletteContext);
  vm.runInContext(paletteFunctions, paletteContext);
  assert.equal(paletteContext.activePaletteSize(), size);
  for (let count = 2; count <= 50; count++) {
    const colors = paletteContext.carouselColorIndices(count);
    assert(colors.length >= count);
    assert.equal(colors.length % size, 0);
    assert.equal(new Set(colors).size, size);
    assert(colors.every((c, i) => c >= 0 && c < size && c !== colors[(i + 1) % colors.length]));
    const counts = Array.from({ length: size }, (_, c) => colors.filter(x => x === c).length);
    assert.equal(Math.max(...counts), Math.min(...counts));
  }
}
console.log(`Passed: ${projects.length} projects, local resources, and balanced looping palettes with 2–9 colors and 2–50 requested tiles.`);

for (const shapes of Object.values(context.window.PORTFOLIO_SHAPES)) {
  assert.equal(shapes.length, 10);
  const pick = context.window.createPortfolioShapePicker(shapes.length);
  for (let round = 0; round < 10; round++) {
    const indices = Array.from({ length: shapes.length }, () => pick());
    assert.equal(new Set(indices).size, shapes.length);
    assert(indices.every(index => index >= 0 && index < shapes.length));
  }
}
console.log("Passed: every approved square and star is used once per shuffled bag.");

for (const folder of ["src/js", "src/data", "src/config"]) {
 for (const name of fs.readdirSync(path.join(root, folder))) if (name.endsWith(".js")) new vm.Script(read(folder + "/" + name));
}
for (const char of "בואו ניצור משהו יפה ביחד(:)") if (char !== " ") assert(context.window.PORTFOLIO_LETTERING[char], "Missing footer glyph: " + char);
console.log("Passed: all JavaScript syntax and contact lettering glyphs.");

const columnsContext = {};
vm.createContext(columnsContext);
const appSource = read("src/js/portfolio.js");
vm.runInContext(appSource.slice(appSource.indexOf("function desktopColumnCount"), appSource.indexOf("function renderCards")), columnsContext);
for (const [count, columns] of [[8,4],[9,3],[10,5],[12,4],[15,5]]) assert.equal(columnsContext.desktopColumnCount(count), columns);
console.log("Passed: automatic full desktop rows for supported counts.");
