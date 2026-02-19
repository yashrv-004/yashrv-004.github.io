document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Header Scroll Logic (Auto-hide)
    // ==========================================
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');

    if (header) {
        // Calculate header height dynamically for accurate sticky positioning
        const updateHeaderHeight = () => {
            const height = header.offsetHeight;
            document.documentElement.style.setProperty('--header-height-dynamic', `${height}px`);
        };
        window.addEventListener('resize', updateHeaderHeight);
        updateHeaderHeight(); // Initial call

        // Sync body class with header visibility (handles both scroll & auto-hide)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (header.classList.contains('header-hidden')) {
                        document.body.classList.remove('header-visible');
                    } else {
                        document.body.classList.add('header-visible');
                    }
                }
            });
        });
        observer.observe(header, { attributes: true });

        // Initial check
        if (!header.classList.contains('header-hidden')) {
            document.body.classList.add('header-visible');
        }

        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Calculate scroll delta
            let scrollDelta = lastScrollTop - scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down -> Hide header
                header.classList.add('header-hidden');
            } else if (scrollDelta > 20 || scrollTop < 100) { // Show if aggressive up-scroll OR near top
                // Scrolling up FAST or at TOP -> Show header
                header.classList.remove('header-hidden');
            }

            // Always update lastScrollTop
            lastScrollTop = scrollTop;
        });
    }

    // ==========================================
    // 2. Back to Top Button
    // ==========================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // ==========================================
    // 3. Advanced Video Playback Logic
    // ==========================================
    const videos = document.querySelectorAll('video');

    // Observer: Autoplay Muted when visible, Pause when hidden
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const container = video.closest('.video-container');
            const overlay = container ? container.querySelector('.video-overlay') : null;

            if (entry.isIntersecting) {
                // Video is visible -> Play Muted (if paused)
                if (video.paused) {
                    video.muted = true;
                    video.play().catch(e => console.log("Autoplay blocked/failed", e));
                }
            } else {
                // Video left viewport -> Pause & Mute (Stop Audio)
                video.pause();
                video.muted = true;
                if (overlay) overlay.style.display = 'flex'; // Reset overlay state
            }
        });
    }, {
        threshold: 0.25
    }); // 25% visibility trigger

    videos.forEach(video => {
        observer.observe(video);

        const container = video.closest('.video-container');
        if (container) {
            container.addEventListener('click', (e) => {
                // 1. Mute ALL other videos
                videos.forEach(v => {
                    if (v !== video) {
                        v.muted = true;
                        const otherOverlay = v.closest('.video-container')?.querySelector('.video-overlay');
                        if (otherOverlay) otherOverlay.style.display = 'flex';
                    }
                });

                // 2. Unmute CURRENT & Play
                video.muted = false;
                video.play().catch(e => console.error("Play error", e));

                // Hide overlay
                const overlay = container.querySelector('.video-overlay');
                if (overlay) overlay.style.display = 'none';
            });
        }
    });
});
