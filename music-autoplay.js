(()=>{
'use strict';
if(window.__ANDINA_MUSIC_AUTO__)return;
window.__ANDINA_MUSIC_AUTO__=true;
const boot=()=>{
 const audio=document.querySelector('#audio'),track=document.querySelector('#track');if(!audio||!track)return;
 let started=false,intended=true;
 const defaultSrc=new URL('music/Valles de Colombia (1).mp3',location.href).href;
 audio.autoplay=true;audio.setAttribute('autoplay','');audio.preload='auto';audio.playsInline=true;audio.volume=Number(document.querySelector('#volume')?.value||.35);audio.muted=false;
 const status=()=>document.querySelector('.music-status');
 const markPlay=()=>{const b=document.querySelector('#play');if(b)b.textContent='⏸'};
 const markPause=()=>{const b=document.querySelector('#play');if(b)b.textContent='▶'};
 const setDefault=()=>{
  if(track.options.length>1&&!track.value)track.selectedIndex=1;
  if(!audio.src||audio.src==='')audio.src=track.value?new URL(track.value,location.href).href:defaultSrc;
  if(track.options.length>1&&!track.value)track.value=track.options[1].value;
  audio.autoplay=true;audio.muted=false;audio.load();
 };
 const play=()=>{
  setDefault();
  audio.muted=false;audio.volume=Number(document.querySelector('#volume')?.value||.35);audio.autoplay=true;markPlay();
  const p=audio.play();
  if(p&&p.then)p.then(()=>{started=true;intended=true;const s=status();if(s){s.textContent='● Música reproduciéndose';s.classList.add('ok')}}).catch(()=>{const s=status();if(s){s.textContent='La música está lista para reproducirse';s.classList.remove('ok')}});
 };
 const retry=()=>{play();setTimeout(play,150);setTimeout(play,700);setTimeout(play,1600);setTimeout(play,3000)};
 track.addEventListener('change',()=>{if(track.value){audio.src=new URL(track.value,location.href).href;audio.autoplay=true;audio.muted=false;audio.load();setTimeout(play,80)}});
 audio.addEventListener('canplay',()=>{if(!started)play()});
 audio.addEventListener('play',()=>{started=true;markPlay();const s=status();if(s){s.textContent='● Música reproduciéndose';s.classList.add('ok')}});
 audio.addEventListener('pause',()=>{if(!document.hidden)markPause()});
 audio.addEventListener('ended',()=>{if(track.options.length>1&&!audio.loop){const next=track.selectedIndex>=track.options.length-1?1:track.selectedIndex+1;track.selectedIndex=next;track.dispatchEvent(new Event('change',{bubbles:true}))}});
 window.addEventListener('load',retry,{once:true});
 document.addEventListener('DOMContentLoaded',retry,{once:true});
 const watch=new MutationObserver(()=>{if(track.options.length>1){if(!audio.src)setDefault();play()}});watch.observe(track,{childList:true});
 const wait=setInterval(()=>{if(track.options.length>1){setDefault();play();if(started)clearInterval(wait)}},150);setTimeout(()=>clearInterval(wait),20000);
 const unlock=()=>{play();window.removeEventListener('pointerdown',unlock,true);window.removeEventListener('touchstart',unlock,true);window.removeEventListener('keydown',unlock,true)};
 window.addEventListener('pointerdown',unlock,true);window.addEventListener('touchstart',unlock,true);window.addEventListener('keydown',unlock,true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(!audio.paused)audio.pause()}else if(intended)play()});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,40),{once:true});else setTimeout(boot,40);
})();
