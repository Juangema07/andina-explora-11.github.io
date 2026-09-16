(()=>{
'use strict';
if(window.__ANDINA_LEGACY_ENHANCEMENTS__)return;
window.__ANDINA_LEGACY_ENHANCEMENTS__=true;
const isKids=location.pathname.endsWith('/modo-ninos.html')||location.pathname.endsWith('modo-ninos.html');

/* La versión infantil no necesita cargar toda la cadena pesada de la web normal.
   Esto evita que el navegador móvil quede esperando recursos y mantiene la copia infantil ligera. */
if(isKids){
  const kidsFiles=['modo-ninos.js?v=20260916-5','guia-cobertura-andina.js?v=20260916-2','modo-ninos-final.js?v=20260916-2','modo-ninos-contenido.js?v=20260916-1'];
  function loadKids(src){
    const s=document.createElement('script');
    s.src='./'+src;
    s.dataset.andinaKidsLoader='1';
    s.async=true;
    document.head.appendChild(s);
  }
  function kidsCss(){
    const l=document.createElement('link');
    l.rel='stylesheet';l.href='./modo-ninos.css?v=20260916-5';
    document.head.appendChild(l);
  }
  function replaceHero(){
    const art=document.querySelector('.hero-art');if(!art)return;
    art.querySelectorAll('.mountain').forEach(el=>el.remove());
    if(art.querySelector('img.hero-real-mountains'))return;
    const img=document.createElement('img');
    img.className='hero-real-mountains';
    img.src='./file_00000000bff081f69e70d37ed24e7686.png?v=20260916-3';
    img.alt='Cordilleras verdes de la Región Andina';
    img.decoding='async';img.loading='eager';
    art.insertBefore(img,art.firstChild);
  }
  const start=()=>{kidsCss();replaceHero();kidsFiles.forEach(loadKids);setTimeout(replaceHero,700);setTimeout(replaceHero,1800);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
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
