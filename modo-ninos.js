(()=>{
'use strict';
if(window.__ANDINA_MODE_MANAGER_V6__)return;
window.__ANDINA_MODE_MANAGER_V6__=true;
const KEY='andina-explora-mode';
const isFrame=window.top!==window.self;
const isChildPage=/modo-ninos\.html$/i.test(location.pathname);
function remember(mode){try{localStorage.setItem(KEY,mode)}catch(e){}}
function showTransitionLoader(){
  const loader=document.getElementById('loader');
  if(!loader)return;
  loader.style.setProperty('display','flex','important');
  loader.style.setProperty('visibility','visible','important');
  loader.style.setProperty('opacity','1','important');
  loader.style.setProperty('pointer-events','auto','important');
  document.body.classList.remove('loaded');
}
function addNormalButton(){
  if(isFrame||isChildPage)return;
  const nav=document.querySelector('.nav');if(!nav)return;
  nav.querySelectorAll('.mode-switch').forEach(el=>el.remove());
  if(document.getElementById('modeSwitch'))return;
  const b=document.createElement('a');
  b.id='modeSwitch';b.className='mode-switch';b.href='./modo-ninos.html';
  b.setAttribute('aria-label','Abrir versión para niños');
  b.innerHTML='<span class="mode-icon">🧸</span><span class="mode-label">Modo niños</span>';
  nav.appendChild(b);
}
function bindTransition(){
  if(isFrame)return;
  document.addEventListener('click',e=>{
    const link=e.target.closest?.('.mode-switch,.child-return');
    if(!link||!link.href)return;
    const target=new URL(link.href,location.href);
    if(target.origin!==location.origin)return;
    remember(/modo-ninos\.html$/i.test(target.pathname)?'children':'normal');
    showTransitionLoader();
  },true);
}
function init(){if(!isFrame)remember(isChildPage?'children':'normal');addNormalButton();bindTransition()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
