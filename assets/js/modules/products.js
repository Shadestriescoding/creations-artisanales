import { showNotification } from './notifications.js';
import { formatPrice } from './utils.js';
import { cart } from '../main.js';

// Affichage des produits
export function displayFeaturedProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" data-price="${product.price}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <button onclick="addToCart(${product.id})" class="button button-primary">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Animation des cartes au scroll
    const productCards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Ajout au panier
export function addToCart(productId) {
    const product = window.featuredProducts.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} ajouté au panier !`);
        
        // Animation du compteur
        const cartCount = document.querySelector('.cart-count');
        cartCount.classList.add('bounce');
        setTimeout(() => cartCount.classList.remove('bounce'), 300);
    }
}

// Mise à jour du compteur du panier
export function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        if (cart.length > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Tri des produits
export function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            break;
    }
    
    return sortedProducts;
}

// Filtrage des produits
export function filterProducts(products, filters = {}) {
    return products.filter(product => {
        let matches = true;
        
        // Filtre par catégorie
        if (filters.category) {
            matches = matches && product.category === filters.category;
        }
        
        // Filtre par prix
        if (filters.minPrice !== undefined) {
            matches = matches && product.price >= filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
            matches = matches && product.price <= filters.maxPrice;
        }
        
        // Filtre par recherche
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            matches = matches && (
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            );
        }
        
        return matches;
    });
}

// Gestion des favoris
export function toggleFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(productId);
    
    if (index === -1) {
        favorites.push(productId);
        showNotification('Produit ajouté aux favoris');
    } else {
        favorites.splice(index, 1);
        showNotification('Produit retiré des favoris');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton(productId);
}

// Mise à jour du bouton favori
export function updateFavoriteButton(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const button = document.querySelector(`.favorite-button[data-product-id="${productId}"]`);
    
    if (button) {
        const isFavorite = favorites.includes(productId);
        button.classList.toggle('active', isFavorite);
        button.querySelector('i').className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
    }
}

// Chargement des produits favoris
export function loadFavoriteProducts() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return window.featuredProducts.filter(product => favorites.includes(product.id));
} 