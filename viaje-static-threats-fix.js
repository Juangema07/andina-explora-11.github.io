(()=>{
'use strict';
if(window.__ANDINA_STATIC_THREATS_FIX__)return;
window.__ANDINA_STATIC_THREATS_FIX__=true;

// Los pájaros ya no se desplazan: conservamos únicamente su posición aleatoria inicial.
const nativeRAF=window.requestAnimationFrame.bind(window);
window.requestAnimationFrame=function(cb){
  let src='';
  try{src=Function.prototype.toString.call(cb)}catch(e){}
  if(src.includes('document.body.contains(el)')&&src.includes('maxX')&&src.includes('maxY'))return 0;
  return nativeRAF(cb);
};

const threats=['🗑️','🔥','💨','🚗','🧴','🪵','⛏️','🏭','🛢️','☠️','🚜','🌫️','🧪','🪓','🚧','🗑️','🔥','🏭','🛢️','🚗'];
function arrangeBoss(){
  const arena=document.querySelector('#travel2Arena');
  const mini=document.querySelector('#travel2Mini.t2-boss');
  if(!arena||!mini||mini.dataset.staticThreatsReady==='1')return;
  mini.dataset.staticThreatsReady='1';
  const items=[...arena.querySelectorAll('.t2-item')];
  // Añadimos amenazas extra para que el BOSS se sienta realmente como una prueba final.
  for(let i=items.length;i<threats.length;i++){
    const b=document.createElement('button');
    b.className='t2-item t2-extra-threat';
    b.type='button';
    b.textContent=threats[i];
    b.addEventListener('click',()=>{
      if(b.classList.contains('hit'))return;
      b.classList.add('hit');
      // Delegamos el punto en una amenaza original para conservar la lógica de victoria del BOSS.
      const original=[...arena.querySelectorAll('.t2-item:not(.t2-extra-threat):not(.hit)')][0];
      if(original)original.click();
    });
    arena.appendChild(b);
    items.push(b);
  }
  // Repartimos todas las amenazas en una cuadrícula con un pequeño azar para evitar montones.
  const all=[...arena.querySelectorAll('.t2-item')];
  all.forEach((el,i)=>{
    const col=i%5,row=Math.floor(i/5);
    const jitter=(Math.random()*5)-2.5;
    el.style.left=Math.max(2,Math.min(91,4+col*19+jitter))+'%';
    el.style.top=Math.max(3,Math.min(82,5+row*22+jitter))+'%';
    el.style.animation='none';
  });
}

function watch(){
  const root=document.body;
  if(!root)return;
  const check=()=>{if(document.querySelector('#travel2Mini.t2-boss'))arrangeBoss()};
  check();
  new MutationObserver(check).observe(root,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});
else watch();
})();
