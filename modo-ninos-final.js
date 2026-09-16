(()=>{
'use strict';
if(!location.pathname.endsWith('modo-ninos.html')) return;
function set(sel,text){const el=document.querySelector(sel);if(el&&text)el.textContent=text}
function setAll(sel,text){document.querySelectorAll(sel).forEach(el=>{if(text)el.textContent=text})}
function apply(){
  set('#inicio .hero-copy p','¡Vamos a conocer la Región Andina! Aprenderás sobre sus montañas, ciudades, naturaleza, comidas y tradiciones.');
  set('#inicio .hero-stats span:nth-child(1)','3 cordilleras');set('#inicio .hero-stats span:nth-child(2)','4 climas según la altura');set('#inicio .hero-stats span:nth-child(3)','Muchas historias');
  set('.intro p','Las montañas, el agua, el trabajo y las costumbres están relacionados. Aquí aprenderás jugando.');
  set('#fisica .section-head p','Descubre dónde está la Región Andina, cómo son sus montañas, de dónde viene el agua y qué animales y plantas viven allí.');
  set('#fisica .section-head h2','Cuando subimos, el clima cambia.');
  set('#fisica .physical-grid .photo-card h3','Montañas, valles y lugares altos');
  set('#fisica .physical-grid .photo-card p','Hay tres cordilleras principales: Occidental, Central y Oriental. También hay valles y altiplanos.');
  set('#fisica .altitude-panel p','Al cambiar la altura, cambia la temperatura y también la vida que encontramos.');
  set('#fisica .visual-facts article:nth-child(1) p','A mayor altura, normalmente hace más frío y cambia la vegetación.');
  set('#fisica .visual-facts article:nth-child(2) p','Los páramos y otros ecosistemas ayudan a guardar el agua.');
  set('#fisica .visual-facts article:nth-child(3) p','En páramos y bosques viven muchas plantas y animales.');
  set('#humana .section-head p','Conoce cómo viven las personas, sus ciudades y sus costumbres.');
  set('#humana .section-head h2','En las montañas también viven muchas personas.');
  set('#humana .people-card p','En el Atlas del DANE de 2005, cerca del 70 % de la población estaba en la Región Andina. Es un dato histórico.');
  set('#humana .cities-card h3','Ciudades importantes');
  set('#economia .section-head p','Mira qué cultivan, qué fabrican y qué servicios ofrecen.');
  set('#economia .section-head h2','¿Qué hacemos y producimos?');
  set('#cultura .section-head p','Conoce comidas, música, artesanías, fiestas y costumbres.');
  set('#cultura .section-head h2','La cultura está en la comida, la música y las costumbres.');
  set('#desafios .section-head p','Mira el problema y piensa qué podemos hacer.');
  set('#desafios .section-head h2','Conocer los problemas para ayudar.');
  set('#desafios .reflection p','Escribe una idea sencilla para ayudar a la Región Andina.');
  set('#juegos .section-head p','Pon a prueba lo que aprendiste.');
  set('#productos .section-head p','Aquí están los trabajos del proyecto.');
  set('#recursos .section-head h2','Mira de dónde sale la información.');
  set('#recursos .section-head p','Usamos fuentes de instituciones y universidades.');
  document.body.classList.add('kids-final-content');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[500,1500,3000,5000].forEach(ms=>setTimeout(apply,ms));
new MutationObserver(()=>apply()).observe(document.body,{childList:true,subtree:true});
})();