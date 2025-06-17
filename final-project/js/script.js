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
    { name: 'Albert Silva', position: 'CEO & Founder', image: 'images/team1.webp', bio: 'Experienced visionary with years of experience in organizations' },
    { name: 'Sarah Johnson', position: 'Lead Developer', image: 'images/team2.webp', bio: 'Full-stack developer passionate about clean code.' },
    { name: 'Mike Wilson', position: 'Designer', image: 'images/team3.webp', bio: 'Creative designer focused on user experience.' },
    { name: 'Lisa Chen', position: 'Marketing Director', image: 'images/team4.webp', bio: 'Strategic marketer with expertise in digital campaigns.' }
];

const demoContent = {
    demo1: { title: 'Interactive Dashboard', description: 'Experience our real-time analytics dashboard with live data visualization.', features: ['Real-time Updates', 'Custom Widgets', 'Export Options'], color: '#3498db' },
    demo2: { title: 'Advanced Search', description: 'Powerful search functionality with AI-powered suggestions and filters.', features: ['Smart Autocomplete', 'Advanced Filters', 'Saved Searches'], color: '#e74c3c' },
    demo3: { title: 'Collaboration Tools', description: 'Seamless team collaboration with integrated communication features.', features: ['Team Chat', 'File Sharing', 'Task Management'], color: '#2ecc71' }
};

// Form validation patterns
const validationPatterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-\(\)]{10,}$/
};

// Initialize localStorage data
function initializeLocalStorage() {
    if (!localStorage.getItem('visitCount')) {
        localStorage.setItem('visitCount', '1');
        localStorage.setItem('firstVisit', new Date().toISOString());
        localStorage.setItem('sessionData', JSON.stringify({ pages: ['index.html'], startTime: Date.now() }));
    } else {
        const currentCount = parseInt(localStorage.getItem('visitCount')) + 1;
        localStorage.setItem('visitCount', currentCount.toString());
        const sessionData = JSON.parse(localStorage.getItem('sessionData') || '{}');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (!sessionData.pages.includes(currentPage)) {
            sessionData.pages.push(currentPage);
            localStorage.setItem('sessionData', JSON.stringify(sessionData));
        }
    }

    // Store user preferences
    if (!localStorage.getItem('userPreferences')) {
        const defaultPreferences = { theme: 'light', newsletter: false, language: 'en', notifications: true, savedForms: [] };
        localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    }
}

// Mobile menu toggle functionality
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

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// CTA button functionality
function initializeCTAButton() {
    if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Get user data from localStorage
            const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
            const visitCount = parseInt(localStorage.getItem('visitCount') || '1');
            const sessionData = JSON.parse(localStorage.getItem('sessionData') || '{}');

            // Conditional branching based on visit count
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

// Demo functionality
function initializeDemoSection() {
    if (demoButtons.length > 0 && demoDisplay) {
        demoButtons.forEach((btn) => {
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

// Display demo content
function displayDemo(demoKey) {
    const demo = demoContent[demoKey];
    if (!demo) return;

    // Create feature list using loops
    let featuresList = '<ul class="demo-features">';
    demo.features.forEach(feature => {
        featuresList += `<li>${feature}</li>`;
    });
    featuresList += '</ul>';

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

// Team members display
function displayTeamMembers() {
    if (!teamGrid) return;

    teamGrid.innerHTML = '';

    teamMembers.forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        memberCard.style.animationDelay = `${index * 0.2}s`;

        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" onerror="this.src='images/placeholder-team.jpg'">
            <h3>${member.name}</h3>
            <p class="position">${member.position}</p>
            <p class="bio">${member.bio}</p>
            <button class="contact-member" data-member="${member.name}">Contact ${member.name.split(' ')[0]}</button>
        `;

        teamGrid.appendChild(memberCard);

        const contactBtn = memberCard.querySelector('.contact-member');
        contactBtn.addEventListener('click', () => {
            showNotification(`Contacting ${member.name}...`, 'info');
            const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
            preferences.teamInteractions = preferences.teamInteractions || {};
            preferences.teamInteractions[member.name] = new Date().toISOString();
            localStorage.setItem('userPreferences', JSON.stringify(preferences));
        });
    });
}

// Form validation and handling
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

    Object.entries(formElements).forEach(([key, element]) => {
        if (element && key !== 'newsletter') {
            element.addEventListener('blur', () => validateField(key, element));
            element.addEventListener('input', () => clearError(key));
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const formData = {};

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

    loadSavedFormData();
}

// Form submission
function submitForm(formData) {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    preferences.savedForms = preferences.savedForms || [];
    preferences.savedForms.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('userPreferences', JSON.stringify(preferences));

    const successElement = document.getElementById('form-success');
    if (successElement) {
        successElement.style.display = 'block';
        successElement.innerHTML = `
            <h3>Thank you, ${formData.name}!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
            <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
        `;
    }

    contactForm.reset();
    showNotification(`Thank you ${formData.name}! Your message has been sent.`, 'success');
    successElement.scrollIntoView({ behavior: 'smooth' });
}

// Show notification
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    setTimeout(() => notification.remove(), 5000);
}

// Initialize website
function initializeWebsite() {
    initializeLocalStorage();
    initializeMobileMenu();
    initializeCTAButton();
    initializeDemoSection();
    initializeContactForm();

    // Display team members (only on about page)
    if (window.location.pathname.includes('about') || document.getElementById('team-grid')) {
        displayTeamMembers();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);
