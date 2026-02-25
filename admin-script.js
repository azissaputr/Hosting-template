// ============================================
// Admin Panel JavaScript - Js Corp Hosting
// ============================================

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
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

// ============================================
// Authentication Module
// ============================================
const Auth = {
    // Default admin credentials
    defaultCredentials: {
        username: 'admin',
        password: 'admin123'
    },

    // Check if user is authenticated
    isAuthenticated() {
        const session = localStorage.getItem('adminSession');
        if (!session) return false;

        try {
            const sessionData = JSON.parse(session);
            const now = new Date().getTime();

            // Check if session is expired (24 hours)
            if (sessionData.expiresAt && now > sessionData.expiresAt) {
                this.logout();
                return false;
            }

            return sessionData.isAuthenticated === true;
        } catch (e) {
            return false;
        }
    },

    // Login user
    login(username, password, rememberMe = false) {
        // Validate credentials
        if (username === this.defaultCredentials.username &&
            password === this.defaultCredentials.password) {

            const now = new Date().getTime();
            const expiresIn = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 24 hours

            const sessionData = {
                isAuthenticated: true,
                username: username,
                loginTime: now,
                expiresAt: now + expiresIn,
                rememberMe: rememberMe
            };

            localStorage.setItem('adminSession', JSON.stringify(sessionData));

            return {
                success: true,
                message: 'Login berhasil!'
            };
        }

        return {
            success: false,
            message: 'Username atau password salah!'
        };
    },

    // Logout user
    logout() {
        localStorage.removeItem('adminSession');
        window.location.href = 'admin-login.html';
    },

    // Get current user info
    getCurrentUser() {
        const session = localStorage.getItem('adminSession');
        if (!session) return null;

        try {
            const sessionData = JSON.parse(session);
            return {
                username: sessionData.username,
                loginTime: sessionData.loginTime
            };
        } catch (e) {
            return null;
        }
    },

    // Protect page (redirect to login if not authenticated)
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'admin-login.html';
        }
    }
};

// ============================================
// Data Storage Module (CRUD Operations)
// ============================================
const DataStore = {
    // Get all items from a collection
    getAll(collection) {
        const data = localStorage.getItem(collection);
        return data ? JSON.parse(data) : [];
    },

    // Get single item by ID
    getById(collection, id) {
        const items = this.getAll(collection);
        return items.find(item => item.id === id);
    },

    // Create new item
    create(collection, item) {
        const items = this.getAll(collection);
        const newItem = {
            ...item,
            id: this.generateId(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        items.push(newItem);
        localStorage.setItem(collection, JSON.stringify(items));

        // Trigger storage event for package sync
        if (collection === 'packages') {
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'packages',
                newValue: JSON.stringify(items)
            }));
        }

        return newItem;
    },

    // Update existing item
    update(collection, id, updates) {
        const items = this.getAll(collection);
        const index = items.findIndex(item => item.id === id);

        if (index === -1) return null;

        items[index] = {
            ...items[index],
            ...updates,
            updated_at: new Date().toISOString()
        };

        localStorage.setItem(collection, JSON.stringify(items));

        // Trigger storage event for package sync
        if (collection === 'packages') {
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'packages',
                newValue: JSON.stringify(items)
            }));
        }

        return items[index];
    },

    // Delete item
    delete(collection, id) {
        const items = this.getAll(collection);
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem(collection, JSON.stringify(filtered));
        return true;
    },

    // Generate unique ID
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // Clear all data from collection
    clearCollection(collection) {
        localStorage.removeItem(collection);
    },

    // Search items
    search(collection, query, fields = []) {
        const items = this.getAll(collection);
        if (!query) return items;

        const lowerQuery = query.toLowerCase();
        return items.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toString().toLowerCase().includes(lowerQuery);
            });
        });
    }
};

