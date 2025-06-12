// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const ctaBtn = document.getElementById('cta-btn');
const demoButtons = document.querySelectorAll('.demo-btn');
const demoDisplay = document.getElementById('demo-display');
const contactForm = document.getElementById('contact-form');
const teamGrid = document.getElementById('team-grid');

// Data arrays for dynamic content
const teamMembers = [
    {
        name: 'John Smith',
        position: 'CEO & Founder',
        image: 'images/team1.jpg',
        bio: 'Experienced leader with 15+ years in the industry.'
    },
    {
        name: 'Sarah Johnson',
        position: 'Lead Developer',
        image: 'images/team2.jpg',
        bio: 'Full-stack developer passionate about clean code.'
    },
    {
        name: 'Mike Wilson',
        position: 'Designer',
        image: 'images/team3.jpg',
        bio: 'Creative designer focused on user experience.'
    },
    {
        name: 'Lisa Chen',
        position: 'Marketing Director',
        image: 'images/team4.jpg',
        bio: 'Strategic marketer with expertise in digital campaigns.'
    }
];

const demoContent = {
    demo1: {
        title: 'Interactive Dashboard',
        description: 'Experience our real-time analytics dashboard with live data visualization.',
        features: ['Real-time Updates', 'Custom Widgets', 'Export Options'],
        color: '#3498db'
    },
    demo2: {
        title: 'Advanced Search',
        description: 'Powerful search functionality with AI-powered suggestions and filters.',
        features: ['Smart Autocomplete', 'Advanced Filters', 'Saved Searches'],
        color: '#e74c3c'
    },
    demo3: {
        title: 'Collaboration Tools',
        description: 'Seamless team collaboration with integrated communication features.',
        features: ['Team Chat', 'File Sharing', 'Task Management'],
        color: '#2ecc71'
    }
};

// Form validation patterns
const validationPatterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-\(\)]{10,}$/
};

// Initialize localStorage data (Required: localStorage usage)
function initializeLocalStorage() {
    if (!localStorage.getItem('visitCount')) {
        localStorage.setItem('visitCount', '1');
        localStorage.setItem('firstVisit', new Date().toISOString());
        localStorage.setItem('sessionData', JSON.stringify({
            pages: ['index.html'],
            startTime: Date.now()
        }));
    } else {
        const currentCount = parseInt(localStorage.getItem('visitCount')) + 1;
        localStorage.setItem('visitCount', currentCount.toString());

        // Update session data
        const sessionData = JSON.parse(localStorage.getItem('sessionData') || '{}');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (!sessionData.pages.includes(currentPage)) {
            sessionData.pages.push(currentPage);
            localStorage.setItem('sessionData', JSON.stringify(sessionData));
        }
    }

    // Store user preferences (Required: localStorage)
    if (!localStorage.getItem('userPreferences')) {
        const defaultPreferences = {
            theme: 'light',
            newsletter: false,
            language: 'en',
            notifications: true,
            savedForms: []
        };
        localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    }
}

// Mobile menu toggle functionality (Required: DOM manipulation)
function initializeMobileMenu() {
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Track menu usage
            const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
            preferences.mobileMenuUsed = (preferences.mobileMenuUsed || 0) + 1;
            localStorage.setItem('userPreferences', JSON.stringify(preferences));
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// CTA button functionality (Required: Event listeners)
function initializeCTAButton() {
    if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Get user data from localStorage (Required: localStorage)
            const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
            const visitCount = parseInt(localStorage.getItem('visitCount') || '1');
            const sessionData = JSON.parse(localStorage.getItem('sessionData') || '{}');

            // Conditional branching based on visit count (Required: If/else)
            let message, actionType;
            if (visitCount === 1) {
                message = `Welcome! This is your first visit. Let us show you around!`;
                actionType = 'welcome';
            } else if (visitCount >= 10) {
                message = `Welcome back, valued user! You've visited us ${visitCount} times. Thank you for your loyalty!`;
                actionType = 'loyal';
            } else if (sessionData.pages && sessionData.pages.length > 2) {
                message = `Great exploration! You've visited ${sessionData.pages.length} pages this session.`;
                actionType = 'explorer';
            } else {
                message = `Welcome back! Visit #${visitCount}. Ready to explore more?`;
                actionType = 'returning';
            }

            showNotification(message, actionType);

            // Update preferences with timestamp
            preferences.lastCTAClick = new Date().toISOString();
            preferences.ctaClicks = (preferences.ctaClicks || 0) + 1;
            localStorage.setItem('userPreferences', JSON.stringify(preferences));

            // Animate button
            ctaBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ctaBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Demo functionality (Required: Arrays and loops)
function initializeDemoSection() {
    if (demoButtons.length > 0 && demoDisplay) {
        demoButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const demoKey = btn.getAttribute('data-demo');

                // Remove active class from all buttons
                demoButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                displayDemo(demoKey);

                // Track demo usage in localStorage
                const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
                preferences.demoUsage = preferences.demoUsage || {};
                preferences.demoUsage[demoKey] = (preferences.demoUsage[demoKey] || 0) + 1;
                localStorage.setItem('userPreferences', JSON.stringify(preferences));
            });
        });
    }
}

