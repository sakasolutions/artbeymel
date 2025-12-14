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

    // --- 2. ADVANCED LIGHTBOX LOGIC (SLIDESHOW) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.getElementById('lb-counter');
    const prevBtn = document.querySelector('.lb-prev');
    const nextBtn = document.querySelector('.lb-next');

    // Status Variablen
    let currentImages = []; // Array der Bild-URLs
    let currentIndex = 0;   // Aktuelles Bild

    // Funktion zum Öffnen der Lightbox
    window.openLightbox = function(element) {
        // Daten auslesen (data-gallery hat Priorität)
        const galleryData = element.getAttribute('data-gallery');
        
        if (galleryData) {
            // String am Komma trennen und aufräumen
            currentImages = galleryData.split(',').map(url => url.trim());
        } else {
            // Fallback für Einzelbilder
            const img = element.querySelector('img');
            // Wenn data-full da ist nehmen wir das, sonst src
            const singleSrc = img.getAttribute('data-full') || img.src;
            currentImages = [singleSrc];
        }

        // Starten bei Bild 0
        currentIndex = 0;
        updateLightbox();
        
        // Anzeigen
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Scrollen verhindern
    }

    // Funktion zum Blättern (-1 zurück, +1 vor)
    window.changeImage = function(direction) {
        currentIndex += direction;

        // Endlosschleife Logik
        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        }

        updateLightbox();
    }

    // UI aktualisieren (Bild, Pfeile, Zähler)
    function updateLightbox() {
        if(currentImages.length > 0) {
            lightboxImg.src = currentImages[currentIndex];
        }
        
        // Zähler und Pfeile nur anzeigen wenn > 1 Bild
        if(currentImages.length > 1) {
            counter.innerText = `${currentIndex + 1} / ${currentImages.length}`;
            counter.style.display = 'block';
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        } else {
            counter.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    // Schließen Funktion
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; 
        // Bild kurz danach löschen für sauberen Neustart
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    // Tastatursteuerung
    document.addEventListener('keydown', function(event) {
        if (!lightbox.classList.contains('active')) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") changeImage(-1);
        if (event.key === "ArrowRight") changeImage(1);
    });

});