const CACHE_NAME = 'creations-artisanales-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/boutique.html',
    '/about.html',
    '/contact.html',
    '/panier.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/js/modules/navigation.js',
    '/assets/js/modules/search.js',
    '/assets/js/modules/cart.js',
    '/assets/js/modules/animations.js',
    '/assets/images/deco_sapin_crochet_paindepice.jpg',
    '/assets/images/deco_sapin_crochet.jpg',
    '/assets/images/suspension_bois_crochet.jpg',
    '/assets/images/ensemble_patisserie_crochet.jpg',
    '/assets/images/legumes_crochet.jpg',
    '/assets/images/mobile_origamis.jpg'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache ouvert');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - retourne la réponse du cache
                if (response) {
                    return response;
                }

                // Clone de la requête
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    (response) => {
                        // Vérifie si la réponse est valide
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone de la réponse
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
}); 