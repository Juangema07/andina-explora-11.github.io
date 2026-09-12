/* Mejoras interactivas de Andina Explora: juegos, animaciones, lectura y detalles. */
(function(){
'use strict';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* ---------- ESTILO DINÁMICO ---------- */
const style=document.createElement('style');
style.textContent=`
@keyframes sectionIn{from{opacity:0;transform:translateY(35px) scale(.985);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}
@keyframes sectionOut{from{opacity:1;transform:none}to{opacity:.72;transform:translateY(18px);filter:blur(2px)}}
@keyframes letterIn{from{opacity:0;transform:translateY(18px) rotate(3deg);filter:blur(5px)}to{opacity:1;transform:none;filter:none}}
@keyframes letterOut{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-10px) rotate(-2deg);filter:blur(4px)}}
@keyframes floaty{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(2deg)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 0 #dced9200}50%{box-shadow:0 0 28px #dced9248}}
.reveal-live{animation:sectionIn .75s cubic-bezier(.2,.8,.2,1) both}.reveal-live.is-leaving{animation:sectionOut .45s ease both}
.letter{display:inline-block;opacity:0;animation:letterIn .5s cubic-bezier(.2,.8,.2,1) both;will-change:transform,opacity,filter}.letters-out .letter{animation:letterOut .28s ease both!important}
[data-detail],.topic,.culture-card,.challenge-grid button,.game-cards article,.info-cards button{transition:transform .35s ease,box-shadow .35s ease,filter .35s ease}
[data-detail]:hover,.topic:hover,.culture-card:hover,.challenge-grid button:hover,.game-cards article:hover,.info-cards button:hover{filter:saturate(1.08)}
.hero-art .coffee-doodle,.hero-art .frailejon-doodle{animation:floaty 4s ease-in-out infinite}.hero-art .frailejon-doodle{animation-delay:-1.5s}
.speech-tools{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}.speech-tools button{border:0;border-radius:999px;padding:10px 14px;background:var(--ink);color:#fff;font-weight:900;font-size:.7rem}.speech-tools button.secondary{background:#dce8c3;color:var(--ink)}
.more-box{margin-top:18px;padding:18px;border-radius:18px;background:#f2f5e8;border:1px solid #d6ddc5;color:#405148;line-height:1.7}.more-box b{color:var(--ink)}
.game-help{padding:12px 15px;border-radius:14px;background:#f0f4e8;color:#425349;font-size:.72rem;line-height:1.5;margin-bottom:12px}.game-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.game-actions button{border:0;border-radius:999px;padding:10px 14px;font-weight:900;font-size:.7rem}.game-primary{background:var(--lime);color:var(--ink)}.game-secondary{background:#e7ece0;color:var(--ink)}
.ws-grid{display:grid;grid-template-columns:repeat(13,minmax(24px,1fr));gap:4px;max-width:650px;margin:18px auto;padding:14px;border-radius:20px;background:#163b31;box-shadow:0 20px 45px #102d2630}.ws-cell{aspect-ratio:1;border:0;border-radius:7px;background:#f5f5e8;color:#173c32;font-weight:950;font-size:clamp(.55rem,1.7vw,.9rem);padding:0}.ws-cell:hover{transform:scale(1.08);background:#dced92}.ws-cell.found{background:#dced92;box-shadow:0 0 0 2px #173c32 inset;animation:glowPulse 1.1s ease}
.ws-words{display:flex;gap:7px;flex-wrap:wrap;justify-content:center}.ws-words span{padding:7px 10px;border-radius:99px;background:#e8eee1;font-size:.64rem;font-weight:900}.ws-words span.done{text-decoration:line-through;background:#dced92}.cw-grid{display:grid;gap:3px;width:min(100%,520px);margin:18px auto;padding:10px;border-radius:18px;background:#173c32}.cw-row{display:grid;grid-template-columns:repeat(9,1fr);gap:3px}.cw-cell{aspect-ratio:1;min-width:0;position:relative;background:#fffdf7;border-radius:4px}.cw-cell.block{background:#173c32}.cw-cell input{width:100%;height:100%;border:2px solid transparent;background:transparent;text-align:center;text-transform:uppercase;font-weight:950;font-size:clamp(.85rem,3vw,1.15rem);color:#173c32;outline:0}.cw-cell input:focus{border-color:#a8bd69;background:#eef3df}.cw-num{position:absolute;top:2px;left:3px;font-size:.45rem;font-weight:900;color:#718446}.cw-clues{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}.cw-clues div{padding:14px;border-radius:15px;background:#f0f4e8}.cw-clues b{display:block;margin-bottom:7px}.cw-clues p{font-size:.7rem;margin:5px 0;color:#4f5d55}.cw-correct{background:#dced92!important}.cw-wrong{background:#f1d9bc!important}
@media(max-width:760px){.cw-clues{grid-template-columns:1fr}.ws-grid{gap:3px;padding:9px}.ws-cell{border-radius:5px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
body.reduce-motion .reveal-live,body.reduce-motion .letter{animation:none!important;opacity:1!important;transform:none!important;filter:none!important}
.section:nth-of-type(3){background-image:linear-gradient(#fffdf7e8,#fffdf7e8),url('https://upload.wikimedia.org/wikipedia/commons/a/aa/Panorama_Pe%C3%B1a_de_Ot%C3%AD_-_P%C3%A1ramo_de_Ocet%C3%A1.jpg');background-size:cover;background-attachment:fixed}
#humana{background-image:linear-gradient(#102d26e8,#102d26e8),url('https://upload.wikimedia.org/wikipedia/commons/6/6d/Medellin_Colombia.jpg');background-size:cover;background-position:center}
#economia{background-image:linear-gradient(#f0ebdded,#f0ebdded),url('https://upload.wikimedia.org/wikipedia/commons/5/5d/Coffee_farm_in_Colombia.jpg');background-size:cover;background-position:center}
#cultura{background-image:linear-gradient(#e8e4d6e8,#e8e4d6e8),url('https://upload.wikimedia.org/wikipedia/commons/7/79/Salento_Quindio_Colombia.jpg');background-size:cover;background-position:center}
#desafios{background-image:linear-gradient(#102d26e8,#102d26e8),url('https://upload.wikimedia.org/wikipedia/commons/1/18/P%C3%A1ramo_de_Sumapaz.jpg');background-size:cover;background-position:center}
`;
document.head.appendChild(style);

/* ---------- ANIMACIONES AL ENTRAR/SALIR ---------- */
function prepareLetters(el){
 if(!el||el.dataset.lettersReady)return;
 const text=el.textContent.trim();
 if(!text||text.length>90)return;
 el.dataset.lettersReady='1';
 el.setAttribute('aria-label',text);
 el.textContent='';
 [...text].forEach((ch,i)=>{const s=document.createElement('span');s.className='letter';s.textContent=ch===' '? '\u00a0':ch;s.style.animationDelay=(i*0.018)+'s';el.appendChild(s)});
}
function animateTarget(el,enter){
 if(!el)return;
 if(enter){el.classList.remove('is-leaving');el.classList.add('reveal-live');$$('h1,h2,h3,.eyebrow',el).forEach(prepareLetters)}
 else if(!document.body.classList.contains('reduce-motion')){el.classList.add('is-leaving')}
}
const animatedSections=$$('main > section');
if('IntersectionObserver' in window){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>animateTarget(e.target,e.isIntersecting)),{threshold:.08,rootMargin:'0px 0px -8%'});
 animatedSections.forEach(s=>io.observe(s));
}

