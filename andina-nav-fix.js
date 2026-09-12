(()=>{
'use strict';

const items=[
 ['inicio','Inicio'],['geografia','Geografía física'],['humana','Geografía humana'],['economia','Geografía económica'],['cultura','Cultura y diversidad'],['desafios','Problemáticas'],['juegos','Actividades'],['recursos','Fuentes'],['explora','Explora']
];
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function setupNav(){
 const nav=$('#mainNav');
 if(!nav)return;
 nav.innerHTML='';
 nav.setAttribute('aria-label','Secciones de la Región Andina');
 items.forEach(([id,label])=>{
  const a=document.createElement('a');
  a.href='#'+id;
  a.textContent=label;
  nav.appendChild(a);
 });
 const links=[...nav.querySelectorAll('a')];
 const activate=hash=>links.forEach(a=>a.classList.toggle('active',a.hash===hash));
 links.forEach(a=>a.addEventListener('click',()=>setTimeout(()=>activate(a.hash),0)));
 const targets=items.map(([id])=>document.getElementById(id)).filter(Boolean);
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting)activate('#'+entry.target.id);
  }),{rootMargin:'-25% 0px -65% 0px',threshold:0});
  targets.forEach(t=>observer.observe(t));
 }
}

function setupSettings(){
 const btn=$('#customizeBtn'),panel=$('#customPanel'),close=$('#closeCustom');
 if(!btn||!panel)return;
 btn.type='button';
 btn.title='Abrir ajustes';
 btn.setAttribute('aria-label','Abrir ajustes');
 btn.setAttribute('aria-expanded','false');
 const open=()=>{panel.classList.add('show');panel.removeAttribute('aria-hidden');btn.setAttribute('aria-expanded','true');document.body.classList.add('settings-open')};
 const hide=()=>{panel.classList.remove('show');panel.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false');document.body.classList.remove('settings-open')};
 btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();panel.classList.contains('show')?hide():open()});
 if(close)close.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();hide()});
 panel.addEventListener('click',e=>e.stopPropagation());
 document.addEventListener('click',e=>{if(panel.classList.contains('show')&&!panel.contains(e.target)&&e.target!==btn)hide()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('show'))hide()});
 const theme=$('#themeSelect');
 if(theme)theme.addEventListener('change',()=>document.documentElement.dataset.theme=theme.value);
 const scale=$('#fontScale');
 if(scale)scale.addEventListener('input',()=>document.documentElement.style.setProperty('--scale',scale.value));
 const motion=$('#motionToggle');
 if(motion)motion.addEventListener('change',()=>document.documentElement.classList.toggle('motion-reduced',!motion.checked));
 const contrast=$('#contrastToggle');
 if(contrast)contrast.addEventListener('change',()=>document.documentElement.classList.toggle('high-contrast',contrast.checked));
}

function setupDirectControls(){
 document.addEventListener('click',e=>{
  const game=e.target.closest('[data-game]');
  if(game && window.andinaStartGame){e.preventDefault();window.andinaStartGame(game.dataset.game);return;}
  const detail=e.target.closest('[data-detail]');
  if(detail && window.andinaOpenDetail){e.preventDefault();window.andinaOpenDetail(detail.dataset.detail);return;}
  const alt=e.target.closest('[data-alt]');
  if(alt){
   $$('.altitude-buttons [data-alt]').forEach(x=>x.classList.toggle('active',x===alt));
   const info=$('#altitudeInfo');
   const data={calido:['Cálido','Zonas de menor altura, con temperaturas generalmente más altas.'],templado:['Templado','Altitudes intermedias con temperaturas moderadas y gran diversidad agrícola.'],frio:['Frío','Zonas altas donde disminuye la temperatura y cambian los cultivos y ecosistemas.'],paramo:['Páramo','Alta montaña: ecosistemas estratégicos para la regulación y almacenamiento de agua.']}[alt.dataset.alt];
   if(info&&data)info.innerHTML='<b>'+data[0]+'</b><span>'+data[1]+'</span>';
  }
  const econ=e.target.closest('[data-econ]');
  if(econ){
   $$('.economy-tabs [data-econ]').forEach(x=>x.classList.toggle('active',x===econ));
   const info=$('#econInfo');
   const data={primario:['01','Sector primario','Agricultura, ganadería, pesca continental y minería forman parte de la producción regional.'],secundario:['02','Sector secundario','La transformación industrial convierte materias primas en bienes y conecta producción, empleo, logística y mercados.'],terciario:['03','Sector terciario','Comercio, educación, salud, transporte, turismo, finanzas y servicios profesionales tienen gran peso en las ciudades andinas.']}[econ.dataset.econ];
   if(info&&data)info.innerHTML='<div class="econ-number">'+data[0]+'</div><div><h3>'+data[1]+'</h3><p>'+data[2]+'</p></div>';
  }
 });
}

function setup(){
 setupNav();
 setupSettings();
 setupDirectControls();
 document.documentElement.classList.add('site-interactive-ready');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();