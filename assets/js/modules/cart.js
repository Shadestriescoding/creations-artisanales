import { showNotification } from './notifications.js';

// État du panier
const cartState = {
    items: [],
    total: 0,
    step: 1, // 1: Panier, 2: Livraison, 3: Paiement
    shippingCost: 0,
    isLoading: false,
    lastUpdate: null,
    maxQuantity: 99,
    minQuantity: 1
};

/**
 * Initialise le panier
 * @returns {Promise<void>}
 */
export async function initCart() {
    try {
        cartState.isLoading = true;
        showLoadingState(true);

        await loadCart();
        setupCartEvents();
        setupKeyboardNavigation();
        updateCartDisplay();
        updateSuggestedProducts();

        return Promise.resolve();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du panier:', error);
        showNotification('Erreur lors du chargement du panier', 'error');
        return Promise.reject(error);
    } finally {
        cartState.isLoading = false;
        showLoadingState(false);
    }
}

/**
 * Affiche/masque l'état de chargement
 */
function showLoadingState(isLoading) {
    const cartContent = document.querySelector('.cart-content');
    if (!cartContent) return;

    if (isLoading) {
        cartContent.classList.add('loading');
        cartContent.setAttribute('aria-busy', 'true');
        cartContent.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Chargement du panier...</span>
            </div>
        `;
    } else {
        cartContent.classList.remove('loading');
        cartContent.removeAttribute('aria-busy');
    }
}

/**
 * Configure les événements du panier
 */
function setupCartEvents() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;

    // Utiliser la délégation d'événements pour les boutons
    cartItems.addEventListener('click', (e) => {
        const target = e.target;
        const cartItem = target.closest('.cart-item');
        if (!cartItem) return;

        const productId = cartItem.dataset.id;
        const quantityInput = cartItem.querySelector('.quantity-input');

        // Bouton moins
        if (target.closest('.quantity-btn.minus')) {
            e.preventDefault();
            const newQuantity = parseInt(quantityInput.value) - 1;
            if (newQuantity >= cartState.minQuantity) {
                updateQuantity(productId, newQuantity);
            }
        }

        // Bouton plus
        if (target.closest('.quantity-btn.plus')) {
            e.preventDefault();
            const newQuantity = parseInt(quantityInput.value) + 1;
            if (newQuantity <= cartState.maxQuantity) {
                updateQuantity(productId, newQuantity);
            }
        }

        // Bouton supprimer
        if (target.closest('.remove-item')) {
            e.preventDefault();
            showConfirmDialog(
                'Supprimer l\'article ?',
                'Voulez-vous vraiment retirer cet article du panier ?',
                () => removeFromCart(productId)
            );
        }
    });

    // Gestion des quantités via input
    cartItems.addEventListener('change', (e) => {
        if (e.target.matches('.quantity-input')) {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;

            let quantity = parseInt(e.target.value);
            
            // Valider la quantité
            if (isNaN(quantity) || quantity < cartState.minQuantity) {
                quantity = cartState.minQuantity;
            } else if (quantity > cartState.maxQuantity) {
                quantity = cartState.maxQuantity;
            }

            updateQuantity(cartItem.dataset.id, quantity);
        }
    });

    // Bouton de passage à la livraison
    const proceedButton = document.querySelector('.proceed-button');
    if (proceedButton) {
        proceedButton.addEventListener('click', async () => {
            if (cartState.items.length > 0) {
                try {
                    await validateCart();
                    cartState.step = 2;
                    saveCart();
                    window.location.href = 'livraison.html';
                } catch (error) {
                    showNotification(error.message, 'error');
                }
            }
        });
    }

    // Bouton vider le panier
    const clearButton = document.querySelector('.clear-cart');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            showConfirmDialog(
                'Vider le panier ?',
                'Voulez-vous vraiment vider votre panier ? Cette action est irréversible.',
                clearCart
            );
        });
    }
}

/**
 * Configure la navigation au clavier
 */
function setupKeyboardNavigation() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;

    // Navigation entre les articles avec les flèches
    cartItems.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            
            const items = Array.from(cartItems.querySelectorAll('.cart-item'));
            const currentItem = e.target.closest('.cart-item');
            const currentIndex = items.indexOf(currentItem);
            
            let newIndex;
            if (e.key === 'ArrowUp') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            } else {
                newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            }
            
            const targetElement = items[newIndex].querySelector('button, input');
            if (targetElement) targetElement.focus();
        }
    });
}

/**
 * Ajoute un produit au panier
 * @param {Object} product - Le produit à ajouter
 * @returns {Promise<boolean>} - True si l'ajout a réussi
 */
export async function addToCart(product) {
    try {
        if (!product || !product.id) {
            throw new Error('Produit invalide');
        }

        if (product.availability !== 'in-stock') {
            throw new Error('Ce produit n\'est pas disponible actuellement');
        }

        const existingItem = cartState.items.find(item => item.id === product.id);
        if (existingItem) {
            if (existingItem.quantity >= cartState.maxQuantity) {
                throw new Error(`Quantité maximale atteinte (${cartState.maxQuantity})`);
            }
            existingItem.quantity += 1;
        } else {
            cartState.items.push({ ...product, quantity: 1 });
        }

        cartState.lastUpdate = Date.now();
        updateCartCount();
        calculateTotal();
        await saveCart();
        
        showNotification(`${product.name} ajouté au panier`, 'success');
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        showNotification(error.message, 'error');
        return false;
    }
}

/**
 * Retire un produit du panier
 * @param {string} productId - L'ID du produit à retirer
 * @returns {Promise<boolean>} - True si le retrait a réussi
 */
export async function removeFromCart(productId) {
    try {
        const index = cartState.items.findIndex(item => item.id === productId);
        if (index === -1) {
            throw new Error('Produit non trouvé dans le panier');
        }

        const removedItem = cartState.items[index];
        cartState.items.splice(index, 1);
        
        cartState.lastUpdate = Date.now();
        updateCartCount();
        calculateTotal();
        await saveCart();
        updateCartDisplay();
        
        showNotification(`${removedItem.name} retiré du panier`, 'info');
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        showNotification(error.message, 'error');
        return false;
    }
}

/**
 * Met à jour la quantité d'un produit
 * @param {string} productId - L'ID du produit
 * @param {number} quantity - La nouvelle quantité
 * @returns {Promise<boolean>} - True si la mise à jour a réussi
 */
export async function updateQuantity(productId, quantity) {
    try {
        const item = cartState.items.find(item => item.id === productId);
        if (!item) {
            throw new Error('Produit non trouvé dans le panier');
        }

        if (quantity < cartState.minQuantity) {
            return removeFromCart(productId);
        }

        if (quantity > cartState.maxQuantity) {
            throw new Error(`Quantité maximale dépassée (${cartState.maxQuantity})`);
        }

        item.quantity = quantity;
        cartState.lastUpdate = Date.now();
        calculateTotal();
        await saveCart();
        updateCartDisplay();
        
        return true;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la quantité:', error);
        showNotification(error.message, 'error');
        return false;
    }
}

/**
 * Met à jour le compteur du panier dans l'interface
 */
export function updateCartCount() {
    const count = cartState.items.reduce((total, item) => total + item.quantity, 0);
    const countElements = document.querySelectorAll('.cart-count');
    
    countElements.forEach(element => {
        element.textContent = count.toString();
        element.style.display = count > 0 ? 'flex' : 'none';
        
        // Animation de mise à jour
        element.classList.add('update');
        setTimeout(() => element.classList.remove('update'), 300);
    });
}

/**
 * Vide le panier
 * @returns {Promise<boolean>} - True si l'opération a réussi
 */
export async function clearCart() {
    try {
        cartState.items = [];
        cartState.total = 0;
        cartState.lastUpdate = Date.now();
        
        updateCartCount();
        await saveCart();
        updateCartDisplay();
        
        showNotification('Panier vidé', 'info');
        return true;
    } catch (error) {
        console.error('Erreur lors du vidage du panier:', error);
        showNotification('Erreur lors du vidage du panier', 'error');
        return false;
    }
}

/**
 * Calcule le total du panier
 * @returns {number} - Le total du panier
 */
export function calculateTotal() {
    cartState.total = cartState.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    if (cartState.shippingCost > 0) {
        cartState.total += cartState.shippingCost;
    }

    return cartState.total;
}

/**
 * Sauvegarde le panier dans le localStorage
 * @returns {Promise<boolean>} - True si la sauvegarde a réussi
 */
export async function saveCart() {
    try {
        const cartData = JSON.stringify({
            items: cartState.items,
            total: cartState.total,
            step: cartState.step,
            lastUpdate: cartState.lastUpdate
        });
        
        localStorage.setItem('cart', cartData);
        
        // Sauvegarder une copie de secours
        sessionStorage.setItem('cart_backup', cartData);
        
        return true;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
        showNotification('Erreur lors de la sauvegarde du panier', 'error');
        return false;
    }
}

/**
 * Charge le panier depuis le localStorage
 * @returns {Promise<boolean>} - True si le chargement a réussi
 */
export async function loadCart() {
    try {
        // Essayer de charger depuis localStorage
        const savedCart = localStorage.getItem('cart');
        
        // Si pas de données dans localStorage, essayer la sauvegarde de session
        if (!savedCart) {
            const backupCart = sessionStorage.getItem('cart_backup');
            if (backupCart) {
                localStorage.setItem('cart', backupCart);
                return await parseCartData(backupCart);
            }
            
            resetCart();
            return true;
        }

        return await parseCartData(savedCart);
    } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        showNotification('Erreur lors du chargement du panier', 'error');
        resetCart();
        return false;
    }
}

/**
 * Parse les données du panier
 * @param {string} cartData - Les données du panier en JSON
 * @returns {Promise<boolean>} - True si le parsing a réussi
 */
async function parseCartData(cartData) {
    try {
        const parsedCart = JSON.parse(cartData);
        if (!parsedCart || !Array.isArray(parsedCart.items)) {
            throw new Error('Données du panier invalides');
        }

        cartState.items = parsedCart.items;
        cartState.total = parsedCart.total;
        cartState.step = parsedCart.step || 1;
        cartState.lastUpdate = parsedCart.lastUpdate || Date.now();
        
        updateCartCount();
        return true;
    } catch (error) {
        console.error('Erreur lors du parsing des données du panier:', error);
        resetCart();
        return false;
    }
}

/**
 * Réinitialise le panier
 */
function resetCart() {
    cartState.items = [];
    cartState.total = 0;
    cartState.step = 1;
    cartState.lastUpdate = Date.now();
}

/**
 * Valide le panier avant de passer à l'étape suivante
 * @returns {Promise<boolean>} - True si le panier est valide
 */
async function validateCart() {
    if (cartState.items.length === 0) {
        throw new Error('Le panier est vide');
    }

    // Vérifier la disponibilité des produits
    for (const item of cartState.items) {
        if (item.availability !== 'in-stock') {
            throw new Error(`${item.name} n'est plus disponible`);
        }
        if (item.quantity > cartState.maxQuantity) {
            throw new Error(`Quantité maximale dépassée pour ${item.name}`);
        }
    }

    return true;
}

