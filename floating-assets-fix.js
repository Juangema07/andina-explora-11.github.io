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
const SLOTS=[
  {left:'2%',top:'16%'},{right:'2%',top:'42%'},{left:'4%',bottom:'9%'},{right:'4%',bottom:'10%'}
];
const css=`
.andina-float-asset{position:absolute!important;z-index:6!important;pointer-events:none!important;width:68px!important;height:68px!important;object-fit:contain!important;display:block!important;filter:drop-shadow(0 8px 10px #0002)!important;animation:andinaAssetFloat 7s ease-in-out infinite!important;contain:layout paint!important}
.andina-float-asset img{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important}
.andina-float-cafe{width:76px!important;height:76px!important}.andina-float-tree,.andina-float-tree2,.andina-float-tree3{width:82px!important;height:82px!important}.andina-float-station{width:78px!important;height:78px!important}.andina-float-beans,.andina-float-bottle{width:56px!important;height:56px!important}
/* Los créditos de las imágenes principales se conservan; los flotantes son decorativos y no muestran etiqueta de crédito. */
.andina-float-asset .andina-float-credit,.andina-float-asset [data-image-credit],.andina-float-asset small,.andina-float-asset figcaption{display:none!important}
@keyframes andinaAssetFloat{0%,100%{transform:translate3d(0,0,0) rotate(-2deg)}50%{transform:translate3d(0,-7px,0) rotate(2deg)}}
img[src*="blue_bird.png"]:not(.andina-floating-img):not(.andina-v2-asset){max-width:92px!important;max-height:92px!important;width:92px!important;height:92px!important;object-fit:contain!important}
@media(max-width:760px){.andina-float-asset{width:52px!important;height:52px!important;opacity:.82}.andina-float-cafe,.andina-float-tree,.andina-float-tree2,.andina-float-tree3{width:58px!important;height:58px!important}.andina-float-station{width:60px!important;height:60px!important}.andina-float-beans,.andina-float-bottle{width:48px!important;height:48px!important}}
`;
function style(){if(document.getElementById('andina-floating-css'))return;const s=document.createElement('style');s.id='andina-floating-css';s.textContent=css;document.head.appendChild(s)}
function place(el,slot){Object.entries(slot).forEach(([k,v])=>el.style.setProperty(k,v,'important'))}
function add(sectionId,items){
  const section=document.getElementById(sectionId);if(!section)return;
  section.style.position=section.style.position||'relative';
  items.forEach(([file,name],i)=>{
    if(section.querySelector('[data-floating-name="'+name+'"]'))return;
    const el=document.createElement('span');
    el.className='andina-float-asset andina-float-'+name;
    el.dataset.floatingName=name;
    place(el,SLOTS[(i+(sectionId.length%2))%SLOTS.length]);
    el.style.animationDelay=(-1.4*i-((sectionId.length%3)*.7))+'s';
    el.innerHTML='<img class="andina-floating-img" loading="lazy" decoding="async" src="'+ROOT+file+'" alt="" aria-hidden="true">';
    section.appendChild(el);
  });
}
function removeFloatCredits(){
  const phrase='elaboración propia creada por la ia';
  document.querySelectorAll('small,span,p,div,figcaption').forEach(el=>{
    if(el.closest('.andina-float-asset')||el.closest('.andina-v2-float')){
      const text=(el.textContent||'').trim().toLowerCase().replace(/\s+/g,' ');
      if(text===phrase||text.includes(phrase))el.style.setProperty('display','none','important');
    }
  });
}
function repairBird(){document.querySelectorAll('img[src*="blue_bird.png"]').forEach(img=>{if(img.closest('.andina-float-asset,.andina-v2-float,.v2-typical-card'))return;const r=img.getBoundingClientRect();if(r.width>180||r.height>180){img.style.setProperty('width','92px','important');img.style.setProperty('height','92px','important');img.style.setProperty('max-width','92px','important');img.style.setProperty('max-height','92px','important');img.style.setProperty('object-fit','contain','important');img.style.setProperty('display','block','important')}})}
function run(){style();Object.entries(ASSETS).forEach(([id,items])=>add(id,items));repairBird();removeFloatCredits();setTimeout(()=>{repairBird();removeFloatCredits()},500);setTimeout(removeFloatCredits,1600)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
new MutationObserver(()=>{clearTimeout(window.__andinaFloatTimer);window.__andinaFloatTimer=setTimeout(run,300)}).observe(document.body,{childList:true,subtree:true});
})();
