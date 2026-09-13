(()=>{
'use strict';
if(window.__ANDINA_GAME_POSITION_FIX__)return;
window.__ANDINA_GAME_POSITION_FIX__=true;
function focus(){
  const panel=document.querySelector('#gamePanel');
  if(!panel)return;
  const top=panel.getBoundingClientRect().top+window.scrollY-18;
  window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
}
function observe(){
  const arena=document.querySelector('#gameArena');
  if(!arena)return;
  let last='';
  const check=()=>{
    const game=arena.querySelector('.game-panel,.travel-wrap,#andina-other-games,.mission-panel');
    if(!game)return;
    const key=(game.id||game.className)+'|'+game.textContent.slice(0,80);
    if(key!==last){last=key;setTimeout(focus,70)}
  };
  check();
  new MutationObserver(check).observe(arena,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe,{once:true});else observe();
})();
