(()=>{
'use strict';
const DETAILS={
 'Agua para consumo y actividades económicas':'Los ecosistemas de montaña almacenan, regulan y liberan agua que sostiene el consumo humano, la agricultura, la ganadería y otras actividades. La disponibilidad cambia según el clima, la altura, el estado de las cuencas y el uso del territorio.',
 'Frailejonales, humedales y lagunas':'Los frailejonales, humedales y lagunas son ambientes de alta montaña relacionados con la regulación del agua y con hábitats para distintas especies. Su conservación ayuda a mantener procesos ecológicos importantes.',
 'Conservación y manejo sostenible':'Conservar no significa dejar de usar el territorio: implica planificar las actividades para reducir daños, proteger ecosistemas y mantener sus funciones a largo plazo.',
 'Cuencas':'Una cuenca reúne el territorio que drena hacia un mismo sistema de aguas. Lo que ocurre en las partes altas puede afectar la cantidad y calidad del agua río abajo.',
 'Ríos':'Los ríos conectan zonas altas, valles y ciudades. Además de transportar agua, forman parte de ecosistemas y de actividades humanas como consumo, agricultura, generación de energía y turismo.',
 'Comunidades':'Las comunidades rurales y urbanas dependen del agua y participan en su manejo. Las decisiones sobre el territorio pueden afectar de forma diferente a distintos grupos.',
 'Bosques':'Los bosques andinos ayudan a conservar suelos, agua y biodiversidad. También son hábitat de numerosas especies adaptadas a las montañas.',
 'Población':'La población andina se concentra en grandes ciudades, corredores urbanos y valles, mientras que también existen numerosos municipios rurales. La distribución se relaciona con relieve, empleo, servicios y vías de comunicación.',
 'Agua':'Los ecosistemas de montaña cumplen funciones importantes para la regulación hídrica. El agua conecta ecosistemas, poblaciones y actividades económicas.',
 'Vida':'La diversidad de alturas y ambientes permite la presencia de numerosas especies y comunidades vegetales.',
 'Clima':'La altitud influye en la temperatura y, junto con otros factores, ayuda a explicar los diferentes pisos térmicos y tipos de vegetación.',
 'Agricultura':'La producción agrícola cambia según altura, clima, suelos y disponibilidad de agua. En la región se encuentran cultivos como café, papa, maíz, flores, frutas y caña.',
 'Turismo':'El turismo puede relacionarse con naturaleza, patrimonio, gastronomía, café, ciudades y paisajes de alta montaña. Su manejo debe considerar la capacidad de los ecosistemas y las comunidades locales.'
};
const GENERIC='Este bloque contiene una idea breve. Tócalo para ampliar la explicación y relacionarla con el territorio, las personas, la economía o los ecosistemas de la Región Andina.';
function detailFor(el){const text=(el.textContent||'').replace(/\s+/g,' ').trim();for(const [key,value] of Object.entries(DETAILS)){if(text===key||text.includes(key))return value;}return GENERIC}
function enhance(){
 document.querySelectorAll('.mission-panel .pill,.mission-panel .tag,.mission-panel .chip,.mission-panel .badge,.mission-panel [class*="pill"],.mission-panel [class*="chip"]').forEach(el=>make(el));
 document.querySelectorAll('.mini-facts > div,.visual-facts > article,.illustration-row .doodle-card,.product-strip .product,.info-cards > button,.culture-grid > button,.challenge-grid > button,.media-grid > article').forEach(el=>make(el));
}
function make(el){
 if(el.dataset.expandSmall==='1'||!el.textContent.trim())return;
 if(el.closest('#gameArena'))return;
 el.dataset.expandSmall='1';el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-expanded','false');el.classList.add('small-expandable');
 const detail=document.createElement('div');detail.className='small-expand-detail';detail.textContent=detailFor(el);el.appendChild(detail);
 const hint=document.createElement('span');hint.className='small-expand-hint';hint.textContent='Toca para ampliar';el.appendChild(hint);
 const toggle=()=>{const open=el.classList.toggle('small-expanded');el.setAttribute('aria-expanded',String(open));hint.textContent=open?'Toca para cerrar':'Toca para ampliar'};
 el.addEventListener('click',e=>{if(e.target.closest('a,button,textarea,input,select'))return;toggle()});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
}
function style(){if(document.getElementById('small-expandable-css'))return;const s=document.createElement('style');s.id='small-expandable-css';s.textContent=`
.small-expandable{cursor:pointer!important;position:relative;transition:transform .22s ease,background .22s ease,box-shadow .22s ease!important}
.small-expandable:hover{transform:translateY(-2px)}
.small-expandable:focus-visible{outline:2px solid #e6c36a;outline-offset:3px}
.small-expand-detail{display:grid;grid-template-rows:0fr;opacity:0;overflow:hidden;max-height:0;transition:grid-template-rows .3s ease,opacity .25s ease,max-height .35s ease;margin-top:0;text-align:left;font-size:.92rem;line-height:1.55}
.small-expand-detail::before{content:'';min-height:0}
.small-expanded{transform:none!important}
.small-expanded .small-expand-detail{grid-template-rows:1fr;opacity:.9;max-height:240px;margin-top:12px;padding-top:12px;border-top:1px solid currentColor}
.small-expand-hint{display:block;font-size:.72rem;opacity:.55;margin-top:8px;letter-spacing:.02em}
.small-expanded .small-expand-hint{opacity:.75}
.mini-facts > div.small-expanded,.visual-facts > article.small-expanded,.illustration-row .doodle-card.small-expanded,.product-strip .product.small-expanded,.info-cards > button.small-expanded,.culture-grid > button.small-expanded,.challenge-grid > button.small-expanded,.media-grid > article.small-expanded{z-index:5;box-shadow:0 14px 35px #0003}
@media(max-width:760px){.small-expand-detail{font-size:.86rem}.small-expanded .small-expand-detail{max-height:300px}}
`;document.head.appendChild(s)}
function run(){style();enhance()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,900),{once:true});else setTimeout(run,900);
new MutationObserver(()=>enhance()).observe(document.body,{childList:true,subtree:true});
})();