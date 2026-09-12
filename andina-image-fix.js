(()=>{
'use strict';

const BASE=new URL('./assets/andina/',document.baseURI).href;
const RAW='https://raw.githubusercontent.com/Juangema07/andina-explora-11.github.io/main/assets/andina/';
const files={
  map:'mapa.png',
  bogota:'bogota.png',
  cafe:'eje-cafetero.png',
  paramo:'paramo.png',
  valle:'valle-del-cauca.png'
};
const bust='?v=20260912';
const local=(name)=>BASE+name+bust;
const raw=(name)=>RAW+name+bust;

function repair(){
  document.querySelectorAll('.map-image').forEach(img=>{
    const good=raw(files.map);
    if(!img.dataset.andinaFixed){
      img.dataset.andinaFixed='1';
      img.dataset.fallback=raw(files.map);
      img.src=good;
      img.onerror=()=>{
        if(img.dataset.andinaRawTried!=='1'){
          img.dataset.andinaRawTried='1';
          img.src=raw(files.map);
        }
      };
    }
  });

  document.querySelectorAll('.mission-panel').forEach(panel=>{
    if(panel.dataset.andinaFixed==='1') return;
    panel.dataset.andinaFixed='1';
    const title=(panel.querySelector('h3')?.textContent||'').toLowerCase();
    let file=files.bogota;
    if(title.includes('valle')) file=files.valle;
    else if(title.includes('cafetero')) file=files.cafe;
    else if(title.includes('páramo')||title.includes('paramo')) file=files.paramo;
    panel.style.backgroundImage=`url("${raw(file)}"),url("${local(file)}")`;
    const probe=new Image();
    probe.onload=()=>{};
    probe.onerror=()=>{panel.style.backgroundImage=`url("${raw(file)}")`};
    probe.src=raw(file);
  });
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',repair,{once:true});
else repair();
new MutationObserver(repair).observe(document.body,{childList:true,subtree:true});
})();
