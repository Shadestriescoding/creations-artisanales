import { showNotification } from './notifications.js';
import { formatPrice } from './utils.js';

// Gestion des filtres
export function handleFilters() {
    const filters = document.querySelectorAll('.shop-filters input[type="checkbox"]');
    const priceRange = document.getElementById('price-range');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const applyPrice = document.querySelector('.apply-price');
    const resetFilters = document.querySelector('.reset-filters');

    // Écouteurs d'événements pour les filtres
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            applyFilters();
        });
    });

    // Gestion du filtre de prix
    if (priceRange && minPrice && maxPrice) {
        priceRange.addEventListener('input', (e) => {
            maxPrice.value = e.target.value;
        });

        applyPrice.addEventListener('click', () => {
            applyFilters();
        });
    }

    // Réinitialisation des filtres
    if (resetFilters) {
        resetFilters.addEventListener('click', () => {
            filters.forEach(filter => filter.checked = false);
            if (priceRange) priceRange.value = priceRange.min;
            if (minPrice) minPrice.value = '';
            if (maxPrice) maxPrice.value = '';
            applyFilters();
            showNotification('Filtres réinitialisés');
        });
    }
}

// Application des filtres
function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);
    
    const selectedAvailability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
        .map(input => input.value);
    
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const category = product.dataset.category;
        const availability = product.dataset.availability;
        const price = parseFloat(product.dataset.price);

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
        const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(availability);
        const matchesPrice = price >= minPrice && price <= maxPrice;

        product.style.display = matchesCategory && matchesAvailability && matchesPrice ? 'block' : 'none';
    });

    updateProductCount();
}

// Gestion du tri
export function handleSort() {
    const sortSelect = document.querySelector('.sort-select');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
        const products = Array.from(document.querySelectorAll('.product-card'));
        const productGrid = document.querySelector('.product-grid');
        
        products.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);

            switch (sortSelect.value) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'newest':
                    return dateB - dateA;
                default:
                    return 0;
            }
        });

        productGrid.innerHTML = '';
        products.forEach(product => productGrid.appendChild(product));
    });
}

// Gestion de la vue (grille/liste)
export function handleView() {
    const viewGrid = document.querySelector('.view-grid');
    const viewList = document.querySelector('.view-list');
    const productGrid = document.querySelector('.product-grid');

    if (viewGrid && viewList && productGrid) {
        viewGrid.addEventListener('click', () => {
            productGrid.classList.remove('list-view');
            viewGrid.classList.add('active');
            viewList.classList.remove('active');
        });

        viewList.addEventListener('click', () => {
            productGrid.classList.add('list-view');
            viewList.classList.add('active');
            viewGrid.classList.remove('active');
        });
    }
}

// Gestion de la pagination
export function handlePagination() {
    const prevPage = document.querySelector('.prev-page');
    const nextPage = document.querySelector('.next-page');
    const pageButtons = document.querySelectorAll('.page-numbers button');
    
    if (!prevPage || !nextPage || !pageButtons.length) return;

    let currentPage = 1;
    const totalPages = pageButtons.length;

    function updatePagination() {
        prevPage.disabled = currentPage === 1;
        nextPage.disabled = currentPage === totalPages;

        pageButtons.forEach((button, index) => {
            button.classList.toggle('active', index + 1 === currentPage);
        });

        // Simuler le chargement des produits
        showNotification(`Page ${currentPage} chargée`);
    }

    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextPage.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    pageButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentPage = index + 1;
            updatePagination();
        });
    });
}

// Mise à jour du compteur de produits
function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product-card:not([style*="display: none"])');
    const totalProducts = document.querySelectorAll('.product-card').length;
    
    const header = document.querySelector('.shop-header h1');
    if (header) {
        header.textContent = `Nos Créations (${visibleProducts.length}/${totalProducts})`;
    }
} 