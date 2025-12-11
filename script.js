document.addEventListener("DOMContentLoaded" , () => {
    const ease = "power4.inOut";

    // Theme Toggler
    const themeToggler = document.getElementById('themeToggler');
    const html = document.documentElement;
    
    // Initialize theme from localStorage or system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        let theme = savedTheme;
        
        if (!theme) {
            // Check system preference if no saved theme
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        applyTheme(theme);
    }
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }
    
    if (themeToggler) {
        // Initialize on load
        initTheme();
        
        // Toggle on button click
        themeToggler.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // NAV shrink behavior: toggle `.shrink` on the <nav> when scrolled past 50px
    const nav = document.querySelector('nav');
    function handleNavShrink() {
        if (!nav) return;
        if (window.scrollY > 3) {
            nav.classList.add('shrink');
        } else {
            nav.classList.remove('shrink');
        }
    }
    // run once to set initial state
    handleNavShrink();
    // update on scroll
    window.addEventListener('scroll', handleNavShrink, { passive: true });

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");

            if (href && !href.startsWith("#") && href !== window.location.pathname) {
                animateTransition().then(() => {
                    window.location.href = href;
                });
            }
        });
    });

    revealTransition().then(() => {
        // keep existing transition init steps
        try {
            // If WebGLSampler exists in some contexts, keep previous intent
            if (typeof WebGLSampler !== 'undefined' && WebGLSampler.set) {
                WebGLSampler.set(".block", { visibiliy: "hidden" });
            }
        } catch (e) {
            // ignore if WebGLSampler isn't available
        }
    });

    function revealTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { scaleY: 1});
            gsap.to(".block", {
                scaleY: 0,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: "auto",
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            });
        });
    }

    function animateTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { visibiliy: "visible", scaleY: 0 });
            gsap.to(".block", {
                scaleY: 1,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: [2, 5],
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            })
        });
    }
});
