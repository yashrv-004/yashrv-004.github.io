document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide header on scroll (mobile only)
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    function handleScroll() {
        // Apply auto-hide on all screen sizes (both mobile and desktop)
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide header
            header.classList.add('header-hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

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

    // Starfield animation
    const canvas = document.getElementById('starfield');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = document.getElementById('hero-reel').offsetHeight;

        const stars = [];
        const numStars = 200;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                vx: Math.floor(Math.random() * 50) - 25,
                vy: Math.floor(Math.random() * 50) - 25
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "lighter";

            for (let i = 0, x = stars.length; i < x; i++) {
                const s = stars[i];
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        function update() {
            for (let i = 0, x = stars.length; i < x; i++) {
                const s = stars[i];
                s.x += s.vx / 60;
                s.y += s.vy / 60;

                if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
                if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
            }
        }

        function tick() {
            draw();
            update();
            requestAnimationFrame(tick);
        }

        tick();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = document.getElementById('hero-reel').offsetHeight;
        });
    }

    // Quote section starfield animation
    const quoteCanvas = document.getElementById('quote-starfield');
    if (quoteCanvas) {
        const quoteCtx = quoteCanvas.getContext('2d');
        const quoteSection = document.getElementById('cta-quote');
        quoteCanvas.width = window.innerWidth;
        quoteCanvas.height = quoteSection.offsetHeight;

        const quoteStars = [];
        const numQuoteStars = 150;

        for (let i = 0; i < numQuoteStars; i++) {
            quoteStars.push({
                x: Math.random() * quoteCanvas.width,
                y: Math.random() * quoteCanvas.height,
                radius: Math.random() * 1.5,
                vx: Math.floor(Math.random() * 30) - 15,
                vy: Math.floor(Math.random() * 30) - 15
            });
        }

        function quoteDraw() {
            quoteCtx.clearRect(0, 0, quoteCanvas.width, quoteCanvas.height);
            quoteCtx.globalCompositeOperation = "lighter";

            for (let i = 0, x = quoteStars.length; i < x; i++) {
                const s = quoteStars[i];
                quoteCtx.fillStyle = "#fff";
                quoteCtx.beginPath();
                quoteCtx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
                quoteCtx.fill();
            }
        }

        function quoteUpdate() {
            for (let i = 0, x = quoteStars.length; i < x; i++) {
                const s = quoteStars[i];
                s.x += s.vx / 60;
                s.y += s.vy / 60;

                if (s.x < 0 || s.x > quoteCanvas.width) s.vx = -s.vx;
                if (s.y < 0 || s.y > quoteCanvas.height) s.vy = -s.vy;
            }
        }

        function quoteTick() {
            quoteDraw();
            quoteUpdate();
            requestAnimationFrame(quoteTick);
        }

        quoteTick();

        window.addEventListener('resize', () => {
            quoteCanvas.width = window.innerWidth;
            quoteCanvas.height = quoteSection.offsetHeight;
        });
    }
});