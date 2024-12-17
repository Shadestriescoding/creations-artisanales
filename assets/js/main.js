// Importation des modules
import { handleMobileNav } from './modules/navigation.js';
import { handleSearch } from './modules/search.js';
import { handleNewsletterForm } from './modules/newsletter.js';
import { handleScrollAnimations } from './modules/animations.js';
import { handleFilters, handleSort, handleView, handlePagination } from './modules/shop.js';
import { showNotification } from './modules/notifications.js';
import { initErrorTracking, trackError, trackEvent } from './modules/error-tracking.js';
import { cartModule } from './modules/cart.js';

// Initialisation du suivi des erreurs
initErrorTracking();

// Données des produits
const products = [
    {
        id: 1,
        name: "Croissant au Crochet",
        description: "Un croissant moelleux fait main, parfait pour la décoration",
        price: 15.99,
        image: "assets/images/deco_sapin_crochet_paindepice.jpg",
        imageAlt: "assets/images/deco_sapin_crochet.jpg",
        category: "gourmandises",
        availability: "in-stock",
        date: "2024-01-15"
    },
    {
        id: 2,
        name: "Pain au Chocolat Crocheté",
        description: "Un classique français réinventé en version crochet",
        price: 17.99,
        image: "assets/images/deco_sapin_crochet.jpg",
        imageAlt: "assets/images/deco_sapin_crochet_paindepice.jpg",
        category: "gourmandises",
        availability: "in-stock",
        date: "2024-01-14"
    }
];

// Panier
export let cart = [];

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

// Mesures de performance
const performanceMetrics = {
    startTime: performance.now(),
    loadTime: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    domInteractive: 0
};

// Initialisation avec mesures de performance
document.addEventListener('DOMContentLoaded', () => {
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

    // Fonctionnalités communes
    handleMobileNav();
    handleSearch();
    handleNewsletterForm();
    handleScrollAnimations();
    optimizeImages();

    // Fonctionnalités spécifiques à la page boutique
    if (document.querySelector('.shop-page')) {
        handleFilters();
        handleSort();
        handleView();
        handlePagination();
        displayProducts();
    }
});

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

// Affichage des produits
function displayProducts() {
    try {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) {
            throw new Error('Élément .product-grid non trouvé');
        }

        productGrid.innerHTML = products.map(product => `
            <div class="product-card" 
                data-category="${product.category}"
                data-price="${product.price}"
                data-availability="${product.availability}"
                data-date="${product.date}">
                <div class="product-image">
                    <img src="${product.image}" 
                        alt="${product.name}"
                        loading="lazy"
                        srcset="${product.image} 1x, ${product.imageAlt} 2x"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        onerror="this.onerror=null; this.src='${product.imageAlt}'; showImageError(this);">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price.toFixed(2)} €</p>
                    <div class="product-actions">
                        <button onclick="addToCart(${product.id})" class="button button-primary">
                            <i class="fas fa-shopping-cart"></i> Ajouter au panier
                        </button>
                        <button class="button button-secondary favorite-btn" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <p class="product-availability ${product.availability}">
                        ${product.availability === 'in-stock' ? 'En stock' : 'Pré-commande'}
                    </p>
                </div>
            </div>
        `).join('');

        optimizeImages();
        initializeEventListeners();
        trackEvent('products_displayed', { count: products.length });
    } catch (error) {
        trackError(error);
        showNotification('Une erreur est survenue lors de l\'affichage des produits', 'error');
    }
}

// Initialisation des écouteurs d'événements
function initializeEventListeners() {
    try {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                icon.classList.toggle('text-accent');
                
                const isFavorite = icon.classList.contains('fas');
                const productId = this.dataset.id;
                
                showNotification(
                    isFavorite ? 'Ajouté aux favoris' : 'Retiré des favoris'
                );
                
                trackEvent('toggle_favorite', {
                    productId,
                    action: isFavorite ? 'add' : 'remove'
                });
            });
        });
    } catch (error) {
        trackError(error);
        showNotification('Une erreur est survenue lors de l\'initialisation des événements', 'error');
    }
}

// Ajout au panier
window.addToCart = function(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (product) {
            cartModule.addToCart(product);
            showNotification(`${product.name} ajouté au panier !`);
            trackEvent('add_to_cart', { productId, productName: product.name });
            cartModule.saveCart();
        } else {
            throw new Error(`Produit non trouvé: ${productId}`);
        }
    } catch (error) {
        trackError(error, { productId });
        showNotification('Une erreur est survenue lors de l\'ajout au panier', 'error');
    }
}

// Mise à jour du compteur du panier
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Fonction pour gérer les erreurs d'images
window.showImageError = function(img) {
    console.warn(`Erreur de chargement de l'image: ${img.src}`);
    showNotification('Une erreur est survenue lors du chargement de l\'image', 'warning');
};

module.exports = {
    products
};