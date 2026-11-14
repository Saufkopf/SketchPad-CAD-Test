// Wandgenerator: immer zuerst die aktuelle Version aus dem Netz, offline aus dem Zwischenspeicher
const CACHE='sketchpad-wg-v410';const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('sketchpad-wg-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===self.location.origin){const c2=r.clone();caches.open(CACHE).then(c=>c.put(e.request,c2))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
