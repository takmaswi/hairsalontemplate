/**
 * Product Data and Management System
 * Contains product catalog and related functionality
 */

class ProductManager {
    constructor() {
        this.products = this.getProductCatalog();
        this.categories = this.getCategories();
        this.currentFilters = {
            category: 'all',
            priceRange: [0, 1000],
            length: 'all',
            texture: 'all',
            brand: 'all'
        };
        this.sortBy = 'featured';
    }

    getProductCatalog() {
        return [
            // Glueless Wigs
            {
                id: 'wig-001',
                name: 'HD Lace Glueless Wig - Straight',
                category: 'wigs',
                subcategory: 'glueless',
                brand: 'luxe',
                price: 299,
                originalPrice: 399,
                currency: 'USD',
                description: 'Premium HD lace glueless wig with natural hairline. 180% density Brazilian straight hair.',
                images: [
                    '/assets/images/wigs/wig-001-1.jpg',
                    '/assets/images/wigs/wig-001-2.jpg',
                    '/assets/images/wigs/wig-001-3.jpg'
                ],
                thumbnail: '/assets/images/wigs/wig-001-thumb.jpg',
                variants: {
                    lengths: ['14"', '16"', '18"', '20"', '22"'],
                    colors: ['Natural Black', 'Dark Brown', 'Medium Brown', 'Light Brown'],
                    densities: ['130%', '150%', '180%']
                },
                specifications: {
                    hairType: 'Brazilian Human Hair',
                    capSize: 'Medium (22-22.5")',
                    capConstruction: 'HD Lace Front',
                    density: '180%',
                    texture: 'Straight',
                    length: '20"',
                    color: 'Natural Black'
                },
                features: [
                    'HD Lace for invisible hairline',
                    'Glueless installation',
                    'Pre-plucked hairline',
                    'Baby hair included',
                    'Adjustable straps',
                    'Breathable cap'
                ],
                rating: 4.8,
                reviewCount: 127,
                inStock: true,
                inventory: 15,
                tags: ['glueless', 'hd-lace', 'straight', 'brazilian', 'premium'],
                seoTitle: 'HD Lace Glueless Straight Wig - Premium Brazilian Hair',
                seoDescription: 'Shop our premium HD lace glueless straight wig made with 100% Brazilian human hair. Natural hairline, easy installation, perfect for beginners.',
                featured: true,
                trending: true,
                newArrival: false,
                onSale: true
            },
            {
                id: 'wig-002',
                name: 'Body Wave Glueless Wig - 13x4 Lace',
                category: 'wigs',
                subcategory: 'glueless',
                brand: 'luxe',
                price: 349,
                originalPrice: 449,
                currency: 'USD',
                description: 'Luxurious body wave glueless wig with 13x4 lace frontal. Perfect bouncy curls.',
                images: [
                    '/assets/images/wigs/wig-002-1.jpg',
                    '/assets/images/wigs/wig-002-2.jpg',
                    '/assets/images/wigs/wig-002-3.jpg'
                ],
                thumbnail: '/assets/images/wigs/wig-002-thumb.jpg',
                variants: {
                    lengths: ['16"', '18"', '20"', '22"', '24"'],
                    colors: ['Natural Black', '1B', '2', '4'],
                    densities: ['130%', '150%', '180%']
                },
                specifications: {
                    hairType: 'Peruvian Human Hair',
                    capSize: 'Medium (22-22.5")',
                    capConstruction: '13x4 Lace Front',
                    density: '150%',
                    texture: 'Body Wave',
                    length: '18"',
                    color: 'Natural Black'
                },
                rating: 4.9,
                reviewCount: 98,
                inStock: true,
                inventory: 8,
                tags: ['glueless', '13x4', 'body-wave', 'peruvian'],
                featured: true,
                onSale: true
            },

            // Hair Bundles
            {
                id: 'bundle-001',
                name: 'Brazilian Straight Hair Bundles (3 Pack)',
                category: 'bundles',
                subcategory: 'straight',
                brand: 'luxe',
                price: 450,
                originalPrice: 550,
                currency: 'USD',
                description: '3 bundles of premium Brazilian straight hair. Silky smooth texture with natural shine.',
                images: [
                    '/assets/images/bundles/bundle-001-1.jpg',
                    '/assets/images/bundles/bundle-001-2.jpg',
                    '/assets/images/bundles/bundle-001-3.jpg'
                ],
                thumbnail: '/assets/images/bundles/bundle-001-thumb.jpg',
                variants: {
                    lengths: [
                        '16"-18"-20"',
                        '18"-20"-22"',
                        '20"-22"-24"',
                        '22"-24"-26"'
                    ],
                    colors: ['Natural Black', '1B', '2', '4', '27', '30'],
                    grades: ['10A', '11A', '12A']
                },
                specifications: {
                    hairType: 'Brazilian Human Hair',
                    grade: '10A',
                    texture: 'Straight',
                    weight: '100g per bundle',
                    wefts: 'Double weft for durability'
                },
                rating: 4.7,
                reviewCount: 203,
                inStock: true,
                inventory: 25,
                tags: ['brazilian', 'straight', '3-bundles', 'premium'],
                featured: true,
                bestSeller: true
            },
            {
                id: 'bundle-002',
                name: 'Malaysian Deep Wave Bundles (4 Pack)',
                category: 'bundles',
                subcategory: 'deep-wave',
                brand: 'luxe',
                price: 520,
                originalPrice: 620,
                currency: 'USD',
                description: '4 bundles of Malaysian deep wave hair. Bouncy curls with excellent curl retention.',
                images: [
                    '/assets/images/bundles/bundle-002-1.jpg',
                    '/assets/images/bundles/bundle-002-2.jpg'
                ],
                thumbnail: '/assets/images/bundles/bundle-002-thumb.jpg',
                variants: {
                    lengths: [
                        '14"-16"-18"-20"',
                        '16"-18"-20"-22"',
                        '18"-20"-22"-24"'
                    ],
                    colors: ['Natural Black', '1B', '2', '4'],
                    grades: ['10A', '11A']
                },
                specifications: {
                    hairType: 'Malaysian Human Hair',
                    grade: '10A',
                    texture: 'Deep Wave',
                    weight: '100g per bundle'
                },
                rating: 4.6,
                reviewCount: 156,
                inStock: true,
                inventory: 12,
                tags: ['malaysian', 'deep-wave', '4-bundles'],
                trending: true
            },

            // Lace Frontals
            {
                id: 'frontal-001',
                name: 'HD Transparent Lace Frontal 13x4',
                category: 'frontals',
                subcategory: 'hd-lace',
                brand: 'luxe',
                price: 180,
                originalPrice: 220,
                currency: 'USD',
                description: 'HD transparent lace frontal for invisible hairline. Perfect for natural looks.',
                images: [
                    '/assets/images/frontals/frontal-001-1.jpg',
                    '/assets/images/frontals/frontal-001-2.jpg'
                ],
                thumbnail: '/assets/images/frontals/frontal-001-thumb.jpg',
                variants: {
                    sizes: ['13x4', '13x6'],
                    textures: ['Straight', 'Body Wave', 'Deep Wave', 'Curly'],
                    lengths: ['12"', '14"', '16"', '18"', '20"'],
                    colors: ['Natural Black', '1B', '2', '4']
                },
                specifications: {
                    hairType: 'Brazilian Human Hair',
                    laceType: 'HD Transparent',
                    size: '13x4 inches',
                    density: '130%',
                    knots: 'Bleached knots'
                },
                rating: 4.8,
                reviewCount: 89,
                inStock: true,
                inventory: 20,
                tags: ['hd-lace', 'transparent', '13x4', 'brazilian'],
                featured: true
            },

            // Closures
            {
                id: 'closure-001',
                name: 'Brazilian Straight Closure 4x4',
                category: 'closures',
                subcategory: 'straight',
                brand: 'luxe',
                price: 120,
                originalPrice: 150,
                currency: 'USD',
                description: '4x4 lace closure in Brazilian straight texture. Perfect for complete sew-in looks.',
                images: [
                    '/assets/images/closures/closure-001-1.jpg',
                    '/assets/images/closures/closure-001-2.jpg'
                ],
                thumbnail: '/assets/images/closures/closure-001-thumb.jpg',
                variants: {
                    sizes: ['4x4', '5x5', '6x6'],
                    textures: ['Straight', 'Body Wave', 'Deep Wave'],
                    lengths: ['12"', '14"', '16"', '18"'],
                    partings: ['Middle', 'Left', 'Right', 'Free']
                },
                specifications: {
                    hairType: 'Brazilian Human Hair',
                    laceType: 'Swiss Lace',
                    size: '4x4 inches',
                    density: '120%'
                },
                rating: 4.5,
                reviewCount: 74,
                inStock: true,
                inventory: 30,
                tags: ['brazilian', 'straight', '4x4', 'closure']
            },

            // Hair Care Products
            {
                id: 'care-001',
                name: 'Luxe Hair Care Kit - Complete Set',
                category: 'care',
                subcategory: 'kits',
                brand: 'luxe',
                price: 89,
                originalPrice: 120,
                currency: 'USD',
                description: 'Complete hair care kit with shampoo, conditioner, leave-in treatment, and styling oil.',
                images: [
                    '/assets/images/care/care-001-1.jpg',
                    '/assets/images/care/care-001-2.jpg'
                ],
                thumbnail: '/assets/images/care/care-001-thumb.jpg',
                variants: {
                    types: ['Normal Hair', 'Curly Hair', 'Damaged Hair']
                },
                specifications: {
                    includes: [
                        'Moisturizing Shampoo (250ml)',
                        'Deep Conditioning Treatment (200ml)',
                        'Leave-in Conditioner (150ml)',
                        'Nourishing Hair Oil (100ml)',
                        'Wide-tooth Comb'
                    ]
                },
                rating: 4.9,
                reviewCount: 312,
                inStock: true,
                inventory: 45,
                tags: ['hair-care', 'kit', 'complete-set'],
                bestSeller: true
            }
        ];
    }

