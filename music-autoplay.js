(()=>{
'use strict';
if(window.__ANDINA_MUSIC_AUTO__)return;
window.__ANDINA_MUSIC_AUTO__=true;
const boot=()=>{
 const audio=document.querySelector('#audio');const track=document.querySelector('#track');if(!audio||!track)return;
 let intended=false;
 const start=()=>{if(!audio.src&&track.options.length>1){track.selectedIndex=1;track.dispatchEvent(new Event('change'))}if(audio.src){audio.volume=Number(document.querySelector('#volume')?.value||.35);audio.play().then(()=>{intended=true}).catch(()=>{intended=false})}};
 const wait=setInterval(()=>{if(track.options.length>1){clearInterval(wait);start()}},300);setTimeout(()=>clearInterval(wait),10000);
 const unlock=()=>{start();window.removeEventListener('pointerdown',unlock);window.removeEventListener('keydown',unlock)};
 setTimeout(start,700);window.addEventListener('pointerdown',unlock,{passive:true});window.addEventListener('keydown',unlock,{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(!audio.paused){intended=true;audio.pause()}}else if(intended){audio.play().catch(()=>{})}});
 window.addEventListener('pagehide',()=>audio.pause());
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,700),{once:true});else setTimeout(boot,700);
})();
