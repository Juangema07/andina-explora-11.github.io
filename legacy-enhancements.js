(()=>{
'use strict';
if(window.__ANDINA_LEGACY_ENHANCEMENTS__)return;
window.__ANDINA_LEGACY_ENHANCEMENTS__=true;
const isKids=location.pathname.endsWith('/modo-ninos.html')||location.pathname.endsWith('modo-ninos.html');
if(isKids){
  const finishKidsLoader=()=>{document.body.classList.add('loaded');const loader=document.getElementById('loader');if(loader){loader.style.opacity='0';loader.style.visibility='hidden';loader.style.pointerEvents='none';}};
  const cleanDuplicateLegacy=()=>{const tags=[...document.querySelectorAll('script[src*="legacy-enhancements.js"]')];tags.slice(1).forEach(s=>s.remove());};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',cleanDuplicateLegacy,{once:true});else cleanDuplicateLegacy();

  /* La web infantil usa la misma arquitectura visual profesional que la web normal.
     Después se simplifica el texto, pero no se cambia la estructura visual. */
  const kidsFiles=[
    
    'andina-image-fix.js?v=20260913-3',
    'conecta-fix.js?v=20260913-1',
    'viaje-quality-fix.js?v=20260913-5',
    'viaje-static-threats-fix.js?v=20260913-2',
    'opinion-restore.js?v=20260914-2',
    'verified-sources.js?v=20260913-2',
    'visual-motion.js?v=20260913-1',
    'music-autoplay.js?v=20260914-9',
    'genially-desktop-fix.js?v=20260921-3',
    'site-final-fixes.js?v=20260914-6',
    'visual-content-upgrade.js?v=20260914-2',
    'territorios-upgrade.js?v=20260914-2',
    'final-mobile-ux.js?v=20260914-3',
    'section-numbering.js?v=20260914-1',
    'modo-ninos-standalone.js?v=20260920-2'
  ];
  function loadKids(src){return new Promise((resolve,reject)=>{if(document.querySelector(`script[data-andina-kids-src="${src}"]`)){resolve();return}const s=document.createElement('script');s.src='./'+src;s.dataset.andinaKidsSrc=src;s.async=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
  function addKidsCss(){if(document.querySelector('link[data-andina-kids-css]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='./modo-ninos.css?v=20260920-1';l.dataset.andinaKidsCss='1';document.head.appendChild(l)}
  async function startKids(){
    addKidsCss();
    for(const src of kidsFiles){try{await loadKids(src)}catch(err){console.error('Andina Explora: no se pudo cargar '+src,err)}}
    setTimeout(finishKidsLoader,300);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startKids,{once:true});else startKids();
  return;
}
const files=['andina-games-fix.js?v=20260913-2','andina-image-fix.js?v=20260913-3','conecta-fix.js?v=20260913-1','viaje-quality-fix.js?v=20260913-5','viaje-static-threats-fix.js?v=20260913-2','professional-final.js?v=20260913-1','professional-expansion.js?v=20260914-3','opinion-restore.js?v=20260914-2','verified-sources.js?v=20260913-2','visual-motion.js?v=20260913-1','music-autoplay.js?v=20260914-9','genially-desktop-fix.js?v=20260914-1','site-final-fixes.js?v=20260914-6','visual-content-upgrade.js?v=20260914-2','territorios-upgrade.js?v=20260914-2','final-mobile-ux.js?v=20260914-3','section-numbering.js?v=20260914-1','guia-cobertura-andina.js?v=20260916-1','modo-ninos.js?v=20260916-4'];
function load(src){return new Promise((resolve,reject)=>{if(document.querySelector(`script[data-andina-src="${src}"]`)){resolve();return}const s=document.createElement('script');s.src='./'+src;s.dataset.andinaSrc=src;s.async=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
function addCss(href,key){if(document.querySelector(`link[data-andina-css="${key}"]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.dataset.andinaCss=key;document.head.appendChild(l)}
function loadCss(){addCss('./site-final-fixes.css?v=20260914-6','final');addCss('./visual-content-upgrade.css?v=20260914-3','visual');addCss('./territorios-upgrade.css?v=20260914-2','territories');addCss('./ux-fixes.css?v=20260914-3','ux');addCss('./mobile-theme-fix.css?v=20260914-3','mobile-theme');addCss('./guia-cobertura-andina.css?v=20260916-1','guide-coverage');addCss('./hero-montanas-reales.css?v=20260916-2','hero-mountains');addCss('./modo-ninos.css?v=20260916-4','modo-ninos')}
function replaceHeroMountains(){const art=document.querySelector('.hero-art');if(!art)return;art.querySelectorAll('.mountain').forEach(el=>el.remove());let img=art.querySelector('img.hero-real-mountains');if(!img){img=document.createElement('img');img.className='hero-real-mountains';img.src='./file_00000000bff081f69e70d37ed24e7686.png?v=20260916-2';img.alt='Cordilleras verdes de la Región Andina';img.decoding='async';img.loading='eager';art.insertBefore(img,art.firstChild)}}
function scheduleHeroReplace(){replaceHeroMountains();[250,800,1800,3500].forEach(ms=>setTimeout(replaceHeroMountains,ms))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scheduleHeroReplace,{once:true});else scheduleHeroReplace();
(async()=>{loadCss();for(const src of files){try{await load(src)}catch(err){console.error('Andina Explora: no se pudo cargar '+src,err)}}})();
})();