(()=>{
'use strict';
// Puente estable para los juegos restantes. Usa delegación en CAPTURE para
// ganar a los listeners antiguos de andina-games-fix.js, también en móvil.
if(window.__ANDINA_OTHER_GAMES_BRIDGE__) return;
window.__ANDINA_OTHER_GAMES_BRIDGE__=true;
let loader=null;
function connect(){
  const arena=document.querySelector('#gameArena');
  const menu=document.querySelector('.games-menu');
  if(!arena||!menu)return false;
  if(menu.parentElement!==arena) arena.appendChild(menu);
  return true;
}
function loadOtherGames(){
  if(window.__andinaOpenOtherGame)return Promise.resolve();
  if(loader)return loader;
  loader=new Promise((resolve,reject)=>{
    const old=document.querySelector('script[data-andina-other-games]');
    if(old){
      const wait=()=>window.__andinaOpenOtherGame?resolve():setTimeout(wait,30);
      wait();
      return;
    }
    const s=document.createElement('script');
    s.src='./otros-juegos.js?v=20260913-4';
    s.dataset.andinaOtherGames='1';
    s.onload=()=>{
      const wait=()=>window.__andinaOpenOtherGame?resolve():setTimeout(wait,30);
      wait();
    };
    s.onerror=reject;
    document.head.appendChild(s);
  });
  return loader;
}
function gameId(btn){
  const raw=(btn.dataset.game||btn.dataset.gameChoice||'').toLowerCase();
  if(raw==='conecta'||raw==='misterio'||raw==='decisiones')return raw;
  const text=(btn.textContent||'').toLowerCase();
  if(text.includes('conecta territorio'))return 'conecta';
  if(text.includes('misterio andino'))return 'misterio';
  if(text.includes('decisiones comunitarias'))return 'decisiones';
  return null;
}
function intercept(e){
  const btn=e.target.closest?.('.game-choice');
  const id=btn&&gameId(btn);
  if(!btn||!id)return;
  // Solo estos tres pasan por este puente. Expedición y Viaje conservan
  // exactamente su funcionamiento actual.
  e.preventDefault();
  e.stopImmediatePropagation();
  btn.classList.add('active');
  loadOtherGames().then(()=>{
    if(window.__andinaOpenOtherGame){
      window.__andinaOpenOtherGame(btn,id);
    }else{
      // Último recurso: reintentar el click cuando el módulo ya esté listo.
      btn.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    }
  }).catch(err=>console.error('Andina Explora: no se pudo cargar otros-juegos.js',err));
}
function boot(){
  connect();
  document.addEventListener('click',intercept,true);
  new MutationObserver(connect).observe(document.body,{childList:true,subtree:true});
  // Precarga para que al tocar el botón no haya espera visible.
  loadOtherGames().catch(()=>{});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();