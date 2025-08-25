// Lightweight JS: hamburger menu + smooth scroll + floating labels

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', String(isActive));
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const form = document.querySelector('.contact-form');
    if (form) {
        form.querySelectorAll('.magical-input').forEach(input => {
            input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
            input.addEventListener('blur', () => { if (!input.value) input.parentElement.classList.remove('focused'); });
        });
    }

    // Welcome overlay (once per session, skipable, low-end/reduced-motion aware)
    const overlay = document.getElementById('welcomeOverlay');
    const skipBtn = document.getElementById('welcomeSkip');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = (navigator.hardwareConcurrency || 4) <= 2;

    const shouldShow = !sessionStorage.getItem('welcomed') && !lowEnd;
    if (overlay && shouldShow) {
        overlay.hidden = false;
        // activate after next frame for transition
        requestAnimationFrame(() => overlay.classList.add('active'));

        const dismiss = () => {
            overlay.classList.remove('active');
            sessionStorage.setItem('welcomed', '1');
            // remove from DOM after transition for perf
            const removeDelay = reducedMotion ? 0 : 220;
            setTimeout(() => overlay.remove(), removeDelay);
        };

        skipBtn && skipBtn.addEventListener('click', dismiss);
        // auto dismiss quickly
        setTimeout(dismiss, reducedMotion ? 600 : 1500);
    }

    // Scrollspy (highlight nav link for visible section)
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = navLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
        const linkById = new Map(navLinks.map(l => [l.getAttribute('href'), l]));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = `#${entry.target.id}`;
                const link = linkById.get(id);
                if (!link) return;
                if (entry.isIntersecting) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.3 });

        sections.forEach(sec => observer.observe(sec));
    }
});


