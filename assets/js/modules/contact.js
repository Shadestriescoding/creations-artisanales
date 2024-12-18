import { showNotification } from './notifications.js';

/**
 * Initialise la carte Leaflet
 */
function initMap() {
    // Coordonnées du magasin (à ajuster selon l'emplacement réel)
    const lat = 48.8566;
    const lng = 2.3522;
    
    const map = L.map('map').setView([lat, lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Ajouter un marqueur
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup("<b>La cabane d'Eva</b><br>Créations artisanales").openPopup();
}

/**
 * Gère la soumission du formulaire de contact
 * @param {Event} e - L'événement de soumission
 */
function handleContactForm(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validation basique
    if (!data.name || !data.email || !data.message) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Simuler l'envoi (à remplacer par un vrai appel API)
    setTimeout(() => {
        showNotification('Votre message a été envoyé avec succès !', 'success');
        e.target.reset();
    }, 1000);
}

/**
 * Initialise les fonctionnalités de la page contact
 */
export function initContact() {
    const contactForm = document.getElementById('contactForm');
    const mapElement = document.getElementById('map');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (mapElement) {
        initMap();
    }
}

export default {
    initContact
}; 