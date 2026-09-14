(()=>{
'use strict';
if(window.__ANDINA_FINAL_MOBILE_UX__)return;
window.__ANDINA_FINAL_MOBILE_UX__=true;
const css=`
/* ===== Correcciones finales móviles / ajustes ===== */
@media(max-width:700px){
  .nav{
    position:relative!important;left:8px!important;right:8px!important;width:calc(100% - 16px)!important;
    height:auto!important;min-height:58px!important;padding:8px 10px 7px!important;
    display:grid!important;grid-template-columns:minmax(0,1fr) 42px!important;
    grid-template-rows:auto auto!important;align-items:center!important;gap:6px!important;
    box-sizing:border-box!important;overflow:visible!important;
  }
  .nav .logo{grid-column:1;grid-row:1;min-width:0!important;overflow:hidden;text-overflow:ellipsis}
  .nav .icon-btn{grid-column:2;grid-row:1;width:42px!important;height:42px!important}
  .nav nav{
    grid-column:1 / -1!important;grid-row:2!important;display:flex!important;visibility:visible!important;
    width:100%!important;min-width:0!important;max-width:none!important;overflow-x:auto!important;overflow-y:hidden!important;
    flex-wrap:nowrap!important;gap:6px!important;padding:3px 1px 4px!important;margin:0!important;
    scrollbar-width:none!important;-webkit-overflow-scrolling:touch!important;
  }
  .nav nav::-webkit-scrollbar{display:none!important}
  .nav nav a{
    display:inline-flex!important;visibility:visible!important;flex:0 0 auto!important;white-space:nowrap!important;
    min-height:31px!important;padding:6px 10px!important;font-size:.69rem!important;color:#17231e!important;
    background:rgba(255,255,255,.72)!important;border:1px solid rgba(23,35,30,.10)!important;border-radius:999px!important;
  }
  .nav nav a.active{background:#173b30!important;color:#fff!important}
  .hero{padding-top:10rem!important}
}

/* Ajustes: texto y opciones siempre legibles. */
.settings,.settings *{color:#17231e!important}
.settings{background:#f8f6ef!important;border:1px solid rgba(23,35,30,.14)!important;box-shadow:0 24px 70px rgba(0,0,0,.24)!important}
.settings h2{color:#17231e!important}
.settings select,.settings select option{color:#111!important;background:#fff!important}
.settings input[type=range]{accent-color:#173b30!important}
.settings .close{color:#17231e!important;background:transparent!important}
.settings .upload{color:#17231e!important;background:rgba(23,59,48,.08)!important}

/* ===== Temas realmente visibles ===== */
html[data-theme="noche"] body{background:#07110e!important;color:#edf5ef!important}
html[data-theme="noche"] main{background:#07110e!important}
html[data-theme="noche"] main .pro-section:not(.opinion-section),html[data-theme="noche"] main .band{background:linear-gradient(145deg,#0a1814,#142a22)!important;color:#edf5ef!important}
html[data-theme="noche"] main .pro-section-dark{background:linear-gradient(145deg,#07110e,#10231c)!important;color:#edf5ef!important}
html[data-theme="noche"] .pro-stat-grid>div{background:rgba(255,255,255,.06)!important;border-color:rgba(255,255,255,.12)!important}
html[data-theme="noche"] .pro-heading h2,html[data-theme="noche"] .pro-heading p{color:#edf5ef!important}
html[data-theme="noche"] .infographic button{background:rgba(255,255,255,.08)!important;color:#edf5ef!important;border-color:rgba(255,255,255,.12)!important}

html[data-theme="papel"] body{background:#e7decc!important;color:#30291f!important}
html[data-theme="papel"] main{background:#e7decc!important}
html[data-theme="papel"] main .pro-section:not(.opinion-section){background:#eee6d6!important;color:#30291f!important}
html[data-theme="papel"] main .pro-section-dark{background:linear-gradient(145deg,#35473e,#59695d)!important;color:#fff!important}
html[data-theme="papel"] .pro-stat-grid>div{background:rgba(255,255,255,.72)!important;border-color:rgba(65,55,42,.16)!important}
html[data-theme="papel"] .pro-heading h2{color:#30291f!important}
html[data-theme="papel"] .pro-heading p{color:#4c453b!important}

/* Opinión: nunca queda en dos columnas en teléfonos y nunca se corta. */
.opinion-section{width:100%!important;box-sizing:border-box!important;min-height:0!important}
.opinion-card{box-sizing:border-box!important;width:min(1120px,100%)!important}
#opinionForm{box-sizing:border-box!important;min-width:0!important;width:100%!important}
@media(max-width:800px){
  .opinion-card{grid-template-columns:minmax(0,1fr)!important}
  .opinion-card>div:first-child,#opinionForm{width:100%!important;min-width:0!important}
}
@media(max-width:560px){
  .opinion-section{padding:3.5rem 1rem!important}
  .opinion-card{gap:1.1rem!important}
  .opinion-card h2{font-size:clamp(2.1rem,10vw,3rem)!important}
  #opinionForm{padding:1rem!important;border-radius:20px!important}
}
`;
const style=document.createElement('style');style.id='andina-final-mobile-css';style.textContent=css;document.head.appendChild(style);

function moveOpinionLast(){
 const main=document.querySelector('main'),op=document.querySelector('#opinion');
 if(main&&op)main.appendChild(op);
}
function init(){
 moveOpinionLast();
 /* La opinión puede crearse después por opinion-restore.js. */
 let tries=0;const timer=setInterval(()=>{moveOpinionLast();if(++tries>30)clearInterval(timer)},250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,900),{once:true});else setTimeout(init,900);
})();
