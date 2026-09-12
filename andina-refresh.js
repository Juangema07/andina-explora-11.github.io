(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

function reveal(){
  const items=$$('.section-head,.topic-card,.physical-layout > *, .human-dashboard > *, .human-topics > *, .info-strip,.sector-switch,.econ-feature,.connection-card,.culture-card,.challenge-grid > *, .reflection,.game-card,.resource-list a,.sources-note');
  items.forEach((el,i)=>{el.classList.add('reveal'); if(i%4===1)el.classList.add('reveal-delay-1'); if(i%4===2)el.classList.add('reveal-delay-2'); if(i%4===3)el.classList.add('reveal-delay-3')});
  if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('pro-ready'));return}
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('pro-ready');obs.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -35px'});
  items.forEach(x=>obs.observe(x));
}

function removeDuplicateLayers(){
  // The old enhancement script created a second navigation and a second info system.
  // Keep the main interface as the single source of truth.
  $('#proNav')?.remove();
  $('#proInfoModal')?.remove();
  // Keep only the app's classic crossword. The older standalone crossword injected
  // another board into the games section, which caused the duplicated/overlapping UI.
  $$('.pro-crossword-wrap').forEach(x=>x.remove());
}

function progress(){
  const bar=document.createElement('div');bar.className='site-progress';bar.innerHTML='<i></i>';document.body.appendChild(bar);
  const fill=$('.site-progress i');
  const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;fill.style.width=(max>0?scrollY/max*100:0)+'%'};
  addEventListener('scroll',update,{passive:true});update();
}

function ripple(){
  document.addEventListener('click',e=>{
    const b=e.target.closest('.btn,.topic-card,.culture-card,.challenge-grid button,.game-card button');
    if(!b||document.body.classList.contains('no-motion'))return;
    const r=document.createElement('span');r.className='click-ripple';const rect=b.getBoundingClientRect();
    r.style.left=(e.clientX-rect.left)+'px';r.style.top=(e.clientY-rect.top)+'px';b.appendChild(r);setTimeout(()=>r.remove(),650);
  });
}

function heroParallax(){
  const hero=$('#inicio');if(!hero)return;
  addEventListener('scroll',()=>{if(document.body.classList.contains('no-motion'))return;const y=Math.min(scrollY,500);hero.style.setProperty('--scroll-y',y+'px')},{passive:true});
}

function styleExtras(){
  const s=document.createElement('style');s.textContent=`
    .site-progress{position:fixed;z-index:400;left:0;right:0;top:0;height:3px;background:transparent;pointer-events:none}.site-progress i{display:block;width:0;height:100%;background:var(--lime);box-shadow:0 0 12px rgba(220,235,145,.65);transition:width .08s linear}
    .click-ripple{position:absolute;width:12px;height:12px;border-radius:50%;background:rgba(220,235,145,.55);transform:translate(-50%,-50%) scale(1);animation:rippleOut .6s ease-out forwards;pointer-events:none}.btn,.topic-card,.culture-card,.challenge-grid button,.game-card button{position:relative;overflow:hidden}
    .hero-mountain{transform:translateY(calc(var(--scroll-y,0px)*-.035))}.hero-content{transform:translateY(calc(var(--scroll-y,0px)*-.025))}
    @keyframes rippleOut{to{opacity:0;transform:translate(-50%,-50%) scale(18)}}
  `;document.head.appendChild(s);
}

function init(){removeDuplicateLayers();styleExtras();progress();reveal();ripple();heroParallax();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();