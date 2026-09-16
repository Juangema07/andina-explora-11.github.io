(()=>{
'use strict';
if(window.__ANDINA_GUIA_COBERTURA__)return;
window.__ANDINA_GUIA_COBERTURA__=true;
const $=(s,r=document)=>r.querySelector(s);
const links=`<div class="companion-webs" id="webs-companeros"><div class="companion-head"><span class="eyebrow">EXPLORA MÁS</span><h3>Webs de nuestros compañeros</h3><p>Visita los proyectos de otros grupos desde esta página.</p></div><div class="companion-links"><a href="https://viajeporelamazonascolombiano.my.canva.site/ubicacin-del-amazonas" target="_blank" rel="noopener noreferrer"><span>🌿</span><div><b>Amazonas</b><small>Viaje por el Amazonas Colombiano ↗</small></div></a><a href="https://classy-hummingbird-f8d446.netlify.app" target="_blank" rel="noopener noreferrer"><span>🌎</span><div><b>Proyecto de compañero</b><small>Visitar web ↗</small></div></a><a href="https://juangema07.github.io/Descubriendo-la-Orinoqu-a/#presentacion" target="_blank" rel="noopener noreferrer"><span>🌾</span><div><b>Orinoquía</b><small>Descubriendo la Orinoquía ↗</small></div></a></div></div>`;
function addCompanionLinks(){
 if(document.getElementById('webs-companeros'))return;
 const rec=$('#recursos');
 if(!rec)return;
 const box=document.createElement('div');
 box.innerHTML=links;
 rec.appendChild(box.firstElementChild);
 if(!document.getElementById('companion-webs-style')){
  const style=document.createElement('style');
  style.id='companion-webs-style';
  style.textContent='.companion-webs{margin:32px 0 0;padding:26px;border:1px solid rgba(22,59,49,.18);border-radius:22px;background:linear-gradient(135deg,#fff,#edf6f0);box-shadow:0 14px 34px rgba(18,48,38,.10)}.companion-head{margin-bottom:18px}.companion-head h3{margin:6px 0;font-size:1.45rem}.companion-head p{margin:0;opacity:.75}.companion-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.companion-links a{display:flex;align-items:center;gap:12px;padding:15px;text-decoration:none;color:inherit;border:1px solid rgba(22,59,49,.12);border-radius:16px;background:rgba(255,255,255,.8);transition:transform .2s,box-shadow .2s}.companion-links a:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(18,48,38,.12)}.companion-links a>span{font-size:1.8rem}.companion-links b,.companion-links small{display:block}.companion-links small{margin-top:3px;opacity:.68}@media(max-width:760px){.companion-links{grid-template-columns:1fr}.companion-webs{padding:20px}}';
  document.head.appendChild(style);
 }
}
function add(){
 const rec=$('#recursos');
 if(!rec){setTimeout(add,700);return}
 addCompanionLinks();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add,{once:true});else add();
setTimeout(addCompanionLinks,1200);
setTimeout(addCompanionLinks,3000);
})();