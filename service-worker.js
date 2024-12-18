const CACHE_NAME = 'lacabanedeva-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/boutique.html',
    '/panier.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/images/**/*'
];

// Installation du Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Stratégie de cache : Network First avec fallback sur le cache
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, responseClone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});

// Gestion des notifications push
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {
                action: 'explore',
                title: 'Voir les nouveautés',
                icon: '/assets/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Fermer',
                icon: '/assets/images/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('La cabane d\'Eva', options)
    );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/boutique.html')
        );
    }
}); 