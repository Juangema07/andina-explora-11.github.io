(()=>{
'use strict';
if(window.__ANDINA_TRAVEL_QUALITY_FIX__)return;
window.__ANDINA_TRAVEL_QUALITY_FIX__=true;
const state=new WeakMap();
function info(){const mini=document.querySelector('#travel2Mini'),a=document.querySelector('#travel2Arena');if(!mini||!a)return null;const title=(mini.querySelector('h4')?.textContent||'').toLowerCase();return{mini,a,title,boss:mini.classList.contains('t2-boss')}}
function kind(x){if(x.boss)return'boss';const t=x.title;if(t.includes('café')||t.includes('cafe'))return'coffee';if(t.includes('pájaro')||t.includes('pajaros')||t.includes('aves')||t.includes('fotografía')||t.includes('fotografia')||t.includes('bird'))return'bird';if(t.includes('basura')||t.includes('residuo')||t.includes('contamin')||t.includes('río')||t.includes('rio'))return'trash';return'other'}
function randomPercent(min,max){return min+Math.random()*(max-min)}
function scatterCoffee(a){const items=[...a.querySelectorAll('.t2-item:not(.hit)')];items.forEach(el=>{if(el.dataset.randomX==='1')return;el.style.setProperty('left',randomPercent(8,92)+'%','important');el.dataset.randomX='1'})}
function scatterStatic(a){const items=[...a.querySelectorAll('.t2-item:not(.hit)')];if(!items.length)return;const r=a.getBoundingClientRect();if(!r.width||!r.height)return;const cols=Math.max(2,Math.ceil(Math.sqrt(items.length)));const rows=Math.max(2,Math.ceil(items.length/cols));const pad=Math.max(10,Math.min(24,r.width*.04));const cells=[];for(let row=0;row<rows;row++)for(let col=0;col<cols;col++)cells.push({row,col});for(let i=cells.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cells[i],cells[j]]=[cells[j],cells[i]]}items.forEach((el,i)=>{if(el.dataset.randomPlace==='1')return;const c=cells[i%cells.length];const cw=(r.width-pad*2)/cols,ch=(r.height-pad*2)/rows;const x=pad+c.col*cw+Math.random()*Math.max(1,cw-Math.min(el.offsetWidth,80));const y=pad+c.row*ch+Math.random()*Math.max(1,ch-Math.min(el.offsetHeight,70));el.style.setProperty('left',x+'px','important');el.style.setProperty('top',y+'px','important');el.dataset.randomPlace='1'})}
function reset(a){a.querySelectorAll('.t2-item').forEach(el=>{delete el.dataset.randomX;delete el.dataset.randomPlace;el.style.removeProperty('transition')})}
function run(){const x=info();if(!x)return;const k=kind(x);if(k==='other'){reset(x.a);return}const s=state.get(x.a);if(!s||s.kind!==k){reset(x.a);state.set(x.a,{kind:k})}if(k==='coffee')scatterCoffee(x.a);else scatterStatic(x.a)}
function boot(){run();const mo=new MutationObserver(()=>{clearTimeout(boot._t);boot._t=setTimeout(run,35)});mo.observe(document.body,{childList:true,subtree:true});window.addEventListener('resize',()=>{const x=info();if(!x)return;if(kind(x)==='coffee'){x.a.querySelectorAll('.t2-item').forEach(el=>{delete el.dataset.randomX})}else{reset(x.a)}run()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
