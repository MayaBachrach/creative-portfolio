// Render the supplied vector alphabet while retaining a real accessible heading.
// Missing glyphs fall back to the configured heading font rather than inventing letters.
window.renderPortfolioLettering = function (heading, text) {
  const ns = "http://www.w3.org/2000/svg";
  const glyphs = window.PORTFOLIO_LETTERING;
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.classList.add("handwritten-heading");
  const lines = text.split("\n");
  const layout = [];
  for (const [lineIndex, line] of lines.entries()) {
  let cursor = 0;
  const lineGroup = document.createElementNS(ns, "g");
  const units = line.match(/\(:|:\)|[A-Za-z0-9]+|./gu) || [];
  const ordered = heading.dataset.letteringDirection === "ltr" ? units : units.reverse();
  const characters = ordered.flatMap(unit => unit === "(:" || unit === ":)" || (/^[A-Za-z0-9]+$/.test(unit) && [...unit].every(char => glyphs[char])) ? [...unit] : [unit]);
  for (const char of characters) {
    if (char === " ") { cursor += 28; continue; }
    const glyph = glyphs[char];
    if (glyph) {
      const group = document.createElementNS(ns, "g");
      group.setAttribute("transform", `translate(${cursor - glyph.left} 90) scale(${glyph.scale || 1})`);
      for (const d of glyph.paths) {
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "currentColor");
        group.append(path);
      }
      lineGroup.append(group);
      cursor += glyph.width + 7;
    } else {
      const fallback = document.createElementNS(ns, "text");
      fallback.setAttribute("x", String(cursor));
      fallback.setAttribute("y", "90");
      fallback.setAttribute("font-size", "96");
      fallback.setAttribute("font-family", window.PORTFOLIO_CONFIG.typography.headings);
      fallback.setAttribute("fill", "currentColor");
      fallback.setAttribute("direction", "ltr");
      fallback.setAttribute("text-anchor", "start");
      fallback.textContent = char;
      lineGroup.append(fallback);
      cursor += 64 * char.length;
    }
  }
  layout.push({ lineGroup, width: cursor, lineIndex });
  }
  const width = Math.max(...layout.map(item => item.width));
  for (const item of layout) {
    item.lineGroup.setAttribute("transform", `translate(${(width - item.width) / 2} ${item.lineIndex * 110})`);
    svg.append(item.lineGroup);
  }
  svg.setAttribute("viewBox", `0 0 ${width} ${(lines.length - 1) * 110 + 130}`);
  heading.setAttribute("aria-label", text);
  heading.replaceChildren(svg);
};
