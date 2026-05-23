// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
            const icon = mobileMenuBtn.querySelector('i');
            if (isActive) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    const slideLeftElements = document.querySelectorAll('.slide-left');
    slideLeftElements.forEach(el => observer.observe(el));

    const slideRightElements = document.querySelectorAll('.slide-right');
    slideRightElements.forEach(el => observer.observe(el));

    const scaleElements = document.querySelectorAll('.scale-in');
    scaleElements.forEach(el => observer.observe(el));

    // Simple Glitch effect interval for the title
    const glitchElement = document.querySelector('.glitch');
    if(glitchElement) {
        setInterval(() => {
            glitchElement.style.textShadow = `
                ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(0,240,255,0.7),
                ${Math.random() * -5 + 2.5}px ${Math.random() * -5 + 2.5}px 0 rgba(138,43,226,0.7)
            `;
            setTimeout(() => {
                glitchElement.style.textShadow = 'none';
            }, 100);
        }, 3000);
    }
});
