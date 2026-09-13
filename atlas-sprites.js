(()=>{
'use strict';
const ATLAS='./assets/andina/atlas-viaje-andino.webp?v=20260913';
const STYLE='andina-atlas-sprites-style';
function inject(){
 if(document.getElementById(STYLE))return;
 const s=document.createElement('style');s.id=STYLE;s.textContent=`
 .atlas-sprite{display:inline-block;background-image:url('${ATLAS}');background-repeat:no-repeat;background-size:384px 256px;background-color:transparent;color:transparent!important;font-size:0!important;line-height:0!important;border:0!important;padding:0!important;overflow:hidden;vertical-align:middle}
 .travel2-train.atlas-train{width:164px;height:52px;background-position:-3px -7px;filter:drop-shadow(0 7px 7px #0004)}
 .travel2-stop.station.atlas-station{width:58px;height:58px;background-position:-168px -12px;background-size:384px 256px;border:0!important;border-radius:0;background-color:transparent;box-shadow:none}
 .t2-item.atlas-item{width:48px;height:48px;background-size:384px 256px;transform:none!important}
 .atlas-coffee{background-position:-97px -102px}
 .atlas-bean{background-position:-76px -110px}
 .atlas-toucan{background-position:-127px -100px}
 .atlas-humming{background-position:-166px -100px}
 .atlas-bluebird{background-position:-197px -100px}
 .atlas-camera{background-position:-229px -108px}
 .atlas-seedling{background-position:-303px -165px}
 .atlas-bottle{background-position:-139px -157px}
 .atlas-bag{background-position:-161px -157px}
 .atlas-can{background-position:-225px -157px}
 .atlas-trash{background-position:-111px -157px}
 .atlas-paper{background-position:-190px -157px}
 .atlas-tree{background-position:-274px -12px}
 .atlas-stump{background-position:-329px -20px}
 .atlas-factory{background-position:-48px -145px}
 .atlas-logs{background-position:-65px -145px}
 .atlas-polluted{background-position:-151px -180px}
 .t2-drag.atlas-drag{width:72px;height:72px;background-position:-303px -164px;background-size:384px 256px;border:0!important;background-color:transparent!important;border-radius:0;padding:0!important;color:transparent!important;font-size:0!important}
 @media(max-width:600px){
  .travel2-train.atlas-train{width:112px;height:38px;background-size:262px 175px;background-position:-2px -5px}
  .travel2-stop.station.atlas-station{width:48px;height:48px;background-size:316px 211px;background-position:-138px -10px}
  .t2-item.atlas-item{width:40px;height:40px;background-size:320px 213px}
  .atlas-coffee{background-position:-81px -85px}.atlas-bean{background-position:-63px -91px}.atlas-toucan{background-position:-106px -83px}.atlas-humming{background-position:-138px -83px}.atlas-bluebird{background-position:-164px -83px}.atlas-bottle{background-position:-116px -131px}.atlas-bag{background-position:-135px -131px}.atlas-can{background-position:-188px -131px}.atlas-trash{background-position:-93px -131px}.atlas-paper{background-position:-158px -131px}
 }
 `;document.head.appendChild(s);
}
function apply(root=document){
 root.querySelectorAll('.travel2-train:not([data-atlas]),.travel2-stop.station:not([data-atlas]),.t2-item:not([data-atlas]),.t2-drag:not([data-atlas])').forEach(el=>{
  const text=(el.textContent||'').trim();
  let kind='';
  if(el.classList.contains('travel2-train'))kind='train';
  else if(el.classList.contains('travel2-stop'))kind='station';
  else if(el.classList.contains('t2-drag'))kind='seedling';
  else if(text==='☕')kind='coffee';
  else if(text==='🫘')kind='bean';
  else if(text==='🦜')kind='toucan';
  else if(text==='🐦')kind='bluebird';
  else if(text==='🦉'||text==='🦅')kind='humming';
  else if(text==='📸')kind='camera';
  else if(text==='🧴')kind='bottle';
  else if(text==='🗑️')kind='trash';
  else if(text==='🥤'||text==='🧃')kind='can';
  else if(text==='📦'||text==='🍬'||text==='🧻')kind='paper';
  else if(text==='🪵')kind='logs';
  else if(text==='⛏️')kind='stump';
  else if(text==='🏭')kind='factory';
  else if(text==='🔥'||text==='💨'||text==='🚗')kind='factory';
  if(!kind)return;
  el.dataset.atlas='1';
  el.classList.add('atlas-sprite');
  if(kind==='train')el.classList.add('atlas-train');
  else if(kind==='station')el.classList.add('atlas-station');
  else if(kind==='seedling')el.classList.add('atlas-drag');
  else el.classList.add('atlas-item','atlas-'+kind);
  el.setAttribute('aria-label',text||kind);
  el.textContent='';
 });
}
function boot(){inject();apply();const mo=new MutationObserver(()=>apply());mo.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