/* ---------- LECTURA EN VOZ ALTA ---------- */
let speaking=false;
function stopSpeech(){if('speechSynthesis' in window){speechSynthesis.cancel();speaking=false}}
function speak(text){
 if(!('speechSynthesis' in window))return;
 stopSpeech();
 const u=new SpeechSynthesisUtterance(text);u.lang='es-CO';u.rate=.92;u.pitch=1;
 u.onstart=()=>{speaking=true};u.onend=()=>{speaking=false};
 speechSynthesis.speak(u);
}
function visibleText(el){return (el?.innerText||'').replace(/\s+/g,' ').trim()}
function addSpeechButton(container,label,getText){
 if(!container||container.querySelector('.speech-tools'))return;
 const box=document.createElement('div');box.className='speech-tools';
 const play=document.createElement('button');play.textContent='🔊 '+label;
 const stop=document.createElement('button');stop.textContent='⏹ Detener';stop.className='secondary';
 play.addEventListener('click',()=>speak(getText()));stop.addEventListener('click',stopSpeech);
 box.append(play,stop);container.appendChild(box);
}

/* La información principal de cada sección puede escucharse. */
$$('.section-head').forEach(h=>addSpeechButton(h,'Escuchar sección',()=>visibleText(h)));

/* ---------- MÁS DETALLES EN MODALES ---------- */
const expanded={
 ubicacion:'La Región Andina ocupa el espacio central montañoso de Colombia. Su organización territorial está muy relacionada con las cordilleras y los valles interandinos. Para estudiarla conviene observar ubicación, altitud, vías, ciudades y actividades económicas como partes de un mismo sistema.',
 relieve:'Las cordilleras Occidental, Central y Oriental generan diferencias de altura y pendientes. Entre ellas se encuentran valles, altiplanos y cañones. Este relieve condiciona carreteras, agricultura, asentamientos, clima local y distribución de ecosistemas.',
 agua:'Las cuencas andinas conectan las zonas altas con los valles y las ciudades. El cuidado del suelo y la vegetación en las partes altas puede influir en la cantidad y calidad del agua disponible aguas abajo.',
 biodiversidad:'La variación de altura produce cambios de temperatura, humedad y vegetación. Los páramos y bosques de montaña cumplen funciones ecológicas importantes y requieren manejo responsable frente a la transformación del territorio.',
 poblacion:'La distribución de población no es uniforme. Grandes ciudades y corredores urbanos conviven con municipios pequeños y zonas rurales. Las cifras deben compararse usando el mismo año, fuente y definición regional.',
 ciudades:'Las ciudades andinas funcionan como nodos de empleo, educación, comercio, salud y transporte. Su crecimiento también plantea retos de movilidad, vivienda, servicios públicos y protección ambiental.',
 diversidad:'La cultura andina colombiana no es una sola. Cada territorio combina historias, comunidades, ingredientes, músicas, oficios y celebraciones propias. Comparar esas diferencias ayuda a evitar generalizaciones.',
 urbanizacion:'La urbanización modifica el uso del suelo y aumenta la demanda de transporte, vivienda, agua, energía y servicios. Una planificación adecuada busca conectar crecimiento económico con calidad de vida y protección ambiental.',
 retosocial:'Los retos sociales tienen una dimensión territorial: las oportunidades pueden variar entre ciudades, municipios y áreas rurales. Analizar infraestructura, educación, empleo y conectividad ayuda a entender esas diferencias.',
 gastronomia:'Los alimentos asociados con la región muestran la relación entre clima, agricultura, historia y costumbres. Preparaciones como ajiaco y tamales tienen variantes locales; el café también conecta paisaje, trabajo y economía.',
 musica:'El tiple y géneros como el bambuco forman parte de tradiciones musicales colombianas. La música puede estudiarse como patrimonio, pero también como una práctica viva que cambia con las generaciones.',
 artesanias:'Los oficios artesanales reúnen materiales, técnicas y conocimientos. Además de su valor estético, permiten estudiar economía local, identidad, transmisión cultural y relación con los recursos del territorio.',
 fiestas:'Las celebraciones pueden reunir música, gastronomía, memoria e identidad. Para comprender una fiesta es útil investigar su origen, quiénes participan, qué símbolos utiliza y cómo ha cambiado.',
 aguaReto:'El problema del agua puede involucrar contaminación, pérdida de cobertura vegetal, cambios en el uso del suelo y presión de diferentes usuarios. Las respuestas requieren prevención, restauración, tratamiento y participación comunitaria.',
 deforestacion:'La pérdida de cobertura vegetal fragmenta hábitats y puede afectar suelo y agua. La protección de ecosistemas estratégicos, la restauración y prácticas productivas compatibles con conservación son líneas de respuesta.',
 desigualdad:'Las diferencias territoriales se expresan en acceso a servicios, conectividad, educación y empleo. Las soluciones deben reconocer las condiciones particulares de cada municipio y fortalecer oportunidades locales.'
};
function enhanceModal(){
 const modal=$('#modal');if(!modal)return;
 const body=$('#modalBody');if(!body)return;
 let key='';
 const current=$$('.open [data-detail]');
 const title=visibleText($('#modalTitle'));
 const map=Object.entries(expanded).find(([k])=>title&&expanded[k].includes(''));
 if(!body.querySelector('.more-box')){
  const box=document.createElement('div');box.className='more-box';box.innerHTML='<b>Más detalles</b><p>Explora la información, compárala con otras secciones y relaciona el tema con el territorio.</p>';
  body.appendChild(box);
 }
 addSpeechButton(body,'Escuchar información',()=>visibleText(body));
}
/* Interceptamos la apertura para enriquecer el modal existente sin romper su código. */
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-detail]');
 if(!b)return;
 setTimeout(enhanceModal,40);
},true);

