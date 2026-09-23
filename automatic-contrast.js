(()=>{'use strict';

/*
 * ANDINA EXPLORA — CONTRASTE AUTOMÁTICO
 * Detecta la luminosidad real de la fotografía de cada sección y usa
 * únicamente blanco o negro para el texto. Se actualiza al cambiar
 * de tema, al redimensionar y mientras el fondo fotográfico se mueve.
 *
 * Fuentes y Opinión quedan fuera deliberadamente.
 */

const EXCLUDED=new Set(['fuentes','opinion','recursos']);
const TEXT_SELECTOR=[
  'h1','h2','h3','h4','h5','h6','p','li','small','strong','b',
  '.eyebrow','.section-head>p','.pro-heading p','.andina-learning-intro'
].join(',');

const style=document.createElement('style');
style.id='automatic-contrast-runtime';
style.textContent=`
  .auto-contrast-light,
  .auto-contrast-light *{
    --auto-contrast:#fff!important;
    --auto-contrast-muted:#f1f1f1!important;
  }
  .auto-contrast-dark,
  .auto-contrast-dark *{
    --auto-contrast:#000!important;
    --auto-contrast-muted:#222!important;
  }

  /* Solo se aplican a elementos marcados por el detector. */
  [data-auto-contrast="light"]{color:#fff!important;}
  [data-auto-contrast="light"] *{color:#fff!important;}
  [data-auto-contrast="dark"]{color:#000!important;}
  [data-auto-contrast="dark"] *{color:#000!important;}

  /* Los elementos que tienen un fondo propio son evaluados individualmente. */
  [data-auto-contrast-skip]{text-shadow:none!important;}
`;
document.head.appendChild(style);

const canvas=document.createElement('canvas');
const ctx=canvas.getContext('2d',{willReadFrequently:true});
const cache=new Map();

function excluded(section){
  if(!section)return true;
  if(EXCLUDED.has(section.id))return true;
  return !!section.closest('#fuentes,#opinion,#recursos');
}

function luminance(r,g,b){
  // Relativa aproximada, suficiente para separar claramente claro/oscuro.
  return (0.2126*r+0.7152*g+0.0722*b)/255;
}

function rgbaColor(value){
  const m=value.match(/rgba?\\(([^)]+)\\)/i);
  if(!m)return null;
  const p=m[1].split(',').map(x=>parseFloat(x.trim()));
  if(p.length<3)return null;
  const a=p.length>3?p[3]:1;
  if(a<0.82)return null;
  return {r:p[0],g:p[1],b:p[2],a};
}

function imageUrl(value){
  if(!value||value==='none')return null;
  const m=value.match(/url\\((['"]?)(.*?)\\1\\)/i);
  return m?m[2]:null;
}

async function loadImage(url){
  if(cache.has(url))return cache.get(url);
  const p=new Promise(resolve=>{
    const im=new Image();
    im.onload=()=>resolve(im);
    im.onerror=()=>resolve(null);
    im.src=url;
  });
  cache.set(url,p);
  return p;
}

function sampleImage(im, points){
  if(!im||!im.naturalWidth||!im.naturalHeight)return null;
  const max=900;
  const scale=Math.min(1,max/im.naturalWidth);
  canvas.width=Math.max(1,Math.round(im.naturalWidth*scale));
  canvas.height=Math.max(1,Math.round(im.naturalHeight*scale));
  ctx.drawImage(im,0,0,canvas.width,canvas.height);

  const vals=[];
  for(const pt of points){
    const x=Math.max(0,Math.min(canvas.width-1,Math.round(pt.x*canvas.width)));
    const y=Math.max(0,Math.min(canvas.height-1,Math.round(pt.y*canvas.height)));
    const d=ctx.getImageData(x,y,1,1).data;
    vals.push(luminance(d[0],d[1],d[2]));
  }
  vals.sort((a,b)=>a-b);
  return vals[Math.floor(vals.length/2)]??null;
}

function localPoints(el){
  const r=el.getBoundingClientRect();
  const s=el.closest('[data-dynamic-bg="1"]');
  if(!s)return null;
  const sr=s.getBoundingClientRect();
  if(!sr.width||!sr.height)return null;

  const cx=Math.max(0,Math.min(sr.width,(r.left+r.width/2)-sr.left));
  const cy=Math.max(0,Math.min(sr.height,(r.top+r.height/2)-sr.top));
  const dx=Math.max(8,Math.min(r.width*.32,sr.width*.12));
  const dy=Math.max(8,Math.min(r.height*.45,sr.height*.12));

  return [
    {x:cx-dx,y:cy-dy},{x:cx,y:cy-dy},{x:cx+dx,y:cy-dy},
    {x:cx-dx,y:cy},{x:cx,y:cy},{x:cx+dx,y:cy},
    {x:cx-dx,y:cy+dy},{x:cx,y:cy+dy},{x:cx+dx,y:cy+dy}
  ].map(p=>({x:Math.max(0,Math.min(sr.width,p.x)),y:Math.max(0,Math.min(sr.height,p.y))}));
}

function imageLumaAt(im, section, points){
  if(!im||!im.naturalWidth||!im.naturalHeight||!points?.length)return null;
  const sr=section.getBoundingClientRect();
  const sw=Math.max(1,sr.width), sh=Math.max(1,sr.height);
  const iw=im.naturalWidth, ih=im.naturalHeight;

  // background-size: cover + centrado, que es la base del fondo dinámico.
  const scale=Math.max(sw/iw,sh/ih);
  const rw=iw*scale, rh=ih*scale;
  const cropX=(rw-sw)/2, cropY=(rh-sh)/2;

  const normalized=points.map(p=>({
    x:((p.x+cropX)/scale)/iw,
    y:((p.y+cropY)/scale)/ih
  }));
  return sampleImage(im,normalized);
}

async function sectionBackgroundLuma(section){
  const url=imageUrl(getComputedStyle(section).getPropertyValue('--dyn-bg'));
  if(!url)return null;
  const im=await loadImage(url);
  if(!im)return null;

  const pts=[];
  for(let y=.08;y<=.92;y+=.21)for(let x=.08;x<=.92;x+=.21){
    const r=section.getBoundingClientRect();
    pts.push({x:x*r.width,y:y*r.height});
  }
  let l=imageLumaAt(im,section,pts);
  if(l===null)return null;

  const theme=document.documentElement.dataset.theme||'andino';
  if(theme==='noche')l=l*.36;
  else if(theme==='papel')l=Math.min(1,l*.76+.24);
  else l=Math.min(1,l*.82+.18);
  return l;
}

async function elementPhotoLuma(el,section){
  const url=imageUrl(getComputedStyle(section).getPropertyValue('--dyn-bg'));
  if(!url)return null;
  const im=await loadImage(url);
  if(!im)return null;

  let l=imageLumaAt(im,section,localPoints(el));
  if(l===null)return null;

  const theme=document.documentElement.dataset.theme||'andino';
  if(theme==='noche')l=l*.36;
  else if(theme==='papel')l=Math.min(1,l*.76+.24);
  else l=Math.min(1,l*.82+.18);
  return l;
}

function nearestSolidBackground(el,section){
  let node=el;
  while(node&&node!==section&&node!==document.body){
    const cs=getComputedStyle(node);
    const bg=rgbaColor(cs.backgroundColor);
    if(bg)return luminance(bg.r,bg.g,bg.b);
    node=node.parentElement;
  }
  return null;
}

function setContrast(el,luma){
  if(luma===null||Number.isNaN(luma))return;
  // Punto medio con pequeña zona de seguridad.
  const mode=luma>=.56?'dark':'light';
  el.dataset.autoContrast=mode;
  el.classList.remove('auto-contrast-dark','auto-contrast-light');
  el.classList.add(mode==='dark'?'auto-contrast-dark':'auto-contrast-light');
}

async function scanSection(section){
  if(excluded(section))return;
  section.dataset.dynamicBg='1';
  const baseLuma=await sectionBackgroundLuma(section);

  const elements=[...section.querySelectorAll(TEXT_SELECTOR)].filter(el=>{
    if(excluded(el))return false;
    if(el.closest('[data-auto-contrast-skip]'))return false;
    if(el.matches('button,input,textarea,select,option'))return false;
    return el.getBoundingClientRect().width>0&&el.getBoundingClientRect().height>0;
  });

  for(const el of elements){
    // Si el elemento/tarjeta tiene color de fondo propio, usarlo.
    let luma=nearestSolidBackground(el,section);

    // Si no tiene fondo propio, analizar justo la zona de la fotografía
    // que queda detrás del texto; si no se puede, usar el promedio de sección.
    if(luma===null)luma=await elementPhotoLuma(el,section);
    if(luma===null)luma=baseLuma;
    if(luma!==null)setContrast(el,luma);
  }
}

let timer=0;
async function scan(){
  cancelAnimationFrame(timer);
  timer=requestAnimationFrame(async()=>{
    const sections=[...document.querySelectorAll('section')].filter(s=>getComputedStyle(s).getPropertyValue('--dyn-bg').trim()||s.matches('.pro-games,#andina-learning'));
    await Promise.all(sections.map(scanSection));
  });
}

function observe(){
  scan();
  window.addEventListener('resize',()=>scan(),{passive:true});
  window.addEventListener('scroll',()=>{
    // El fondo se mueve lentamente; actualizamos con poca frecuencia.
    if(!observe._scroll){observe._scroll=true;setTimeout(()=>{observe._scroll=false;scan()},220)}
  },{passive:true});

  const theme=document.querySelector('#theme');
  theme?.addEventListener('change',()=>setTimeout(scan,40));

  new MutationObserver(()=>setTimeout(scan,80))
    .observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

  setInterval(scan,1400);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe,{once:true});
else observe();

})();