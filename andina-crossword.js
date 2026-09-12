(()=>{
'use strict';
const $=s=>document.querySelector(s);

function build(){
  const host=$('#juegos');
  if(!host||document.querySelector('#proCrossword'))return;

  const placements=[
    ['MAGDALENA',7,2,'H','Río asociado al gran valle interandino oriental.'],
    ['PARAMO',6,6,'V','Ecosistema de alta montaña fundamental para la regulación del agua.'],
    ['ANDES',6,9,'V','Sistema montañoso que da nombre a la región.'],
    ['CAUCA',6,8,'H','Río que recorre uno de los principales valles interandinos.'],
    ['CAFE',6,11,'H','Producto agrícola emblemático de varias zonas de la región.'],
    ['CONDOR',6,11,'V','Ave emblemática de los Andes.'],
    ['BOGOTA',9,1,'H','Capital ubicada en el altiplano de la Cordillera Oriental.']
  ];
  const H=15,W=15,cells=new Map();
  const wrap=document.createElement('section');
  wrap.id='proCrossword';
  wrap.className='pro-crossword-wrap';
  wrap.innerHTML=`
    <div class="pro-cross-title">Crucigrama · Región Andina</div>
    <p class="pro-crossword-intro tiny">Un crucigrama clásico: las casillas negras separan las palabras y las respuestas se cruzan. Escribe una letra por casilla y usa las pistas.</p>
    <div class="pro-cross-board"><div class="pro-cross-grid" aria-label="Crucigrama interactivo"></div></div>
    <div class="pro-clues"><div><h4>Horizontales</h4><ol id="proH"></ol></div><div><h4>Verticales</h4><ol id="proV"></ol></div></div>
    <button id="proCheckCross" class="small-btn">Comprobar respuestas</button>
    <span id="proCrossMsg" class="tiny" aria-live="polite"></span>`;
  host.appendChild(wrap);

  const grid=wrap.querySelector('.pro-cross-grid');
  placements.forEach(([word,r,c,d])=>{
    for(let k=0;k<word.length;k++){
      const rr=r+(d==='V'?k:0),cc=c+(d==='H'?k:0),key=rr+','+cc;
      if(rr<0||cc<0||rr>=H||cc>=W)continue;
      if(!cells.has(key))cells.set(key,{r:rr,c:cc,letters:[],starts:[]});
      cells.get(key).letters.push(word[k]);
    }
    const key=r+','+c;
    if(cells.has(key))cells.get(key).starts.push(d);
  });

  const startKeys=[...cells.entries()].filter(([,v])=>v.starts.length).map(([key])=>key).sort((a,b)=>{
    const [ar,ac]=a.split(',').map(Number),[br,bc]=b.split(',').map(Number);return ar-br||ac-bc;
  });
  const numbers=new Map(startKeys.map((key,i)=>[key,i+1]));

  for(let r=0;r<H;r++)for(let c=0;c<W;c++){
    const key=r+','+c;
    const cell=document.createElement('div');cell.className='cell';
    const data=cells.get(key);
    if(data){
      const n=numbers.get(key);
      if(n){const s=document.createElement('span');s.className='num';s.textContent=n;cell.appendChild(s)}
      const input=document.createElement('input');
      input.maxLength=1;input.inputMode='text';input.autocomplete='off';input.dataset.key=key;
      input.setAttribute('aria-label',`Casilla ${n||''}`.trim());
      input.addEventListener('input',()=>{
        input.value=input.value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-ZÑ]/g,'').slice(0,1);
        if(input.value){const all=[...grid.querySelectorAll('input')],idx=all.indexOf(input);all[idx+1]?.focus()}
      });
      input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value){const all=[...grid.querySelectorAll('input')],idx=all.indexOf(input);all[idx-1]?.focus()}});
      cell.appendChild(input);
    }else cell.classList.add('block');
    grid.appendChild(cell);
  }

  placements.forEach(([word,r,c,d,clue])=>{
    const li=document.createElement('li');
    li.textContent=clue;
    const n=numbers.get(r+','+c);
    li.dataset.number=n||'';
    li.value=n||0;
    const target=d==='H'?$('#proH',wrap):$('#proV',wrap);
    if(target)target.appendChild(li);
  });

  const check=$('#proCheckCross',wrap),msg=$('#proCrossMsg',wrap);
  check?.addEventListener('click',()=>{
    let correct=0,total=0;
    const unique=new Map();
    placements.forEach(([word,r,c,d])=>{
      for(let k=0;k<word.length;k++){
        const rr=r+(d==='V'?k:0),cc=c+(d==='H'?k:0),key=rr+','+cc;
        if(!unique.has(key))unique.set(key,word[k]);
      }
    });
    unique.forEach((letter,key)=>{
      const input=grid.querySelector(`input[data-key="${key}"]`);total++;
      const good=input&&input.value.toUpperCase()===letter;
      if(good){correct++;input.parentElement.classList.add('correct');input.parentElement.classList.remove('wrong')}
      else if(input?.value){input.parentElement.classList.add('wrong');input.parentElement.classList.remove('correct')}
    });
    if(msg)msg.textContent=correct===total?`¡Crucigrama completo! ${correct}/${total} casillas correctas.`:`${correct}/${total} casillas correctas. Revisa las pistas y las casillas marcadas.`;
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();
