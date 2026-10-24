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
