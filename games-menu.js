(()=>{
'use strict';
const arena=document.querySelector('#gameArena');
const section=document.querySelector('#juegos');
if(!arena||!section||document.querySelector('#gamesSelector')) return;

const style=document.createElement('style');
style.id='games-selector-style';
style.textContent=`
#gamesSelector{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:22px 0 14px}
.game-select{border:1px solid #b8c7b8;background:#f7f8f2;color:#173e32;border-radius:16px;padding:14px 10px;cursor:pointer;text-align:left;transition:.2s ease;min-height:96px}
.game-select:hover,.game-select:focus{transform:translateY(-3px);box-shadow:0 10px 22px #173e3222;outline:none}
.game-select.active{background:#173e32;color:#fff;border-color:#173e32;box-shadow:0 10px 24px #173e3230}
.game-select span{display:block;font-size:1.35rem;margin-bottom:7px}.game-select b{display:block;font-size:.92rem}.game-select small{display:block;opacity:.7;margin-top:4px;line-height:1.25}
.game-placeholder{display:none;border-radius:24px;padding:30px 24px;background:linear-gradient(135deg,#173e32,#215b45);color:#fff;min-height:300px;align-items:center;justify-content:center;text-align:center;box-shadow:0 18px 40px #0003}
.game-placeholder.active{display:flex}.game-placeholder .placeholder-inner{max-width:680px}.game-placeholder .big-icon{font-size:3.5rem}.game-placeholder h3{margin:10px 0 8px;font-size:clamp(1.5rem,4vw,2.2rem)}.game-placeholder p{line-height:1.6;opacity:.9}.game-status{display:inline-block;margin-top:12px;padding:8px 12px;border-radius:999px;background:#dced92;color:#173e32;font-weight:900}
@media(max-width:900px){#gamesSelector{grid-template-columns:repeat(3,1fr)}}
@media(max-width:560px){#gamesSelector{grid-template-columns:repeat(2,1fr)}.game-select{min-height:82px;padding:11px}.game-select small{font-size:.72rem}}
`;
document.head.appendChild(style);

const selector=document.createElement('div');
selector.id='gamesSelector';
selector.setAttribute('aria-label','Seleccionar minijuego');
selector.innerHTML=`
<button class="game-select active" data-game-tab="expedicion"><span>🗺️</span><b>Expedición Andina</b><small>Mapa + preguntas</small></button>
<button class="game-select" data-game-tab="viaje"><span>🚂</span><b>Viaje Andino</b><small>Recorre paisajes</small></button>
<button class="game-select" data-game-tab="conexiones"><span>🔗</span><b>Conecta territorio</b><small>Une causa y efecto</small></button>
<button class="game-select" data-game-tab="misterio"><span>🕵️</span><b>Misterio Andino</b><small>Investiga las pistas</small></button>
<button class="game-select" data-game-tab="decisiones"><span>🌱</span><b>Decisiones comunitarias</b><small>Elige soluciones</small></button>`;
section.insertBefore(selector,arena);

const placeholders={
 viaje:['🚂','Viaje Andino','Un recorrido por distintos paisajes de la Región Andina. El jugador debe elegir rutas, reconocer pisos térmicos y superar pequeñas pruebas durante el viaje.'],
 conexiones:['🔗','Conecta territorio','Une elementos como relieve, clima, agua, economía y población para descubrir cómo una característica del territorio provoca cambios en otras.'],
 misterio:['🕵️','Misterio Andino','Investiga pistas sobre un lugar de la Región Andina: observa imágenes, descarta opciones y descubre de qué paisaje, ciudad o actividad se trata.'],
 decisiones:['🌱','Decisiones comunitarias','Toma decisiones frente a situaciones reales de agua, conservación, movilidad y economía. Cada elección cambia las consecuencias de la comunidad.']
};
Object.entries(placeholders).forEach(([key,d])=>{
 const box=document.createElement('div');box.className='game-placeholder';box.dataset.gamePanel=key;
 box.innerHTML=`<div class="placeholder-inner"><div class="big-icon">${d[0]}</div><h3>${d[1]}</h3><p>${d[2]}</p><span class="game-status">🚧 En construcción</span></div>`;
 section.insertBefore(box,arena);
});

function show(key){
 document.querySelectorAll('.game-select').forEach(b=>b.classList.toggle('active',b.dataset.gameTab===key));
 const expedition=document.querySelector('#innovativeGames');
 if(expedition) expedition.style.display=key==='expedicion'?'block':'none';
 document.querySelectorAll('[data-game-panel]').forEach(p=>p.classList.toggle('active',p.dataset.gamePanel===key));
 arena.hidden=true;
}

document.querySelectorAll('.game-select').forEach(b=>b.addEventListener('click',()=>show(b.dataset.gameTab)));
show('expedicion');
})();