    getCategories() {
        return {
            wigs: {
                name: 'Wigs',
                icon: '👩‍🦱',
                subcategories: ['glueless', 'lace-front', 'full-lace', 'u-part']
            },
            bundles: {
                name: 'Hair Bundles',
                icon: '💇‍♀️',
                subcategories: ['straight', 'body-wave', 'deep-wave', 'curly', 'water-wave']
            },
            frontals: {
                name: 'Lace Frontals',
                icon: '💄',
                subcategories: ['13x4', '13x6', 'hd-lace', '360-frontal']
            },
            closures: {
                name: 'Closures',
                icon: '✨',
                subcategories: ['4x4', '5x5', '6x6', 'silk-base']
            },
            care: {
                name: 'Hair Care',
                icon: '🧴',
                subcategories: ['shampoo', 'conditioner', 'treatments', 'kits', 'tools']
            }
        };
    }

    // Filter and Search Methods
    filterProducts(filters = {}) {
        this.currentFilters = { ...this.currentFilters, ...filters };
        
        let filtered = this.products.filter(product => {
            // Category filter
            if (this.currentFilters.category !== 'all' && product.category !== this.currentFilters.category) {
                return false;
            }
            
            // Price range filter
            if (product.price < this.currentFilters.priceRange[0] || product.price > this.currentFilters.priceRange[1]) {
                return false;
            }
            
            // Length filter (for hair products)
            if (this.currentFilters.length !== 'all') {
                if (product.variants.lengths && !product.variants.lengths.some(length => 
                    length.includes(this.currentFilters.length))) {
                    return false;
                }
            }
            
            // Texture filter
            if (this.currentFilters.texture !== 'all') {
                if (product.specifications.texture && 
                    product.specifications.texture.toLowerCase() !== this.currentFilters.texture.toLowerCase()) {
                    return false;
                }
            }
            
            return true;
        });
        
        return this.sortProducts(filtered);
    }

