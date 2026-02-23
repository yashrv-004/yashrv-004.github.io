document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and insert a component
    const loadComponent = (componentPath, placeholderId) => {
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${componentPath}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                } else {
                    console.error(`Placeholder with ID ${placeholderId} not found.`);
                }
            })
            .catch(error => {
                console.error('Error loading component:', error);
            });
    };

    // Load header and footer
    loadComponent('header.html', 'header-placeholder');
    loadComponent('footer.html', 'footer-placeholder');

    // Header: hide scrolling down, show only when scrolling up AND near the top
    const header = document.querySelector('.main-header');
    const HIDE_AFTER = 200;  // start hiding once past 200px
    const SHOW_WITHIN = 180; // only show when within 180px of top
    let lastScrollY = window.scrollY;
    let scrollingToTop = false; // lock flag for scroll-to-top button

    function updateHeader() {
        if (!header) return;
        if (scrollingToTop) return; // header is locked visible during scroll-to-top

        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;

        if (scrollingDown && currentScrollY > HIDE_AFTER) {
            header.classList.add('header-hidden');
        } else if (!scrollingDown && currentScrollY <= SHOW_WITHIN) {
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // ── Scroll-to-top button ──────────────────────────────────────────
    // Inject styles inline so they always apply regardless of CSS load order
    const btnStyle = document.createElement('style');
    btnStyle.textContent = `
        #scroll-to-top {
            position: fixed !important;
            bottom: 28px !important;
            left: 24px !important;
            z-index: 9999 !important;
            width: 42px !important;
            height: 42px !important;
            border-radius: 50% !important;
            border: 1px solid rgba(255,255,255,0.2) !important;
            background: rgba(26,26,26,0.9) !important;
            backdrop-filter: blur(8px) !important;
            color: #eaeaea !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            opacity: 0 !important;
            pointer-events: none !important;
            transform: translateY(10px) !important;
            transition: opacity 0.25s ease, transform 0.25s ease, background 0.2s ease !important;
            padding: 0 !important;
            box-sizing: border-box !important;
        }
        #scroll-to-top svg { width: 20px; height: 20px; display: block; }
        #scroll-to-top.visible {
            opacity: 1 !important;
            pointer-events: auto !important;
            transform: translateY(0) !important;
        }
        #scroll-to-top:hover { background: rgba(26,26,26,0.9) !important; }
    `;
    document.head.appendChild(btnStyle);

    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
    document.body.appendChild(scrollBtn);

    // Show / hide button based on scroll position
    function updateScrollBtn() {
        if (window.scrollY > 150) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateScrollBtn, { passive: true });
    updateScrollBtn();

    // On click: show header immediately, lock it, scroll to top, unlock when done
    scrollBtn.addEventListener('click', () => {
        if (!header) return;

        // Show header right away
        header.classList.remove('header-hidden');
        scrollingToTop = true;
        lastScrollY = 0;

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Unlock once scroll settles at top
        const unlockWatcher = setInterval(() => {
            if (window.scrollY <= 5) {
                scrollingToTop = false;
                clearInterval(unlockWatcher);
            }
        }, 100);

        // Safety unlock after 2s in case scroll never reaches 0
        setTimeout(() => {
            scrollingToTop = false;
            clearInterval(unlockWatcher);
        }, 2000);
    });
});

