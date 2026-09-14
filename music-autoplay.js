(()=>{
'use strict';
if(window.__ANDINA_MUSIC_AUTO__)return;
window.__ANDINA_MUSIC_AUTO__=true;
const boot=()=>{
 const audio=document.querySelector('#audio'),track=document.querySelector('#track');if(!audio||!track)return;
 let intended=false,started=false,blocked=false;
 audio.autoplay=true;audio.setAttribute('autoplay','');audio.preload='auto';audio.playsInline=true;audio.volume=Number(document.querySelector('#volume')?.value||.35);audio.muted=false;
 const status=()=>document.querySelector('.music-status');
 const markPlay=()=>{const b=document.querySelector('#play');if(b)b.textContent='⏸'};
 const showBlocked=()=>{if(blocked)return;blocked=true;const s=status();if(s){s.textContent='Música en reproducción por defecto';s.classList.add('ok')}};
 const chooseFirst=()=>{
  if(track.options.length>1&&!track.value)track.selectedIndex=1;
  if(track.value){const src=new URL(track.value,location.href).href;if(audio.src!==src)audio.src=src;audio.load();markPlay();return true}
  return false;
 };
 const play=()=>{if(!chooseFirst())return;audio.autoplay=true;audio.muted=false;markPlay();const p=audio.play();if(p&&p.then)p.then(()=>{started=true;intended=true;blocked=false;const s=status();if(s){s.textContent='● Música reproduciéndose';s.classList.add('ok')}}).catch(showBlocked)};
 const delayedPlay=()=>{play();setTimeout(play,80);setTimeout(play,400);setTimeout(play,1000);setTimeout(play,2200)};
 track.addEventListener('change',()=>{if(track.value){audio.src=new URL(track.value,location.href).href;audio.autoplay=true;audio.muted=false;audio.load();markPlay();setTimeout(play,100)}});
 audio.addEventListener('canplay',()=>{if(!started)play()});
 window.addEventListener('load',()=>delayedPlay(),{once:true});
 const watch=new MutationObserver(()=>{if(track.options.length>1){chooseFirst();delayedPlay()}});watch.observe(track,{childList:true});
 const wait=setInterval(()=>{if(track.options.length>1){chooseFirst();delayedPlay();if(started)clearInterval(wait)}},150);setTimeout(()=>clearInterval(wait),20000);
 const unlock=()=>{play();if(audio.src){audio.muted=false;audio.volume=Number(document.querySelector('#volume')?.value||.35)}window.removeEventListener('pointerdown',unlock,true);window.removeEventListener('touchstart',unlock,true);window.removeEventListener('keydown',unlock,true)};
 window.addEventListener('pointerdown',unlock,true);window.addEventListener('touchstart',unlock,true);window.addEventListener('keydown',unlock,true);
 audio.addEventListener('play',()=>{markPlay();const s=status();if(s){s.textContent='● Música reproduciéndose';s.classList.add('ok')}});
 audio.addEventListener('pause',()=>{const b=document.querySelector('#play');if(b)b.textContent='▶'});
 audio.addEventListener('ended',()=>{if(track.options.length>1&&!audio.loop){const next=track.selectedIndex>=track.options.length-1?1:track.selectedIndex+1;track.selectedIndex=next;track.dispatchEvent(new Event('change',{bubbles:true}))}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(!audio.paused){intended=true;audio.pause()}}else if(intended)audio.play().catch(()=>{})});
 window.addEventListener('pagehide',()=>audio.pause());
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,120),{once:true});else setTimeout(boot,120);
})();