// Central design settings. Use exact palette values; do not generate extra shades.
window.PORTFOLIO_CONFIG = {
  themeNames: { light: "crayons", dark: "markers" },
  themeFamilies: {
    crayons: "multicolor",
    markers: "multicolor",
    "pink-dark": "guided",
    "pink-white": "guided",
  },
  // Sampled from Maya's supplied references. Earlier palettes remain available here.
  palettePresets: {
    "play-poster": ["#EE364C", "#1C49AE", "#F9DA44", "#0E8C61"],
    "neon-scribbles": ["#F84AAD", "#B2F224", "#10B8F0", "#F97513", "#8132B9"],
    "crayola-classic": ["#EE204D", "#1F75FE", "#FCE883", "#1CAC78", "#926EAE", "#FF7538"],
    "original-markers": ["#ff65c9", "#b8ff42", "#74dffb", "#ffb46d", "#b29bff"],
    "pink-lime": ["#ff38b5", "#d6ff43"],
  },
  paletteNames: { light: "play-poster", dark: "neon-scribbles" },
  typography: { headings: '"Heebo", system-ui, sans-serif', body: '"Heebo", system-ui, sans-serif' },
  designTokens: { "--outline-width": "2.8", "--outline-grain": ".55", "--outline-roughness": ".8", "--gutter": "clamp(1rem, 4.5vw, 5rem)" },
};
