(()=>{
'use strict';
const ROOT='./assets/andina/';
const ASSETS={
  inicio:[['coffee_plant.png','cafe'],['tree_01.png','tree']],
  fisica:[['hummingbird.png','bird'],['waterfall.png','water'],['bottom_grass.png','grass']],
  humana:[['toucan.png','toucan'],['tree_02.png','tree2']],
  economia:[['coffee_cup.png','cup'],['coffee_bean_02.png','beans'],['coffee_sack.png','sack']],
  cultura:[['blue_bird.png','bird2'],['succulent.png','plant']],
  desafios:[['water_patch.png','water2'],['mossy_rock_01.png','rock'],['sprout.png','sprout']],
  juegos:[['train_01.png','train'],['station.png','station']],
  productos:[['factory.png','factory'],['bottle.png','bottle']],
  recursos:[['tree_01.png','tree3'],['bottom_succulent.png','plant2']]
};
const css=`
.andina-float-asset{position:absolute!important;z-index:6!important;pointer-events:none!important;width:72px!important;height:72px!important;object-fit:contain!important;display:block!important;filter:drop-shadow(0 8px 10px #0002)!important;animation:andinaAssetFloat 7s ease-in-out infinite!important;contain:layout paint!important}
.andina-float-asset img{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important}
.andina-float-l{left:-10px!important}.andina-float-r{right:-10px!important}.andina-float-t{top:12%!important}.andina-float-m{top:44%!important}.andina-float-b{bottom:8px!important}
.andina-float-cafe{width:78px!important;height:78px!important;right:1%!important;bottom:8px!important}.andina-float-tree{width:86px!important;height:86px!important;left:-8px!important;bottom:4px!important}.andina-float-bird{right:0!important;top:13%!important}.andina-float-water{left:-8px!important;bottom:10px!important}.andina-float-toucan{right:-6px!important;top:18%!important}.andina-float-cup{right:-4px!important;top:15%!important}.andina-float-beans{left:-5px!important;top:40%!important;width:56px!important;height:56px!important}.andina-float-sack{right:-5px!important;bottom:7px!important}.andina-float-rock{left:-3px!important;bottom:10px!important}.andina-float-train{left:-7px!important;top:17%!important}.andina-float-station{right:-5px!important;bottom:8px!important;width:82px!important;height:82px!important}.andina-float-factory{right:-5px!important;bottom:8px!important}.andina-float-bottle{left:-5px!important;top:20%!important;width:58px!important;height:58px!important}
@keyframes andinaAssetFloat{0%,100%{transform:translate3d(0,0,0) rotate(-2deg)}50%{transform:translate3d(0,-7px,0) rotate(2deg)}}
/* El ave que aparecía gigante se convierte en un pequeño elemento decorativo. */
img[src*="blue_bird.png"]:not(.andina-floating-img):not(.andina-v2-asset){max-width:92px!important;max-height:92px!important;width:92px!important;height:92px!important;object-fit:contain!important}
@media(max-width:760px){.andina-float-asset{width:54px!important;height:54px!important;opacity:.82}.andina-float-cafe,.andina-float-tree{width:60px!important;height:60px!important}.andina-float-station{width:62px!important;height:62px!important}}
`;
function style(){if(document.getElementById('andina-floating-css'))return;const s=document.createElement('style');s.id='andina-floating-css';s.textContent=css;document.head.appendChild(s)}
function add(sectionId,items){const section=document.getElementById(sectionId);if(!section)return;section.style.position=section.style.position||'relative';items.forEach(([file,name],i)=>{if(section.querySelector('[data-floating-name="'+name+'"]'))return;const el=document.createElement('span');el.className='andina-float-asset andina-float-'+name;el.dataset.floatingName=name;el.innerHTML='<img class="andina-floating-img" loading="lazy" decoding="async" src="'+ROOT+file+'" alt="" aria-hidden="true">';if(i%2)el.style.animationDelay='-3s';section.appendChild(el)})}
function repairBird(){document.querySelectorAll('img[src*="blue_bird.png"]').forEach(img=>{if(img.closest('.andina-float-asset,.andina-v2-float,.v2-typical-card'))return;const r=img.getBoundingClientRect();if(r.width>180||r.height>180){img.style.setProperty('width','92px','important');img.style.setProperty('height','92px','important');img.style.setProperty('max-width','92px','important');img.style.setProperty('max-height','92px','important');img.style.setProperty('object-fit','contain','important');img.style.setProperty('display','block','important')}})}
function run(){style();Object.entries(ASSETS).forEach(([id,items])=>add(id,items));repairBird();setTimeout(repairBird,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
new MutationObserver(()=>{clearTimeout(window.__andinaFloatTimer);window.__andinaFloatTimer=setTimeout(run,250)}).observe(document.body,{childList:true,subtree:true});
})();
