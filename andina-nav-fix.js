(()=>{
'use strict';
const items=[
 ['inicio','Inicio'],
 ['geografia','Geografía física'],
 ['humana','Geografía humana'],
 ['economia','Geografía económica'],
 ['cultura','Cultura y diversidad'],
 ['desafios','Problemáticas'],
 ['juegos','Actividades'],
 ['recursos','Fuentes'],
 ['explora','Explora']
];
function fixNav(){
 const old=document.getElementById('proNav');
 if(old) old.remove();
 const nav=document.getElementById('mainNav');
 if(!nav) return;
 nav.innerHTML='';
 nav.setAttribute('aria-label','Secciones de la Región Andina');
 items.forEach(([id,label])=>{
   const a=document.createElement('a');
   a.href='#'+id;
   a.textContent=label;
   nav.appendChild(a);
 });
 const links=[...nav.querySelectorAll('a')];
 links.forEach(a=>a.addEventListener('click',()=>{
   links.forEach(x=>x.classList.remove('active'));
   a.classList.add('active');
 }));
 const targets=items.map(([id])=>document.getElementById(id)).filter(Boolean);
 if('IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>{
     entries.forEach(entry=>{
       if(entry.isIntersecting){
         links.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));
       }
     });
   },{rootMargin:'-25% 0px -65% 0px',threshold:0});
   targets.forEach(t=>observer.observe(t));
 }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(fixNav,80));
else setTimeout(fixNav,80);
})();
