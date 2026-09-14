(()=>{
'use strict';
if(window.__ANDINA_MUSIC_AUTO__)return;
window.__ANDINA_MUSIC_AUTO__=true;
const boot=()=>{
 const audio=document.querySelector('#audio'),track=document.querySelector('#track');if(!audio||!track)return;
 let intended=false,started=false;
 audio.autoplay=true;audio.preload='auto';audio.playsInline=true;audio.volume=Number(document.querySelector('#volume')?.value||.35);
 const chooseFirst=()=>{if(track.options.length>1&&!audio.src){track.selectedIndex=1;track.dispatchEvent(new Event('change',{bubbles:true}))}};
 const play=()=>{chooseFirst();if(!audio.src)return;audio.autoplay=true;audio.play().then(()=>{started=true;intended=true}).catch(()=>{intended=false})};
 const delayedPlay=()=>{setTimeout(play,80);setTimeout(play,450);setTimeout(play,1200);setTimeout(play,2500)};
 track.addEventListener('change',()=>{setTimeout(()=>{if(audio.src){audio.load();audio.play().then(()=>{started=true;intended=true}).catch(()=>{})}},100)});
 audio.addEventListener('canplay',()=>{if(!started)audio.play().then(()=>{started=true;intended=true}).catch(()=>{})});
 const watch=new MutationObserver(()=>{if(track.options.length>1){chooseFirst();delayedPlay()}});watch.observe(track,{childList:true});
 const wait=setInterval(()=>{if(track.options.length>1){chooseFirst();delayedPlay();if(started)clearInterval(wait)}},200);setTimeout(()=>clearInterval(wait),18000);
 const unlock=()=>{play();if(audio.src){audio.muted=false;audio.volume=Number(document.querySelector('#volume')?.value||.35)}window.removeEventListener('pointerdown',unlock,true);window.removeEventListener('touchstart',unlock,true);window.removeEventListener('keydown',unlock,true)};
 window.addEventListener('pointerdown',unlock,true);window.addEventListener('touchstart',unlock,true);window.addEventListener('keydown',unlock,true);
 audio.addEventListener('ended',()=>{if(track.options.length>1&&!audio.loop){const next=track.selectedIndex>=track.options.length-1?1:track.selectedIndex+1;track.selectedIndex=next;track.dispatchEvent(new Event('change',{bubbles:true}))}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(!audio.paused){intended=true;audio.pause()}}else if(intended)audio.play().catch(()=>{})});
 window.addEventListener('pagehide',()=>audio.pause());
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,250),{once:true});else setTimeout(boot,250);
})();