// Display demo content (Required: Template literals and DOM manipulation)
function displayDemo(demoKey) {
    const demo = demoContent[demoKey];
    if (!demo) return;

    // Create feature list using loops (Required: Arrays/loops)
    let featuresList = '<ul class="demo-features">';
    demo.features.forEach(feature => {
        featuresList += `<li>${feature}</li>`;
    });
    featuresList += '</ul>';

    // Use template literals (Required: Template literals)
    const demoHTML = `
        <div class="demo-content" style="border-left: 4px solid ${demo.color};">
            <h3 style="color: ${demo.color};">${demo.title}</h3>
            <p>${demo.description}</p>
            <h4>Key Features:</h4>
            ${featuresList}
            <div class="demo-stats">
                <small>Demo loaded at: ${new Date().toLocaleTimeString()}</small>
            </div>
        </div>
    `;

    demoDisplay.innerHTML = demoHTML;

    // Add animation
    demoDisplay.style.opacity = '0';
    setTimeout(() => {
        demoDisplay.style.opacity = '1';
    }, 100);
}

// Team members display (Required: Arrays and DOM manipulation)
function displayTeamMembers() {
    if (!teamGrid) return;

    // Clear existing content
    teamGrid.innerHTML = '';

    // Create team member cards using forEach loop (Required: Arrays/loops)
    teamMembers.forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        memberCard.style.animationDelay = `${index * 0.2}s`;

        // Use template literals (Required: Template literals)
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" onerror="this.src='images/placeholder-team.jpg'">
            <h3>${member.name}</h3>
            <p class="position">${member.position}</p>
            <p class="bio">${member.bio}</p>
            <button class="contact-member" data-member="${member.name}">Contact ${member.name.split(' ')[0]}</button>
        `;

        teamGrid.appendChild(memberCard);

        // Add click event to contact button
        const contactBtn = memberCard.querySelector('.contact-member');
        contactBtn.addEventListener('click', () => {
            showNotification(`Contacting ${member.name}...`, 'info');

            // Track team member interactions
            const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
            preferences.teamInteractions = preferences.teamInteractions || {};
            preferences.teamInteractions[member.name] = new Date().toISOString();
            localStorage.setItem('userPreferences', JSON.stringify(preferences));
        });
    });
}

// Form validation and handling (Required: Form validation)
function initializeContactForm() {
    if (!contactForm) return;

    const formElements = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message'),
        newsletter: document.getElementById('newsletter')
    };

    // Real-time validation
    Object.entries(formElements).forEach(([key, element]) => {
        if (element && key !== 'newsletter') {
            element.addEventListener('blur', () => validateField(key, element));
            element.addEventListener('input', () => clearError(key));
        }
    });

    // Form submission (Required: Form handling)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const formData = {};

        // Validate all fields (Required: If/else statements)
        Object.entries(formElements).forEach(([key, element]) => {
            if (element) {
                if (key === 'newsletter') {
                    formData[key] = element.checked;
                } else {
                    formData[key] = element.value.trim();
                    if (!validateField(key, element)) {
                        isValid = false;
                    }
                }
            }
        });

        if (isValid) {
            submitForm(formData);
        } else {
            showNotification('Please fix the errors above.', 'error');
        }
    });

    // Load saved form data from localStorage
    loadSavedFormData();
}

// Field validation function (Required: If/else and validation)
function validateField(fieldName, element) {
    const value = element.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    let isValid = true;
    let errorMessage = '';

    // Required field check
    if (['name', 'email', 'subject', 'message'].includes(fieldName) && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (value) {
        // Pattern validation using if/else (Required: If/else)
        if (fieldName === 'name' && !validationPatterns.name.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid name (2-50 characters, letters only).';
        } else if (fieldName === 'email' && !validationPatterns.email.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (fieldName === 'phone' && value && !validationPatterns.phone.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        } else if (fieldName === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
    }

    // Display error
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }

    // Add/remove error class
    if (isValid) {
        element.classList.remove('error');
    } else {
        element.classList.add('error');
    }

    return isValid;
}

// Clear error function
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) {
        errorElement.textContent = '';
    }
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

// Form submission (Required: localStorage and DOM manipulation)
function submitForm(formData) {
    // Save form data to localStorage (Required: localStorage)
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    preferences.savedForms = preferences.savedForms || [];
    preferences.savedForms.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('userPreferences', JSON.stringify(preferences));

    // Show success message
    const successElement = document.getElementById('form-success');
    if (successElement) {
        successElement.style.display = 'block';
        successElement.innerHTML = `
            <h3>Thank you, ${formData.name}!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
            <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
        `;
    }

    // Reset form
    contactForm.reset();

    // Show notification
    showNotification(`Thank you ${formData.name}! Your message has been sent.`, 'success');

    // Scroll to success message
    successElement.scrollIntoView({ behavior: 'smooth' });
}

// Load saved form data
function loadSavedFormData() {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const savedForms = preferences.savedForms || [];

    if (savedForms.length > 0) {
        const lastForm = savedForms[savedForms.length - 1];
        const newsletterCheckbox = document.getElementById('newsletter');

        // Pre-check newsletter if user subscribed before
        if (newsletterCheckbox && lastForm.newsletter) {
            newsletterCheckbox.checked = true;
        }
    }
}

// Notification system (Required: DOM manipulation)
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Page analytics (Required: localStorage)
function trackPageAnalytics() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const analytics = JSON.parse(localStorage.getItem('pageAnalytics') || '{}');

    analytics[currentPage] = analytics[currentPage] || {
        visits: 0,
        totalTime: 0,
        lastVisit: null
    };

    analytics[currentPage].visits++;
    analytics[currentPage].lastVisit = new Date().toISOString();

    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - startTime;
        analytics[currentPage].totalTime += timeSpent;
        localStorage.setItem('pageAnalytics', JSON.stringify(analytics));
    });

    localStorage.setItem('pageAnalytics', JSON.stringify(analytics));
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .team-member {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
            transform: translateY(20px);
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .demo-btn.active {
            background-color: #2c3e50 !important;
            transform: scale(1.05);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .demo-features {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }
        
        .demo-features li {
            margin: 0.5rem 0;
            color: #555;
        }
        
        .demo-stats {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
        }
    `;
    document.head.appendChild(style);
}

