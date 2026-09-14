(()=>{
'use strict';
const files=['andina-games-fix.js?v=20260913-2','andina-image-fix.js?v=20260913-3','conecta-fix.js?v=20260913-1','viaje-quality-fix.js?v=20260913-5','viaje-static-threats-fix.js?v=20260913-2','professional-final.js?v=20260913-1','professional-expansion.js?v=20260914-2','opinion-restore.js?v=20260914-1','verified-sources.js?v=20260913-1','visual-motion.js?v=20260913-1','music-autoplay.js?v=20260914-8','genially-desktop-fix.js?v=20260913-2','site-final-fixes.js?v=20260914-3','visual-content-upgrade.js?v=20260914-1','territorios-upgrade.js?v=20260914-2','final-mobile-ux.js?v=20260914-2'];
function load(src){return new Promise((resolve,reject)=>{if(document.querySelector(`script[data-andina-src="${src}"]`)){resolve();return}const s=document.createElement('script');s.src='./'+src;s.dataset.andinaSrc=src;s.defer=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
function addCss(href,key){if(document.querySelector(`link[data-andina-css="${key}"]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.dataset.andinaCss=key;document.head.appendChild(l)}
function loadCss(){addCss('./site-final-fixes.css?v=20260914-4','final');addCss('./visual-content-upgrade.css?v=20260914-1','visual');addCss('./territorios-upgrade.css?v=20260914-1','territories');addCss('./ux-fixes.css?v=20260914-2','ux');addCss('./mobile-theme-fix.css?v=20260914-2','mobile-theme')}
(async()=>{loadCss();for(const src of files){try{await load(src)}catch(err){console.error('Andina Explora: no se pudo cargar '+src,err)}}})();
})();
