// Render the supplied vector alphabet while retaining a real accessible heading.
// Missing glyphs fall back to the configured heading font rather than inventing letters.+window.renderPortfolioLettering = function (heading, text) {
  const ns = "http://www.w3.org/2000/svg";
  const glyphs = window.PORTFOLIO_LETTERING;
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.classList.add("handwritten-heading");
  let cursor = 0;
  for (const char of [...text].reverse()) {
    if (char === " ") { cursor += 28; continue; }
    const glyph = glyphs[char];
    if (glyph) {
      const group = document.createElementNS(ns, "g");
      group.setAttribute("transform", `translate(${cursor - glyph.left} 90)`);
      for (const d of glyph.paths) {
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "currentColor");
        group.append(path);
      }
      svg.append(group);
      cursor += glyph.width + 7;
    } else {
      const fallback = document.createElementNS(ns, "text");
      fallback.setAttribute("x", String(cursor));
      fallback.setAttribute("y", "90");
      fallback.setAttribute("font-size", "96");
      fallback.setAttribute("font-family", window.PORTFOLIO_CONFIG.typography.headings);
      fallback.setAttribute("fill", "currentColor");
      fallback.textContent = char;
      svg.append(fallback);
      cursor += 64;
    }
  }
  svg.setAttribute("viewBox", `0 0 ${cursor} 110`);
  heading.setAttribute("aria-label", text);
  heading.replaceChildren(svg);
};