    searchProducts(query) {
        if (!query || query.trim() === '') {
            return this.products;
        }
        
        const searchTerm = query.toLowerCase().trim();
        
        return this.products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                (product.specifications.hairType && product.specifications.hairType.toLowerCase().includes(searchTerm))
            );
        });
    }

    sortProducts(products, sortBy = this.sortBy) {
        const sorted = [...products];
        
        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'bestseller':
                return sorted.filter(p => p.bestSeller).concat(sorted.filter(p => !p.bestSeller));
            case 'featured':
            default:
                return sorted.filter(p => p.featured).concat(sorted.filter(p => !p.featured));
        }
    }

    // Product Retrieval Methods
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getFeaturedProducts(limit = 6) {
        return this.products.filter(product => product.featured).slice(0, limit);
    }

    getBestSellingProducts(limit = 4) {
        return this.products.filter(product => product.bestSeller).slice(0, limit);
    }

    getNewArrivals(limit = 8) {
        return this.products.filter(product => product.newArrival).slice(0, limit);
    }

    getTrendingProducts(limit = 6) {
        return this.products.filter(product => product.trending).slice(0, limit);
    }

    getProductsByCategory(category, limit = null) {
        const filtered = this.products.filter(product => product.category === category);
        return limit ? filtered.slice(0, limit) : filtered;
    }

    getRelatedProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];
        
        return this.products
            .filter(p => p.id !== productId && p.category === product.category)
            .slice(0, limit);
    }

    // Utility Methods
    formatPrice(price, currency = 'USD') {
        const exchangeRates = { USD: 1, ZWL: 850 };
        const convertedPrice = price * exchangeRates[currency];
        const symbol = currency === 'USD' ? '$' : 'ZWL$';
        
        return `${symbol}${convertedPrice.toLocaleString('en-US', {
            minimumFractionDigits: currency === 'USD' ? 2 : 0,
            maximumFractionDigits: currency === 'USD' ? 2 : 0
        })}`;
    }

    calculateDiscount(originalPrice, salePrice) {
        return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    }

    isInStock(productId) {
        const product = this.getProductById(productId);
        return product ? product.inStock && product.inventory > 0 : false;
    }

    getStockLevel(productId) {
        const product = this.getProductById(productId);
        return product ? product.inventory : 0;
    }

    // Review Methods
    addReview(productId, review) {
        const product = this.getProductById(productId);
        if (!product) return false;
        
        // In a real app, this would be sent to backend
        console.log('Review added:', { productId, review });
        
        // Update local rating (mock)
        product.reviewCount += 1;
        product.rating = ((product.rating * (product.reviewCount - 1)) + review.rating) / product.reviewCount;
        
        return true;
    }

    // Wishlist Methods
    addToWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            return true;
        }
        return false;
    }

    removeFromWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlist = wishlist.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        return true;
    }

    getWishlistProducts() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        return wishlist.map(id => this.getProductById(id)).filter(Boolean);
    }

    isInWishlist(productId) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        return wishlist.includes(productId);
    }

    // Recently Viewed Methods
    addToRecentlyViewed(productId) {
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        recentlyViewed = recentlyViewed.filter(id => id !== productId); // Remove if already exists
        recentlyViewed.unshift(productId); // Add to beginning
        recentlyViewed = recentlyViewed.slice(0, 10); // Keep only last 10
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }

    getRecentlyViewedProducts(limit = 5) {
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        return recentlyViewed
            .slice(0, limit)
            .map(id => this.getProductById(id))
            .filter(Boolean);
    }

    // Bundle and Deal Methods
    getBundleDeals() {
        return [
            {
                id: 'deal-001',
                name: 'Complete Hair Makeover Bundle',
                description: '3 Bundles + Frontal + Hair Care Kit',
                originalPrice: 850,
                bundlePrice: 650,
                savings: 200,
                products: ['bundle-001', 'frontal-001', 'care-001'],
                image: '/assets/images/deals/bundle-deal-001.jpg'
            },
            {
                id: 'deal-002',
                name: 'Wig & Care Starter Pack',
                description: 'Glueless Wig + Complete Care Kit',
                originalPrice: 420,
                bundlePrice: 350,
                savings: 70,
                products: ['wig-001', 'care-001'],
                image: '/assets/images/deals/bundle-deal-002.jpg'
            }
        ];
    }

    // Analytics and Tracking
    trackProductView(productId) {
        // Track product views for analytics
        const viewData = {
            productId,
            timestamp: new Date().toISOString(),
            userId: this.getUserId(), // Get from session/auth
            source: window.location.pathname
        };
        
        // Send to analytics service
        this.sendAnalytics('product_view', viewData);
        
        // Add to recently viewed
        this.addToRecentlyViewed(productId);
    }

    trackProductInteraction(productId, interaction) {
        const interactionData = {
            productId,
            interaction, // 'add_to_cart', 'add_to_wishlist', 'quick_view', etc.
            timestamp: new Date().toISOString(),
            userId: this.getUserId()
        };
        
        this.sendAnalytics('product_interaction', interactionData);
    }

    sendAnalytics(event, data) {
        // In a real app, send to your analytics service
        console.log('Analytics:', event, data);
        
        // Example integration with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event, data);
        }
    }

    getUserId() {
        // Get user ID from session, localStorage, or generate anonymous ID
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'anon_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }
}

// Initialize product manager
const productManager = new ProductManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.productManager = productManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManager;
}