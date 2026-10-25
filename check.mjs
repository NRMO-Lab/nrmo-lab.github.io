import {readFileSync,existsSync} from 'node:fs';
const pages=['index.html','wildfire.html','water.html','woody-plant-encroachment.html','decision-support.html','people.html','news.html','publications.html'];
let links=0;for(const page of pages){const html=readFileSync(page,'utf8');for(const [,href]of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|mailto:|tel:|#)/.test(href))continue;const path=href.split('?')[0];if(!existsSync(path))throw new Error(`${page}: missing ${path}`);links++;}if(!html.includes('aria-current="page"'))throw new Error(`Missing active navigation: ${page}`);if(/Contact Us|Join Us/.test(html))throw new Error(`Unexpected section: ${page}`);}console.log(`Verified ${pages.length} pages and ${links} local references.`);


