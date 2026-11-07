// Native SVG cursors, recolored from the active palette. No moving DOM overlay.
window.updatePortfolioCursors = function (palette, mode) {
  const { size, strokeWidth } = window.PORTFOLIO_CONFIG.cursor;
  const roles = window.PORTFOLIO_CONFIG.cursor.colorRoles[mode];
  const fill = palette[Math.min(roles.fill, palette.length) - 1];
  const stroke = palette[Math.min(roles.stroke, palette.length) - 1];
  const svg = path => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const arrow = svg("M4 3C4.6 9 4 17.9 4.8 25L11.1 19.6L16.3 29L21.1 26.2L16.1 17.4L24.2 16.3C18.2 11.6 11 6.4 4 3Z");
  const hand = svg("M11.1 18.1L10.7 5.6C10.5 1.9 15 2 15.1 5.4L15.5 14.6C15.8 11.7 19.3 12.1 19.3 15C20 12.5 23.1 13.8 23 16.2C25.1 14.4 27.5 16.4 27 19L26.1 25C25.5 29.1 21.5 30 17.3 28.9C14.3 28.5 12.1 26.6 10.2 24L5.9 18.2C4.1 15.8 7.3 13.9 9.2 16.4Z");
  const root = document.documentElement;
  root.style.setProperty("--site-cursor", `url("data:image/svg+xml,${encodeURIComponent(arrow)}") 4 3, auto`);
  root.style.setProperty("--site-cursor-link", `url("data:image/svg+xml,${encodeURIComponent(hand)}") 11 3, pointer`);
};
