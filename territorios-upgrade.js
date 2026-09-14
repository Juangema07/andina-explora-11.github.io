(()=>{
'use strict';
if(window.__ANDINA_TERRITORIES_UPGRADE__)return;
window.__ANDINA_TERRITORIES_UPGRADE__=true;
const details={
 bogota:{eyebrow:'ALTIPLANO · CORDILLERA ORIENTAL',title:'Bogotá y la Sabana',body:'La Sabana de Bogotá es un altiplano de la cordillera Oriental donde se superponen una gran concentración urbana, zonas rurales, humedales y áreas agrícolas. Bogotá funciona como un centro de servicios, educación, comercio, cultura y empleo, mientras los municipios de la Sabana mantienen relaciones diarias de movilidad, abastecimiento y trabajo.',facts:['Altiplano de la cordillera Oriental','Red urbana y municipios conectados','Humedales y áreas rurales','Servicios, comercio y educación'],more:'Mirar este territorio permite entender cómo una ciudad modifica su entorno y, al mismo tiempo, depende de él. El crecimiento urbano plantea preguntas sobre suelo, transporte, agua, vivienda, conservación de humedales y planificación territorial.'},
 cafetero:{eyebrow:'EJE CAFETERO · PAISAJE CULTURAL',title:'Paisaje Cultural Cafetero',body:'El Paisaje Cultural Cafetero reúne fincas, cultivos, caminos, pequeños centros poblados y ciudades en un territorio de montaña. Su historia muestra cómo comunidades cafeteras adaptaron prácticas productivas a pendientes, alturas y condiciones ambientales, creando también una arquitectura, unas costumbres y unos conocimientos asociados al cultivo.',facts:['Café y agricultura de montaña','Fincas y centros poblados','Tradiciones y conocimientos','Paisaje cultural reconocido por UNESCO'],more:'El café funciona aquí como hilo conductor: conecta trabajo rural, transporte, comercio, gastronomía, turismo y memoria. Por eso el paisaje no se entiende solo por sus cultivos, sino por la relación entre las personas y el territorio que han construido durante generaciones.'},
 nevados:{eyebrow:'ALTA MONTAÑA · PARQUES NACIONALES',title:'Parque Nacional Natural Los Nevados',body:'Los Nevados reúne bosque altoandino, páramo, superpáramo, humedales de alta montaña, volcanes y glaciares. Parques Nacionales señala que el páramo ocupa la mayor parte del área protegida. El cambio de altura permite observar, en un mismo sistema, ambientes con condiciones climáticas y ecológicas muy distintas.',facts:['Bosque altoandino y páramo','Superpáramo y humedales','Volcanes y glaciares','Agua, investigación y conservación'],more:'Este territorio ayuda a relacionar biodiversidad y agua con decisiones humanas. La conservación protege ecosistemas que cumplen funciones ambientales importantes y también abre espacios para investigación y turismo de naturaleza bajo reglas de manejo.'},
 cocuy:{eyebrow:'ANDES ORIENTALES · ALTA MONTAÑA',title:'Parque Nacional Natural El Cocuy',body:'El Cocuy conserva un gradiente que va desde bosques andinos y páramos hasta ambientes de alta montaña. Sus cumbres superan los 5.000 metros y el parque contiene un importante conjunto glaciar. Además de su valor natural, el territorio tiene una dimensión cultural fundamental para el pueblo u’wa.',facts:['Cumbres de más de 5.000 m','Bosque, páramo y glaciares','Fuentes y regulación del agua','Territorio de importancia cultural u’wa'],more:'El Cocuy muestra que un área protegida puede tener varios valores al mismo tiempo: biodiversidad, agua, paisaje, investigación y cultura. Cualquier forma de visita o aprovechamiento debe reconocer esa diversidad y respetar las normas de conservación y las comunidades vinculadas al territorio.'}
};
const run=()=>{
 const cards=document.querySelectorAll('#territorios-andinos [data-place]');
 if(!cards.length)return;
 const dialog=document.querySelector('#placeDialog');
 const eye=document.querySelector('#placeDialogEye'),title=document.querySelector('#placeDialogTitle'),body=document.querySelector('#placeDialogBody'),extra=document.querySelector('#placeDialogExtra');
 if(!dialog||!eye||!title||!body||!extra)return;
 cards.forEach(card=>{
  if(card.dataset.upgraded)return;
  card.dataset.upgraded='1';
  const old=details[card.dataset.place];if(!old)return;
  card.classList.add('territory-clean-card');
  const img=card.querySelector('img');if(img)img.remove();
  card.addEventListener('click',e=>{
   e.preventDefault();
   eye.textContent=old.eyebrow;title.textContent=old.title;body.textContent=old.body;
   extra.innerHTML=`<p>${old.more}</p><div class="territory-facts">${old.facts.map(x=>`<span>${x}</span>`).join('')}</div>`;
   dialog.hidden=false;document.body.classList.add('dialog-open');
  });
 });
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,900),{once:true});else setTimeout(run,900);
})();
