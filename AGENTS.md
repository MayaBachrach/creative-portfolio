# Maya Bachrach portfolio

## Scope and deployment
- Repository: MayaBachrach/portfolio. Develop on `dev` and keep changes in small commits. Production comes from the root of `main`.
- GitHub Pages also serves the dev preview at https://mayabachrach.github.io/portfolio/dev/. Publish it by copying the tested dev tree into `main:dev/` only. Verify the candidate diff contains only paths under `dev/` before advancing `main`. Never merge the dev branch wholesale into production without Maya's explicit release approval.
- GitHub Git Data API can publish without a local Git checkout: create a tree based on the current dev head, create a commit with that head as parent, then update the dev ref without force. For the preview, use the resulting tree SHA as a mode `040000` entry at `dev` in a tree based on the current main head. Use the current main head as parent and verify the diff before updating the ref. Check Pages deployment and run smoke tests against the preview URL.
- GitHub can store and review edits, but an editing session needs a Node runner to rebuild and test them. If a ChatGPT session has read-only GitHub access, produce a patch or PR for a session with write access.

## Source and conventions
- Static Hebrew RTL site with plain HTML, CSS, JS, SVG and Web Audio. No application server or runtime npm dependencies. Use relative asset URLs because Pages serves both root and nested previews.
- `src/template/index.html` is the page source. `src/css/style.css` holds responsive layout and artwork rules. `src/config/site-config.js` defines themes, typography and audio. Keep the existing visual palette and artwork.
- `src/data/` contains projects, frames, glyphs and shapes. `src/js/portfolio.js` handles the carousel, project dialog and loading. Other modules handle theme, audio, custom scrolling, footer and drawing.
- `scripts/build.cjs` prerenders vector headings and produces `index.html` plus `assets/runtime/app.<hash>.js`. Edit sources and commit the regenerated HTML and referenced bundle together. Keep generated output out of hand edits.
- Use semantic buttons and links, visible keyboard focus, meaningful labels and reduced-motion support. Keep load metrics and drawing local. The public repo and site intentionally expose the existing contact links.

## Commands
Run from the repo root with Node 22+ and npm.
```sh
npm ci
npx playwright install chromium
npm test
npm audit
```
`npm run build` generates the site. `npm run check` checks resources, glyphs, palettes and source syntax. `npm test` also runs `scripts/browser-test.cjs` in Chromium. On a machine with Edge installed, set `PORTFOLIO_BROWSER_CHANNEL=msedge` to use it. Set `PORTFOLIO_URL` to run the same tests against a deployed dev preview.

## Known limits and next steps
- Chromium viewport tests do not cover real iOS/Safari audio, touch or pinch zoom. Audio may require a tap. Verify on a real phone before release.
- The carousel is decorative and does not link to project dialogs. The build currently includes only the mix project for direct routing. Some older assets and inactive code are retained.
- Autoplay motion honors the OS reduced-motion preference, but there is no dedicated pause control. Consider an accessible pause affordance if Maya wants one.
- A deliberately short loader still waits for critical art, with a deadline for stalled assets. Track real-device loading with the local load history before changing animation assets. Consider loading footer frames on approach instead of at startup.
- Preview publishing is an explicit snapshot step. Keep production release separate.
