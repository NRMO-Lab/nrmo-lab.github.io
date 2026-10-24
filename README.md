# Natural Resource Modeling and Observation Lab

A responsive, static website for the Natural Resource Modeling and Observation Lab at Oklahoma State University. Seven pages: Home, Wildfire Research, Water Research, Woody Plant Encroachment, People, News, and Publications. No dependencies or build step are required to host the generated website.

## Preview locally

With Node.js installed:

```sh
npm run dev
```

Open http://127.0.0.1:4175. Stop the server with Ctrl+C. Set the `PORT` environment variable to use a different port.

## Edit content

Edit `build.mjs` for page copy, navigation, research projects, and featured publications. The complete bibliography is in `publications.json`. Then run `npm run build`. Edit `styles.css` for appearance and `script.js` for the mobile menu. Run `npm run check` to check local file references.

The biography, education, projects, and publications are based on the supplied October 2026 CV. No student roster was supplied; the People page currently profiles only Jia Yang. The initials illustration is intentional and can be replaced with an approved portrait. The Publications page includes all 102 entries from the published section (2013–2026), with the Desjardins et al. Fire Ecology (2026) citation updated to published using the citation supplied by Jia Yang. Other bibliographic details and year groupings follow the CV. Under-review and in-preparation manuscripts are excluded. The homepage and research pages retain featured selections. No original CV document or personal contact details are included in this repository.

## Publish on GitHub Pages

1. Create a GitHub repository and upload this folder's contents, keeping `index.html` at the repository root.
2. In the repository, open **Settings → Pages**.
3. Select **Deploy from a branch**, then your default branch and **/(root)**. Save.
4. GitHub will display the published URL when deployment finishes.

All internal URLs are relative, so the site supports both repository project pages and custom domains. The `.nojekyll` file disables Jekyll processing. Do not upload the original private CV.

## Images and fonts

The homepage photograph is stored locally at `assets/oklahoma-cattle-herd.jpg`: "Cattle grazing at Washita Refuge," photographed by Carla Weinkauf/USFWS at Washita National Wildlife Refuge, Oklahoma. Source: https://www.fws.gov/media/cattle-grazing-washita-refuge . USFWS lists it as public domain. The original image is unmodified; CSS displays a responsive crop with a separate dark overlay. The herd is composed to the right of the homepage text. A linked credit appears on the homepage. The Water Research banner uses an illustrative Unsplash photograph (`photo-1437482078695-73f5ca6c96e2`), with no claim that it depicts Oklahoma. Fonts (Nunito Sans and Lora) load from Google Fonts, with local fallbacks. The homepage image is included in the repository and needs no external image service.



The Publications page marks first-author papers by advised trainees with a dagger (†). The author matches are Yang, H.; Desjardins; Fang, S.; Zhang, Q.; and Wu, Q. Fang, Y. is a different author and is not marked. Update the traineeLed function in build.mjs when adding advised authors. Coauthorship alone does not trigger the marker.






## Homepage news

Edit `news.json` to add or update homepage news, then run `npm run build`. Entries include date (YYYY-MM), category, title, summary, href, and linkText. News is sorted newest first automatically. Dates may use YYYY-MM or YYYY-MM-DD; month-only dates are treated as the first day of that month. The homepage shows only the past six calendar months and excludes future-dated entries. The cutoff is applied during the build and refreshed in the browser using America/Chicago time. All entries remain visible in news.html. Initial items describe funded-project starts documented in the supplied CV; dates refer to project start months.









## Homepage background slideshow

Edit `hero-slides.json` to choose the background images, focal points, and linked photo credits, then run `npm run build`. The slideshow rotates every 10 seconds with a crossfade, previous/next controls, and image selector dots. It pauses when the browser tab is hidden. Rotation starts automatically; visitors who prefer reduced motion see instant image changes instead of crossfades. With JavaScript disabled, the first image remains visible.

The three initial slides are the Washita Refuge cattle photo (Carla Weinkauf/USFWS, public domain), the Oklahoma prairie panorama (Justin Meissen, CC BY-SA 2.0), and the Wichita Mountains bison herd (Larry Smith, CC BY 2.0). Source and license links are stored per slide and displayed alongside the active image. Files are unchanged; CSS controls cropping and shading.



A fourth slideshow image shows a large grass fire in the Arbuckle Mountains, Oklahoma, photographed by Sheila Brown. Source: https://www.publicdomainpictures.net/en/view-image.php?image=312799&picture=grass-fire-in-the-mountains . The photographer released the image under CC0 public domain. The local file is assets/oklahoma-grass-fire.jpg; CSS displays a crop with a separate dark overlay.


