(()=>{
'use strict';
// Puente de compatibilidad: este archivo ya no crea un segundo menú.
// Sí garantiza que las tres experiencias nuevas estén disponibles.
if(window.__ANDINA_OTHER_GAMES_LOADED__) return;
window.__ANDINA_OTHER_GAMES_LOADED__=true;
const s=document.createElement('script');
s.src='./otros-juegos.js?v=20260913-2';
s.defer=true;
document.head.appendChild(s);
})();