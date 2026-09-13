(()=>{
'use strict';
const ROOT='./assets/andina/';
const STYLE='viaje-direct-assets-style';
const map={
 '☕':'coffee_cup.png','🫘':'coffee_bean_02.png','🦜':'toucan.png','🐦':'blue_bird.png','🦉':'hummingbird.png','🦅':'hummingbird.png',
 '🌱':'sprout.png','🧴':'bottle.png','🗑️':'trash_bag.png','🗑':'trash_bag.png','🥤':'crushed_can.png','🧃':'crushed_can.png','🥫':'crushed_can.png','📦':'crumpled_paper.png','🍬':'crumpled_paper.png','🧻':'crumpled_paper.png','🪵':'logs_axe.png','⛏️':'stump_axe.png','🪓':'stump_axe.png','🏭':'factory.png','💨':'factory.png','🔥':'factory.png','🚗':'factory.png'
};
function addStyle(){if(document.getElementById(STYLE))return;const s=document.createElement('style');s.id=STYLE;s.textContent=`
.viaje-direct-art{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}.travel2-train.viaje-train{width:112px;height:50px}.travel2-train.viaje-train img{width:100%;height:100%;object-fit:contain;display:block}.travel2-stop.station.viaje-station{padding:5px}.travel2-stop.station.viaje-station img{width:100%;height:100%;object-fit:contain;display:block}.t2-item.viaje-asset{font-size:0;line-height:0;padding:3px}.t2-item.viaje-asset img{width:100%;height:100%;object-fit:contain;display:block}.t2-drag.viaje-asset{font-size:0;padding:6px}.t2-drag.viaje-asset img{width:100%;height:100%;object-fit:contain;display:block}
@media(max-width:600px){.travel2-train.viaje-train{width:82px;height:38px}.travel2-stop.station.viaje-station{padding:4px}}
`;document.head.appendChild(s)}
function image(src,alt){const i=document.createElement('img');i.className='viaje-direct-art';i.src=ROOT+src;i.alt=alt||'';i.draggable=false;return i}
function apply(root=document){
 root.querySelectorAll('.travel2-train:not([data-direct-asset])').forEach(el=>{el.dataset.directAsset='1';el.classList.add('viaje-train');el.textContent='';const im=image('train_01.png','Tren');el.appendChild(im);let frame=1;const tick=()=>{if(!document.documentElement.contains(el)){clearInterval(id);return}frame=frame===1?2:1;im.src=ROOT+`train_0${frame}.png`};const id=setInterval(tick,420);el._viajeFrameTimer=id});
 root.querySelectorAll('.travel2-stop.station:not([data-direct-asset])').forEach(el=>{el.dataset.directAsset='1';el.classList.add('viaje-station');const old=el.textContent.trim();el.textContent='';el.appendChild(image('station.png',old||'Estación'))});
 root.querySelectorAll('.t2-drag:not([data-direct-asset])').forEach(el=>{const text=el.textContent.trim();if(!text.includes('🌱'))return;el.dataset.directAsset='1';el.classList.add('viaje-asset');el.textContent='';el.appendChild(image('sprout.png','Semilla'))});
 root.querySelectorAll('.t2-item:not([data-direct-asset])').forEach(el=>{const text=el.textContent.trim();const src=map[text];if(!src)return;el.dataset.directAsset='1';el.classList.add('viaje-asset');el.textContent='';el.appendChild(image(src,''))});
}
function cleanup(){document.querySelectorAll('.travel2-train[data-direct-asset]').forEach(el=>{if(el._viajeFrameTimer)clearInterval(el._viajeFrameTimer);delete el._viajeFrameTimer})}
function boot(){addStyle();apply();new MutationObserver(()=>apply()).observe(document.body,{childList:true,subtree:true});window.addEventListener('beforeunload',cleanup,{once:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();