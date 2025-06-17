WDD131 Final Project
Project Overview
This is a responsive, multi-page website built as the final project for WDD131. The website demonstrates modern web development practices including responsive design, interactive JavaScript functionality, form validation, and accessibility compliance.
🌟 Features

Responsive Design: Optimized for mobile, tablet, and desktop viewing
Interactive Navigation: Mobile-friendly hamburger menu with smooth transitions
Dynamic Content: JavaScript-powered interactive demos and team member display
Form Validation: Complete contact form with client-side validation
Local Storage Integration: Visitor tracking and user preference storage
Accessibility Compliant: WCAG guidelines followed for inclusive design
SEO Optimized: Semantic HTML5 markup with proper meta tags
Performance Optimized: Lazy loading images and efficient CSS

📁 Project Structure
final-project/
├── index.html          # Homepage with hero section and interactive demos
├── about.html          # About page with team members and company info
├── contact.html        # Contact page with validated form
├── references.html     # References and citations page
├── css/
│   └── styles.css      # Complete stylesheet with responsive design
├── js/
│   └── script.js       # Interactive functionality and form validation
├── images/             # Optimized images with lazy loading
│   ├── feature1.jpg
│   ├── feature2.jpg
│   ├── feature3.jpg
│   ├── about-us.jpg
│   ├── team1.jpg
│   ├── team2.jpg
│   └── team3.jpg
└── README.md          # This file
🚀 Getting Started
Prerequisites

Modern web browser (Chrome, Firefox, Safari, Edge)
Text editor or IDE (VS Code recommended)
Git for version control
GitHub account for hosting

Installation

Clone the repository:
bashgit clone https://github.com/yourusername/wdd131-final-project.git

Navigate to the project directory:
bashcd wdd131-final-project/final-project

Open index.html in your browser or use a local server:
bash# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server .


GitHub Pages Deployment

Push your code to a GitHub repository
Go to repository Settings → Pages
Select source branch (usually main or master)
Your site will be available at: https://yourusername.github.io/repository-name/final-project/

🛠️ Technical Implementation
HTML5 Features

Semantic markup (<header>, <nav>, <main>, <section>, <article>, <footer>)
Proper form structure with validation attributes
Accessibility attributes (ARIA labels, alt text)
Meta viewport for responsive design

CSS3 Features

CSS Grid and Flexbox for layout
CSS Custom Properties (variables)
Media queries for responsive design
Smooth transitions and hover effects
Mobile-first approach

JavaScript Functionality

Mobile Navigation: Hamburger menu toggle
Interactive Demos: Dynamic content switching
Form Validation: Real-time validation with error messages
Local Storage: Visit tracking and user preferences
Dynamic Content: Team member cards loaded via JavaScript
Conditional Logic: Different messages based on user behavior

Key JavaScript Functions
javascript// Mobile menu toggle
initializeMobileMenu()

// Form validation with regex patterns
validateForm()

// Local storage for user data
initializeLocalStorage()

// Dynamic content loading
loadTeamMembers()

// Interactive demo functionality
handleDemoSelection()
📱 Responsive Design

Mobile First: Designed for mobile devices first, then enhanced for larger screens
Breakpoints:

Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px


Flexible Grid: CSS Grid with minmax() for responsive layouts
Scalable Images: object-fit and responsive sizing

✅ Accessibility Features

Semantic HTML structure
ARIA labels for screen readers
Keyboard navigation support
High contrast mode support
Focus visible indicators
Reduced motion support for users with vestibular disorders

🔧 Form Validation
The contact form includes comprehensive validation:

Required fields: Name, email, subject, message
Email validation: Regex pattern matching
Phone validation: Optional field with format checking
Real-time feedback: Error messages appear instantly
Success handling: Confirmation message on submission

💾 Local Storage Features

Visit tracking: Counts user visits
User preferences: Stores theme and newsletter preferences
First visit detection: Special welcome message for new users
Persistent data: Preferences maintained across sessions

🎨 Custom CSS Properties
css:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --light-bg: #f8f9fa;
}
📊 Performance Optimizations

Lazy Loading: Images load only when needed
Efficient CSS: No unused rules, optimized selectors
Minimal JavaScript: Clean, efficient code without heavy libraries
Optimized Images: Properly sized and compressed

🧪 Testing Checklist

 All pages load correctly
 Navigation works on all devices
 Form validation functions properly
 Images load with proper alt text
 Mobile menu toggles correctly
 Interactive demos work
 Local storage saves data
 Responsive design works across devices
 Accessibility features function
 HTML validates without errors
 CSS validates without errors

🌐 Browser Support

Chrome 90+
Firefox 88+
Safari 14+
Edge 90+
Mobile browsers (iOS Safari, Chrome Mobile)

📝 Assignment Requirements Met

✅ 3+ pages with common navigation
✅ GitHub repository with GitHub Pages hosting
✅ Responsive design (mobile + desktop)
✅ HTML5 semantic markup
✅ Valid CSS with no unused rules
✅ Optimized images with lazy loading
✅ HTML form with validation
✅ JavaScript with all required features:

DOM manipulation
Event listeners
Arrays and objects
Local storage
Conditional logic
Loops
Functions
Template literals


✅ Accessibility compliance
✅ References page

🔗 Live Demo
View the live project: [Your GitHub Pages URL]
👤 Author
Your Name

GitHub: @yourusername
Course: WDD131 - Dynamic Web Fundamentals
Semester: [Current Semester]

📄 License
This project is for educational purposes as part of the WDD131 course curriculum.
🙏 Acknowledgments

Course materials and instructions from WDD131
Images sourced from [list your image sources]
Icons and fonts from respective providers
Inspiration from modern web design trends


Note: This project demonstrates proficiency in HTML5, CSS3, JavaScript, responsive design, and modern web development practices as required for the WDD131 final project.