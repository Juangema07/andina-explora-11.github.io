(()=>{
'use strict';
if(window.__ANDINA_STANDALONE_KIDS__)return;
window.__ANDINA_STANDALONE_KIDS__=true;
try{localStorage.setItem('andina-explora-mode','children')}catch(e){}
function init(){
 document.documentElement.classList.add('modo-ninos-child');
 document.body.classList.add('standalone-kids-web');
 document.querySelectorAll('#modeSwitch,.mode-switch,.child-return').forEach(el=>el.remove());
 const nav=document.querySelector('.nav');
 if(nav){
   const b=document.createElement('a');
   b.className='child-return';
   b.href='index.html';
   b.textContent='📘 Modo normal';
   b.setAttribute('aria-label','Volver al modo normal');
   b.addEventListener('click',()=>{try{localStorage.setItem('andina-explora-mode','normal')}catch(e){}});
   nav.appendChild(b);
 }
 document.querySelectorAll('.child-note').forEach((el,i)=>{if(i>0)el.remove()});
 if(!document.querySelector('.child-note')){
   const note=document.createElement('div');
   note.className='child-note';
   note.textContent='🧸 Modo niños · contenido explicado de forma más sencilla';
   document.body.prepend(note);
 }
 // The copy owns its text. No iframe, text replacement map or MutationObserver is used.
 // This means future edits to this page cannot modify index.html.
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();