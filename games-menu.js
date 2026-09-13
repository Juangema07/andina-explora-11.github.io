(()=>{
'use strict';
// Menú estable para los juegos secundarios. No intercepta ni redispara clicks.
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
function focusGamePanel(){
  setTimeout(()=>{
    const panel=document.querySelector('#gamePanel');
    if(!panel)return;
    const top=panel.getBoundingClientRect().top+window.scrollY-18;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
  },70);
}
function bindPosition(){
  const menu=document.querySelector('.games-menu');
  if(!menu||menu.dataset.positionBound==='1')return;
  menu.dataset.positionBound='1';
  menu.addEventListener('click',focusGamePanel);
}
function boot(){
  connect();
  preload();
  bindPosition();
  new MutationObserver(()=>{connect();bindPosition()}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();