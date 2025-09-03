document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-effect');
    const words = ["Video Editor", "Motion Graphics Artist", "Storyteller"]; // Your desired words
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150; // Speed for typing
    const deletingSpeed = 80; // Speed for deleting
    const pauseAtEnd = 2000; // Pause after typing a word
    const pauseBeforeDelete = 1000; // Pause before deleting
    const pauseBeforeNextWord = 500; // Pause before typing next word

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, letterIndex + 1);
            letterIndex++;
        }

        if (!isDeleting && letterIndex === currentWord.length) {
            // Typed fully, now pause and start deleting
            setTimeout(() => {
                isDeleting = true;
                setTimeout(type, pauseBeforeDelete);
            }, pauseAtEnd);
        } else if (isDeleting && letterIndex === 0) {
            // Deleted fully, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, pauseBeforeNextWord);
        } else {
            // Continue typing or deleting
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(type, speed);
        }
    }

    // Start the typing animation if the element exists
    if (typingElement) {
        type();
    }

    // Fade-in animation for project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });
});