// ================================
// CUSTOM CUBE CURSOR
// ================================

function initCustomCursor() {
    // Only initialize on desktop devices with hover support
    if (!window.matchMedia('(hover: hover)').matches) {
        return;
    }

    // Create main cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Create cursor trail elements (optional - creates a nice effect)
    const trailCount = 3;
    const trails = [];
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.transitionDelay = `${i * 0.05}s`;
        document.body.appendChild(trail);
        trails.push(trail);
    }

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow animation
    function animateCursor() {
        // Smooth follow effect
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        // Update main cursor position
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Update trail positions with delay
        trails.forEach((trail, index) => {
            const delay = (index + 1) * 0.1;
            const trailX = cursorX + (mouseX - cursorX) * delay;
            const trailY = cursorY + (mouseY - cursorY) * delay;
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
        });

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn-hover, .card-hover, .icon-hover, img');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            trails.forEach(trail => {
                trail.style.opacity = '0.6';
            });
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            trails.forEach(trail => {
                trail.style.opacity = '0.4';
            });
        });
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        trails.forEach(trail => {
            trail.style.opacity = '0.8';
            trail.style.transform = 'rotate(45deg) scale(1.5)';
        });
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        trails.forEach(trail => {
            trail.style.opacity = '0.4';
            trail.style.transform = 'rotate(45deg) scale(1)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        trails.forEach(trail => {
            trail.style.opacity = '0';
        });
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        trails.forEach(trail => {
            trail.style.opacity = '0.4';
        });
    });
}

// ================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollAnimations();
    initHoverEffects();
    initTouchEffects();
    addIconHoverClasses();
});

// Initialize scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    fadeInElements.forEach(el => observer.observe(el));
}

// ================================
// ENHANCED HOVER EFFECTS
// ================================

function initHoverEffects() {
    // Only add hover effects on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
        // Add smooth transitions to all interactive elements
        const interactiveElements = document.querySelectorAll('.btn-hover, .card-hover');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            element.addEventListener('mouseleave', function(e) {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
}

// ================================
// MOBILE TOUCH EFFECTS
// ================================

function initTouchEffects() {
    // Add touch feedback for mobile devices
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.btn-hover, .card-hover');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touching');
            });
            
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('touching');
                }, 150);
            });
            
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touching');
            });
        });
    }
}

// ================================
// RIPPLE EFFECT FOR BUTTONS
// ================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple-effect');

    const rippleEffect = button.getElementsByClassName('ripple-effect')[0];
    if (rippleEffect) {
        rippleEffect.remove();
    }

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn-hover').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ================================
// ICON HOVER CLASSES
// ================================

function addIconHoverClasses() {
    const icons = document.querySelectorAll('img[alt*="instagram"], img[alt*="mail"], img[alt*="phone"], img[alt*="behance"], img[alt*="artstation"]');
    icons.forEach(icon => {
        icon.classList.add('icon-hover');
    });
}

// ================================
// PARALLAX EFFECT (OPTIONAL)
// ================================

function initParallax() {
    if (window.innerWidth > 1024) {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// CARD CLICK EFFECTS
// ================================

function initCardClicks() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Add a brief highlight effect
            this.style.transition = 'all 0.1s ease';
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.transform = '';
            }, 100);
        });
    });
}

initCardClicks();

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Throttle function for scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// ================================
// PROGRESSIVE IMAGE LOADING
// ================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ================================

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', debounce(setViewportHeight, 250));

// ================================
// LOADING ANIMATION
// ================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const firstElements = document.querySelectorAll('.fade-in:nth-child(1)');
        firstElements.forEach(el => el.classList.add('visible'));
    }, 100);
});

// ================================
// CONSOLE LOG
// ================================

console.log('🎨 Animations initialized successfully!');
console.log('✨ Fade-in effects: Active');
console.log('🖱️ Hover effects: Active');
console.log('📱 Touch effects: Active');