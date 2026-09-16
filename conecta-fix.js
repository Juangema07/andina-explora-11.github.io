(()=>{
'use strict';
// El HTML histórico incluye dos referencias a legacy-enhancements.js. La segunda no aporta funcionalidad y duplica trabajo.
[...document.scripts].forEach(s=>{if(s!==document.currentScript&&s.src.includes('legacy-enhancements.js'))s.remove()});
const ROOT='#andina-other-games';
const pairs=[
 ['Cordillera de los Andes','Gran sistema montañoso que atraviesa la región y explica buena parte de sus pisos térmicos y paisajes.'],
 ['Páramos','Ecosistemas de alta montaña fundamentales para la regulación y el abastecimiento de agua.'],
 ['Café','Producto agrícola emblemático de muchas zonas andinas, ligado a paisajes rurales y economías locales.'],
 ['Bogotá','Gran ciudad de la Cordillera Oriental y uno de los principales centros de servicios, cultura y economía del país.'],
 ['Valle del Cauca','Valle interandino relacionado con el río Cauca, con importante actividad agrícola, urbana e industrial.'],
 ['Agricultura','Actividad que aprovecha los distintos pisos térmicos para producir alimentos y productos comerciales.'],
 ['Bambuco','Expresión musical y cultural tradicional muy vinculada con la identidad de varias zonas andinas.'],
 ['Biodiversidad','Gran variedad de especies y ecosistemas que hace de la región un territorio natural muy diverso.']
];
const style=`
.ct-panel{background:linear-gradient(145deg,#173e32,#0b2921);color:#fff;border-radius:26px;overflow:hidden;box-shadow:0 22px 55px #0005;animation:ctIn .4s ease both}
.ct-head{padding:24px 24px 16px;display:flex;justify-content:space-between;gap:16px;align-items:flex-start;flex-wrap:wrap}.ct-head h3{margin:4px 0;font-size:clamp(1.55rem,4vw,2.25rem)}.ct-head p{margin:0;opacity:.8;line-height:1.45;max-width:720px}.ct-kicker{font-size:.72rem;letter-spacing:.15em;font-weight:900;opacity:.65}.ct-time{background:#dced92;color:#173e32;border-radius:15px;padding:10px 14px;font-weight:900;min-width:92px;text-align:center}.ct-body{padding:0 24px 25px}.ct-instruction{background:#ffffff12;border:1px solid #ffffff1c;border-radius:14px;padding:11px 13px;margin-bottom:13px;font-weight:800}.ct-meter{height:9px;background:#ffffff28;border-radius:99px;overflow:hidden;margin:10px 0 17px}.ct-meter i{display:block;height:100%;width:100%;background:#dced92;transition:width 1s linear}.ct-columns{display:grid;grid-template-columns:1fr 1fr;gap:16px}.ct-column{background:#f7faf4;color:#173e32;border-radius:20px;padding:15px}.ct-column h4{margin:0 0 10px;font-size:1rem}.ct-list{display:grid;gap:9px}.ct-card{width:100%;border:2px solid #d2dacf;background:#fff;color:#173e32;border-radius:14px;padding:12px;text-align:left;font:inherit;font-weight:900;cursor:pointer;transition:.18s;min-height:58px}.ct-card:hover{transform:translateY(-2px);box-shadow:0 8px 18px #0002}.ct-card.selected{border-color:#71934c;box-shadow:0 0 0 4px #71934c22;background:#edf4df}.ct-card.matched{background:#dced92;border-color:#9ebd55;pointer-events:none;opacity:.82}.ct-card.wrong{animation:ctShake .3s ease;border-color:#c98776;background:#f0d1c7}.ct-status{min-height:27px;margin-top:12px;font-weight:900}.ct-good{color:#bfe67a}.ct-bad{color:#ffb3a7}.ct-final{text-align:center;padding:38px 18px}.ct-final .big{font-size:3.5rem}.ct-final h4{font-size:2rem;margin:6px 0}.ct-final p{max-width:650px;margin:0 auto 17px;line-height:1.5;opacity:.8}.ct-btn{border:0;border-radius:13px;padding:11px 16px;font-weight:900;cursor:pointer;background:#dced92;color:#173e32}
@keyframes ctIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@keyframes ctShake{25%{transform:translateX(-5px)}50%{transform:translateX(5px)}75%{transform:translateX(-3px)}}
@media(max-width:650px){.ct-head,.ct-body{padding-left:14px;padding-right:14px}.ct-columns{grid-template-columns:1fr;gap:11px}.ct-column{padding:12px}.ct-time{width:100%}}
`;
function inject(){if(!document.getElementById('conecta-fix-css')){const s=document.createElement('style');s.id='conecta-fix-css';s.textContent=style;document.head.appendChild(s)}}
function shuffle(a){return a.slice().sort(()=>Math.random()-.5)}
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function cardText(pair){return pair[0]}
function focusGamePanel(){setTimeout(()=>{const panel=document.querySelector('#gamePanel');if(!panel)return;const top=panel.getBoundingClientRect().top+window.scrollY-18;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})},60)}
function start(root){
 inject();let matched=0,left=null,locked=false,time=210,timer=null;
 const leftDeck=shuffle(pairs.map((p,i)=>({i,text:p[0]})));const rightDeck=shuffle(pairs.map((p,i)=>({i,text:p[1]})));
 root.innerHTML=`<div class="ct-panel"><div class="ct-head"><div><div class="ct-kicker">RETO DE RELACIONES</div><h3>Conecta territorio</h3><p>Relaciona cada cosa clave de la Región Andina con la descripción que le corresponde.</p></div><div class="ct-time" id="ctTime">03:30</div></div><div class="ct-body"><div class="ct-instruction">🧩 Elige un bloque de la izquierda y luego su descripción de la derecha.</div><div class="ct-meter"><i id="ctMeter"></i></div><div class="ct-columns"><section class="ct-column"><h4>🔎 Cosas clave de la región</h4><div class="ct-list" id="ctLeft">${leftDeck.map(x=>`<button class="ct-card" data-id="${x.i}" data-side="left">${x.text}</button>`).join('')}</div></section><section class="ct-column"><h4>📚 Descripciones</h4><div class="ct-list" id="ctRight">${rightDeck.map(x=>`<button class="ct-card" data-id="${x.i}" data-side="right">${x.text}</button>`).join('')}</div></section></div><div class="ct-status" id="ctStatus"></div></div></div>`;
 const all=[...root.querySelectorAll('.ct-card')];
 all.forEach(btn=>btn.addEventListener('click',()=>{
   if(locked||btn.classList.contains('matched'))return;
   if(btn.dataset.side==='left'){
     all.filter(x=>x.dataset.side==='left').forEach(x=>x.classList.remove('selected'));
     btn.classList.add('selected');left=btn;return;
   }
   if(!left){status('Primero elige un elemento de la izquierda.','bad');return}
   locked=true;const ok=left.dataset.id===btn.dataset.id;
   if(ok){left.classList.add('matched');btn.classList.add('matched');left.classList.remove('selected');matched++;status('¡Conexión correcta!','good');document.getElementById('ctMeter').style.width=((pairs.length-matched)/pairs.length*100)+'%';left=null;locked=false;if(matched===pairs.length){clearInterval(timer);setTimeout(()=>finish(root,'🎉','¡Territorio conectado!','Reconociste elementos geográficos, ambientales, económicos y culturales de la Región Andina.'),450)}}
   else{left.classList.add('wrong');btn.classList.add('wrong');status('No coinciden. Piensa en la relación territorial.','bad');setTimeout(()=>{left.classList.remove('wrong','selected');btn.classList.remove('wrong');left=null;locked=false},550)}
 }));
 function status(text,type){const el=root.querySelector('#ctStatus');el.textContent=text;el.className='ct-status ct-'+type}
 timer=setInterval(()=>{time--;const m=Math.floor(time/60),s=time%60;root.querySelector('#ctTime').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');root.querySelector('#ctMeter').style.width=(time/210*100)+'%';if(time<=0){clearInterval(timer);all.forEach(x=>x.disabled=true);root.querySelector('#ctStatus').textContent='⏰ Se acabó el tiempo. ¡Inténtalo de nuevo!';root.querySelector('#ctStatus').className='ct-status ct-bad';setTimeout(()=>finish(root,'⏰','Tiempo terminado','Esta vez no alcanzaste a conectar todos los elementos. Puedes volver a jugar.'),800)}},1000);
}
function finish(root,emoji,title,text){root.innerHTML=`<div class="ct-panel"><div class="ct-final"><div class="big">${emoji}</div><h4>${title}</h4><p>${text}</p><button class="ct-btn" id="ctAgain">Jugar de nuevo</button></div></div>`;root.querySelector('#ctAgain').onclick=()=>{start(root);focusGamePanel()}}
function intercept(e){const el=e.target.closest?.('.game-choice');if(!el)return;const label=(el.textContent||'').toLowerCase();if(!label.includes('conecta territorio'))return;e.preventDefault();e.stopImmediatePropagation();const root=document.querySelector(ROOT);if(root){root.hidden=false;start(root);focusGamePanel()}}
function boot(){document.addEventListener('click',intercept,true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();