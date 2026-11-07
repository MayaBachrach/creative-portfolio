const { carouselItems, carouselSettings, projects } = window.PORTFOLIO_CONTENT;

const dialog = document.querySelector("#project-page");
const detailMedia = document.querySelector("#detail-media");
const projectTitle = document.querySelector("#project-title");
let previousFocus;
let openedFromCard = false;
let openedWithKeyboard = false;
let openingRect;

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
  const source = projectId
    ? document.querySelector(`a[href="#project/${projectId}"]`)
    : null;
  const theme = getComputedStyle(source || document.documentElement);
  const accent = theme.getPropertyValue(source ? "--card-accent" : "--accent-1").trim();
  dialog.style.setProperty("--panel-accent", accent);
}

function showRoute() {
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
      const x = Math.max(-120, Math.min(120, openingRect.left + openingRect.width / 2 - bounds.left - bounds.width / 2));
      const y = Math.max(-80, Math.min(80, openingRect.top + openingRect.height / 2 - bounds.top - bounds.height / 2));
      dialog.animate([
        { transform: `translate(${x}px, ${y}px) scale(.88)`, opacity: 0 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
      ], { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" });
    }
    openingRect = null;
  }
  dialog.querySelector(".project-page-scroll").scrollTop = 0;
  projectTitle.focus({ preventScroll: true });
}

let closingProject = false;
async function closeProject() {
  if (closingProject || !dialog.open) return;
  closingProject = true;
  stopDetailVideos();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    await dialog.animate([
      { transform: "translateY(0) scale(1)", opacity: 1 },
      { transform: "translateY(10px) scale(.985)", opacity: 0 },
    ], { duration: 180, easing: "ease-out" }).finished;
  }
  dialog.close();
  closingProject = false;
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

function renderCarousel() {
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
      // Play frame sequences forwards, then backwards: 1, 2, 3, 2, 1, 2...
      if (item.frames?.length > 1) {
        let step = 0;
        const lastFrame = item.frames.length - 1;
        const cycleLength = lastFrame * 2;
        setInterval(() => {
          if (carousel.classList.contains("is-paused")) return;
          step = (step + 1) % cycleLength;
          const frame = step <= lastFrame ? step : cycleLength - step;
          media.src = item.frames[frame];
        }, item.frameDuration || 160);
      }
      tile.append(media);
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
function fitGreeting() {
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
document.fonts.ready.then(fitGreeting);
fitGreeting();
