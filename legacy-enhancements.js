(()=>{
'use strict';
// Bootstrap real game modules. This file is loaded by index.html after app.js.
const files=[
  'andina-games-fix.js?v=20260913-2',
  'andina-image-fix.js?v=20260913-2',
  'conecta-fix.js?v=20260913-1'
];
function load(src){
  return new Promise((resolve,reject)=>{
    if(document.querySelector(`script[data-andina-src="${src}"]`)){resolve();return}
    const s=document.createElement('script');
    s.src='./'+src;
    s.dataset.andinaSrc=src;
    s.defer=false;
    s.onload=resolve;
    s.onerror=reject;
    document.head.appendChild(s);
  });
}
(async()=>{
  for(const src of files){
    try{await load(src)}catch(err){console.error('Andina Explora: no se pudo cargar '+src,err)}
  }
})();
})();
