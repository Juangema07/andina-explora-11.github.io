(()=>{
'use strict';
if(window.__ANDINA_MODE_MANAGER_V4__)return;
window.__ANDINA_MODE_MANAGER_V4__=true;
const KEY='andina-explora-mode';
const isFrame=window.top!==window.self;
const isChildPage=/modo-ninos\.html$/i.test(location.pathname);
const saved=(()=>{try{return localStorage.getItem(KEY)}catch(e){return null}})();

if(!isFrame && !isChildPage && saved==='children'){
  location.replace('modo-ninos.html');
  return;
}
function remember(mode){try{localStorage.setItem(KEY,mode)}catch(e){}}
function addNormalButton(){
  if(isFrame || isChildPage)return;
  const nav=document.querySelector('.nav');
  if(!nav)return;
  nav.querySelectorAll('.mode-switch').forEach(el=>el.remove());
  if(document.getElementById('modeSwitch'))return;
  const b=document.createElement('a');
  b.id='modeSwitch';b.className='mode-switch';b.href='modo-ninos.html';
  b.setAttribute('aria-label','Abrir versión para niños');
  b.innerHTML='<span class="mode-icon">🧸</span><span class="mode-label">Modo niños</span>';
  b.addEventListener('click',()=>{
    remember('children');
    const loader=document.getElementById('loader');
    if(loader){const a=loader.querySelector('strong'),s=loader.querySelector('span');if(a)a.textContent='MODO NIÑOS';if(s)s.textContent='Preparando una versión más sencilla…';loader.classList.remove('hide')}
  });
  nav.appendChild(b);
}
function init(){if(!isFrame)remember(isChildPage?'children':'normal');addNormalButton()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();