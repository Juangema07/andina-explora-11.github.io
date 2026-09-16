(()=>{
'use strict';
const A='./assets/andina/';
const cityImages={
 'Bogotá D.C.':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Panorama_bogotá.jpg',src:'https://commons.wikimedia.org/wiki/File:Panorama_bogotá.jpg',credit:'HaHa Calabacita · Wikimedia Commons · CC BY-SA 4.0'},
 'Medellín':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Medellín_Panorámica.jpg',src:'https://commons.wikimedia.org/wiki/File:Medellín_Panorámica.jpg',credit:'Carlos Andres Granada · Wikimedia Commons · CC BY-SA 4.0'},
 'Cali':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Panoramic_Cali_Col.jpg',src:'https://commons.wikimedia.org/wiki/File:Panoramic_Cali_Col.jpg',credit:'Aleko · Wikimedia Commons · CC BY-SA 3.0'},
 'Bucaramanga':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/PanoramaBucaramanga.jpg',src:'https://commons.wikimedia.org/wiki/File:PanoramaBucaramanga.jpg',credit:'padasama27 · Wikimedia Commons'},
 'Cúcuta':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cúcuta_Panorámica.jpg',src:'https://commons.wikimedia.org/wiki/File:Cúcuta_Panorámica.jpg',credit:'D1090 · Wikimedia Commons · CC BY-SA 4.0'},
 'Manizales':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Manizales-panorama.jpg',src:'https://commons.wikimedia.org/wiki/File:Manizales-panorama.jpg',credit:'Julian Choquette · Wikimedia Commons · CC BY-SA 3.0'},
 'Pereira':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pereira_Vista_panorámica.JPG',src:'https://commons.wikimedia.org/wiki/File:Pereira_Vista_panorámica.JPG',credit:'Alfredo Bianco Geymet · Wikimedia Commons · dominio público'},
 'Armenia':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Armenia_Quindío,_Colombia._-_panoramio.jpg',src:'https://commons.wikimedia.org/wiki/File:Armenia_Quindío,_Colombia._-_panoramio.jpg',credit:'Jimmy Gómez N · Wikimedia Commons · CC BY-SA 3.0'},
 'Ibagué':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Panorama_Ibague.JPG',src:'https://commons.wikimedia.org/wiki/File:Panorama_Ibague.JPG',credit:'Duvanlopupa · Wikimedia Commons · CC BY-SA 4.0'},
 'Neiva':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neiva_panoramica.jpg',src:'https://commons.wikimedia.org/wiki/File:Neiva_panoramica.jpg',credit:'Martovar69 · Wikimedia Commons · CC BY-SA 4.0'},
 'Popayán':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Popayan_-_panoramio.jpg',src:'https://commons.wikimedia.org/wiki/File:Popayan_-_panoramio.jpg',credit:'Yender Sanchez · Wikimedia Commons · CC BY-SA 3.0'},
 'Tunja':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Panorámica_Centro_Tunja.JPG',src:'https://commons.wikimedia.org/wiki/File:Panorámica_Centro_Tunja.JPG',credit:'Petruss · Wikimedia Commons · dominio público'},
 'Pasto':{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Panoramica_de_Pasto_-_panoramio.jpg',src:'https://commons.wikimedia.org/wiki/File:Panoramica_de_Pasto_-_panoramio.jpg',credit:'Carlos A. Revelo Ris… · Wikimedia Commons · CC BY-SA 3.0'}
};
function style(){if(document.getElementById('visual-assets-polish-css'))return;const s=document.createElement('style');s.id='visual-assets-polish-css';s.textContent=`
/* Ciudad: foto real individual + crédito */
.territory-complete .andina-expand-card{overflow:hidden;position:relative}
.territory-complete .city-thumb{display:block;position:relative;width:100%;height:118px;margin:-2px 0 13px;border-radius:15px;overflow:hidden;background:#dfe5df}
.territory-complete .city-thumb img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .45s ease,filter .35s ease}
.territory-complete .andina-expand-card:hover .city-thumb img{transform:scale(1.045);filter:saturate(1.06)}
.territory-complete .city-thumb small{position:absolute;left:8px;right:8px;bottom:7px;color:#fff;font-size:.58rem;line-height:1.2;text-shadow:0 1px 4px #000;opacity:.95}
.territory-complete .aec-icon{font-size:1.35rem}.territory-complete .city-thumb + .aec-title{display:block}
/* Hero: fotografía real en lugar de montañas dibujadas */
.hero-art.real-mountains-replaced{overflow:hidden}
.hero-art.real-mountains-replaced::before{content:"";position:absolute;inset:8% 0 0;background-image:linear-gradient(180deg,#0a1e1640 0%,#0a1e1630 45%,#071712b8 100%),url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/WLE2026_CO_-_P%C3%A1ramo_de_Guerrero_bajo_nubes_%2895%29.jpg/1280px-WLE2026_CO_-_P%C3%A1ramo_de_Guerrero_bajo_nubes_%2895%29.jpg');background-size:cover;background-position:center 58%;border-radius:28px;box-shadow:0 22px 60px #0003;opacity:.96;transform:scale(1.01)}
.hero-art.real-mountains-replaced .coffee-doodle,.hero-art.real-mountains-replaced .frailejon-doodle{z-index:3}
/* Assets flotantes */
.andina-floating{position:absolute;z-index:4;pointer-events:none;user-select:none;filter:drop-shadow(0 10px 14px #0002);animation:andinaFloat 6s ease-in-out infinite}
.andina-floating img{display:block;width:100%;height:100%;object-fit:contain}
.andina-float-cafe{width:118px;height:118px;right:2%;bottom:-32px;animation-delay:-1s}
.andina-float-beans{width:82px;height:82px;left:-16px;top:22%;animation-delay:-3s}
.andina-float-bird{width:90px;height:90px;right:1%;top:18%;animation-delay:-4s}
.andina-float-frailejon{width:112px;height:112px;left:-18px;bottom:-25px;animation-delay:-2s}
.andina-float-tree{width:100px;height:100px;right:-8px;bottom:-26px;animation-delay:-5s}
.andina-float-cafe2{width:90px;height:90px;left:1%;top:34%;animation-delay:-2.5s}
@keyframes andinaFloat{0%,100%{transform:translate3d(0,0,0) rotate(-2deg)}50%{transform:translate3d(0,-10px,0) rotate(2deg)}}
#floating-andina-assets{position:relative;z-index:3;height:0;pointer-events:none}
@media(max-width:760px){.territory-complete .city-thumb{height:82px}.andina-floating{opacity:.72}.andina-float-beans,.andina-float-bird,.andina-float-tree{display:none}.andina-float-cafe{width:76px;height:76px;right:2%;bottom:-22px}.andina-float-frailejon{width:76px;height:76px;left:-8px;bottom:-18px}.andina-float-cafe2{width:66px;height:66px;left:0;top:40%}.hero-art.real-mountains-replaced::before{inset:13% 0 0;background-position:center 55%}}
@media(prefers-reduced-motion:reduce){.andina-floating{animation:none}.territory-complete .city-thumb img{transition:none}}
`;document.head.appendChild(s)}
function cityCardImages(){document.querySelectorAll('.territory-complete .andina-expand-card').forEach(card=>{const title=card.querySelector('.aec-title')?.textContent.trim();const d=cityImages[title];if(!d||card.dataset.cityPhoto==='1')return;card.dataset.cityPhoto='1';const old=card.querySelector('.aec-icon');if(old)old.remove();const figure=document.createElement('span');figure.className='city-thumb external-city';figure.innerHTML=`<img loading="lazy" decoding="async" src="${d.img}" alt="Fotografía de ${title}"><small>Foto: ${d.credit} · <a href="${d.src}" target="_blank" rel="noopener" onclick="event.stopPropagation()">fuente</a></small>`;card.insertBefore(figure,card.firstChild)})}
function floating(){if(document.getElementById('floating-andina-assets'))return;const targets=[
 ['inicio','coffee_plant.png','andina-float-cafe','Mata de café'],
 ['fisica','paramo.png','andina-float-frailejon','Paisaje de páramo'],
 ['economia','coffee_beans.png','andina-float-beans','Granos de café'],
 ['cultura','hummingbird.png','andina-float-bird','Colibrí'],
 ['desafios','tree_01.png','andina-float-tree','Árbol'],
 ['economia','coffee_sack.png','andina-float-cafe2','Saco de café']
 ];const wrap=document.createElement('div');wrap.id='floating-andina-assets';targets.forEach(([id,file,cls,alt])=>{const sec=document.getElementById(id);if(!sec)return;sec.style.position=sec.style.position||'relative';const span=document.createElement('span');span.className=`andina-floating ${cls}`;span.innerHTML=`<img src="${A}${file}" alt="" aria-hidden="true" title="${alt}">`;sec.appendChild(span)});document.body.appendChild(wrap)}
function heroCaption(){const art=document.querySelector('.hero-art');if(!art||art.querySelector('.real-mountain-credit'))return;const c=document.createElement('small');c.className='real-mountain-credit';c.textContent='Foto de Páramo de Guerrero · Wikimedia Commons · CC BY-SA 4.0';c.style.cssText='position:absolute;right:14px;bottom:10px;z-index:5;color:#fff;font-size:.58rem;text-shadow:0 1px 4px #000';art.appendChild(c)}
function run(){style();cityCardImages();floating();heroCaption();setTimeout(cityCardImages,900);setTimeout(floating,1200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,2400),{once:true});else setTimeout(run,2400);
new MutationObserver(()=>{cityCardImages();floating()}).observe(document.body,{childList:true,subtree:true});
})();