/* ---------- SOPA DE LETRAS: 13x13, palabras en varias direcciones ---------- */
const wsGrid=[
'QZPARAMOXKJLU','BANDESNTRPQLV','WQHCAFEYJSDTR','RZKLVUCAUCAPMN','TCLIMAXQWERTYU','UQSNFJHPLKDMA','RISMOTURISMOQE','BXAQWPLDZNKCF','ANDESEFGHJKRT','CPOIUYTRDLMNB','IURBANIZACIONQ','OLKJHGFDSAMWE','TRESQAZWSXEDCR'
];
const wsWords=['PARAMO','ANDES','CAFE','CAUCA','CLIMA','TURISMO','TRES','URBANIZACION'];
function wsPos(word){const dirs=[[0,1],[1,0],[1,1],[1,-1],[-1,1],[-1,-1],[0,-1],[-1,0]];for(let r=0;r<13;r++)for(let c=0;c<13;c++)for(const [dr,dc] of dirs){let ok=true,arr=[];for(let i=0;i<word.length;i++){const rr=r+dr*i,cc=c+dc*i;if(rr<0||rr>=13||cc<0||cc>=13||wsGrid[rr][cc]!==word[i]){ok=false;break}arr.push([rr,cc])}if(ok)return arr}return[]}
function startWS(){
 const arena=$('#gameArena');if(!arena)return;arena.hidden=false;arena.dataset.game='wordsearch';arena.innerHTML=`<div class="game-question"><span class="eyebrow">RETO 04 · SOPA DE LETRAS</span><h3>Encuentra las 8 palabras</h3><p>Las palabras aparecen en horizontal, vertical y diagonal. Haz clic en la primera y última letra de cada palabra.</p><div class="game-help">💡 También puedes usar <b>Revelar una palabra</b> para comprobar que la cuadrícula funciona.</div><div class="ws-words">${wsWords.map(w=>`<span data-word="${w}">${w}</span>`).join('')}</div><div class="ws-grid" id="wsGrid"></div><div class="game-actions"><button class="game-primary" id="wsReveal">🔎 Revelar una palabra</button><button class="game-secondary" id="wsReset">↻ Reiniciar</button></div><p id="wsStatus"></p></div><button class="btn ghost" id="closeGame">Cerrar actividad</button>`;
 const grid=$('#wsGrid');wsGrid.forEach((row,r)=>[...row].forEach((ch,c)=>{const b=document.createElement('button');b.className='ws-cell';b.textContent=ch;b.dataset.r=r;b.dataset.c=c;grid.appendChild(b)}));
 let first=null,found=new Set();
 function mark(word){const cells=wsPos(word);cells.forEach(([r,c])=>{const b=$(`.ws-cell[data-r="${r}"][data-c="${c}"]`,grid);b?.classList.add('found')});$(`.ws-words [data-word="${word}"]`)?.classList.add('done');found.add(word);$('#wsStatus').textContent=`✓ Encontradas: ${found.size}/${wsWords.length}`;if(found.size===wsWords.length)$('#wsStatus').textContent='🎉 ¡Completaste la sopa de letras!';}
 grid.addEventListener('click',e=>{const b=e.target.closest('.ws-cell');if(!b)return;const p=[+b.dataset.r,+b.dataset.c];if(!first){first=p;b.style.outline='3px solid #dced92';return}const [r1,c1]=first,[r2,c2]=p;first=null;grid.querySelectorAll('.ws-cell').forEach(x=>x.style.outline='');const dr=Math.sign(r2-r1),dc=Math.sign(c2-c1),len=Math.max(Math.abs(r2-r1),Math.abs(c2-c1))+1;let letters='';for(let i=0;i<len;i++)letters+=wsGrid[r1+dr*i]?.[c1+dc*i]||'';const rev=letters.split('').reverse().join('');const word=wsWords.find(w=>(w===letters||w===rev)&&!found.has(w));if(word)mark(word);else $('#wsStatus').textContent='Esa selección no forma una palabra de la lista.';});
 on($('#wsReveal'),'click',()=>{const w=wsWords.find(x=>!found.has(x));if(w)mark(w);});on($('#wsReset'),'click',startWS);on($('#closeGame'),'click',()=>{arena.hidden=true;arena.innerHTML=''});
}

