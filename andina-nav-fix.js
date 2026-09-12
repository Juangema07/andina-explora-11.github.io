(()=>{
'use strict';
const items=[
 ['inicio','Inicio'],['geografia','Geografía física'],['humana','Geografía humana'],['economia','Geografía económica'],['cultura','Cultura y diversidad'],['desafios','Problemáticas'],['juegos','Actividades'],['recursos','Fuentes'],['explora','Explora']
];
function setupNav(){
 const old=document.getElementById('proNav'); if(old) old.remove();
 const nav=document.getElementById('mainNav'); if(!nav) return;
 nav.innerHTML=''; nav.setAttribute('aria-label','Secciones de la Región Andina');
 items.forEach(([id,label])=>{const a=document.createElement('a');a.href='#'+id;a.textContent=label;nav.appendChild(a)});
 const links=[...nav.querySelectorAll('a')];
 const activate=hash=>links.forEach(a=>a.classList.toggle('active',a.hash===hash));
 links.forEach(a=>a.addEventListener('click',()=>activate(a.hash)));
 const targets=items.map(([id])=>document.getElementById(id)).filter(Boolean);
 if('IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)activate('#'+entry.target.id)}),{rootMargin:'-18% 0px -70% 0px',threshold:0});
   targets.forEach(t=>observer.observe(t));
 }
}
function setupSettings(){
 const btn=document.getElementById('customizeBtn'),panel=document.getElementById('customPanel'),close=document.getElementById('closeCustom');
 if(!btn||!panel) return;
 const open=()=>{panel.classList.add('show');btn.setAttribute('aria-expanded','true')};
 const hide=()=>{panel.classList.remove('show');btn.setAttribute('aria-expanded','false')};
 btn.setAttribute('aria-expanded','false'); btn.addEventListener('click',()=>panel.classList.contains('show')?hide():open());
 if(close)close.addEventListener('click',hide);
 document.addEventListener('click',e=>{if(panel.classList.contains('show')&&!panel.contains(e.target)&&e.target!==btn)hide()});
 const theme=document.getElementById('themeSelect');
 if(theme)theme.addEventListener('change',()=>document.documentElement.dataset.theme=theme.value);
 const scale=document.getElementById('fontScale');
 if(scale)scale.addEventListener('input',()=>document.documentElement.style.setProperty('--scale',scale.value));
 const motion=document.getElementById('motionToggle');
 if(motion)motion.addEventListener('change',()=>document.documentElement.classList.toggle('motion-reduced',!motion.checked));
 const contrast=document.getElementById('contrastToggle');
 if(contrast)contrast.addEventListener('change',()=>document.documentElement.classList.toggle('high-contrast',contrast.checked));
}
function boot(){setupNav();setupSettings()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,40));else setTimeout(boot,40);
})();
