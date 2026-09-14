(()=>{
'use strict';
if(window.__ANDINA_CONTENT_ENHANCEMENT__)return;
window.__ANDINA_CONTENT_ENHANCEMENT__=true;
const CSS='./andina-content-enhancement.css?v=20260913-1';
function loadCss(){if(document.querySelector('link[data-andina-content-css]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href=CSS;l.dataset.andinaContentCss='1';document.head.appendChild(l)}
const imgs=[
 {src:'assets/andina/file_00000000006481f684d9007640452d51.png',title:'Paisaje creado por el grupo',note:'Fondo propio de Andina Explora'},
 {src:'assets/andina/file_000000003a8c81f685c4c3177c598939.png',title:'Paisaje andino',note:'Fondo propio de Andina Explora'},
 {src:'assets/andina/file_00000000426881f6a792160bee4b88c6.png',title:'Paisaje de alta montaña',note:'Fondo propio de Andina Explora'},
 {src:'assets/andina/file_000000004cac81f6b568a4826989c123.png',title:'Ciudad andina',note:'Fondo propio de Andina Explora'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Valle_del_Cocora,_Colombia.jpg?width=1400',title:'Valle del Cocora',note:'McKay Savage · CC BY 2.0 · Wikimedia Commons'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/WLE2026_CO_-_Frailejones_(Espeletia_grandiflora)_en_flor,_Páramo_de_Guerrero_(88).jpg?width=1200',title:'Frailejones en el Páramo de Guerrero',note:'Jedidiah Horne · CC BY-SA 4.0 · Wikimedia Commons'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Eje_Cafetero.jpg?width=1400',title:'Eje Cafetero',note:'Rope.96 · CC BY-SA 4.0 · Wikimedia Commons'}
];
const sources=[
 ['Colombia.co','Geografía, relieve, ríos, biodiversidad y ciudades de la Región Andina.','https://colombia.co/pais-colombia/geografia-y-medio-ambiente/region-andina-de-colombia'],
 ['Colombia Travel · Andes colombianos','Destinos, fauna, flora y experiencias de los Andes.','https://colombia.travel/es/andes-colombianos'],
 ['Parques Nacionales Naturales','Áreas protegidas y ecosistemas andinos.','https://www.parquesnacionales.gov.co/'],
 ['Ministerio de Ambiente · Páramos','Información sobre el papel ecológico de los páramos.','https://www.minambiente.gov.co/direccion-de-bosques-biodiversidad-y-servicios-ecosistemicos/paramos/'],
 ['Superprof · Región Andina','Fuente secundaria para ampliar la descripción general.','https://www.superprof.co/blog/region-andina-colombia/'],
 ['SeguroParaViaje.com.co','Recurso externo de consulta turística; no se usa como fuente principal de datos.','https://SeguroParaViaje.com.co'],
 ['Genially · Infografía','Recurso interactivo aportado por el grupo.','https://view.genially.com/5f6a1e6bf1ba0a0d16ddb51f']
];
function section(){if(document.getElementById('investigacionExtra'))return;const physical=document.querySelector('#fisica');if(!physical)return;
 const s=document.createElement('section');s.id='investigacionExtra';s.className='section andina-extra';
 s.innerHTML=`<div class="extra-head"><span class="eyebrow">INVESTIGACIÓN + RECURSOS</span><h2>La Región Andina, vista desde <em>el territorio.</em></h2><p>Esta ampliación reúne los datos de la guía del proyecto, información contrastada con fuentes institucionales y recursos visuales. La página deja <b>geografía física, geografía humana y geografía económica</b> como temas centrales para desarrollar en el podcast y el video.</p></div>
 <div class="extra-gallery">${imgs.map((x,i)=>`<figure class="extra-photo" style="background-image:url("${x.src}")"><figcaption class="caption"><b>${x.title}</b><small>${x.note}</small></figcaption></figure>`).join('')}</div>
 <div class="extra-columns"><article class="extra-card"><span class="eyebrow">PARA EL PODCAST</span><h3>Temas que pueden desarrollar</h3><ul><li><b>Geografía física:</b> tres cordilleras, valles interandinos, pisos térmicos, ríos, páramos y biodiversidad.</li><li><b>Geografía humana:</b> población, ciudades, campesinado, diversidad cultural, música, gastronomía y fiestas.</li><li><b>Geografía económica:</b> café, agricultura, industria, comercio, servicios, turismo y conectividad.</li><li><b>Desafíos:</b> conservación del agua y los páramos, contaminación, pérdida de ecosistemas y desigualdad territorial.</li></ul></article><article class="extra-card dark-card"><span class="eyebrow">PARA EL VIDEO</span><h3>Una ruta narrativa sencilla</h3><p><b>Inicio:</b> ubicar la región y presentar por qué es importante.</p><p><b>Desarrollo:</b> recorrer paisaje físico → población y cultura → economía.</p><p><b>Cierre:</b> presentar un desafío y una propuesta de conservación o desarrollo sostenible.</p></article></div>
 <div class="genially-wrap"><span class="eyebrow light">INFOGRAFÍA INTERACTIVA</span><h3 style="color:#fff;margin:.35rem 0 1rem">Explora la infografía del grupo</h3><iframe class="genially-frame" src="https://view.genially.com/5f6a1e6bf1ba0a0d16ddb51f" title="Infografía interactiva sobre la Región Andina" loading="lazy" allowfullscreen></iframe><p class="embed-note">Si el navegador bloquea la vista integrada, el botón de la fuente abre la infografía directamente.</p></div>
 <div class="extra-card"><span class="eyebrow">VIDEOS CORTOS PARA ACOMPAÑAR</span><h3>Una mirada audiovisual</h3><div class="video-grid"><article class="video-card"><iframe src="https://www.youtube.com/embed/1-9fI4qfVyY" title="Región Andina de Colombia" loading="lazy" allowfullscreen></iframe><h4>Región Andina de Colombia</h4><p>Recurso audiovisual breve para acompañar la explicación general de relieve, población y economía.</p></article><article class="video-card"><iframe src="https://www.youtube.com/embed/BDtpETj274s" title="Recursos hídricos de la Región Andina" loading="lazy" allowfullscreen></iframe><h4>Agua y territorio</h4><p>Úsalo como apoyo visual para hablar de ríos, ecosistemas y relación con el territorio.</p></article></div></div>
 <div class="extra-card dark-card" style="margin-top:1.2rem"><span class="eyebrow">PARA SEGUIR EXPLORANDO · BIBLIOGRAFÍA</span><h3>Fuentes consultadas</h3><div class="source-list">${sources.map(x=>`<a href="${x[2]}" target="_blank" rel="noopener noreferrer"><b>${x[0]}</b><span>${x[1]}</span></a>`).join('')}</div></div>`;
 physical.insertAdjacentElement('afterend',s);
}
function boot(){loadCss();section()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
