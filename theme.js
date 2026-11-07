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
