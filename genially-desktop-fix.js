(()=>{
'use strict';
const STYLE='genially-desktop-fix-style';
function addStyle(){
  if(document.getElementById(STYLE))return;
  const s=document.createElement('style');s.id=STYLE;s.textContent=`
#gamePanel .travel2-mini .t2-item.viaje-asset{width:58px!important;height:58px!important;max-width:58px!important;max-height:58px!important;min-width:0!important;min-height:0!important}
#gamePanel .travel2-mini .t2-item.viaje-asset img{width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important}
#gamePanel .travel2-mini .t2-drag.viaje-asset{width:72px!important;height:62px!important;max-width:72px!important;max-height:62px!important}
#gamePanel .travel2-mini .t2-drag.viaje-asset img{width:100%!important;height:100%!important;object-fit:contain!important}
#gamePanel .travel2-train.viaje-train{width:112px!important;height:50px!important}
#gamePanel .travel2-stop.station.viaje-station{width:58px!important;height:58px!important}
.andina-desktop-tip{margin:18px auto 0;max-width:1100px;border:1px solid #dced9260;background:linear-gradient(135deg,#173e32,#245443);color:#fff;border-radius:18px;padding:14px 18px;display:flex;gap:12px;align-items:center;box-shadow:0 10px 30px #0002}.andina-desktop-tip strong{color:#dced92}.andina-desktop-tip span{opacity:.88;line-height:1.4}
.genially-wrap,.slides-wrap{max-width:1150px;margin:22px auto 0;background:#fff;border-radius:22px;padding:10px;box-shadow:0 18px 45px #0002}.genially-frame,.slides-frame{display:block;width:100%;height:min(72vw,680px);min-height:430px;border:0;border-radius:15px;background:#eef3ed}.genially-fallback,.slides-fallback{padding:14px;text-align:center;font-size:.9rem;color:#35564a}.genially-fallback a,.slides-fallback a{font-weight:800;color:#173e32}
#infografia-genially,#diapositivas-andina{scroll-margin-top:80px}.quick-access{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.quick-access a{display:inline-flex;align-items:center;gap:7px;text-decoration:none}
@media(max-width:600px){#gamePanel .travel2-mini .t2-item.viaje-asset{width:44px!important;height:44px!important;max-width:44px!important;max-height:44px!important}#gamePanel .travel2-mini .t2-drag.viaje-asset{width:60px!important;height:52px!important;max-width:60px!important;max-height:52px!important}.andina-desktop-tip{margin:14px 10px;padding:12px 14px}.genially-wrap,.slides-wrap{margin:16px 10px;padding:6px}.genially-frame{height:72vh;min-height:500px}.slides-frame{height:78vh;min-height:520px}}
`;
  document.head.appendChild(s);
}
function navLink(nav,id,label){if(!nav||nav.querySelector(`a[href="#${id}"]`))return;const a=document.createElement('a');a.href='#'+id;a.textContent=label;nav.appendChild(a)}
function addQuickAccess(){const actions=document.querySelector('.hero .actions');if(!actions||actions.querySelector('.quick-access'))return;const box=document.createElement('div');box.className='quick-access';box.innerHTML=`<a class="btn ghost" href="#infografia-genially">▣ Infografía Genially</a><a class="btn ghost" href="#diapositivas-andina">▶ Diapositivas</a>`;actions.appendChild(box)}
function reorderSections(main){const wanted=['fisica','humana','economia','cultura','desafios','infografia-genially','diapositivas-andina','juegos','productos','recursos'];const nodes={};wanted.forEach(id=>{const el=document.getElementById(id);if(el)nodes[id]=el});const anchor=document.querySelector('.intro.band');if(!anchor)return;let cursor=anchor;wanted.forEach(id=>{const el=nodes[id];if(!el)return;if(el.previousElementSibling!==cursor)cursor.insertAdjacentElement('afterend',el);cursor=el})}
function add(){
  addStyle();
  const main=document.querySelector('main');const games=document.querySelector('#juegos');if(!main)return;
  let genially=document.querySelector('#infografia-genially');
  if(!genially){
    genially=document.createElement('section');genially.id='infografia-genially';genially.className='pro-section';
    genially.innerHTML=`<div class="pro-heading"><span class="pro-kicker">INFOGRAFÍA INTERACTIVA</span><h2>Explora la Región Andina <em>de forma visual</em></h2><p>Recorre esta infografía interactiva para descubrir sus principales características y conexiones.</p></div><div class="genially-wrap"><iframe class="genially-frame" src="https://view.genially.com/5f6a1e6bf1ba0a0d16ddb51f" title="Infografía interactiva de la Región Andina" allowfullscreen loading="lazy"></iframe><div class="genially-fallback">Si tu navegador no muestra la infografía, puedes abrirla directamente desde <a href="https://view.genially.com/5f6a1e6bf1ba0a0d16ddb51f" target="_blank" rel="noopener">este enlace</a>.</div></div><div class="andina-desktop-tip"><b>💻</b><span><strong>Recomendación:</strong> para una experiencia más completa, especialmente en los juegos y la infografía, recomendamos usar el <strong>modo escritorio</strong> o una pantalla más grande.</span></div>`;
    if(games)main.insertBefore(genially,games);else main.appendChild(genially);
  }
  let slides=document.querySelector('#diapositivas-andina');
  if(!slides){
    slides=document.createElement('section');slides.id='diapositivas-andina';slides.className='pro-section';
    slides.innerHTML=`<div class="pro-heading"><span class="pro-kicker">PRESENTACIÓN INTERACTIVA</span><h2>Del paisaje a la mesa: <em>el viaje de un producto andino</em></h2><p>Una presentación breve y dinámica que conecta territorio, producción, comercio y cultura sin sobrecargar la pantalla.</p></div><div class="slides-wrap"><iframe class="slides-frame" src="./diapositivas-andina.html" title="Diapositivas interactivas sobre la Región Andina" allowfullscreen loading="lazy"></iframe><div class="slides-fallback">Si no se muestra dentro de la página, puedes abrir las <a href="./diapositivas-andina.html" target="_blank" rel="noopener">diapositivas en pantalla completa</a>.</div></div>`;
    genially.insertAdjacentElement('afterend',slides);
  }
  const nav=document.querySelector('#navLinks');navLink(nav,'infografia-genially','Infografía');navLink(nav,'diapositivas-andina','Diapositivas');addQuickAccess();reorderSections(main);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(add,650),{once:true});else setTimeout(add,650);
new MutationObserver(()=>{if(document.querySelector('#infografia-genially')&&document.querySelector('#diapositivas-andina'))reorderSections(document.querySelector('main'))}).observe(document.body,{childList:true,subtree:true});
})();
