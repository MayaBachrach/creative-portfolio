// Add future animation files here. Each item accepts image or video media.
const carouselItems = [
  { type: "image", src: "./assets/dj-mayu.png", frames: ["./assets/dj-frame-1.svg", "./assets/dj-frame-2.svg", "./assets/dj-frame-3.svg"], frameDuration: 280, alt: "DJ Mayu, איור של מאיה" },
];
const carouselSettings = { minimumTiles: 6, secondsPerTile: 7 };

// Add another project object to extend the home page.
const projects = [
  {
    id: "mix", title: "מיקס והפקה", cover: "./assets/dj-mayu.png", contain: true,
    description: "מיקס, רמיקסים והפקה מוזיקלית.",
    tags: ["מוזיקה", "מיקס", "הפקה"],
    media: [{ type: "image", src: "./assets/dj-mayu.png", alt: "איור DJ Mayu", caption: "DJ Mayu", tags: ["איור", "מוזיקה"] }],
  },
  {
    id: "social", title: "סושיאל", cover: "./assets/social-1.webp",
    description: "שני סרטוני סושיאל. התפקיד שלי הוא הופעה מול מצלמה ואלתור. הקונספט והעריכה נעשו על ידי אחרים.",
    tags: ["סושיאל", "הופעה מול מצלמה", "אלתור"],
    media: [1, 2].map(number => ({
      type: "video", src: `./assets/social-${number}.mp4`, poster: `./assets/social-${number}.webp`,
      alt: `סרטון סושיאל ${number}`, tags: ["סושיאל", "הופעה מול מצלמה", "אלתור"],
    })),
  },
  {
    id: "set-design", title: "עיצוב תפאורה", cover: "./assets/lobby-3.webp",
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
];

const dialog = document.querySelector("#project-page");
const detailMedia = document.querySelector("#detail-media");
const projectTitle = document.querySelector("#project-title");
let previousFocus;
let openedFromCard = false;
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

const pencilOutlines = ["M5 8 Q80 1 195 6 L192 194 Q95 199 7 191 Z","M9 4 Q103 10 194 3 L198 191 Q92 188 4 197 Z","M4 6 L190 3 Q200 98 194 195 L8 198 Q1 100 4 6","M7 10 Q90 0 197 7 L191 198 Q99 193 3 190 Z","M10 3 L196 8 Q189 100 198 192 L4 196 Z","M3 9 Q100 4 193 4 L197 197 Q100 190 7 195 Z","M8 3 Q103 9 198 5 L191 194 Q99 201 4 192 Z","M4 4 L193 9 Q201 95 195 190 L9 198 Q2 90 4 4"];
function changePencilOutline(card, colorToken = "--outline-color") {
  const previous = Number(card.dataset.outline ?? -1);
  const offset = 1 + Math.floor(Math.random() * (pencilOutlines.length - 1));
  const index = (previous + offset + pencilOutlines.length) % pencilOutlines.length;
  card.dataset.outline = index;
  const path = pencilOutlines[index];
  const color = getComputedStyle(document.documentElement).getPropertyValue(colorToken).trim();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none"><g fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><path d="${path}" stroke-width="2.2"/><path d="${path}" transform="translate(1.5 -1)" stroke-width=".8" opacity=".65"/><path d="${path}" transform="translate(-1 1.8)" stroke-width=".6" opacity=".45" stroke-dasharray="12 2 6 1"/></g></svg>`;
  card.style.setProperty("--pencil-outline", `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
}

function renderCards() {
  document.querySelector("#project-grid").replaceChildren(...projects.map(project => {
    const card = element("a", "project-card");
    card.href = "#project/" + project.id;
    card.setAttribute("aria-haspopup", "dialog");
    changePencilOutline(card);
    card.addEventListener("pointerenter", () => changePencilOutline(card));
    card.addEventListener("focus", () => changePencilOutline(card));
    card.addEventListener("click", () => {
      previousFocus = card;
      openingRect = card.getBoundingClientRect();
      openedFromCard = true;
    });
    const heading = element("h2", "card-title", project.title);
    const picture = element("div", "card-picture" + (project.contain ? " contain" : ""));
    const image = element("img");
    image.src = project.cover;
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

function showRoute() {
  const [kind, encodedValue] = location.hash.slice(1).split("/");
  if (kind !== "project" && kind !== "tag") {
    stopDetailVideos();
    dialog.close();
    previousFocus?.focus({ preventScroll: true });
    return;
  }

  let value;
  try { value = decodeURIComponent(encodedValue || ""); }
  catch { return; }

  const project = projects.find(item => item.id === value);
  let media;
  if (kind === "project" && project) {
    projectTitle.textContent = project.title;
    document.querySelector("#project-description").textContent = project.description;
    renderTags(document.querySelector("#project-tags"), project.tags);
    media = project.media;
  } else if (kind === "tag") {
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
    previousFocus?.focus({ preventScroll: true });
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

function renderCarousel() {
  const track = document.querySelector("#carousel-track");
  const count = Math.max(carouselSettings.minimumTiles, carouselItems.length);
  track.style.setProperty("--carousel-duration", count * carouselSettings.secondsPerTile + "s");
  for (let group = 0; group < 2; group++) {
    const set = element("div", "carousel-set");
    set.setAttribute("aria-hidden", "true");
    for (let index = 0; index < count; index++) {
      const item = carouselItems[index % carouselItems.length];
      const tile = element("div", "carousel-tile");
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
  const availableWidth = greeting.clientWidth;
  if (!availableWidth) return;
  const heading = document.querySelector("#intro-title");
  const nameLine = document.querySelector(".name-line");
  if (matchMedia("(max-width: 48rem)").matches) {
    const currentSize = parseFloat(getComputedStyle(heading).fontSize);
    const fittedSize = currentSize * availableWidth / nameLine.getBoundingClientRect().width;
    heading.style.fontSize = fittedSize.toFixed(2) + "px";
  } else {
    heading.style.fontSize = "";
  }
  greetingText.style.transform = "";
  const measure = count => {
    greetingText.textContent = "ה" + "י".repeat(count);
    return greetingText.getBoundingClientRect().width;
  };
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
  link.addEventListener("pointerenter", () => changePencilOutline(link, "--social-outline"));
});

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
