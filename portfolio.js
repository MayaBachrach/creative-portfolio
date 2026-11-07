// Add future animation files here. Each item accepts image or video media.
const carouselItems = [
  { type: "image", src: "./assets/dj-mayu.png", frames: ["./assets/dj-frame-1.svg", "./assets/dj-frame-2.svg", "./assets/dj-frame-3.svg"], frameDuration: 280, alt: "DJ Mayu, איור של מאיה" },
];
const carouselSettings = { minimumTiles: 6, secondsPerTile: 7, colorCount: 5 };

// Add another project object to extend the home page.
const projects = [
  {
    id: "mix", title: "הפקה מוזיקלית ומיקס", cover: "./assets/dj-mayu.png", contain: true,
    description: "מיקס, רמיקסים והפקה מוזיקלית.",
    tags: ["מוזיקה", "מיקס", "הפקה"],
    media: [{ type: "image", src: "./assets/dj-mayu.png", alt: "איור DJ Mayu", caption: "DJ Mayu", tags: ["איור", "מוזיקה"] }],
  },
  {
    id: "social", title: "תוכן וסושיאל", cover: "./assets/social-1.webp",
    description: "שני סרטוני סושיאל. התפקיד שלי הוא הופעה מול מצלמה ואלתור. הקונספט והעריכה נעשו על ידי אחרים.",
    tags: ["סושיאל", "הופעה מול מצלמה", "אלתור"],
    media: [1, 2].map(number => ({
      type: "video", src: `./assets/social-${number}.mp4`, poster: `./assets/social-${number}.webp`,
      alt: `סרטון סושיאל ${number}`, tags: ["סושיאל", "הופעה מול מצלמה", "אלתור"],
    })),
  },
  {
    id: "set-design", title: "עיצוב תפאורה וחלל", cover: "./assets/lobby-3.webp",
    description: "עיצוב לובי, תפאורה ואביזרים. מהעבודה בסדנה ופרטי החיבורים ועד למיצגים בחלל המלון.",
    tags: ["תפאורה", "עיצוב חלל", "אביזרים", "עבודת יד"],
    media: [
      ...[3, 2, 1].map(number => ({
        type: "image", src: `./assets/lobby-${number}.webp`,
        alt: ["מיצג עם בלונים ודמויות בלובי", "מיצג אדום ולב מבלונים", "תפאורת מסגרות ירוקות בלובי"][number - 1],
        tags: ["תפאורה", "עיצוב חלל", "הקמה"],
      })),
      { type: "video", src: "./assets/set-process.mp4", poster: "./assets/set-poster.webp", alt: "תהליך עבודה על התפאורה", tags: ["תפאורה", "אביזרים", "עבודת יד"] },
      ...[
        [6, "מסגרת תפאורה מעוטרת בעלים"], [5, "סדנת העבודה"], [4, "חלקי תפאורה בסדנה"],
        [3, "קישוט ידית עץ"], [10, "חיבור באביזר צהוב"], [7, "פין ושרשרת במסגרת"],
        [8, "רצועת חיבור באביזר"], [1, "עבודה על כובע"], [2, "עבודה על אביזר מקופל"],
      ].map(([number, alt]) => ({ type: "image", src: `./assets/set-${number}.webp`, alt, tags: ["תפאורה", "אביזרים", "עבודת יד"] })),
    ],
  },
  {
    id: "graphic", title: "עיצוב גרפי", cover: "./assets/dj-mayu.png", contain: true,
    description: "איור DJ Mayu והזהות החזותית של PICKY, כלי לבחירת צבעים לכרום.",
    tags: ["איור", "עיצוב גרפי", "עיצוב ממשק"],
    media: [
      { type: "image", src: "./assets/dj-mayu.png", alt: "DJ Mayu — איור של דמות מתקלטת", caption: "DJ Mayu", tags: ["איור", "מוזיקה", "עיצוב גרפי"] },
      { type: "image", src: "./assets/picky.png", alt: "האייקון של PICKY", caption: "PICKY", link: "https://github.com/MayaBachrach/picky", tags: ["עיצוב גרפי", "עיצוב ממשק", "כלי צבע"] },
    ],
  },
  {
    id: "performance", title: "הופעה ופרפורמנס", cover: "./assets/social-2.webp",
    description: "הופעה מול מצלמה ואלתור.", tags: ["הופעה", "אלתור", "מול מצלמה"],
    media: [{ type: "video", src: "./assets/social-2.mp4", poster: "./assets/social-2.webp", alt: "הופעה מול מצלמה", tags: ["הופעה", "אלתור", "מול מצלמה"] }],
  },
  {
    id: "animation", title: "איור ואנימציה", cover: "./assets/dj-mayu.png", contain: true,
    description: "איורים, דמויות ותנועה.", tags: ["איור", "אנימציה", "דמויות"],
    media: [{ type: "image", src: "./assets/dj-frame-2.svg", alt: "DJ Mayu — פריים מתוך האיור", tags: ["איור", "אנימציה", "דמויות"] }],
  },
  {
    id: "concepts", title: "פיתוח קונספטים", cover: "./assets/picky.png", contain: true,
    description: "מרעיון ראשוני לכיוון ברור: פיתוח רעיונות, סיפורים ושפה חזותית.", tags: ["קונספט", "רעיונאות", "פיתוח רעיון"],
    media: [{ type: "image", src: "./assets/picky.png", alt: "PICKY — תמונה לסידור המשבצת", tags: ["קונספט", "רעיונאות"] }],
  },
  {
    id: "creative", title: "קריאייטיב", cover: "./assets/lobby-2.webp",
    description: "רעיונות וחיבורים בין תוכן, עיצוב וחוויה.", tags: ["קריאייטיב", "שפה חזותית", "חוויה"],
    media: [{ type: "image", src: "./assets/lobby-2.webp", alt: "תמונת אווירה למשבצת הקריאייטיב", tags: ["קריאייטיב", "חוויה"] }],
  },
  {
    id: "storytelling", title: "סטוריטלינג", cover: "./assets/social-1.webp",
    description: "סיפורים, דמויות ונרטיבים — מהרעיון ועד לאופן שבו הסיפור פוגש את הקהל.",
    tags: ["סטוריטלינג", "סיפור", "דמויות"],
    media: [{ type: "image", src: "./assets/social-1.webp", alt: "תמונת אווירה למשבצת הסטוריטלינג", tags: ["סטוריטלינג", "סיפור"] }],
  },
  {
    id: "app-development", title: "פיתוח אפליקציות", cover: "./assets/picky.png", contain: true,
    description: "מוצרים דיגיטליים, ממשקים וכלים אינטראקטיביים.",
    tags: ["פיתוח אפליקציות", "ממשק משתמש", "מוצרים דיגיטליים"],
    media: [{ type: "image", src: "./assets/picky.png", alt: "PICKY — תמונה למשבצת הפיתוח", tags: ["פיתוח אפליקציות", "מוצרים דיגיטליים"] }],
  },
];

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

