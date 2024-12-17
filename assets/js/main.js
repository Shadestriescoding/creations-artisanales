// Données des produits vedettes
const featuredProducts = [
    {
        id: 1,
        name: "Collection Pâtisseries en Crochet",
        price: 45.00,
        image: "assets/images/ensemble_patisserie_crochet.jpg",
        description: "Ensemble complet de pâtisseries en crochet : donuts, cookies, tartelettes et macarons",
        category: "Gourmandises crochetées"
    },
    {
        id: 2,
        name: "Suspension Bois Crochet",
        price: 35.00,
        image: "assets/images/suspension_bois_crochet.jpg",
        description: "Présentoir mural en bois et crochet",
        category: "Décorations"
    },
    {
        id: 3,
        name: "Mobile Origami Élégant",
        price: 28.00,
        image: "assets/images/mobile_origamis.jpg",
        description: "Mobile décoratif en origami aux couleurs douces et harmonieuses",
        category: "Origamis"
    },
    {
        id: 4,
        name: "Légumes en Crochet",
        price: 32.00,
        image: "assets/images/legumes_crochet.jpg",
        description: "Assortiment de légumes en crochet, parfait pour la décoration ou le jeu",
        category: "Mini potager"
    },
    {
        id: 5,
        name: "Décoration de Noël Pain d'Épice",
        price: 15.00,
        image: "assets/images/deco_sapin_crochet_paindepice.jpg",
        description: "Charmante décoration de Noël en crochet style pain d'épice",
        category: "Décorations saisonnières"
    }
];

// Catégories disponibles
const categories = [
    {
        id: "gourmandises",
        name: "Gourmandises crochetées",
        image: "assets/images/ensemble_patisserie_crochet.jpg"
    },
    {
        id: "decorations",
        name: "Décorations",
        image: "assets/images/suspension_bois_crochet_2.jpg"
    },
    {
        id: "origami",
        name: "Origamis",
        image: "assets/images/mobile_origamis_2.jpg"
    },
    {
        id: "potager",
        name: "Mini potager",
        image: "assets/images/legumes_crochet.jpg"
    }
];

// Panier
let cart = [];

// Fonction pour afficher les produits vedettes
function displayFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">${product.price.toFixed(2)} €</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">
                    Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

// Fonction pour afficher les catégories
function displayCategories() {
    const categoryGrid = document.querySelector('.category-grid');
    if (!categoryGrid) return;

    categoryGrid.innerHTML = categories.map(category => `
        <div class="category-card">
            <img src="${category.image}" alt="${category.name}" loading="lazy">
            <h3>${category.name}</h3>
        </div>
    `).join('');
}

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('Produit ajouté au panier !');
    }
}

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Fonction pour afficher une notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    document.body.appendChild(notification);

    // Animation d'entrée
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    });

    // Animation de sortie
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Gestion de la barre de navigation responsive
function handleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.setAttribute('aria-label', 'Menu');
    
    document.querySelector('.navbar').insertBefore(hamburger, navLinks);
    
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('active');
        
        // Animation du hamburger
        hamburger.querySelector('i').className = isOpen ? 'fas fa-bars' : 'fas fa-times';
        
        // Animation du menu
        navLinks.classList.toggle('active');
        
        // Accessibilité
        hamburger.setAttribute('aria-expanded', !isOpen);
        navLinks.setAttribute('aria-hidden', isOpen);
    });

    // Fermeture au clic en dehors
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').className = 'fas fa-bars';
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    });
}

// Gestion du formulaire de newsletter
function handleNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Merci de votre inscription à la newsletter !');
                form.reset();
            }
        });
    }
}

// Fonction pour gérer la recherche
function handleSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            searchBar.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
                searchBar.classList.remove('active');
            }
        });

        const searchInput = searchBar.querySelector('input');
        const searchButton = searchBar.querySelector('button');

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            filterProducts(query);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                filterProducts(query);
            }
        });
    }
}

// Fonction pour filtrer les produits
function filterProducts(query = '', filters = {}) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('.description').textContent.toLowerCase();
        const category = product.dataset.category.toLowerCase();
        const price = parseFloat(product.dataset.price);

        let shouldShow = true;

        // Filtre par recherche
        if (query) {
            shouldShow = name.includes(query) || description.includes(query);
        }

        // Filtre par catégorie
        if (filters.categories && filters.categories.length > 0) {
            shouldShow = shouldShow && filters.categories.includes(category);
        }

        // Filtre par prix
        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
            shouldShow = shouldShow && price >= filters.minPrice && price <= filters.maxPrice;
        }

        product.style.display = shouldShow ? 'block' : 'none';
    });
}

