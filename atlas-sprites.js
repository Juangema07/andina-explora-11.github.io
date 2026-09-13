(()=>{
'use strict';
const LOCAL=new URL('./assets/andina/file_000000004cf881f68c17505c5b1a8b99.png?v=20260913',document.baseURI).href;
const RAW='https://raw.githubusercontent.com/Juangema07/andina-explora-11.github.io/main/assets/andina/file_000000004cf881f68c17505c5b1a8b99.png?v=20260913';
const STYLE='andina-atlas-sprites-style';
function inject(){
 if(document.getElementById(STYLE))return;
 const s=document.createElement('style');s.id=STYLE;
 s.textContent=`
 .atlas-sprite{display:inline-block;background-image:url('${LOCAL}'),url('${RAW}');background-repeat:no-repeat;background-size:384px 256px;color:transparent!important;font-size:0!important;line-height:0!important;border:0!important;padding:0!important;overflow:hidden;vertical-align:middle;background-color:transparent!important}
 .travel2-train.atlas-train{width:170px;height:57px;background-position:-3px -19px!important;filter:drop-shadow(0 7px 7px #0004)}
 .travel2-stop.station.atlas-station{width:58px;height:58px;background-position:-179px -13px!important;background-size:384px 256px!important;border:0!important;border-radius:0!important;background-color:transparent!important;box-shadow:none}
 .t2-item.atlas-item{width:48px;height:48px;background-size:384px 256px!important;transform:none!important}
 .atlas-coffee{background-position:-98px -98px!important}.atlas-bean{background-position:-73px -111px!important}.atlas-toucan{background-position:-128px -99px!important}.atlas-bluebird{background-position:-168px -100px!important}.atlas-humming{background-position:-208px -99px!important}.atlas-camera{background-position:-229px -108px!important}.atlas-seedling{background-position:-296px -161px!important}.atlas-bottle{background-position:-124px -162px!important}.atlas-bag{background-position:-142px -155px!important}.atlas-can{background-position:-176px -163px!important}.atlas-trash{background-position:-110px -164px!important}.atlas-paper{background-position:-194px -164px!important}.atlas-tree{background-position:-5px -209px!important}.atlas-stump{background-position:-70px -209px!important}.atlas-landfill{background-position:-115px -210px!important}.atlas-factory{background-position:-174px -210px!important}.atlas-polluted{background-position:-240px -210px!important}.atlas-barrels{background-position:-314px -210px!important}.atlas-logs{background-position:-70px -209px!important}
 .t2-drag.atlas-drag{width:58px;height:58px;background-position:-296px -161px!important;background-size:384px 256px!important;border:0!important;background-color:transparent!important;border-radius:0;padding:0!important;color:transparent!important;font-size:0!important}
 @media(max-width:600px){
  .travel2-train.atlas-train{width:112px;height:38px;background-size:253px 169px!important;background-position:-2px -13px!important}
  .travel2-stop.station.atlas-station{width:48px;height:48px;background-size:316px 211px!important;background-position:-147px -11px!important}
  .t2-item.atlas-item{width:40px;height:40px;background-size:320px 213px!important}
  .atlas-coffee{background-position:-82px -82px!important}.atlas-bean{background-position:-61px -92px!important}.atlas-toucan{background-position:-107px -82px!important}.atlas-bluebird{background-position:-140px -83px!important}.atlas-humming{background-position:-173px -82px!important}.atlas-camera{background-position:-191px -90px!important}.atlas-seedling{background-position:-247px -134px!important}.atlas-bottle{background-position:-103px -135px!important}.atlas-bag{background-position:-118px -130px!important}.atlas-can{background-position:-147px -136px!important}.atlas-trash{background-position:-92px -136px!important}.atlas-paper{background-position:-162px -136px!important}
 }
 `;
 document.head.appendChild(s);
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
  else if(text==='📸'||text==='📷')kind='camera';
  else if(text==='🧴')kind='bottle';
  else if(text==='🗑️'||text==='🗑')kind='trash';
  else if(text==='🥤'||text==='🧃'||text==='🥫')kind='can';
  else if(text==='📦'||text==='🍬'||text==='🧻')kind='paper';
  else if(text==='🪵')kind='logs';
  else if(text==='⛏️'||text==='🪓')kind='stump';
  else if(text==='🏭'||text==='💨'||text==='🔥'||text==='🚗')kind='factory';
  else if(text==='🌳')kind='tree';
  else if(text==='🛢️')kind='barrels';
  if(!kind)return;
  el.dataset.atlas='1';el.classList.add('atlas-sprite');
  if(kind==='train')el.classList.add('atlas-train');
  else if(kind==='station')el.classList.add('atlas-station');
  else if(kind==='seedling')el.classList.add('atlas-drag');
  else el.classList.add('atlas-item','atlas-'+kind);
  el.setAttribute('aria-label',text||kind);el.textContent='';
 });
}
function boot(){inject();apply();const mo=new MutationObserver(()=>apply());mo.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();