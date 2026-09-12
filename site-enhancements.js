(() => {
  const STORAGE = 'andina-explora-settings-v1';
  const defaults = { theme: 'andino', font: 100, musicMode: 'list', autoplay: false };
  const state = { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE) || '{}') };

  const css = `
  #ae-player{position:fixed;left:18px;right:18px;bottom:18px;z-index:1000;max-width:760px;margin:auto;background:rgba(22,39,31,.96);color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:14px 16px;box-shadow:0 20px 55px rgba(0,0,0,.28);backdrop-filter:blur(16px)}
  #ae-player .ae-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}#ae-player button,#ae-settings button{font:inherit;border:0;cursor:pointer}#ae-player button{background:rgba(255,255,255,.12);color:#fff;border-radius:12px;padding:9px 11px}#ae-player button:hover{background:rgba(255,255,255,.2)}
  #ae-player .ae-title{font-weight:850;min-width:150px;flex:1}.ae-range{width:100%;accent-color:#9bc17d}.ae-select{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:7px}.ae-select option{color:#222}
  #ae-settings-btn{position:fixed;right:18px;top:82px;z-index:990;width:46px;height:46px;border-radius:50%;background:#2f6b4f;color:white;box-shadow:0 10px 30px rgba(0,0,0,.18)}
  #ae-settings{position:fixed;inset:0;z-index:1100;display:none;align-items:flex-start;justify-content:flex-end;background:rgba(10,20,15,.45);backdrop-filter:blur(5px)}#ae-settings.open{display:flex}#ae-panel{width:min(390px,94vw);height:100%;overflow:auto;background:var(--surface,#fffdf8);padding:28px;box-shadow:-20px 0 60px rgba(0,0,0,.18)}#ae-panel h2{margin-top:0}.ae-setting{padding:18px 0;border-bottom:1px solid var(--line,#dfe4db)}.ae-setting label{display:block;font-weight:800;margin-bottom:8px}.ae-setting select,.ae-setting input{width:100%;padding:10px;border-radius:10px;border:1px solid #ccd5ca;background:transparent;color:inherit}.ae-close{float:right;font-size:1.5rem;background:transparent;color:inherit}.ae-help{font-size:.86rem;color:var(--muted,#68746d)}
  .ae-upload{display:inline-flex;align-items:center;gap:8px;background:#c98b48!important;color:#fff!important}.ae-upload input{display:none}.ae-track-list{display:flex;gap:6px;overflow:auto;margin-top:8px}.ae-track{white-space:nowrap;font-size:.8rem!important}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const player = document.createElement('div'); player.id='ae-player'; player.innerHTML = `
    <div class="ae-row"><span>🎵</span><span class="ae-title" id="ae-title">Cargando música…</span><button id="ae-prev">⏮</button><button id="ae-play">▶</button><button id="ae-next">⏭</button><button id="ae-mode">🔁</button><label class="ae-upload">＋ MP3<input id="ae-files" type="file" accept="audio/mpeg,audio/mp3" multiple></label></div>
    <div class="ae-row"><input id="ae-progress" class="ae-range" type="range" min="0" max="100" value="0"><span id="ae-time">0:00</span><select id="ae-volume" class="ae-select"><option value="1">🔊 100%</option><option value=".75">🔊 75%</option><option value=".5">🔉 50%</option><option value=".25">🔈 25%</option></select></div>
    <div class="ae-track-list" id="ae-track-list"></div><audio id="ae-audio" preload="metadata"></audio>`;
  document.body.appendChild(player);

  const settings = document.createElement('div'); settings.id='ae-settings'; settings.innerHTML=`<aside id="ae-panel"><button class="ae-close" id="ae-close">✕</button><h2>⚙️ Personalización</h2><p class="ae-help">Estos ajustes se guardan solo en este dispositivo.</p>
    <div class="ae-setting"><label for="ae-theme">Tema principal</label><select id="ae-theme"><option value="andino">Andino · verde y tierra</option><option value="noche">Noche · montaña</option><option value="claro">Claro · papel</option><option value="bosque">Bosque · naturaleza</option></select></div>
    <div class="ae-setting"><label for="ae-font">Tamaño de letras <span id="ae-font-value">100%</span></label><input id="ae-font" type="range" min="85" max="125" value="100"></div>
    <div class="ae-setting"><label for="ae-autoplay">Reproducción al entrar</label><select id="ae-autoplay"><option value="false">No iniciar automáticamente</option><option value="true">Intentar iniciar automáticamente</option></select><p class="ae-help">Los navegadores pueden bloquear el autoplay con sonido hasta que el usuario interactúe.</p></div>
    <div class="ae-setting"><label for="ae-repeat">Modo de reproducción</label><select id="ae-repeat"><option value="list">Lista completa · una vez</option><option value="repeat-list">Lista · repetir</option><option value="one">Una pista · repetir</option></select></div>
    <div class="ae-setting"><b>🎧 Música temporal</b><p class="ae-help">Puedes añadir MP3 desde tu dispositivo. No se suben a la web y desaparecen al cerrar esta sesión/pestaña.</p></div></aside>`;
  document.body.appendChild(settings);
  const gear=document.createElement('button'); gear.id='ae-settings-btn'; gear.textContent='⚙️'; gear.title='Ajustes'; document.body.appendChild(gear);

  const audio=document.querySelector('#ae-audio'), title=document.querySelector('#ae-title'), list=document.querySelector('#ae-track-list');
  let tracks=[], index=0, objectUrls=[];
  const modeLabel=()=> state.musicMode==='repeat-list'?'🔁':state.musicMode==='one'?'🔂':'➡️';

  function render(){list.innerHTML=''; tracks.forEach((t,i)=>{const b=document.createElement('button');b.className='ae-track';b.textContent=(i===index?'● ':'')+t.title;b.onclick=()=>load(i,true);list.appendChild(b)});document.querySelector('#ae-mode').textContent=modeLabel();}
  function load(i,play=false){if(!tracks.length)return;index=(i+tracks.length)%tracks.length;audio.src=tracks[index].src;title.textContent=tracks[index].title;audio.currentTime=0;render();if(play)audio.play().catch(()=>{});}
  function addFiles(files){for(const f of files){if(f.type==='audio/mpeg'||f.name.toLowerCase().endsWith('.mp3')){const url=URL.createObjectURL(f);objectUrls.push(url);tracks.push({title:f.name.replace(/\.mp3$/i,'').replace(/[_-]+/g,' '),src:url,temp:true});}}if(tracks.length&&!audio.src)load(0,false);else render();}
  document.querySelector('#ae-play').onclick=()=>{if(!tracks.length)return;audio.paused?audio.play().catch(()=>{}):audio.pause()};
  audio.addEventListener('play',()=>document.querySelector('#ae-play').textContent='⏸');audio.addEventListener('pause',()=>document.querySelector('#ae-play').textContent='▶');
  document.querySelector('#ae-prev').onclick=()=>load(index-1,true);document.querySelector('#ae-next').onclick=()=>load(index+1,true);
  document.querySelector('#ae-mode').onclick=()=>{state.musicMode=state.musicMode==='list'?'repeat-list':state.musicMode==='repeat-list'?'one':'list';save();render()};
  audio.addEventListener('ended',()=>{if(state.musicMode==='one'){load(index,true);return}if(index<tracks.length-1){load(index+1,true)}else if(state.musicMode==='repeat-list'){load(0,true)}});
  audio.addEventListener('timeupdate',()=>{if(audio.duration)document.querySelector('#ae-progress').value=audio.currentTime/audio.duration*100;document.querySelector('#ae-time').textContent=fmt(audio.currentTime)});
  document.querySelector('#ae-progress').oninput=e=>{if(audio.duration)audio.currentTime=audio.duration*e.target.value/100};document.querySelector('#ae-volume').onchange=e=>audio.volume=Number(e.target.value);
  document.querySelector('#ae-files').onchange=e=>addFiles(e.target.files);
  function fmt(s){s=Math.floor(s||0);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}

  async function loadCatalog(){try{const r=await fetch('music/music.json',{cache:'no-store'});const data=await r.json();const official=(data.tracks||[]).map(t=>({...t,temp:false}));tracks=[...official,...tracks];if(tracks.length)load(0,false);else title.textContent='Añade una pista MP3';}catch(e){title.textContent='Añade una pista MP3';}}

  function apply(){document.documentElement.style.fontSize=state.font+'%';const root=document.documentElement;const themes={andino:['#f7f3ea','#fffdf8','#24352d','#68746d','#3f7658','#c98b48'],noche:['#101814','#18221c','#edf4ee','#a9b7ad','#75a873','#d9a15e'],claro:['#ffffff','#ffffff','#18231d','#637069','#2d6a4f','#b77b3d'],bosque:['#eef3ea','#f8fbf5','#203126','#647269','#316044','#b8864d']};const t=themes[state.theme]||themes.andino;root.style.setProperty('--bg',t[0]);root.style.setProperty('--surface',t[1]);root.style.setProperty('--ink',t[2]);root.style.setProperty('--muted',t[3]);root.style.setProperty('--accent',t[4]);root.style.setProperty('--accent2',t[5]);document.querySelector('#ae-theme').value=state.theme;document.querySelector('#ae-font').value=state.font;document.querySelector('#ae-font-value').textContent=state.font+'%';document.querySelector('#ae-repeat').value=state.musicMode;document.querySelector('#ae-autoplay').value=String(state.autoplay)}
  function save(){localStorage.setItem(STORAGE,JSON.stringify(state));apply()}
  document.querySelector('#ae-theme').onchange=e=>{state.theme=e.target.value;save()};document.querySelector('#ae-font').oninput=e=>{state.font=Number(e.target.value);save()};document.querySelector('#ae-repeat').onchange=e=>{state.musicMode=e.target.value;save();render()};document.querySelector('#ae-autoplay').onchange=e=>{state.autoplay=e.target.value==='true';save()};
  gear.onclick=()=>settings.classList.add('open');document.querySelector('#ae-close').onclick=()=>settings.classList.remove('open');settings.onclick=e=>{if(e.target===settings)settings.classList.remove('open')};
  apply();loadCatalog();window.addEventListener('beforeunload',()=>objectUrls.forEach(URL.revokeObjectURL));
})();
