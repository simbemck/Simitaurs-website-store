// Cart storage
let cart = new Set();

// Page navigation
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Update URL hash
    window.location.hash = pageName;

    // Scroll to top
    window.scrollTo(0, 0);
}

// Add to cart function
function addToCart(itemId, itemName) {
    if (cart.has(itemId)) {
        return;
    }

    cart.add(itemId);
    updateCartBadge();
    showToast(itemName + ' added to cart!');

    // Update button state
    const shopCard = document.querySelector(`[data-item="${itemId}"]`);
    if (shopCard) {
        const button = shopCard.querySelector('.btn-shop');
        button.disabled = true;
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            In Cart
        `;
    }
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    const cartCount = document.getElementById('cart-count');

    if (cart.size > 0) {
        cartBadge.style.display = 'flex';
        cartCount.textContent = cart.size;
    } else {
        cartBadge.style.display = 'none';
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Handle initial page load
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash && ['home', 'shop', 'about'].includes(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash && ['home', 'shop', 'about'].includes(hash)) {
        showPage(hash);
    }
});
