/* ===========================
   عقاراتك — script.js
=========================== */

// ── 1. HEADER SCROLL EFFECT ──────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


// ── 2. HAMBURGER MENU + OVERLAY ──────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

// إغلاق عند الضغط على الـ Overlay
navOverlay.addEventListener('click', closeMenu);

// إغلاق عند الضغط على أي رابط داخل القائمة
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// إغلاق عند ضغط Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});


// ── 3. SCROLL ANIMATIONS ─────────────────────────────
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('animated'), delay);
        animObserver.unobserve(entry.target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));


// ── 4. SCROLL TO TOP ─────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── 5. ACTIVE NAV LINK ON SCROLL ─────────────────────
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
            const active = link.getAttribute('href') === `#${id}`;
            link.style.color      = active ? 'var(--accent)' : '';
            link.style.background = active ? 'var(--accent-dim)' : '';
        });
    });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));


// ── 6. SMOOTH SCROLL ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = header.offsetHeight + 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
});


// ── 7. COUNTER ANIMATION ─────────────────────────────
function animateCounter(el, target, suffix = '') {
    const duration = 1800;
    const start = performance.now();
    function update(ts) {
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * eased).toLocaleString('ar-EG') + suffix;
        if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const els      = entry.target.querySelectorAll('.hstat strong');
        const values   = [500, 15, 1200];
        const suffixes = ['+', '+', ''];
        els.forEach((el, i) => animateCounter(el, values[i], suffixes[i]));
        statsObserver.unobserve(entry.target);
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
