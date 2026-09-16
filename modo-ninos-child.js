(()=>{
'use strict';
const frame=document.getElementById('normalSite');
const loader=document.getElementById('childLoader');
const replacements={
'Una ventana digital a las montañas, los páramos, las ciudades, los sabores, los oficios y los desafíos del corazón de Colombia.':'Explora las montañas, ciudades, naturaleza, comidas y cultura de la Región Andina.',
'No memorices datos sueltos.':'Aprende paso a paso.','Conecta territorio y vida.':'Conoce cómo se relacionan las personas y el territorio.','La altura cambia todo.':'La altura cambia el clima y la vida.','Explora ubicación, relieve, clima, agua y biodiversidad. La información se acompaña de imágenes y recursos visuales.':'Aprende sobre montañas, clima, agua y naturaleza con imágenes.',
'Las montañas también se habitan.':'Las montañas también tienen gente.','Personas, ciudades, comunidades rurales y expresiones culturales construyen territorios diferentes.':'Conoce personas, ciudades, comunidades y culturas.',
'Del territorio a lo que producimos.':'¿Qué producimos en la Región Andina?','La economía se entiende mejor cuando conectamos recursos, transformación, servicios, transporte y consumo.':'Descubre cómo trabajan las personas y qué productos y servicios ofrecen.',
'Lo andino también se saborea y se escucha.':'La cultura andina se come, se escucha y se celebra.','Las expresiones culturales cambian entre territorios. Aquí cada tarjeta funciona como una pequeña ventana.':'Descubre comidas, música, artesanías y fiestas.',
'Comprender para proponer.':'Entender para cuidar y mejorar.','Cada reto incluye problema, causas, consecuencias, afectados y posibles respuestas.':'Conoce los problemas y piensa en soluciones.',
'Aprende jugando.':'¡Aprende jugando!','Explora cinco experiencias nuevas: mapa, viaje, conexiones, misterio y decisiones comunitarias.':'Juega y aprende sobre la Región Andina.','También creamos.':'Nuestros materiales.'};
const exact={'Empezar recorrido ↓':'Empezar ↓','¿Dónde está?':'¿Dónde queda?','Las cordilleras':'Montañas','Ríos y cuencas':'Ríos','Páramos y bosques':'Naturaleza','Un territorio de contrastes':'Muchas formas de relieve','Ciudades que conectan territorios':'Ciudades conectadas','Diversidad cultural':'Culturas','Urbanización':'Ciudad y campo','Retos sociales':'Retos de las personas','Presión sobre el agua':'Cuidemos el agua','Pérdida de ecosistemas':'Cuidemos la naturaleza','Desigualdad territorial':'Oportunidades para todos','ESPACIO DE REFLEXIÓN':'PIENSA Y PROPÓN','Diseña una solución':'Piensa una solución','Escribe una idea y conviértela en una propuesta concreta.':'Escribe una idea para ayudar.','Mi propuesta…':'Mi idea…','Guardar propuesta':'Guardar idea','Video original':'Video','Podcast':'Audio','Infografías':'Infografías','PowerPoint':'Presentación'};
function translateNode(n){if(n.nodeType!==3)return;let s=n.nodeValue,o=s;Object.keys(replacements).forEach(k=>{o=o.split(k).join(replacements[k])});const t=o.trim();if(exact[t])o=o.replace(t,exact[t]);if(o!==s)n.nodeValue=o}
function translateTree(root){const w=root.ownerDocument.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);nodes.forEach(translateNode)}
function simplify(doc){
 doc.documentElement.classList.add('modo-ninos-child');
 translateTree(doc.body);
 const nav=doc.querySelector('.nav');
 if(nav){const old=doc.getElementById('modeSwitch');if(old)old.remove();const b=doc.createElement('a');b.className='child-return';b.href='index.html';b.textContent='📘 Modo normal';nav.appendChild(b)}
 const note=doc.createElement('div');note.className='child-note';note.textContent='🧸 Modo niños · mismo recorrido, explicado de forma más sencilla';doc.body.prepend(note);
 doc.querySelectorAll('.section-head>p,.intro p,.map-panel>p,.altitude-panel>p,.visual-facts p,.people-card>p').forEach(el=>el.classList.add('child-secondary'));
 const style=doc.createElement('style');style.textContent=`
 html.modo-ninos-child .reveal,html.modo-ninos-child .topic,html.modo-ninos-child .culture-card,html.modo-ninos-child .challenge-grid button,html.modo-ninos-child .info-cards button{animation:none!important}
 html.modo-ninos-child *{scroll-behavior:smooth}
 html.modo-ninos-child .hero-copy h1{font-size:clamp(3rem,11vw,6rem);line-height:.9}
 html.modo-ninos-child .hero-stats{gap:10px}
 html.modo-ninos-child .hero-stats span{border-radius:18px;padding:9px 12px}
 html.modo-ninos-child .topic-grid,.modo-ninos-child .info-cards,.modo-ninos-child .culture-grid,.modo-ninos-child .challenge-grid{gap:14px}
 html.modo-ninos-child .topic,html.modo-ninos-child .info-cards button,html.modo-ninos-child .culture-card,html.modo-ninos-child .challenge-grid button{box-shadow:0 8px 20px rgba(22,59,49,.08)}
 html.modo-ninos-child .eyebrow{letter-spacing:.08em}
 html.modo-ninos-child .child-note{position:relative;z-index:30}
 `;doc.head.appendChild(style);
 const obs=new MutationObserver(ms=>ms.forEach(m=>{m.addedNodes.forEach(n=>{if(n.nodeType===3)translateNode(n);else if(n.nodeType===1)translateTree(n)});if(m.type==='characterData')translateNode(m.target)}));
 obs.observe(doc.body,{childList:true,subtree:true,characterData:true});
}
frame.addEventListener('load',()=>{try{simplify(frame.contentDocument);setTimeout(()=>loader.classList.add('hide'),450)}catch(e){console.error(e);loader.classList.add('hide')}});
})();
