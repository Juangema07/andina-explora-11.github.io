(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const on=(el,ev,fn)=>el&&el.addEventListener(ev,fn);
const safe=(fn)=>{try{fn()}catch(err){console.error('Andina Explora:',err)}};

// ---------- ARRANQUE ----------
const release=()=>document.body.classList.add('loaded');
on(window,'load',()=>setTimeout(release,350));
on(document,'DOMContentLoaded',()=>setTimeout(release,120));

// ---------- MODALES DE CONTENIDO ----------
const details={
 ubicacion:['UBICACIÓN','¿Dónde está la Región Andina?','Ocupa gran parte del centro y occidente de Colombia alrededor del sistema de los Andes. Su territorio reúne cordilleras, valles interandinos, altiplanos y laderas.','Ubica en un mapa las tres cordilleras y relaciona cada paisaje con su población y actividades.'],
 relieve:['RELIEVE','Tres cordilleras y muchos paisajes','Los Andes colombianos se organizan principalmente en las cordilleras Occidental, Central y Oriental. Entre ellas aparecen valles, cañones, mesetas y altiplanos.','El relieve influye en clima, transporte, asentamientos, agricultura y biodiversidad.'],
 agua:['HIDROGRAFÍA','Ríos que conectan territorios','Los valles de los ríos Magdalena y Cauca son elementos destacados del paisaje andino. Las cuencas conectan ecosistemas, población y actividades productivas.','Piensa cómo una decisión tomada en la parte alta de una cuenca puede afectar a comunidades aguas abajo.'],
 biodiversidad:['BIODIVERSIDAD','Páramos, bosques y especies','La variedad de alturas crea numerosos ambientes. Páramos y bosques de montaña albergan especies adaptadas a condiciones diferentes.','Relaciona cada ecosistema con una especie, un servicio ambiental y una amenaza.'],
 poblacion:['POBLACIÓN','Una región densamente habitada','La población se concentra en grandes ciudades, corredores urbanos, valles y zonas rurales productivas. Las cifras cambian según el año y la delimitación utilizada.','Para una cifra exacta, consulta el DANE y registra siempre el año y la fuente.'],
 ciudades:['CIUDADES','Una red urbana conectada','Bogotá, Medellín, Cali, Bucaramanga, Manizales, Pereira, Armenia y Popayán son ciudades destacadas del espacio andino o de su área de influencia.','Observa cómo las ciudades conectan empleo, educación, comercio, transporte y servicios con municipios cercanos.'],
 diversidad:['DIVERSIDAD CULTURAL','Muchas identidades, un territorio','La diversidad se expresa en gastronomía, música, fiestas, artesanías, formas de trabajo, memoria y tradiciones locales.','No existe una única cultura andina: las expresiones cambian entre comunidades y territorios.'],
 urbanizacion:['URBANIZACIÓN','Ciudad y campo en movimiento','El crecimiento urbano transforma vivienda, movilidad, uso del suelo y relaciones entre ciudad y campo.','La planificación debe equilibrar crecimiento, servicios, ambiente y calidad de vida.'],
 retosocial:['RETOS SOCIALES','Desigualdad y oportunidades','Existen diferencias territoriales en ingresos, conectividad, servicios, educación y empleo.','Analizar quiénes tienen acceso a qué recursos ayuda a plantear soluciones más justas.'],
 gastronomia:['GASTRONOMÍA','Sabores con territorio','Ajiaco, tamales, arepas y café son ejemplos de preparaciones y productos asociados a distintos territorios andinos.','La cocina cambia según departamento, comunidad, ingredientes, clima y tradición.'],
 musica:['MÚSICA','Ritmos y memoria','El tiple, el bambuco y otras expresiones musicales forman parte del patrimonio sonoro colombiano.','La música puede estudiarse como identidad, memoria, celebración y transmisión de conocimientos.'],
 artesanias:['ARTESANÍAS','Oficios que cuentan historias','Tejidos, cerámica, madera y otros oficios conservan materiales, técnicas y conocimientos transmitidos entre generaciones.','Valorar una artesanía también significa reconocer a sus creadores y comunidades.'],
 fiestas:['FIESTAS','Territorio en celebración','Las fiestas reúnen música, gastronomía, símbolos, historia y participación comunitaria.','Cada celebración tiene un contexto propio y expresa identidades locales.'],
 aguaReto:['DESAFÍO 01','Presión sobre el agua','La contaminación, transformación de ecosistemas y cambios en disponibilidad pueden afectar fuentes y usuarios.','Proteger cuencas, reducir contaminación, mejorar tratamiento y fortalecer la gestión comunitaria son posibles respuestas.'],
 deforestacion:['DESAFÍO 02','Pérdida de ecosistemas','La transformación del suelo y expansión de actividades productivas pueden reducir bosques y hábitats.','La restauración, protección de áreas estratégicas y producción compatible con conservación pueden ayudar.'],
 desigualdad:['DESAFÍO 03','Desigualdad territorial','No todos los municipios tienen las mismas oportunidades de conectividad, empleo, educación o servicios.','La inversión focalizada, planificación territorial y fortalecimiento de oportunidades locales son alternativas.']
};
const modal=$('#modal'),mEye=$('#modalEyebrow'),mTitle=$('#modalTitle'),mBody=$('#modalBody');
function openDetail(k){const d=details[k];if(!d||!modal)return;mEye.textContent=d[0];mTitle.textContent=d[1];mBody.innerHTML=`<p>${d[2]}</p><div class="highlight"><b>Para analizar</b><p>${d[3]}</p></div>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');}
function closeModal(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');}
on($('#modalClose'),'click',closeModal);on($('.backdrop'),'click',closeModal);on(document,'keydown',e=>{if(e.key==='Escape')closeModal()});
$$('[data-detail]').forEach(b=>on(b,'click',()=>openDetail(b.dataset.detail)));

// ---------- GEOGRAFÍA FÍSICA ----------
const altitude={
 calido:{name:'Cálido',height:'0–1.000 m aprox.',temp:'Temperaturas generalmente altas.',eco:'Valles y laderas cálidas',jobs:'Caña, frutas, café en zonas adecuadas y ganadería',chips:['Cultivos tropicales','Ganadería','Laderas']},
 templado:{name:'Templado',height:'1.000–2.000 m aprox.',temp:'Temperaturas moderadas.',eco:'Montaña verde y bosques',jobs:'Café, frutas, agricultura y turismo',chips:['Café','Frutales','Turismo']},
 frio:{name:'Frío',height:'2.000–3.000 m aprox.',temp:'Temperaturas más bajas.',eco:'Altiplanos y montaña fría',jobs:'Papa, hortalizas, flores y actividades urbanas',chips:['Papa','Hortalizas','Flores']},
 paramo:{name:'Páramo',height:'Alta montaña',temp:'Frío, con condiciones cambiantes.',eco:'Páramo y frailejones',jobs:'Conservación, investigación y actividades compatibles con el ecosistema',chips:['Frailejones','Agua','Biodiversidad']}
};
function renderAltitude(k){const d=altitude[k];if(!d)return;$$('[data-alt]').forEach(x=>x.classList.toggle('active',x.dataset.alt===k));const v=$('#altitudeView');if(v)v.innerHTML=`<div class="altitude-visual"><div class="altitude-symbol">${k==='paramo'?'🌿':k==='frio'?'🏔️':k==='templado'?'🌱':'☕'}</div></div><div class="altitude-content"><div class="big">${d.height}</div><h4>${d.name}</h4><p><b>Clima:</b> ${d.temp}</p><p><b>Paisaje:</b> ${d.eco}</p><p><b>Vida y economía:</b> ${d.jobs}.</p><div class="altitude-chips">${d.chips.map(x=>`<span>${x}</span>`).join('')}</div></div>`;const f=$('#physicalFacts');if(f)f.innerHTML=`<article><span>🌡️</span><b>${d.name}: clima</b><p>${d.temp}</p></article><article><span>🌿</span><b>Ecosistema</b><p>${d.eco}. La vegetación cambia con la altura.</p></article><article><span>🧑🏽‍🌾</span><b>Actividad humana</b><p>${d.jobs}.</p></article>`;}
$$('[data-alt]').forEach(b=>on(b,'click',()=>renderAltitude(b.dataset.alt)));renderAltitude('calido');

const econ={
 primario:['01','SECTOR PRIMARIO','Campo, recursos y producción','Agricultura, ganadería y minería aprovechan condiciones naturales del territorio. El café es emblemático de varias zonas andinas.',['☕ Café','🌱 Agricultura','🐄 Ganadería','⛏️ Minería']],
 secundario:['02','SECTOR SECUNDARIO','Transformar materias y crear bienes','La industria transforma alimentos y materias primas y se relaciona con ciudades, energía, mano de obra, infraestructura y mercados.',['🏭 Industria','🥫 Alimentos','⚙️ Manufactura','📦 Transformación']],
 terciario:['03','SECTOR TERCIARIO','Servicios, comercio y turismo','Comercio, transporte, educación, salud, tecnología y turismo conectan personas y territorios.',['🛒 Comercio','🚍 Transporte','🎓 Educación','🏞️ Turismo']]
};
function renderEcon(k){const d=econ[k];if(!d)return;$$('[data-econ]').forEach(x=>x.classList.toggle('active',x.dataset.econ===k));const v=$('#econView');if(v)v.innerHTML=`<div class="econ-number">${d[0]}</div><div><span class="eyebrow">${d[1]}</span><h3>${d[2]}</h3><p>${d[3]}</p><div class="chips">${d[4].map(x=>`<span>${x}</span>`).join('')}</div></div>`;}
$$('[data-econ]').forEach(b=>on(b,'click',()=>renderEcon(b.dataset.econ)));renderEcon('primario');

// ---------- NAVEGACIÓN Y AJUSTES ----------
const sections=$$('#navLinks a').map(a=>$(a.getAttribute('href'))).filter(Boolean),links=$$('#navLinks a');
if('IntersectionObserver' in window)sections.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}),{rootMargin:'-35% 0px -55%'}).observe(s));
const settings=$('#settings');
on($('#settingsBtn'),'click',()=>{settings?.classList.toggle('open');settings?.setAttribute('aria-hidden',settings.classList.contains('open')?'false':'true')});
on($('#closeSettings'),'click',()=>{settings?.classList.remove('open');settings?.setAttribute('aria-hidden','true')});
const savedTheme=localStorage.getItem('andina-theme');if(savedTheme&&$('#theme'))$('#theme').value=savedTheme;
const savedFont=localStorage.getItem('andina-font');if(savedFont&&$('#fontSize')){$('#fontSize').value=savedFont;document.documentElement.style.fontSize=savedFont+'%'}
if($('#theme'))on($('#theme'),'change',e=>{document.documentElement.dataset.theme=e.target.value;localStorage.setItem('andina-theme',e.target.value)});
if($('#fontSize'))on($('#fontSize'),'input',e=>{document.documentElement.style.fontSize=e.target.value+'%';localStorage.setItem('andina-font',e.target.value)});
if($('#reduceMotion'))on($('#reduceMotion'),'change',e=>document.body.classList.toggle('reduce-motion',e.target.checked));

// ---------- MÚSICA ----------
const audio=$('#audio'),track=$('#track');
function addTrack(name,src){if(!track)return;const o=document.createElement('option');o.value=src;o.textContent=name;track.appendChild(o)}
async function music(){try{const r=await fetch('music/music.json',{cache:'no-store'});if(!r.ok)throw Error('music.json');const j=await r.json();(j.tracks||[]).forEach(t=>addTrack(t.title||'Pista',t.src));}catch(e){console.info('Música predeterminada no disponible; puedes añadir MP3 desde Ajustes.')}}
music();
on(track,'change',()=>{if(audio){audio.src=track.value;audio.load()}});
on($('#play'),'click',()=>{if(!audio)return;if(!audio.src&&track?.options.length>1){track.selectedIndex=1;track.dispatchEvent(new Event('change'))}if(audio.src){audio.paused?audio.play().catch(()=>{}):audio.pause()}});
on(audio,'play',()=>{if($('#play'))$('#play').textContent='⏸'});on(audio,'pause',()=>{if($('#play'))$('#play').textContent='▶'});
on($('#loop'),'click',()=>{if(audio)audio.loop=!audio.loop});on($('#volume'),'input',e=>{if(audio)audio.volume=+e.target.value});
on($('#musicFiles'),'change',e=>[...e.target.files].forEach(f=>addTrack(f.name,URL.createObjectURL(f))));

// ---------- REFLEXIÓN: GUARDA DE VERDAD ----------
const reflection=$('#reflection'),reflectionSaved=$('#reflectionSaved');if(reflection){const old=localStorage.getItem('andina-reflection');if(old)reflection.value=old}
on($('#saveReflection'),'click',()=>{const value=reflection?.value.trim()||'';if(value){localStorage.setItem('andina-reflection',value);if(reflectionSaved)reflectionSaved.textContent='✓ Propuesta guardada en este dispositivo.'}else if(reflectionSaved)reflectionSaved.textContent='Escribe primero una propuesta.'});

// ---------- MOTOR DE JUEGOS ----------
const arena=$('#gameArena');let timerId=null;
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
function shell(title,time,body){if(!arena)return;stopTimer();arena.hidden=false;arena.innerHTML=`<div class="game-top"><div><span class="eyebrow">${title}</span></div><div class="game-score"><span>⏱ <b id="timer">${time}</b>s</span><span>⭐ <b id="score">0</b></span></div></div>${body}<button class="btn ghost" id="closeGame">Cerrar actividad</button>`;on($('#closeGame'),'click',()=>{stopTimer();arena.hidden=true;arena.innerHTML='' });let left=time;timerId=setInterval(()=>{left--;const t=$('#timer');if(t)t.textContent=left;if(left<=0){stopTimer();finish('Tiempo agotado','Se acabó el tiempo. ¡Puedes intentarlo otra vez!')}},1000)}
function setScore(v){const s=$('#score');if(s)s.textContent=v}
function finish(title,text){stopTimer();if(!arena)return;arena.querySelector('.game-question')?.remove();const box=document.createElement('div');box.className='game-question';box.innerHTML=`<h3>${title}</h3><p>${text}</p><button class="btn primary" id="repeatGame">↻ Repetir actividad</button>`;arena.prepend(box);on($('#repeatGame'),'click',()=>{const current=arena.dataset.game;({quiz:startQuiz,memory:startMemory,crossword:startCrossword,wordsearch:startWordsearch}[current]||startQuiz)()})}

// QUIZ
const quiz=[
 ['¿Cuántas cordilleras principales forman los Andes colombianos?',['2','3','5'],1,'⛰️','Se reconocen tres grandes cordilleras: Occidental, Central y Oriental.'],
 ['¿Qué factor explica principalmente los pisos térmicos?',['La altitud','Solo la hora','El tamaño de la ciudad'],0,'🌡️','La altura sobre el nivel del mar modifica la temperatura.'],
 ['¿Cuál pertenece al sector terciario?',['Turismo','Minería','Agricultura'],0,'🏞️','Turismo y otros servicios pertenecen al sector terciario.'],
 ['¿Qué ecosistema de alta montaña es clave para la regulación hídrica?',['Páramo','Manglar','Arrecife'],0,'🌿','Los páramos son ecosistemas de alta montaña fundamentales para el agua.'],
 ['¿Cuál es un instrumento emblemático de la música colombiana?',['Tiple','Oboe','Clavecín'],0,'🎶','El tiple es un instrumento representativo de diversas músicas colombianas.'],
 ['¿Qué río forma un importante valle interandino?',['Cauca','Amazonas','Orinoco'],0,'💧','El río Cauca atraviesa un importante valle entre cordilleras andinas.']
];
function startQuiz(){arena.dataset.game='quiz';let i=0,score=0;shell('QUIZ ANDINO',75,'<div class="game-question" id="qbox"></div>');const render=()=>{if(i>=quiz.length){finish('🎉 ¡Reto completado!',`Puntaje final: ${score}/${quiz.length}. ${score>=5?'Excelente dominio de la Región Andina.':'Buen trabajo: revisa las explicaciones y vuelve a intentarlo.'}`);return}const q=quiz[i];$('#qbox').innerHTML=`<div style="font-size:2.2rem">${q[3]}</div><p>Pregunta ${i+1} de ${quiz.length}</p><h3>${q[0]}</h3><div class="quiz-options">${q[1].map((x,k)=>`<button data-q="${k}">${x}</button>`).join('')}</div><div id="feedback"></div>`;$$('[data-q]').forEach(b=>on(b,'click',()=>{const ok=+b.dataset.q===q[2];if(ok)score++;setScore(score);$$('[data-q]').forEach(x=>x.disabled=true);$('#feedback').innerHTML=`<div class="feedback"><b>${ok?'✓ Correcto':'✗ No era esa'}</b><br>${q[4]}</div><button class="btn primary next" id="next">${i===quiz.length-1?'Ver resultado':'Siguiente →'}</button>`;on($('#next'),'click',()=>{i++;render()})}))};render()}

// MEMORIA
function startMemory(){arena.dataset.game='memory';const pairs=[['☕','Café'],['🌿','Páramo'],['⛰️','Cordillera'],['🎶','Tiple'],['🏙️','Ciudad'],['🥔','Papa'],['💧','Cauca'],['🏞️','Turismo']];const deck=pairs.flatMap((p,i)=>[{v:p[0],id:i},{v:p[1],id:i}]).sort(()=>Math.random()-.5);let first=null,lock=false,found=0,score=0;shell('MEMORIA VISUAL',90,`<p>Encuentra cada pareja: símbolo + concepto relacionado con la Región Andina.</p><div class="memory-board">${deck.map((x,i)=>`<button class="memory-card" data-i="${i}" aria-label="Carta oculta">?</button>`).join('')}</div>`);$$('.memory-card').forEach((b,i)=>on(b,'click',()=>{if(lock||b.classList.contains('matched')||b.classList.contains('flipped'))return;b.textContent=deck[i].v;b.classList.add('flipped');if(first===null){first=i;return}if(deck[first].id===deck[i].id){b.classList.add('matched');$$('.memory-card')[first].classList.add('matched');first=null;found++;score+=100;setScore(score);if(found===pairs.length)finish('🧠 ¡Memoria completa!',`Puntaje: ${score}. Encontraste todas las parejas.`)}else{lock=true;const a=first,c=i;setTimeout(()=>{$$('.memory-card')[a].textContent='?';$$('.memory-card')[c].textContent='?';$$('.memory-card')[a].classList.remove('flipped');$$('.memory-card')[c].classList.remove('flipped');first=null;lock=false},700)}}))}

// CRUCIGRAMA REAL 11x11
const crosswordRows=['###########','###CAFE####','###A#######','###U#######','###C#######','##ANDES####','###C#######','###L#######','###I#######','###M#######','###A#######'];
const crosswordClues=[['1','Horizontal','CAFE','Bebida y producto emblemático de varias zonas andinas.'],['2','Horizontal','ANDES','Sistema montañoso al que pertenece la región.'],['3','Vertical','CAUCA','Río y valle interandino.'],['4','Vertical','CLIMA','Condiciones atmosféricas de un lugar.']];
function startCrossword(){arena.dataset.game='crossword';let score=0;shell('CRUCIGRAMA ANDINO',150,'<div class="cross-layout"><div><p>Completa las palabras. Puedes escribir en mayúsculas o minúsculas y luego comprobar.</p><div class="cross-board" id="crossBoard"></div></div><div class="cross-clues"><h4>PISTAS</h4><ol>'+crosswordClues.map(c=>`<li><b>${c[0]} · ${c[1]}</b><br>${c[3]} <small>(${c[2].length})</small></li>`).join('')+'</ol><button class="btn primary" id="checkCross">Comprobar</button><div id="crossResult"></div></div></div>');const board=$('#crossBoard');const starts={};
 crosswordClues.forEach(c=>{const word=c[2],dir=c[1]==='Horizontal'?'A':'D';const pos=c[0]==='1'?[1,3]:c[0]==='2'?[5,2]:c[0]==='3'?[1,3]:[5,3];starts[c[0]]={word,dir,r:pos[0],c:pos[1]}});
 crosswordRows.forEach((row,r)=>[...row].forEach((ch,c)=>{const cell=document.createElement('div');cell.className='cross-cell'+(ch==='#'?' block':'');if(ch!=='#'){const input=document.createElement('input');input.maxLength=1;input.autocomplete='off';input.dataset.answer=ch;input.setAttribute('aria-label',`Fila ${r+1}, columna ${c+1}`);on(input,'input',()=>input.value=input.value.replace(/[^a-záéíóúüñ]/gi,'').slice(-1).toUpperCase());cell.appendChild(input);const num=(r===1&&c===3)?'1':(r===5&&c===2)?'2':(r===1&&c===3)?'3':(r===5&&c===3)?'4':'';if(num){const n=document.createElement('span');n.className='num';n.textContent=num;cell.appendChild(n)}}board.appendChild(cell)}));
 on($('#checkCross'),'click',()=>{let correct=0,total=0;$$('.cross-cell input').forEach(i=>{total++;const ok=i.value.toUpperCase()===i.dataset.answer;if(ok){correct++;i.parentElement.classList.add('correct');i.parentElement.classList.remove('wrong')}else{i.parentElement.classList.add('wrong');i.parentElement.classList.remove('correct')}});score=correct*25;setScore(score);const res=$('#crossResult');if(correct===total)finish('🔤 ¡Crucigrama resuelto!',`Puntaje: ${score}. Todas las casillas están correctas.`);else if(res)res.innerHTML=`<p><b>${correct}/${total}</b> casillas correctas. Corrige las marcadas y vuelve a comprobar.</p>`})}

// SOPA DE LETRAS: datos construidos con palabras válidas
const wsRows=['MONTANAPARAM','APARAMOXYZAB','RERANDESLMNO','AQCAFEQRSTUV','MPARQUEWXYZAB','OCAUCAFGHIJKL','KLIMANOPQRSTU','RURBANIZACION','AARTESANIAAAA','CITIPLEBBBBBB','ODIVERSIDADDD','NBOSQUEEEEEEE'];
const wsWords=['PARAMO','ANDES','CAFE','CAUCA','CLIMA','TURISMO','TRES','URBANIZACION'];
function findWord(rows,word){for(let r=0;r<rows.length;r++)for(let c=0;c<rows[r].length;c++)for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;let ok=true,cells=[];for(let i=0;i<word.length;i++){const rr=r+dr*i,cc=c+dc*i;if(rr<0||rr>=rows.length||cc<0||cc>=rows[rr].length||rows[rr][cc]!==word[i]){ok=false;break}cells.push({r:rr,c:cc})}if(ok)return cells}return null}
function startWordsearch(){arena.dataset.game='wordsearch';let score=0,found=new Set(),first=null;shell('SOPA DE LETRAS',110,`<p>Selecciona la primera y última letra de una palabra. Se aceptan líneas horizontales, verticales y diagonales.</p><div class="word-list" id="wordList">${wsWords.map(w=>`<span data-word="${w}">${w}</span>`).join('')}</div><div class="word-grid" id="wordGrid"></div>`);const g=$('#wordGrid');wsRows.forEach((row,r)=>[...row].forEach((ch,c)=>{const b=document.createElement('button');b.className='word-cell';b.textContent=ch;b.dataset.r=r;b.dataset.c=c;g.appendChild(b)}));const cells=$$('.word-cell');const get=(r,c)=>cells.find(x=>+x.dataset.r===r&&+x.dataset.c===c);function path(a,b){const dr=b.r-a.r,dc=b.c-a.c;if(dr!==0&&dc!==0&&Math.abs(dr)!==Math.abs(dc))return[];const n=Math.max(Math.abs(dr),Math.abs(dc))+1;if(n<2)return[];const sr=Math.sign(dr),sc=Math.sign(dc);return Array.from({length:n},(_,i)=>({r:a.r+sr*i,c:a.c+sc*i}))}
cells.forEach(b=>on(b,'click',()=>{const p={r:+b.dataset.r,c:+b.dataset.c};if(!first){first=p;b.classList.add('selected');return}const arr=path(first,p);cells.forEach(x=>x.classList.remove('selected'));const word=arr.map(x=>wsRows[x.r]?.[x.c]||'').join('');const rev=word.split('').reverse().join('');const hit=wsWords.find(w=>!found.has(w)&&(w===word||w===rev));if(hit){found.add(hit);score+=100;setScore(score);arr.forEach(x=>get(x.r,x.c)?.classList.add('found'));$(`[data-word="${hit}"]`)?.classList.add('found');if(found.size===wsWords.length)finish('🔎 ¡Sopa completada!',`Puntaje: ${score}. Encontraste todas las palabras.`)}first=null}))}

$$('[data-game]').forEach(b=>on(b,'click',()=>{const fn={quiz:startQuiz,memory:startMemory,crossword:startCrossword,wordsearch:startWordsearch}[b.dataset.game];safe(()=>fn?.())}));

// ---------- PRODUCTOS DEL GRUPO: BOTONES FUNCIONALES ----------
function mediaUploader(button,kind){on(button,'click',()=>{const input=document.createElement('input');input.type='file';input.accept=kind==='video'?'video/*':kind==='audio'?'audio/*':kind==='image'?'image/*':'.pdf,.ppt,.pptx,.odp';input.onchange=()=>{const file=input.files?.[0];if(!file)return;const card=button.closest('article');if(!card)return;let preview=card.querySelector('.media-preview');if(!preview){preview=document.createElement('div');preview.className='media-preview';card.appendChild(preview)}preview.innerHTML='';if(kind==='video'){const v=document.createElement('video');v.controls=true;v.src=URL.createObjectURL(file);preview.appendChild(v)}else if(kind==='audio'){const a=document.createElement('audio');a.controls=true;a.src=URL.createObjectURL(file);preview.appendChild(a)}else if(kind==='image'){const img=document.createElement('img');img.alt=file.name;img.src=URL.createObjectURL(file);preview.appendChild(img)}else{preview.innerHTML=`<b>✓ Archivo seleccionado</b><p>${file.name}</p><small>El archivo queda disponible en esta sesión del navegador. Para publicarlo para todos, súbelo también al repositorio.</small>`}button.textContent='Cambiar archivo';};input.click()})}
$$('.media-grid .placeholder').forEach((b,i)=>mediaUploader(b,['video','audio','image','file'][i]));

// Animación suave de entrada sin bloquear contenido
$$('.reveal').forEach(el=>el.classList.add('is-ready'));
})();
