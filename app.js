// Portfolio Website JavaScript
// Handles mobile menu toggle and smooth interactions

class PortfolioApp {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.body = document.body;
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleKeyboardNavigation();
        this.addProjectCardInteractivity();
    }
    
    bindEvents() {
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close menu when clicking on menu links
        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        if (this.mobileMenu) {
            this.mobileMenu.addEventListener('click', (e) => {
                if (e.target === this.mobileMenu) {
                    this.closeMobileMenu();
                }
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        const isActive = this.mobileMenu.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.hamburger.classList.add('active');
        this.hamburger.setAttribute('aria-expanded', 'true');
        this.mobileMenu.classList.add('active');
        this.body.classList.add('menu-open');
        
        // Focus management - focus first menu item
        setTimeout(() => {
            const firstMenuItem = this.mobileMenu.querySelector('.mobile-menu__link');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }, 100);
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.mobileMenu.classList.remove('active');
        this.body.classList.remove('menu-open');
        
        // Return focus to hamburger button
        setTimeout(() => {
            this.hamburger.focus();
        }, 100);
    }
    
    handleResize() {
        // Close mobile menu if window is resized to desktop size
        if (window.innerWidth >= 768 && this.mobileMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }
    
    handleKeyboardNavigation() {
        // Trap focus within mobile menu when open
        this.mobileMenu.addEventListener('keydown', (e) => {
            if (!this.mobileMenu.classList.contains('active')) return;
            
            const focusableElements = this.mobileMenu.querySelectorAll('.mobile-menu__link');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
    
    addProjectCardInteractivity() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Make cards keyboard accessible
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View project: ${card.querySelector('.project-card__title').textContent}`);
            
            // Add click and keyboard event listeners
            card.addEventListener('click', () => {
                this.handleProjectCardClick(card, index);
            });
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleProjectCardClick(card, index);
                }
            });
            
            // Add hover effect enhancement
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.enhanceCardHover(card, false);
            });
        });
    }
    
    handleProjectCardClick(card, index) {
        // For demo purposes, we'll show an alert with project info
        // In a real implementation, this would navigate to a project detail page
        const title = card.querySelector('.project-card__title').textContent;
        const description = card.querySelector('.project-card__description').textContent;
        
        // Add a subtle animation to indicate the click
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // In a real app, you might do something like:
        // window.location.href = `/project/${index + 1}`;
        // For now, we'll just log the interaction
        console.log(`Project clicked: ${title}`);
        
        // Optional: Show project details in a modal or navigate to project page
        // this.showProjectModal(title, description);
    }
    
    enhanceCardHover(card, isHovering) {
        const image = card.querySelector('.project-card__image');
        if (image) {
            if (isHovering) {
                image.style.transform = 'scale(1.02)';
            } else {
                image.style.transform = 'scale(1)';
            }
        }
    }
    
    // Optional method for showing project details
    showProjectModal(title, description) {
        // This would create and show a modal with project details
        // Implementation would depend on specific requirements
        console.log(`Opening modal for: ${title}`);
    }
}

// Smooth scroll functionality for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling to all anchor links
        const anchors = document.querySelectorAll('a[href^="#"]');
        
        anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip if it's just '#' or if the target doesn't exist
                if (href === '#' || href === '#about' || href === '#contact') {
                    e.preventDefault();
                    // For demo purposes, we'll just show a message
                    console.log(`Navigation to ${href} - This would navigate to the ${href.slice(1)} page in a full implementation`);
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Performance monitoring (optional)
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                // Report any performance issues
                if (loadTime > 3000) {
                    console.warn('Page load time exceeds 3 seconds');
                }
            }
        });
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app functionality
    new PortfolioApp();
    new SmoothScroll();
    
    // Initialize performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new PerformanceMonitor();
    }
    
    // Add loading states
    document.body.classList.add('loaded');
    
    console.log('Portfolio website initialized successfully!');
});

// Export for potential testing or module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, SmoothScroll, PerformanceMonitor };
}