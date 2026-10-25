# Natural Resource Modeling and Observation Lab

Static website for the NRMO Lab at Oklahoma State University, published at https://nrmo-lab.github.io/.

## Build and preview

- `node build.mjs`: regenerate the eight HTML pages.
- `node check.mjs`: verify navigation and local page references.
- `node server.mjs`: preview at http://127.0.0.1:4175.
- `.\Update-Website.ps1`: build, check, commit, and push updates to GitHub Pages.

Keep the generated HTML pages in the repository; GitHub Pages serves the repository root.

## Edit content

- `hero-slides.json`: homepage background images, positions, and photo credits.
- `news.json`: news archive; homepage shows the latest six months using America/Chicago time.
- `people.json` and `build.mjs`: team details, biography, page layout, and shared navigation.
- `publications.json`: complete bibliography.
- `wildfire-papers.json`, `water-papers.json`, and `woody-papers.json`: selected publications, figures, captions, and links.
- Corresponding `*-content.mjs` files: research topic menus and page templates.
- `styles.css` and `script.js`: styling and browser interactions.

Run the build and check commands after editing content.

## Assets and attribution

Website images are stored in `assets/`. Photo credits and source links are maintained in the slideshow data and page templates. Publication figures were supplied for the research pages. The website uses optimized WebP files for the PI portrait, campus background, and crop irrigation results. The current irrigation slide shows cotton furrow irrigation in southwest Oklahoma, credited to Saleh Taghvaeian / Oklahoma State University Extension.

The `email-signature/` folder and its logo assets are retained for Outlook. `export-logo.cjs` and `restore-logo-text.ps1` support logo conversion; the text restoration step is needed after export to preserve circular lettering. Fonts load from Google Fonts with system fallbacks.

Unused trial photographs, superseded diagrams, extraction files, and redundant large image originals were removed during cleanup.

## Decision Support

`decision-support-content.mjs` contains the live fire potential platform and its introduction. This page appears between Woody Plant Encroachment and People in the shared navigation. Future management platforms can be added here.
