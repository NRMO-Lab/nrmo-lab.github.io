import {woodyContent} from './woody-content.mjs';
import {waterContent} from './water-content.mjs';
import {wildfireContent} from './wildfire-content.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
import {isRecentNews} from './news-window.js';
const publicationArchive=JSON.parse(readFileSync(new URL('./publications.json',import.meta.url),'utf8'));
const publicationYears=[...new Set(publicationArchive.map(p=>p.year))].sort((a,b)=>b-a);
const escapeHtml=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
// Match only the first author: coauthorship alone does not establish leadership.
const traineeLed=citation=>/^(?:Yang,\s*H\b|Desjardins\b|Fang,\s*S\b|Zhang,\s*Q\b|Wu,\s*Q\b)/i.test(citation.trim());
function archiveEntry(p,index){
  const citation=escapeHtml(p.citation).replace(/Yang,?\s+J\.(?=\s|,|$)|Yang, J(?=\s*\()/g,'<strong>$&</strong>');
  return `<article class="archive-publication"><span class="citation-number" aria-hidden="true">${index+1}.</span><div>${p.status==='in press'?'<span class="tag in-press">In press</span>':''}<p class="citation">${traineeLed(p.citation)?'<span class="trainee-marker" role="img" aria-label="Led by a lab postdoctoral researcher or advised graduate student" title="Led by a lab postdoctoral researcher or advised graduate student">†</span> ':''}${citation}</p></div></article>`;
}
const nav=[['index.html','Home'],['wildfire.html','Wildfire Research'],['water.html','Water Research'],['woody-plant-encroachment.html','Woody Plant Encroachment'],['people.html','People'],['news.html','News'],['publications.html','Publications']];
const photo='assets/oklahoma-cattle-herd.jpg';
const heroSlides=JSON.parse(readFileSync(new URL('./hero-slides.json',import.meta.url),'utf8'));
const heroFrames=heroSlides.map((slide,index)=>`<div class="hero-slide${index===0?' is-active':''}" data-slide="${index}" aria-hidden="true" style="background-image:url('${escapeHtml(slide.image)}');--slide-position:${escapeHtml(slide.position)};--slide-mobile-position:${escapeHtml(slide.mobilePosition)};--slide-size:${escapeHtml(slide.size||'cover')};--slide-mobile-size:${escapeHtml(slide.mobileSize||slide.size||'cover')};background-color:${escapeHtml(slide.backgroundColor||'transparent')}"></div>`).join('');
const heroCredits=heroSlides.map((slide,index)=>`<span class="photo-credit" data-slide-credit="${index}"${index===0?'':' hidden'}><a href="${escapeHtml(slide.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(slide.label)} · ${escapeHtml(slide.credit)}</a>${slide.license?` · <a href="${escapeHtml(slide.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(slide.license)}</a>`:''}</span>`).join('');
const heroControls=`<div class="slideshow-controls" hidden><button type="button" data-slide-prev aria-label="Previous background image">←</button><div class="slide-dots" role="group" aria-label="Choose background image">${heroSlides.map((slide,index)=>`<button type="button" data-slide-go="${index}" aria-label="Show ${escapeHtml(slide.label)}" aria-pressed="${index===0}"><span></span></button>`).join('')}</div><button type="button" data-slide-next aria-label="Next background image">→</button></div>`;
const waterPhoto='https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1600&q=85';
const label=t=>`<p class="eyebrow">${t}</p>`;
const intro=(n,t,d)=>`<section class="page-intro wrap">${label(n)}<h1>${t}</h1><p class="lead">${d}</p></section>`;
const newsItems=JSON.parse(readFileSync(new URL('./news.json',import.meta.url),'utf8')).sort((a,b)=>b.date.localeCompare(a.date));
function newsEntry(item,recentOnly=false){
  const date=item.date.length===7?item.date+'-01':item.date;
  return `<article class="news-item" data-news-date="${escapeHtml(item.date)}"${recentOnly&&!isRecentNews(item.date)?' hidden':''}><div class="news-meta"><time datetime="${escapeHtml(item.date)}">${new Date(date+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',year:'numeric',timeZone:'UTC'})}</time><span>${escapeHtml(item.category)}</span></div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p>${item.website?`<p class="news-website"><a class="text-link" href="${escapeHtml(item.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.websiteLabel||'View platform')} <span aria-hidden="true">↗</span></a></p>`:''}</div></article>`;
}
const newsSection=`<section class="news-section wrap section" data-recent-news aria-labelledby="news-heading"><div class="section-heading"><div>${label('LAB UPDATES')}<h2 id="news-heading">Recent news</h2></div><a class="text-link" href="news.html">All news <span aria-hidden="true">↗</span></a></div><div class="news-list">${newsItems.map(item=>newsEntry(item,true)).join('')}</div><p class="news-empty" data-news-empty${newsItems.some(item=>isRecentNews(item.date))?' hidden':''}>No news from the past six months. Browse the news archive for earlier updates.</p></section>`;
const newsArchive=intro('LAB UPDATES','News','Research milestones and updates from the Natural Resource Modeling and Observation Lab.')+`<section class="wrap news-archive" aria-label="News archive"><div class="news-list">${newsItems.map(item=>newsEntry(item)).join('')}</div></section>`;
const pubs=[
{year:2026,topic:'Water',title:'Increasing irrigation water requirements across croplands in the Contiguous United States throughout the 21st century',authors:'Yang, H., Yang, J., Ochsner, T. E., Zhang, Q., Jiao, X., Fang, S., et al.',journal:'Agricultural Water Management · 323, 110044'},
{year:2026,topic:'Wildfire',title:'Wildfire Danger Assessment and Forecast Through Fire Spread Simulations',authors:'Yang, J., Ochsner, T., Krueger, E., Fang, S., Zhang, Q., Jiao, X., et al.',journal:'International Journal of Wildland Fire · 35, WF25278'},
{year:2026,topic:'Wildfire',title:'Satellite-based analysis of hourly progression and driving factors of large US wildfires',authors:'Fang, S., Yang, J., Jiao, X., Zou, C. B., Desjardins, A., Yang, H., et al.',journal:'International Journal of Applied Earth Observation and Geoinformation · 149, 105288'},
{year:2026,topic:'Wildfire',title:'Different Meteorological Drivers Govern Future Extreme Fire Weather Frequency and Burn Probability in the Southern Great Plains',authors:'Zhang, Q., Yang, J., Fang, S., Desjardins, A., Yang, H., Jiao, X., Zou, C.',journal:'Agricultural and Forest Meteorology · 390(15), 111458'},
{year:2026,topic:'Water',title:'Responses of Hydrological Processes to Future Climate Variability and Agricultural Land Reforestation in a Humid River Basin',authors:'Wu, Q., Yang, J., Ouyang, Y., Siegert, C., Li, P., Song, J.',journal:'Ecohydrology · 19, e70276'},
{year:2025,topic:'Wildfire',title:'Wildfire danger under changing climates in the southern Great Plains throughout the 21st century',authors:'Fang, S., Yang, J., Zou, C. B., Krueger, E. S., Ochsner, T. E., Zhang, Q.',journal:'Ecological Indicators · 170, 112994'},
{year:2025,topic:'Water',title:'Do forests store more water? A comparative analysis of water storage between multiple land cover types',authors:'Wu, Q., Yang, J., Song, J., Sun, H., Wang, H., Xing, L.',journal:'Journal of Hydrology · 133752'},
{year:2025,topic:'Water',title:'A 3 h, 1 km surface soil moisture dataset for the contiguous United States from 2015 to 2023',authors:'Yang, H., Yang, J., Ochsner, T. E., Krueger, E. S., Xu, M., Zou, C. B.',journal:'Earth System Science Data · 17(7), 3391–3409'},
{year:2024,topic:'Water',title:'Responses of streamflow to forest expansion in a typical subhumid watershed under future climate conditions',authors:'Yang, J., Winrich, A., Zhang, T., Qiao, L., Mattingly, C., Zou, C.',journal:'Journal of Environmental Management · 357, 120780'},
{year:2023,topic:'Water',title:'River flow decline across the entire Arkansas River Basin in the 21st century',authors:'Yang, J., Zou, C., Will, R., Wagner, K., Ouyang, Y., King, C., Winrich, A., Tian, H.',journal:'Journal of Hydrology · 618, 129253'}];
function pub(p){return `<article class="publication" data-topic="${p.topic}" data-year="${p.year}"><span class="pub-year">${p.year}</span><div><span class="tag ${p.topic.toLowerCase()}">${p.topic}</span><h3>${p.title}</h3><p>${p.authors}</p><p class="journal">${p.journal}</p></div></article>`;}
const topics=[['01','wildfire','Wildfire Research','Understanding fire.<br>Anticipating risk.','We combine satellite observations, fire behavior simulations, and machine learning to understand wildfire dynamics and evaluate risk in a changing climate.','Fire risk & forecasting · Prescribed fire · Remote sensing'],['02','water','Water Research','Following water.<br>Understanding change.','We examine how climate, vegetation, and land management shape water availability, watershed processes, and the future of our water resources.','Watershed modeling · Water availability · Land cover change'],['03','woody-plant-encroachment','Woody Plant Encroachment','Tracking vegetation.<br>Connecting impacts.','We investigate the spread of woody plants in grasslands and its implications for water resources, carbon dynamics, and fire under a changing climate.','Species distributions · Vegetation change · Water & carbon']];
const cards=topics.map(([n,url,t,h,d,tags])=>`<a class="research-card ${url}" href="${url}.html"><div class="card-top"><span>${n} / RESEARCH AREA</span><span class="arrow">↗</span></div><h3>${t}</h3><h4>${h}</h4><p>${d}</p><div class="card-tags">${tags}</div></a>`).join('');
const home=`<section class="hero hero-slideshow" data-slideshow data-interval="10000">${heroFrames}<div class="hero-shade"></div><div class="wrap hero-content">${label('OKLAHOMA STATE UNIVERSITY · STILLWATER, OKLAHOMA')}<h1>Modeling changes.<br>Observing Earth.<br><em>Informing solutions.</em></h1><p>Our goal is to advance understanding of changing landscapes and develop practical science-based solutions for wildfire preparedness, water and natural resource management, and ecosystem resilience.</p><a class="button" href="#research">Explore our research <span>↗</span></a></div><div class="hero-bottom wrap"><span>NATURAL RESOURCE MODELING AND OBSERVATION LAB</span><div class="slideshow-footer">${heroControls}${heroCredits}</div></div></section><section class="research-section" id="research"><div class="wrap section"><div class="section-heading"><div>${label('THREE RESEARCH FOCUSES.')}<h2>Our research</h2></div><p>From Oklahoma to the Great Plains and Global Ecosystems</p></div><div class="research-grid">${cards}</div></div></section>${newsSection}`;
const project=(f,t,d)=>`<article class="project">${label(f)}<h3>${t}</h3><p>${d}</p></article>`;
const wildfire=wildfireContent({intro,label,project,publicationArchive,archiveEntry});
const water=waterContent({intro,publicationArchive,archiveEntry});
const woody=woodyContent({intro,publicationArchive,archiveEntry});
const labMembers=JSON.parse(readFileSync(new URL('./people.json',import.meta.url),'utf8'));
const memberCard=person=>`<article class="member-card"><div class="member-initials" aria-hidden="true">${escapeHtml(person.name.split(' ').map(part=>part[0]).join(''))}</div><h3>${escapeHtml(person.name)}</h3>${person.role?`<p class="member-role">${escapeHtml(person.role)}</p>`:''}${person.note?`<p class="member-note">${escapeHtml(person.note)}</p>`:''}</article>`;
const memberSections=`<section class="wrap section lab-members" aria-labelledby="current-members-heading">${label('OUR TEAM')}<h2 id="current-members-heading">Current lab members</h2><div class="member-grid">${labMembers.current.map(memberCard).join('')}</div></section><section class="wrap section lab-members lab-volunteers" aria-labelledby="volunteers-heading">${label('CONTRIBUTING TO OUR LAB')}<h2 id="volunteers-heading">Lab Volunteers</h2><div class="member-grid">${labMembers.volunteers.map(memberCard).join('')}</div></section><section class="research-section"><div class="wrap section lab-members" aria-labelledby="former-members-heading">${label('OUR ALUMNI')}<h2 id="former-members-heading">Former lab members</h2><div class="member-grid">${labMembers.former.map(memberCard).join('')}</div></div></section>`;
const people=`<div class="people-page-hero">${intro('THE PEOPLE BEHIND THE MODELS','A curiosity for landscapes.<br>A commitment to science.','')}<div class="wrap people-hero-credit"><a href="https://commons.wikimedia.org/wiki/File:Oklahoma_Tallgrass_Prairie.jpg" target="_blank" rel="noopener noreferrer">Oklahoma prairie · Justin Meissen · CC BY-SA 2.0</a></div></div>`+`<section class="wrap section profile"><div class="profile-art" aria-hidden="true"><svg viewBox="0 0 400 450"><g fill="none" stroke="currentColor" stroke-width="1">${Array.from({length:18},(_,i)=>`<path d="M-40 ${80+i*20} Q ${100+i*8} ${-70+i*20} 220 ${110+i*15} T 480 ${120+i*20}"/>`).join('')}</g><text x="42" y="340" fill="currentColor" font-family="Georgia" font-size="90">JY</text></svg><span>LAB DIRECTOR</span></div><div>${label('PRINCIPAL INVESTIGATOR')}<h2>Jia Yang</h2><p class="large-copy">Assistant Professor</p><p>Department of Natural Resource Ecology and Management<br>Oklahoma State University</p><p><a class="text-link" href="mailto:jia.yang11@okstate.edu">jia.yang11@okstate.edu</a></p><p>Jia Yang studies fire ecology, wildfire risk and forecasting, and the impacts of climate change and disturbances on land ecosystems. His work combines ecological modeling, GIS, and remote sensing to investigate the connections among wildfire, vegetation, water, and carbon.</p><p>He joined Oklahoma State University in January 2022, following an assistant professor appointment at Mississippi State University and research appointments at Auburn University.</p></div></section>${memberSections}`;
const publications=intro('RESEARCH OUTPUT','Knowledge to build on.','Publications spanning wildfire, water, and ecosystem science.')+`<section class="wrap publications-body"><nav class="year-navigation" aria-label="Publication years">${publicationYears.map(year=>`<a href="#year-${year}">${year}</a>`).join('')}</nav><p class="publication-legend"><span class="trainee-marker" aria-hidden="true">†</span> Paper led by a lab postdoctoral researcher or advised graduate student (first author).</p><div id="publication-list">${publicationYears.map(year=>`<section class="publication-year" id="year-${year}" aria-labelledby="heading-${year}"><h2 id="heading-${year}">${year}</h2>${publicationArchive.filter(p=>p.year===year).map(p=>archiveEntry(p,publicationArchive.indexOf(p))).join('')}</section>`).join('')}</div></section>`;
for(const [file,title,body] of [['index.html','Home',home],['wildfire.html','Wildfire Research',wildfire],['water.html','Water Research',water],['woody-plant-encroachment.html','Woody Plant Encroachment',woody],['people.html','People',people],['news.html','News',newsArchive],['publications.html','Publications',publications]]){
writeFileSync(file,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Natural Resource Modeling and Observation Lab at Oklahoma State University. Research on wildfire, water, woody plant encroachment, and changing ecosystems, led by Jia Yang."><meta name="theme-color" content="#193c34"><title>${title==='Home'?'Natural Resource Modeling and Observation Lab':title+' | Natural Resource Modeling and Observation Lab'} · Oklahoma State University</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="styles.css"><script src="script.js" defer></script><script type="module" src="news-window.js"></script></head><body><a class="skip-link" href="#main">Skip to content</a><header><div class="header-inner"><a class="brand" href="index.html" aria-label="Natural Resource Modeling and Observation Lab home"><img src="assets/logo.svg" width="45" height="45" alt="" aria-hidden="true"><span>Natural Resource<br><strong>Modeling and Observation Lab</strong></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span>☰</span></button><nav id="navigation" aria-label="Main navigation">${nav.map(([url,t])=>`<a href="${url}"${file===url?' aria-current="page"':''}>${t}</a>`).join('')}</nav></div></header><main id="main">${body}</main><footer><div class="wrap footer-top"><div class="footer-brand">Natural Resource<br><em>Modeling and Observation Lab</em></div><div><p>Department of Natural Resource<br>Ecology and Management</p><p>Oklahoma State University<br>Stillwater, Oklahoma</p></div><a href="index.html" class="back-top">Back to home ↗</a></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Natural Resource Modeling and Observation Lab</span><span class="osu">OKLAHOMA STATE UNIVERSITY</span></div></footer></body></html>`);
}
console.log('Built 7 static pages.');
































