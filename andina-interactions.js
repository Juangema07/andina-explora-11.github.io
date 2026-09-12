(()=>{
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>[...r.querySelectorAll(s)];
if(reduced){document.documentElement.classList.add('motion-reduced');return;}

// Entrada suave por bloques: cada elemento aparece cuando realmente entra en pantalla.
const reveal=()=>{
 const els=$$('.content-section > *, .dark-section > *, .hero-copy, .hero-sticker, .story-intro > *, .credits > *');
 els.forEach((el,i)=>{el.classList.add('ix-reveal'); el.style.setProperty('--ix-delay',Math.min((i%6)*55,275)+'ms');});
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('ix-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6%'});
 els.forEach(el=>io.observe(el));
};

// Ripple al tocar botones y enlaces.
const ripple=()=>$$('button, .primary, .ghost, #proNav a').forEach(el=>el.addEventListener('pointerdown',e=>{
 const r=el.getBoundingClientRect(), s=Math.max(r.width,r.height)*1.5, x=e.clientX-r.left-s/2, y=e.clientY-r.top-s/2;
 const wave=document.createElement('i'); wave.className='ix-ripple'; wave.style.width=wave.style.height=s+'px'; wave.style.left=x+'px'; wave.style.top=y+'px'; el.appendChild(wave); setTimeout(()=>wave.remove(),550);
}));

// Tarjetas con profundidad al mover el puntero. En pantallas táctiles se desactiva.
const tilt=()=>{if(!matchMedia('(pointer:fine)').matches)return; $$('.geo-card,.people-number,.city-panel,.human-cards article,.econ-card,.culture-photo,.explore-grid article,.challenge-card,.game-card,.visual-banner').forEach(card=>{
 card.classList.add('ix-tilt');
 card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-4px)`});
 card.addEventListener('pointerleave',()=>{card.style.transform=''});
});};

// Destello de cursor muy sutil para dar sensación de profundidad.
const cursor=()=>{if(!matchMedia('(pointer:fine)').matches)return;const dot=document.createElement('div');dot.className='ix-cursor';document.body.appendChild(dot);let tx=0,ty=0,x=0,y=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const loop=()=>{x+=(tx-x)*.16;y+=(ty-y)*.16;dot.style.transform=`translate3d(${x}px,${y}px,0)`;requestAnimationFrame(loop)};loop();};

// Barra de progreso con marca visual de secciones.
const progress=()=>{const bar=document.createElement('div');bar.className='ix-scroll-progress';bar.innerHTML='<span></span>';document.body.appendChild(bar);const fill=$('span',bar);addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;fill.style.width=(max?scrollY/max*100:0)+'%'},{passive:true});};

// Navegación: al pulsar un acceso, centra la sección y mantiene la barra accesible.
const nav=()=>$$('#proNav a').forEach(a=>a.addEventListener('click',()=>{const id=a.getAttribute('href');const target=$(id);if(target){setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),0)}}));

// Atajos de teclado para usuarios de computador.
const keyboard=()=>addEventListener('keydown',e=>{if(e.altKey&&!e.ctrlKey){const links=$$('#proNav a');const k=Number(e.key);if(k>=1&&k<=links.length){e.preventDefault();links[k-1].click();}}});

reveal();ripple();tilt();cursor();progress();nav();keyboard();
})();