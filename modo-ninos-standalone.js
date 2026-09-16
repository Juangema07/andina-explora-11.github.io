(()=>{
'use strict';
if(window.__ANDINA_STANDALONE_KIDS__)return;
window.__ANDINA_STANDALONE_KIDS__=true;
try{localStorage.setItem('andina-explora-mode','children')}catch(e){}

/*
 * Este archivo solo se carga en modo niños.
 * La página normal NO usa estas sustituciones.
 * La idea es mantener la misma estructura y actividades, pero explicar
 * títulos, ayudas y textos con palabras más cortas y fáciles.
 */
const simple={
 'REGIÓN ANDINA':'REGIÓN ANDINA',
 'Explora las montañas, las ciudades, la naturaleza, las comidas y la cultura de la Región Andina.':'Conoce las montañas, las ciudades, la naturaleza, las comidas y las tradiciones de la Región Andina.',
 'CIENCIAS SOCIALES':'APRENDE JUGANDO',
 'Empezar':'Empezar',
 'LA IDEA':'¿DE QUÉ SE TRATA?',
 'Aprende paso a paso.':'Aprende poco a poco.',
 'Descubre y conecta.':'Descubre cómo se conecta todo.',
 'Las montañas, el agua, el trabajo y la cultura están conectados. Aquí puedes aprender, jugar y descubrir por qué.':'Las montañas, el agua, el trabajo y la cultura están conectados. Aprende y juega para descubrir cómo.',
 'Montañas, valles y altiplanos':'Montañas y valles',
 'Agua y ecosistemas':'Agua y naturaleza',
 'Trabajo, ciudades y cultura':'Trabajo, ciudades y cultura',
 '02 · GEOGRAFÍA FÍSICA':'02 · GEOGRAFÍA',
 'La altura cambia el clima.':'La altura cambia el clima.',
 'Aprende dónde está la Región Andina, cómo son sus montañas, cómo se mueve el agua y qué seres vivos habitan allí.':'Descubre dónde está, cómo son sus montañas, dónde hay agua y qué seres vivos viven allí.',
 'Ubicación':'Ubicación',
 '¿Dónde queda?':'¿Dónde está?',
 'Montañas':'Montañas',
 'Las cordilleras':'Las cordilleras',
 'Ríos':'Ríos',
 'Agua y cuencas':'Ríos y agua',
 'Naturaleza':'Naturaleza',
 'Páramos y bosques':'Páramos y bosques',
 'PAISAJE ANDINO':'PAISAJE ANDINO',
 'Muchas formas de relieve':'Muchas formas de terreno',
 'Las cordilleras Occidental, Central y Oriental forman muchas montañas, valles y altiplanos.':'Las cordilleras Occidental, Central y Oriental forman montañas, valles y altiplanos.',
 'PISOS TÉRMICOS':'CLIMAS SEGÚN LA ALTURA',
 'Elige una altura':'Elige un clima',
 'Al cambiar la altura también cambian el clima, las plantas y los animales.':'Cuando cambia la altura, también cambian el clima, las plantas y los animales.',
 'Cálido':'Cálido',
 'Templado':'Templado',
 'Frío':'Frío',
 'Páramo':'Páramo',
 'Clima':'Clima',
 'La altura ayuda a explicar por qué cambia la temperatura y la vegetación.':'La altura hace que cambien la temperatura y las plantas.',
 'Agua':'Agua',
 'Los ecosistemas de montaña ayudan a cuidar y guardar el agua.':'Las montañas y sus ecosistemas ayudan a guardar agua.',
 'Vida':'Vida',
 'Los páramos y bosques tienen plantas y animales de diferentes alturas.':'Hay plantas y animales distintos según la altura.',
 '03 · GEOGRAFÍA HUMANA':'03 · PERSONAS Y LUGARES',
 'Las montañas también tienen gente.':'En las montañas también vive mucha gente.',
 'Conoce personas, ciudades, comunidades y culturas de la Región Andina.':'Conoce las personas, ciudades y culturas de la Región Andina.',
 'POBLACIÓN':'PERSONAS',
 'Es una referencia histórica del DANE para el Atlas Estadístico de 2005. No es una cifra actual.':'Es un dato histórico del DANE, tomado del Atlas Estadístico de 2005. No es un dato actual.',
 'Ver contexto':'Ver más',
 'CIUDADES':'CIUDADES',
 'Ciudades conectadas':'Ciudades importantes',
 'Culturas':'Culturas',
 'Tradiciones y formas de vivir':'Tradiciones y formas de vida',
 'Ciudad y campo':'Ciudad y campo',
 'Cómo viven las personas':'Dónde viven las personas',
 'Retos':'Retos',
 'Oportunidades para todos':'Oportunidades para todos',
 '04 · GEOGRAFÍA ECONÓMICA':'04 · ECONOMÍA',
 '¿Qué producimos?':'¿Qué hacemos y producimos?',
 'Descubre qué producen las personas, cómo trabajan y qué servicios ofrecen.':'Descubre qué se produce, cómo se trabaja y qué servicios hay.',
 '🌱 Primario':'🌱 Campo y naturaleza',
 '🏭 Secundario':'🏭 Fábricas y productos',
 '🛍️ Terciario':'🛍️ Servicios',
 'Producto importante':'Producto importante',
 'Cultivo en zonas altas':'Cultivo de zonas altas',
 'Servicios y conexiones':'Servicios',
 'Naturaleza y cultura':'Naturaleza y cultura',
 '05 · CULTURA Y DIVERSIDAD':'05 · CULTURA',
 'La cultura también se come y se escucha.':'La cultura se come, se escucha y se celebra.',
 'Descubre comidas, música, artesanías, fiestas y otras tradiciones.':'Descubre comidas, música, artesanías, fiestas y tradiciones.',
 'Gastronomía':'Comidas',
 'Comidas y sabores':'Comidas y sabores',
 'Música':'Música',
 'Música y tradiciones':'Música y tradiciones',
 'Artesanías':'Artesanías',
 'Trabajos y materiales':'Objetos hechos a mano',
 'Fiestas':'Fiestas',
 'Fiestas y comunidad':'Fiestas y comunidad',
 'Vestuario':'Ropa',
 'Ropa y tejidos':'Ropa y tejidos',
 'Instrumentos':'Instrumentos',
 'El tiple es un instrumento colombiano.':'El tiple es un instrumento de Colombia.',
 'Ligado al paisaje y al trabajo rural.':'Relacionado con el campo y su trabajo.',
 'Es una planta de los páramos.':'Es una planta que vive en los páramos.',
 '06 · PROBLEMÁTICAS Y DESAFÍOS':'06 · RETOS',
 'Entender para cuidar y mejorar.':'Entender para cuidar.',
 'Conoce cada problema y piensa en posibles soluciones.':'Conoce los problemas y piensa en soluciones.',
 'Cuidemos el agua':'Cuidemos el agua',
 'Cuidar las fuentes de agua':'Cuidar los ríos y fuentes de agua',
 'Cuidemos la naturaleza':'Cuidemos la naturaleza',
 'Proteger bosques y páramos':'Proteger bosques y páramos',
 'Servicios y oportunidades':'Servicios y oportunidades',
 'PIENSA Y PROPÓN':'PIENSA Y PROPÓN',
 'Piensa una solución':'Piensa una idea',
 'Escribe una idea para ayudar a la Región Andina.':'Escribe una idea para ayudar a la Región Andina.',
 'Mi idea…':'Mi idea…',
 'Guardar idea':'Guardar idea',
 '07 · ACTIVIDADES INTERACTIVAS':'07 · JUEGOS',
 '¡Aprende jugando!':'¡Aprende jugando!',
 'Juega y aprende sobre la Región Andina.':'Juega y aprende sobre la Región Andina.',
 '08 · PRODUCTOS DEL GRUPO':'08 · NUESTROS MATERIALES',
 'Nuestros materiales.':'Nuestros materiales.',
 'Aquí puedes ver los materiales creados para el proyecto.':'Aquí puedes ver los materiales del proyecto.',
 'Un video creado por el grupo.':'Video hecho por el grupo.',
 'Un audio creado por el grupo.':'Audio hecho por el grupo.',
 'Material visual del proyecto.':'Material con imágenes del proyecto.',
 'Presentación del proyecto.':'Presentación del proyecto.',
 'Agregar video':'Agregar video',
 'Agregar audio':'Agregar audio',
 'Agregar infografías':'Agregar infografías',
 'Ver presentación':'Ver presentación',
 'FUENTES':'FUENTES',
 'Aprende con fuentes confiables.':'Aprende con fuentes confiables.',
 'La información del proyecto se apoya en fuentes institucionales y académicas.':'La información usa fuentes de instituciones y universidades.',
 'Fuentes y créditos':'Fuentes y créditos',
 'DANE, IGAC, MinAmbiente y otras fuentes':'DANE, IGAC, MinAmbiente y otras fuentes',
 'Créditos de imágenes':'Créditos de imágenes',
 'Revisa el origen de cada imagen.':'Mira de dónde viene cada imagen.',
 'Personalización':'Personalizar',
 'PERSONALIZA':'PERSONALIZA',
 'Tu recorrido':'Tu recorrido',
 'Tamaño del texto':'Tamaño del texto',
 'Menos animaciones':'Menos animaciones',
 'Sin música':'Sin música',
 'Añadir mis MP3':'Añadir mis MP3',
 'MÚSICA':'MÚSICA',
 '¿Dónde está la Región Andina?':'¿Dónde está la Región Andina?',
 '¿Dónde está?':'¿Dónde está?',
 'Montañas y relieve':'Montañas y relieve',
 'Climas según la altura':'Climas según la altura',
 'Lluvia':'Lluvia',
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
   note.textContent='🧸 Modo niños · palabras sencillas para aprender y jugar';
   document.body.prepend(note);
 }
 simplify(document.body);
 new MutationObserver(mutations=>mutations.forEach(m=>m.addedNodes.forEach(node=>{
   if(node.nodeType===Node.ELEMENT_NODE)simplify(node);
 }))).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();