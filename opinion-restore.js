(()=>{
'use strict';
if(window.__ANDINA_OPINION_RESTORE__)return;
window.__ANDINA_OPINION_RESTORE__=true;
function add(){
 const main=document.querySelector('main'),games=document.querySelector('#juegos');
 if(!main||!games||document.querySelector('#opinion'))return;
 const section=document.createElement('section');section.id='opinion';section.className='pro-section opinion-section opinion-last';section.innerHTML=`<div class="opinion-card"><div><span class="pro-kicker">09 · DANOS TU OPINIÓN</span><h2>¿Qué te pareció <em>el recorrido?</em></h2><p>Tu opinión ayuda a mejorar la experiencia. No necesitamos datos personales: solo queremos saber qué funcionó mejor para ti.</p></div><form id="opinionForm"><fieldset><legend>¿Cómo calificarías la página?</legend><div class="rating"><label><input type="radio" name="rating" value="5"> ⭐⭐⭐⭐⭐</label><label><input type="radio" name="rating" value="4"> ⭐⭐⭐⭐</label><label><input type="radio" name="rating" value="3"> ⭐⭐⭐</label><label><input type="radio" name="rating" value="2"> ⭐⭐</label><label><input type="radio" name="rating" value="1"> ⭐</label></div></fieldset><label>¿Qué parte te gustó más?<select id="favorite"><option value="">Selecciona una</option><option>Infografía</option><option>Galería visual</option><option>Información</option><option>Juegos</option><option>Música</option></select></label><label>Comentario<textarea id="opinionText" maxlength="500" placeholder="Escribe una sugerencia o comentario..."></textarea></label><button class="pro-btn" type="submit">Enviar opinión</button><span id="opinionStatus" role="status"></span></form></div>`;main.insertBefore(section,games)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(add,20),{once:true});else setTimeout(add,20);
})();
