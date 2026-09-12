(()=>{
'use strict';

/* Rutas robustas: primero GitHub Pages y luego GitHub Raw como respaldo. */
const SITE_BASE=new URL('./',document.baseURI).href;
const PAGES_BASE=new URL('assets/andina/',SITE_BASE).href;
const RAW_BASE='https://raw.githubusercontent.com/Juangema07/andina-explora-11.github.io/main/assets/andina/';
const asset=(name)=>({primary:PAGES_BASE+name,fallback:RAW_BASE+name});
const images={
  map:asset('mapa.png'),
  bogota:asset('bogota.png'),
  cafe:asset('eje-cafetero.png'),
  paramo:asset('paramo.png'),
  valle:asset('valle-del-cauca.png')
};

const places=[
 {id:'valle',name:'Valle del Cauca',tag:'Valle interandino · Río · Producción',image:images.valle,position:'left:2.2%;top:29.8%;width:18%;height:9.5%;',questions:[
  ['Si el río Cauca atraviesa el valle y existe una agricultura intensiva, ¿qué relación territorial es más coherente?',['El agua puede sostener actividades productivas y también generar conflictos por su uso','El río impide cualquier actividad agrícola','La agricultura elimina toda relación con el relieve','El agua solo tiene importancia turística'],0],
  ['¿Por qué la posición del Valle del Cauca favorece la existencia de un valle interandino?',['Está entre sistemas montañosos que condicionan el relieve y el clima','Está rodeado únicamente por océano','Se encuentra sobre una llanura desértica','Está ubicado en una isla volcánica'],0],
  ['Una expansión de cultivos de caña aumenta la producción, pero también exige cuidar el suelo y el agua. ¿Qué concepto resume mejor esta situación?',['Uso sostenible del territorio','Aislamiento geográfico','Urbanización costera','Desconexión económica'],0],
  ['Si una ciudad como Cali se conecta con zonas rurales productoras, ¿qué relación geográfica se observa?',['Interdependencia entre ciudad, campo, transporte y mercados','Separación completa entre actividades económicas','Dependencia exclusiva de la pesca marina','Ausencia de intercambio territorial'],0],
  ['¿Qué afirmación diferencia mejor al Valle del Cauca de un páramo andino?',['El valle presenta zonas más bajas y productivas, mientras el páramo corresponde a alta montaña','Ambos son ecosistemas costeros','El valle está a mayor altura que todos los páramos','El páramo se caracteriza principalmente por cultivos de caña'],0]
 ]},
 {id:'cafe',name:'Eje Cafetero',tag:'Montañas · Agricultura · Café',image:images.cafe,position:'left:34.4%;top:34.8%;width:18%;height:9.6%;',questions:[
  ['Una finca cafetera está ubicada en una ladera con determinada altitud. ¿Qué factor ayuda más a explicar sus condiciones de cultivo?',['La combinación de altitud, temperatura, lluvias y relieve','La cercanía a arrecifes de coral','Las mareas del océano','La salinidad del suelo costero'],0],
  ['El café se cultiva, se transforma y luego se comercializa. ¿Qué lectura económica es más completa?',['Participan actividades de los sectores primario, secundario y terciario','Solo participa el sector terciario','Solo participa la extracción minera','El producto no depende de servicios ni transporte'],0],
  ['¿Por qué el relieve montañoso puede influir en la forma de las fincas cafeteras?',['Las pendientes condicionan cultivos, caminos, manejo del suelo y transporte','Las montañas eliminan toda posibilidad de agricultura','Las pendientes convierten el territorio en una zona marina','El relieve no afecta ninguna actividad humana'],0],
  ['Si una comunidad combina café, hospedaje y recorridos por fincas, ¿qué estrategia está aplicando?',['Diversificación económica mediante turismo rural y producción agrícola','Sustitución total de la agricultura por pesca','Industrialización de un puerto marítimo','Eliminación de las actividades culturales'],0],
  ['¿Qué conclusión relaciona mejor café y territorio?',['El producto depende de condiciones naturales y de decisiones sociales, económicas y culturales','El café depende únicamente de la temperatura','El territorio no influye en la producción','La cultura cafetera no tiene relación con la economía'],0]
 ]},
 {id:'paramo',name:'Páramo',tag:'Alta montaña · Agua · Biodiversidad',image:images.paramo,position:'left:61.2%;top:8%;width:18.6%;height:9.5%;',questions:[
  ['¿Por qué un páramo puede ser importante para poblaciones ubicadas incluso lejos de él?',['Sus ecosistemas participan en la regulación y almacenamiento del agua que alimenta cuencas','Porque funciona como puerto marítimo','Porque produce agua únicamente para los animales del páramo','Porque reemplaza las redes de acueducto'],0],
  ['Si se transforma una zona de páramo sin considerar su función hídrica, ¿qué riesgo territorial aparece?',['Afectar servicios ecosistémicos y la disponibilidad o calidad del agua','Aumentar automáticamente la biodiversidad','Convertir el páramo en ecosistema marino','Eliminar la necesidad de proteger las cuencas'],0],
  ['El frailejón es frecuente en estos ecosistemas. ¿Qué opción explica mejor su importancia como símbolo?',['Representa la biodiversidad y la identidad asociada a los ecosistemas de alta montaña','Es una especie propia de manglares costeros','Es un cultivo industrial de clima cálido','Es un animal característico de los valles interandinos'],0],
  ['¿Qué decisión sería más coherente con la conservación de un páramo?',['Regular actividades productivas y turísticas según la fragilidad del ecosistema','Construir infraestructura sin evaluar impactos','Reemplazar la vegetación nativa por cualquier cultivo','Aumentar la extracción de recursos sin controles'],0],
  ['¿Qué relación explica mejor la importancia social del páramo?',['Conservación, biodiversidad, agua y bienestar de comunidades están conectados','La biodiversidad solo tiene valor estético','El agua de páramo no llega a otras zonas','La conservación no tiene relación con la sociedad'],0]
 ]},
 {id:'bogota',name:'Bogotá',tag:'Ciudad andina · Cordillera Oriental',image:images.bogota,position:'left:78.2%;top:47%;width:18.3%;height:9.5%;',questions:[
  ['Bogotá se ubica en un altiplano de la Cordillera Oriental. ¿Qué consecuencia territorial se puede relacionar con esa ubicación?',['La altitud y el relieve influyen en clima, expansión urbana y conexiones con otros territorios','La ciudad queda directamente sobre el nivel del mar','El territorio funciona como una isla','La ubicación elimina los problemas de movilidad'],0],
  ['Una gran ciudad concentra empresas, instituciones, educación y comercio. ¿Qué sector tiene especial peso en esa dinámica?',['Servicios','Pesca oceánica','Extracción de sal marina','Agricultura de arrecife'],0],
  ['Si una persona vive en una zona rural cercana y trabaja o estudia en Bogotá, ¿qué proceso se evidencia?',['Interacción urbano-rural y movilidad cotidiana','Aislamiento absoluto entre campo y ciudad','Desconexión de redes de transporte','Migración exclusivamente internacional'],0],
  ['¿Por qué la movilidad es un desafío geográfico y no solo un problema de transporte?',['Porque relaciona población, distribución urbana, tiempo, infraestructura y acceso a oportunidades','Porque solo depende del número de vehículos','Porque no tiene relación con la organización espacial','Porque afecta únicamente a turistas'],0],
  ['¿Cuál sería una lectura más completa de Bogotá dentro de la Región Andina?',['Es un gran nodo urbano que depende de redes ambientales, económicas, sociales y de transporte','Es una ciudad aislada de las demás regiones','Su economía depende principalmente de la pesca marina','Su ubicación hace irrelevante el territorio rural'],0]
 ]}
];

function shuffle(items){
 const a=items.slice();
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 return a;
}
function bgImage(img){
 return `background-image:url("${img.primary}"),url("${img.fallback}")`;
}
function init(){
 const arena=document.querySelector('#gameArena');
 if(!arena||document.querySelector('#andina-map-game-style'))return;
 const style=document.createElement('style');style.id='andina-map-game-style';style.textContent=`
 #gameArena{position:relative;z-index:30}
 #innovativeGames{margin-top:18px}
 .map-game-card{border:1px solid #b7c4b0;border-radius:24px;padding:20px;background:#173e32;color:#fff;box-shadow:0 16px 35px #0002}
 .map-game-card h3{margin:5px 0 7px;font-size:1.2rem}.map-game-card p{opacity:.9;line-height:1.5}
 .map-mission{display:flex;align-items:center;gap:14px;padding:14px 16px;margin:15px 0;border-radius:16px;background:#dced92;color:#183d32;font-weight:800}
 .map-mission b{display:block}.map-mission small{font-weight:600;opacity:.82}
 .map-board-real{position:relative;width:100%;aspect-ratio:1672/940;border-radius:20px;overflow:hidden;background:#dfe8d2 center/100% 100% no-repeat;box-shadow:inset 0 0 0 1px #ffffff66}
 .map-board-real:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0001,transparent 35%,#0002);pointer-events:none}
 .map-hotspot{position:absolute;z-index:2;transform:none;display:flex;align-items:center;justify-content:center;border:2px solid currentColor;background:#ffffff28;color:#183d32;border-radius:16px;padding:4px 8px;cursor:pointer;font-weight:900;font-size:clamp(.72rem,1.35vw,1rem);text-align:center;line-height:1.1;box-shadow:0 4px 14px #0002;backdrop-filter:blur(1px);transition:transform .2s,background .2s,box-shadow .2s}
 .map-hotspot:hover,.map-hotspot:focus{transform:scale(1.05);background:#ffffffdc;outline:none;box-shadow:0 7px 20px #0004}
 .map-hotspot[data-id="valle"]{color:#1589b5}.map-hotspot[data-id="cafe"]{color:#277d3b}.map-hotspot[data-id="paramo"]{color:#bd8612}.map-hotspot[data-id="bogota"]{color:#a92d4d}
 .map-help{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:12px;font-size:.8rem}
 .location-game{position:relative;overflow:hidden;border-radius:24px;min-height:620px;padding:24px;color:#fff;background:#183d32 center/cover no-repeat;box-shadow:0 18px 45px #0004}
 .location-game:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#07181244 0%,#071812c9 78%);z-index:0}
 .location-content{position:relative;z-index:1;max-width:900px;margin:auto}
 .location-head{display:flex;justify-content:space-between;align-items:center;gap:15px;flex-wrap:wrap}.location-head h3{margin:3px 0;font-size:clamp(1.5rem,4vw,2.5rem)}
 .location-badge{background:#dced92;color:#183d32;border-radius:999px;padding:8px 12px;font-weight:900}
 .location-question{margin-top:24px;padding:22px;border-radius:20px;background:#fff;color:#183d32;box-shadow:0 12px 30px #0003}
 .location-question h4{font-size:clamp(1.05rem,2.4vw,1.45rem);margin:0 0 15px;line-height:1.35}.answer-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
 .answer-btn{border:1px solid #b7c4b0;background:#f7f8f2;color:#183d32;border-radius:14px;padding:14px;text-align:left;font-weight:800;cursor:pointer;min-height:76px;transition:transform .18s,box-shadow .18s,order .25s}
 .answer-btn:hover:not(:disabled){transform:translateY(-3px) rotate(-.3deg);box-shadow:0 7px 18px #0002}.answer-btn:disabled{cursor:default}.answer-btn.good{background:#dced92;border-color:#718b4e}.answer-btn.bad{background:#f1d5c9;border-color:#a05a48}
 .answer-btn:nth-child(odd){border-left-width:4px}.answer-btn:nth-child(even){border-right-width:4px}
 .progress-row{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:14px;font-weight:800}.progress-track{height:9px;background:#ffffff55;border-radius:99px;overflow:hidden;flex:1}.progress-track i{display:block;height:100%;background:#dced92;width:0;transition:width .25s}
 .map-back{margin-top:14px}.game-final{text-align:center;padding:50px 15px}.game-final .big{font-size:4rem}
 @media(max-width:700px){.map-game-card{padding:12px;border-radius:18px}.map-board-real{border-radius:14px}.map-hotspot{font-size:clamp(.48rem,2vw,.72rem);padding:2px 4px;border-width:1px;border-radius:9px;line-height:1}.map-help{align-items:flex-start;flex-direction:column}.map-mission{align-items:flex-start}.answer-grid{grid-template-columns:1fr}.location-game{padding:16px;min-height:650px}.answer-btn{min-height:64px}}
 `;document.head.appendChild(style);

 document.querySelectorAll('[data-game="quiz"],[data-game="memory"],[data-game="crossword"],[data-game="wordsearch"]').forEach(el=>(el.closest('article,.game-card')||el).remove());
 ['Quiz Andino','Memoria visual','Crucigrama','Sopa de letras'].forEach(t=>document.querySelectorAll('#juegos article,#juegos button').forEach(el=>{if(el.textContent.trim().toLowerCase().includes(t.toLowerCase()))el.remove()}));

 const section=arena.closest('#juegos')||arena.parentElement;
 const wrap=document.createElement('div');wrap.id='innovativeGames';wrap.innerHTML=`<div class="map-game-card">
  <span class="eyebrow light">🗺️ EXPEDICIÓN ANDINA</span>
  <h3>Explora el mapa de la Región Andina</h3>
  <p>Elige una localidad, entra en su escenario y resuelve <b>5 preguntas de razonamiento</b>. Las preguntas y las opciones cambian de posición en cada partida.</p>
  <div class="map-mission"><span style="font-size:1.8rem">🎯</span><div><b>MISIÓN: completa las 4 localidades</b><small>Solo hay una respuesta correcta por pregunta. Lee con atención: varias opciones son plausibles.</small></div></div>
  <div class="map-board-real" id="andinaMap" style="${bgImage(images.map)}"></div>
  <div class="map-help"><span>📍 Toca una zona del mapa para comenzar.</span><span>🏆 5 preguntas · 180 segundos por localidad</span></div>
 </div>`;
 section.insertBefore(wrap,arena);
 const map=wrap.querySelector('#andinaMap');
 places.forEach(p=>{const b=document.createElement('button');b.type='button';b.className='map-hotspot';b.dataset.id=p.id;b.style.cssText=p.position;b.textContent=p.name;b.title='Explorar '+p.name;b.setAttribute('aria-label','Explorar '+p.name);b.addEventListener('click',()=>startPlace(p));map.appendChild(b)});

 let timer=null;
 function clearTimer(){if(timer){clearInterval(timer);timer=null}}
 function startPlace(place){
   clearTimer();arena.hidden=false;arena.dataset.place=place.id;
   let q=0,score=0,left=180,answered=false;
   const questionOrder=shuffle(place.questions.map((_,i)=>i));
   render();
   timer=setInterval(()=>{left--;const t=arena.querySelector('#locationTimer');if(t)t.textContent=format(left);if(left<=0){clearTimer();finishPlace(place,score,true)}},1000);
   setTimeout(()=>arena.scrollIntoView({behavior:'smooth',block:'start'}),60);
   function render(){
    const item=place.questions[questionOrder[q]];
    const options=shuffle(item[1].map((text,index)=>({text,index})));
    const correct=options.findIndex(x=>x.index===item[2]);
    arena.innerHTML=`<div class="location-game" style="${bgImage(place.image)}"><div class="location-content">
      <div class="location-head"><div><span class="eyebrow light">${place.tag}</span><h3>${place.name}</h3></div><div class="location-badge">⏱ <span id="locationTimer">${format(left)}</span></div></div>
      <div class="progress-row"><span>Pregunta ${q+1} de ${place.questions.length}</span><span>⭐ ${score}</span></div><div class="progress-track"><i style="width:${q/place.questions.length*100}%"></i></div>
      <div class="location-question"><h4>${item[0]}</h4><div class="answer-grid">${options.map((a,i)=>`<button type="button" class="answer-btn" data-answer="${i}" style="order:${Math.floor(Math.random()*20)}">${a.text}</button>`).join('')}</div><p id="answerFeedback" aria-live="polite"></p></div>
      <button type="button" class="btn ghost map-back" id="backToMap">← Volver al mapa</button>
    </div></div>`;
    arena.querySelector('#backToMap').onclick=()=>{clearTimer();showMap()};
    arena.querySelectorAll('[data-answer]').forEach(btn=>btn.onclick=()=>{
      if(answered)return;
      answered=true;
      const ok=+btn.dataset.answer===correct;
      arena.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);
      btn.classList.add(ok?'good':'bad');
      if(ok)score++;
      const fb=arena.querySelector('#answerFeedback');
      fb.textContent=ok?'✓ ¡Correcto!':'✗ No era esa. La respuesta correcta era: '+options[correct].text;
      setTimeout(()=>{q++;answered=false;if(q>=place.questions.length)finishPlace(place,score,false);else render()},850);
    });
   }
 }
 function format(s){const m=Math.floor(s/60),sec=String(s%60).padStart(2,'0');return m+':'+sec}
 function finishPlace(place,score,timeUp){clearTimer();arena.innerHTML=`<div class="location-game" style="${bgImage(place.image)}"><div class="location-content game-final"><div class="big">${timeUp?'⏱️':'🏆'}</div><span class="eyebrow light">${place.name}</span><h3>${timeUp?'Se acabó el tiempo':'¡Localidad completada!'}</h3><p>Resultado: <b>${score}/5</b> respuestas correctas.</p><button type="button" class="btn primary" id="mapAgain">🗺️ Volver al mapa</button></div></div>`;arena.querySelector('#mapAgain').onclick=showMap}
 function showMap(){clearTimer();arena.hidden=true;arena.innerHTML='';document.querySelector('#innovativeGames')?.scrollIntoView({behavior:'smooth',block:'center'})}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();