The previous distant Arbuckle smoke-plume slide has been replaced with visible flames from a wildfire-response burnout near Talihina, Oklahoma, February 25, 2026. Credit: Oklahoma National Guard Wildland Firefighting Program. Source: https://www.dvidshub.net/image/9538605/oklahoma-national-guard-wildland-firefighting-crews-battle-oklahoma-blazes . The source marks the photograph public domain. This is a woodland burnout during wildfire response, rather than a grassland wildfire; the slide credit labels it accordingly. CSS crops the portrait photograph to keep the flames on the right. The file is assets/oklahoma-wildfire-flames.jpg.


Three additional slideshow images show the North Canadian River at Britton Road in Oklahoma City (USGS, public domain), historical drought at Lone Chimney Lake in January 2013 (USGS, public domain), and invasive eastern redcedar in Oklahoma (Tell Judkins / Oklahoma Department of Wildlife Conservation). Linked sources and credits appear with each slide. The ODWC photograph is credited to its copyright holder, with no public-domain claim.

The current eight-slide order is cattle, prairie, bison, prescribed burn, wildfire-response burnout, river, drought, and grassland redcedar encroachment. The prescribed-burn photo is Christopher Wilson / Fort Sill Public Affairs (public domain), DVIDS image 7098855. The previous dense redcedar photo is replaced with Figure 1 from OSU Extension NREM-2884, documenting redcedar encroachment in mesic grassland at the Cross Timber Experimental Range near Stillwater. The image is extracted without editing; CSS controls display cropping.

The cattle and prescribed-burning slides have been removed from the homepage rotation. The current sequence is prairie, bison, wildfire-response burnout, river, drought, and grassland redcedar encroachment. Rotation remains every 10 seconds.

The bison slide now uses a 6000 × 4000 photograph by Quinton Smith/USFWS, taken at Wichita Mountains Wildlife Refuge on June 16, 2023 (public domain). Source: https://www.fws.gov/media/bison-1 . The close view shows a bison in a wildflower meadow; the slide order and 10-second interval are unchanged.

The redcedar slide now uses a clear 4032 × 3024 photograph of eastern redcedars encroaching into Northwest Oklahoma grassland, credited to Graycen Wheeler / OPMX. Source: https://www.kgou.org/politics-and-government/2025-03-31/redcedar-removal-a-priority-for-oklahoma-legislative-leader . CSS places the focal point near the lower portion to retain both grassland and trees. No public-domain license is claimed.

Added a Tallgrass Prairie Preserve landscape as the second homepage slide, photographed near Pawhuska in Osage County, Oklahoma, September 2005. Credit: DBinfo / Wikimedia Commons, released into the public domain. Source: https://commons.wikimedia.org/wiki/File:Tallgrass_Prairie_Preserve.jpg . The slideshow now has seven images and retains its 10-second rotation.

Homepage slideshow order: fire, river, woody plant encroachment, prairie, Tallgrass Prairie Preserve, bison, and drought. Each image remains visible for 10 seconds.

The Wildfire Research page is organized by five publication-led themes in wildfire-content.mjs. It features the external Hourly Fire Potential Platform near the top, followed by section navigation, related citations, and current projects. Update publicationArchive match patterns in wildfire-content.mjs when changing selected papers, then rebuild with npm run build.

The historical drought slide has been replaced with an aerial photograph of Shawnee Reservoir, Oklahoma, looking southwest. Credit: Shelby L. Hunter / USGS, public domain, September 28, 2016. Source: https://www.usgs.gov/media/images/aerial-photograph-shawnee-reservoir-looking-southwest . Its position in the rotation and the 10-second interval remain unchanged.

Replaced the aerial Shawnee Reservoir view with a scenic Burford Lake photograph from Wichita Mountains Wildlife Refuge, Oklahoma. Credit: Larry Smith, CC BY 2.0. Source: https://commons.wikimedia.org/wiki/File:Burford_Lake.jpg . The original file is unchanged; CSS crops the display.

Added the user-provided scissortail flycatcher photograph to the homepage slideshow as the eighth slide. The image was provided in this chat; photographer and location were not supplied, and no license or Oklahoma location is claimed. Preserve photographer attribution when available. The 10-second rotation is unchanged.

Wildfire Research now presents each of its 13 selected papers in an individual subsection. Summaries and source links are in wildfire-papers.json; explanatory SVG diagrams are in assets/research. These diagrams are original conceptual study schematics, not extracted paper figures or quantitative results. The general topic descriptions have been removed.

Water Research uses water-content.mjs and water-papers.json, with five topic menus and ten individual publication sections. Figures in assets/water-research are conceptual study schematics, clearly labeled as such. Replace them with supplied paper figures through optional figure, figureAlt, figureCaption, figureWidth, and figureHeight fields. The banner uses the credited Burford Lake photo.

Woody Plant Encroachment follows the water page layout through woody-content.mjs and woody-papers.json. It contains four research topic dropdowns and six publication subsections. Original study schematics in assets/woody-research are clearly labeled and can be replaced using the optional figure metadata fields. The photo banner shows redcedar encroachment into Northwest Oklahoma grassland, credited to Graycen Wheeler / OPMX.
