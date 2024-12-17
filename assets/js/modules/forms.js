import { debounce } from './utils.js';
import { showNotification } from './notifications.js';
import { validateEmail, validatePhone } from './utils.js';

// Amélioration de l'expérience formulaire
export function enhanceFormExperience() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Ajout des classes pour le style
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateInput(input);
        });
        
        // Validation en temps réel
        input.addEventListener('input', debounce(() => {
            validateInput(input);
        }, 300));

        // Gestion des placeholders animés
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
        
        input.addEventListener('input', () => {
            input.parentElement.classList.toggle('has-value', input.value.length > 0);
        });
    });

    // Gestion des formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// Validation des inputs
function validateInput(input) {
    const errorElement = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : null;
    
    let isValid = true;
    let message = '';

    switch (input.type) {
        case 'email':
            isValid = validateEmail(input.value);
            message = 'Email invalide';
            break;
        case 'tel':
            isValid = validatePhone(input.value);
            message = 'Numéro de téléphone invalide';
            break;
        case 'password':
            isValid = validatePassword(input.value);
            message = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
            break;
        default:
            isValid = input.value.length >= 2;
            message = 'Ce champ est requis';
    }

    // Gestion des champs requis
    if (input.required && !input.value) {
        isValid = false;
        message = 'Ce champ est requis';
    }

    // Affichage des erreurs
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

// Validation du mot de passe
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
}

// Gestion de la soumission des formulaires
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Validation de tous les champs
    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
    // Désactivation du bouton pendant l'envoi
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    try {
        // Simulation d'envoi (à remplacer par votre logique d'envoi)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Réinitialisation du formulaire
        form.reset();
        showNotification('Formulaire envoyé avec succès !');
        
        // Nettoyage des classes
        inputs.forEach(input => {
            input.parentElement.classList.remove('has-value', 'focused');
        });
        
    } catch (error) {
        showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
    } finally {
        // Réactivation du bouton
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Gestion des fichiers
export function handleFileInputs() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'file-input-wrapper';
        
        const label = document.createElement('label');
        label.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Choisir un fichier';
        
        const fileList = document.createElement('div');
        fileList.className = 'file-list';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        wrapper.appendChild(fileList);
        
        input.addEventListener('change', () => {
            fileList.innerHTML = '';
            
            Array.from(input.files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <span>${file.name}</span>
                    <button type="button" class="remove-file">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                fileItem.querySelector('.remove-file').addEventListener('click', () => {
                    input.value = '';
                    fileList.innerHTML = '';
                });
                
                fileList.appendChild(fileItem);
            });
        });
    });
}

// Gestion des champs de recherche
export function enhanceSearchInputs() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'search-input-wrapper';
        
        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.className = 'clear-search';
        clearButton.innerHTML = '<i class="fas fa-times"></i>';
        clearButton.style.display = 'none';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(clearButton);
        
        input.addEventListener('input', () => {
            clearButton.style.display = input.value ? 'block' : 'none';
        });
        
        clearButton.addEventListener('click', () => {
            input.value = '';
            clearButton.style.display = 'none';
            input.focus();
            input.dispatchEvent(new Event('input'));
        });
    });
} 