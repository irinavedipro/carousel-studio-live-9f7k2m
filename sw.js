const CACHE = 'carousel-studio-app.2efb5d8b7b14.js';
const ASSETS = [
  "./",
  "./index.html",
  "./app.2efb5d8b7b14.js",
  "./styles.6833ab8e8c2c.css",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./assets/vendor/jszip.min.js",
  "./assets/editorial/portrait-sea.webp",
  "./assets/editorial/rocky-coast.webp",
  "./assets/editorial/botanical-shadow.webp",
  "./assets/editorial/sea-sunset.webp",
  "./assets/fonts/alumnisanspinstripe-0.woff2",
  "./assets/fonts/alumnisanspinstripe-1.woff2",
  "./assets/fonts/badscript-0.woff2",
  "./assets/fonts/bonanova-0.woff2",
  "./assets/fonts/bonanova-1.woff2",
  "./assets/fonts/bonanova-2.woff2",
  "./assets/fonts/caveat-0.woff2",
  "./assets/fonts/climatecrisis-0.woff2",
  "./assets/fonts/commissioner-0.woff2",
  "./assets/fonts/commissioner-1.woff2",
  "./assets/fonts/cormorantgaramond-0.woff2",
  "./assets/fonts/cormorantgaramond-1.woff2",
  "./assets/fonts/cormorantgaramond-2.woff2",
  "./assets/fonts/cormorantgaramond-3.woff2",
  "./assets/fonts/finlandica-0.woff2",
  "./assets/fonts/finlandica-1.woff2",
  "./assets/fonts/fonts.css",
  "./assets/fonts/geologica-0.woff2",
  "./assets/fonts/golostext-0.woff2",
  "./assets/fonts/handjet-0.woff2",
  "./assets/fonts/kablammo-0.woff2",
  "./assets/fonts/literata-0.woff2",
  "./assets/fonts/literata-1.woff2",
  "./assets/fonts/literata-2.woff2",
  "./assets/fonts/literata-3.woff2",
  "./assets/fonts/manrope-0.woff2",
  "./assets/fonts/monomakh-0.woff2",
  "./assets/fonts/oi-0.woff2",
  "./assets/fonts/onest-0.woff2",
  "./assets/fonts/onest-1.woff2",
  "./assets/fonts/onest-2.woff2",
  "./assets/fonts/orelegaone-0.woff2",
  "./assets/fonts/piazzolla-0.woff2",
  "./assets/fonts/piazzolla-1.woff2",
  "./assets/fonts/piazzolla-2.woff2",
  "./assets/fonts/piazzolla-3.woff2",
  "./assets/fonts/prata-0.woff2",
  "./assets/fonts/rubikmarkerhatch-0.woff2",
  "./assets/fonts/sciencegothic-0.woff2",
  "./assets/fonts/shafarik-0.woff2",
  "./assets/fonts/shantellsans-0.woff2",
  "./assets/fonts/shantellsans-1.woff2",
  "./assets/fonts/sofiasanscondensed-0.woff2",
  "./assets/fonts/sofiasanscondensed-1.woff2",
  "./assets/fonts/spectral-0.woff2",
  "./assets/fonts/spectral-1.woff2",
  "./assets/fonts/tektur-0.woff2",
  "./assets/fonts/unbounded-0.woff2",
  "./assets/fonts/viaodalibre-0.woff2",
  "./assets/fonts/wixmadefordisplay-0.woff2",
  "./assets/fonts/yesevaone-0.woff2"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('carousel-studio-') && key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
