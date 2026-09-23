(()=>{'use strict';

/*
 * ANDINA EXPLORA — CONTRASTE AUTOMÁTICO v2
 * Ligero: analiza el fondo solo al cargar, cambiar de tema o redimensionar.
 * No hace escaneos periódicos ni durante el scroll.
 * Fuentes, Opinión y Recursos quedan fuera.
 */

const EXCLUDED=new Set(['fuentes','opinion','recursos']);
const TEXT_SELECTOR='h1,h2,h3,h4,h5,h6,p,li,small,strong,b,.eyebrow,.section-head>p,.pro-heading p,.andina-learning-intro';
const imageCache=new Map();
let scanTimer=0;
let scanRunning=false;

const style=document.createElement('style');
style.id='automatic-contrast-runtime';
style.textContent=`
[data-auto-contrast="light"]{color:#fff!important}
[data-auto-contrast="dark"]{color:#000!important}
`;
document.head.appendChild(style);

function excluded(el){
  if(!el)return true;
  if(EXCLUDED.has(el.id))return true;
  return !!el.closest('#fuentes,#opinion,#recursos');
}

function rgba(value){
  const m=value&&value.match(/rgba?\\(([^)]+)\\)/i);
  if(!m)return null;
  const p=m[1].split(',').map(v=>parseFloat(v.trim()));
  if(p.length<3)return null;
  return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};
}

function lum(r,g,b){return(0.2126*r+0.7152*g+0.0722*b)/255}

function imageUrl(value){
  if(!value||value==='none')return null;
  const m=value.match(/url\\(([\\'"]?)(.*?)\\1\\)/i);
  return m?m[2]:null;
}

function loadImage(url){
  if(imageCache.has(url))return imageCache.get(url);
  const p=new Promise(resolve=>{
    const im=new Image();
    im.decoding='async';
    im.onload=()=>resolve(im);
    im.onerror=()=>resolve(null);
    im.src=url;
  });
  imageCache.set(url,p);
  return p;
}

const canvas=document.createElement('canvas');
const ctx=canvas.getContext('2d',{willReadFrequently:true});

function imageLuma(im,points){
  if(!im||!im.naturalWidth||!im.naturalHeight)return null;
  const max=720;
  const scale=Math.min(1,max/im.naturalWidth);
  canvas.width=Math.max(1,Math.round(im.naturalWidth*scale));
  canvas.height=Math.max(1,Math.round(im.naturalHeight*scale));
  ctx.drawImage(im,0,0,canvas.width,canvas.height);
  const values=[];
  for(const p of points){
    const x=Math.max(0,Math.min(canvas.width-1,Math.round(p.x*(canvas.width-1))));
    const y=Math.max(0,Math.min(canvas.height-1,Math.round(p.y*(canvas.height-1))));
    const d=ctx.getImageData(x,y,1,1).data;
    values.push(lum(d[0],d[1],d[2]));
  }
  values.sort((a,b)=>a-b);
  return values[Math.floor(values.length/2)]??null;
}

function localPoints(el,box){
  const r=el.getBoundingClientRect(), br=box.getBoundingClientRect();
  if(!br.width||!br.height)return[{x:.5,y:.5}];
  const x=Math.max(0,Math.min(1,(r.left+r.width/2-br.left)/br.width));
  const y=Math.max(0,Math.min(1,(r.top+r.height/2-br.top)/br.height));
  const dx=Math.min(.12,Math.max(.025,r.width/br.width*.22));
  const dy=Math.min(.12,Math.max(.025,r.height/br.height*.28));
  return[
    {x:x-dx,y:y-dy},{x:x,y:y-dy},{x:x+dx,y:y-dy},
    {x:x-dx,y:y},{x:x,y:y},{x:x+dx,y:y},
    {x:x-dx,y:y+dy},{x:x,y:y+dy},{x:x+dx,y:y+dy}
  ].map(p=>({x:Math.max(0,Math.min(1,p.x)),y:Math.max(0,Math.min(1,p.y))}));
}

function findBackgroundOwner(el,section){
  let node=el;
  while(node&&node!==document.body){
    const cs=getComputedStyle(node);
    const bg=rgba(cs.backgroundColor);
    if(bg&&bg.a>=.88)return{type:'solid',luma:lum(bg.r,bg.g,bg.b)};
    const url=imageUrl(cs.backgroundImage);
    if(url)return{type:'image',url,box:node};
    if(node===section)break;
    node=node.parentElement;
  }
  const scs=getComputedStyle(section);
  const dyn=imageUrl(scs.getPropertyValue('--dyn-bg'))||imageUrl(scs.getPropertyValue('--bg-photo'));
  return dyn?{type:'section-image',url:dyn,box:section}:null;
}

function overlayAdjusted(l,section){
  if(l===null)return null;
  const cs=getComputedStyle(section);
  const top=rgba(cs.getPropertyValue('--dyn-overlay-top'));
  const bottom=rgba(cs.getPropertyValue('--dyn-overlay-bottom'));
  if(top&&bottom){
    const o=(top.a+bottom.a)/2;
    const c={
      r:(top.r+bottom.r)/2,
      g:(top.g+bottom.g)/2,
      b:(top.b+bottom.b)/2
    };
    const overlayLum=lum(c.r,c.g,c.b);
    l=l*(1-o)+overlayLum*o;
  }
  return l;
}

async function lumaFor(el,section){
  const owner=findBackgroundOwner(el,section);
  if(!owner)return null;
  if(owner.type==='solid')return owner.luma;
  const im=await loadImage(owner.url);
  if(!im)return null;
  let l=imageLuma(im,localPoints(el,owner.box));
  if(owner.type==='section-image')l=overlayAdjusted(l,section);
  return l;
}

function setContrast(el,l){
  if(l===null||Number.isNaN(l))return;
  const mode=l>=.56?'dark':'light';
  if(el.dataset.autoContrast!==mode)el.dataset.autoContrast=mode;
}

async function scanSection(section){
  if(excluded(section))return;
  const elements=[...section.querySelectorAll(TEXT_SELECTOR)].filter(el=>{
    if(excluded(el)||el.closest('[data-auto-contrast-skip]'))return false;
    if(el.matches('button,input,textarea,select,option'))return false;
    const r=el.getBoundingClientRect();
    return r.width>0&&r.height>0;
  });
  await Promise.all(elements.map(async el=>{
    const l=await lumaFor(el,section);
    if(l!==null)setContrast(el,l);
  }));
}

async function scan(){
  if(scanRunning)return;
  scanRunning=true;
  try{
    const sections=[...document.querySelectorAll('section')].filter(s=>{
      const cs=getComputedStyle(s);
      return cs.getPropertyValue('--dyn-bg').trim()||
             cs.getPropertyValue('--bg-photo').trim()||
             s.matches('.pro-games,#andina-learning');
    });
    for(const section of sections)await scanSection(section);
  }finally{scanRunning=false}
}

function schedule(){
  clearTimeout(scanTimer);
  scanTimer=setTimeout(()=>scan(),120);
}

function observe(){
  schedule();
  window.addEventListener('resize',schedule,{passive:true});
  document.querySelector('#theme')?.addEventListener('change',()=>setTimeout(schedule,80));
  new MutationObserver(schedule).observe(document.documentElement,{
    attributes:true,attributeFilter:['data-theme']
  });
  // Los bloques profesionales se crean después de cargar la página.
  setTimeout(schedule,1200);
  setTimeout(schedule,2800);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe,{once:true});
else observe();

})();