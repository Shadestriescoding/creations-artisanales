import { showNotification } from './notifications.js';
import { addToCart } from './cart.js';

// État des produits
const productsState = {
    products: [],
    categories: [],
    filters: {
        category: null,
        priceRange: { min: 0, max: Infinity },
        availability: null,
        sortBy: 'featured',
        search: ''
    },
    currentPage: 1,
    itemsPerPage: 9,
    view: 'grid', // 'grid' ou 'list'
    favorites: new Set(),
    isLoading: false,
    lastUpdate: null
};

/**
 * Initialise le module des produits
 * @returns {Promise<void>}
 */
export async function initProducts() {
    try {
        productsState.isLoading = true;
        showLoadingState(true);

        await Promise.all([
            loadProducts(),
            loadFavorites()
        ]);

        setupFilters();
        setupSort();
        setupView();
        setupPagination();
        setupSearch();
        setupInfiniteScroll();
        
        await renderProducts();
        setupProductEvents();

        return Promise.resolve();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des produits:', error);
        showNotification('Erreur lors du chargement des produits', 'error');
        return Promise.reject(error);
    } finally {
        productsState.isLoading = false;
        showLoadingState(false);
    }
}

/**
 * Affiche/masque l'état de chargement
 */
function showLoadingState(isLoading) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    if (isLoading) {
        productGrid.classList.add('loading');
        productGrid.setAttribute('aria-busy', 'true');
        productGrid.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Chargement des produits...</span>
            </div>
        `;
    } else {
        productGrid.classList.remove('loading');
        productGrid.removeAttribute('aria-busy');
    }
}

/**
 * Charge les produits depuis l'API ou le fichier JSON
 */
async function loadProducts() {
    try {
        // Vérifier si nous avons des données en cache et si elles sont récentes
        const cachedData = localStorage.getItem('productsData');
        const lastUpdate = localStorage.getItem('productsLastUpdate');
        
        if (cachedData && lastUpdate) {
            const cacheAge = Date.now() - parseInt(lastUpdate);
            if (cacheAge < 3600000) { // 1 heure
                const data = JSON.parse(cachedData);
                productsState.products = data.products;
                productsState.categories = data.categories;
                productsState.lastUpdate = parseInt(lastUpdate);
                return true;
            }
        }

        const response = await fetch('/assets/data/products.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des produits');
        
        const data = await response.json();
        productsState.products = data.products;
        productsState.categories = data.categories;
        productsState.lastUpdate = Date.now();

        // Mettre en cache les données
        localStorage.setItem('productsData', JSON.stringify(data));
        localStorage.setItem('productsLastUpdate', productsState.lastUpdate.toString());
        
        return true;
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        showNotification('Erreur lors du chargement des produits', 'error');
        return false;
    }
}

/**
 * Charge les favoris depuis le localStorage
 */
async function loadFavorites() {
    try {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            productsState.favorites = new Set(JSON.parse(favorites));
        }
    } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
        productsState.favorites = new Set();
    }
}

/**
 * Configure les filtres
 */
function setupFilters() {
    const filterForm = document.querySelector('.shop-filters');
    if (!filterForm) return;

    // Réinitialisation des filtres
    const resetButton = filterForm.querySelector('.reset-filters');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            filterForm.reset();
            Object.assign(productsState.filters, {
                category: null,
                priceRange: { min: 0, max: Infinity },
                availability: null,
                sortBy: 'featured',
                search: ''
            });
            productsState.currentPage = 1;
            renderProducts();
        });
    }

    // Catégories
    const categoryFilters = filterForm.querySelectorAll('[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            productsState.filters.category = filter.checked ? filter.value : null;
            productsState.currentPage = 1;
            renderProducts();
            updateURL();
        });
    });

    // Prix
    const priceInputs = filterForm.querySelectorAll('[name^="price"]');
    priceInputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            productsState.filters.priceRange = {
                min: parseFloat(filterForm.querySelector('[name="price_min"]').value) || 0,
                max: parseFloat(filterForm.querySelector('[name="price_max"]').value) || Infinity
            };
            productsState.currentPage = 1;
            renderProducts();
            updateURL();
        }, 500));
    });

    // Disponibilité
    const availabilityFilters = filterForm.querySelectorAll('[name="availability"]');
    availabilityFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            productsState.filters.availability = filter.checked ? filter.value : null;
            productsState.currentPage = 1;
            renderProducts();
            updateURL();
        });
    });

    // Charger les filtres depuis l'URL
    loadFiltersFromURL();
}

/**
 * Configure la recherche
 */
function setupSearch() {
    const searchInput = document.querySelector('.shop-search input');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce((e) => {
        productsState.filters.search = e.target.value.trim().toLowerCase();
        productsState.currentPage = 1;
        renderProducts();
        updateURL();
    }, 300));
}

/**
 * Configure le tri
 */
function setupSort() {
    const sortSelect = document.querySelector('.sort-select');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
        productsState.filters.sortBy = sortSelect.value;
        renderProducts();
        updateURL();
    });
}

/**
 * Configure la vue (grille/liste)
 */
function setupView() {
    const viewButtons = document.querySelectorAll('.view-options button');
    if (!viewButtons.length) return;

    // Charger la vue préférée
    const savedView = localStorage.getItem('preferredView');
    if (savedView) {
        productsState.view = savedView;
        viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === savedView);
        });
    }

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            productsState.view = button.dataset.view;
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const productGrid = document.querySelector('.product-grid');
            if (productGrid) {
                productGrid.className = `product-grid ${productsState.view}-view`;
            }

            // Sauvegarder la préférence
            localStorage.setItem('preferredView', productsState.view);
        });
    });
}

/**
 * Configure le défilement infini
 */
function setupInfiniteScroll() {
    const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !productsState.isLoading) {
                const totalPages = Math.ceil(filterProducts().length / productsState.itemsPerPage);
                if (productsState.currentPage < totalPages) {
                    productsState.currentPage++;
                    renderProducts(true); // append = true
                }
            }
        });
    }, options);

    const sentinel = document.querySelector('.infinite-scroll-sentinel');
    if (sentinel) {
        observer.observe(sentinel);
    }
}

/**
 * Filtre les produits selon les critères actuels
 */
function filterProducts() {
    return productsState.products.filter(product => {
        // Filtre par recherche
        if (productsState.filters.search) {
            const searchTerm = productsState.filters.search.toLowerCase();
            const searchableText = `
                ${product.name.toLowerCase()}
                ${product.description.toLowerCase()}
                ${product.category.toLowerCase()}
            `;
            if (!searchableText.includes(searchTerm)) {
                return false;
            }
        }

        // Filtre par catégorie
        if (productsState.filters.category && 
            product.category !== productsState.filters.category) {
            return false;
        }

        // Filtre par prix
        const { min, max } = productsState.filters.priceRange;
        if (product.price < min || product.price > max) {
            return false;
        }

        // Filtre par disponibilité
        if (productsState.filters.availability && 
            product.availability !== productsState.filters.availability) {
            return false;
        }

        return true;
    });
}

/**
 * Trie les produits selon le critère actuel
 */
function sortProducts(products) {
    const sortedProducts = [...products];
    
    switch (productsState.filters.sortBy) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name, 'fr'));
            break;
        case 'newest':
            sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        // Par défaut : tri par mise en avant
        default:
            sortedProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    return sortedProducts;
}

/**
 * Génère le HTML pour un produit
 */
function generateProductHTML(product) {
    const isFavorite = productsState.favorites.has(product.id.toString());
    
    return `
        <div class="product-card" 
             data-id="${product.id}"
             data-category="${product.category}"
             data-price="${product.price}"
             data-availability="${product.availability}">
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}"
                     loading="lazy"
                     srcset="${product.image} 1x${product.imageAlt ? `, ${product.imageAlt} 2x` : ''}"
                     sizes="(max-width: 768px) 100vw, 50vw">
                ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="produit.html?id=${product.id}" class="product-link">
                        ${product.name}
                    </a>
                </h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <p class="product-price">${product.price.toFixed(2)} €</p>
                    <p class="product-availability ${product.availability}">
                        ${product.availability === 'in-stock' ? 'En stock' : 'Sur commande'}
                    </p>
                </div>
                <div class="product-actions">
                    <button type="button"
                            class="button button-primary add-to-cart"
                            data-id="${product.id}"
                            ${product.availability !== 'in-stock' ? 'disabled' : ''}
                            aria-label="Ajouter ${product.name} au panier">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Ajouter au panier</span>
                    </button>
                    <button type="button"
                            class="button button-icon favorite-btn ${isFavorite ? 'active' : ''}"
                            data-id="${product.id}"
                            aria-label="${isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
                            aria-pressed="${isFavorite}">
                        <i class="fa${isFavorite ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Configure les événements des produits
 */
