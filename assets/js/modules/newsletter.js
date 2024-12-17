import { showNotification } from './notifications.js';
import { validateEmail } from './utils.js';

// Gestion du formulaire newsletter
export function handleNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleSubmit);
    });
}

// Gestion de la soumission du formulaire
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!validateEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    const button = form.querySelector('button');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';

    try {
        await subscribeToNewsletter(email);
        showNotification('Merci de votre inscription à la newsletter !');
        form.reset();
        saveSubscription(email);
    } catch (error) {
        showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = 'S\'abonner';
    }
}

// Simulation d'envoi à un service de newsletter
async function subscribeToNewsletter(email) {
    // Simulation d'une requête API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}

// Sauvegarde de l'inscription dans le localStorage
function saveSubscription(email) {
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
    if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
    }
}

// Vérification si l'email est déjà inscrit
export function isSubscribed(email) {
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
    return subscriptions.includes(email);
}

// Désabonnement de la newsletter
export async function unsubscribe(email) {
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
    const index = subscriptions.indexOf(email);
    
    if (index > -1) {
        subscriptions.splice(index, 1);
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
        
        try {
            // Simulation de désabonnement
            await new Promise(resolve => setTimeout(resolve, 1000));
            showNotification('Vous avez été désabonné de la newsletter');
            return true;
        } catch (error) {
            showNotification('Une erreur est survenue lors du désabonnement', 'error');
            return false;
        }
    }
    return false;
}

// Mise à jour des préférences de la newsletter
export async function updatePreferences(email, preferences) {
    try {
        // Simulation de mise à jour des préférences
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const userPreferences = JSON.parse(localStorage.getItem('newsletter_preferences') || '{}');
        userPreferences[email] = preferences;
        localStorage.setItem('newsletter_preferences', JSON.stringify(userPreferences));
        
        showNotification('Vos préférences ont été mises à jour');
        return true;
    } catch (error) {
        showNotification('Une erreur est survenue lors de la mise à jour des préférences', 'error');
        return false;
    }
}

// Récupération des préférences de la newsletter
export function getPreferences(email) {
    const userPreferences = JSON.parse(localStorage.getItem('newsletter_preferences') || '{}');
    return userPreferences[email] || {
        frequency: 'weekly',
        categories: [],
        format: 'html'
    };
}

// Validation du formulaire de préférences
export function validatePreferences(preferences) {
    const errors = [];
    
    if (!['daily', 'weekly', 'monthly'].includes(preferences.frequency)) {
        errors.push('Fréquence invalide');
    }
    
    if (!Array.isArray(preferences.categories)) {
        errors.push('Catégories invalides');
    }
    
    if (!['html', 'text'].includes(preferences.format)) {
        errors.push('Format invalide');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Gestion du formulaire de préférences
export function handlePreferencesForm() {
    const form = document.querySelector('.newsletter-preferences-form');
    if (!form) return;
    
    const email = form.dataset.email;
    if (!email || !isSubscribed(email)) {
        showNotification('Vous devez être inscrit à la newsletter pour modifier vos préférences', 'error');
        return;
    }
    
    const currentPreferences = getPreferences(email);
    
    // Pré-remplissage du formulaire
    form.querySelector('select[name="frequency"]').value = currentPreferences.frequency;
    form.querySelector('select[name="format"]').value = currentPreferences.format;
    
    currentPreferences.categories.forEach(category => {
        const checkbox = form.querySelector(`input[name="categories"][value="${category}"]`);
        if (checkbox) checkbox.checked = true;
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newPreferences = {
            frequency: form.querySelector('select[name="frequency"]').value,
            format: form.querySelector('select[name="format"]').value,
            categories: Array.from(form.querySelectorAll('input[name="categories"]:checked'))
                .map(input => input.value)
        };
        
        const validation = validatePreferences(newPreferences);
        if (!validation.isValid) {
            showNotification(validation.errors.join(', '), 'error');
            return;
        }
        
        await updatePreferences(email, newPreferences);
    });
} 