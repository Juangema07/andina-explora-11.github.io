(()=>{
'use strict';
const load=()=>{
 if(!document.querySelector('link[data-andina-refresh]')){const l=document.createElement('link');l.rel='stylesheet';l.href='andina-refresh.css';l.dataset.andinaRefresh='true';document.head.appendChild(l)}
 if(!document.querySelector('script[data-andina-refresh-js]')){const s=document.createElement('script');s.src='andina-refresh.js';s.defer=true;s.dataset.andinaRefreshJs='true';document.body.appendChild(s)}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();