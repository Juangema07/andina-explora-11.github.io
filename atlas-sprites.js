(()=>{
'use strict';
const ATLAS='./assets/andina/file_000000004cf881f68c17505c5b1a8b99.png?v=20260913-2';
const STYLE='andina-atlas-sprites-style';
function inject(){
 if(document.getElementById(STYLE))return;
 const s=document.createElement('style');s.id=STYLE;
 s.textContent=`
 .atlas-sprite{display:inline-block;background-image:url('${ATLAS}');background-repeat:no-repeat;background-color:transparent!important;color:transparent!important;font-size:0!important;line-height:0!important;border:0!important;padding:0!important;overflow:hidden;vertical-align:middle}
 /* Atlas original: 1536x1024. CSS scale = 1/4. */
 .travel2-train.atlas-train{width:170px;height:28px;background-size:384px 256px;background-position:-4px -21px!important;filter:drop-shadow(0 5px 5px #0004)}
 .travel2-stop.station.atlas-station{width:140px;height:66px;background-size:384px 256px!important;background-position:-180px -15px!important;border:0!important;border-radius:0!important;box-shadow:none}
 .t2-item.atlas-item{width:54px;height:54px;background-size:384px 256px!important;background-repeat:no-repeat!important;transform:none!important}
 .atlas-coffee{background-position:-94px -104px!important;background-size:384px 256px!important}
 .atlas-bean{background-position:-77px -109px!important;background-size:384px 256px!important}
 .atlas-toucan{background-position:-129px -99px!important;background-size:384px 256px!important}
 .atlas-bluebird{background-position:-167px -100px!important;background-size:384px 256px!important}
 .atlas-humming{background-position:-208px -99px!important;background-size:384px 256px!important}
 .atlas-camera{background-position:-229px -107px!important;background-size:384px 256px!important}
 .atlas-seedling{background-position:-295px -160px!important;background-size:384px 256px!important}
 .atlas-bottle{background-position:-124px -160px!important;background-size:384px 256px!important}
 .atlas-bag{background-position:-142px -155px!important;background-size:384px 256px!important}
 .atlas-can{background-position:-174px -161px!important;background-size:384px 256px!important}
 .atlas-trash{background-position:-109px -162px!important;background-size:384px 256px!important}
 .atlas-paper{background-position:-194px -162px!important;background-size:384px 256px!important}
 .atlas-tree{background-position:-5px -210px!important;background-size:384px 256px!important}
 .atlas-stump{background-position:-69px -210px!important;background-size:384px 256px!important}
 .atlas-landfill{background-position:-116px -209px!important;background-size:384px 256px!important}
 .atlas-factory{background-position:-174px -210px!important;background-size:384px 256px!important}
 .atlas-polluted{background-position:-239px -209px!important;background-size:384px 256px!important}
 .atlas-barrels{background-position:-313px -210px!important;background-size:384px 256px!important}
 .atlas-logs{background-position:-69px -210px!important;background-size:384px 256px!important}
 .t2-drag.atlas-drag{width:58px;height:58px;background-position:-295px -160px!important;background-size:384px 256px!important;border:0!important;background-color:transparent!important;border-radius:0;padding:0!important;color:transparent!important;font-size:0!important}
 @media(max-width:600px){
  .travel2-train.atlas-train{width:120px;height:22px;background-size:270px 180px!important;background-position:-3px -15px!important}
  .travel2-stop.station.atlas-station{width:105px;height:50px;background-size:288px 192px!important;background-position:-135px -11px!important}
  .t2-item.atlas-item{width:46px;height:46px;background-size:288px 192px!important}
  .atlas-coffee{background-position:-71px -78px!important}.atlas-bean{background-position:-58px -82px!important}.atlas-toucan{background-position:-97px -74px!important}.atlas-bluebird{background-position:-125px -75px!important}.atlas-humming{background-position:-156px -74px!important}.atlas-camera{background-position:-172px -80px!important}.atlas-seedling{background-position:-221px -120px!important}.atlas-bottle{background-position:-93px -120px!important}.atlas-bag{background-position:-107px -116px!important}.atlas-can{background-position:-131px -121px!important}.atlas-trash{background-position:-82px -122px!important}.atlas-paper{background-position:-146px -121px!important}
  .atlas-tree{background-position:-4px -157px!important}.atlas-stump{background-position:-52px -157px!important}.atlas-landfill{background-position:-87px -157px!important}.atlas-factory{background-position:-131px -157px!important}.atlas-polluted{background-position:-180px -157px!important}.atlas-barrels{background-position:-235px -157px!important}
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