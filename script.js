// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Pricing Toggle (Monthly/Yearly)
const toggleBtns = document.querySelectorAll('.toggle-btn');
const priceAmounts = document.querySelectorAll('.amount');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        toggleBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const period = btn.getAttribute('data-period');

        // Update prices
        priceAmounts.forEach(amount => {
            const monthlyPrice = parseInt(amount.getAttribute('data-monthly'));
            const yearlyPrice = parseInt(amount.getAttribute('data-yearly'));

            if (period === 'yearly') {
                const yearlyMonthly = Math.floor(yearlyPrice / 12);
                amount.textContent = yearlyMonthly.toLocaleString('id-ID');
            } else {
                amount.textContent = monthlyPrice.toLocaleString('id-ID');
            }
        });
    });
});

// Testimonial Carousel
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

const testimonials = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;
let autoPlayInterval;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    const offset = -currentIndex * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoPlay();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});

// Auto-play carousel
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

startAutoPlay();

// Pause auto-play on hover
testimonialTrack.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

testimonialTrack.addEventListener('mouseleave', () => {
    startAutoPlay();
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, pricing cards, and testimonial cards
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter Egg
console.log('%c🚀 Js Corp Hosting', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #A78BFA 0%, #93C5FD 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cTertarik bergabung dengan tim kami? Kirim email ke careers@jscorphosting.com', 'font-size: 14px; color: #6B7280;');

// ============================================
// WhatsApp Order Integration
// ============================================
const WHATSAPP_NUMBER = '6289677256392'; // Format internasional (62 = Indonesia)

// Handle all order buttons
document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-btn');

    orderButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const packageName = this.getAttribute('data-package');

            // Find package in DataStore by name
            const packages = DataStore.getAll('packages');
            const selectedPackage = packages.find(pkg => pkg.name === packageName);

            if (selectedPackage) {
                // Redirect to checkout page with package ID
                window.location.href = `checkout.html?package=${selectedPackage.id}`;
            } else {
                alert('Paket tidak ditemukan. Silakan refresh halaman.');
            }
        });
    });

    // Handle "Hubungi Kami" button
    const contactButtons = document.querySelectorAll('.btn-secondary');
    contactButtons.forEach(btn => {
        if (btn.textContent.includes('Hubungi')) {
            btn.addEventListener('click', () => {
                const message = encodeURIComponent('Halo Js Corp Hosting! Saya ingin bertanya tentang layanan hosting. Terima kasih! 🚀');
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
            });
        }
    });
});

// ============================================
// Web3 Style Custom Cursor
// ============================================
let cursorDot, cursorOutline;

document.addEventListener('DOMContentLoaded', () => {
    // Only enable custom cursor on landing page (not admin pages)
    const isAdminPage = window.location.pathname.includes('admin') ||
        window.location.href.includes('admin') ||
        document.body.classList.contains('admin-page');

    if (isAdminPage) {
        return; // Exit early for admin pages
    }

    // Create cursor elements
    cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    // Track mouse position
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update dot position immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow for outline
    function animateCursor() {
        const speed = 0.15;
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .pricing-card, .feature-card, .testimonial-card, input, textarea, select');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-hover');
        });
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('cursor-click');
        cursorOutline.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('cursor-click');
        cursorOutline.classList.remove('cursor-click');
    });
});

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
// Dynamic Package Rendering
// ============================================

// Render packages dynamically from localStorage
function renderDynamicPackages() {
    const packagesData = localStorage.getItem('packages');
    if (!packagesData) return;

    try {
        const packages = JSON.parse(packagesData);
        const activePackages = packages.filter(pkg => pkg.status === 'active');

        if (activePackages.length === 0) return;

        const pricingGrid = document.querySelector('.pricing-grid');
        if (!pricingGrid) return;

        // Clear existing pricing cards
        pricingGrid.innerHTML = '';

        // Render each active package
        activePackages.forEach((pkg, index) => {
            const isPopular = index === 1; // Middle package is popular
            const card = createPricingCard(pkg, isPopular);
            pricingGrid.appendChild(card);
        });

        // Reattach order button listeners
        attachOrderListeners();
    } catch (e) {
        console.error('Error rendering packages:', e);
    }
}

// Create pricing card element
function createPricingCard(pkg, isPopular = false) {
    const card = document.createElement('div');
    card.className = `pricing-card${isPopular ? ' popular' : ''}`;

    const features = Array.isArray(pkg.features) ? pkg.features : [];
    const featuresHTML = features.map(f => `<li>✓ ${f}</li>`).join('');

    card.innerHTML = `
        ${isPopular ? '<div class="popular-badge">Paling Populer</div>' : ''}
        <div class="pricing-header">
            <h3 class="plan-name">${pkg.name}</h3>
            <p class="plan-description">${pkg.support || 'Paket hosting berkualitas'}</p>
        </div>
        <div class="pricing-price">
            <span class="currency">Rp</span>
            <span class="amount" data-monthly="${pkg.price_monthly}" data-yearly="${pkg.price_yearly}">${pkg.price_monthly.toLocaleString('id-ID')}</span>
            <span class="period">/bulan</span>
        </div>
        <ul class="pricing-features">
            ${featuresHTML}
        </ul>
        <button class="btn ${isPopular ? 'btn-primary' : 'btn-outline'} btn-block order-btn" 
                data-package="${pkg.name}" 
                data-price="${pkg.price_monthly}">
            Pilih Paket
        </button>
    `;

    return card;
}

// Attach order button listeners
function attachOrderListeners() {
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const packageName = this.getAttribute('data-package');
            const price = this.getAttribute('data-price');

            const activePeriod = document.querySelector('.toggle-btn.active');
            const period = activePeriod ? activePeriod.getAttribute('data-period') : 'monthly';
            const periodText = period === 'yearly' ? 'Tahunan' : 'Bulanan';

            const formattedPrice = parseInt(price).toLocaleString('id-ID');

            let message = `Halo Js Corp Hosting! 👋\n\n`;
            message += `Saya tertarik untuk order paket *${packageName}*\n`;

            if (price !== '0') {
                message += `Billing: ${periodText}\n`;
                message += `Harga: Rp ${formattedPrice}\n\n`;
            } else {
                message += `Saya ingin mencoba Free Trial 30 hari\n\n`;
            }

            message += `Mohon informasi lebih lanjut. Terima kasih! 🚀`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    });
}

// Listen for package updates
window.addEventListener('storage', (e) => {
    if (e.key === 'packages') {
        renderDynamicPackages();
    }
});

// Initialize dynamic packages on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only render on main website, not admin pages
    if (!window.location.pathname.includes('admin') && !window.location.href.includes('admin')) {
        renderDynamicPackages();
    }
});

