import { showNotification } from './notifications.js';
import { getCartState } from './cart.js';
import { getDeliveryData } from './delivery.js';

// État du paiement
const paymentState = {
    stripe: null,
    elements: null,
    paymentMethod: 'card',
    cardComplete: false,
    processing: false,
    error: null
};

/**
 * Initialise le module de paiement
 */
export function initPayment() {
    setupStripe();
    setupPaymentMethods();
    setupCardForm();
    updateOrderSummary();
    validateForm();
}

/**
 * Configure Stripe
 */
function setupStripe() {
    // Initialiser Stripe avec votre clé publique
    paymentState.stripe = Stripe('votre_cle_publique_stripe');
    
    // Créer les éléments Stripe
    paymentState.elements = paymentState.stripe.elements({
        fonts: [
            {
                cssSrc: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap'
            }
        ],
        locale: 'fr'
    });

    // Créer les éléments de carte
    const style = {
        base: {
            fontSize: '16px',
            color: '#414833',
            fontFamily: '"Cormorant Garamond", serif',
            '::placeholder': {
                color: '#656D4A'
            }
        },
        invalid: {
            color: '#582F0E',
            iconColor: '#582F0E'
        }
    };

    const cardNumber = paymentState.elements.create('cardNumber', { style });
    const cardExpiry = paymentState.elements.create('cardExpiry', { style });
    const cardCvc = paymentState.elements.create('cardCvc', { style });

    // Monter les éléments
    cardNumber.mount('#card-number');
    cardExpiry.mount('#expiry');
    cardCvc.mount('#cvv');

    // Gérer les événements
    [cardNumber, cardExpiry, cardCvc].forEach(element => {
        element.on('change', (event) => {
            handleCardChange(event);
        });
    });
}

/**
 * Configure les méthodes de paiement
 */
function setupPaymentMethods() {
    const methods = document.querySelectorAll('input[name="payment"]');
    if (!methods.length) return;

    methods.forEach(method => {
        method.addEventListener('change', (e) => {
            paymentState.paymentMethod = e.target.value;
            togglePaymentForm();
            validateForm();
        });
    });
}

/**
 * Configure le formulaire de carte
 */
function setupCardForm() {
    const form = document.getElementById('card-form');
    if (!form) return;

    // Formater automatiquement le numéro de carte
    const cardNumber = form.querySelector('#card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    // Formater automatiquement la date d'expiration
    const expiry = form.querySelector('#expiry');
    if (expiry) {
        expiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // Formater automatiquement le CVV
    const cvv = form.querySelector('#cvv');
    if (cvv) {
        cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }
}

/**
 * Gère les changements sur la carte
 */
function handleCardChange(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
        paymentState.cardComplete = false;
    } else {
        displayError.textContent = '';
        paymentState.cardComplete = event.complete;
    }
    validateForm();
}

/**
 * Bascule l'affichage du formulaire de paiement
 */
function togglePaymentForm() {
    const cardForm = document.getElementById('card-form');
    const paypalButton = document.querySelector('.paypal-button-container');
    
    if (cardForm && paypalButton) {
        if (paymentState.paymentMethod === 'card') {
            cardForm.style.display = 'block';
            paypalButton.style.display = 'none';
        } else {
            cardForm.style.display = 'none';
            paypalButton.style.display = 'block';
        }
    }
}

/**
 * Met à jour le résumé de la commande
 */
function updateOrderSummary() {
    const cartState = getCartState();
    const deliveryData = getDeliveryData();
    
    // Mettre à jour les articles
    const summaryItems = document.querySelector('.summary-items');
    if (summaryItems) {
        summaryItems.innerHTML = cartState.items.map(item => `
            <div class="summary-item">
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
    
    if (subtotal) subtotal.textContent = `${cartState.total.toFixed(2)} €`;
    if (shipping) shipping.textContent = `${deliveryData.shippingCost.toFixed(2)} €`;
    if (total) total.textContent = `${(cartState.total + deliveryData.shippingCost).toFixed(2)} €`;

    // Mettre à jour les informations de livraison
    const deliveryAddress = document.querySelector('.delivery-address');
    if (deliveryAddress && deliveryData.formData) {
        const { firstName, lastName, address, postalCode, city, country } = deliveryData.formData;
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
        shippingMethod.textContent = methods[deliveryData.shippingMethod];
    }
}

/**
 * Valide le formulaire
 */
function validateForm() {
    const proceedButton = document.querySelector('.proceed-button');
    if (!proceedButton) return;

    let isValid = false;

    if (paymentState.paymentMethod === 'card') {
        isValid = paymentState.cardComplete;
    } else if (paymentState.paymentMethod === 'paypal') {
        isValid = true; // PayPal gère sa propre validation
    }

    proceedButton.disabled = !isValid || paymentState.processing;
}

/**
 * Traite le paiement
 * @returns {Promise<boolean>} - True si le paiement a réussi
 */
export async function processPayment() {
    if (paymentState.processing) return false;
    
    paymentState.processing = true;
    updateProcessingUI(true);

    try {
        if (paymentState.paymentMethod === 'card') {
            return await processCardPayment();
        } else if (paymentState.paymentMethod === 'paypal') {
            return await processPaypalPayment();
        }
    } catch (error) {
        console.error('Erreur lors du paiement:', error);
        showNotification('Une erreur est survenue lors du paiement', 'error');
        return false;
    } finally {
        paymentState.processing = false;
        updateProcessingUI(false);
    }
}

/**
 * Traite le paiement par carte
 * @returns {Promise<boolean>} - True si le paiement a réussi
 */
async function processCardPayment() {
    const { token, error } = await paymentState.stripe.createToken('card');
    
    if (error) {
        showNotification(error.message, 'error');
        return false;
    }

    // Simuler l'appel à votre API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showNotification('Paiement effectué avec succès !', 'success');
    return true;
}

/**
 * Traite le paiement PayPal
 * @returns {Promise<boolean>} - True si le paiement a réussi
 */
async function processPaypalPayment() {
    // Simuler l'appel à PayPal
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showNotification('Paiement PayPal effectué avec succès !', 'success');
    return true;
}

/**
 * Met à jour l'interface pendant le traitement
 * @param {boolean} processing - True si le paiement est en cours
 */
function updateProcessingUI(processing) {
    const proceedButton = document.querySelector('.proceed-button');
    if (!proceedButton) return;

    if (processing) {
        proceedButton.disabled = true;
        proceedButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';
    } else {
        validateForm();
        proceedButton.innerHTML = 'Confirmer la commande';
    }
}

export default {
    initPayment,
    processPayment
}; 