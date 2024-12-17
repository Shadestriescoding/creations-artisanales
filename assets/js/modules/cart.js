import { showNotification } from './notifications.js';
import { formatPrice } from './utils.js';
import { cart } from '../main.js';

// Amélioration du panier
export function enhanceCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');

    if (cartIcon && cartCount) {
        cartIcon.addEventListener('mouseenter', () => {
            cartCount.style.transform = 'scale(1.2)';
        });

        cartIcon.addEventListener('mouseleave', () => {
            cartCount.style.transform = 'scale(1)';
        });
    }

    updateCartCount();
    initCartDropdown();
}

// Initialisation du dropdown du panier
function initCartDropdown() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartDropdown.classList.toggle('active');
            updateCartDropdown();
        });

        document.addEventListener('click', (e) => {
            if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
                cartDropdown.classList.remove('active');
            }
        });
    }
}

// Mise à jour du contenu du dropdown du panier
function updateCartDropdown() {
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (!cartDropdown) return;

    const cartContent = cartDropdown.querySelector('.cart-content');
    const emptyMessage = cartDropdown.querySelector('.empty-cart');
    const cartTotal = cartDropdown.querySelector('.cart-total');

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyMessage.style.display = 'block';
        cartTotal.style.display = 'none';
        return;
    }

    cartContent.style.display = 'block';
    emptyMessage.style.display = 'none';
    cartTotal.style.display = 'block';

    // Mise à jour des articles
    cartContent.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-price">${formatPrice(item.price)}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    // Mise à jour du total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: ${formatPrice(total)}`;
}

// Suppression d'un article du panier
export function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDropdown();
    showNotification('Article retiré du panier');
}

// Mise à jour du compteur du panier
export function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Vider le panier
export function clearCart() {
    cart.length = 0;
    updateCartCount();
    updateCartDropdown();
    showNotification('Panier vidé');
}

// Sauvegarder le panier dans le localStorage
export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Charger le panier depuis le localStorage
export function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.push(...JSON.parse(savedCart));
        updateCartCount();
    }
}

// Calculer le total du panier
export function calculateCartTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Vérifier si un produit est dans le panier
export function isInCart(productId) {
    return cart.some(item => item.id === productId);
}

// Obtenir la quantité d'un produit dans le panier
export function getProductQuantity(productId) {
    return cart.filter(item => item.id === productId).length;
}

// Mettre à jour la quantité d'un produit
export function updateProductQuantity(productId, quantity) {
    // Supprimer toutes les instances du produit
    const itemsToRemove = cart.filter(item => item.id === productId);
    itemsToRemove.forEach(item => {
        const index = cart.indexOf(item);
        if (index > -1) {
            cart.splice(index, 1);
        }
    });

    // Ajouter la nouvelle quantité
    const product = window.featuredProducts.find(p => p.id === productId);
    if (product) {
        for (let i = 0; i < quantity; i++) {
            cart.push(product);
        }
    }

    updateCartCount();
    updateCartDropdown();
    showNotification('Quantité mise à jour');
} 