// Fonction pour trier les produits
function sortProducts(sortBy) {
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.children);

    products.sort((a, b) => {
        const aPrice = parseFloat(a.dataset.price);
        const bPrice = parseFloat(b.dataset.price);
        const aName = a.querySelector('h3').textContent;
        const bName = b.querySelector('h3').textContent;

        switch (sortBy) {
            case 'price-asc':
                return aPrice - bPrice;
            case 'price-desc':
                return bPrice - aPrice;
            case 'name-asc':
                return aName.localeCompare(bName);
            case 'name-desc':
                return bName.localeCompare(aName);
            default:
                return 0;
        }
    });

    productGrid.innerHTML = '';
    products.forEach(product => productGrid.appendChild(product));
}

// Fonction pour gérer les filtres
function handleFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceButton = document.querySelector('.apply-price');
    const sortSelect = document.querySelector('.sort-select');

    if (filterCheckboxes) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selectedCategories = Array.from(filterCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                filterProducts('', { categories: selectedCategories });
            });
        });
    }

    if (applyPriceButton) {
        applyPriceButton.addEventListener('click', () => {
            const minPrice = parseFloat(minPriceInput.value) || 0;
            const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
            
            filterProducts('', { minPrice, maxPrice });
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
        });
    }
}

// Fonctions pour le panier
function displayCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'grid';

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">${item.price.toFixed(2)} €</p>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span>1</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    updateCartTotal();
}

function updateQuantity(index, change) {
    const item = cart[index];
    const quantitySpan = document.querySelectorAll('.item-quantity span')[index];
    let quantity = parseInt(quantitySpan.textContent);
    
    quantity = Math.max(1, quantity + change);
    quantitySpan.textContent = quantity;
    
    updateCartTotal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
    showNotification('Produit retiré du panier');
}

function updateCartTotal() {
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-price');
    const shippingElement = document.querySelector('.shipping');
    
    if (!subtotalElement || !totalElement || !shippingElement) return;

    const subtotal = cart.reduce((total, item) => {
        const quantity = parseInt(document.querySelector(`[data-id="${item.id}"] .item-quantity span`).textContent);
        return total + (item.price * quantity);
    }, 0);

    const shipping = subtotal > 0 ? 5.00 : 0;
    const total = subtotal + shipping;

    subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
    shippingElement.textContent = `${shipping.toFixed(2)} €`;
    totalElement.textContent = `${total.toFixed(2)} €`;
}

// Navigation dans le processus de commande
function goToCheckout() {
    const cartContainer = document.querySelector('.cart-container');
    const deliveryForm = document.querySelector('.delivery-form');
    const steps = document.querySelectorAll('.step');
    
    cartContainer.classList.add('hidden');
    deliveryForm.classList.remove('hidden');
    steps[0].classList.remove('active');
    steps[1].classList.add('active');
}

function backToCart() {
    const cartContainer = document.querySelector('.cart-container');
    const deliveryForm = document.querySelector('.delivery-form');
    const steps = document.querySelectorAll('.step');
    
    deliveryForm.classList.add('hidden');
    cartContainer.classList.remove('hidden');
    steps[1].classList.remove('active');
    steps[0].classList.add('active');
}

function goToPayment() {
    const deliveryForm = document.querySelector('.delivery-form');
    const paymentSection = document.querySelector('.payment-section');
    const steps = document.querySelectorAll('.step');
    
    deliveryForm.classList.add('hidden');
    paymentSection.classList.remove('hidden');
    steps[1].classList.remove('active');
    steps[2].classList.add('active');
}

function backToDelivery() {
    const deliveryForm = document.querySelector('.delivery-form');
    const paymentSection = document.querySelector('.payment-section');
    const steps = document.querySelectorAll('.step');
    
    paymentSection.classList.add('hidden');
    deliveryForm.classList.remove('hidden');
    steps[2].classList.remove('active');
    steps[1].classList.add('active');
}

// Gestion des formulaires
function handleForms() {
    const deliveryForm = document.getElementById('deliveryForm');
    const paymentForm = document.getElementById('paymentForm');

    if (deliveryForm) {
        deliveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            goToPayment();
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulation de traitement du paiement
            showNotification('Commande confirmée ! Redirection...');
            setTimeout(() => {
                cart = [];
                updateCartCount();
                window.location.href = 'index.html';
            }, 2000);
        });
    }
}

// Fonctions pour la page contact
function initContactMap() {
    const map = document.getElementById('map');
    if (!map) return;

    // Coordonnées de votre emplacement (à modifier)
    const lat = 48.8566;
    const lng = 2.3522;

    const leafletMap = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap);

    L.marker([lat, lng]).addTo(leafletMap)
        .bindPopup('Créations Artisanales')
        .openPopup();
}

function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
            newsletter: form.newsletter.checked
        };

        // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
        try {
            // Ici, vous pouvez ajouter votre logique d'envoi d'email
            // Par exemple avec EmailJS, un backend personnalisé, etc.
            
            showNotification('Message envoyé avec succès !');
            form.reset();
        } catch (error) {
            showNotification('Erreur lors de l\'envoi du message. Veuillez réessayer.', 'error');
        }
    });
}

