// Central design settings. Use exact palette values; do not generate extra shades.
window.PORTFOLIO_CONFIG = {
  cursor: { size: 32, strokeWidth: 2.2 },
  colorRoles: { contactHeading: 4 },
  presentation: { defaultCards: "outline" },
  favicons: { light: "./assets/branding/favicon-light.png?v=21", dark: "./assets/branding/favicon-dark.png?v=21" },
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
  designTokens: { "--frame-inner-scale": ".82", "--outline-width": "3.8", "--gutter": "clamp(1rem, 4.5vw, 5rem)" },
};
