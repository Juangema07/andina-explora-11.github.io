(()=>{
'use strict';
function place(){
 const block=document.querySelector('#territorio-completo');
 const economy=document.querySelector('#economia');
 if(!block||!economy||block.dataset.placed==='1')return;
 const strip=economy.querySelector('.product-strip');
 if(strip&&strip.parentNode===economy){strip.insertAdjacentElement('afterend',block);block.dataset.placed='1';}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(place,2600),{once:true});else setTimeout(place,2600);
new MutationObserver(place).observe(document.body,{childList:true,subtree:true});
})();
