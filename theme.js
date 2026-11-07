(() => {
  // The original palette is preserved as "pink-dark" (and "pink-white").
  // Light and dark now use the two selected multicolor palettes.
  const themeNames = { light: "crayons", dark: "markers" };
  const themeFamilies = {
    crayons: "multicolor",
    markers: "multicolor",
    "pink-dark": "guided",
    "pink-white": "guided",
  };
  // Sampled from Maya's supplied references. Earlier palettes remain available here.
  const palettePresets = {
    "play-poster": ["#EE364C", "#1C49AE", "#F9DA44", "#0E8C61"],
    "neon-scribbles": ["#F84AAD", "#B2F224", "#10B8F0", "#F97513", "#8132B9"],
    "crayola-classic": ["#EE204D", "#1F75FE", "#FCE883", "#1CAC78", "#926EAE", "#FF7538"],
    "original-markers": ["#ff65c9", "#b8ff42", "#74dffb", "#ffb46d", "#b29bff"],
    "pink-lime": ["#ff38b5", "#d6ff43"],
  };
  const paletteNames = { light: "play-poster", dark: "neon-scribbles" };
  const storageKey = "maya-portfolio-color-mode";
  const systemScheme = matchMedia("(prefers-color-scheme: dark)");
  let preference = null;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") preference = saved;
  } catch {
    // System preference still works when browser storage is unavailable.
  }

  function currentMode() {
    return preference || (systemScheme.matches ? "dark" : "light");
  }

  function refreshFavicon() {
    const colors = getComputedStyle(document.documentElement);
    const fill = colors.getPropertyValue("--accent-1").trim();
    const stroke = colors.getPropertyValue("--accent-2").trim();
    if (!fill || !stroke) return;
    const icon = document.querySelector('link[rel="icon"]');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="m32 3 9 18 20 3-15 14 4 22-18-10-18 10 4-22L3 24l20-3Z" fill="${fill}" stroke="${stroke}" stroke-width="3.5" stroke-linejoin="round"/></svg>`;
    icon.href = "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function updateTheme() {
    const mode = currentMode();
    document.documentElement.dataset.theme = themeNames[mode];
    document.documentElement.dataset.themeFamily = themeFamilies[themeNames[mode]];
    const palette = palettePresets[paletteNames[mode]];
    palette.forEach((color, index) => document.documentElement.style.setProperty("--accent-" + (index + 1), color));
    document.documentElement.style.setProperty("--accent-count", String(palette.length));
    document.documentElement.style.setProperty("--name-background", "var(--accent-2)");
    document.documentElement.style.setProperty("--outline-color", "var(--accent-" + Math.min(4, palette.length) + ")");
    document.documentElement.style.setProperty("--social-outline", "var(--accent-1)");
    const toggle = document.querySelector("#theme-toggle");
    if (toggle) {
      toggle.textContent = mode === "dark" ? "מצב בהיר ☀" : "מצב כהה ☾";
      toggle.setAttribute("aria-label", mode === "dark" ? "מעבר למצב בהיר" : "מעבר למצב כהה");
      toggle.setAttribute("aria-pressed", String(mode === "dark"));
      refreshFavicon();
      document.dispatchEvent(new Event("portfolio-theme-change"));
    }
  }

  updateTheme();
  systemScheme.addEventListener("change", () => {
    if (!preference) updateTheme();
  });
  document.addEventListener("DOMContentLoaded", () => {
    updateTheme();
    document.querySelector("#theme-toggle").addEventListener("click", () => {
      preference = currentMode() === "dark" ? "light" : "dark";
      try { localStorage.setItem(storageKey, preference); } catch {}
      updateTheme();
    });
  });
})();
