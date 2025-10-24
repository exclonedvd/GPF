const CACHE = 'quizsim-v2';
const CORE = [
  './',
  './index.html',
  './print.html',
  './manifest.json',
  './logo.jpg',
  './data/difesa.json',
  './data/combad.json',
  './data/ws3.json'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  // Runtime caching for JSON & images
  if(url.pathname.includes('/data/') || url.pathname.includes('/imags/')){
    e.respondWith(
      fetch(e.request).then(r=>{
        const copy = r.clone();
        caches.open(CACHE).then(c=>c.put(e.request, copy));
        return r;
      }).catch(()=>caches.match(e.request))
    );
    return;
  }
  // Default cache-first
  e.respondWith(caches.match(e.request).then(r=>r || fetch(e.request)));
});