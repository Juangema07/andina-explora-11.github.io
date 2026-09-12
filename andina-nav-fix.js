(()=>{
'use strict';
const items=[['inicio','Inicio'],['geografia','Geografía física'],['humana','Geografía humana'],['economia','Geografía económica'],['cultura','Cultura y diversidad'],['desafios','Problemáticas'],['juegos','Actividades'],['recursos','Fuentes'],['explora','Explora']];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function setupNav(){
 const nav=$('#mainNav'); if(!nav)return;
 nav.innerHTML=''; nav.setAttribute('aria-label','Secciones de la Región Andina');
 items.forEach(([id,label])=>{const a=document.createElement('a');a.href='#'+id;a.textContent=label;nav.appendChild(a)});
 const links=[...nav.querySelectorAll('a')];
 const activate=hash=>links.forEach(a=>a.classList.toggle('active',a.hash===hash));
 links.forEach(a=>a.addEventListener('click',()=>setTimeout(()=>activate(a.hash),0)));
 const targets=items.map(([id])=>document.getElementById(id)).filter(Boolean);
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)activate('#'+entry.target.id)}),{rootMargin:'-25% 0px -65% 0px',threshold:0});targets.forEach(t=>observer.observe(t))}
}

function setupSettings(){
 const btn=$('#customizeBtn'),panel=$('#customPanel'),close=$('#closeCustom'); if(!btn||!panel)return;
 btn.type='button';btn.title='Abrir ajustes';btn.setAttribute('aria-label','Abrir ajustes');btn.setAttribute('aria-expanded','false');
 const open=()=>{panel.classList.add('show');panel.removeAttribute('aria-hidden');btn.setAttribute('aria-expanded','true');document.body.classList.add('settings-open')};
 const hide=()=>{panel.classList.remove('show');panel.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false');document.body.classList.remove('settings-open')};
 btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();panel.classList.contains('show')?hide():open()});
 if(close)close.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();hide()});
 panel.addEventListener('click',e=>e.stopPropagation());
 document.addEventListener('click',e=>{if(panel.classList.contains('show')&&!panel.contains(e.target)&&e.target!==btn)hide()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('show'))hide()});
 const theme=$('#themeSelect');if(theme)theme.addEventListener('change',()=>{document.documentElement.dataset.theme=theme.value;document.body.classList.toggle('night',theme.value==='night');document.body.classList.toggle('sun',theme.value==='sun')});
 const scale=$('#fontScale');if(scale)scale.addEventListener('input',()=>document.documentElement.style.setProperty('--scale',scale.value));
 const motion=$('#motionToggle');if(motion)motion.addEventListener('change',()=>document.documentElement.classList.toggle('motion-reduced',!motion.checked));
 const contrast=$('#contrastToggle');if(contrast)contrast.addEventListener('change',()=>document.documentElement.classList.toggle('high-contrast',contrast.checked));
}

