(()=>{
'use strict';
if(window.__ANDINA_TRAVEL_QUALITY_FIX__)return;
window.__ANDINA_TRAVEL_QUALITY_FIX__=true;
const state=new WeakMap();
const STYLE_ID='andina-travel-random-fix-style';
// Solo bloquea el movimiento automático de las aves. No toca el resto de animaciones.
const nativeRAF=window.requestAnimationFrame.bind(window);
window.requestAnimationFrame=function(cb){
 let src='';
 try{src=Function.prototype.toString.call(cb)}catch(e){}
 if(src.includes('document.body.contains(el)')&&src.includes('maxX')&&src.includes('maxY'))return 0;
 return nativeRAF(cb)
};
function inject(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
 #travel2Arena .t2-bird-static{animation:none!important;transform:none!important}
 `;document.head.appendChild(s)
}
function info(){
 const mini=document.querySelector('#travel2Mini'),a=document.querySelector('#travel2Arena');
 if(!mini||!a)return null;
 const title=(mini.querySelector('h4')?.textContent||'').toLowerCase();
 return{mini,a,title,boss:mini.classList.contains('t2-boss')}
}
function kind(x){
 if(x.boss)return'boss';
 const t=x.title;
 if(t.includes('café')||t.includes('cafe'))return'coffee';
 if(t.includes('pájaro')||t.includes('pajaros')||t.includes('aves')||t.includes('fotografía')||t.includes('fotografia')||t.includes('bird'))return'bird';
 if(t.includes('basura')||t.includes('residuo')||t.includes('contamin')||t.includes('río')||t.includes('rio'))return'trash';
 return'other'
}
function reset(a){
 a.querySelectorAll('.t2-item').forEach(el=>{
  delete el.dataset.randomFall;delete el.dataset.randomPlace;
  el.classList.remove('t2-bird-static');
  el.style.removeProperty('transition');
 })
}
function coffee(a){
 [...a.querySelectorAll('.t2-item:not(.hit)')].forEach(el=>{
  if(el.dataset.randomFall==='1')return;
  const x=8+Math.random()*84;
  const duration=1700+Math.random()*1800;
  const delay=Math.random()*900;
  el.dataset.randomFall='1';
  el.style.setProperty('left',x+'%','important');
  el.style.setProperty('top','-45px','important');
  el.style.setProperty('animation','none','important');
  el.dataset.fallStart=String(performance.now()+delay);
  el.dataset.fallDuration=String(duration);
 })
 if(!a.dataset.coffeeLoop){
  a.dataset.coffeeLoop='1';
  const tick=now=>{
   if(!document.body.contains(a)){delete a.dataset.coffeeLoop;return}
   a.querySelectorAll('.t2-item[data-random-fall="1"]:not(.hit)').forEach(el=>{
    const start=Number(el.dataset.fallStart)||now,duration=Number(el.dataset.fallDuration)||2200;
    const p=Math.max(0,Math.min(1,(now-start)/duration));
    if(p>=1){el.classList.add('hit');el.style.opacity='.12';return}
    const r=a.clientHeight||250;
    el.style.setProperty('top',(-45+p*(r+55))+'px','important');
   });
   requestAnimationFrame(tick)
  };
  requestAnimationFrame(tick)
 }
}
function birds(a){
 a.querySelectorAll('.t2-item').forEach(el=>{
  el.classList.add('t2-bird-static');
  el.style.setProperty('animation','none','important');
  el.style.setProperty('transform','none','important');
 })
}
function trash(a){
 const items=[...a.querySelectorAll('.t2-item:not(.hit)')];
 items.forEach((el,i)=>{
  if(el.dataset.randomPlace==='1')return;
  const cols=3,rows=Math.ceil(items.length/cols),col=i%cols,row=Math.floor(i/cols);
  const x=7+col*(82/(cols-1))+(Math.random()*12-6);
  const y=12+row*(68/Math.max(1,rows-1))+(Math.random()*12-6);
  el.dataset.randomPlace='1';
  el.style.setProperty('left',Math.max(3,Math.min(91,x))+'%','important');
  el.style.setProperty('top',Math.max(5,Math.min(82,y))+'%','important');
  el.style.setProperty('animation','none','important');
  el.style.setProperty('transform','none','important');
 })
}
function run(){
 inject();
 const x=info();if(!x)return;
 const k=kind(x);
 if(k==='other'){reset(x.a);return}
 const s=state.get(x.a);
 if(!s||s.kind!==k){reset(x.a);state.set(x.a,{kind:k})}
 if(k==='coffee')coffee(x.a);
 else if(k==='bird')birds(x.a);
 else if(k==='trash')trash(x.a);
}
function boot(){
 inject();run();
 const mo=new MutationObserver(()=>{clearTimeout(boot._t);boot._t=setTimeout(run,25)});
 mo.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('resize',()=>{const x=info();if(!x)return;if(kind(x)==='coffee')x.a.querySelectorAll('.t2-item').forEach(el=>delete el.dataset.randomFall);else if(kind(x)==='trash')x.a.querySelectorAll('.t2-item').forEach(el=>delete el.dataset.randomPlace);run()})
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();