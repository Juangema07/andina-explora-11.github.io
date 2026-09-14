(()=>{
'use strict';
if(window.__ANDINA_SITE_FINAL__)return;
window.__ANDINA_SITE_FINAL__=true;
const $=(s,r=document)=>r.querySelector(s);
function reviews(){
 const section=$('#opinion'); if(!section)return;
 const form=$('#opinionForm'); if(!form)return;
 const card=section.querySelector('.opinion-card');
 let list=section.querySelector('#opinionReviews');
 if(!list){
  list=document.createElement('div'); list.id='opinionReviews'; list.className='opinion-reviews';
  card?.appendChild(list);
 }
 const read=()=>{try{return JSON.parse(localStorage.getItem('andinaOpinions')||'[]')}catch{return[]}};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const render=()=>{
  const data=read();
  const avg=data.length?(data.reduce((a,x)=>a+Number(x.rating||0),0)/data.length).toFixed(1):'—';
  const counts=[5,4,3,2,1].map(n=>data.filter(x=>Number(x.rating)===n).length);
  list.innerHTML=`<div class="reviews-head"><div><span class="pro-kicker">OPINIONES</span><h3>Lo que dicen quienes exploraron</h3></div><div class="reviews-summary"><strong>${avg}</strong><span>★ promedio<br>${data.length} opinión${data.length===1?'':'es'}</span></div></div>${data.length?`<div class="rating-bars">${[5,4,3,2,1].map((n,i)=>`<div><span>${n} ★</span><i><b style="width:${data.length?(counts[i]/data.length*100):0}%"></b></i><small>${counts[i]}</small></div>`).join('')}</div><div class="review-list">${data.slice().reverse().map(x=>`<article><div class="review-top"><span>${'★'.repeat(Number(x.rating||0))}${'☆'.repeat(5-Number(x.rating||0))}</span><small>${esc(x.favorite||'Experiencia general')}</small></div>${x.text?`<p>${esc(x.text)}</p>`:''}</article>`).join('')}</div>`:`<div class="empty-reviews">Todavía no hay opiniones en este dispositivo. ¡Sé la primera persona en compartir una!</div>`}`;
 };
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const rating=form.querySelector('input[name="rating"]:checked')?.value||'';
  const favorite=$('#favorite')?.value||'';
  const text=$('#opinionText')?.value.trim()||'';
  if(!rating){$('#opinionStatus').textContent='Elige una calificación antes de enviar.';return}
  const data=read(); data.push({rating,favorite,text,date:Date.now()});
  localStorage.setItem('andinaOpinions',JSON.stringify(data.slice(-100)));
  $('#opinionStatus').textContent='✓ Opinión guardada. Gracias por participar.';
  form.reset(); render();
 });
 render();
}
function reorder(){
 const main=document.querySelector('main'), opinion=$('#opinion'), fuentes=$('#fuentes'), games=$('#juegos');
 if(main&&opinion){
  opinion.classList.add('opinion-last');
  if(fuentes)main.appendChild(fuentes);
  main.appendChild(opinion);
 }
 const connection=$('#como-se-conecta'); if(connection)connection.remove();
}
function phoneTip(){
 const tip=document.querySelector('.andina-desktop-tip');
 if(!tip)return;
 const update=()=>{
  const phone=window.matchMedia('(max-width: 600px)').matches && window.matchMedia('(pointer: coarse)').matches && window.matchMedia('(orientation: portrait)').matches;
  tip.hidden=!phone;
  tip.setAttribute('aria-hidden',String(!phone));
 };
 update(); window.addEventListener('resize',update,{passive:true}); window.addEventListener('orientationchange',update,{passive:true});
}
function start(){reorder();reviews();phoneTip()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(start,1100),{once:true});else setTimeout(start,1100);
})();
