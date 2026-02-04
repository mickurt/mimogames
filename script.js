document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all cards to animate
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        // Stagger animations
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
    });

    // Custom 3D Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.game-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on cursor position
            // Center is (0,0), range is -1 to 1 for calculation
            const xPct = (x / rect.width - 0.5) * 2; 
            const yPct = (y / rect.height - 0.5) * 2;

            // Rotate slightly (max 5 degrees)
            const xRot = -yPct * 5; 
            const yRot = xPct * 5;

            card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset transition for smooth exit
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // Hero Logo Parallax
    const heroSection = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');

    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        heroLogo.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});
