// Central design settings. Use exact palette values; do not generate extra shades.
window.PORTFOLIO_CONFIG = {
  music: { enabled: true, bpm: 92, volume: .16 },
  cursor: { size: 32, strokeWidth: 2.2, colorRoles: { light: { fill: 3, stroke: 2 }, dark: { fill: 2, stroke: 5 } } },
  colorRoles: { contactHeading: 4 },
  presentation: { defaultCards: "outline" },
  favicons: { light: "./assets/branding/favicon-light.png?v=29", dark: "./assets/branding/favicon-dark.png?v=29" },
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
