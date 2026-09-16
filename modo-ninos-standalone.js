(()=>{
'use strict';
if(window.__ANDINA_STANDALONE_KIDS__)return;
window.__ANDINA_STANDALONE_KIDS__=true;
try{localStorage.setItem('andina-explora-mode','children')}catch(e){}

/* Solo afecta la copia independiente del modo niños. La versión normal no usa este archivo. */
const simple={
 'Explora las montañas, las ciudades, la naturaleza, las comidas y la cultura de la Región Andina.':'¡Vamos a conocer la Región Andina! Aquí aprenderás sobre sus montañas, sus ciudades, la naturaleza, sus comidas y sus tradiciones.',
 'Aprende paso a paso.':'Aprende poco a poco.',
 'Descubre y conecta.':'Descubre cómo se relaciona todo.',
 'Las montañas, el agua, el trabajo y la cultura están conectados. Aquí puedes aprender, jugar y descubrir por qué.':'Las montañas, el agua, el trabajo y las costumbres están relacionados. Aquí puedes aprender jugando y entender cómo una cosa influye en otra.',
 'Montañas, valles y altiplanos':'Montañas, valles y lugares altos',
 'Agua y ecosistemas':'Agua y naturaleza',
 'Trabajo, ciudades y cultura':'Trabajo, ciudades y costumbres',
 '02 · GEOGRAFÍA FÍSICA':'02 · GEOGRAFÍA',
 'La altura cambia el clima.':'Cuando subimos, el clima cambia.',
 'Aprende dónde está la Región Andina, cómo son sus montañas, cómo se mueve el agua y qué seres vivos habitan allí.':'Descubre dónde está la Región Andina, cómo son sus montañas, de dónde viene el agua y qué animales y plantas viven allí.',
 '¿Dónde queda?':'¿Dónde está?',
 'Las cordilleras':'Las tres cordilleras',
 'Agua y cuencas':'Ríos y agua',
 'Páramos y bosques':'Páramos y bosques',
 'Muchas formas de relieve':'Montañas, valles y altiplanos',
 'Las cordilleras Occidental, Central y Oriental forman muchas montañas, valles y altiplanos.':'La Región Andina tiene tres grandes cordilleras: Occidental, Central y Oriental. Entre ellas hay montañas, valles y altiplanos.',
 'Elige una altura':'Elige un piso térmico',
 'Al cambiar la altura también cambian el clima, las plantas y los animales.':'Cuando cambia la altura, también cambia la temperatura. Por eso encontramos diferentes plantas y animales.',
 'La altura ayuda a explicar por qué cambia la temperatura y la vegetación.':'Entre más alta es una zona, normalmente hace más frío y cambia la vegetación.',
 'Los ecosistemas de montaña ayudan a cuidar y guardar el agua.':'Los páramos y otros ecosistemas de montaña ayudan a guardar y regular el agua.',
 'Los páramos y bosques tienen plantas y animales de diferentes alturas.':'En los páramos y bosques viven muchas plantas y animales.',
 '03 · GEOGRAFÍA HUMANA':'03 · PERSONAS Y LUGARES',
 'Las montañas también tienen gente.':'En las montañas también viven muchas personas.',
 'Conoce personas, ciudades, comunidades y culturas de la Región Andina.':'Conoce cómo viven las personas, cuáles son sus ciudades y qué costumbres tienen.',
 'Es una referencia histórica del DANE para el Atlas Estadístico de 2005. No es una cifra actual.':'El DANE registró cerca del 70 % de la población en la Región Andina en su Atlas de 2005. Es un dato histórico, no una cifra de hoy.',
 'Ver contexto':'Ver más',
 'Ciudades conectadas':'Ciudades importantes',
 'Tradiciones y formas de vivir':'Costumbres y formas de vivir',
 'Cómo viven las personas':'Vida en la ciudad y el campo',
 'Oportunidades para todos':'Que todos tengan oportunidades',
 '04 · GEOGRAFÍA ECONÓMICA':'04 · ECONOMÍA',
 '¿Qué producimos?':'¿Qué hacemos y producimos?',
 'Descubre qué producen las personas, cómo trabajan y qué servicios ofrecen.':'Mira qué cultivan y fabrican las personas, en qué trabajan y qué servicios ofrecen.',
 '🌱 Primario':'🌱 Campo y naturaleza',
 '🏭 Secundario':'🏭 Fábricas y productos',
 '🛍️ Terciario':'🛍️ Servicios',
 'Producto importante':'Un producto muy conocido',
 'Cultivo en zonas altas':'Se cultiva en zonas altas',
 'Servicios y conexiones':'Trabajos y servicios',
 'Naturaleza y cultura':'Naturaleza y tradiciones',
 '05 · CULTURA Y DIVERSIDAD':'05 · CULTURA',
 'La cultura también se come y se escucha.':'La cultura está en la comida, la música y las costumbres.',
 'Descubre comidas, música, artesanías, fiestas y otras tradiciones.':'Conoce comidas típicas, música, artesanías, fiestas y otras costumbres de la Región Andina.',
 'Comidas y sabores':'Comidas y sabores',
 'Música y tradiciones':'Música y costumbres',
 'Trabajos y materiales':'Objetos hechos a mano',
 'Fiestas y comunidad':'Fiestas y celebraciones',
 'Ropa y tejidos':'Ropa y tejidos',
 'El tiple es un instrumento colombiano.':'El tiple es un instrumento de cuerda muy usado en la música andina.',
 'Ligado al paisaje y al trabajo rural.':'El café está relacionado con el paisaje y el trabajo de muchas familias.',
 'Es una planta de los páramos.':'El frailejón es una planta que crece en los páramos.',
 '06 · PROBLEMÁTICAS Y DESAFÍOS':'06 · RETOS',
 'Entender para cuidar y mejorar.':'Conocer los problemas para poder ayudar.',
 'Conoce cada problema y piensa en posibles soluciones.':'Mira qué problemas existen, por qué ocurren y qué podemos hacer para ayudar.',
 'Cuidar las fuentes de agua':'Cuidar los ríos y las fuentes de agua',
 'Proteger bosques y páramos':'Proteger los bosques y los páramos',
 'Servicios y oportunidades':'Servicios y oportunidades para las personas',
 'Piensa una solución':'Piensa en una idea',
 'Escribe una idea para ayudar a la Región Andina.':'Escribe una idea sencilla para ayudar a cuidar la Región Andina.',
 'Mi idea…':'Mi idea para ayudar…',
 '07 · ACTIVIDADES INTERACTIVAS':'07 · JUEGOS',
 '¡Aprende jugando!':'¡Aprende mientras juegas!',
 'Juega y aprende sobre la Región Andina.':'Pon a prueba lo que aprendiste sobre la Región Andina.',
 '08 · PRODUCTOS DEL GRUPO':'08 · NUESTROS MATERIALES',
 'Nuestros materiales.':'Nuestros trabajos',
 'Aquí puedes ver los materiales creados para el proyecto.':'Aquí puedes encontrar los trabajos que hicimos para este proyecto.',
 'Un video creado por el grupo.':'Un video hecho por nuestro grupo.',
 'Un audio creado por el grupo.':'Un audio hecho por nuestro grupo.',
 'Material visual del proyecto.':'Imágenes que ayudan a explicar el tema.',
 'Presentación del proyecto.':'Las diapositivas del proyecto.',
 'Agregar video':'Agregar nuestro video',
 'Agregar audio':'Agregar nuestro audio',
 'Agregar infografías':'Ver nuestras infografías',
 'Ver presentación':'Ver nuestras diapositivas',
 'Aprende con fuentes confiables.':'Mira de dónde sale la información.',
 'La información del proyecto se apoya en fuentes institucionales y académicas.':'Usamos información de instituciones y fuentes académicas para explicar el tema.',
 'Revisa el origen de cada imagen.':'Aquí puedes revisar de dónde salió cada imagen.',
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
 'Distribución urbana y rural':'Ciudad y campo',
 'Diversidad cultural':'Culturas y tradiciones',
 'Problemas sociales':'Problemas de las personas',
 'Urbanización':'Crecimiento de las ciudades',
 'Sectores económicos':'Formas de trabajo',
 'Cadenas productivas':'Del producto al consumidor',
 'Comercio y exportaciones':'Comercio con otros lugares',
 'Infraestructura y conectividad':'Caminos y conexiones',
 'Problemáticas económicas':'Retos de la economía',
 'Causas':'¿Por qué pasa?',
 'Consecuencias':'¿Qué puede pasar?',
 'Afectados':'¿A quién afecta?',
 'Posibles respuestas':'¿Qué podemos hacer?',
 'Presión sobre el agua':'Cuidemos el agua',
 'Pérdida de ecosistemas':'Cuidemos la naturaleza',
 'Cambio climático':'Cuidemos el clima',
 'Desigualdad territorial':'Oportunidades para todos',
 'Participación comunitaria':'Trabajemos juntos',
 'Conectividad':'¿Cómo nos conectamos?',
 'producción y consumo':'cómo hacemos y usamos productos',
 'regulación hídrica':'cómo se guarda y regula el agua',
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
   b.className='child-return'; b.href='index.html'; b.textContent='📘 Modo normal';
   b.setAttribute('aria-label','Volver al modo normal');
   b.addEventListener('click',()=>{try{localStorage.setItem('andina-explora-mode','normal')}catch(e){}});
   nav.appendChild(b);
 }
 document.querySelectorAll('.child-note').forEach((el,i)=>{if(i>0)el.remove()});
 if(!document.querySelector('.child-note')){
   const note=document.createElement('div'); note.className='child-note';
   note.textContent='🧸 Modo niños · explicaciones pensadas para estudiantes de 5° a 8°';
   document.body.prepend(note);
 }
 simplify(document.body);
 new MutationObserver(mutations=>mutations.forEach(m=>m.addedNodes.forEach(node=>{
   if(node.nodeType===Node.ELEMENT_NODE)simplify(node);
 }))).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();