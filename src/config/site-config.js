// Central design settings. Use exact palette values; do not generate extra shades.
window.PORTFOLIO_CONFIG = {
  music: { enabled: true, autoplay: true, bpm: 92, volume: .16 },
  cursor: { size: 32, strokeWidth: 3.2, colors: { light: "#000000", dark: "#FFFFFF" } },
  colorRoles: { contactHeading: 4 },
  presentation: { defaultCards: "outline" },
  favicons: { light: "./assets/branding/favicon-light-flat.png?v=31", dark: "./assets/branding/favicon-dark-flat.png?v=31" },
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
  designTokens: { "--frame-inner-scale": ".90", "--outline-width": "3.8", "--gutter": "clamp(1rem, 4.5vw, 5rem)" },
};
