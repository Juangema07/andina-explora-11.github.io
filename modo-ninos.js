(()=>{
'use strict';
if(window.__ANDINA_CHILD_SUBWEB__) return;
window.__ANDINA_CHILD_SUBWEB__=true;
const KEY='andina-modo';
function addButton(){const nav=document.querySelector('.nav');if(!nav||document.getElementById('modeSwitch'))return;const b=document.createElement('button');b.id='modeSwitch';b.className='mode-switch';b.type='button';b.innerHTML='<span class="mode-icon">🧸</span><span class="mode-label">Modo niños</span>';b.addEventListener('click',()=>{document.body.classList.add('mode-changing');const loader=document.getElementById('loader');if(loader){const a=loader.querySelector('strong'),s=loader.querySelector('span');if(a)a.textContent='MODO NIÑOS';if(s)s.textContent='Preparando una versión más sencilla…';loader.classList.remove('hide')}setTimeout(()=>{location.href='modo-ninos.html'},180)});nav.appendChild(b)}
function init(){addButton();localStorage.setItem(KEY,'normal')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
