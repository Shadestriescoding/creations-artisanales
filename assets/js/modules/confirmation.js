import { showNotification } from './notifications.js';
import { clearCart } from './cart.js';

// État de la confirmation
const confirmationState = {
    order: null,
    newsletterSubscribed: false
};

/**
 * Initialise le module de confirmation
 */
export function initConfirmation() {
    loadOrderDetails();
    setupNewsletter();
    updateConfirmationDisplay();
    sendConfirmationEmail();
}

/**
 * Charge les détails de la commande
 */
function loadOrderDetails() {
    try {
        const orderData = sessionStorage.getItem('orderData');
        if (!orderData) {
            window.location.href = 'boutique.html';
            return;
        }

        confirmationState.order = JSON.parse(orderData);
        
        // Vider le panier après chargement réussi
        clearCart();
        
        // Nettoyer les données de session
        sessionStorage.removeItem('orderData');
        sessionStorage.removeItem('deliveryData');
    } catch (error) {
        console.error('Erreur lors du chargement des détails de la commande:', error);
        showNotification('Une erreur est survenue lors du chargement de la commande', 'error');
    }
}

/**
 * Configure le formulaire de newsletter
 */
function setupNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        if (!email) return;

        try {
            // Simuler l'appel API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            confirmationState.newsletterSubscribed = true;
            showNotification('Inscription à la newsletter réussie !', 'success');
            form.reset();
            
            // Désactiver le formulaire
            form.querySelector('input[type="email"]').disabled = true;
            form.querySelector('button[type="submit"]').disabled = true;
        } catch (error) {
            console.error('Erreur lors de l\'inscription à la newsletter:', error);
            showNotification('Une erreur est survenue lors de l\'inscription', 'error');
        }
    });
}

/**
 * Met à jour l'affichage de la confirmation
 */
function updateConfirmationDisplay() {
    if (!confirmationState.order) return;

    // Mettre à jour le numéro de commande
    const orderId = document.querySelector('.order-id');
    if (orderId) {
        orderId.textContent = confirmationState.order.id;
    }

    // Mettre à jour les articles
    const orderItems = document.querySelector('.order-items');
    if (orderItems) {
        orderItems.innerHTML = confirmationState.order.items.map(item => `
            <div class="order-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Quantité: ${item.quantity}</p>
                    <p class="item-price">${(item.price * item.quantity).toFixed(2)} €</p>
                </div>
            </div>
        `).join('');
    }

    // Mettre à jour les totaux
    const subtotal = document.querySelector('.subtotal');
    const shipping = document.querySelector('.shipping');
    const total = document.querySelector('.total-amount');
    
    if (subtotal) subtotal.textContent = `${confirmationState.order.subtotal.toFixed(2)} €`;
    if (shipping) shipping.textContent = `${confirmationState.order.shipping.toFixed(2)} €`;
    if (total) total.textContent = `${confirmationState.order.total.toFixed(2)} €`;

    // Mettre à jour l'adresse de livraison
    const deliveryAddress = document.querySelector('.delivery-address');
    if (deliveryAddress) {
        const { firstName, lastName, address, postalCode, city, country } = confirmationState.order.delivery;
        deliveryAddress.innerHTML = `
            ${firstName} ${lastName}<br>
            ${address}<br>
            ${postalCode} ${city}<br>
            ${country}
        `;
    }

    // Mettre à jour le mode de livraison
    const shippingMethod = document.querySelector('.shipping-method');
    if (shippingMethod) {
        const methods = {
            standard: 'Livraison standard (3-5 jours ouvrés)',
            express: 'Livraison express (1-2 jours ouvrés)',
            pickup: 'Point relais (3-5 jours ouvrés)'
        };
        shippingMethod.textContent = methods[confirmationState.order.delivery.method];
    }

    // Mettre à jour la date de livraison estimée
    const deliveryDate = document.querySelector('.delivery-date');
    if (deliveryDate) {
        const estimatedDate = calculateEstimatedDelivery(confirmationState.order.delivery.method);
        deliveryDate.textContent = formatDate(estimatedDate);
    }
}

/**
 * Calcule la date de livraison estimée
 * @param {string} method - Méthode de livraison
 * @returns {Date} - Date estimée de livraison
 */
function calculateEstimatedDelivery(method) {
    const today = new Date();
    let days;

    switch (method) {
        case 'express':
            days = 2;
            break;
        case 'pickup':
            days = 5;
            break;
        default: // standard
            days = 5;
    }

    // Ajouter les jours ouvrés
    const deliveryDate = new Date(today);
    let businessDays = 0;
    while (businessDays < days) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
            businessDays++;
        }
    }

    return deliveryDate;
}

/**
 * Formate une date en français
 * @param {Date} date - Date à formater
 * @returns {string} - Date formatée
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

/**
 * Envoie l'email de confirmation
 */
async function sendConfirmationEmail() {
    if (!confirmationState.order) return;

    try {
        // Simuler l'envoi d'email
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Email de confirmation envoyé');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    }
}

/**
 * Obtient l'état de la confirmation
 * @returns {Object} - État de la confirmation
 */
export function getConfirmationState() {
    return { ...confirmationState };
}

export default {
    initConfirmation,
    getConfirmationState
}; 