(()=>{
'use strict';
if(window.__ANDINA_STANDALONE_KIDS__)return;
window.__ANDINA_STANDALONE_KIDS__=true;
try{localStorage.setItem('andina-explora-mode','children')}catch(e){}

const simple={
 'Delimitación y ubicación':'¿Dónde está la Región Andina?',
 'Delimitación':'¿Dónde está?',
 'Relieve':'Montañas y relieve',
 'Pisos térmicos':'Climas según la altura',
 'Precipitación':'Lluvia',
 'Hidrografía':'Ríos y agua',
 'Ecosistemas':'Lugares donde vive la naturaleza',
 'Biodiversidad':'Animales y plantas',
 'Especies amenazadas y conservación':'Animales y plantas que debemos cuidar',
 'Población y distribución':'¿Dónde vive la gente?',
 'Distribución urbana y rural':'Ciudades y campo',
 'Diversidad cultural':'Culturas y tradiciones',
 'Problemas sociales':'Problemas de las personas',
 'Urbanización':'Crecimiento de las ciudades',
 'Sectores económicos':'Formas de trabajo',
 'Cadenas productivas':'Del producto al consumidor',
 'Comercio y exportaciones':'Comercio',
 'Infraestructura y conectividad':'Caminos y conexiones',
 'Problemáticas económicas':'Retos de la economía',
 'Causas':'¿Por qué ocurre?',
 'Consecuencias':'¿Qué puede pasar?',
 'Afectados':'¿A quién afecta?',
 'Posibles respuestas':'¿Qué podemos hacer?',
 'Presión sobre el agua':'Cuidemos el agua',
 'Pérdida de ecosistemas':'Cuidemos la naturaleza',
 'Cambio climático':'Cuidemos el clima',
 'Desigualdad territorial':'Oportunidades para todos',
 'Participación comunitaria':'Trabajemos juntos',
 'Conectividad':'Cómo nos conectamos',
 'producción y consumo':'cómo hacemos y usamos productos',
 'regulación hídrica':'cuidado y almacenamiento del agua',
 'transformación del paisaje':'cambios en el paisaje'
};

function simplify(root=document){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];let n;
 while(n=walker.nextNode())nodes.push(n);
 nodes.forEach(node=>{
   let t=node.nodeValue;
   Object.keys(simple).sort((a,b)=>b.length-a.length).forEach(k=>{t=t.split(k).join(simple[k])});
   node.nodeValue=t;
 });
}

function init(){
 document.documentElement.classList.add('modo-ninos-child');
 document.body.classList.add('standalone-kids-web');
 document.querySelectorAll('#modeSwitch,.mode-switch,.child-return').forEach(el=>el.remove());
 const nav=document.querySelector('.nav');
 if(nav){
   const b=document.createElement('a');
   b.className='child-return';
   b.href='index.html';
   b.textContent='📘 Modo normal';
   b.setAttribute('aria-label','Volver al modo normal');
   b.addEventListener('click',()=>{try{localStorage.setItem('andina-explora-mode','normal')}catch(e){}});
   nav.appendChild(b);
 }
 document.querySelectorAll('.child-note').forEach((el,i)=>{if(i>0)el.remove()});
 if(!document.querySelector('.child-note')){
   const note=document.createElement('div');
   note.className='child-note';
   note.textContent='🧸 Modo niños · contenido explicado de forma más sencilla';
   document.body.prepend(note);
 }
 simplify(document.body);
 // Dynamic detail cards and game screens are simplified only inside this standalone page.
 new MutationObserver(mutations=>mutations.forEach(m=>m.addedNodes.forEach(node=>{if(node.nodeType===Node.ELEMENT_NODE)simplify(node)}))).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();