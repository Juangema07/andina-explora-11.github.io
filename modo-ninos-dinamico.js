(()=>{
'use strict';
if(window.__ANDINA_KIDS_DYNAMIC__) return;
window.__ANDINA_KIDS_DYNAMIC__=true;
const extra={
 fisica:{title:'Explora más la geografía',items:[['⛰️','Tres cordilleras','La Región Andina tiene las cordilleras Occidental, Central y Oriental. Entre ellas aparecen valles, montañas y altiplanos.'],['🌡️','Altura y clima','A medida que cambia la altura también cambia la temperatura. Esto ayuda a explicar los diferentes pisos térmicos.'],['💧','Agua de montaña','Los páramos, bosques y humedales ayudan a almacenar y regular el agua que necesitan las personas y los ecosistemas.']]},
 humana:{title:'Conoce mejor a sus habitantes',items:[['🏙️','Ciudades','Bogotá, Medellín, Cali, Bucaramanga, Manizales, Pereira, Armenia y otras ciudades forman parte de la red urbana andina.'],['🌾','Campo y ciudad','En el campo se realizan actividades como la agricultura. Las ciudades concentran muchos servicios, trabajos y conexiones.'],['🧑🏽‍🤝‍🧑🏾','Diversidad cultural','La región reúne comunidades y tradiciones diferentes. La cultura cambia según el territorio y la historia de sus habitantes.']]},
 economia:{title:'¿Cómo funciona la economía?',items:[['🌱','Sector primario','Incluye actividades como agricultura, ganadería y aprovechamiento de recursos naturales.'],['🏭','Sector secundario','Transforma materias primas en productos. Allí aparecen actividades industriales y de elaboración de alimentos.'],['🛍️','Sector terciario','Incluye comercio, transporte, educación, turismo y otros servicios que conectan a las personas.']]},
 cultura:{title:'Más formas de vivir la cultura',items:[['🍲','Sabores','La gastronomía reúne ingredientes, recetas y costumbres que forman parte de la identidad de muchos lugares andinos.'],['🎶','Música y fiestas','La música, las fiestas y las celebraciones ayudan a transmitir historias y tradiciones entre generaciones.'],['🧶','Artesanías','Los tejidos, objetos y trabajos hechos a mano muestran conocimientos sobre materiales y técnicas locales.']]},
 desafios:{title:'Entender los desafíos',items:[['💧','Cuidar el agua','Proteger páramos, bosques, humedales y fuentes de agua ayuda a mantener este recurso.'],['🌿','Proteger la naturaleza','La pérdida de ecosistemas puede afectar a plantas, animales y personas. La conservación y la restauración son herramientas para cuidarlos.'],['🌎','Cambios del clima','El clima puede cambiar las condiciones de los ecosistemas y de algunas actividades humanas. Conocer el territorio ayuda a pensar en respuestas.']]}
};
function addBlock(id,data){
 const section=document.getElementById(id); if(!section||section.querySelector('.kids-extra-explore')) return;
 const wrap=document.createElement('div'); wrap.className='kids-extra-explore';
 wrap.innerHTML=`<div class="kids-extra-head"><span class="eyebrow">SIGUE EXPLORANDO</span><h3>${data.title}</h3><p>Un poco más de información, explicada de forma sencilla.</p></div><div class="kids-extra-grid">${data.items.map(x=>`<article><span class="kids-extra-icon">${x[0]}</span><h4>${x[1]}</h4><p>${x[2]}</p></article>`).join('')}</div>`;
 section.appendChild(wrap);
}
function keepKidsPresentation(){
 document.querySelectorAll('a[href="diapositivas-andina.html"],a[href^="diapositivas-andina.html?"]').forEach(a=>{a.href='diapositivas-andina-ninos.html';});
}
function init(){Object.entries(extra).forEach(([id,data])=>addBlock(id,data));keepKidsPresentation();setTimeout(keepKidsPresentation,900);document.documentElement.classList.add('kids-dynamic-ready');}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,300),{once:true}); else setTimeout(init,300);
})();
