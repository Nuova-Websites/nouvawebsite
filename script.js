// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler with AJAX
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Hide any previous messages
        formMessage.style.display = 'none';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Submit to Google Apps Script
        fetch(contactForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Show success message
            formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 2 hours.';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#10b981';
            formMessage.style.color = 'white';
            
            // Change button text to "Sent!"
            submitButton.textContent = 'Sent!';
            submitButton.disabled = false;
            
            // Reset form
            contactForm.reset();
            
            // Reset button text after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
            }, 3000);
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            // Show error message
            formMessage.textContent = 'Oops! Something went wrong. Please try again or email us directly at hello@taylorswebsites.com';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#ef4444';
            formMessage.style.color = 'white';
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            
            console.error('Error:', error);
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000, suffix = '') {
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Initialize counter animations when page loads
window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.hero-stats .stat h3');
    if (stats.length >= 3) {
        // Animate "50+"
        animateCounter(stats[0], 50, 1200, '+');
        // Animate "24hr"
        animateCounter(stats[1], 24, 1200, 'hr');
        // Animate "100%"
        animateCounter(stats[2], 100, 1200, '%');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// Observe all pricing cards
document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.3}s`;
    observer.observe(card);
});

// Observe process cards with alternating delays
document.querySelectorAll('.process-card').forEach((card, index) => {
    // Each card gets a 0.3s delay, creating a nice staggered effect
    card.style.transitionDelay = `${index * 0.3}s`;
    observer.observe(card);
});

// Observe process arrows
document.querySelectorAll('.process-arrow').forEach((arrow, index) => {
    // Arrows appear slightly after their preceding card
    arrow.style.transitionDelay = `${(index + 1) * 0.3 + 0.1}s`;
    observer.observe(arrow);
});

// Observe section headers for underline animation
document.querySelectorAll('.section-header h2').forEach((header) => {
    observer.observe(header);
});

// Observe contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(item);
});

// Generate binary lines in hero section
function generateBinaryLines() {
    const container = document.querySelector('.binary-lines');
    if (!container) return;
    
    const lineCount = 25; // Increased number of binary lines
    const positions = []; // Track positions to avoid overlaps
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'binary-line';
        
        // Generate random binary string (12-20 characters)
        const length = Math.floor(Math.random() * 9) + 12;
        let binary = '';
        for (let j = 0; j < length; j++) {
            binary += Math.random() > 0.5 ? '1' : '0';
        }
        line.textContent = binary;
        
        // Find a position that doesn't overlap with existing lines
        let position;
        let attempts = 0;
        const maxAttempts = 50;
        
        do {
            position = {
                top: Math.random() * 90, // 0-90% to avoid edge overflow
                left: Math.random() * 90  // 0-90% to avoid edge overflow
            };
            attempts++;
        } while (hasOverlap(position, positions) && attempts < maxAttempts);
        
        // If we found a valid position or ran out of attempts, place the line
        if (attempts < maxAttempts || positions.length === 0) {
            line.style.top = `${position.top}%`;
            line.style.left = `${position.left}%`;
            positions.push(position);
            container.appendChild(line);
        }
    }
}

// Check if a position overlaps with existing positions
function hasOverlap(newPos, existingPositions) {
    const minDistance = 12; // Minimum distance between lines (in %)
    
    for (let pos of existingPositions) {
        const distance = Math.sqrt(
            Math.pow(newPos.top - pos.top, 2) + 
            Math.pow(newPos.left - pos.left, 2)
        );
        
        if (distance < minDistance) {
            return true;
        }
    }
    
    return false;
}

// Initialize binary lines when page loads
window.addEventListener('load', generateBinaryLines);


