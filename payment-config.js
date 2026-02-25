// Payment Configuration
const PaymentConfig = {
    // Midtrans Configuration (Sandbox for testing)
    midtrans: {
        clientKey: 'SB-Mid-client-61XuGAwQ8Bj8LxSS', // Sandbox Client Key
        isProduction: false,
        snapUrl: 'https://app.sandbox.midtrans.com/snap/snap.js'
    },

    // WhatsApp Configuration
    whatsapp: {
        adminNumber: '6281234567890', // Ganti dengan nomor WhatsApp admin (format: 62xxx)
        messageTemplate: (orderData) => {
            return `Halo Admin Js Corp Hosting! 🚀

Saya ingin order paket hosting:

📦 *Paket:* ${orderData.packageName}
💰 *Harga:* Rp ${orderData.price.toLocaleString('id-ID')}
📅 *Durasi:* ${orderData.duration === 'monthly' ? 'Bulanan' : 'Tahunan'}

👤 *Data Customer:*
- Nama: ${orderData.customerName}
- Email: ${orderData.customerEmail}
- Phone: ${orderData.customerPhone}

Mohon info untuk pembayaran. Terima kasih!`;
        }
    }
};

// Payment Helper Functions
const PaymentHelper = {
    // Generate Midtrans Snap Token (Demo version - client side only)
    // IMPORTANT: In production, this MUST be done server-side for security
    generateDemoSnapToken: async (orderData) => {
        // For demo purposes, we'll use a mock token
        // In production, you need to call your backend API
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock snap token - in real app, this comes from Midtrans API via backend
                resolve('DEMO-SNAP-TOKEN-' + Date.now());
            }, 500);
        });
    },

    // Open Midtrans Snap Payment
    openMidtransPayment: (snapToken, callbacks) => {
        if (typeof window.snap === 'undefined') {
            console.error('Midtrans Snap not loaded!');
            if (callbacks.onError) {
                callbacks.onError({ message: 'Payment gateway not loaded' });
            }
            return;
        }

        window.snap.pay(snapToken, {
            onSuccess: (result) => {
                console.log('Payment success:', result);
                if (callbacks.onSuccess) callbacks.onSuccess(result);
            },
            onPending: (result) => {
                console.log('Payment pending:', result);
                if (callbacks.onPending) callbacks.onPending(result);
            },
            onError: (result) => {
                console.error('Payment error:', result);
                if (callbacks.onError) callbacks.onError(result);
            },
            onClose: () => {
                console.log('Payment popup closed');
                if (callbacks.onClose) callbacks.onClose();
            }
        });
    },

    // Generate WhatsApp Payment Link
    generateWhatsAppLink: (orderData) => {
        const message = PaymentConfig.whatsapp.messageTemplate(orderData);
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = PaymentConfig.whatsapp.adminNumber;

        // Use WhatsApp Web for desktop, WhatsApp app for mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const baseUrl = isMobile ? 'https://wa.me' : 'https://web.whatsapp.com/send';

        return `${baseUrl}?phone=${whatsappNumber}&text=${encodedMessage}`;
    },

    // Create Order in DataStore
    createOrder: (orderData, paymentMethod, paymentStatus = 'pending') => {
        const order = {
            id: 'ORD-' + Date.now(),
            customerId: orderData.customerId || 'GUEST',
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            packageId: orderData.packageId,
            packageName: orderData.packageName,
            price: orderData.price,
            duration: orderData.duration,
            paymentMethod: paymentMethod, // 'midtrans' or 'whatsapp'
            paymentStatus: paymentStatus, // 'pending', 'paid', 'failed'
            transactionId: orderData.transactionId || null,
            createdAt: new Date().toISOString(),
            paidAt: paymentStatus === 'paid' ? new Date().toISOString() : null
        };

        DataStore.create('orders', order);
        return order;
    },

    // Update Order Payment Status
    updateOrderPayment: (orderId, status, transactionId = null) => {
        const order = DataStore.getById('orders', orderId);
        if (!order) return null;

        order.paymentStatus = status;
        if (transactionId) order.transactionId = transactionId;
        if (status === 'paid') order.paidAt = new Date().toISOString();

        DataStore.update('orders', orderId, order);
        return order;
    }
};