/**
 * Met à jour l'affichage du panier
 */
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');
    const proceedButton = document.querySelector('.proceed-button');
    
    if (!cartItems || !emptyCart || !cartContent) return;

    if (cartState.items.length === 0) {
        cartContent.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        if (proceedButton) proceedButton.disabled = true;
        return;
    }

    cartContent.classList.remove('hidden');
    emptyCart.classList.add('hidden');
    if (proceedButton) proceedButton.disabled = false;

    // Mettre à jour la liste des produits
    cartItems.innerHTML = cartState.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>
                    <a href="produit.html?id=${item.id}" class="product-link">
                        ${item.name}
                    </a>
                </h3>
                <p class="item-price">${item.price.toFixed(2)} €</p>
            </div>
            <div class="item-quantity">
                <button type="button" 
                        class="quantity-btn minus" 
                        aria-label="Diminuer la quantité"
                        ${item.quantity <= cartState.minQuantity ? 'disabled' : ''}>
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" 
                       class="quantity-input" 
                       value="${item.quantity}"
                       min="${cartState.minQuantity}" 
                       max="${cartState.maxQuantity}" 
                       aria-label="Quantité">
                <button type="button" 
                        class="quantity-btn plus"
                        aria-label="Augmenter la quantité"
                        ${item.quantity >= cartState.maxQuantity ? 'disabled' : ''}>
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="item-total">
                ${(item.price * item.quantity).toFixed(2)} €
            </div>
            <button type="button" 
                    class="remove-item"
                    aria-label="Retirer ${item.name} du panier">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');

    // Mettre à jour le résumé
    const subtotal = document.querySelector('.subtotal');
    const shipping = document.querySelector('.shipping');
    const total = document.querySelector('.total-amount');
    
    if (subtotal) subtotal.textContent = `${cartState.total.toFixed(2)} €`;
    if (shipping) shipping.textContent = cartState.shippingCost > 0 
        ? `${cartState.shippingCost.toFixed(2)} €` 
        : 'Calculés à l\'étape suivante';
    if (total) total.textContent = `${(cartState.total + cartState.shippingCost).toFixed(2)} €`;
}

