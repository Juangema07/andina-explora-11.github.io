(function(){
  const $=s=>document.querySelector(s);
  const audio=$('#audioPlayer'), select=$('#trackSelect'), toggle=$('#musicToggle'), loop=$('#musicLoop'), volume=$('#musicVolume');
  if(!audio||!select||!toggle)return;
  let tracks=[], current=0, mode=localStorage.getItem('andinaMusicMode')||'list', tempUrls=[];
  const safe=s=>String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  function labelMode(){if(loop)loop.textContent=mode==='one'?'↻ Repetir: canción':mode==='list'?'↻ Repetir: lista':'↻ Repetir: no'}
  function rebuild(){select.innerHTML='<option value="">Sin música</option>'+tracks.map((t,i)=>`<option value="${i}">${safe(t.title||t.name||('Pista '+(i+1)))}</option>`).join('');if(tracks.length)select.value=String(current)}
  function load(i,play){if(!tracks[i])return;current=i;audio.src=tracks[i].src||tracks[i].url;audio.volume=+(volume?.value||.3);select.value=String(i);if(play)audio.play().then(()=>toggle.textContent='⏸ Pausar').catch(()=>{})}
  async function catalog(){try{const r=await fetch('music/music.json?'+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;const data=await r.json();tracks=(data.tracks||[]).map(t=>({title:t.title,src:t.src}));rebuild();if(tracks.length)load(0,false)}catch(e){tracks=[];rebuild()}}
  select.onchange=e=>{if(e.target.value===''){audio.pause();audio.removeAttribute('src');toggle.textContent='▶ Reproducir';return}load(+e.target.value,true)};
  toggle.onclick=async()=>{if(!audio.src){if(tracks.length)load(current,true);return}if(audio.paused){try{await audio.play();toggle.textContent='⏸ Pausar'}catch(e){}}else{audio.pause();toggle.textContent='▶ Reproducir'}};
  if(volume)volume.oninput=e=>audio.volume=+e.target.value;
  if(loop)loop.onclick=()=>{mode=mode==='list'?'one':mode==='one'?'off':'list';localStorage.setItem('andinaMusicMode',mode);labelMode()};
  audio.onended=()=>{toggle.textContent='▶ Reproducir';if(!tracks.length)return;if(mode==='one')load(current,true);else if(mode==='list')load((current+1)%tracks.length,true)};
  const input=$('#musicFiles');
  if(input)input.onchange=e=>{[...e.target.files].forEach(f=>{const url=URL.createObjectURL(f);tempUrls.push(url);tracks.push({title:f.name,src:url})});rebuild();if(tracks.length===1)load(0,false)};
  window.addEventListener('beforeunload',()=>tempUrls.forEach(URL.revokeObjectURL));labelMode();catalog();
})();