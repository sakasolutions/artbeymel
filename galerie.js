document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOBILE NAV ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
    }

    // --- 2. LIGHTBOX LOGIC ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Öffnen
    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        const fullUrl = img.getAttribute('data-full');
        
        lightboxImg.src = fullUrl;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    // Schließen
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; 
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            window.closeLightbox();
        }
    });

});