const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}});

const slideshow=document.querySelector('[data-slideshow]');
if(slideshow){
  const slides=[...slideshow.querySelectorAll('[data-slide]')];
  const credits=[...slideshow.querySelectorAll('[data-slide-credit]')];
  const dots=[...slideshow.querySelectorAll('[data-slide-go]')];
  let active=0,timer;
  function schedule(){
    clearInterval(timer);
    if(!document.hidden)timer=setInterval(()=>show(active+1),Number(slideshow.dataset.interval));
  }
  function show(index){
    active=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===active));
    credits.forEach((credit,i)=>credit.hidden=i!==active);
    dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===active)));
  }
  slideshow.querySelector('.slideshow-controls').hidden=false;
  slideshow.querySelector('[data-slide-prev]').addEventListener('click',()=>{show(active-1);schedule();});
  slideshow.querySelector('[data-slide-next]').addEventListener('click',()=>{show(active+1);schedule();});
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);schedule();}));
  document.addEventListener('visibilitychange',schedule);
  schedule();
}


const topicMenus=[...document.querySelectorAll('.fire-topic-menu')];
function closeOtherTopics(current){topicMenus.forEach(topic=>{if(topic!==current)topic.open=false;});}
topicMenus.forEach(topic=>{
  topic.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){closeOtherTopics(topic);topic.open=true;}});
  topic.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!topic.contains(document.activeElement))topic.open=false;});
  topic.addEventListener('focusout',()=>{setTimeout(()=>{if(!topic.contains(document.activeElement)&&!topic.matches(':hover'))topic.open=false;},0);});
  topic.addEventListener('toggle',()=>{if(topic.open)closeOtherTopics(topic);});
  topic.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{topic.open=false;}));
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')topicMenus.forEach(topic=>{if(topic.open){if(topic.contains(document.activeElement))topic.querySelector('summary').focus();topic.open=false;}});});
document.addEventListener('click',event=>{if(!event.target.closest('.fire-topic-menu'))topicMenus.forEach(topic=>{topic.open=false;});});
// Enlarge research figures in a keyboard-accessible native dialog.
const researchFigures=[...document.querySelectorAll('.fire-study-figure')];
if(researchFigures.length){
  const dialog=document.createElement('dialog');
  dialog.className='figure-dialog';
  dialog.setAttribute('aria-label','Research figure');
  const close=document.createElement('button');
  close.type='button'; close.className='figure-dialog-close'; close.textContent='Close ✕';
  const fullImage=document.createElement('img');
  const caption=document.createElement('p');
  dialog.append(close,fullImage,caption);document.body.append(dialog);
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
  researchFigures.forEach(figure=>{
    const image=figure.querySelector('img');if(!image)return;
    const button=document.createElement('button');button.type='button';button.className='figure-enlarge';button.textContent='Enlarge figure ↗';
    button.setAttribute('aria-label','Enlarge figure: '+(image.alt||'Research figure'));
    button.addEventListener('click',()=>{fullImage.src=image.currentSrc||image.src;fullImage.alt=image.alt;caption.textContent=figure.querySelector('figcaption')?.textContent||'';dialog.showModal();});
    image.style.cursor='zoom-in'; image.addEventListener('click',()=>button.click());
    figure.append(button);
  });
}

// Keep a return-to-top control within reach on long pages.
const returnToTop=document.createElement('button');
returnToTop.type='button';returnToTop.className='return-to-top';
returnToTop.textContent='↑ Back to top';returnToTop.hidden=true;
returnToTop.setAttribute('aria-label','Back to top of page');
document.body.append(returnToTop);
function updateReturnToTop(){returnToTop.hidden=window.scrollY<500;}
window.addEventListener('scroll',updateReturnToTop,{passive:true});
updateReturnToTop();
returnToTop.addEventListener('click',()=>{
  const header=document.querySelector('header');
  header.setAttribute('tabindex','-1');header.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});

// Native details toggles handle touch; hover is enabled only on desktop pointers.
const desktopNavigationHover=()=>window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)').matches;
document.querySelectorAll('.research-navigation').forEach(dropdown=>{
 dropdown.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&desktopNavigationHover())dropdown.open=true;});
 dropdown.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&desktopNavigationHover()&&!dropdown.contains(document.activeElement))dropdown.open=false;});
 // Do not close on focusout: touch browsers may blur the summary before a link click.
 document.addEventListener('click',event=>{if(!dropdown.contains(event.target))dropdown.open=false;});
 dropdown.addEventListener('keydown',event=>{if(event.key==='Escape'){dropdown.open=false;dropdown.querySelector('summary').focus();}});
});