function setupProductEvents() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    // Délégation d'événements pour les boutons
    productGrid.addEventListener('click', async (e) => {
        const addToCartBtn = e.target.closest('.add-to-cart');
        const favoriteBtn = e.target.closest('.favorite-btn');

        if (addToCartBtn) {
            e.preventDefault();
            const productId = addToCartBtn.dataset.id;
            const product = productsState.products.find(p => p.id.toString() === productId);
            
            if (product) {
                addToCartBtn.disabled = true;
                addToCartBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                try {
                    await addToCart(product);
                    addToCartBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        addToCartBtn.disabled = false;
                        addToCartBtn.innerHTML = `
                            <i class="fas fa-shopping-cart"></i>
                            <span>Ajouter au panier</span>
                        `;
                    }, 1000);
                } catch (error) {
                    console.error('Erreur lors de l\'ajout au panier:', error);
                    showNotification('Erreur lors de l\'ajout au panier', 'error');
                    addToCartBtn.disabled = false;
                    addToCartBtn.innerHTML = `
                        <i class="fas fa-shopping-cart"></i>
                        <span>Ajouter au panier</span>
                    `;
                }
            }
        }

        if (favoriteBtn) {
            e.preventDefault();
            const productId = favoriteBtn.dataset.id;
            toggleFavorite(productId, favoriteBtn);
        }
    });

    // Images alternatives au survol
    productGrid.addEventListener('mouseenter', (e) => {
        const productImage = e.target.closest('.product-image img');
        if (productImage && productImage.dataset.alternativeImage) {
            productImage.dataset.originalSrc = productImage.src;
            productImage.src = productImage.dataset.alternativeImage;
        }
    }, true);

    productGrid.addEventListener('mouseleave', (e) => {
        const productImage = e.target.closest('.product-image img');
        if (productImage && productImage.dataset.originalSrc) {
            productImage.src = productImage.dataset.originalSrc;
        }
    }, true);
}

