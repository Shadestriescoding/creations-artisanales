// Configuration de Sentry pour le suivi des erreurs
export function initErrorTracking() {
    import('https://browser.sentry-cdn.com/7.34.0/bundle.min.js')
        .then(Sentry => {
            Sentry.init({
                dsn: "https://votre-dsn-sentry@o0.ingest.sentry.io/0",
                integrations: [
                    new Sentry.BrowserTracing(),
                    new Sentry.Replay()
                ],
                tracesSampleRate: 1.0,
                replaysSessionSampleRate: 0.1,
                replaysOnErrorSampleRate: 1.0
            });

            // Capture des erreurs non gérées
            window.onerror = function(message, source, lineno, colno, error) {
                Sentry.captureException(error || new Error(message), {
                    extra: {
                        source,
                        lineno,
                        colno
                    }
                });
                return false;
            };

            // Capture des rejets de promesses non gérés
            window.onunhandledrejection = function(event) {
                Sentry.captureException(event.reason, {
                    extra: {
                        type: 'unhandledrejection'
                    }
                });
            };

            // Capture des erreurs de ressources
            window.addEventListener('error', function(event) {
                if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK')) {
                    Sentry.captureMessage(`Erreur de chargement de ressource: ${event.target.src || event.target.href}`, {
                        level: 'warning',
                        extra: {
                            tagName: event.target.tagName,
                            src: event.target.src || event.target.href
                        }
                    });
                }
            }, true);

            console.log('Sentry initialisé avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'initialisation de Sentry:', error);
        });
}

// Fonction pour envoyer des erreurs personnalisées
export function trackError(error, context = {}) {
    if (window.Sentry) {
        window.Sentry.captureException(error, {
            extra: context
        });
    } else {
        console.error('Erreur non tracée (Sentry non initialisé):', error, context);
    }
}

// Fonction pour envoyer des événements personnalisés
export function trackEvent(name, data = {}) {
    if (window.Sentry) {
        window.Sentry.captureMessage(name, {
            level: 'info',
            extra: data
        });
    } else {
        console.log('Événement non tracé (Sentry non initialisé):', name, data);
    }
}

// Fonction pour définir le contexte utilisateur
export function setUserContext(userData) {
    if (window.Sentry) {
        window.Sentry.setUser(userData);
    }
}

// Fonction pour effacer le contexte utilisateur
export function clearUserContext() {
    if (window.Sentry) {
        window.Sentry.setUser(null);
    }
} 