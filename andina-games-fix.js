(()=>{
'use strict';

const IMG_BASE='./.github/workflows/';
const enc=(name)=>IMG_BASE+encodeURIComponent(name).replace(/%2F/g,'/');
const images={
  map:enc('ChatGPT Image 12 sept 2026, 04_38_17 p.m..png'),
  bogota:enc('ChatGPT Image 12 sept 2026, 04_38_26 p.m..png'),
  cafe:enc('ChatGPT Image 12 sept 2026, 04_38_37 p.m..png'),
  paramo:enc('ChatGPT Image 12 sept 2026, 04_39_30 p.m..png'),
  valle:enc('ChatGPT Image 12 sept 2026, 04_39_35 p.m..png')
};

const places=[
 {id:'valle',name:'Valle del Cauca',tag:'Valle interandino · Río · Producción',image:images.valle,position:'left:26.95%;top:39.45%;width:17.7%;height:9.9%;',questions:[
  ['¿Qué tipo de paisaje caracteriza al Valle del Cauca?',['Valle interandino','Altiplano frío','Llanura desértica','Costa insular'],0],
  ['¿Qué río es protagonista del valle?',['Cauca','Amazonas','Orinoco','Magdalena'],0],
  ['¿Qué actividad agrícola destaca en buena parte del valle?',['Cultivo de caña de azúcar','Cultivo de trigo','Pesca marina','Extracción de sal'],0],
  ['¿Qué relación existe entre el río y las comunidades?',['Agua y actividades productivas','Solo transporte aéreo','Solo actividad minera','Ninguna relación'],0],
  ['¿Qué ciudad importante se encuentra en este territorio?',['Cali','Cartagena','Leticia','Santa Marta'],0]
 ]},
 {id:'cafe',name:'Eje Cafetero',tag:'Montañas · Agricultura · Café',image:images.cafe,position:'left:39.05%;top:38.65%;width:17.6%;height:10%;',questions:[
  ['¿Qué producto identifica especialmente a esta zona?',['Café','Sal marina','Petróleo','Carbón'],0],
  ['¿A qué sector económico pertenece principalmente el cultivo de café?',['Primario','Secundario','Terciario','Cuaternario'],0],
  ['¿Qué paisaje es frecuente en el Eje Cafetero?',['Montañas y laderas','Playa tropical','Sabana costera','Desierto arenoso'],0],
  ['¿Qué actividad puede complementar al cultivo de café?',['Turismo rural','Pesca oceánica','Extracción de coral','Construcción naval'],0],
  ['¿Qué ayuda a explicar la variedad de cultivos en la montaña?',['Altitud y clima','Mareas','Arrecifes','Salinidad del océano'],0]
 ]},
 {id:'paramo',name:'Páramo',tag:'Alta montaña · Agua · Biodiversidad',image:images.paramo,position:'left:78.8%;top:17%;width:18.6%;height:9.6%;',questions:[
  ['¿Por qué son importantes los páramos?',['Ayudan a regular el agua','Producen sal marina','Forman arrecifes','Funcionan como puertos'],0],
  ['¿Qué planta es característica de muchos páramos?',['Frailejón','Mangle','Palma de coco','Bambú costero'],0],
  ['¿En qué zona se encuentran?',['Alta montaña','Nivel del mar','Desierto cálido','Llanura costera'],0],
  ['¿Qué actividad debe realizarse con especial cuidado en estos ecosistemas?',['Agricultura y turismo','Pesca oceánica','Construcción de puertos','Explotación de arrecifes'],0],
  ['¿Qué valor tiene la biodiversidad del páramo?',['Sostiene funciones ecológicas','Solo sirve para decoración','No tiene relación con el agua','Impide toda actividad humana'],0]
 ]},
 {id:'bogota',name:'Bogotá',tag:'Ciudad andina · Cordillera Oriental',image:images.bogota,position:'left:86.7%;top:51.8%;width:17.1%;height:9.9%;',questions:[
  ['¿En qué cordillera se encuentra principalmente Bogotá?',['Oriental','Central','Occidental','Costera'],0],
  ['¿Qué tipo de paisaje rodea a Bogotá?',['Altiplano andino','Costa marina','Desierto cálido','Isla volcánica'],0],
  ['¿Cuál es una actividad importante de una gran ciudad como Bogotá?',['Servicios','Pesca oceánica','Salinas costeras','Agricultura marina'],0],
  ['¿Qué elemento conecta Bogotá con otros territorios?',['Redes de transporte','Arrecifes','Manglares','Corrientes oceánicas'],0],
  ['¿Cuál es un reto urbano?',['Movilidad y planificación','Corales','Pesca artesanal marina','Formación de glaciares'],0]
 ]}
];

function shuffle(items){
 const a=items.slice();
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 return a;
}

function init(){
 const arena=document.querySelector('#gameArena');
 if(!arena)return;
 if(document.querySelector('#andina-map-game-style'))return;
 const style=document.createElement('style');style.id='andina-map-game-style';style.textContent=`
 #gameArena{position:relative;z-index:30}
 #innovativeGames{margin-top:18px}
 .map-game-card{border:1px solid #b7c4b0;border-radius:24px;padding:20px;background:#173e32;color:#fff;box-shadow:0 16px 35px #0002}
 .map-game-card h3{margin:5px 0 7px;font-size:1.2rem}.map-game-card p{opacity:.86;line-height:1.5}
 .map-mission{display:flex;align-items:center;gap:14px;padding:14px 16px;margin:15px 0;border-radius:16px;background:#dced92;color:#183d32;font-weight:800}
 .map-mission b{display:block}.map-mission small{font-weight:600;opacity:.8}
 .map-board-real{position:relative;width:100%;aspect-ratio:1672/940;border-radius:20px;overflow:hidden;background:#dfe8d2 center/100% 100% no-repeat;box-shadow:inset 0 0 0 1px #ffffff66}
 .map-board-real:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0001,transparent 35%,#0002);pointer-events:none}
 .map-hotspot{position:absolute;z-index:2;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;border:2px solid currentColor;background:#ffffff22;color:#183d32;border-radius:16px;padding:4px 8px;cursor:pointer;font-weight:900;font-size:clamp(.72rem,1.35vw,1rem);text-align:center;line-height:1.1;box-shadow:0 4px 14px #0002;backdrop-filter:blur(1px);transition:transform .2s,background .2s,box-shadow .2s}
 .map-hotspot:hover,.map-hotspot:focus{transform:translate(-50%,-50%) scale(1.035);background:#ffffffd9;outline:none;box-shadow:0 7px 20px #0004}
 .map-hotspot[data-id="valle"]{color:#1589b5}.map-hotspot[data-id="cafe"]{color:#277d3b}.map-hotspot[data-id="paramo"]{color:#bd8612}.map-hotspot[data-id="bogota"]{color:#a92d4d}
 .map-help{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:12px;font-size:.8rem}
 .location-game{position:relative;overflow:hidden;border-radius:24px;min-height:620px;padding:24px;color:#fff;background:#183d32 center/cover no-repeat;box-shadow:0 18px 45px #0004}
 .location-game:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#07181255 0%,#071812d0 78%);z-index:0}
 .location-content{position:relative;z-index:1;max-width:900px;margin:auto}
 .location-head{display:flex;justify-content:space-between;align-items:center;gap:15px;flex-wrap:wrap}.location-head h3{margin:3px 0;font-size:clamp(1.5rem,4vw,2.5rem)}
 .location-badge{background:#dced92;color:#183d32;border-radius:999px;padding:8px 12px;font-weight:900}
 .location-question{margin-top:24px;padding:22px;border-radius:20px;background:#fff;color:#183d32;box-shadow:0 12px 30px #0003}
 .location-question h4{font-size:clamp(1.05rem,2.4vw,1.45rem);margin:0 0 15px}.answer-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
 .answer-btn{border:1px solid #b7c4b0;background:#f7f8f2;color:#183d32;border-radius:14px;padding:14px;text-align:left;font-weight:800;cursor:pointer;min-height:62px;transition:transform .15s,box-shadow .15s}
 .answer-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 7px 18px #0002}.answer-btn:disabled{cursor:default}.answer-btn.good{background:#dced92;border-color:#718b4e}.answer-btn.bad{background:#f1d5c9;border-color:#a05a48}
 .progress-row{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:14px;font-weight:800}.progress-track{height:9px;background:#ffffff55;border-radius:99px;overflow:hidden;flex:1}.progress-track i{display:block;height:100%;background:#dced92;width:0;transition:width .25s}
 .map-back{margin-top:14px}.game-final{text-align:center;padding:50px 15px}.game-final .big{font-size:4rem}
 @media(max-width:700px){.map-game-card{padding:12px;border-radius:18px}.map-board-real{border-radius:14px}.map-hotspot{font-size:clamp(.48rem,2vw,.72rem);padding:2px 4px;border-width:1px;border-radius:9px;line-height:1}.map-help{align-items:flex-start;flex-direction:column}.map-mission{align-items:flex-start}.answer-grid{grid-template-columns:1fr}.location-game{padding:16px;min-height:650px}}
 `;document.head.appendChild(style);

 document.querySelectorAll('[data-game="quiz"],[data-game="memory"],[data-game="crossword"],[data-game="wordsearch"]').forEach(el=>(el.closest('article,.game-card')||el).remove());
 ['Quiz Andino','Memoria visual','Crucigrama','Sopa de letras'].forEach(t=>document.querySelectorAll('#juegos article,#juegos button').forEach(el=>{if(el.textContent.trim().toLowerCase().includes(t.toLowerCase()))el.remove()}));

 const section=arena.closest('#juegos')||arena.parentElement;
 if(!document.querySelector('#innovativeGames')){
   const wrap=document.createElement('div');wrap.id='innovativeGames';wrap.innerHTML=`<div class="map-game-card">
    <span class="eyebrow light">🗺️ EXPEDICIÓN ANDINA</span>
    <h3>Explora el mapa de la Región Andina</h3>
    <p>Tu misión aparece aquí. Elige una localidad en el mapa para entrar a su escenario y responder <b>5 preguntas en 3 minutos</b>.</p>
    <div class="map-mission"><span style="font-size:1.8rem">🎯</span><div><b>MISIÓN: completa las 4 localidades</b><small>Las opciones cambian de posición para que tengas que pensar cada respuesta.</small></div></div>
    <div class="map-board-real" id="andinaMap" style="background-image:url('${images.map}')"></div>
    <div class="map-help"><span>📍 Toca un recuadro para comenzar.</span><span>🏆 5 preguntas · 180 segundos por localidad</span></div>
   </div>`;section.insertBefore(wrap,arena);
   const map=wrap.querySelector('#andinaMap');
   places.forEach(p=>{const b=document.createElement('button');b.type='button';b.className='map-hotspot';b.dataset.id=p.id;b.style.cssText=p.position;b.textContent=p.name;b.title='Explorar '+p.name;b.setAttribute('aria-label','Explorar '+p.name);b.addEventListener('click',()=>startPlace(p));map.appendChild(b)});
 }

 let timer=null;
 function clearTimer(){if(timer){clearInterval(timer);timer=null}}
 function startPlace(place){
   clearTimer();arena.hidden=false;arena.dataset.place=place.id;let q=0,score=0,left=180,answered=false;
   render();
   timer=setInterval(()=>{left--;const t=arena.querySelector('#locationTimer');if(t)t.textContent=format(left);if(left<=0){clearTimer();finishPlace(place,score,true)}},1000);
   setTimeout(()=>arena.scrollIntoView({behavior:'smooth',block:'start'}),60);
   function render(){
    const item=place.questions[q];
    const options=shuffle(item[1].map((text,index)=>({text,index})));
    const correct=options.findIndex(x=>x.index===item[2]);
    arena.innerHTML=`<div class="location-game" style="background-image:url('${place.image}')"><div class="location-content">
      <div class="location-head"><div><span class="eyebrow light">${place.tag}</span><h3>${place.name}</h3></div><div class="location-badge">⏱ <span id="locationTimer">${format(left)}</span></div></div>
      <div class="progress-row"><span>Pregunta ${q+1} de ${place.questions.length}</span><span>⭐ ${score}</span></div><div class="progress-track"><i style="width:${q/place.questions.length*100}%"></i></div>
      <div class="location-question"><h4>${item[0]}</h4><div class="answer-grid">${options.map((a,i)=>`<button type="button" class="answer-btn" data-answer="${i}">${a.text}</button>`).join('')}</div><p id="answerFeedback" aria-live="polite"></p></div>
      <button type="button" class="btn ghost map-back" id="backToMap">← Volver al mapa</button>
    </div></div>`;
    arena.querySelector('#backToMap').onclick=()=>{clearTimer();showMap()};
    arena.querySelectorAll('[data-answer]').forEach(btn=>btn.onclick=()=>{
      if(answered)return;answered=true;const ok=+btn.dataset.answer===correct;arena.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);btn.classList.add(ok?'good':'bad');if(ok)score++;const fb=arena.querySelector('#answerFeedback');fb.textContent=ok?'✓ ¡Correcto!':'✗ No era esa. La respuesta correcta era: '+options[correct].text;setTimeout(()=>{q++;answered=false;if(q>=place.questions.length)finishPlace(place,score,false);else render()},650);
    });
   }
 }
 function format(s){const m=Math.floor(s/60),sec=String(s%60).padStart(2,'0');return m+':'+sec}
 function finishPlace(place,score,timeUp){clearTimer();arena.innerHTML=`<div class="location-game" style="background-image:url('${place.image}')"><div class="location-content game-final"><div class="big">${timeUp?'⏱️':'🏆'}</div><span class="eyebrow light">${place.name}</span><h3>${timeUp?'Se acabó el tiempo':'¡Localidad completada!'}</h3><p>Resultado: <b>${score}/5</b> respuestas correctas.</p><button type="button" class="btn primary" id="mapAgain">🗺️ Volver al mapa</button></div></div>`;arena.querySelector('#mapAgain').onclick=showMap}
 function showMap(){clearTimer();arena.hidden=true;arena.innerHTML='';document.querySelector('#innovativeGames')?.scrollIntoView({behavior:'smooth',block:'center'})}
}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
