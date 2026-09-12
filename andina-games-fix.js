(()=>{
'use strict';

const PAGES_BASE=new URL('./assets/andina/',document.baseURI).href;
const RAW_BASE='https://raw.githubusercontent.com/Juangema07/andina-explora-11.github.io/main/assets/andina/';
const asset=(name)=>({primary:PAGES_BASE+name+'?v=20260912',fallback:RAW_BASE+name+'?v=20260912'});
const images={
 map:asset('mapa.png'),
 bogota:asset('bogota.png'),
 cafe:asset('eje-cafetero.png'),
 paramo:asset('paramo.png'),
 valle:asset('valle-del-cauca.png')
};

const places=[
 {id:'valle',name:'Valle del Cauca',tag:'Valle interandino · río · producción',image:images.valle,
  hotspot:'left:2.1%;top:19.7%;width:11.7%;height:6.2%;',
  questions:[
   ['El río Cauca atraviesa el valle y allí existe agricultura intensiva. ¿Qué relación explica mejor esta situación?',['El agua sostiene actividades productivas, pero exige gestionar su uso','La presencia del río impide la agricultura','El río solo tiene valor turístico','La agricultura no depende de condiciones naturales'],0],
   ['¿Qué rasgo ayuda a explicar que el Valle del Cauca sea un valle interandino?',['Está condicionado por sistemas montañosos que influyen en relieve y clima','Está rodeado únicamente por océano','Es una llanura completamente desértica','Se encuentra sobre una isla volcánica'],0],
   ['Una expansión de cultivos de caña aumenta la producción, pero también presiona suelo y agua. ¿Qué concepto permite analizar mejor el caso?',['Uso sostenible y planificación del territorio','Aislamiento geográfico','Urbanización costera','Desconexión económica'],0],
   ['La conexión entre Cali, zonas rurales, carreteras y mercados muestra principalmente…',['Interdependencia urbano-rural','Aislamiento entre territorios','Dependencia de la pesca marina','Ausencia de intercambio'],0]
  ]},
 {id:'cafe',name:'Eje Cafetero',tag:'montañas · café · paisaje cultural',image:images.cafe,
  hotspot:'left:19.6%;top:21.7%;width:11.8%;height:6.8%;',
  questions:[
   ['Una finca cafetera está en una ladera a cierta altitud. ¿Qué conjunto de factores explica mejor sus condiciones de cultivo?',['Altitud, temperatura, lluvias y relieve','Mareas y salinidad marina','Arrecifes y corrientes oceánicas','Desierto y ausencia de lluvias'],0],
   ['El café se cultiva, se transforma, se transporta y se vende. ¿Qué lectura económica es más completa?',['Se conectan actividades de los sectores primario, secundario y terciario','Solo interviene el sector terciario','Solo interviene la minería','El transporte no participa en la cadena'],0],
   ['¿Por qué el relieve montañoso modifica la forma de producir café?',['Las pendientes condicionan cultivos, caminos, suelo y transporte','Las montañas hacen imposible toda agricultura','Las laderas convierten la zona en territorio marino','El relieve no influye en las actividades humanas'],0],
   ['Una comunidad combina café, hospedaje y recorridos por fincas. ¿Qué estrategia representa?',['Diversificación mediante agricultura y turismo rural','Sustitución de agricultura por pesca','Industrialización de un puerto','Eliminación de actividades culturales'],0]
  ]},
 {id:'paramo',name:'Páramo',tag:'alta montaña · agua · biodiversidad',image:images.paramo,
  hotspot:'left:40%;top:4.9%;width:12.1%;height:9.3%;',
  questions:[
   ['¿Por qué un páramo puede ser importante para poblaciones ubicadas a muchos kilómetros de él?',['Ayuda a regular y almacenar agua que alimenta cuencas','Funciona como puerto marítimo','Produce agua solo para la fauna local','Reemplaza las redes de acueducto'],0],
   ['Si se transforma un páramo sin considerar su función hídrica, ¿qué riesgo aparece?',['Pueden afectarse servicios ecosistémicos y disponibilidad o calidad del agua','La biodiversidad aumenta automáticamente','El ecosistema se convierte en mar','Deja de ser necesario proteger las cuencas'],0],
   ['¿Por qué el frailejón es un símbolo frecuente de los páramos?',['Representa biodiversidad e identidad asociadas a la alta montaña','Es una especie propia de manglares','Es un cultivo industrial de clima cálido','Es un animal de los valles interandinos'],0],
   ['¿Qué decisión es más coherente con la conservación de un páramo?',['Regular actividades según la fragilidad del ecosistema','Construir sin evaluar impactos','Reemplazar vegetación nativa por cualquier cultivo','Extraer recursos sin controles'],0]
  ]},
 {id:'bogota',name:'Bogotá',tag:'ciudad andina · altiplano · servicios',image:images.bogota,
  hotspot:'left:51%;top:30.5%;width:12%;height:6.3%;',
  questions:[
   ['Bogotá se ubica en un altiplano de la Cordillera Oriental. ¿Qué consecuencia territorial se relaciona con esa ubicación?',['Altitud y relieve influyen en clima, expansión urbana y conexiones','La ciudad queda al nivel del mar','El territorio funciona como una isla','La ubicación elimina problemas de movilidad'],0],
   ['Una gran ciudad concentra empresas, instituciones, educación y comercio. ¿Qué sector tiene especial peso?',['Servicios','Pesca oceánica','Extracción de sal marina','Agricultura de arrecife'],0],
   ['Una persona vive en una zona rural cercana y estudia o trabaja en Bogotá. ¿Qué proceso se evidencia?',['Interacción urbano-rural y movilidad cotidiana','Aislamiento absoluto','Desconexión de transporte','Migración exclusivamente internacional'],0],
   ['¿Por qué la movilidad es también un desafío geográfico?',['Relaciona población, distribución urbana, infraestructura, tiempo y acceso a oportunidades','Depende solamente del número de vehículos','No tiene relación con la organización espacial','Afecta únicamente a turistas'],0]
  ]}
];

function shuffle(a){const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
function imageSources(img){return `src="${img.primary}" data-fallback="${img.fallback}"`}

function init(){
 const arena=document.querySelector('#gameArena');
 if(!arena||document.querySelector('#andina-map-game-style'))return;

 const style=document.createElement('style');
 style.id='andina-map-game-style';
 style.textContent=`
 #gameArena{position:relative;z-index:20}
 #innovativeGames{margin-top:18px}
 .andina-game{border-radius:26px;overflow:hidden;background:#173e32;color:#fff;box-shadow:0 20px 50px #0004;border:1px solid #ffffff22}
 .andina-intro{padding:24px 24px 18px;background:linear-gradient(135deg,#173e32,#215b45)}
 .andina-kicker{display:inline-block;font-size:.76rem;letter-spacing:.12em;font-weight:900;color:#dced92;margin-bottom:6px}
 .andina-intro h3{margin:0 0 7px;font-size:clamp(1.4rem,3vw,2rem)}
 .andina-intro p{margin:0;line-height:1.55;opacity:.9}
 .andina-status{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:12px 18px;background:#102f26;border-top:1px solid #ffffff12;border-bottom:1px solid #ffffff12}
 .lives{font-size:1.35rem;letter-spacing:4px;white-space:nowrap}.lives .off{filter:grayscale(1);opacity:.28}
 .region-progress{font-weight:900}.timer-pill{padding:7px 11px;border-radius:999px;background:#dced92;color:#173e32;font-weight:900;min-width:72px;text-align:center}
 .map-shell{position:relative;margin:18px;border-radius:20px;overflow:hidden;background:#dfe8d2;box-shadow:inset 0 0 0 1px #ffffff55;animation:mapFloat 5s ease-in-out infinite}
 .map-image{display:block;width:100%;height:auto;aspect-ratio:1672/940;object-fit:fill}
 .map-hotspot{position:absolute;z-index:3;display:flex;align-items:center;justify-content:center;padding:0;border:2px solid currentColor;border-radius:12px;background:#ffffff20;color:#173e32;font-weight:900;font-size:clamp(.55rem,1.25vw,.95rem);line-height:1;text-align:center;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,background .2s ease;animation:hotPulse 2.2s ease-in-out infinite}
 .map-hotspot:hover,.map-hotspot:focus{transform:scale(1.06);background:#ffffffdd;box-shadow:0 0 0 5px #ffffff33,0 8px 20px #0004;outline:none}
 .map-hotspot[data-id=valle]{color:#148bb5}.map-hotspot[data-id=cafe]{color:#287b3c}.map-hotspot[data-id=paramo]{color:#b9800d}.map-hotspot[data-id=bogota]{color:#a82e4c}
 .map-hotspot.done{opacity:.55;animation:none;filter:saturate(.65)}
 .map-hotspot.done:after{content:'✓';font-size:1.2em;margin-left:4px}
 .map-tip{padding:0 18px 18px;text-align:center;font-size:.82rem;opacity:.82}
 .mission-panel{padding:28px 22px;min-height:570px;position:relative;background:#173e32 center/cover no-repeat}
 .mission-panel:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#07181255,#071812dd 72%)}
 .mission-content{position:relative;z-index:1;max-width:900px;margin:auto}
 .mission-top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.mission-top h3{font-size:clamp(1.45rem,4vw,2.35rem);margin:0}.mission-tag{padding:8px 12px;border-radius:999px;background:#dced92;color:#173e32;font-weight:900}
 .mission-question{margin-top:24px;background:#fff;color:#173e32;border-radius:20px;padding:22px;box-shadow:0 16px 35px #0005;animation:questionIn .35s ease both}
 .mission-question h4{font-size:clamp(1.05rem,2.5vw,1.45rem);line-height:1.4;margin:0 0 17px}
 .answer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
 .answer{min-height:78px;padding:13px;border:1px solid #bdc9ba;border-radius:14px;background:#f7f8f2;color:#173e32;font-weight:800;text-align:left;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,background .18s ease,border-color .18s ease;animation:answerIn .35s ease both}
 .answer:hover:not(:disabled){transform:translateY(-4px) rotate(-.25deg);box-shadow:0 8px 18px #0002}.answer:disabled{cursor:default}.answer.correct{background:#dced92;border-color:#718b4e}.answer.wrong{background:#f0d1c7;border-color:#a25b4b;animation:wrongShake .32s ease}
 .mission-footer{display:flex;align-items:center;gap:12px;margin-top:15px}.progress-bar{height:8px;flex:1;background:#ffffff3d;border-radius:99px;overflow:hidden}.progress-bar i{display:block;height:100%;background:#dced92;border-radius:99px;transition:width .35s ease}
 .feedback{min-height:25px;margin-top:12px;font-weight:900}.feedback.good{color:#dced92}.feedback.bad{color:#ffd0c4}
 .game-final{padding:60px 20px;text-align:center;position:relative;overflow:hidden}.game-final .emoji{font-size:4.5rem;animation:winBounce .8s ease infinite alternate}.game-final h3{font-size:clamp(1.8rem,5vw,3rem);margin:10px 0}.game-final p{opacity:.9}
 .restart-btn{border:0;border-radius:999px;padding:12px 18px;background:#dced92;color:#173e32;font-weight:900;cursor:pointer;margin-top:8px}
 .map-return{margin:16px 18px 20px;border:1px solid #ffffff44;background:#ffffff12;color:#fff;border-radius:12px;padding:10px 14px;font-weight:800;cursor:pointer}
 .confetti-piece{position:absolute;top:-18px;width:9px;height:16px;animation:confettiFall 2.7s linear forwards;pointer-events:none}
 @keyframes mapFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
 @keyframes hotPulse{0%,100%{box-shadow:0 0 0 0 #ffffff00}50%{box-shadow:0 0 0 5px #ffffff22}}
 @keyframes questionIn{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
 @keyframes answerIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
 @keyframes wrongShake{20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
 @keyframes winBounce{from{transform:translateY(0) rotate(-3deg)}to{transform:translateY(-10px) rotate(3deg)}}
 @keyframes confettiFall{to{transform:translate3d(var(--drift),110vh,0) rotate(720deg);opacity:0}}
 @media(max-width:700px){.andina-intro{padding:18px 15px}.andina-status{padding:10px 13px}.map-shell{margin:12px;border-radius:14px}.map-hotspot{border-width:1px;border-radius:7px;font-size:clamp(.38rem,1.8vw,.62rem)}.mission-panel{padding:20px 13px;min-height:650px}.mission-question{padding:17px;border-radius:16px}.answer-grid{grid-template-columns:1fr}.answer{min-height:64px}.mission-top{align-items:flex-start}.map-return{margin:12px 13px 16px}}
 `;
 document.head.appendChild(style);

 // Elimina cualquier juego antiguo que haya quedado en la página.
 document.querySelectorAll('[data-game="quiz"],[data-game="memory"],[data-game="crossword"],[data-game="wordsearch"]').forEach(el=>(el.closest('article,.game-card')||el).remove());
 ['Quiz Andino','Memoria visual','Crucigrama','Sopa de letras'].forEach(t=>document.querySelectorAll('#juegos article,#juegos button').forEach(el=>{if(el.textContent.trim().toLowerCase().includes(t.toLowerCase()))el.remove()}));

 const section=arena.closest('#juegos')||arena.parentElement;
 const wrap=document.createElement('div');
 wrap.id='innovativeGames';
 wrap.innerHTML=`<div class="andina-game">
  <div class="andina-intro"><span class="andina-kicker">🗺️ EXPEDICIÓN ANDINA</span><h3>Una sola misión: completar las 4 regiones</h3><p>Explora el mapa, supera cada región y conserva tus vidas. Si completas las cuatro, ganas la expedición.</p></div>
  <div class="andina-status"><div class="lives" id="gameLives" aria-label="3 vidas">❤️❤️❤️</div><div class="region-progress" id="regionProgress">0 / 4 regiones</div><div class="timer-pill" id="gameTimer">03:00</div></div>
  <div id="gameStage"></div>
 </div>`;
 section.insertBefore(wrap,arena);
 const stage=wrap.querySelector('#gameStage');
 const livesEl=wrap.querySelector('#gameLives');
 const regionEl=wrap.querySelector('#regionProgress');
 const timerEl=wrap.querySelector('#gameTimer');

 const state={lives:3,completed:0,current:null,qIndex:0,questions:[],time:180,interval:null,locked:false,done:new Set()};

 function setMap(){
  stage.innerHTML=`<div class="map-shell"><img class="map-image" ${imageSources(images.map)} alt="Mapa ilustrado de la Región Andina"><div id="hotspots"></div></div><div class="map-tip">📍 Selecciona una región para iniciar la siguiente misión.</div>`;
  const img=stage.querySelector('.map-image');
  img.addEventListener('error',()=>{if(img.dataset.fallback&&!img.src.includes('raw.githubusercontent.com'))img.src=img.dataset.fallback},{once:true});
  const hs=stage.querySelector('#hotspots');
  places.forEach(p=>{
   const b=document.createElement('button');b.className='map-hotspot'+(state.done.has(p.id)?' done':'');b.dataset.id=p.id;b.style.cssText=p.hotspot;b.textContent=p.name;b.disabled=state.done.has(p.id);b.addEventListener('click',()=>startRegion(p.id));hs.appendChild(b);
  });
 }

 function updateStatus(){
  livesEl.innerHTML=[0,1,2].map(i=>`<span class="${i<state.lives?'':'off'}">❤️</span>`).join('');
  livesEl.setAttribute('aria-label',`${state.lives} vidas restantes`);
  regionEl.textContent=`${state.completed} / 4 regiones`;
  const m=Math.floor(state.time/60),s=state.time%60;timerEl.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  timerEl.style.background=state.time<=30?'#f0d1c7':'#dced92';
 }

 function startTimer(){clearInterval(state.interval);state.interval=setInterval(()=>{state.time--;updateStatus();if(state.time<=0){clearInterval(state.interval);loseGame('Se acabó el tiempo. La expedición terminó.');}},1000)}
 function loseGame(message){clearInterval(state.interval);state.locked=true;stage.innerHTML=`<div class="game-final"><div class="emoji">🧭</div><h3>Expedición terminada</h3><p>${message}</p><p>Completaste ${state.completed} de 4 regiones.</p><button class="restart-btn" id="restartGame">Intentar de nuevo</button></div>`;stage.querySelector('#restartGame').onclick=restart}
 function restart(){clearInterval(state.interval);state.lives=3;state.completed=0;state.current=null;state.qIndex=0;state.questions=[];state.time=180;state.locked=false;state.done=new Set();updateStatus();setMap()}

 function startRegion(id){
  if(state.locked||state.done.has(id))return;
  const p=places.find(x=>x.id===id);state.current=p;state.qIndex=0;state.questions=shuffle(p.questions);state.locked=false;renderQuestion();
 }
 function renderQuestion(){
  const p=state.current,q=state.questions[state.qIndex];
  const options=q[1].map((text,i)=>({text,correct:i===q[2]}));
  const mixed=shuffle(options);
  stage.innerHTML=`<div class="mission-panel" style="background-image:url('${p.image.primary}'),url('${p.image.fallback}')"><div class="mission-content"><div class="mission-top"><h3>${p.name}</h3><span class="mission-tag">${p.tag}</span></div><div class="mission-question"><h4>${q[0]}</h4><div class="answer-grid"></div><div class="feedback" id="feedback"></div><div class="mission-footer"><span>Pregunta ${state.qIndex+1}/${state.questions.length}</span><div class="progress-bar"><i style="width:${((state.qIndex)/state.questions.length)*100}%"></i></div></div></div></div></div><button class="map-return" id="mapReturn">↩ Volver al mapa</button>`;
  const panel=stage.querySelector('.mission-panel');const img=new Image();img.onerror=()=>{if(!panel.dataset.fallback){panel.dataset.fallback='1';panel.style.backgroundImage=`url('${p.image.fallback}')`}};img.src=p.image.primary;
  const grid=stage.querySelector('.answer-grid');mixed.forEach((o,i)=>{const b=document.createElement('button');b.className='answer';b.style.animationDelay=`${i*55}ms`;b.textContent=o.text;b.addEventListener('click',()=>answer(b,o.correct));grid.appendChild(b)});
  stage.querySelector('#mapReturn').onclick=()=>setMap();
 }

 function answer(button,correct){
  if(state.locked)return;state.locked=true;stage.querySelectorAll('.answer').forEach(b=>b.disabled=true);
  const feedback=stage.querySelector('#feedback');
  if(correct){
   button.classList.add('correct');feedback.className='feedback good';feedback.textContent='✓ ¡Correcto! Buen razonamiento territorial.';
  }else{
   button.classList.add('wrong');state.lives--;updateStatus();feedback.className='feedback bad';feedback.textContent='✗ Incorrecto. Pierdes una vida.';
   const q=state.questions[state.qIndex];stage.querySelectorAll('.answer').forEach(b=>{if(b.textContent===q[1][q[2]])b.classList.add('correct')});
   if(state.lives<=0){setTimeout(()=>loseGame('Te quedaste sin vidas. ¡La próxima expedición puede ser mejor!'),900);return}
  }
  setTimeout(()=>{
   state.locked=false;
   if(state.qIndex<state.questions.length-1){state.qIndex++;renderQuestion()}
   else completeRegion();
  },850);
 }

 function completeRegion(){
  state.done.add(state.current.id);state.completed++;updateStatus();
  if(state.completed===4){clearInterval(state.interval);winGame();return}
  stage.innerHTML=`<div class="game-final"><div class="emoji">🎯</div><h3>${state.current.name} completado</h3><p>¡Bien! Ya llevas <b>${state.completed}/4 regiones</b>. Regresa al mapa para continuar.</p><button class="restart-btn" id="continueMap">Continuar expedición</button></div>`;
  stage.querySelector('#continueMap').onclick=setMap;
 }

 function winGame(){
  state.locked=true;stage.innerHTML=`<div class="game-final" id="winPanel"><div class="emoji">🏆</div><h3>¡EXPEDICIÓN COMPLETADA!</h3><p>Superaste Valle del Cauca, Eje Cafetero, Páramo y Bogotá con tus vidas restantes.</p><p>🎉 ¡Los Andes son tuyos!</p><button class="restart-btn" id="restartGame">Jugar otra vez</button></div>`;
  stage.querySelector('#restartGame').onclick=restart;confetti(stage.querySelector('#winPanel'));
 }
 function confetti(parent){
  const pieces=70;for(let i=0;i<pieces;i++){const el=document.createElement('i');el.className='confetti-piece';el.style.left=`${Math.random()*100}%`;el.style.setProperty('--drift',`${(Math.random()-.5)*260}px`);el.style.animationDelay=`${Math.random()*1.2}s`;el.style.animationDuration=`${2+Math.random()*1.8}s`;el.style.transform=`rotate(${Math.random()*180}deg)`;el.style.background=['#dced92','#f3c74f','#7ac6d8','#ef8f8f','#ffffff'][Math.floor(Math.random()*5)];parent.appendChild(el)}}

 updateStatus();setMap();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();