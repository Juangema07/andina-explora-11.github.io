(()=>{
'use strict';
// Puente de compatibilidad: el menú lo crea andina-games-fix.js.
// Lo movemos dentro de #gameArena para que otros-juegos.js pueda interceptar
// los botones y abrir las tres experiencias completas en lugar del placeholder.
if(window.__ANDINA_OTHER_GAMES_LOADED__) return;
window.__ANDINA_OTHER_GAMES_LOADED__=true;

function connect(){
  const arena=document.querySelector('#gameArena');
  const menu=document.querySelector('.games-menu');
  if(!arena||!menu)return false;
  if(menu.parentElement!==arena) arena.appendChild(menu);
  return true;
}

function boot(){
  connect();
  const observer=new MutationObserver(()=>connect());
  observer.observe(document.body,{childList:true,subtree:true});
  const s=document.createElement('script');
  s.src='./otros-juegos.js?v=20260913-3';
  s.defer=true;
  document.head.appendChild(s);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();