/* ---------- CRUCIGRAMA: cuadrícula consistente y realmente cruzada ---------- */
function startCW(){
 const arena=$('#gameArena');if(!arena)return;arena.hidden=false;arena.dataset.game='crossword';arena.innerHTML=`<div class="game-question"><span class="eyebrow">RETO 03 · CRUCIGRAMA</span><h3>Completa las palabras</h3><p>Cada palabra cruza correctamente con otra. Escribe una letra por casilla.</p><div class="cw-grid" id="cwGrid"></div><div class="cw-clues"><div><b>Horizontales</b><p><b>1.</b> Sistema montañoso que atraviesa Colombia.</p><p><b>4.</b> Alimento y bebida emblemática de varias zonas andinas.</p><p><b>6.</b> Río y valle interandino.</p></div><div><b>Verticales</b><p><b>2.</b> Condiciones atmosféricas de un lugar.</p><p><b>3.</b> Sistema montañoso: plural de una cordillera.</p><p><b>5.</b> Río y departamento colombiano asociado a un valle interandino.</p></div></div><div class="game-actions"><button class="game-primary" id="cwCheck">✓ Comprobar</button><button class="game-secondary" id="cwReveal">👁 Mostrar respuestas</button></div><p id="cwStatus"></p></div><button class="btn ghost" id="closeGame">Cerrar actividad</button>`;
 /* Diseño 9x9: ANDES horizontal cruza CAFE vertical; CAUCA horizontal cruza CLIMA vertical. */
 const cells=new Map();const grid=$('#cwGrid');
 const placements=[['ANDES','A',2,1,0],['CAFE','C',0,4,1],['CAUCA','C',6,1,0],['CLIMA','C',2,3,1]];
 // Recalculamos un tablero estándar 9x9 y numeramos las celdas iniciales.
 const board=Array.from({length:9},()=>Array(9).fill(null));
 function put(word,r,c,dr,dc){[...word].forEach((ch,i)=>{const rr=r+dr*i,cc=c+dc*i;if(board[rr][cc]&&board[rr][cc]!==ch)throw Error('cruce inválido');board[rr][cc]=ch})}
 put('ANDES',2,1,0,1);put('CAFE',0,3,1,0);put('CAUCA',6,1,0,1);put('CLIMA',2,3,1,0);
 let n=1;for(let r=0;r<9;r++){const row=document.createElement('div');row.className='cw-row';for(let c=0;c<9;c++){const cell=document.createElement('div');cell.className='cw-cell';if(board[r][c]){const starts=(r===2&&c===1)||(r===0&&c===3)||(r===6&&c===1)||(r===2&&c===3);if(starts){const num=document.createElement('span');num.className='cw-num';num.textContent=n++;cell.appendChild(num)}const input=document.createElement('input');input.maxLength=1;input.dataset.answer=board[r][c];input.setAttribute('aria-label','Casilla del crucigrama');cell.appendChild(input);cells.set(`${r},${c}`,input)}else cell.classList.add('block');row.appendChild(cell)}grid.appendChild(row)}
 function check(reveal){let ok=0,total=0;cells.forEach((input)=>{total++;const val=input.value.toUpperCase();if(reveal){input.value=input.dataset.answer;input.parentElement.classList.add('cw-correct')}else if(val===input.dataset.answer){input.parentElement.classList.add('cw-correct');input.parentElement.classList.remove('cw-wrong');ok++}else{input.parentElement.classList.add('cw-wrong');input.parentElement.classList.remove('cw-correct')}});$('#cwStatus').textContent=reveal?`Respuestas: ANDES · CAFE · CAUCA · CLIMA`:`Correctas: ${ok}/${total} casillas.`}
 on($('#cwCheck'),'click',()=>check(false));on($('#cwReveal'),'click',()=>check(true));on($('#closeGame'),'click',()=>{arena.hidden=true;arena.innerHTML=''});
}

/* ---------- INTERCEPTAR LOS JUEGOS ACTUALES ---------- */
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-game]');if(!b)return;
 e.preventDefault();e.stopImmediatePropagation();
 const game=b.dataset.game;if(game==='wordsearch')startWS();else if(game==='crossword')startCW();
},true);

/* Enlace directo para leer toda la página. */
const nav=document.querySelector('.nav');
if(nav&&!$('#readPage')){const b=document.createElement('button');b.id='readPage';b.className='icon-btn';b.type='button';b.title='Leer esta página en voz alta';b.textContent='🔊';b.addEventListener('click',()=>speaking?stopSpeech():speak(visibleText(document.querySelector('main'))));nav.appendChild(b)}

})();
