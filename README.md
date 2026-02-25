# 🚀 Js Corp Hosting - Template Website Hosting

Template website landing page untuk bisnis hosting yang modern, responsif, dan siap pakai. Dilengkapi dengan sistem checkout, integrasi pembayaran (Midtrans & WhatsApp), serta admin panel lengkap.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Fitur Utama

### 🌐 Landing Page
- **Hero Section** dengan animasi gradient dan statistik (10K+ Pengguna, 99.9% Uptime, 24/7 Support)
- **Fitur Section** — Menampilkan keunggulan layanan (Super Cepat, Keamanan, Support, Control Panel, Domain Gratis, Harga Terjangkau)
- **Pricing Section** — 3 paket hosting (Starter, Professional, Business) dengan toggle bulanan/tahunan dan diskon 20%
- **Testimonial Carousel** — Auto-play dengan navigasi dots & arrow
- **CTA Section** — Call-to-action dengan tombol trial gratis
- **Footer** — Navigasi lengkap, social links, dan informasi perusahaan

### 🎨 UI/UX
- **Dark Mode** — Toggle tema gelap/terang dengan persistensi di localStorage
- **Responsive Design** — Fully responsive untuk desktop, tablet, dan mobile
- **Custom Cursor** — Efek cursor custom bergaya Web3
- **Smooth Animations** — Fade-in, scroll, dan hover effects
- **Modern Typography** — Google Fonts (Inter & Poppins)
- **Purple-Blue Gradient** — Color scheme yang konsisten dan premium

### 💳 Sistem Pembayaran
- **Midtrans Payment Gateway** (Sandbox) — Kartu Kredit, E-Wallet, Bank Transfer
- **WhatsApp Payment** — Chat langsung dengan admin untuk pembayaran manual
- **Halaman Checkout** — Form customer info, order summary, pilihan metode pembayaran
- **Order Tracking** — Setiap order mendapat ID unik dan tersimpan di localStorage

### 🔐 Admin Panel
- **Dashboard** — Statistik keseluruhan (total revenue, customers, orders, packages)
- **Manajemen Paket** — CRUD paket hosting (nama, harga, fitur, status)
- **Manajemen Customer** — Daftar pelanggan dengan pencarian
- **Manajemen Order** — Tracking order, status pembayaran, detail transaksi
- **Login System** — Autentikasi admin dengan session management
- **Sample Data Seeding** — Data contoh otomatis untuk testing

---

## 📁 Struktur File

```
├── index.html              # Landing page utama
├── checkout.html            # Halaman checkout & pembayaran
├── admin-login.html         # Halaman login admin
├── admin-dashboard.html     # Admin dashboard (statistik & overview)
├── admin-packages.html      # Admin - Manajemen paket hosting
├── admin-customers.html     # Admin - Manajemen pelanggan
├── admin-orders.html        # Admin - Manajemen pesanan
├── style.css                # Stylesheet utama (landing page + checkout)
├── admin-style.css          # Stylesheet admin panel
├── script.js                # JavaScript utama (landing page)
├── admin-script.js          # JavaScript admin (Auth, DataStore, UI helpers)
├── payment-config.js        # Konfigurasi pembayaran (Midtrans & WhatsApp)
└── README.md                # Dokumentasi project
```

---

## 🚀 Cara Menjalankan

### Prasyarat
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Tidak memerlukan instalasi dependencies atau build tools

### Menjalankan Lokal

**Opsi 1: Python HTTP Server**
```bash
cd Hosting-template
python3 -m http.server 3000
# Buka http://localhost:3000
```

**Opsi 2: VS Code Live Server**
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**

**Opsi 3: Langsung di Browser**
```bash
open index.html
```

---

## ⚙️ Konfigurasi

### Midtrans Payment Gateway

Edit `payment-config.js` untuk konfigurasi Midtrans:

