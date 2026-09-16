(()=>{
'use strict';
const frame=document.getElementById('normalSite');
const loader=document.getElementById('childLoader');
const replacements={
 'Una ventana digital a las montañas, los páramos, las ciudades, los sabores, los oficios y los desafíos del corazón de Colombia.':'Explora las montañas, ciudades, naturaleza, comidas y cultura de la Región Andina.',
 'No memorices datos sueltos.':'Conecta las ideas.',
 'Conecta territorio y vida.':'Territorio y vida.',
 'La altura cambia todo.':'La altura cambia muchas cosas.',
 'Explora ubicación, relieve, clima, agua y biodiversidad. La información se acompaña de imágenes y recursos visuales.':'Aprende sobre montañas, clima, agua y naturaleza.',
 'Las montañas también se habitan.':'Las montañas también tienen gente.',
 'Personas, ciudades, comunidades rurales y expresiones culturales construyen territorios diferentes.':'Conoce personas, ciudades, comunidades y culturas.',
 'Del territorio a lo que producimos.':'¿Qué producimos?',
 'La economía se entiende mejor cuando conectamos recursos, transformación, servicios, transporte y consumo.':'Mira cómo el territorio se relaciona con el trabajo y los servicios.',
 'Lo andino también se saborea y se escucha.':'La cultura andina se come y se escucha.',
 'Las expresiones culturales cambian entre territorios. Aquí cada tarjeta funciona como una pequeña ventana.':'Descubre comidas, música, artesanías y fiestas.',
 'Comprender para proponer.':'Entender para ayudar.',
 'Cada reto incluye problema, causas, consecuencias, afectados y posibles respuestas.':'Conoce los problemas y piensa en soluciones.',
 'Aprende jugando.':'¡Aprende jugando!',
 'Explora cinco experiencias nuevas: mapa, viaje, conexiones, misterio y decisiones comunitarias.':'Juega y aprende sobre la Región Andina.',
 'También creamos.':'Nuestros materiales.'
};
const exact={
 'Empezar recorrido ↓':'Empezar ↓','¿Dónde está?':'¿Dónde queda?','Las cordilleras':'Montañas','Ríos y cuencas':'Ríos','Páramos y bosques':'Naturaleza','Un territorio de contrastes':'Muchas formas de relieve',
 'Ciudades que conectan territorios':'Ciudades conectadas','Diversidad cultural':'Culturas','Urbanización':'Ciudades y campo','Retos sociales':'Retos de las personas','Presión sobre el agua':'Cuidemos el agua','Pérdida de ecosistemas':'Cuidemos la naturaleza','Desigualdad territorial':'Oportunidades para todos','ESPACIO DE REFLEXIÓN':'PIENSA Y PROPÓN','Diseña una solución':'Piensa una solución','Escribe una idea y conviértela en una propuesta concreta.':'Escribe una idea para ayudar.','Mi propuesta…':'Mi idea…','Guardar propuesta':'Guardar idea',
 'Video original':'Video','PowerPoint':'Presentación','Agregar presentación':'Agregar presentación'
};
function transform(doc){
 doc.documentElement.classList.add('modo-ninos-child');
 const walker=doc.createTreeWalker(doc.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(n=>{let s=n.nodeValue;let out=s;Object.keys(replacements).forEach(k=>{out=out.split(k).join(replacements[k])});const t=out.trim();if(exact[t])out=out.replace(t,exact[t]);if(out!==s)n.nodeValue=out});
 const nav=doc.querySelector('.nav');if(nav){const old=doc.getElementById('modeSwitch');if(old)old.remove();const b=doc.createElement('button');b.className='child-return';b.type='button';b.textContent='📘 Modo normal';b.addEventListener('click',()=>{window.location.href='index.html'});nav.appendChild(b)}
 const note=doc.createElement('div');note.className='child-note';note.textContent='🧸 Versión para niños · mismo contenido y recorrido, explicado de forma más sencilla';doc.body.prepend(note);
 // Reduce visualmente texto secundario, sin borrar contenido ni cambiar juegos.
 doc.querySelectorAll('.section-head>p,.intro p,.map-panel>p,.altitude-panel>p,.visual-facts p,.people-card>p').forEach(el=>el.classList.add('child-secondary'));
 // Simplifica textos que generan los juegos después de su carga.
 const obs=new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){const w=doc.createTreeWalker(n,NodeFilter.SHOW_TEXT);const a=[];while(w.nextNode())a.push(w.currentNode);a.forEach(x=>{let s=x.nodeValue;Object.keys(replacements).forEach(k=>s=s.split(k).join(replacements[k]));if(s!==x.nodeValue)x.nodeValue=s})}})));
 obs.observe(doc.body,{childList:true,subtree:true});
}
frame.addEventListener('load',()=>{try{transform(frame.contentDocument);setTimeout(()=>loader.classList.add('hide'),350)}catch(e){console.error(e);loader.classList.add('hide')}});
