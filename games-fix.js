(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const arena = $('#gameArena');
  if (!arena) return;

  let timer = null;
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  const clean = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z]/g,'');
  const shuffle = a => a.map(v => [Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const startClock = seconds => {
    stop(); let left = seconds; const el = $('#timer');
    if (el) el.textContent = left;
    timer = setInterval(() => { left--; const t=$('#timer'); if(t)t.textContent=left; if(left<=0){ stop(); end('Tiempo agotado','Puedes volver a intentarlo.'); } },1000);
  };
  const shell = (title, seconds, body, game) => {
    stop(); arena.hidden=false; arena.dataset.game=game;
    arena.innerHTML = `<div class="game-top"><div><span class="eyebrow">${title}</span></div><div class="game-score"><span>⏱ <b id="timer">${seconds}</b>s</span><span>⭐ <b id="score">0</b></span></div></div>${body}<button class="btn ghost" id="closeFixedGame">Cerrar actividad</button>`;
    $('#closeFixedGame').onclick=()=>{stop();arena.hidden=true;arena.innerHTML='';};
    startClock(seconds);
  };
  const score = n => { const e=$('#score'); if(e)e.textContent=n; };
  const end = (title,text) => { stop(); const game=arena.dataset.game; arena.innerHTML=`<div class="game-question"><h3>${title}</h3><p>${text}</p><button class="btn primary" id="again">↻ Repetir actividad</button></div>`; $('#again').onclick=({quiz:startQuiz,memory:startMemory,crossword:startCrossword,wordsearch:startWordsearch}[game]||startQuiz); };

  const questions = [
    ['¿Cuántas cordilleras principales forman los Andes colombianos?',['2','3','5'],1,'Se reconocen tres grandes cordilleras: Occidental, Central y Oriental.'],
    ['¿Qué factor explica principalmente los pisos térmicos?',['La altitud','La hora','El tamaño de la ciudad'],0,'La altura sobre el nivel del mar modifica la temperatura.'],
    ['¿Cuál pertenece al sector terciario?',['Turismo','Minería','Agricultura'],0,'El turismo es una actividad del sector terciario.'],
    ['¿Qué ecosistema de alta montaña es clave para la regulación hídrica?',['Páramo','Manglar','Arrecife'],0,'Los páramos son ecosistemas de alta montaña fundamentales para el agua.'],
    ['¿Cuál es un instrumento representativo de la música colombiana?',['Tiple','Oboe','Clavecín'],0,'El tiple es representativo de diversas músicas colombianas.'],
    ['¿Qué río forma un importante valle interandino?',['Cauca','Amazonas','Orinoco'],0,'El río Cauca recorre un importante valle entre cordilleras.']
  ];
  function startQuiz(){
    let i=0, points=0;
    shell('RETO 01 · QUIZ ANDINO',60,`<div class="game-question"><div class="game-progress" id="qProgress"></div><h3 id="qText"></h3><div id="qOptions" class="game-options"></div><p id="qFeedback" aria-live="polite"></p></div>`,'quiz');
    const render=()=>{ const q=questions[i]; $('#qProgress').textContent=`Pregunta ${i+1} de ${questions.length}`; $('#qText').textContent=q[0]; $('#qFeedback').textContent=''; const box=$('#qOptions'); box.innerHTML=''; q[1].forEach((ans,n)=>{const b=document.createElement('button');b.className='game-option';b.textContent=ans;b.onclick=()=>{ $$('#qOptions button').forEach(x=>x.disabled=true); if(n===q[2]){points+=10;score(points);$('#qFeedback').textContent='✓ Correcto. '+q[3];}else{$('#qFeedback').textContent='✗ Aún no. '+q[3];} setTimeout(()=>{i++; i<questions.length?render():end('¡Quiz completado!',`Puntaje final: ${points}/${questions.length*10}.`);},650);};box.appendChild(b);}); };
    render();
  }

  function startMemory(){
    const pairs=[['☕','Café'],['🌿','Páramo'],['🏔️','Cordillera'],['🎶','Tiple'],['🥔','Papa'],['🏙️','Ciudad']];
    let cards=shuffle(pairs.flatMap((p,i)=>[{id:i,text:p[0]},{id:i,text:p[1]}])); let first=null, lock=false, found=0, points=0;
    shell('RETO 02 · MEMORIA VISUAL',60,`<div class="memory-grid" id="memoryGrid"></div><p id="memoryHint">Encuentra las 6 parejas.</p>`,'memory');
    const grid=$('#memoryGrid'); cards.forEach((c,i)=>{const b=document.createElement('button');b.className='memory-card';b.dataset.id=c.id;b.dataset.i=i;b.innerHTML='<span>?</span>';b.onclick=()=>{if(lock||b.classList.contains('matched')||b===first)return; b.classList.add('flipped');b.innerHTML='<span>'+c.text+'</span>';if(!first){first=b;return;}lock=true;const ok=first.dataset.id===b.dataset.id;setTimeout(()=>{if(ok){first.classList.add('matched');b.classList.add('matched');found++;points+=10;score(points);if(found===pairs.length)end('¡Memoria completada!',`Encontraste todas las parejas. Puntaje: ${points}.`);}else{first.classList.remove('flipped');b.classList.remove('flipped');first.innerHTML='<span>?</span>';b.innerHTML='<span>?</span>';}first=null;lock=false;},500)};grid.appendChild(b);});
  }

  const crossword = [
    {n:1,word:'CAFE',dir:'across',r:0,c:0,clue:'Producto emblemático de muchas zonas andinas.'},
    {n:2,word:'PARAMO',dir:'down',r:0,c:2,clue:'Ecosistema de alta montaña.'},
    {n:3,word:'CAUCA',dir:'down',r:0,c:0,clue:'Río y valle interandino.'},
    {n:4,word:'TIPLE',dir:'across',r:3,c:0,clue:'Instrumento musical colombiano.'},
    {n:5,word:'PAPA',dir:'across',r:5,c:1,clue:'Cultivo importante de zonas frías.'}
  ];
  function startCrossword(){
    const size=7, cells=Array.from({length:size},()=>Array(size).fill(null));
    crossword.forEach(w=>[...w.word].forEach((ch,k)=>{const r=w.r+(w.dir==='down'?k:0),c=w.c+(w.dir==='across'?k:0);if(r<size&&c<size){cells[r][c]=cells[r][c]||{letters:[],nums:[]};cells[r][c].letters.push(ch);cells[r][c].nums.push(w.n);}}));
    let body=`<div class="crossword-layout"><div><div class="crossword-grid" id="cwGrid">`;
    for(let r=0;r<size;r++)for(let c=0;c<size;c++){const cell=cells[r][c]; if(!cell){body+='<div class="cw-black"></div>';continue;} const num=cell.nums[0];body+=`<div class="cw-cell"><input maxlength="1" data-r="${r}" data-c="${c}" aria-label="Fila ${r+1}, columna ${c+1}">${num?`<small>${num}</small>`:''}</div>`;}
    body+=`</div></div><div class="clues"><h3>Pistas</h3>${crossword.map(w=>`<div class="clue"><b>${w.n}.</b> ${w.clue}</div>`).join('')}<button class="btn primary" id="checkCW">Comprobar</button><p id="cwFeedback"></p></div></div>`;
    shell('RETO 03 · CRUCIGRAMA',120,body,'crossword');
    $('#checkCW').onclick=()=>{let correct=0,total=0;crossword.forEach(w=>[...w.word].forEach((ch,k)=>{const r=w.r+(w.dir==='down'?k:0),c=w.c+(w.dir==='across'?k:0);const inp=$(`.cw-cell input[data-r="${r}"][data-c="${c}"]`);if(inp){total++;inp.value=ch;if(clean(inp.value)===ch)correct++;}}));score(correct*2);$('#cwFeedback').textContent=`✓ Solución: ${correct}/${total} letras colocadas. Revisa las pistas y las palabras cruzadas.`;if(correct===total)end('¡Crucigrama resuelto!','Excelente trabajo.');};
  }

  const words=['ANDES','CAFE','PARAMO','TRES','TIPLE','CAUCA','PAPA','BOGOTA'];
  function startWordsearch(){
    const n=12, grid=Array.from({length:n},()=>Array(n).fill('')); const placed=[];
    const dirs=[[0,1],[1,0],[1,1],[-1,1]];
    words.forEach(word=>{let ok=false;for(let tries=0;tries<300&&!ok;tries++){const d=dirs[Math.floor(Math.random()*dirs.length)],r=Math.floor(Math.random()*n),c=Math.floor(Math.random()*n),er=r+d[0]*(word.length-1),ec=c+d[1]*(word.length-1);if(er<0||er>=n||ec<0||ec>=n)continue;let valid=true;[...word].forEach((ch,k)=>{const x=grid[r+d[0]*k][c+d[1]*k];if(x&&x!==ch)valid=false});if(!valid)continue;[...word].forEach((ch,k)=>grid[r+d[0]*k][c+d[1]*k]=ch);placed.push({word,r,c,dr:d[0],dc:d[1]});ok=true;}});
    for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(!grid[r][c])grid[r][c]=String.fromCharCode(65+Math.floor(Math.random()*26));
    shell('RETO 04 · SOPA DE LETRAS',90,`<div class="wordsearch-wrap"><div class="wordsearch-grid" id="wsGrid"></div><div class="word-list"><h3>Encuentra</h3>${words.map(w=>`<label><input type="checkbox" disabled data-word="${w}"> ${w}</label>`).join('')}</div></div><p id="wsFeedback">Selecciona una palabra haciendo clic en su primera y última letra.</p>`,'wordsearch');
    const gridEl=$('#wsGrid');let start=null,found=new Set();
    grid.forEach((row,r)=>row.forEach((ch,c)=>{const b=document.createElement('button');b.className='ws-cell';b.textContent=ch;b.dataset.r=r;b.dataset.c=c;b.onclick=()=>{if(!start){start=[r,c];b.classList.add('ws-start');return;}const end=[r,c];const hit=placed.find(p=>{const er=p.r+p.dr*(p.word.length-1),ec=p.c+p.dc*(p.word.length-1);return (p.r===start[0]&&p.c===start[1]&&er===end[0]&&ec===end[1])||(p.r===end[0]&&p.c===end[1]&&er===start[0]&&ec===start[1])});$$('.ws-cell').forEach(x=>x.classList.remove('ws-start'));if(hit&&!found.has(hit.word)){found.add(hit.word);for(let k=0;k<hit.word.length;k++){const x=hit.r+hit.dr*k,y=hit.c+hit.dc*k;gridEl.querySelector(`[data-r="${x}"][data-c="${y}"]`)?.classList.add('ws-found');}const cb=$(`input[data-word="${hit.word}"]`);if(cb)cb.checked=true;score(found.size*10);$('#wsFeedback').textContent=`✓ Encontraste ${hit.word}.`;if(found.size===words.length)end('¡Sopa completada!','Encontraste todas las palabras.');}else $('#wsFeedback').textContent='Esa selección no corresponde a una palabra.';start=null;};gridEl.appendChild(b)}));
  }

  // Override the original game buttons so the four activities always use the fixed implementations.
  $$('[data-game]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const g=btn.dataset.game;({quiz:startQuiz,memory:startMemory,crossword:startCrossword,wordsearch:startWordsearch}[g]||startQuiz)();},true));
})();
