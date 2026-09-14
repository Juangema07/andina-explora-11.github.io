(()=>{
'use strict';
if(window.__ANDINA_TRAVEL_QUALITY_FIX__)return;
window.__ANDINA_TRAVEL_QUALITY_FIX__=true;
const state=new WeakMap();
const STYLE_ID='andina-travel-random-fix-style';
function inject(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
 @keyframes andinaCoffeeFall{from{top:-55px}to{top:calc(100% + 25px)}}
 #travel2Arena .t2-coffee-random{animation:andinaCoffeeFall var(--coffee-duration,2.4s) linear var(--coffee-delay,0s) forwards!important}
 #travel2Arena .t2-trash-random{animation:none!important;transform:none!important}
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
  delete el.dataset.randomX;delete el.dataset.randomPlace;delete el.dataset.randomFall;
  el.classList.remove('t2-coffee-random','t2-trash-random');
  el.style.removeProperty('transition');el.style.removeProperty('animation');
 })
}
function coffee(a){
 [...a.querySelectorAll('.t2-item:not(.hit)')].forEach(el=>{
  if(el.dataset.randomFall==='1')return;
  const x=8+Math.random()*84;
  const duration=1.6+Math.random()*1.7;
  const delay=Math.random()*1.1;
  el.dataset.randomFall='1';
  el.style.setProperty('left',x+'%','important');
  el.style.setProperty('top','-55px','important');
  el.style.setProperty('--coffee-duration',duration+'s');
  el.style.setProperty('--coffee-delay',delay+'s');
  el.classList.add('t2-coffee-random');
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
  el.classList.add('t2-trash-random');
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
 else if(k==='trash')trash(x.a);
}
function boot(){
 inject();run();
 const mo=new MutationObserver(()=>{clearTimeout(boot._t);boot._t=setTimeout(run,25)});
 mo.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('resize',()=>{const x=info();if(!x)return;if(kind(x)==='coffee')x.a.querySelectorAll('.t2-item').forEach(el=>{delete el.dataset.randomFall;el.classList.remove('t2-coffee-random')});else if(kind(x)==='trash')x.a.querySelectorAll('.t2-item').forEach(el=>{delete el.dataset.randomPlace;el.classList.remove('t2-trash-random')});run()})
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();