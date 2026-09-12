(()=>{
'use strict';
// The main app owns navigation, details, music and games.
// This compatibility layer only loads the visual refresh layer.
const load=()=>{if(document.querySelector('link[data-andina-refresh]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='andina-refresh.css';l.dataset.andinaRefresh='true';document.head.appendChild(l);};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();