(()=>{
const $=s=>document.querySelector(s);
function build(){
  const host=$('#juegos');
  if(!host||document.querySelector('#proCrossword'))return;
  const words=[
    ['ANDES','Cordillera que atraviesa el occidente de Sudamérica y se divide en tres ramales en Colombia.','H'],
    ['PARAMO','Ecosistema de alta montaña fundamental para la regulación del agua.','V'],
    ['CAUCA','Río que recorre uno de los principales valles interandinos.','H'],
    ['CAFE','Producto agrícola emblemático de varias zonas de la región.','V'],
    ['BOGOTA','Capital ubicada en el altiplano de la Cordillera Oriental.','H'],
    ['CONDOR','Ave emblemática de los Andes.','V'],
    ['MAGDALENA','Río asociado al gran valle interandino oriental.','H']
  ];
  const wrap=document.createElement('section');
  wrap.id='proCrossword';
  wrap.className='pro-crossword-wrap';
  wrap.innerHTML='<div class="pro-cross-title">Crucigrama · Región Andina</div><p class="tiny">Completa las palabras usando las pistas. Los números indican dónde comienza cada respuesta.</p><div class="pro-cross-grid" aria-label="Crucigrama interactivo"></div><div class="pro-clues"><div><h4>Horizontales</h4><ol id="proH"></ol></div><div><h4>Verticales</h4><ol id="proV"></ol></div></div><button id="proCheckCross" class="small-btn">Comprobar respuestas</button> <span id="proCrossMsg" class="tiny"></span>';
  host.appendChild(wrap);

  const grid=wrap.querySelector('.pro-cross-grid');
  const H=16,W=16,cells=new Map();
  // Layout with compatible intersections: CAFE crosses CAUCA at C and CONDOR crosses CAUCA at C.
  const placements=[
    ['ANDES',1,8,'H'],
    ['PARAMO',1,1,'V'],
    ['CAUCA',6,3,'H'],
    ['CAFE',6,3,'V'],
    ['CONDOR',6,6,'V'],
    ['BOGOTA',10,3,'H'],
    ['MAGDALENA',13,2,'H']
  ];

  placements.forEach(([word,r,c,d])=>{
    for(let k=0;k<word.length;k++){
      const rr=r+(d==='V'?k:0),cc=c+(d==='H'?k:0);
      if(rr>=H||cc>=W)continue;
      const key=rr+','+cc;
      if(!cells.has(key))cells.set(key,{r:rr,c:cc,letters:[],num:null});
      cells.get(key).letters.push(word[k]);
    }
  });

  const starts=new Map();
  placements.forEach(([word,r,c,d])=>{
    const key=r+','+c;
    if(!starts.has(key))starts.set(key,[]);
    starts.get(key).push(d);
  });
  const numberMap=new Map([...starts.keys()].sort((a,b)=>{
    const [ar,ac]=a.split(',').map(Number),[br,bc]=b.split(',').map(Number);
    return ar-br||ac-bc;
  }).map((key,i)=>[key,i+1]));

  for(let r=0;r<H;r++)for(let c=0;c<W;c++){
    const key=r+','+c;
    const cell=document.createElement('div');
    cell.className='cell';
    if(cells.has(key)){
      const n=numberMap.get(key);
      if(n){
        const s=document.createElement('span');
        s.className='num';
        s.textContent=n;
        cell.appendChild(s);
        cells.get(key).num=n;
      }
      const input=document.createElement('input');
      input.maxLength=1;
      input.inputMode='text';
      input.autocomplete='off';
      input.dataset.key=key;
      input.setAttribute('aria-label',`Casilla ${n||''}`.trim());
      input.addEventListener('input',()=>{input.value=input.value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÜÑ]/g,'').slice(0,1)});
      cell.appendChild(input);
    }else{
      cell.classList.add('block');
    }
    grid.appendChild(cell);
  }

  const clues={
    ANDES:'Cordillera que da nombre a la región.',
    PARAMO:'Ecosistema de alta montaña que ayuda a regular el agua.',
    CAUCA:'Río que recorre uno de los principales valles interandinos.',
    CAFE:'Producto agrícola emblemático de varias zonas de la región.',
    BOGOTA:'Capital ubicada en el altiplano de la Cordillera Oriental.',
    CONDOR:'Ave emblemática de los Andes.',
    MAGDALENA:'Río asociado al gran valle interandino oriental.'
  };
  placements.forEach(([word,r,c,d])=>{
    const key=r+','+c;
    const n=numberMap.get(key);
    const li=document.createElement('li');
    li.value=n;
    li.textContent=`${word.length} letras — ${clues[word]}`;
    const target=d==='H'?$('#proH'):$('#proV');
    if(target)target.appendChild(li);
  });

  const check=$('#proCheckCross'),msg=$('#proCrossMsg');
  if(check)check.onclick=()=>{
    let ok=0,total=0;
    placements.forEach(([word,r,c,d])=>{
      for(let k=0;k<word.length;k++){
        const key=(r+(d==='V'?k:0))+','+(c+(d==='H'?k:0));
        const input=grid.querySelector(`input[data-key="${key}"]`);
        total++;
        if(input&&input.value.toUpperCase()===word[k])ok++;
      }
    });
    if(msg)msg.textContent=ok===total?'¡Excelente! Crucigrama completo.':`${ok}/${total} letras correctas. Revisa las pistas.`;
  };
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
