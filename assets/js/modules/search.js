import { debounce } from './utils.js';

// Gestion de la recherche
export function handleSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchBar.querySelector('input').focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
                searchBar.classList.remove('active');
            }
        });

        const searchInput = searchBar.querySelector('input');
        const searchButton = searchBar.querySelector('button');

        searchInput.addEventListener('input', debounce(() => {
            const query = searchInput.value.toLowerCase().trim();
            filterProducts(query);
        }, 300));

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query) {
                filterProducts(query);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.toLowerCase().trim();
                if (query) {
                    filterProducts(query);
                }
            }
        });
    }
}

// Filtrage des produits
export function filterProducts(query = '', filters = {}) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
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