```javascript
const PaymentConfig = {
    midtrans: {
        clientKey: 'YOUR-CLIENT-KEY',     // Ganti dengan Client Key Anda
        isProduction: false,               // Set true untuk production
        snapUrl: 'https://app.midtrans.com/snap/snap.js'  // URL Production
    }
};
```

> ⚠️ **Penting:** Untuk production, generate Snap Token harus dilakukan di **server-side** (backend).

### WhatsApp Admin

Edit nomor WhatsApp admin di `payment-config.js`:

```javascript
whatsapp: {
    adminNumber: '6281234567890',  // Ganti dengan nomor admin (format: 62xxx)
}
```

### Login Admin

Kredensial default admin panel:

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

> Ubah kredensial default di `admin-script.js` pada objek `Auth.defaultCredentials`.

---

## 📋 Halaman & Navigasi

| Halaman | URL | Deskripsi |
|---------|-----|-----------|
| Landing Page | `/index.html` | Homepage dengan fitur, pricing, testimonial |
| Checkout | `/checkout.html?package={id}` | Form order & pembayaran |
| Admin Login | `/admin-login.html` | Login ke admin panel |
| Dashboard | `/admin-dashboard.html` | Overview & statistik |
| Paket | `/admin-packages.html` | Kelola paket hosting |
| Customer | `/admin-customers.html` | Kelola data pelanggan |
| Order | `/admin-orders.html` | Kelola pesanan & pembayaran |

---

## 💰 Paket Hosting (Default)

| Paket | Bulanan | Tahunan | Storage | Website |
|-------|---------|---------|---------|---------|
| **Starter** | Rp 15.000 | Rp 144.000 | 1 GB SSD | 1 |
| **Professional** ⭐ | Rp 35.000 | Rp 336.000 | 5 GB SSD | 5 |
| **Business** | Rp 75.000 | Rp 720.000 | 15 GB SSD | Unlimited |

---

## 🛠️ Tech Stack

| Teknologi | Penggunaan |
|-----------|------------|
| **HTML5** | Struktur halaman dengan semantic elements |
| **CSS3** | Styling, animasi, responsive design, dark mode |
| **Vanilla JavaScript** | Logika aplikasi, DOM manipulation, localStorage |
| **Google Fonts** | Typography (Inter, Poppins) |
| **Midtrans Snap** | Payment gateway integration (Sandbox) |
| **LocalStorage** | Penyimpanan data client-side (orders, customers, packages) |

---

## 📖 Arsitektur Kode

### Modul JavaScript (`admin-script.js`)

| Modul | Fungsi |
|-------|--------|
| `Auth` | Autentikasi login/logout, session management, proteksi halaman |
| `DataStore` | CRUD operations dengan localStorage (getAll, getById, create, update, delete, search) |
| `SampleData` | Seeding data sample untuk packages, customers, dan orders |
| `UI` | Helper UI (notification toast, modal, currency formatter, date formatter, status badge) |
| `DashboardStats` | Kalkulasi statistik dashboard (revenue, total orders, dll.) |

### Payment Helper (`payment-config.js`)

| Fungsi | Deskripsi |
|--------|-----------|
| `generateDemoSnapToken()` | Generate mock Snap token (demo) |
| `openMidtransPayment()` | Buka popup pembayaran Midtrans |
| `generateWhatsAppLink()` | Generate link WhatsApp dengan template pesan |
| `createOrder()` | Buat order baru di DataStore |
| `updateOrderPayment()` | Update status pembayaran order |

---

## 📝 Lisensi

Project ini bersifat open-source dan bebas digunakan untuk keperluan pribadi maupun komersial.

---

## 👨‍💻 Author

**Js Corp** — [GitHub](https://github.com/azissaputr)

---

> 💡 **Tips:** Untuk menggunakan template ini di production, pastikan untuk mengintegrasikan dengan backend server (Node.js, PHP, Laravel, dll.) untuk keamanan pembayaran dan penyimpanan data yang proper.
