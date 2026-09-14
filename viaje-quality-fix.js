(()=>{
'use strict';
if(window.__ANDINA_TRAVEL_QUALITY_FIX__)return;
window.__ANDINA_TRAVEL_QUALITY_FIX__=true;
const state=new WeakMap();
function arenaInfo(){const mini=document.querySelector('#travel2Mini'),a=document.querySelector('#travel2Arena');if(!mini||!a)return null;const title=(mini.querySelector('h4')?.textContent||'').toLowerCase();return{mini,a,title}}
function isCoffee(t){return t.includes('atrapa el café')||t.includes('atrapa el cafe')}
function isBird(t){return t.includes('pájaro')||t.includes('pajaros')||t.includes('aves')||t.includes('fotografía')||t.includes('fotografia')||t.includes('bird')}
function isTrash(t){return t.includes('basura')||t.includes('residuo')||t.includes('contamin')||t.includes('amenaza')||t.includes('boss')||t.includes('biodiversidad')}
function clampItems(a,items){const r=a.getBoundingClientRect(),pad=18;items.forEach(el=>{const x=parseFloat(el.style.left)||0,y=parseFloat(el.style.top)||0;const w=Math.max(0,r.width-el.offsetWidth-pad*2),h=Math.max(0,r.height-el.offsetHeight-pad*2);el.style.left=Math.max(pad,Math.min(w+pad,x))+'px';el.style.top=Math.max(pad,Math.min(h+pad,y))+'px'})}
function spreadStatic(a,items){const r=a.getBoundingClientRect();if(!r.width||!r.height)return;const gap=Math.max(12,Math.min(34,r.width*.06));const cols=Math.max(2,Math.ceil(Math.sqrt(items.length*1.45)));const rows=Math.ceil(items.length/cols);items.forEach((el,i)=>{const col=i%cols,row=Math.floor(i/cols);const x=gap+(col+.5)*(r.width-2*gap)/cols-el.offsetWidth/2;const y=gap+(row+.5)*(r.height-2*gap)/rows-el.offsetHeight/2;el.style.left=Math.max(gap,Math.min(r.width-gap-el.offsetWidth,x))+'px';el.style.top=Math.max(gap,Math.min(r.height-gap-el.offsetHeight,y))+'px'})}
function arrange(){const info=arenaInfo();if(!info)return;const {a,title}=info;const items=[...a.querySelectorAll('.t2-item:not(.hit)')];if(!items.length)return;const s=state.get(a)||{kind:''};let kind=isCoffee(title)?'coffee':isBird(title)?'bird':isTrash(title)?'trash':'other';if(s.kind!==kind){state.set(a,{kind});items.forEach(el=>{el.style.transition=kind==='bird'?'left .22s linear, top .22s linear, transform .15s ease': 'transform .15s ease';});}
if(kind==='coffee'){items.slice(0,4).forEach((el,i)=>{el.style.zIndex=3;const r=a.getBoundingClientRect();const cols=2;const col=i%cols,row=Math.floor(i/cols);const x=(col+.5)*r.width/cols-el.offsetWidth/2;const y=16+row*Math.max(52,r.height/3);el.style.left=Math.max(10,Math.min(r.width-el.offsetWidth-10,x))+'px';el.style.top=Math.min(r.height-el.offsetHeight-10,y)+'px'});items.slice(4).forEach(el=>el.remove());}
else if(kind==='trash'){if(items.length>7)items.slice(7).forEach(el=>el.remove());spreadStatic(a,[...a.querySelectorAll('.t2-item:not(.hit)')]);}
else if(kind==='bird'){clampItems(a,items);}
else{clampItems(a,items)} }
function boot(){const run=()=>arrange();run();new MutationObserver(run).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});setInterval(run,220);window.addEventListener('resize',run)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
