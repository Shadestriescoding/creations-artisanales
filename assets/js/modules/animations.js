// Gestion des animations au scroll
export function handleScrollAnimations() {
    const elements = document.querySelectorAll('.category-card, .product-card, .section-title, .hero-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Animation de fondu
export function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.opacity = '1';
    });
}

// Animation de glissement
export function slideIn(element, direction = 'left', duration = 300) {
    const directions = {
        left: 'translateX(-100%)',
        right: 'translateX(100%)',
        top: 'translateY(-100%)',
        bottom: 'translateY(100%)'
    };
    
    element.style.transform = directions[direction];
    element.style.transition = `transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.transform = 'translate(0)';
    });
}

// Animation de rebond
export function bounce(element, scale = 1.2, duration = 300) {
    element.style.transform = 'scale(1)';
    element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    
    requestAnimationFrame(() => {
        element.style.transform = `scale(${scale})`;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, duration);
    });
}

// Animation de rotation
export function rotate(element, degrees = 360, duration = 300) {
    element.style.transform = 'rotate(0deg)';
    element.style.transition = `transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.transform = `rotate(${degrees}deg)`;
    });
}

// Animation de secousse
export function shake(element, intensity = 5, duration = 500) {
    const keyframes = [
        { transform: 'translateX(0)' },
        { transform: `translateX(${intensity}px)` },
        { transform: `translateX(-${intensity}px)` },
        { transform: `translateX(${intensity}px)` },
        { transform: `translateX(-${intensity}px)` },
        { transform: 'translateX(0)' }
    ];
    
    element.animate(keyframes, {
        duration: duration,
        easing: 'ease-in-out'
    });
}

// Animation de pulsation
export function pulse(element, scale = 1.1, duration = 300) {
    const keyframes = [
        { transform: 'scale(1)' },
        { transform: `scale(${scale})` },
        { transform: 'scale(1)' }
    ];
    
    element.animate(keyframes, {
        duration: duration,
        easing: 'ease-in-out'
    });
}

// Animation de fondu avec déplacement
export function fadeInSlide(element, direction = 'up', distance = 20, duration = 300) {
    const directions = {
        up: `translateY(${distance}px)`,
        down: `translateY(-${distance}px)`,
        left: `translateX(${distance}px)`,
        right: `translateX(-${distance}px)`
    };
    
    element.style.opacity = '0';
    element.style.transform = directions[direction];
    element.style.transition = `all ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0)';
    });
}

// Animation de flip
export function flip(element, direction = 'x', duration = 300) {
    const axis = direction.toLowerCase() === 'x' ? 'rotateX' : 'rotateY';
    
    element.style.transform = `${axis}(0)`;
    element.style.transition = `transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.transform = `${axis}(180deg)`;
    });
}

// Animation de disparition progressive
export function fadeOut(element, duration = 300) {
    return new Promise(resolve => {
        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    });
}

// Animation d'apparition progressive
export function reveal(element, duration = 300) {
    element.style.display = '';
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.opacity = '1';
    });
}

// Gestionnaire d'animations multiples
export function chainAnimations(animations) {
    return animations.reduce((promise, animation) => {
        return promise.then(() => {
            return new Promise(resolve => {
                animation.callback();
                setTimeout(resolve, animation.duration);
            });
        });
    }, Promise.resolve());
} 