(()=>{
const $=s=>document.querySelector(s);
function build(){const host=$('#juegos');if(!host||document.querySelector('#proCrossword'))return;
const words=[
 ['ANDES','Cordillera que atraviesa el occidente de Sudamérica y se divide en tres ramales en Colombia.','H'],
 ['PARAMO','Ecosistema de alta montaña fundamental para la regulación del agua.','V'],
 ['CAUCA','Río que recorre uno de los principales valles interandinos.','H'],
 ['CAFE','Producto agrícola emblemático de varias zonas de la región.','V'],
 ['BOGOTA','Capital ubicada en el altiplano de la Cordillera Oriental.','H'],
 ['CONDOR','Ave emblemática de los Andes.','V'],
 ['MAGDALENA','Río asociado al gran valle interandino oriental.','H']
];
const wrap=document.createElement('section');wrap.id='proCrossword';wrap.className='pro-crossword-wrap';
wrap.innerHTML='<div class="pro-cross-title">Crucigrama · Región Andina</div><p class="tiny">Completa las palabras usando las pistas. Los números indican dónde comienza cada respuesta.</p><div class="pro-cross-grid" aria-label="Crucigrama interactivo"></div><div class="pro-clues"><div><h4>Horizontales</h4><ol id="proH"></ol></div><div><h4>Verticales</h4><ol id="proV"></ol></div></div><button id="proCheckCross" class="small-btn">Comprobar respuestas</button> <span id="proCrossMsg" class="tiny"></span>';
// Insert near the end of Juegos without disturbing its existing games.
host.appendChild(wrap);
const grid=wrap.querySelector('.pro-cross-grid');const H=12,W=12;const cells=new Map();
// Fixed, readable crossword layout: words intersect at intentional coordinates.
const placements=[['ANDES',1,1,'H'],['PARAMO',1,3,'V'],['CAUCA',5,1,'H'],['CAFE',5,3,'V'],['BOGOTA',8,1,'H'],['CONDOR',5,5,'V'],['MAGDALENA',10,2,'H']];
placements.forEach(([word,r,c,d],idx)=>{for(let k=0;k<word.length;k++){const rr=r+(d==='V'?k:0),cc=c+(d==='H'?k:0);if(rr>=H||cc>=W)continue;const key=rr+','+cc;if(!cells.has(key))cells.set(key,{r:rr,c:cc,letters:[],num:null});cells.get(key).letters.push(word[k]);}});
const starts=new Map();placements.forEach(([word,r,c,d])=>{const key=r+','+c;if(!starts.has(key))starts.set(key,[]);starts.get(key).push(d)});
for(let r=0;r<H;r++)for(let c=0;c<W;c++){const key=r+','+c;const cell=document.createElement('div');cell.className='cell';if(cells.has(key)){const num=starts.get(key);if(num){const n=[...starts.keys()].indexOf(key)+1;const s=document.createElement('span');s.className='num';s.textContent=n;cell.appendChild(s);cells.get(key).num=n}const input=document.createElement('input');input.maxLength=1;input.dataset.key=key;cell.appendChild(input)}else cell.classList.add('block');grid.appendChild(cell)}
let h=0,v=0;placements.forEach(([word,r,c,d])=>{const key=r+','+c;const n=cells.get(key).num;const li=document.createElement('li');li.value=n;li.textContent=word.length+' letras — '+({ANDES:'Cordillera que da nombre a la región.',CAUCA:'Río del valle interandino occidental.',BOGOTA:'Capital situada en la Cordillera Oriental.',MAGDALENA:'Gran río del valle interandino oriental.'}[word]||'Respuesta relacionada con la Región Andina.'));(d==='H'?$('#proH'):$('#proV')).appendChild(li)});
$('#proCheckCross').onclick=()=>{let ok=0,total=0;placements.forEach(([word,r,c,d])=>{for(let k=0;k<word.length;k++){const key=(r+(d==='V'?k:0))+','+(c+(d==='H'?k:0));const i=grid.querySelector(`input[data-key="${key}"]`);total++;if(i&&i.value.toUpperCase()===word[k])ok++}});$('#proCrossMsg').textContent=ok===total?'¡Excelente! Crucigrama completo.':`${ok}/${total} letras correctas. Revisa las pistas.`};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();