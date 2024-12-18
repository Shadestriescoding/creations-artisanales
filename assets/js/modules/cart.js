import { showNotification } from './notifications.js';

// État du panier
const cartState = {
    items: [],
    total: 0
};

/**
 * Initialise le panier
 */
export function initCart() {
    loadCart();
    updateCartCount();
}

/**
 * Ajoute un produit au panier
 * @param {Object} product - Le produit à ajouter
 * @returns {boolean} - True si l'ajout a réussi
 */
export function addToCart(product) {
    if (!product || !product.id) return false;

    const existingItem = cartState.items.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartState.items.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    calculateTotal();
    return saveCart();
}

/**
 * Retire un produit du panier
 * @param {string} productId - L'ID du produit à retirer
 * @returns {boolean} - True si le retrait a réussi
 */
export function removeFromCart(productId) {
    const index = cartState.items.findIndex(item => item.id === productId);
    if (index === -1) return false;

    cartState.items.splice(index, 1);
    updateCartCount();
    calculateTotal();
    return saveCart();
}

/**
 * Met à jour le compteur du panier dans l'interface
 */
export function updateCartCount() {
    const count = cartState.items.reduce((total, item) => total + item.quantity, 0);
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = count.toString();
    }
}

/**
 * Vide le panier
 * @returns {boolean} - True si l'opération a réussi
 */
export function clearCart() {
    cartState.items = [];
    cartState.total = 0;
    updateCartCount();
    return saveCart();
}

/**
 * Calcule le total du panier
 * @returns {number} - Le total du panier
 */
export function calculateTotal() {
    cartState.total = cartState.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    return cartState.total;
}

/**
 * Sauvegarde le panier dans le localStorage
 * @returns {boolean} - True si la sauvegarde a réussi
 */
export function saveCart() {
    try {
        const cartData = JSON.stringify({
            items: cartState.items,
            total: cartState.total
        });
        localStorage.setItem('cart', cartData);
        return true;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
        showNotification('Erreur lors de la sauvegarde du panier', 'error');
        return false;
    }
}

/**
 * Charge le panier depuis le localStorage
 * @returns {boolean} - True si le chargement a réussi
 */
export function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (!savedCart) {
            cartState.items = [];
            cartState.total = 0;
            return true;
        }

        const parsedCart = JSON.parse(savedCart);
        if (!parsedCart || !Array.isArray(parsedCart.items)) {
            cartState.items = [];
            cartState.total = 0;
            return false;
        }

        cartState.items = parsedCart.items;
        cartState.total = typeof parsedCart.total === 'number' ? parsedCart.total : 0;
        updateCartCount();
        return true;
    } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        showNotification('Erreur lors du chargement du panier', 'error');
        cartState.items = [];
        cartState.total = 0;
        return false;
    }
}

export default {
    initCart,
    addToCart,
    removeFromCart,
    updateCartCount,
    clearCart,
    calculateTotal,
    saveCart,
    loadCart,
    getState: () => ({ ...cartState })
}; 