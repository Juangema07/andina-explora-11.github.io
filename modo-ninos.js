(()=>{
'use strict';
if(window.__ANDINA_MODE_MANAGER_V5__)return;
window.__ANDINA_MODE_MANAGER_V5__=true;
const KEY='andina-explora-mode';
const isFrame=window.top!==window.self;
const isChildPage=/modo-ninos\.html$/i.test(location.pathname);
function remember(mode){try{localStorage.setItem(KEY,mode)}catch(e){}}
function addNormalButton(){
  if(isFrame||isChildPage)return;
  const nav=document.querySelector('.nav');if(!nav)return;
  nav.querySelectorAll('.mode-switch').forEach(el=>el.remove());
  if(document.getElementById('modeSwitch'))return;
  const b=document.createElement('a');
  b.id='modeSwitch';b.className='mode-switch';b.href='./modo-ninos.html';
  b.setAttribute('aria-label','Abrir versión para niños');
  b.innerHTML='<span class="mode-icon">🧸</span><span class="mode-label">Modo niños</span>';
  /* Navegación directa: no mostramos el loader de la página anterior. */
  nav.appendChild(b);
}
function init(){if(!isFrame)remember(isChildPage?'children':'normal');addNormalButton()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