/**
 * Met à jour les produits suggérés
 */
async function updateSuggestedProducts() {
    const suggestedProducts = document.querySelector('.suggested-products');
    if (!suggestedProducts) return;

    try {
        // Charger les produits depuis le cache ou l'API
        const response = await fetch('/assets/data/products.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des produits suggérés');
        
        const data = await response.json();
        const currentProductIds = new Set(cartState.items.map(item => item.id));
        
        // Filtrer et mélanger les produits suggérés
        const suggestions = data.products
            .filter(product => !currentProductIds.has(product.id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);

        // Afficher les suggestions
        const productsGrid = suggestedProducts.querySelector('.product-grid');
        if (productsGrid) {
            productsGrid.innerHTML = suggestions.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>
                            <a href="produit.html?id=${product.id}">
                                ${product.name}
                            </a>
                        </h3>
                        <p class="product-price">${product.price.toFixed(2)} €</p>
                        <button type="button"
                                class="button button-primary add-to-cart"
                                data-id="${product.id}"
                                ${product.availability !== 'in-stock' ? 'disabled' : ''}
                                aria-label="Ajouter ${product.name} au panier">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Ajouter au panier</span>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des produits suggérés:', error);
        suggestedProducts.style.display = 'none';
    }
}

/**
 * Affiche une boîte de dialogue de confirmation
 */
function showConfirmDialog(title, message, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="dialog-actions">
                <button type="button" class="button button-secondary cancel-btn">
                    Annuler
                </button>
                <button type="button" class="button button-primary confirm-btn">
                    Confirmer
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);

    // Gestionnaires d'événements
    const confirmBtn = dialog.querySelector('.confirm-btn');
    const cancelBtn = dialog.querySelector('.cancel-btn');
    
    confirmBtn.addEventListener('click', () => {
        onConfirm();
        dialog.remove();
    });

    cancelBtn.addEventListener('click', () => {
        dialog.remove();
    });

    // Fermer avec Échap
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            dialog.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

/**
 * Définit les frais de livraison
 * @param {number} cost - Les frais de livraison
 */
export function setShippingCost(cost) {
    cartState.shippingCost = cost;
    calculateTotal();
    updateCartDisplay();
}

/**
 * Obtient l'état actuel du panier
 * @returns {Object} - L'état du panier
 */
export function getCartState() {
    return { ...cartState };
}

export default {
    initCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
    saveCart,
    loadCart,
    getCartState,
    setShippingCost
}; 