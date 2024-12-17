// Importation des modules
import { handleMobileNav } from './modules/navigation.js';
import { handleSearch, filterProducts } from './modules/search.js';
import { displayFeaturedProducts, addToCart, updateCartCount } from './modules/products.js';
import { handleNewsletterForm } from './modules/newsletter.js';
import { handleScrollAnimations } from './modules/animations.js';
import { enhanceFormExperience } from './modules/forms.js';
import { enhanceCart } from './modules/cart.js';
import { showNotification } from './modules/notifications.js';
import { debounce } from './modules/utils.js';

// Données des produits
export const featuredProducts = [
    {
        id: 1,
        name: "Croissant au Crochet",
        description: "Un croissant moelleux fait main, parfait pour la décoration",
        price: 15.99,
        image: "assets/images/products/croissant.jpg",
        category: "viennoiseries"
    },
    {
        id: 2,
        name: "Pain au Chocolat Crocheté",
        description: "Un classique français réinventé en version crochet",
        price: 17.99,
        image: "assets/images/products/pain-chocolat.jpg",
        category: "viennoiseries"
    },
    {
        id: 3,
        name: "Éclair au Café",
        description: "Un éclair décoratif avec des détails minutieux",
        price: 14.99,
        image: "assets/images/products/eclair.jpg",
        category: "patisseries"
    }
];

// Panier
export let cart = [];

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    handleMobileNav();
    handleSearch();
    handleNewsletterForm();
    handleScrollAnimations();
    enhanceFormExperience();
    enhanceCart();
});