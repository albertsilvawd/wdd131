// ===== TECHSOLUTIONS - OPTIMIZED JAVASCRIPT FILE =====
// Enhanced with performance optimizations, accessibility improvements and modern JS features

// Service Worker Registration for offline caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed: ', err));
    });
}

// Wait for DOM and critical assets to load
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ===== PERFORMANCE OPTIMIZATIONS =====
    const passiveOptions = { passive: true };
    const now = performance.now();

    // Debounce function for scroll/resize events
    const debounce = (func, delay = 100) => {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    };

    // Throttle function for frequent events
    const throttle = (func, limit = 100) => {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };

    // ===== ACCESSIBLE MOBILE NAVIGATION =====
    const menuToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-menu');
    const navItems = Array.from(document.querySelectorAll('.nav-menu a'));

    // Toggle mobile menu with proper ARIA attributes
    const toggleMobileMenu = () => {
        const isExpanding = !navLinks.classList.contains('active');

        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Update accessibility attributes
        menuToggle.setAttribute('aria-expanded', isExpanding);
        menuToggle.setAttribute('aria-label', isExpanding ? 'Close menu' : 'Open menu');

        // Trap focus when menu is open
        if (isExpanding) {
            document.body.style.overflow = 'hidden';
            trapFocus(navLinks);
        } else {
            document.body.style.overflow = '';
            releaseFocus();
        }
    };

    // Focus trap for modal/mobile menu
    let focusTrap = null;
    const trapFocus = (element) => {
        const focusableEls = Array.from(element.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.disabled);

        if (focusableEls.length === 0) return;

        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];

        firstFocusableEl.focus();

        focusTrap = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }
        };

        element.addEventListener('keydown', focusTrap);
    };

    const releaseFocus = () => {
        if (focusTrap) {
            navLinks.removeEventListener('keydown', focusTrap);
            focusTrap = null;
        }
    };

    // Initialize mobile menu
    if (menuToggle) {
        // Set initial ARIA attributes
        menuToggle.setAttribute('aria-haspopup', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');

        // Click event
        menuToggle.addEventListener('click', toggleMobileMenu);

        // Keyboard events
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    // Close menu when clicking items or outside
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });

        // Improve keyboard navigation
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMobileMenu();
                menuToggle.focus();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // ===== INTERACTIVE SERVICE DEMO =====
    const demoButtons = document.querySelectorAll('.demo-btn');
    const demoDisplay = document.getElementById('demo-display');

    if (demoButtons.length && demoDisplay) {
        // Demo content data
        const demoContent = {
            demo1: {
                title: 'Web Development',
                content: `
                    <h3>Custom Web Development Solutions</h3>
                    <p>We build responsive, accessible websites using modern technologies:</p>
                    <ul>
                        <li>HTML5, CSS3, JavaScript (ES6+)</li>
                        <li>React, Angular, or Vue.js frameworks</li>
                        <li>Node.js backend solutions</li>
                        <li>RESTful API integration</li>
                    </ul>
                    <p>Our web apps are optimized for performance, SEO, and user experience.</p>
                `,
                image: 'images/web-development.webp'
            },
            demo2: {
                title: 'Cloud Solutions',
                content: `
                    <h3>Cloud Infrastructure & Services</h3>
                    <p>Comprehensive cloud solutions tailored to your needs:</p>
                    <ul>
                        <li>AWS, Azure, and Google Cloud Platform</li>
                        <li>Cloud migration strategies</li>
                        <li>Serverless architecture</li>
                        <li>Containerization with Docker/Kubernetes</li>
                    </ul>
                    <p>We help you leverage cloud technology to scale your business.</p>
                `,
                image: 'images/cloud-solutions.webp'
            },
            demo3: {
                title: 'Mobile Apps',
                content: `
                    <h3>Cross-Platform Mobile Development</h3>
                    <p>Engaging mobile experiences for all platforms:</p>
                    <ul>
                        <li>iOS and Android native development</li>
                        <li>React Native cross-platform apps</li>
                        <li>Progressive Web Apps (PWAs)</li>
                        <li>App store optimization</li>
                    </ul>
                    <p>From concept to deployment, we handle the entire app lifecycle.</p>
                `,
                image: 'images/mobile-apps.webp'
            }
        };

        // Function to update demo display
        const updateDemoDisplay = (demoId) => {
            const content = demoContent[demoId];
            if (!content) return;

            demoDisplay.innerHTML = `
                <div class="demo-content">
                    <div class="demo-text">
                        ${content.content}
                    </div>
                    <img src="${content.image}" alt="${content.title}" loading="lazy" class="demo-image">
                </div>
            `;

            // Update ARIA attributes for accessibility
            demoButtons.forEach(btn => {
                const isSelected = btn.getAttribute('data-demo') === demoId;
                btn.setAttribute('aria-selected', isSelected);
                btn.classList.toggle('active', isSelected);
            });
        };

        // Initialize with first demo
        updateDemoDisplay('demo1');

        // Add event listeners to buttons
        demoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const demoId = button.getAttribute('data-demo');
                updateDemoDisplay(demoId);
            });

            // Keyboard accessibility
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const demoId = button.getAttribute('data-demo');
                    updateDemoDisplay(demoId);
                }
            });
        });
    }

    // ===== PERFORMANT SCROLL EFFECTS =====
    const header = document.querySelector('header');
    const updateHeader = throttle(() => {
        header.classList.toggle('scrolled', window.pageYOffset > 100);
    });

    window.addEventListener('scroll', updateHeader, passiveOptions);

    // ===== SMOOTH SCROLLING =====
    const smoothScroll = (target, duration = 800) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            startTime = startTime || currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);
            window.scrollTo(0, startPosition + (distance * ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    navItems.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);

                // Update active state
                navItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                this.blur(); // Remove focus after click for better UX
            }
        });
    });

    // ===== LAZY LOADING WITH INTERSECTION OBSERVER =====
    const lazyLoadImages = () => {
        const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));
        if (!('IntersectionObserver' in window)) {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    };

    const loadImage = (img) => {
        const src = img.dataset.src;
        if (!src) return;

        img.classList.add('loading');

        const imageLoader = new Image();
        imageLoader.src = src;

        imageLoader.onload = () => {
            img.src = src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            img.removeAttribute('data-src');

            // Add decoding async for off-main-thread decoding
            img.setAttribute('decoding', 'async');
        };

        imageLoader.onerror = () => {
            img.classList.remove('loading');
            img.classList.add('error');
            console.warn('Failed to load image:', src);
        };
    };

    // Initialize lazy loading
    lazyLoadImages();

    // ===== SCROLL ANIMATIONS =====
    const animateOnScroll = () => {
        const animatedElements = Array.from(document.querySelectorAll('.animate-on-scroll'));

        if (!('IntersectionObserver' in window)) {
            animatedElements.forEach(el => el.classList.add('animated'));
            return;
        }

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => scrollObserver.observe(el));
    };

    animateOnScroll();

    // ===== ACTIVE SECTION HIGHLIGHTING =====
    const updateActiveSection = debounce(() => {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const scrollPosition = window.pageYOffset + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                    navLink.setAttribute('aria-current', 'location');
                }
            } else if (navLink) {
                navLink.removeAttribute('aria-current');
            }
        });
    });

    window.addEventListener('scroll', updateActiveSection, passiveOptions);

    // ===== ENHANCED FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form');
    // Additional form validation logic if needed...
});
