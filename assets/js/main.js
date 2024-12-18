// Importation des modules
import { initNavigation } from './modules/navigation.js';
import { initProducts } from './modules/products.js';
import { initCart, getCartState } from './modules/cart.js';
import { initDelivery } from './modules/delivery.js';
import { initPayment } from './modules/payment.js';
import { initConfirmation } from './modules/confirmation.js';
import { initNotifications, showNotification } from './modules/notifications.js';
import { initErrorTracking } from './modules/error-tracking.js';
import { initContact } from './modules/contact.js';

// Initialisation du suivi des erreurs
try {
    initErrorTracking();
} catch (error) {
    console.error('Erreur lors de l\'initialisation du suivi des erreurs:', error);
}

// Mesures de performance
const performanceMetrics = {
    startTime: performance.now(),
    loadTime: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    domInteractive: 0
};

// Initialisation avec mesures de performance
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Mesure du temps de chargement
        performanceMetrics.loadTime = performance.now() - performanceMetrics.startTime;
        
        // Mesure du First Paint et First Contentful Paint
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
            if (entry.name === 'first-paint') {
                performanceMetrics.firstPaint = entry.startTime;
            }
            if (entry.name === 'first-contentful-paint') {
                performanceMetrics.firstContentfulPaint = entry.startTime;
            }
        });

        // Mesure du DOM Interactive
        performanceMetrics.domInteractive = performance.timing.domInteractive - performance.timing.navigationStart;

        // Log des métriques de performance
        console.log('Métriques de performance:', performanceMetrics);

        // Initialisation des modules communs
        await Promise.all([
            initNavigation().catch(error => {
                console.error('Erreur lors de l\'initialisation de la navigation:', error);
                showNotification('Une erreur est survenue lors du chargement de la navigation', 'error');
            }),
            initNotifications().catch(error => {
                console.error('Erreur lors de l\'initialisation des notifications:', error);
            })
        ]);

        // Initialisation des modules spécifiques selon la page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Vérifier l'état du panier pour les pages qui en ont besoin
        if (['livraison.html', 'paiement.html'].includes(currentPage)) {
            const cartState = getCartState();
            if (!cartState.items.length) {
                window.location.href = 'panier.html';
                return;
            }
        }

        switch (currentPage) {
            case 'index.html':
                // Page d'accueil
                await Promise.all([
                    initProducts().catch(handleModuleError('produits')),
                    initCart().catch(handleModuleError('panier'))
                ]);
                break;
                
            case 'boutique.html':
                // Page boutique
                await Promise.all([
                    initProducts().catch(handleModuleError('produits')),
                    initCart().catch(handleModuleError('panier'))
                ]);
                break;
                
            case 'panier.html':
                // Page panier
                await initCart().catch(handleModuleError('panier'));
                break;
                
            case 'livraison.html':
                // Page livraison
                await Promise.all([
                    initCart().catch(handleModuleError('panier')),
                    initDelivery().catch(handleModuleError('livraison'))
                ]);
                break;
                
            case 'paiement.html':
                // Page paiement
                await Promise.all([
                    initCart().catch(handleModuleError('panier')),
                    initDelivery().catch(handleModuleError('livraison')),
                    initPayment().catch(handleModuleError('paiement'))
                ]);
                break;
                
            case 'confirmation.html':
                // Page confirmation
                await initConfirmation().catch(handleModuleError('confirmation'));
                break;
                
            case 'contact.html':
                // Page contact
                await initContact().catch(handleModuleError('contact'));
                break;
        }

        // Optimisation des images
        optimizeImages();

    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la page:', error);
        showNotification('Une erreur est survenue lors du chargement de la page', 'error');
    }
});

// Fonction utilitaire pour gérer les erreurs des modules
function handleModuleError(moduleName) {
    return (error) => {
        console.error(`Erreur lors de l'initialisation du module ${moduleName}:`, error);
        showNotification(`Une erreur est survenue lors du chargement du module ${moduleName}`, 'error');
    };
}

// Surveillance des performances de navigation
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        // Log des métriques de navigation
        if (entry.entryType === 'navigation') {
            console.log('Navigation Performance:', {
                dnsLookup: entry.domainLookupEnd - entry.domainLookupStart,
                tcpConnection: entry.connectEnd - entry.connectStart,
                serverResponse: entry.responseEnd - entry.requestStart,
                domProcessing: entry.domComplete - entry.domInteractive,
                totalTime: entry.duration
            });
        }
    }
});

observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });

// Optimisation des images
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas le lazy loading natif
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
        script.onload = function() {
            const observer = lozad();
            observer.observe();
        };
        document.body.appendChild(script);
    }
}

// Fonction pour gérer les erreurs d'images
window.showImageError = function(img) {
    console.warn(`Erreur de chargement de l'image: ${img.src}`);
    showNotification('Une erreur est survenue lors du chargement de l\'image', 'warning');
};