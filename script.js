document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ANIMATIONEN (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 2. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Wenn es nur '#' ist, mache nichts (wird oft für Platzhalter genutzt)
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 3. MOBILE NAVIGATION ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Menü ein/ausfahren
            nav.classList.toggle('nav-active');

            // Links animieren
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Menü schließen bei Klick auf Link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                 link.style.animation = '';
            });
        });
    });


    // --- 4. DATEI UPLOAD NAME ANZEIGEN ---
    // Dies sorgt dafür, dass "Keine Datei ausgewählt" sich in den Dateinamen ändert
    const fileUploadBtn = document.getElementById('file-upload');
    const fileChosenSpan = document.getElementById('file-chosen');

    if (fileUploadBtn && fileChosenSpan) {
        fileUploadBtn.addEventListener('change', function(){
            // Wenn eine Datei gewählt wurde, Namen anzeigen, sonst Standardtext
            if(this.files && this.files.length > 0) {
                fileChosenSpan.textContent = this.files[0].name;
            } else {
                fileChosenSpan.textContent = "Keine Datei ausgewählt";
            }
        });
    }
});