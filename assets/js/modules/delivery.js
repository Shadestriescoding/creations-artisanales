import { showNotification } from './notifications.js';
import { getCartState, setShippingCost } from './cart.js';

// État de la livraison
const deliveryState = {
    form: null,
    shippingMethod: 'standard',
    shippingRates: {
        standard: 5.90,
        express: 9.90,
        pickup: 4.90
    },
    formData: null,
    isValid: false
};

/**
 * Initialise le module de livraison
 */
export function initDelivery() {
    setupForm();
    setupShippingMethods();
    updateOrderSummary();
    validateForm();
}

/**
 * Configure le formulaire de livraison
 */
function setupForm() {
    deliveryState.form = document.getElementById('deliveryForm');
    if (!deliveryState.form) return;

    // Charger les données sauvegardées
    const savedData = localStorage.getItem('deliveryData');
    if (savedData) {
        try {
            deliveryState.formData = JSON.parse(savedData);
            fillFormWithSavedData();
        } catch (error) {
            console.error('Erreur lors du chargement des données de livraison:', error);
        }
    }

    // Validation en temps réel
    deliveryState.form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
            validateForm();
            saveFormData();
        });

        field.addEventListener('change', () => {
            validateForm();
            saveFormData();
        });
    });

    // Auto-complétion du code postal
    const postalCodeInput = document.getElementById('postalCode');
    const cityInput = document.getElementById('city');
    
    if (postalCodeInput && cityInput) {
        postalCodeInput.addEventListener('input', () => {
            if (postalCodeInput.value.length === 5) {
                fetchCityFromPostalCode(postalCodeInput.value)
                    .then(cities => {
                        if (cities.length === 1) {
                            cityInput.value = cities[0];
                            validateForm();
                            saveFormData();
                        }
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération de la ville:', error);
                    });
            }
        });
    }
}

/**
 * Configure les modes de livraison
 */
function setupShippingMethods() {
    const shippingMethods = document.querySelectorAll('input[name="shipping"]');
    if (!shippingMethods.length) return;

    shippingMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            deliveryState.shippingMethod = e.target.value;
            setShippingCost(deliveryState.shippingRates[e.target.value]);
            updateOrderSummary();
        });
    });

    // Définir le coût de livraison initial
    setShippingCost(deliveryState.shippingRates.standard);
}

/**
 * Met à jour le résumé de la commande
 */
function updateOrderSummary() {
    const cartState = getCartState();
    const summaryItems = document.querySelector('.summary-items');
    const subtotal = document.querySelector('.subtotal');
    const shipping = document.querySelector('.shipping');
    const total = document.querySelector('.total-amount');
    
    if (!summaryItems || !subtotal || !shipping || !total) return;

    // Afficher les articles
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

    // Mettre à jour les totaux
    subtotal.textContent = `${cartState.total.toFixed(2)} €`;
    shipping.textContent = `${deliveryState.shippingRates[deliveryState.shippingMethod].toFixed(2)} €`;
    total.textContent = `${(cartState.total + deliveryState.shippingRates[deliveryState.shippingMethod]).toFixed(2)} €`;
}

/**
 * Valide le formulaire
 */
function validateForm() {
    if (!deliveryState.form) return;

    const requiredFields = deliveryState.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    // Validation spécifique pour l'email
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
        }
    }

    // Validation spécifique pour le téléphone
    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            isValid = false;
            phoneInput.classList.add('error');
        }
    }

    // Validation spécifique pour le code postal
    const postalCodeInput = document.getElementById('postalCode');
    if (postalCodeInput && postalCodeInput.value) {
        const postalCodeRegex = /^[0-9]{5}$/;
        if (!postalCodeRegex.test(postalCodeInput.value)) {
            isValid = false;
            postalCodeInput.classList.add('error');
        }
    }

    deliveryState.isValid = isValid;
    updateProceedButton();
}

/**
 * Met à jour le bouton de validation
 */
function updateProceedButton() {
    const proceedButton = document.querySelector('.proceed-button');
    if (proceedButton) {
        proceedButton.disabled = !deliveryState.isValid;
    }
}

/**
 * Sauvegarde les données du formulaire
 */
function saveFormData() {
    if (!deliveryState.form) return;

    const formData = {};
    deliveryState.form.querySelectorAll('input, select, textarea').forEach(field => {
        formData[field.name] = field.value;
    });

    deliveryState.formData = formData;
    localStorage.setItem('deliveryData', JSON.stringify(formData));
}

/**
 * Remplit le formulaire avec les données sauvegardées
 */
function fillFormWithSavedData() {
    if (!deliveryState.form || !deliveryState.formData) return;

    Object.entries(deliveryState.formData).forEach(([name, value]) => {
        const field = deliveryState.form.querySelector(`[name="${name}"]`);
        if (field) {
            field.value = value;
        }
    });
}

/**
 * Récupère la ville à partir du code postal
 * @param {string} postalCode - Le code postal
 * @returns {Promise<string[]>} - Liste des villes correspondantes
 */
async function fetchCityFromPostalCode(postalCode) {
    try {
        const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        
        const data = await response.json();
        return data.map(commune => commune.nom);
    } catch (error) {
        console.error('Erreur API:', error);
        return [];
    }
}

/**
 * Obtient les données de livraison
 * @returns {Object} - Les données de livraison
 */
export function getDeliveryData() {
    return {
        formData: deliveryState.formData,
        shippingMethod: deliveryState.shippingMethod,
        shippingCost: deliveryState.shippingRates[deliveryState.shippingMethod]
    };
}

export default {
    initDelivery,
    getDeliveryData
}; 