const CACHE='andina-explora-static-v3';
const STATIC_EXT=/\.(?:css|js|png|jpg|jpeg|webp|svg|woff2?|mp3)$/i;
self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
    return;
  }
  if(!STATIC_EXT.test(url.pathname))return;
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    const network=fetch(req).then(res=>{if(res.ok)return caches.open(CACHE).then(c=>{c.put(req,res.clone());return res});return res}).catch(()=>cached);
    return cached||network;
  })());
});