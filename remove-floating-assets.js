(()=>{
'use strict';
const SELECTORS='.andina-v2-float,.andina-float-asset,[data-andina-asset="1"]';
function remove(){document.querySelectorAll(SELECTORS).forEach(el=>el.remove())}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',remove,{once:true});else remove();
new MutationObserver(remove).observe(document.documentElement,{childList:true,subtree:true});
})();
