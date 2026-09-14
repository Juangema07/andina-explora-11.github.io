(()=>{
'use strict';
if(window.__ANDINA_SECTION_ORDER__)return;
window.__ANDINA_SECTION_ORDER__=true;
const order=[
 ['panorama','01 · PANORAMA'],
 ['naturaleza','02 · NATURALEZA Y AGUA'],
 ['vida','03 · VIDA Y ECONOMÍA'],
 ['cultura','04 · CULTURA'],
 ['andina-learning','05 · CLAVES PARA ENTENDERLA'],
 ['conservacion','06 · CONSERVACIÓN'],
 ['infografia-andina','07 · INFOGRAFÍA INTERACTIVA'],
 ['territorios-andinos','08 · TERRITORIOS DESTACADOS'],
 ['opinion','09 · DANOS TU OPINIÓN'],
 ['juegos','10 · EXPERIENCIAS'],
 ['fuentes','11 · FUENTES']
];
function renumber(){
 const main=document.querySelector('main');if(!main)return;
 const games=document.querySelector('#juegos'),learning=document.querySelector('#andina-learning'),conserv=document.querySelector('#conservacion');
 // The explanatory "Claves" block belongs to the main narrative before conservation.
 // This changes only the content distribution; games, sources and opinion are never moved.
 if(learning&&conserv&&learning.parentNode===main&&learning.compareDocumentPosition(conserv)&Node.DOCUMENT_POSITION_FOLLOWING){main.insertBefore(learning,conserv)}
 order.forEach(([id,label])=>{
  const s=document.getElementById(id);if(!s)return;
  const target=s.querySelector('.section-head .eyebrow, .pro-heading .pro-kicker, .andina-learning-inner > .pro-kicker, .opinion-card > div .pro-kicker');
  if(target)target.textContent=label;
 });
}
function init(){renumber();setTimeout(renumber,80);setTimeout(renumber,300);setTimeout(renumber,900)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
