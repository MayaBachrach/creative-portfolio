// Central design settings. Use exact palette values; do not generate extra shades.
window.PORTFOLIO_CONFIG = {
  themeNames: { light: "crayons", dark: "markers" },
  themeFamilies: {
    crayons: "multicolor",
    markers: "multicolor",
  },
  // Sampled from Maya's supplied references.
  palettePresets: {
    "play-poster": ["#EE364C", "#1C49AE", "#F9DA44", "#0E8C61"],
    "neon-scribbles": ["#F84AAD", "#B2F224", "#10B8F0", "#F97513", "#8132B9"],
  },
  paletteNames: { light: "play-poster", dark: "neon-scribbles" },
  typography: { headings: '"Heebo", system-ui, sans-serif', body: '"Heebo", system-ui, sans-serif' },
  designTokens: { "--outline-width": "3.8", "--outline-grain": ".55", "--outline-roughness": "1.3", "--outline-wobble": ".65", "--gutter": "clamp(1rem, 4.5vw, 5rem)" },
};
