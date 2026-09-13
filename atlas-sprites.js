(()=>{
'use strict';
const ATLAS='./assets/andina/file_000000004cf881f68c17505c5b1a8b99.png?v=20260913-3';
const STYLE='andina-atlas-sprites-style';
function inject(){
 if(document.getElementById(STYLE))return;
 const s=document.createElement('style');s.id=STYLE;s.textContent=`
 .atlas-sprite{display:inline-block!important;background-image:url('${ATLAS}')!important;background-repeat:no-repeat!important;background-color:transparent!important;color:transparent!important;font-size:0!important;line-height:0!important;border:0!important;padding:0!important;overflow:hidden!important;vertical-align:middle}
 .travel2-train.atlas-train{width:159px!important;height:25px!important;background-size:384px 256px!important;background-position:-23px -25px!important;animation:atlasTrainFrames .42s steps(1,end) infinite!important;filter:drop-shadow(0 5px 5px #0004);transform:translateX(-50%)}
 @keyframes atlasTrainFrames{0%,49%{background-position:-23px -25px}50%,100%{background-position:-23px -53px}}
 .travel2-stop.station.atlas-station{width:68px!important;height:34px!important;background-size:192px 128px!important;background-position:-94px -9px!important;border:0!important;border-radius:0!important;box-shadow:none!important;background-color:transparent!important;font-size:0!important}
 .t2-item.atlas-item{box-sizing:border-box!important;width:46px!important;height:46px!important;min-width:0!important;min-height:0!important;background-size:384px 256px!important;background-repeat:no-repeat!important;border:0!important;padding:0!important;background-color:transparent!important;font-size:0!important;line-height:0!important;will-change:left,top,transform}
 .atlas-coffee{width:42px!important;height:46px!important;background-position:-23px -99px!important}
 .atlas-bean{width:32px!important;height:18px!important;background-position:-101px -136px!important}
 .atlas-toucan{width:36px!important;height:49px!important;background-position:-145px -96px!important}
 .atlas-bluebird{width:38px!important;height:48px!important;background-position:-176px -97px!important}
 .atlas-humming{width:36px!important;height:45px!important;background-position:-212px -96px!important}
 .atlas-seedling{width:37px!important;height:37px!important;background-position:-296px -165px!important}
 .atlas-bottle{width:24px!important;height:37px!important;background-position:-130px -163px!important}
 .atlas-bag{width:32px!important;height:40px!important;background-position:-150px -161px!important}
 .atlas-can{width:22px!important;height:36px!important;background-position:-180px -166px!important}
 .atlas-trash{width:24px!important;height:25px!important;background-position:-196px -176px!important}
 .atlas-tree{width:57px!important;height:44px!important;background-position:-18px -208px!important}
 .atlas-stump,.atlas-logs{width:38px!important;height:47px!important;background-position:-81px -205px!important}
 .atlas-landfill{width:56px!important;height:38px!important;background-position:-115px -214px!important}
 .atlas-factory{width:56px!important;height:50px!important;background-position:-182px -202px!important}
 .atlas-polluted{width:69px!important;height:42px!important;background-position:-242px -210px!important}
 .atlas-barrels{width:59px!important;height:36px!important;background-position:-324px -216px!important}
 @keyframes t2fall{0%{top:-60px;opacity:0;transform:rotate(-8deg)}8%{opacity:1}100%{top:calc(100% + 24px);opacity:1;transform:rotate(8deg)}}
 .travel2-arena{overflow:hidden!important;position:absolute!important}
 .t2-item,.t2-drag{max-width:calc(100% - 8px)!important}
 @media(max-width:600px){
  .travel2-train.atlas-train{width:119px!important;height:19px!important;background-size:288px 192px!important;background-position:-17px -19px!important;animation-name:atlasTrainFramesMobile!important}
  @keyframes atlasTrainFramesMobile{0%,49%{background-position:-17px -19px}50%,100%{background-position:-17px -40px}}
  .travel2-stop.station.atlas-station{width:56px!important;height:28px!important;background-size:158px 106px!important;background-position:-77px -7px!important}
  .t2-item.atlas-item{width:40px!important;height:40px!important}
  .atlas-coffee{width:37px!important;height:40px!important}.atlas-toucan{width:31px!important;height:42px!important}.atlas-bluebird{width:33px!important;height:41px!important}.atlas-humming{width:31px!important;height:39px!important}
 }
 `;document.head.appendChild(s);
}
function kindFor(el){
 const text=(el.textContent||'').trim();
 if(el.classList.contains('travel2-train'))return'train';
 if(el.classList.contains('travel2-stop'))return'station';
 if(el.classList.contains('t2-drag'))return'seedling';
 if(text==='☕')return'coffee';if(text==='🫘')return'bean';if(text==='🦜')return'toucan';if(text==='🐦')return'bluebird';if(text==='🦉'||text==='🦅')return'humming';
 if(text==='🧴')return'bottle';if(text==='🗑️'||text==='🗑')return'trash';if(text==='🥤'||text==='🧃'||text==='🥫')return'can';if(text==='📦'||text==='🍬'||text==='🧻')return'paper';if(text==='🪵')return'logs';if(text==='⛏️'||text==='🪓')return'stump';if(text==='🏭'||text==='💨'||text==='🔥'||text==='🚗')return'factory';if(text==='🌳')return'tree';if(text==='🛢️')return'barrels';return'';
}
function applySprites(root=document){
 root.querySelectorAll('.travel2-train:not([data-atlas]),.travel2-stop.station:not([data-atlas]),.t2-item:not([data-atlas]),.t2-drag:not([data-atlas])').forEach(el=>{
  const kind=kindFor(el);if(!kind)return;const old=(el.textContent||'').trim();el.dataset.atlas='1';el.dataset.atlasKind=kind;el.classList.add('atlas-sprite');
  if(kind==='train')el.classList.add('atlas-train');else if(kind==='station')el.classList.add('atlas-station');else if(kind==='seedling')el.classList.add('atlas-drag','atlas-seedling');else el.classList.add('atlas-item','atlas-'+kind);
  el.setAttribute('aria-label',old||kind);el.textContent='';
 });
 clampArenaItems();
}
function clampArenaItems(){
 document.querySelectorAll('.travel2-arena').forEach(arena=>{const aw=arena.clientWidth,ah=arena.clientHeight;if(aw<10||ah<10)return;arena.querySelectorAll('.t2-item').forEach(el=>{
  const left=el.style.left;if(left&&left.endsWith('%')){const p=parseFloat(left),max=100-Math.max(0,(el.offsetWidth/aw)*100)-2;if(Number.isFinite(p))el.style.left=Math.max(2,Math.min(p,max))+'%';}
  const top=el.style.top;const falling=el.style.animation.includes('t2fall');if(top&&top.endsWith('px')&&!falling){const n=parseFloat(top),max=ah-el.offsetHeight-4;if(Number.isFinite(n))el.style.top=Math.max(4,Math.min(n,max))+'px';}
 });});
}
function boot(){inject();applySprites();const mo=new MutationObserver(()=>applySprites());mo.observe(document.body,{childList:true,subtree:true});window.addEventListener('resize',clampArenaItems,{passive:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();