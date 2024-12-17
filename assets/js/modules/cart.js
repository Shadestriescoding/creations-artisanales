import { showNotification } from './notifications.js';
import { formatPrice } from './utils.js';
import { cart } from '../main.js';

const cartState = {
    items: [],
    initialized: false
};

export const cartModule = {
    // Initialisation du panier
    init() {
        if (!cartState.initialized) {
            this.loadCart();
            cartState.initialized = true;
        }
        return this;
    },

    // Ajout au panier
    addToCart(product) {
        if (!cartState.initialized) {
            this.init();
        }
        cartState.items.push(product);
        this.updateCartCount();
        this.saveCart();
        return true;
    },

    // Suppression d'un article du panier
    removeFromCart(index) {
        cartState.items.splice(index, 1);
        this.updateCartCount();
        this.saveCart();
        return true;
    },

    // Mise à jour du compteur du panier
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartState.items.length.toString();
            cartCount.style.display = cartState.items.length > 0 ? 'flex' : 'none';
        }
    },

    // Vider le panier
    clearCart() {
        cartState.items = [];
        this.updateCartCount();
        this.saveCart();
    },

    // Calculer le total du panier
    calculateCartTotal() {
        return cartState.items.reduce((total, item) => total + item.price, 0);
    },

    // Getter pour accéder au panier
    get cart() {
        if (!cartState.initialized) {
            this.init();
        }
        return cartState.items;
    },

    // Sauvegarder le panier
    saveCart() {
        try {
            const cartData = JSON.stringify(cartState.items);
            localStorage.setItem('cart', cartData);
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du panier:', error);
            showNotification('Erreur lors de la sauvegarde du panier', 'error');
            return false;
        }
    },

    // Charger le panier
    loadCart() {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cartState.items = JSON.parse(savedCart);
                this.updateCartCount();
            }
            return true;
        } catch (error) {
            console.error('Erreur lors du chargement du panier:', error);
            showNotification('Erreur lors du chargement du panier', 'error');
            cartState.items = [];
            return false;
        }
    }
}; 