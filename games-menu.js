(()=>{
'use strict';
// Menú estable para los juegos secundarios. No intercepta clicks ni cambia el scroll de la página.
if(window.__ANDINA_OTHER_GAMES_MENU__) return;
window.__ANDINA_OTHER_GAMES_MENU__=true;
function connect(){
  const arena=document.querySelector('#gameArena');
  const menu=document.querySelector('.games-menu');
  if(!arena||!menu)return;
  if(menu.parentElement!==arena) arena.appendChild(menu);
}
function preload(){
  if(document.querySelector('script[src*="otros-juegos.js"]')) return;
  const s=document.createElement('script');
  s.src='./otros-juegos.js?v=20260913-6';
  s.dataset.andinaOtherGames='1';
  s.async=false;
  document.head.appendChild(s);
}
function boot(){
  connect();
  preload();
  new MutationObserver(connect).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();