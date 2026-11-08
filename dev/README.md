# Maya Bachrach — Portfolio

[Website](https://mayabachrach.github.io/portfolio/) · [Filled cards](https://mayabachrach.github.io/portfolio/?cards=filled) · [Outline cards](https://mayabachrach.github.io/portfolio/?cards=outline)

Static website hosted on GitHub Pages. No build step or dependencies are required.

## Structure

- `index.html` — page structure and script loading order.
- `src/config/site-config.js` — palettes, typography, appearance defaults, favicon paths and design tokens.
- `src/data/content.js` — projects, tags, media and carousel items.
- `src/data/lettering.js` — vector glyphs from Maya's supplied alphabet.
- `src/js/` — theme switching, lettering rendering and portfolio interactions.
- `src/css/style.css` — layout, responsive rules and component styling.
- `assets/images/` — project photographs and video posters.
- `assets/videos/` — video files.
- `assets/illustrations/` — drawings and animation frames.
- `assets/typography/` — cropped hero lettering.
- `assets/branding/` — favicons and project logos.
- `assets/source/` — original Canva exports.
- `docs/` — editing guidance.
- `scripts/check.cjs` — palette, content and local resource checks.

## Edit and verify

Edit content and design settings separately. Palette lengths are derived from their arrays; adding colors does not require changing card or carousel code. The carousel uses complete palette cycles so the loop seam stays balanced.

Run `node scripts/check.cjs` before publishing. To preview locally, serve the repository root using any static server, for example `python -m http.server 8000`. Keep `index.html` and `.nojekyll` at the repository root for GitHub Pages.

The default card variant is controlled by `presentation.defaultCards`. Both `?cards=outline` and `?cards=filled` remain available independently of that default.
