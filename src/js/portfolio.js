const { carouselItems, carouselSettings, projects } = window.PORTFOLIO_CONTENT;

const dialog = document.querySelector("#project-page");
const detailMedia = document.querySelector("#detail-media");
const projectTitle = document.querySelector("#project-title");
let previousFocus;
let openedFromCard = false;
let openedWithKeyboard = false;
let openingRect;
let openingStar;
let panelOrigin = "translate(0, 0) scale(.2)";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function tagLink(tag) {
  const link = element("a", "tag", tag);
  link.href = "#tag/" + encodeURIComponent(tag);
  return link;
}

function renderTags(container, tags) {
  container.replaceChildren(...tags.map(tagLink));
}

const squareShapes = window.PORTFOLIO_SHAPES.square;
const nextSquareShape = window.createPortfolioShapePicker(squareShapes.length);
function insetFramePath(path, scale) {
  let coordinate = 0;
  return path.replace(/-?\d*\.?\d+/g, value => {
    coordinate++;
    return (100 + (Number(value) - 100) * scale).toFixed(2);
  });
}
function changePencilOutline(card, colorToken = "--outline-color", retainShape = false) {
  const previous = Number(card.dataset.outline ?? -1);
  const index = retainShape && previous >= 0 ? previous : nextSquareShape(previous);
  card.dataset.outline = index;
  const theme = getComputedStyle(card);
  const outer = squareShapes[index];
  const projectFrame = card.classList.contains("project-card");
  const scale = Number(theme.getPropertyValue(projectFrame ? "--card-frame-inner-scale" : "--social-frame-inner-scale")) || (projectFrame ? .93 : .82);
  const inner = insetFramePath(squareShapes[(index + 3) % squareShapes.length], scale);
  const imageOpening = insetFramePath(squareShapes[(index + 3) % squareShapes.length], scale + .012);
  const color = theme.getPropertyValue(colorToken).trim();
  const wrap = content => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="12 12 176 176" preserveAspectRatio="none">' + content + '</svg>';
  const frame = wrap('<path d="' + outer + ' ' + inner + '" fill="' + color + '" fill-rule="evenodd"/>');
  if (card.classList.contains("project-card")) {
    card.style.setProperty("--chalk-fill", 'url("data:image/svg+xml,' + encodeURIComponent(wrap('<path d="' + outer + '" fill="' + color + '"/>')) + '")');
    card.style.setProperty("--picture-mask", 'url("data:image/svg+xml,' + encodeURIComponent(wrap('<path d="' + imageOpening + '" fill="white"/>')) + '")');
    card.style.setProperty("--pencil-outline", 'url("data:image/svg+xml,' + encodeURIComponent(frame) + '")');
  } else {
    const visibleFrame = frame.replace('<svg ', '<svg class="pencil-frame" aria-hidden="true" ');
    const existingFrame = card.querySelector(".pencil-frame");
    if (existingFrame) existingFrame.outerHTML = visibleFrame;
    else card.insertAdjacentHTML("beforeend", visibleFrame);
    card.classList.add("has-pencil-frame");
  }
}

function desktopColumnCount(count) {
  const options = [5, 4, 3];
  return options.find(columns => count % columns === 0) || options.reduce((best, columns) => {
    const gaps = Math.ceil(count / columns) * columns - count;
    const bestGaps = Math.ceil(count / best) * best - count;
    return gaps < bestGaps ? columns : best;
  });
}

function renderCards() {
  document.querySelector("#project-grid").style.setProperty("--desktop-columns", desktopColumnCount(projects.length));
  document.querySelector("#project-grid").replaceChildren(...projects.map(project => {
    const card = element("a", "project-card");
    card.href = "#project/" + project.id;
    card.setAttribute("aria-haspopup", "dialog");
    changePencilOutline(card);
    card.addEventListener("pointerenter", () => changePencilOutline(card));
    card.addEventListener("focus", () => changePencilOutline(card));
    card.addEventListener("click", event => {
      openedWithKeyboard = event.detail === 0;
      previousFocus = card;
      openingRect = card.getBoundingClientRect();
      openedFromCard = true;
    });
    const heading = element("h2", "card-title", project.title);
    window.renderPortfolioLettering(heading, project.title);
    const picture = element("div", "card-picture" + (project.contain ? " contain" : ""));
    const image = element("img");
    image.src = project.cover;
    if (project.cover.endsWith("/dj-mayu.png") || project.cover.endsWith("/digital-products.svg")) image.classList.add("theme-drawing");
    image.alt = project.title;
    image.width = 600;
    image.height = 600;
    image.loading = "lazy";
    picture.append(image);
    const content = element("div", "card-content");
    content.append(picture);
    card.append(heading, content);
    if (project.note) card.append(element("p", "card-note", project.note));
    const entry = element("article", "project-entry");
    const tags = element("div", "tags");
    tags.setAttribute("aria-label", "תגיות הפרויקט");
    renderTags(tags, project.tags);
    entry.append(card, tags);
    return entry;
  }));
    const titleSvgs = [...document.querySelectorAll(".card-title .handwritten-heading")];
    const longest = Math.max(...titleSvgs.map(svg => svg.viewBox.baseVal.width));
    for (const svg of titleSvgs) {
      const width = svg.viewBox.baseVal.width;
      svg.setAttribute("viewBox", [-(longest - width) / 2, 0, longest, 130].join(" "));
      svg.style.aspectRatio = longest + " / 130";
    }

}

