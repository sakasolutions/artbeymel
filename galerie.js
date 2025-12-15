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

    // --- 2. ADVANCED LIGHTBOX LOGIC ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const dotsContainer = document.getElementById('lb-dots');
    const prevBtn = document.querySelector('.lb-prev');
    const nextBtn = document.querySelector('.lb-next');

    let currentImages = [];
    let currentIndex = 0;
    
    // Swipe Variablen
    let touchStartX = 0;
    let touchEndX = 0;

    // Öffnen
    window.openLightbox = function(element) {
        const galleryData = element.getAttribute('data-gallery');
        
        if (galleryData) {
            // Links am Komma trennen
            currentImages = galleryData.split(',').map(url => url.trim());
        } else {
            // Fallback für Einzelbild
            const img = element.querySelector('img');
            const singleSrc = img.getAttribute('data-full') || img.src;
            currentImages = [singleSrc];
        }

        currentIndex = 0;
        createDots(); // Punkte generieren
        updateLightbox();
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Bild wechseln
    window.changeImage = function(direction) {
        currentIndex += direction;
        // Loop Logik
        if (currentIndex >= currentImages.length) currentIndex = 0;
        else if (currentIndex < 0) currentIndex = currentImages.length - 1;
        
        updateLightbox();
    }

    // UI Update
    function updateLightbox() {
        if(currentImages.length > 0) {
            lightboxImg.src = currentImages[currentIndex];
        }
        
        // Navigationselemente nur anzeigen wenn > 1 Bild
        const showNav = currentImages.length > 1;
        prevBtn.style.display = showNav ? 'flex' : 'none'; // flex wegen Zentrierung
        nextBtn.style.display = showNav ? 'flex' : 'none';
        dotsContainer.style.display = showNav ? 'flex' : 'none';

        updateDots();
    }

    // Punkte erstellen
    function createDots() {
        dotsContainer.innerHTML = '';
        if (currentImages.length <= 1) return;

        currentImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('lb-dot');
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = index;
                updateLightbox();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Aktiven Punkt markieren
    function updateDots() {
        const dots = document.querySelectorAll('.lb-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    // Schließen
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; 
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    // --- SWIPE LOGIK ---
    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    lightbox.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        // Mindestens 50px Wischweg erforderlich
        if (touchStartX - touchEndX > 50) {
            changeImage(1); // Swipe Links -> Nächstes Bild
        }
        if (touchEndX - touchStartX > 50) {
            changeImage(-1); // Swipe Rechts -> Vorheriges Bild
        }
    }

    // Tastatursteuerung
    document.addEventListener('keydown', function(event) {
        if (!lightbox.classList.contains('active')) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") changeImage(-1);
        if (event.key === "ArrowRight") changeImage(1);
    });
});