/**
 * Bascule l'état favori d'un produit
 */
async function toggleFavorite(productId, button) {
    try {
        const isFavorite = productsState.favorites.has(productId);
        
        if (isFavorite) {
            productsState.favorites.delete(productId);
            showNotification('Produit retiré des favoris', 'info');
        } else {
            productsState.favorites.add(productId);
            showNotification('Produit ajouté aux favoris', 'success');
        }

        // Mettre à jour le bouton
        const icon = button.querySelector('i');
        icon.classList.toggle('fas', !isFavorite);
        icon.classList.toggle('far', isFavorite);
        button.classList.toggle('active', !isFavorite);
        button.setAttribute('aria-pressed', !isFavorite);
        button.setAttribute('aria-label', 
            isFavorite ? 'Ajouter aux favoris' : 'Retirer des favoris'
        );

        // Sauvegarder les favoris
        localStorage.setItem('favorites', JSON.stringify([...productsState.favorites]));

        // Animation du bouton
        button.classList.add('animate');
        setTimeout(() => button.classList.remove('animate'), 300);

    } catch (error) {
        console.error('Erreur lors de la gestion des favoris:', error);
        showNotification('Erreur lors de la gestion des favoris', 'error');
    }
}

/**
 * Met à jour l'URL avec les filtres actuels
 */
function updateURL() {
    const params = new URLSearchParams();
    
    if (productsState.filters.category) {
        params.set('category', productsState.filters.category);
    }
    if (productsState.filters.search) {
        params.set('q', productsState.filters.search);
    }
    if (productsState.filters.availability) {
        params.set('availability', productsState.filters.availability);
    }
    if (productsState.filters.sortBy !== 'featured') {
        params.set('sort', productsState.filters.sortBy);
    }
    if (productsState.filters.priceRange.min > 0) {
        params.set('min_price', productsState.filters.priceRange.min);
    }
    if (productsState.filters.priceRange.max < Infinity) {
        params.set('max_price', productsState.filters.priceRange.max);
    }

    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
}

/**
 * Charge les filtres depuis l'URL
 */
function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('category')) {
        productsState.filters.category = params.get('category');
        const categoryInput = document.querySelector(`[name="category"][value="${params.get('category')}"]`);
        if (categoryInput) categoryInput.checked = true;
    }
    
    if (params.has('q')) {
        productsState.filters.search = params.get('q');
        const searchInput = document.querySelector('.shop-search input');
        if (searchInput) searchInput.value = params.get('q');
    }
    
    if (params.has('availability')) {
        productsState.filters.availability = params.get('availability');
        const availabilityInput = document.querySelector(`[name="availability"][value="${params.get('availability')}"]`);
        if (availabilityInput) availabilityInput.checked = true;
    }
    
    if (params.has('sort')) {
        productsState.filters.sortBy = params.get('sort');
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) sortSelect.value = params.get('sort');
    }
    
    if (params.has('min_price')) {
        productsState.filters.priceRange.min = parseFloat(params.get('min_price'));
        const minPriceInput = document.querySelector('[name="price_min"]');
        if (minPriceInput) minPriceInput.value = params.get('min_price');
    }
    
    if (params.has('max_price')) {
        productsState.filters.priceRange.max = parseFloat(params.get('max_price'));
        const maxPriceInput = document.querySelector('[name="price_max"]');
        if (maxPriceInput) maxPriceInput.value = params.get('max_price');
    }
}

/**
 * Utilitaire pour debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default {
    initProducts,
    getState: () => ({ ...productsState })
}; 