const chalkVariantCount = 8;
let chalkFilterId = 0;
// Eight stable hand-drawn contours, each a single closed stroke.
// Small irregular bends model a chalk stick dragged across a board.
function chalkContour(variant, wobble) {
  const corners = [[7, 8], [192, 6], [194, 192], [6, 194]];
  const points = [];
  corners.forEach(([x, y], edge) => {
    const [endX, endY] = corners[(edge + 1) % corners.length];
    const length = Math.hypot(endX - x, endY - y);
    const normalX = -(endY - y) / length;
    const normalY = (endX - x) / length;
    for (let step = 0; step < 18; step++) {
      const t = step / 18;
      const phase = variant * 1.73 + edge * 2.41;
      const drift = Math.sin(t * Math.PI) * (Math.sin(phase) * 1.2);
      const grain = (Math.sin(step * 2.31 + phase) * .65 + Math.sin(step * 4.7 + phase) * .35) * wobble;
      const offset = drift + grain;
      points.push([(x + (endX - x) * t + normalX * offset).toFixed(2), (y + (endY - y) * t + normalY * offset).toFixed(2)]);
    }
  });
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ") + " Z";
}
function changePencilOutline(card, colorToken = "--outline-color", retainShape = false) {
  const previous = Number(card.dataset.outline ?? -1);
  const offset = 1 + Math.floor(Math.random() * (chalkVariantCount - 1));
  const index = retainShape && previous >= 0 ? previous : (previous + offset + chalkVariantCount) % chalkVariantCount;
  card.dataset.outline = index;
  const theme = getComputedStyle(card);
  const wobble = Number(theme.getPropertyValue("--outline-wobble")) || .65;
  const path = chalkContour(index, wobble);
  const color = theme.getPropertyValue(colorToken).trim();
  const strokeWidth = Number(theme.getPropertyValue("--outline-width")) || 3.8;
  const grain = Number(theme.getPropertyValue("--outline-grain")) || .55;
  const roughness = Number(theme.getPropertyValue("--outline-roughness")) || 1.3;
  const filterId = "chalk-grain-" + (++chalkFilterId);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none"><defs><filter id="${filterId}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" seed="12" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="${roughness}" xChannelSelector="R" yChannelSelector="G" result="rough"/><feColorMatrix in="noise" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${grain} 0 0 0 ${1 - grain}" result="chalk"/><feComponentTransfer in="chalk" result="opaque-grain"><feFuncA type="discrete" tableValues="0 0 0 0 0 1 1 1"/></feComponentTransfer><feComposite in="rough" in2="opaque-grain" operator="in"/></filter></defs><path d="${path}" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" stroke-width="${strokeWidth}" filter="url(#${filterId})"/></svg>`;
  if (card.classList.contains("project-card")) {
    const filled = svg.replace('fill="none" stroke=', `fill="${color}" stroke=`);
    card.style.setProperty("--chalk-fill", `url("data:image/svg+xml,${encodeURIComponent(filled)}")`);
  }
  if (card.classList.contains("social-icon")) {
    const visibleFrame = svg.replace("<svg ", '<svg class="pencil-frame" aria-hidden="true" ');
    const existingFrame = card.querySelector(".pencil-frame");
    if (existingFrame) existingFrame.outerHTML = visibleFrame;
    else card.insertAdjacentHTML("beforeend", visibleFrame);
    card.classList.add("has-pencil-frame");
  } else {
    card.style.setProperty("--pencil-outline", `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  }
}

function renderCards() {
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
    const picture = element("div", "card-picture" + (project.contain ? " contain" : ""));
    const image = element("img");
    image.src = project.cover;
    if (project.cover.endsWith("/dj-mayu.png")) image.classList.add("theme-drawing");
    image.alt = project.title;
    image.width = 600;
    image.height = 600;
    image.loading = "lazy";
    picture.append(image);
    card.append(heading, picture);
    if (project.note) card.append(element("p", "card-note", project.note));
    const entry = element("article", "project-entry");
    const tags = element("div", "tags");
    tags.setAttribute("aria-label", "תגיות הפרויקט");
    renderTags(tags, project.tags);
    entry.append(card, tags);
    return entry;
  }));
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
  const accent = theme.getPropertyValue(source ? "--outline-color" : "--accent-1").trim();
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
    projectTitle.textContent = project.title;
    document.querySelector("#project-description").textContent = project.description;
    renderTags(document.querySelector("#project-tags"), project.tags);
    media = project.media;
  } else if (kind === "tag") {
    delete dialog.dataset.project;
    updatePanelAccent();
    projectTitle.textContent = value;
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
        { transform: `translate(${x}px, ${y}px) scale(.76)`, opacity: .7 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
      ], { duration: 600, easing: "cubic-bezier(.16,1,.3,1)" });
    }
    openingRect = null;
  }
  dialog.scrollTop = 0;
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

function carouselColorIndices(count) {
  const themeColorCount = Number(getComputedStyle(document.documentElement).getPropertyValue("--accent-count"));
  const colorCount = themeColorCount || carouselSettings.colorCount;
  const colors = Array.from({ length: count }, (_, index) => index % colorCount);
  if (count > 1 && colors[count - 1] === colors[0]) {
    colors[count - 1] = (colors[count - 1] + 1) % colorCount;
  }
  return colors;
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
  const count = Math.max(carouselSettings.minimumTiles, carouselItems.length);
  const colorIndices = carouselColorIndices(count);
  track.style.setProperty("--carousel-duration", count * carouselSettings.secondsPerTile + "s");
  for (let group = 0; group < 2; group++) {
    const set = element("div", "carousel-set");
    set.setAttribute("aria-hidden", "true");
    for (let index = 0; index < count; index++) {
      const item = carouselItems[index % carouselItems.length];
      const tile = element("div", "carousel-tile");
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

renderCards();
document.querySelectorAll(".social-icon").forEach(link => {
  changePencilOutline(link, "--social-outline");
});

function refreshThemeOutlines() {
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
