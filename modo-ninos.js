(()=>{
'use strict';
const KEY='andina-explora-mode';
const isFrame=window.top!==window.self;
const isChildPage=/modo-ninos\.html$/i.test(location.pathname);
const saved=(()=>{try{return localStorage.getItem(KEY)}catch(e){return null}})();

// The normal site is the default entry point. If the visitor last used the
// children subweb, reopening the root starts there again. Never redirect an
// iframe: the children page uses index.html as its clean content base.
if(!isFrame && !isChildPage && saved==='children'){
  location.replace('modo-ninos.html');
  return;
}

function remember(mode){try{localStorage.setItem(KEY,mode)}catch(e){}}

function addNormalButton(){
  if(isFrame || isChildPage) return;
  const nav=document.querySelector('.nav');
  if(!nav || document.getElementById('modeSwitch')) return;
  // Remove any stale duplicate injected by another enhancement.
  nav.querySelectorAll('.mode-switch').forEach((el,i)=>{if(i>0)el.remove()});
  const b=document.createElement('a');
  b.id='modeSwitch';
  b.className='mode-switch';
  b.href='modo-ninos.html';
  b.setAttribute('aria-label','Abrir versión para niños');
  b.innerHTML='<span class="mode-icon">🧸</span><span class="mode-label">Modo niños</span>';
  b.addEventListener('click',()=>{
    remember('children');
    const loader=document.getElementById('loader');
    if(loader){
      const a=loader.querySelector('strong'),s=loader.querySelector('span');
      if(a)a.textContent='MODO NIÑOS';
      if(s)s.textContent='Preparando una versión más sencilla…';
      loader.classList.remove('hide');
    }
  });
  nav.appendChild(b);
}

function init(){
  if(!isFrame) remember(isChildPage?'children':'normal');
  addNormalButton();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();