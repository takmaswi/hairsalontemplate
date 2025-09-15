/**
 * Main JavaScript functionality for Luxe Hair Studio
 * Handles all interactive features and utilities
 */

class LuxeHairStudio {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupIntersectionObservers();
        this.setupParallax();
    }

    init() {
        // Initialize all components
        this.setupLazyLoading();
        this.setupSearchFunctionality();
        this.setupProductFilters();
        this.setupVirtualTryOn();
        this.setupHairLengthCalculator();
        this.setupReviewSystem();
        this.initializeAnimations();
    }

    bindEvents() {
        // Search functionality
        this.setupSearch();
        
        // Product quick view
        this.setupQuickView();
        
        // Image zoom
        this.setupImageZoom();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Newsletter subscription
        this.setupNewsletter();
        
        // Contact form
        this.setupContactForm();
        
        // Product variant selection
        this.setupProductVariants();
    }

    // Lazy Loading Implementation
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-lazy]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.lazy;
                        img.classList.add('fade-in');
                        img.classList.remove('lazy-image');
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                img.classList.add('lazy-image');
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            lazyImages.forEach(img => {
                img.src = img.dataset.lazy;
            });
        }
    }

    // Search Functionality
    setupSearchFunctionality() {
        const searchInput = document.querySelector('#search-input');
        const searchResults = document.querySelector('#search-results');
        
        if (!searchInput) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                this.hideSearchResults();
                return;
            }

            searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchResults();
            }
        });
    }

    setupSearch() {
        const searchForm = document.querySelector('#search-form');
        const searchInput = document.querySelector('#search-input');
        
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                }
            });
        }
    }

    async performSearch(query) {
        // In a real implementation, this would hit your backend API
        const mockResults = await this.getMockSearchResults(query);
        this.displaySearchResults(mockResults);
    }

    getMockSearchResults(query) {
        // Mock search results - replace with actual API call
        const products = [
            { id: 1, name: 'Brazilian Straight Hair Bundle', price: 299, image: '/assets/images/product1.jpg', category: 'Bundles' },
            { id: 2, name: 'HD Lace Frontal 13x4', price: 180, image: '/assets/images/product2.jpg', category: 'Frontals' },
            { id: 3, name: 'Glueless Body Wave Wig', price: 399, image: '/assets/images/product3.jpg', category: 'Wigs' },
            { id: 4, name: 'Peruvian Curly Hair Bundle', price: 349, image: '/assets/images/product4.jpg', category: 'Bundles' },
            { id: 5, name: 'Malaysian Deep Wave Closure', price: 120, image: '/assets/images/product5.jpg', category: 'Closures' }
        ];

        return products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
    }

    displaySearchResults(results) {
        const searchResults = document.querySelector('#search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="p-4 text-center text-gray-500">
                    <p>No products found</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = results.map(product => `
                <div class="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                    <img src="${product.image}" alt="${product.name}" 
                         class="w-12 h-12 rounded-lg object-cover mr-3"
                         onerror="this.src='/assets/images/placeholder.jpg'">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-800">${product.name}</h4>
                        <p class="text-sm text-gray-500">${product.category}</p>
                    </div>
                    <div class="text-primary font-semibold">$${product.price}</div>
                </div>
            `).join('');
        }

        searchResults.classList.remove('hidden');
    }

    hideSearchResults() {
        const searchResults = document.querySelector('#search-results');
        if (searchResults) {
            searchResults.classList.add('hidden');
        }
    }

    // Product Filters
    setupProductFilters() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const productCards = document.querySelectorAll('[data-category]');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter products
                productCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Quick View Modal
    setupQuickView() {
        const quickViewButtons = document.querySelectorAll('[data-quick-view]');
        
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.productId;
                this.openQuickView(productId);
            });
        });
    }

    openQuickView(productId) {
        // In a real app, fetch product data from API
        const mockProductData = this.getMockProductData(productId);
        this.displayQuickViewModal(mockProductData);
    }

    getMockProductData(productId) {
        return {
            id: productId,
            name: 'Brazilian Straight Hair Bundle',
            price: 299,
            originalPrice: 399,
            images: ['/assets/images/product1.jpg', '/assets/images/product1-2.jpg'],
            description: 'Premium quality Brazilian straight hair bundle with natural shine and texture.',
            lengths: ['16"', '18"', '20"', '22"', '24"'],
            textures: ['Straight', 'Body Wave', 'Deep Wave'],
            rating: 4.8,
            reviews: 24
        };
    }

    displayQuickViewModal(product) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-90vh overflow-y-auto">
                <div class="p-6 border-b flex items-center justify-between">
                    <h2 class="text-2xl font-bold">${product.name}</h2>
                    <button class="text-gray-500 hover:text-gray-700 text-2xl" onclick="this.closest('.fixed').remove()">×</button>
                </div>
                
                <div class="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                        <img src="${product.images[0]}" alt="${product.name}" 
                             class="w-full h-80 object-cover rounded-lg">
                    </div>
                    
                    <div>
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400 mr-2">★★★★★</div>
                            <span class="text-gray-600">(${product.reviews} reviews)</span>
                        </div>
                        
                        <div class="mb-4">
                            <span class="text-3xl font-bold text-primary">$${product.price}</span>
                            ${product.originalPrice ? `<span class="text-lg text-gray-500 line-through ml-2">$${product.originalPrice}</span>` : ''}
                        </div>
                        
                        <p class="text-gray-600 mb-4">${product.description}</p>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Length</label>
                                <select class="w-full p-2 border rounded-lg">
                                    ${product.lengths.map(length => `<option value="${length}">${length}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">Texture</label>
                                <select class="w-full p-2 border rounded-lg">
                                    ${product.textures.map(texture => `<option value="${texture}">${texture}</option>`).join('')}
                                </select>
                            </div>
                            
                            <button class="w-full bg-success text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                                Add to WhatsApp Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Image Zoom Functionality
    setupImageZoom() {
        const zoomContainers = document.querySelectorAll('.zoom-container');
        
        zoomContainers.forEach(container => {
            const image = container.querySelector('img');
            
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                image.style.transformOrigin = `${x}% ${y}%`;
            });
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
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
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuButton = document.querySelector('#mobile-menu-button');
        const mobileMenu = document.querySelector('#mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    // Newsletter Subscription
    setupNewsletter() {
        const newsletterForm = document.querySelector('#newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                
                try {
                    // In a real app, send to your backend
                    await this.subscribeToNewsletter(email);
                    this.showNotification('Successfully subscribed to newsletter!', 'success');
                    e.target.reset();
                } catch (error) {
                    this.showNotification('Failed to subscribe. Please try again.', 'error');
                }
            });
        }
    }

    async subscribeToNewsletter(email) {
        // Mock API call - replace with actual implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Subscribed: ${email}`);
                resolve();
            }, 1000);
        });
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.querySelector('#contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                
                try {
                    await this.submitContactForm(formData);
                    this.showNotification('Message sent successfully!', 'success');
                    e.target.reset();
                } catch (error) {
                    this.showNotification('Failed to send message. Please try again.', 'error');
                }
            });
        }
    }

    async submitContactForm(formData) {
        // Mock API call - replace with actual implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Contact form submitted:', Object.fromEntries(formData));
                resolve();
            }, 1000);
        });
    }

    // Product Variants
    setupProductVariants() {
        const variantSelects = document.querySelectorAll('[data-variant]');
        
        variantSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                const productCard = e.target.closest('[data-product]');
                this.updateProductPrice(productCard, e.target.value, e.target.dataset.variant);
            });
        });
    }

    updateProductPrice(productCard, value, variantType) {
        const priceElement = productCard.querySelector('[data-price]');
        const basePrice = parseFloat(priceElement.dataset.basePrice || priceElement.textContent.replace(/[^0-9.]/g, ''));
        
        let multiplier = 1;
        
        // Price adjustments based on variants
        if (variantType === 'length') {
            const lengthPricing = { '16"': 1, '18"': 1.1, '20"': 1.2, '22"': 1.3, '24"': 1.4, '26"': 1.5 };
            multiplier = lengthPricing[value] || 1;
        }
        
        const newPrice = basePrice * multiplier;
        priceElement.textContent = `$${newPrice.toFixed(2)}`;
    }

    // Virtual Try-On (Mock implementation)
    setupVirtualTryOn() {
        const tryOnButtons = document.querySelectorAll('[data-try-on]');
        
        tryOnButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.openVirtualTryOn();
            });
        });
    }

    openVirtualTryOn() {
        this.showNotification('Virtual Try-On coming soon! 📸', 'info');
    }

    // Hair Length Calculator
    setupHairLengthCalculator() {
        const calculator = document.querySelector('#length-calculator');
        
        if (calculator) {
            const slider = calculator.querySelector('input[type="range"]');
            const output = calculator.querySelector('[data-length-output]');
            
            if (slider && output) {
                slider.addEventListener('input', (e) => {
                    output.textContent = `${e.target.value}"`;
                });
            }
        }
    }

    // Review System
    setupReviewSystem() {
        const reviewForms = document.querySelectorAll('[data-review-form]');
        
        reviewForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview(form);
            });
        });

        // Star ratings
        this.setupStarRatings();
    }

    setupStarRatings() {
        const starRatings = document.querySelectorAll('.star-rating');
        
        starRatings.forEach(rating => {
            const stars = rating.querySelectorAll('.star');
            
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    this.setRating(rating, index + 1);
                });
            });
        });
    }

    setRating(ratingContainer, rating) {
        const stars = ratingContainer.querySelectorAll('.star');
        const input = ratingContainer.querySelector('input[type="hidden"]');
        
        stars.forEach((star, index) => {
            star.classList.toggle('filled', index < rating);
        });
        
        if (input) {
            input.value = rating;
        }
    }

    submitReview(form) {
        const formData = new FormData(form);
        console.log('Review submitted:', Object.fromEntries(formData));
        this.showNotification('Review submitted successfully!', 'success');
        form.reset();
    }

    // Intersection Observers for animations
    setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    // Parallax Effect
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', this.throttle(handleScroll, 16));
    }

    // Initialize animations on page load
    initializeAnimations() {
        // Stagger animations for elements
        const staggerElements = document.querySelectorAll('[data-stagger]');
        
        staggerElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Utility function to show notifications
    showNotification(message, type = 'info') {
        // Use the cart's notification system if available
        if (window.cart && window.cart.showNotification) {
            window.cart.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Utility function for throttling
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Debounce utility
    debounce(func, delay) {
        let timeoutId;
        
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
            });
        }
    }

    // Service Worker registration
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.luxeHair = new LuxeHairStudio();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LuxeHairStudio;
}