// ============================================
// Sample Data Seeding
// ============================================
const SampleData = {
    // Seed initial data if empty
    seedAll() {
        if (DataStore.getAll('packages').length === 0) {
            this.seedPackages();
        }
        if (DataStore.getAll('customers').length === 0) {
            this.seedCustomers();
        }
        if (DataStore.getAll('orders').length === 0) {
            this.seedOrders();
        }
    },

    seedPackages() {
        const packages = [
            {
                name: 'Starter',
                price_monthly: 15000,
                price_yearly: 144000,
                storage: '1 GB SSD',
                bandwidth: 'Unlimited',
                websites: 1,
                email: '1 Email Account',
                ssl: true,
                domain: false,
                support: '24/7',
                features: ['1 GB SSD Storage', 'Unlimited Bandwidth', '1 Website', 'SSL Gratis', 'Email Account', 'Support 24/7'],
                status: 'active'
            },
            {
                name: 'Professional',
                price_monthly: 35000,
                price_yearly: 336000,
                storage: '5 GB SSD',
                bandwidth: 'Unlimited',
                websites: 5,
                email: 'Unlimited',
                ssl: true,
                domain: true,
                support: 'Priority 24/7',
                features: ['5 GB SSD Storage', 'Unlimited Bandwidth', '5 Website', 'SSL Gratis', 'Unlimited Email', 'Domain Gratis (.com/.id)', 'Support Priority 24/7'],
                status: 'active'
            },
            {
                name: 'Business',
                price_monthly: 75000,
                price_yearly: 720000,
                storage: '15 GB SSD',
                bandwidth: 'Unlimited',
                websites: 999,
                email: 'Unlimited',
                ssl: true,
                domain: true,
                support: 'VIP 24/7',
                features: ['15 GB SSD Storage', 'Unlimited Bandwidth', 'Unlimited Website', 'SSL Gratis', 'Unlimited Email', 'Domain Gratis (.com/.id)', 'Dedicated IP', 'Support VIP 24/7'],
                status: 'active'
            }
        ];

        packages.forEach(pkg => DataStore.create('packages', pkg));
    },

    seedCustomers() {
        const customers = [
            {
                name: 'Budi Santoso',
                email: 'budi@techstartup.id',
                phone: '08123456789',
                company: 'TechStartup.id',
                address: 'Jakarta, Indonesia',
                status: 'active'
            },
            {
                name: 'Siti Nurhaliza',
                email: 'siti@blogger.com',
                phone: '08234567890',
                company: 'Personal Blog',
                address: 'Bandung, Indonesia',
                status: 'active'
            },
            {
                name: 'Andi Wijaya',
                email: 'andi@webdev.com',
                phone: '08345678901',
                company: 'Web Developer Freelance',
                address: 'Surabaya, Indonesia',
                status: 'active'
            },
            {
                name: 'Dewi Lestari',
                email: 'dewi@onlineshop.com',
                phone: '08456789012',
                company: 'Dewi Online Shop',
                address: 'Yogyakarta, Indonesia',
                status: 'active'
            },
            {
                name: 'Rudi Hartono',
                email: 'rudi@company.com',
                phone: '08567890123',
                company: 'PT Digital Solutions',
                address: 'Semarang, Indonesia',
                status: 'inactive'
            }
        ];

        customers.forEach(customer => DataStore.create('customers', customer));
    },

    seedOrders() {
        const packages = DataStore.getAll('packages');
        const customers = DataStore.getAll('customers');

        if (packages.length === 0 || customers.length === 0) return;

        const orders = [
            {
                order_number: 'ORD-20260201-001',
                customer_id: customers[0].id,
                package_id: packages[1].id,
                billing_cycle: 'yearly',
                amount: packages[1].price_yearly,
                status: 'active',
                start_date: '2026-02-01',
                end_date: '2027-02-01'
            },
            {
                order_number: 'ORD-20260205-002',
                customer_id: customers[1].id,
                package_id: packages[0].id,
                billing_cycle: 'monthly',
                amount: packages[0].price_monthly,
                status: 'active',
                start_date: '2026-02-05',
                end_date: '2026-03-05'
            },
            {
                order_number: 'ORD-20260208-003',
                customer_id: customers[2].id,
                package_id: packages[2].id,
                billing_cycle: 'yearly',
                amount: packages[2].price_yearly,
                status: 'active',
                start_date: '2026-02-08',
                end_date: '2027-02-08'
            },
            {
                order_number: 'ORD-20260210-004',
                customer_id: customers[3].id,
                package_id: packages[1].id,
                billing_cycle: 'monthly',
                amount: packages[1].price_monthly,
                status: 'pending',
                start_date: '2026-02-10',
                end_date: '2026-03-10'
            },
            {
                order_number: 'ORD-20260112-005',
                customer_id: customers[4].id,
                package_id: packages[0].id,
                billing_cycle: 'monthly',
                amount: packages[0].price_monthly,
                status: 'cancelled',
                start_date: '2026-01-12',
                end_date: '2026-02-12'
            }
        ];

        orders.forEach(order => DataStore.create('orders', order));
    }
};

// ============================================
// UI Helper Module
// ============================================
const UI = {
    // Show notification toast
    showNotification(message, type = 'info', duration = 3000) {
        // Create notification container if it doesn't exist
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        notification.innerHTML = `
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        `;

        container.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    },

    // Open modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    // Confirm dialog
    confirm(message, onConfirm, onCancel) {
        if (window.confirm(message)) {
            if (onConfirm) onConfirm();
        } else {
            if (onCancel) onCancel();
        }
    },

    // Format currency (IDR)
    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    // Get status badge HTML
    getStatusBadge(status) {
        const badges = {
            'active': '<span class="badge badge-success">Active</span>',
            'inactive': '<span class="badge badge-danger">Inactive</span>',
            'pending': '<span class="badge badge-warning">Pending</span>',
            'cancelled': '<span class="badge badge-danger">Cancelled</span>',
            'suspended': '<span class="badge badge-warning">Suspended</span>'
        };
        return badges[status] || `<span class="badge badge-info">${status}</span>`;
    }
};

// ============================================
// Dashboard Stats Module
// ============================================
const DashboardStats = {
    // Calculate all stats
    getStats() {
        const packages = DataStore.getAll('packages');
        const customers = DataStore.getAll('customers');
        const orders = DataStore.getAll('orders');

        const activeOrders = orders.filter(o => o.status === 'active');
        const totalRevenue = activeOrders.reduce((sum, order) => sum + order.amount, 0);

        return {
            totalPackages: packages.length,
            totalCustomers: customers.length,
            totalOrders: orders.length,
            activeOrders: activeOrders.length,
            totalRevenue: totalRevenue,
            activeCustomers: customers.filter(c => c.status === 'active').length
        };
    },

    // Get recent activity
    getRecentActivity(limit = 5) {
        const orders = DataStore.getAll('orders');
        const customers = DataStore.getAll('customers');
        const packages = DataStore.getAll('packages');

        // Sort by created_at descending
        const sortedOrders = orders.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        ).slice(0, limit);

        // Enrich with customer and package data
        return sortedOrders.map(order => {
            const customer = customers.find(c => c.id === order.customer_id);
            const pkg = packages.find(p => p.id === order.package_id);
            return {
                ...order,
                customer_name: customer ? customer.name : 'Unknown',
                package_name: pkg ? pkg.name : 'Unknown'
            };
        });
    }
};

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Seed sample data if needed
    SampleData.seedAll();
});

// ============================================
// Export for use in other scripts
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Auth, DataStore, SampleData, UI, DashboardStats };
}