// Main initialization function (Required: Function organization)
function initializeWebsite() {
    // Add dynamic styles
    addDynamicStyles();

    // Initialize localStorage (Required: localStorage)
    initializeLocalStorage();

    // Initialize mobile menu
    initializeMobileMenu();

    // Initialize CTA button
    initializeCTAButton();

    // Initialize demo section
    initializeDemoSection();

    // Initialize contact form
    initializeContactForm();

    // Display team members (only on about page)
    if (window.location.pathname.includes('about') || document.getElementById('team-grid')) {
        displayTeamMembers();
    }

    // Track page analytics
    trackPageAnalytics();

    // Add scroll effect to navigation
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Show welcome message for first-time visitors
    const visitCount = parseInt(localStorage.getItem('visitCount') || '1');
    if (visitCount === 1) {
        setTimeout(() => {
            showNotification('Welcome to our website! Explore all our features.', 'info');
        }, 2000);
    }

    console.log('Website initialized successfully!');
    console.log(`Visit count: ${visitCount}`);
    console.log('All JavaScript features loaded and ready.');
}

// Initialize when DOM is loaded (Required: Event handling)
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    preferences.lastActivity = new Date().toISOString();
    preferences.tabSwitches = (preferences.tabSwitches || 0) + 1;
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        validateField,
        displayDemo,
        showNotification
    };
}