function mediaFigure(item) {
  const figure = element("figure", "media-item");
  const media = element(item.type === "video" ? "video" : "img");
  media.src = item.src;
  if (item.src.endsWith("/dj-mayu.png")) media.classList.add("theme-drawing");
  if (item.type === "video") {
    media.controls = true;
    media.playsInline = true;
    media.preload = "none";
    media.poster = item.poster || "";
    media.setAttribute("aria-label", item.alt);
  } else {
    media.alt = item.alt;
    media.loading = "lazy";
  }
  figure.append(media);
  if (item.caption) {
    const caption = element("figcaption");
    const text = element(item.link ? "a" : "span", "", item.caption);
    if (item.link) text.href = item.link;
    caption.append(text);
    figure.append(caption);
  }
  const tags = element("div", "tags");
  tags.setAttribute("aria-label", "תגיות המדיה");
  renderTags(tags, item.tags);
  figure.append(tags);
  return figure;
}

function stopDetailVideos() {
  detailMedia.querySelectorAll("video").forEach(video => video.pause());
}

function restoreProjectFocus() {
  if (openedWithKeyboard) previousFocus?.focus({ preventScroll: true });
  else previousFocus?.blur();
}

function updatePanelAccent() {
  const projectId = dialog.dataset.project;
  const source = openingStar || (projectId
    ? document.querySelector(`a[href="#project/${projectId}"]`)
    : null);
  const theme = getComputedStyle(source || document.documentElement);
  const accent = theme.getPropertyValue(openingStar ? "--carousel-color" : source ? "--card-accent" : "--accent-1").trim();
  dialog.style.setProperty("--panel-accent", accent);
}

let closingAnimation;
let routeRevision = 0;

function showRoute() {
  routeRevision++;
  closingAnimation?.cancel();
  closingAnimation = undefined;
  projectTitle.dataset.letteringDirection = document.documentElement.lang === "en" ? "ltr" : "rtl";
  const [kind, encodedValue] = location.hash.slice(1).split("/");
  if (kind !== "project" && kind !== "tag") {
    stopDetailVideos();
    dialog.close();
    restoreProjectFocus();
    return;
  }

  let value;
  try { value = decodeURIComponent(encodedValue || ""); }
  catch { return; }

  const project = projects.find(item => item.id === value);
  let media;
  if (kind === "project" && project) {
    dialog.dataset.project = project.id;
    updatePanelAccent();
    window.renderPortfolioLettering(projectTitle, project.title);
    document.querySelector("#project-description").textContent = project.description;
    renderTags(document.querySelector("#project-tags"), project.tags);
    media = project.media;
  } else if (kind === "tag") {
    delete dialog.dataset.project;
    updatePanelAccent();
    window.renderPortfolioLettering(projectTitle, value);
    document.querySelector("#project-description").textContent = "כל העבודות עם התגית ״" + value + "״";
    document.querySelector("#project-tags").replaceChildren();
    media = [...new Map(projects.flatMap(item => item.media).filter(item => item.tags.includes(value)).map(item => [item.src, item])).values()];
  } else {
    return;
  }

  stopDetailVideos();
  detailMedia.replaceChildren(...media.map(mediaFigure));
  if (!dialog.open) {
    dialog.showModal();
    if (openingRect && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const bounds = dialog.getBoundingClientRect();
      const x = openingRect.left + openingRect.width / 2 - bounds.left - bounds.width / 2;
      const y = openingRect.top + openingRect.height / 2 - bounds.top - bounds.height / 2;
      panelOrigin = `translate(${x}px, ${y}px) scale(${Math.min(openingRect.width / bounds.width, openingRect.height / bounds.height)})`;
      dialog.animate([
        { transform: panelOrigin, opacity: 0 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
      ], { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" });
    }
    openingRect = null;
  }
  dialog.querySelector(".project-page-scroll").scrollTop = 0;
  projectTitle.focus({ preventScroll: true });
}

async function closeProject() {
  if (closingAnimation || !dialog.open) return;
  const revision = routeRevision;
  const route = location.hash;
  stopDetailVideos();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const animation = dialog.animate([
      { transform: "translateY(0) scale(1)", opacity: 1 },
      { transform: panelOrigin, opacity: 0 },
    ], { duration: 400, easing: "cubic-bezier(.4,0,.2,1)" });
    closingAnimation = animation;
    try {
      await animation.finished;
    } catch (error) {
      if (error.name !== "AbortError") throw error;
      return;
    } finally {
      if (closingAnimation === animation) closingAnimation = undefined;
    }
  }
  if (revision !== routeRevision || route !== location.hash) return;
  dialog.close();
  if (openedFromCard && location.hash.startsWith("#project/")) {
    history.back();
  } else {
    history.replaceState(null, "", location.pathname + location.search);
    restoreProjectFocus();
  }
  openedFromCard = false;
}

document.querySelector("#close-project").addEventListener("click", closeProject);
dialog.addEventListener("cancel", event => {
  event.preventDefault();
  closeProject();
});
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeProject();
});
window.addEventListener("hashchange", showRoute);

