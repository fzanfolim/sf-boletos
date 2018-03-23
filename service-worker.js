let cacheName = 'sf-boleto-v.1.0.6';
let filesToCache = [
    './',
    'index.html',
    'css/colors.css',
    'css/styles.css',
    'js/array.observe.polyfill.js',
    'js/object.observe.polyfill.js',
    'js/scripts.js',
    'js/angular/angular.min.js',
    'js/angular/loading-bar.min.js'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Installer');

    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Criando Cache!');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                console.log(key);
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Remover Cache velho!', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

//carrega os arquivos de cache offline 
self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
