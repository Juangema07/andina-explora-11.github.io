(()=>{
'use strict';
const STYLE='genially-desktop-fix-style';
function addStyle(){if(document.getElementById(STYLE))return;const s=document.createElement('style');s.id=STYLE;s.textContent=`
/* Viaje Andino: assets controlados para escritorio y móvil */
#gamePanel .travel2-mini .t2-item.viaje-asset{width:58px!important;height:58px!important;max-width:58px!important;max-height:58px!important;min-width:0!important;min-height:0!important}
#gamePanel .travel2-mini .t2-item.viaje-asset img{width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important}
#gamePanel .travel2-mini .t2-drag.viaje-asset{width:72px!important;height:62px!important;max-width:72px!important;max-height:62px!important}
#gamePanel .travel2-mini .t2-drag.viaje-asset img{width:100%!important;height:100%!important;object-fit:contain!important}
#gamePanel .travel2-train.viaje-train{width:112px!important;height:50px!important}
#gamePanel .travel2-stop.station.viaje-station{width:58px!important;height:58px!important}
.andina-desktop-tip{margin:18px auto 0;max-width:1100px;border:1px solid #dced9260;background:linear-gradient(135deg,#173e32,#245443);color:#fff;border-radius:18px;padding:14px 18px;display:flex;gap:12px;align-items:center;box-shadow:0 10px 30px #0002}.andina-desktop-tip strong{color:#dced92}.andina-desktop-tip span{opacity:.88;line-height:1.4}
.genially-wrap{max-width:1150px;margin:22px auto 0;background:#fff;border-radius:22px;padding:10px;box-shadow:0 18px 45px #0002}.genially-frame{display:block;width:100%;height:min(72vw,680px);min-height:430px;border:0;border-radius:15px;background:#eef3ed}.genially-fallback{padding:14px;text-align:center;font-size:.9rem;color:#35564a}.genially-fallback a{font-weight:800;color:#173e32}
@media(max-width:600px){#gamePanel .travel2-mini .t2-item.viaje-asset{width:44px!important;height:44px!important;max-width:44px!important;max-height:44px!important}#gamePanel .travel2-mini .t2-drag.viaje-asset{width:60px!important;height:52px!important;max-width:60px!important;max-height:52px!important}.andina-desktop-tip{margin:14px 10px;padding:12px 14px}.genially-wrap{margin:16px 10px;padding:6px}.genially-frame{height:72vh;min-height:500px}}
`;
document.head.appendChild(s)}
function add(){
 addStyle();
 const main=document.querySelector('main'),games=document.querySelector('#juegos');
 if(!main||!games||document.querySelector('#infografia-genially'))return;
 const sec=document.createElement('section');sec.id='infografia-genially';sec.className='pro-section';sec.innerHTML=`<div class="pro-heading"><span class="pro-kicker">INFOGRAFÍA INTERACTIVA</span><h2>Explora la Región Andina <em>de forma visual</em></h2><p>Recorre esta infografía interactiva para descubrir sus principales características y conexiones.</p></div><div class="genially-wrap"><iframe class="genially-frame" src="https://view.genially.com/5f6a1e6bf1ba0a0d16ddb51f" title="Infografía interactiva de la Región Andina" allowfullscreen loading="lazy"></iframe><div class="genially-fallback">Si tu navegador no muestra la infografía, puedes abrirla directamente desde <a href="https://view.genially.com/5f6a1e6bf1ba0a0d16ddb51f" target="_blank" rel="noopener">este enlace</a>.</div></div><div class="andina-desktop-tip"><b>💻</b><span><strong>Recomendación:</strong> para una experiencia más completa, especialmente en los juegos y la infografía, recomendamos usar el <strong>modo escritorio</strong> o una pantalla más grande.</span></div>`;main.insertBefore(sec,games);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(add,500),{once:true});else setTimeout(add,500);
})();