function activePaletteSize() {
  return window.PORTFOLIO_CONFIG.palettePresets[document.documentElement.dataset.palette].length;
}

function carouselColorIndices(count) {
  const colorCount = activePaletteSize();
  const tileCount = Math.ceil(count / colorCount) * colorCount;
  return Array.from({ length: tileCount }, (_, index) => index % colorCount);
}

function refreshCarouselColors() {
  document.querySelectorAll(".carousel-set").forEach(set => {
    const colors = carouselColorIndices(set.children.length);
    [...set.children].forEach((tile, index) => {
      tile.style.setProperty("--carousel-color", `var(--accent-${colors[index] + 1})`);
    });
  });
}

const frameTimers = [];
const frameReadiness = [];
function renderCarousel() {
  frameTimers.splice(0).forEach(clearInterval);
  const track = document.querySelector("#carousel-track");
  const colorIndices = carouselColorIndices(Math.max(carouselSettings.minimumTiles, carouselItems.length, window.PORTFOLIO_SHAPES.star.length));
  const count = colorIndices.length;
  track.style.setProperty("--carousel-duration", count * carouselSettings.secondsPerTile + "s");
  const nextStarShape = window.createPortfolioShapePicker(window.PORTFOLIO_SHAPES.star.length);
  let previousStar = -1;
  const starIndices = Array.from({ length: count }, () => (previousStar = nextStarShape(previousStar)));
  for (let group = 0; group < 2; group++) {
    const set = element("div", "carousel-set");
    set.setAttribute("aria-hidden", "true");
    for (let index = 0; index < count; index++) {
      const item = carouselItems[index % carouselItems.length];
      const tile = element("div", "carousel-tile");

      tile.setAttribute("aria-label", "DJ והפקת מוזיקה");
      const shapeIndex = starIndices[index];
      const shape = window.PORTFOLIO_SHAPES.star[shapeIndex];
      const star = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="${shape}" fill="white"/></svg>`;
      tile.dataset.starShape = shapeIndex;
      tile.style.setProperty("--star-shape", `url("data:image/svg+xml,${encodeURIComponent(star)}")`);
      tile.style.setProperty("--carousel-color", `var(--accent-${colorIndices[index] + 1})`);
      const media = element(item.type === "video" ? "video" : "img");
      media.src = item.frames?.[0] || item.src;
      if (item.type === "video") {
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
      } else {
        media.alt = "";
      }
      // Decode once, then reveal already-loaded layers; never replace a playing frame URL.
      if (item.frames?.length > 1) {
        const layers = item.frames.map((src, frame) => {
          const image = frame === 0 ? media : element("img");
          image.src = src; image.alt = ""; image.style.visibility = frame === 0 ? "visible" : "hidden";
          if(frame) tile.append(image);
          return image;
        });
        const ready = Promise.all(layers.map(image => image.decode()));
        frameReadiness.push(ready);
        ready.then(() => {
          if(!media.isConnected) return;
          let step = 0;
          const last = layers.length - 1;
          frameTimers.push(setInterval(() => {
            if(document.hidden || reducedMotion.matches) return;
            step = (step + 1) % (last * 2);
            const frame = step <= last ? step : last * 2 - step;
            layers.forEach((image, index) => image.style.visibility = index === frame ? "visible" : "hidden");
          }, item.frameDuration || 280));
        }).catch(() => { /* Keep the first frame visible if another frame cannot load. */ });
      }
      tile.append(media);
      const label = element("span", "star-label star-label-" + (index % 4));
      window.renderPortfolioLettering(label, "DJ והפקת סאונד");
      tile.append(label);
      set.append(tile);
    }
    track.append(set);
  }
}

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const carousel = document.querySelector(".carousel");

function updateCarouselMotion() {
  const paused = reducedMotion.matches || document.hidden;
  carousel.classList.toggle("is-paused", paused);
  carousel.querySelectorAll("video").forEach(video => {
    if (paused) video.pause();
    else video.play().catch(() => {});
  });
}
reducedMotion.addEventListener("change", updateCarouselMotion);
document.addEventListener("visibilitychange", updateCarouselMotion);

const greeting = document.querySelector(".greeting");
const greetingText = greeting.querySelector("span");
let introPlaying = false;
let lastGreetingWidth = -1;
function fitGreeting() {
  if (introPlaying) return;
  const nextWidth = document.querySelector("#intro-title").clientWidth;
  if (Math.abs(nextWidth - lastGreetingWidth) < 1) return;
  lastGreetingWidth = nextWidth;
  const heading = document.querySelector("#intro-title");
  const nameLine = document.querySelector(".name-line");
  heading.style.fontSize = "";
  greetingText.style.transform = "";
  const measure = count => {
    greetingText.innerHTML = '<i class="canva-letter canva-he"></i>' + '<i class="canva-letter canva-yod"></i>'.repeat(count);
    return greetingText.getBoundingClientRect().width;
  };
  const currentSize = parseFloat(getComputedStyle(heading).fontSize);
  const gap = parseFloat(getComputedStyle(heading).columnGap) || 0;
  const minimumWidth = nameLine.getBoundingClientRect().width + measure(2) + gap;
  if (minimumWidth > heading.clientWidth) {
    heading.style.fontSize = (currentSize * heading.clientWidth / minimumWidth).toFixed(2) + "px";
  }
  const availableWidth = greeting.clientWidth;
  if (!availableWidth) return;
  let low = 1;
  let high = 2;
  while (measure(high) <= availableWidth) high *= 2;
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2);
    if (measure(middle) <= availableWidth) low = middle;
    else high = middle;
  }
  greetingText.style.transform = "scaleX(" + availableWidth / measure(low) + ")";
}

function renderContactLettering() {
  if (document.querySelector("#contact-lettering .footer-static")) return;
  const text = matchMedia("(max-width: 48rem)").matches ? "בואו ניצור\nמשהו יפה ביחד (:" : "בואו ניצור משהו יפה ביחד (:";
  window.renderPortfolioLettering(document.querySelector("#contact-lettering"), text);
}
renderContactLettering();
matchMedia("(max-width: 48rem)").addEventListener("change", renderContactLettering);
document.querySelectorAll("[data-lettering]").forEach(node => window.renderPortfolioLettering(node, node.dataset.lettering));
renderCards();
document.querySelectorAll(".social-icon").forEach(link => {
  changePencilOutline(link, "--social-outline");
});

function refreshThemeOutlines() {
  const colorCount = activePaletteSize();
  document.querySelectorAll(".project-entry").forEach((entry, index) => {
    const accent = `var(--accent-${index % colorCount + 1})`;
    entry.style.setProperty("--outline-color", accent);
    entry.style.setProperty("--card-accent", accent);
  });
  updatePanelAccent();
  refreshCarouselColors();
  document.querySelectorAll(".project-card").forEach(card => changePencilOutline(card, "--outline-color", true));
  document.querySelectorAll(".social-icon").forEach(link => changePencilOutline(link, "--social-outline", true));
}
document.addEventListener("portfolio-theme-change", refreshThemeOutlines);
// Cards inherit their individual colors from the completed grid.
refreshThemeOutlines();

// On touch screens, highlight the card closest to the center of the viewport.
const touchLayout = matchMedia("(hover: none)");
const cards = [...document.querySelectorAll(".project-card")];
let highlightFrame = 0;
function updateTouchHighlight() {
  highlightFrame = 0;
  let closestCard;
  let shortestDistance = Infinity;
  if (touchLayout.matches) {
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
      if (rect.bottom > 0 && rect.top < innerHeight && distance < shortestDistance) {
        closestCard = card;
        shortestDistance = distance;
      }
    }
  }
  cards.forEach(card => {
    if (card === closestCard && !card.classList.contains("is-in-view")) changePencilOutline(card);
    card.classList.toggle("is-in-view", card === closestCard);
  });
}
function scheduleTouchHighlight() {
  if (!highlightFrame) highlightFrame = requestAnimationFrame(updateTouchHighlight);
}
addEventListener("scroll", scheduleTouchHighlight, { passive: true });
addEventListener("resize", scheduleTouchHighlight);
touchLayout.addEventListener("change", scheduleTouchHighlight);
updateTouchHighlight();
renderCarousel();
updateCarouselMotion();
showRoute();
new ResizeObserver(fitGreeting).observe(greeting);
// Vector lettering does not depend on the body font loading.
fitGreeting();

document.addEventListener("dragstart", event => event.preventDefault());

function playHeadingIntro() {
 const root=document.documentElement;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches) {root.classList.remove("intro-pending");return;}
 introPlaying=true;
 const english=document.documentElement.lang==="en";
 const letters=english?[...document.querySelectorAll(".english-intro > span")]:[...greetingText.children];
 const step=Math.min(65, 620 / Math.max(1, letters.length));
 const pop=(node,delay,duration=100)=>node.animate([
  {opacity:0,clipPath:english?"inset(0 100% 0 0)":"inset(0 0 0 100%)"},
  {opacity:1,clipPath:"inset(0 0 0 0)"}
 ],{delay,duration,easing:"steps(2,end)",fill:"both"});
 const animations=letters.map((letter,index)=>pop(letter,index*step,130));
 const words=english?[]:[document.querySelector(".canva-zot"),document.querySelector(".name")];
 words.forEach((word,index)=>animations.push(pop(word,letters.length*step+90+index*190,210)));
 root.classList.remove("intro-pending");
 Promise.all(animations.map(animation=>animation.finished)).then(()=>{
  animations.forEach(animation=>animation.cancel());
  introPlaying=false;fitGreeting();
 });
}
async function revealPreparedPage() {
 const elapsed = performance.now() - (window.portfolioLoadingStarted || 0);
 const minimum = Math.max(0, 1200 - elapsed);
 const assets = [document.fonts.ready, ...frameReadiness, ...[...document.querySelectorAll(".skating-frame")].map(image=>image.decode())];
 let assetsReadyAt=performance.now(), failedAssets=0, assetWaitTimedOut=false;
 const assetsReady=Promise.allSettled(assets).then(results=>{assetsReadyAt=performance.now();failedAssets=results.filter(result=>result.status==="rejected").length;});
 let timeout;
 const deadline = new Promise(resolve => {
  timeout = setTimeout(() => { assetWaitTimedOut = true; resolve(); }, 3500);
 });
 await Promise.all([Promise.race([assetsReady, deadline]), new Promise(resolve => setTimeout(resolve, minimum))]);
 clearTimeout(timeout);
 await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
 fitGreeting();
 document.documentElement.classList.remove("site-loading");
 document.querySelector("#site-loader")?.remove();
 const shownAt=performance.now();
 window.portfolioLoadHistory?.record({assetsReadyMs:Math.round(assetsReadyAt),pageShownMs:Math.round(shownAt),minimumLoaderExtraMs:Math.round(Math.max(0,shownAt-assetsReadyAt)),failedAssets,assetWaitTimedOut});
 requestAnimationFrame(playHeadingIntro);
}
revealPreparedPage();

// One motion controller keeps autoplay, dragging, and touch reading focus in sync.
(() => {
 const viewport=document.querySelector(".carousel-window"), track=document.querySelector("#carousel-track");
 const touch=matchMedia("(hover:none), (pointer:coarse)");
 let onScreen=true;
 new IntersectionObserver(([entry])=>{ onScreen=entry.isIntersecting; }).observe(viewport);
 let offset=0, last=0, focusCheck=0, drag=null, suppressClick=false, speed=1, momentum=0, focusedStar=null, focusStarted=0;
 const wrap=()=>{const width=track.scrollWidth/2;if(width)offset=((offset%width)+width)%width;};
 const paint=()=>track.style.transform="translate3d("+(-offset)+"px,0,0)";
 viewport.addEventListener("pointerdown",e=>{
  if(e.button!==0)return;
  momentum=0;drag={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,time:e.timeStamp,velocity:0,moved:false};
 });
 viewport.addEventListener("pointermove",e=>{
  if(!drag||drag.id!==e.pointerId)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.moved&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag=null;return;}
  if(!drag.moved&&Math.abs(dx)>7){drag.moved=true;viewport.setPointerCapture(e.pointerId);viewport.classList.add("is-dragging");}
  if(drag.moved){const elapsed=Math.max(8,e.timeStamp-drag.time);const velocity=-(e.clientX-drag.lastX)/elapsed*1000;drag.velocity=drag.velocity*.3+velocity*.7;offset-=e.clientX-drag.lastX;wrap();paint();e.preventDefault();}
  drag.lastX=e.clientX;drag.time=e.timeStamp;
 });
 function end(e){if(!drag)return;suppressClick=drag.moved;momentum=drag.moved&&e.type!=="pointercancel"&&e.timeStamp-drag.time<100?Math.max(-3000,Math.min(3000,drag.velocity)):0;if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);drag=null;viewport.classList.remove("is-dragging");setTimeout(()=>suppressClick=false,0);}
 viewport.addEventListener("pointerup",end);viewport.addEventListener("pointercancel",end);
 viewport.addEventListener("click",e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();}},true);
 function tick(now){
  const dt=Math.min((now-last)/1000||0,.05);last=now;
  if (!onScreen || document.hidden || (reducedMotion.matches && !drag)) { requestAnimationFrame(tick); return; }
  let readingStrength=0;
  if(touch.matches){
   if(now-focusCheck>24){
    focusCheck=now;
    const center = innerWidth / 2;
    const zone = innerWidth * .20;
    const measurements = Array.from(track.querySelectorAll(".carousel-tile"), tile => {
     const bounds = tile.getBoundingClientRect();
     return { tile, distance: Math.abs(bounds.left + bounds.width / 2 - center) };
    });
    for (const { tile, distance: d } of measurements) {
     const raw=Math.max(0,1-d/zone);
     const strength=(!drag&&Math.abs(momentum)<100)?raw*raw*(3-2*raw):0;
     tile.style.setProperty("--reading-strength",strength.toFixed(4));
     tile.classList.toggle("is-reading",strength>0);
    }
   }

  }
  const paused=document.hidden||reducedMotion.matches||dialog.open||(!touch.matches&&track.matches(":hover"))||!!drag;
  readingStrength=Number(track.querySelector(".is-reading")?.style.getPropertyValue("--reading-strength")||0);
  const target=1-.45*readingStrength;speed+=(target-speed)*Math.min(1,dt*9);
  const loop=track.scrollWidth/2;
  if(!paused&&loop){const duration=parseFloat(track.style.getPropertyValue("--carousel-duration"))||70;offset+=loop/duration*dt*speed;wrap();paint();}
  if(!document.hidden&&!reducedMotion.matches&&!dialog.open&&!drag&&Math.abs(momentum)>.5){offset+=momentum*dt;momentum*=Math.exp(-3.2*dt);wrap();paint();}
  requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
})();

/* Drive the actual document scroll so the custom thumb and flower follow it. */
(() => {
  let frame = 0;
  const cancel = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };
  for (const event of ["wheel", "touchstart", "pointerdown", "keydown", "popstate"]) {
    window.addEventListener(event, cancel, { passive: true });
  }
  document.addEventListener("click", event => {
    const link = event.target.closest?.('a[href="#contact"], a[href="#top"]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    cancel();

    const start = scrollY;
    const limit = document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight;
    const end = Math.max(0, Math.min(limit, start + target.getBoundingClientRect().top));
    const finish = () => {
      frame = 0;
      window.scrollTo({ top: end, behavior: "instant" });
      if (location.hash !== link.hash) history.pushState(null, "", link.hash);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(end - start) < 1) {
      finish();
      return;
    }

    const started = performance.now();
    const duration = 240;
    const move = now => {
      const progress = Math.min(1, (now - started) / duration);
      if (progress === 1) { finish(); return; }
      const ease = 1 - (1 - progress) ** 3;
      window.scrollTo({ top: start + (end - start) * ease, behavior: "instant" });
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
  });
})();