// Amélioration de l'expérience de chargement
function showLoadingState(element) {
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.innerHTML = `
        <span class="spinner"></span>
        <span>Chargement...</span>
    `;
}

function hideLoadingState(element) {
    element.disabled = false;
    element.textContent = element.dataset.originalText;
}

// Amélioration des animations au scroll
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Amélioration des formulaires
function enhanceFormExperience() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Création du label flottant
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = input.placeholder;
            input.parentNode.insertBefore(label, input);
            
            // Gestion des états
            input.addEventListener('focus', () => {
                label.classList.add('active');
                input.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
                input.parentNode.classList.remove('focused');
            });
            
            // Validation en temps réel
            input.addEventListener('input', () => {
                validateInput(input);
            });
        });

        // Gestion de la soumission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm(form)) {
                showNotification('Veuillez corriger les erreurs du formulaire', 'error');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            showLoadingState(submitButton);

            try {
                await submitForm(form);
                showNotification('Formulaire envoyé avec succès !');
                form.reset();
            } catch (error) {
                showNotification('Une erreur est survenue', 'error');
            } finally {
                hideLoadingState(submitButton);
            }
        });
    });
}

// Validation améliorée des formulaires
function validateInput(input) {
    const errorElement = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : null;
    
    let isValid = true;
    let message = '';

    // Règles de validation
    switch (input.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            message = 'Email invalide';
            break;
        case 'tel':
            isValid = /^[0-9+\s-]{10,}$/.test(input.value);
            message = 'Numéro de téléphone invalide';
            break;
        case 'password':
            isValid = input.value.length >= 8;
            message = 'Le mot de passe doit contenir au moins 8 caractères';
            break;
        default:
            isValid = input.value.length >= 2;
            message = 'Ce champ est requis';
    }

    // Gestion des erreurs
    if (!isValid && input.value) {
        input.classList.add('invalid');
        if (!errorElement) {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    } else {
        input.classList.remove('invalid');
        errorElement?.remove();
    }

    return isValid;
}

// Validation du formulaire complet
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Simulation d'envoi de formulaire
async function submitForm(form) {
    // Simulation d'une requête API
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}

// Amélioration des états de chargement
function showLoadingState(element) {
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.innerHTML = `
        <span class="spinner"></span>
        <span>Chargement...</span>
    `;
}

function hideLoadingState(element) {
    element.disabled = false;
    element.textContent = element.dataset.originalText;
}

// Amélioration de la navigation mobile
function handleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.setAttribute('aria-label', 'Menu');
    
    document.querySelector('.navbar').insertBefore(hamburger, navLinks);
    
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('active');
        
        // Animation du hamburger
        hamburger.querySelector('i').className = isOpen ? 'fas fa-bars' : 'fas fa-times';
        
        // Animation du menu
        navLinks.classList.toggle('active');
        
        // Accessibilité
        hamburger.setAttribute('aria-expanded', !isOpen);
        navLinks.setAttribute('aria-hidden', isOpen);
    });

    // Fermeture au clic en dehors
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').className = 'fas fa-bars';
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    });
}

// Amélioration du panier
function enhanceCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');

    if (cartIcon && cartCount) {
        // Animation du compteur
        cartIcon.addEventListener('mouseenter', () => {
            cartCount.style.transform = 'scale(1.2)';
        });

        cartIcon.addEventListener('mouseleave', () => {
            cartCount.style.transform = 'scale(1)';
        });

        // Animation d'ajout au panier
        window.addEventListener('add-to-cart', () => {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 300);
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    enhanceFormExperience();
    handleMobileNav();
    enhanceCart();
    
    // Styles pour les animations
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            animation: fadeIn 0.6s ease-out forwards;
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 0.8s linear infinite;
        }
        
        .bounce {
            animation: bounce 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) both;
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .form-group {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .form-label {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .form-label.active {
            top: 0;
            transform: translateY(-50%) scale(0.85);
            background: white;
            padding: 0 0.5rem;
        }
        
        .error-message {
            color: var(--error-color);
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
        }
    `;
    document.head.appendChild(style);
});

// Gestion du menu mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
    });
}

// Gestion de la barre de recherche
const searchToggle = document.querySelector('.search-toggle');
const searchBar = document.querySelector('.search-bar');

if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchBar.classList.toggle('active');
    });

    // Fermer la barre de recherche au clic en dehors
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
            searchBar.classList.remove('active');
        }
    });

    // Gestion de la recherche
    const searchInput = searchBar.querySelector('input');
    const searchButton = searchBar.querySelector('button');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            // Rediriger vers la page de recherche avec le terme
            window.location.href = `boutique.html?search=${encodeURIComponent(query)}`;
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase().trim();
            if (query) {
                window.location.href = `boutique.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
} 