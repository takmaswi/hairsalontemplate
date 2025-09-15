/**
 * WhatsApp Cart System for Luxe Hair Studio
 * Enhanced cart functionality with local storage and WhatsApp integration
 */

class WhatsAppCart {
    constructor() {
        this.items = this.loadFromStorage();
        this.currency = 'USD';
        this.phoneNumber = '263771234567';
        this.businessName = 'Luxe Hair Studio';
        this.exchangeRate = { USD: 1, ZWL: 850 }; // Sample exchange rates
        this.init();
    }

    init() {
        this.updateCartUI();
        this.bindEvents();
        this.loadCurrency();
    }

    loadFromStorage() {
        try {
            return JSON.parse(localStorage.getItem('whatsappCart')) || [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            return [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('whatsappCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    loadCurrency() {
        const savedCurrency = localStorage.getItem('selectedCurrency');
        if (savedCurrency) {
            this.currency = savedCurrency;
        }
    }

    saveCurrency() {
        localStorage.setItem('selectedCurrency', this.currency);
    }

    setCurrency(currency) {
        this.currency = currency;
        this.saveCurrency();
        this.updateCartUI();
        this.updateProductPrices();
    }

    addItem(product) {
        // Check if item already exists
        const existingItemIndex = this.items.findIndex(item => 
            item.id === product.id && 
            item.selectedLength === product.selectedLength &&
            item.selectedTexture === product.selectedTexture
        );

        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            this.items[existingItemIndex].quantity += (product.quantity || 1);
        } else {
            // Add new item
            const cartItem = {
                id: product.id || this.generateId(),
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice || product.price,
                image: product.image || '/assets/images/placeholder.jpg',
                length: product.selectedLength || product.length,
                texture: product.selectedTexture || product.texture,
                category: product.category || 'Hair',
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString()
            };
            this.items.push(cartItem);
        }

        this.saveToStorage();
        this.updateCartUI();
        this.showNotification(`Added ${product.name} to cart`, 'success');
        
        // Track analytics
        this.trackEvent('add_to_cart', product);
    }

    removeItem(itemId) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            const removedItem = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            this.saveToStorage();
            this.updateCartUI();
            this.showNotification(`Removed ${removedItem.name} from cart`, 'info');
            
            // Track analytics
            this.trackEvent('remove_from_cart', removedItem);
        }
    }

    updateQuantity(itemId, quantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateCartUI();
            }
        }
    }

    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartUI();
        this.showNotification('Cart cleared', 'info');
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    formatPrice(price) {
        const convertedPrice = price * this.exchangeRate[this.currency];
        const symbol = this.currency === 'USD' ? '$' : 'ZWL$';
        
        return `${symbol}${convertedPrice.toLocaleString('en-US', {
            minimumFractionDigits: this.currency === 'USD' ? 2 : 0,
            maximumFractionDigits: this.currency === 'USD' ? 2 : 0
        })}`;
    }

    generateWhatsAppMessage() {
        if (this.items.length === 0) {
            return 'Hello! I would like to inquire about your hair products.';
        }

        let message = `Hi ${this.businessName}! 👋\n\n`;
        message += `I'd like to place an order for the following items:\n\n`;

        this.items.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`;
            message += `   Length: ${item.length}\n`;
            message += `   Texture: ${item.texture}\n`;
            message += `   Quantity: ${item.quantity}\n`;
            message += `   Price: ${this.formatPrice(item.price)} each\n`;
            message += `   Subtotal: ${this.formatPrice(item.price * item.quantity)}\n\n`;
        });

        const total = this.getTotal();
        message += `💰 *Total: ${this.formatPrice(total)}*\n\n`;
        message += `📍 Please confirm:\n`;
        message += `✅ Product availability\n`;
        message += `🚚 Delivery options and cost\n`;
        message += `💳 Payment methods\n\n`;
        message += `Thank you! 😊`;

        return encodeURIComponent(message);
    }

    sendToWhatsApp() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        const message = this.generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${message}`;
        
        // Track analytics
        this.trackEvent('initiate_checkout', {
            value: this.getTotal(),
            currency: this.currency,
            items: this.items.length
        });

        window.open(whatsappUrl, '_blank');
        this.showNotification('Redirecting to WhatsApp...', 'success');
    }

    updateCartUI() {
        // Update cart badge
        const cartBadges = document.querySelectorAll('[data-cart-count]');
        const itemCount = this.getItemCount();
        
        cartBadges.forEach(badge => {
            badge.textContent = itemCount;
            badge.style.display = itemCount > 0 ? 'flex' : 'none';
        });

        // Update cart sidebar
        this.renderCartItems();
        this.updateCartTotal();
    }

    renderCartItems() {
        const cartContainer = document.querySelector('#cart-items');
        if (!cartContainer) return;

        if (this.items.length === 0) {
            cartContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="text-4xl mb-4">🛒</div>
                    <p class="text-gray-500 mb-4">Your cart is empty</p>
                    <a href="shop.html" class="text-primary hover:underline">Continue Shopping</a>
                </div>
            `;
            return;
        }

        cartContainer.innerHTML = this.items.map(item => `
            <div class="flex items-center space-x-4 p-4 border-b border-gray-100" data-item-id="${item.id}">
                <div class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-full h-full object-cover"
                         onerror="this.src='/assets/images/placeholder.jpg'">
                </div>
                
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800 text-sm">${item.name}</h4>
                    <p class="text-xs text-gray-500">${item.length} • ${item.texture}</p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="text-primary font-semibold">${this.formatPrice(item.price)}</span>
                        <div class="flex items-center space-x-2">
                            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                    class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path>
                                </svg>
                            </button>
                            <span class="text-sm font-medium w-8 text-center">${item.quantity}</span>
                            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                    class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <button onclick="cart.removeItem('${item.id}')" 
                        class="text-gray-400 hover:text-red-500 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    updateCartTotal() {
        const totalElements = document.querySelectorAll('[data-cart-total]');
        const total = this.formatPrice(this.getTotal());
        
        totalElements.forEach(element => {
            element.textContent = total;
        });
    }

    updateProductPrices() {
        const priceElements = document.querySelectorAll('[data-price]');
        priceElements.forEach(element => {
            const originalPrice = parseFloat(element.dataset.price);
            element.textContent = this.formatPrice(originalPrice);
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `toast ${type}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <div class="mr-3">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </div>
                <div class="flex-1">
                    <p class="font-medium">${message}</p>
                </div>
                <button class="ml-3 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    bindEvents() {
        // Currency switcher
        document.addEventListener('change', (e) => {
            if (e.target.name === 'currency') {
                this.setCurrency(e.target.value);
            }
        });

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-add-to-cart]')) {
                e.preventDefault();
                const productData = JSON.parse(e.target.dataset.productData || '{}');
                this.addItem(productData);
            }
        });

        // WhatsApp checkout button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-whatsapp-checkout]')) {
                e.preventDefault();
                this.sendToWhatsApp();
            }
        });

        // Clear cart button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-clear-cart]')) {
                e.preventDefault();
                if (confirm('Are you sure you want to clear your cart?')) {
                    this.clearCart();
                }
            }
        });
    }

    trackEvent(eventName, data) {
        // Analytics tracking (integrate with your preferred analytics service)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                custom_parameter: data
            });
        }
        
        // Console log for development
        console.log('Cart Event:', eventName, data);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Wishlist functionality
    addToWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const exists = wishlist.find(item => item.id === product.id);
        
        if (!exists) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            this.showNotification(`Added ${product.name} to wishlist`, 'success');
        } else {
            this.showNotification(`${product.name} is already in wishlist`, 'info');
        }
    }

    // Product comparison functionality
    addToCompare(product) {
        let comparison = JSON.parse(localStorage.getItem('comparison') || '[]');
        
        if (comparison.length >= 3) {
            this.showNotification('Maximum 3 products can be compared', 'error');
            return;
        }

        const exists = comparison.find(item => item.id === product.id);
        
        if (!exists) {
            comparison.push(product);
            localStorage.setItem('comparison', JSON.stringify(comparison));
            this.showNotification(`Added ${product.name} to comparison`, 'success');
        } else {
            this.showNotification(`${product.name} is already being compared`, 'info');
        }
    }

    // Recently viewed products
    addToRecentlyViewed(product) {
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        // Remove if already exists to avoid duplicates
        recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);
        
        // Add to beginning
        recentlyViewed.unshift(product);
        
        // Keep only last 10 items
        recentlyViewed = recentlyViewed.slice(0, 10);
        
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }

    // Quick add to cart with variants
    quickAdd(productId, variants = {}) {
        const product = {
            id: productId,
            name: variants.name || 'Hair Product',
            price: variants.price || 0,
            selectedLength: variants.length || '16"',
            selectedTexture: variants.texture || 'Straight',
            image: variants.image,
            quantity: 1
        };
        
        this.addItem(product);
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new WhatsAppCart();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppCart;
}