(()=>{
'use strict';

const BASE=new URL('./assets/andina/',document.baseURI).href;
const RAW='https://raw.githubusercontent.com/Juangema07/andina-explora-11.github.io/main/assets/andina/';
const files={map:'mapa.png',bogota:'bogota.png',cafe:'eje-cafetero.png',paramo:'paramo.png',valle:'valle-del-cauca.png'};
const bust='?v=20260913';
const local=n=>BASE+n+bust;
const raw=n=>RAW+n+bust;
function loadImage(img,name){
 if(!img||img.dataset.andinaFixed==='1')return;
 img.dataset.andinaFixed='1';img.dataset.andinaName=name;img.decoding='async';img.loading='lazy';img.fetchPriority='low';img.src=local(name);
 img.onerror=()=>{if(img.dataset.andinaRaw==='1')return;img.dataset.andinaRaw='1';img.src=raw(name)};
}
function fixHotspots(){
 const positions={cafe:'left:2.2%;top:29.8%;width:18%;height:9.4%;',paramo:'left:34.4%;top:33.3%;width:18%;height:10.4%;',valle:'left:61.2%;top:7.5%;width:18%;height:10.4%;',bogota:'left:78.2%;top:46.8%;width:18.2%;height:9.6%'};
 document.querySelectorAll('.map-hotspot').forEach(btn=>{const css=positions[btn.dataset.id];if(css)btn.style.cssText=css});
}
function repair(){
 document.querySelectorAll('.map-image').forEach(img=>loadImage(img,files.map));
 document.querySelectorAll('.mission-panel').forEach(panel=>{
  const title=(panel.querySelector('h3')?.textContent||'').toLowerCase();let name=files.bogota;
  if(title.includes('valle'))name=files.valle;else if(title.includes('cafetero'))name=files.cafe;else if(title.includes('páramo')||title.includes('paramo'))name=files.paramo;
  panel.style.backgroundImage='none';let bg=panel.querySelector('.andina-real-bg');
  if(!bg){bg=document.createElement('img');bg.className='andina-real-bg';bg.alt='';bg.setAttribute('aria-hidden','true');bg.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:0;';panel.prepend(bg)}
  bg.dataset.andinaFixed='0';loadImage(bg,name);
  const overlay=panel.querySelector(':scope > .andina-image-overlay');
  if(!overlay){const o=document.createElement('div');o.className='andina-image-overlay';o.style.cssText='position:absolute;inset:0;background:linear-gradient(180deg,#07181255,#071812dd 72%);z-index:1;pointer-events:none;';panel.insertBefore(o,panel.children[1]||null)}
 });
 fixHotspots();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair,{once:true});else repair();
new MutationObserver(repair).observe(document.body,{childList:true,subtree:true});
const travelScript=document.createElement('script');travelScript.src='./viaje-andino-overhaul.js?v=20260913';travelScript.defer=true;document.head.appendChild(travelScript);
const atlasScript=document.createElement('script');atlasScript.src='./atlas-sprites.js?v=20260913-3';atlasScript.defer=true;document.head.appendChild(atlasScript);
})();