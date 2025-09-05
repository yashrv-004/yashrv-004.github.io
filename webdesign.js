document.addEventListener('DOMContentLoaded', function() {
    // Simple fade-in animation for elements
    const fadeInElements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Starry background effect
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        const numberOfStars = 150;
        for (let i = 0; i < numberOfStars; i++) {
            let star = document.createElement('div');
            star.classList.add('star');
            let size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            
            // Adjust animation duration and delay for a twinkling effect
            const duration = Math.random() * 2 + 1; // 1s to 3s
            const delay = Math.random() * 3; // 0s to 3s
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;

            starsContainer.appendChild(star);
        }
    }
});
