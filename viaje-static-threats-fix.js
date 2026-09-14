(()=>{
'use strict';
if(window.__ANDINA_STATIC_THREATS_FIX__)return;
window.__ANDINA_STATIC_THREATS_FIX__=true;
const threats=['🗑️','🔥','💨','🚗','🧴','🪵','⛏️','🏭','🛢️','☠️','🚜','🌫️','🧪','🪓','🚧','🗑️','🔥','🏭','🛢️','🚗'];
function arrangeBoss(){
 const arena=document.querySelector('#travel2Arena');
 const mini=document.querySelector('#travel2Mini.t2-boss');
 if(!arena||!mini||mini.dataset.staticThreatsReady==='1')return;
 mini.dataset.staticThreatsReady='1';
 const items=[...arena.querySelectorAll('.t2-item')];
 for(let i=items.length;i<threats.length;i++){
  const b=document.createElement('button');
  b.className='t2-item t2-extra-threat';b.type='button';b.textContent=threats[i];
  b.addEventListener('click',()=>{if(b.classList.contains('hit'))return;b.classList.add('hit');const original=[...arena.querySelectorAll('.t2-item:not(.t2-extra-threat):not(.hit)')][0];if(original)original.click()});
  arena.appendChild(b);
 }
 const all=[...arena.querySelectorAll('.t2-item')];
 all.forEach((el,i)=>{
  const cols=5,rows=Math.ceil(all.length/cols),col=i%cols,row=Math.floor(i/cols);
  const x=5+col*(88/Math.max(1,cols-1))+(Math.random()*7-3.5);
  const y=6+row*(76/Math.max(1,rows-1))+(Math.random()*7-3.5);
  el.style.left=Math.max(2,Math.min(92,x))+'%';el.style.top=Math.max(3,Math.min(84,y))+'%';el.style.animation='none';
 });
}
function watch(){
 const check=()=>{if(document.querySelector('#travel2Mini.t2-boss'))arrangeBoss()};
 check();new MutationObserver(check).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});else watch();
})();