const fallbackDetails={
 altura:['Altura y territorio','La altitud modifica temperatura, vegetación, suelos y actividades humanas. En la Región Andina este gradiente ayuda a explicar la variedad de paisajes y formas de vida.'],
 cuencas:['Cuencas y agua','Los ríos y sus afluentes conectan las montañas con valles, ciudades, cultivos y ecosistemas. Proteger las cuencas ayuda a mantener agua de calidad para las comunidades y la naturaleza.'],
 redurbana:['Red urbana','Las grandes ciudades, ciudades intermedias y municipios rurales forman redes de movilidad, comercio, educación, salud y servicios. La topografía influye en cómo se conectan.'],
 cadena:['Cadena económica','Un producto regional depende de una combinación de clima, suelo, trabajo, conocimientos, infraestructura, transporte y mercados. La economía es una red de relaciones territoriales.']
};
function fallbackModal(title,body){
 if($('#proInfoModal')||$('#andinaGameModal'))return;
 const m=document.createElement('div');m.id='proInfoModal';m.innerHTML='<article class="pro-dialog" role="dialog" aria-modal="true"><div class="pro-dialog-head"><div><span class="tag">EXPLORA · REGIÓN ANDINA</span><h2>'+title+'</h2></div><button class="pro-close" aria-label="Cerrar">×</button></div><div class="pro-copy"><p>'+body+'</p></div></article>';
 document.body.appendChild(m);requestAnimationFrame(()=>m.classList.add('show'));
 const close=()=>{m.classList.remove('show');setTimeout(()=>m.remove(),220)};m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.pro-close'))close()});
}
function fallbackGame(mode){
 if($('#andinaGameModal'))return;
 const data=mode==='challenge'?['Desafío rápido','Relaciona territorio, población, agua y economía. Escribe una respuesta de al menos una idea completa.']:['Quiz Andino','¿Qué ecosistema de alta montaña es clave para la regulación del agua?'];
 const m=document.createElement('div');m.id='andinaGameModal';m.className='modal';m.innerHTML='<div class="modal-box game-modal-box"><button class="game-close" aria-label="Cerrar">×</button><span class="tag">ACTIVIDAD · REGIÓN ANDINA</span><h2>'+data[0]+'</h2><div class="game-content"><p>'+data[1]+'</p>'+(mode==='challenge'?'<textarea id="fallbackAnswer" rows="4" style="width:100%;margin:10px 0;padding:12px;border-radius:12px;border:1px solid var(--line)"></textarea><button class="primary" id="fallbackCheck">Comprobar</button>':'<div class="quiz-options"><button data-fallback="no">Manglar</button><button data-fallback="yes">Páramo</button><button data-fallback="no">Arrecife</button></div>')+'<div class="game-feedback" aria-live="polite"></div></div></div>';
 document.body.appendChild(m);requestAnimationFrame(()=>m.classList.add('show'));
 m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.game-close'))m.remove();const b=e.target.closest('[data-fallback]');if(b){$$('[data-fallback]',m).forEach(x=>x.disabled=true);$('.game-feedback',m).innerHTML=b.dataset.fallback==='yes'?'<b>✓ Correcto.</b>':'<b>Revisa la respuesta.</b> La opción correcta es Páramo.'}if(e.target.id==='fallbackCheck'){const a=$('#fallbackAnswer',m),f=$('.game-feedback',m);f.innerHTML=a.value.trim().length>=12?'<b>✓ Respuesta registrada.</b>':'<b>Amplía tu respuesta.</b>'}});
}
function setupDirectControls(){
 document.addEventListener('click',e=>{
  const game=e.target.closest('[data-game]');
  if(game){setTimeout(()=>{if(!$('#andinaGameModal'))fallbackGame(game.dataset.game)},0);return;}
  const detail=e.target.closest('[data-detail]');
  if(detail){const key=detail.dataset.detail;if(fallbackDetails[key])setTimeout(()=>fallbackModal(fallbackDetails[key][0],fallbackDetails[key][1]),0);return;}
  const alt=e.target.closest('[data-alt]');
  if(alt){$$('.altitude-buttons [data-alt]').forEach(x=>x.classList.toggle('active',x===alt));const info=$('#altitudeInfo');const data={calido:['Cálido','Zonas de menor altura, con temperaturas generalmente más altas.'],templado:['Templado','Altitudes intermedias con temperaturas moderadas y gran diversidad agrícola.'],frio:['Frío','Zonas altas donde disminuye la temperatura y cambian los cultivos y ecosistemas.'],paramo:['Páramo','Alta montaña: ecosistemas estratégicos para la regulación y almacenamiento de agua.']}[alt.dataset.alt];if(info&&data)info.innerHTML='<b>'+data[0]+'</b><span>'+data[1]+'</span>';}
  const econ=e.target.closest('[data-econ]');
  if(econ){$$('.economy-tabs [data-econ]').forEach(x=>x.classList.toggle('active',x===econ));const info=$('#econInfo');const data={primario:['01','Sector primario','Agricultura, ganadería, pesca continental y minería forman parte de la producción regional.'],secundario:['02','Sector secundario','La transformación industrial convierte materias primas en bienes y conecta producción, empleo, logística y mercados.'],terciario:['03','Sector terciario','Comercio, educación, salud, transporte, turismo, finanzas y servicios profesionales tienen gran peso en las ciudades andinas.']}[econ.dataset.econ];if(info&&data)info.innerHTML='<div class="econ-number">'+data[0]+'</div><div><h3>'+data[1]+'</h3><p>'+data[2]+'</p></div>';}
 });
}
function setup(){setupNav();setupSettings();setupDirectControls();document.documentElement.classList.add('site-interactive-ready')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();