(()=>{
'use strict';
if(window.__ANDINA_CHILD_SUBWEB__) return;
window.__ANDINA_CHILD_SUBWEB__=true;
function addButton(){
  const nav=document.querySelector('.nav');
  if(!nav||document.getElementById('modeSwitch')) return;
  const b=document.createElement('a');
  b.id='modeSwitch';
  b.className='mode-switch';
  b.href='modo-ninos.html';
  b.setAttribute('aria-label','Abrir versión para niños');
  b.innerHTML='<span class="mode-icon">🧸</span><span class="mode-label">Modo niños</span>';
  b.addEventListener('click',()=>{
    const loader=document.getElementById('loader');
    if(loader){
      const a=loader.querySelector('strong'),s=loader.querySelector('span');
      if(a)a.textContent='MODO NIÑOS';
      if(s)s.textContent='Preparando una versión más sencilla…';
      loader.classList.remove('hide');
    }
  },{once:true});
  nav.appendChild(b);
}
function init(){addButton();}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
