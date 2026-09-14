(()=>{
'use strict';
// Bootstrap real game modules and the sourced content layer. Cache versions are bumped when modules change.
const files=[
  'andina-games-fix.js?v=20260913-2',
  'andina-image-fix.js?v=20260913-3',
  'conecta-fix.js?v=20260913-1',
  'viaje-quality-fix.js?v=20260913-5',
  'viaje-static-threats-fix.js?v=20260913-2',
  'andina-content-enhancement.js?v=20260913-1',
  'contenido-andino-2026.js?v=20260913-1'
];
function load(src){
 return new Promise((resolve,reject)=>{
  if(document.querySelector(`script[data-andina-src="${src}"]`)){resolve();return}
  const s=document.createElement('script');s.src='./'+src;s.dataset.andinaSrc=src;s.defer=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
 });
}
(async()=>{for(const src of files){try{await load(src)}catch(err){console.error('Andina Explora: no se pudo cargar '+src,err)}}})();
})();
