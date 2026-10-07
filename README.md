# Nic Neumann Photography

Live site: https://nicneumannphoto.com

Static site hosted on GitHub Pages (deploys from `main`, root folder). The inquiry form sends through Formspree (form `mppqppqv`). The `CNAME` file points the site at nicneumannphoto.com — don't delete it.

## Adding photos
1. Export from Lightroom with the web preset (JPEG, sRGB, 2400 px long edge, quality 80) into the matching folder in `photos/` (weddings, families, seniors, headshots, couples). Use names like `weddings-065.jpg`.
2. Double-click `tools/update-galleries.command`. It updates `gallery-data.js` and warns about oversized files or bad filenames.
3. Open GitHub Desktop, review, write a short message, Commit to main, then Push origin.
4. The site updates in a minute or two.

## Files
- `index.html` — the page
- `gallery-data.js` — which photos appear in each gallery (kept up to date by the script)
- `support.js`, `image-slot.js` — rendering code from the design export
- `assets/` — About photos and other site images
- `photos/` — gallery photos
- `tools/` — helper scripts

## Undo a change
GitHub Desktop > History > right-click the commit > Revert Changes in Commit, then Push origin.
