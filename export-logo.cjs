const fs=require('fs');
const sharp=require('C:/Users/jyang11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const svg=fs.readFileSync('assets/logo.svg','utf8').replace('<svg ','<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replaceAll('textPath href=','textPath xlink:href=');
(async()=>{await sharp(Buffer.from(svg),{density:300}).resize(1200,1200).png().toFile('assets/logo.png');await sharp('assets/logo.png').resize(360,360).png().toFile('assets/logo-email.png');})();
