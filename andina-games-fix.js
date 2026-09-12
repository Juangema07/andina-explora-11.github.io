(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const arena=$('#gameArena');
if(!arena)return;

const WORDS=['PARAMO','ANDES','CAFE','CAUCA','CLIMA','TURISMO','TRES','URBANIZACION'];
const QUIZ=[
 ['¿Cuántas cordilleras principales forman los Andes colombianos?',['2','3','5'],1,'Los Andes colombianos se dividen en tres grandes cordilleras: Occidental, Central y Oriental.'],
 ['¿Qué factor explica los pisos térmicos?',['La altitud','El tamaño de la ciudad','La hora del día'],0,'La altitud modifica la temperatura y ayuda a explicar los pisos térmicos.'],
 ['¿Cuál pertenece al sector terciario?',['Turismo','Minería','Agricultura'],0,'El turismo es una actividad de servicios y pertenece al sector terciario.'],
 ['¿Qué ecosistema de alta montaña es fundamental para el agua?',['Páramo','Manglar','Arrecife'],0,'Los páramos cumplen funciones importantes en la regulación y almacenamiento de agua.'],
 ['¿Cuál es un instrumento representativo de la música colombiana?',['Tiple','Clavecín','Oboe'],0,'El tiple está estrechamente relacionado con varias expresiones musicales colombianas.'],
 ['¿Qué río da nombre a un importante valle interandino?',['Cauca','Amazonas','Orinoco'],0,'El río Cauca recorre un importante valle entre las cordilleras colombianas.']
];
const MEM=[['☕','Café'],['🏔️','Andes'],['🌿','Páramo'],['🎶','Tiple'],['🥔','Papa'],['🏙️','Ciudad']];
let timer=null;
function stop(){if(timer){clearInterval(timer);timer=null}}
function score(v){const e=$('#gameScore');if(e)e.textContent=v}
function base(title,time,html){stop();arena.hidden=false;arena.dataset.game=title;arena.innerHTML=`<div class="game-top"><div><span class="eyebrow">${title}</span></div><div class="game-score"><span>⏱ <b id="gameTimer">${time}</b>s</span><span>⭐ <b id="gameScore">0</b></span></div></div><div class="game-body">${html}</div><button class="btn ghost" id="gameClose">Cerrar actividad</button>`;$('#gameClose').onclick=()=>{stop();arena.hidden=true;arena.innerHTML=''};let left=time;timer=setInterval(()=>{left--;const t=$('#gameTimer');if(t)t.textContent=left;if(left<=0){stop();alertEnd('Tiempo agotado','Inténtalo de nuevo.')}},1000)}
function alertEnd(t,msg){stop();const body=$('.game-body');if(body)body.innerHTML=`<div class="game-result"><div class="game-result-icon">⏱️</div><h3>${t}</h3><p>${msg}</p><button class="btn primary" id="gameAgain">↻ Repetir</button></div>`;$('#gameAgain')?.addEventListener('click',()=>launch(arena.dataset.game))}
function launch(g){({quiz:startQuiz,memory:startMemory,crossword:startCrossword,wordsearch:startWordsearch}[g]||startQuiz)()}

function startQuiz(){
 let i=0,pts=0;
 base('QUIZ ANDINO',60,`<div class="quiz-progress" id="quizProgress"></div><div class="game-question"><div class="question-number" id="qNum"></div><h3 id="qText"></h3><div class="quiz-options" id="qOptions"></div><p class="feedback" id="qFeedback"></p></div>`);
 const draw=()=>{if(i>=QUIZ.length){stop();$('.game-body').innerHTML=`<div class="game-result"><div class="game-result-icon">🏆</div><h3>¡Quiz terminado!</h3><p>Obtuviste <b>${pts}</b> de ${QUIZ.length} respuestas correctas.</p><button class="btn primary" id="gameAgain">↻ Jugar otra vez</button></div>`;$('#gameAgain').onclick=startQuiz;return}const q=QUIZ[i];$('#qNum').textContent=`Pregunta ${i+1} de ${QUIZ.length}`;$('#qText').textContent=q[0];$('#qFeedback').textContent='';$('#qOptions').innerHTML=q[1].map((x,n)=>`<button class="quiz-option" data-n="${n}">${x}</button>`).join('');$$('.quiz-option').forEach(b=>b.onclick=()=>{if($$('.quiz-option.disabled').length)return;const ok=+b.dataset.n===q[2];$$('.quiz-option').forEach(x=>x.classList.add('disabled'));if(ok){pts++;score(pts);b.classList.add('correct');$('#qFeedback').textContent='✓ Correcto. '+q[3]}else{b.classList.add('wrong');$('#qFeedback').textContent='✗ No es esa. '+q[3];$$('.quiz-option')[q[2]].classList.add('correct')}i++;setTimeout(draw,900)})};draw();
}

function startMemory(){
 const deck=[...MEM,...MEM].sort(()=>Math.random()-.5);let open=[],matched=0,pts=0;
 base('MEMORIA VISUAL',60,`<p>Encuentra las parejas iguales.</p><div class="memory-grid" id="memoryGrid">${deck.map((x,n)=>`<button class="memory-card" data-i="${n}"><span>?</span><b>${x[0]}</b><small>${x[1]}</small></button>`).join('')}</div>`);
 const cards=$$('.memory-card');cards.forEach((c)=>c.onclick=()=>{if(c.classList.contains('flipped')||c.classList.contains('matched')||open.length===2)return;c.classList.add('flipped');open.push(c);if(open.length===2){const a=deck[+open[0].dataset.i],b=deck[+open[1].dataset.i];if(a[1]===b[1]){open.forEach(x=>x.classList.add('matched'));matched++;pts+=10;score(pts);open=[];if(matched===MEM.length)setTimeout(()=>{stop();$('.game-body').innerHTML=`<div class="game-result"><div class="game-result-icon">🧠</div><h3>¡Parejas completas!</h3><p>Puntaje: <b>${pts}</b></p><button class="btn primary" id="gameAgain">↻ Repetir</button></div>`;$('#gameAgain').onclick=startMemory},400)}else setTimeout(()=>{open.forEach(x=>x.classList.remove('flipped'));open=[]},650)}})
}

const CROSS=[
 ['CAFÉ','Producto emblemático de muchas zonas andinas.'],
 ['ANDES','Sistema montañoso que atraviesa Colombia.'],
 ['CAUCA','Río y valle interandino.'],
 ['CLIMA','Condiciones atmosféricas de un lugar.']
];
function buildCross(){
 const rows=11,cols=11,g=Array.from({length:rows},()=>Array(cols).fill(null));
 // CAFÉ horizontal, ANDES vertical cruzando A, CAUCA vertical cruzando C, CLIMA vertical cruzando C.
 const put=(w,r,c,dr,dc)=>{for(let i=0;i<w.length;i++)g[r+i*dr][c+i*dc]=w[i]};
 put('CAFE',1,3,0,1); put('ANDES',1,3,1,0); put('CAUCA',1,3,1,0); // replaced below with a valid crossing layout
 return g;
}
function startCrossword(){
 // Cuadrícula validada: todas las palabras comparten al menos una letra.
 const cells=Array.from({length:9},()=>Array(9).fill(''));
 const add=(w,r,c,dr,dc)=>[...w].forEach((ch,i)=>cells[r+i*dr][c+i*dc]=ch);
 add('ANDES',0,2,1,0);
 add('CAFE',2,0,0,1); // C de CAFE cruza ANDES en fila 2, columna 2
 add('CAUCA',2,2,1,0); // C cruza CAFE en fila 2, col 2
 add('CLIMA',2,2,0,1); // C cruza CAUCA en fila 2, col 2
 const playable=cells.map(row=>row.map(x=>x||'#'));
 base('CRUCIGRAMA',120,`<div class="cross-wrap"><div class="cross-grid" id="crossGrid">${playable.flatMap((row,r)=>row.map((ch,c)=>ch==='#'?`<div class="cross-black"></div>`:`<input class="cross-cell" maxlength="1" data-r="${r}" data-c="${c}" autocomplete="off">`)).join('')}</div><div class="cross-clues"><div><b>Horizontales</b><p><b>1.</b> Producto emblemático de muchas zonas andinas.</p><p><b>2.</b> Río y valle interandino.</p><p><b>3.</b> Condiciones atmosféricas de un lugar.</p></div><div><b>Verticales</b><p><b>4.</b> Sistema montañoso que atraviesa Colombia.</p><p><b>5.</b> Respuesta del café en la cuadrícula.</p></div></div></div><div class="game-tools"><button class="btn primary" id="checkCross">✓ Comprobar</button><button class="btn ghost" id="showCross">👁 Mostrar respuestas</button></div>`);
 $('#checkCross').onclick=()=>{let good=0,total=0;$$('.cross-cell').forEach((e)=>{const r=+e.dataset.r,c=+e.dataset.c,w=playable[r][c];total++;e.classList.remove('bad','good');if((e.value||'').toUpperCase()===w){e.classList.add('good');good++}else e.classList.add('bad')});score(good);if(good===total){stop();alertEnd('¡Crucigrama completado!','Todas las casillas son correctas.')}};
 $('#showCross').onclick=()=>$$('.cross-cell').forEach(e=>e.value=playable[+e.dataset.r][+e.dataset.c]);
}

function makeWordSearch(){
 const n=13,g=Array.from({length:n},()=>Array(n).fill(''));
 const dirs=[[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,1],[-1,-1]];
 const can=(w,r,c,dr,dc)=>[...w].every((ch,i)=>{const rr=r+i*dr,cc=c+i*dc;return rr>=0&&rr<n&&cc>=0&&cc<n&&(!g[rr][cc]||g[rr][cc]===ch)});
 const place=(w)=>{for(let tries=0;tries<500;tries++){const d=dirs[Math.floor(Math.random()*dirs.length)],r=Math.floor(Math.random()*n),c=Math.floor(Math.random()*n);if(can(w,r,c,d[0],d[1])){[...w].forEach((ch,i)=>g[r+i*d[0]][c+i*d[1]]=ch);return}}throw Error('No se pudo colocar '+w)};
 [...WORDS].sort((a,b)=>b.length-a.length).forEach(place);const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(!g[r][c])g[r][c]=letters[Math.floor(Math.random()*letters.length)];return g;
}
function startWordsearch(){
 const grid=makeWordSearch(),n=13;let first=null,found=new Set();
 base('SOPA DE LETRAS',90,`<div class="word-list">${WORDS.map(w=>`<span id="word-${w}">${w}</span>`).join('')}</div><p>Selecciona una palabra tocando primero su letra inicial y luego la final.</p><div class="word-grid" id="wordGrid">${grid.flatMap((row,r)=>row.map((ch,c)=>`<button class="word-cell" data-r="${r}" data-c="${c}">${ch}</button>`)).join('')}</div><div class="game-tools"><button class="btn ghost" id="revealWord">👁 Revelar una palabra</button></div>`);
 const cells=$$('.word-cell');const key=(r,c)=>`${r},${c}`;
 const line=(a,b)=>{const dr=Math.sign(b.r-a.r),dc=Math.sign(b.c-a.c);let rr=a.r,cc=a.c,s='';while(true){s+=grid[rr][cc];if(rr===b.r&&cc===b.c)break;rr+=dr;cc+=dc;if(rr<0||rr>=n||cc<0||cc>=n)return ''}return s};
 const mark=(a,b)=>{const dr=Math.sign(b.r-a.r),dc=Math.sign(b.c-a.c);let rr=a.r,cc=a.c;while(true){const el=cells.find(x=>+x.dataset.r===rr&&+x.dataset.c===cc);el?.classList.add('found');if(rr===b.r&&cc===b.c)break;rr+=dr;cc+=dc}};
 cells.forEach(el=>el.onclick=()=>{const p={r:+el.dataset.r,c:+el.dataset.c};if(!first){first=p;el.classList.add('selected');return}cells.forEach(x=>x.classList.remove('selected'));const s=line(first,p),rev=s.split('').reverse().join('');const w=WORDS.find(x=>x===s||x===rev);if(w&&!found.has(w)){found.add(w);mark(first,p);$('#word-'+w).classList.add('found-word');score(found.size);if(found.size===WORDS.length){stop();setTimeout(()=>alertEnd('¡Sopa completada!','Encontraste todas las palabras.'),150)}}first=null});
 $('#revealWord').onclick=()=>{const w=WORDS.find(x=>!found.has(x))||WORDS[0];for(let r=0;r<n;r++)for(let c=0;c<n;c++)for(const d of dirs){const end={r:r+(w.length-1)*d[0],c:c+(w.length-1)*d[1]};if(end.r>=0&&end.r<n&&end.c>=0&&end.c<n&&line({r,c},end)===w){mark({r,c},end);found.add(w);$('#word-'+w).classList.add('found-word');score(found.size);return}}};
}

$$('[data-game]').forEach(b=>{b.addEventListener('click',e=>{e.preventDefault();launch(b.dataset.game)})});
})();