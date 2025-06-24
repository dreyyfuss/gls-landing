// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
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

// Button click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Donate Now button
    const donateButton = document.querySelector('.cta-button');
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            // Add your donation page redirect or modal logic here
            console.log('Donate button clicked');
            // Example: window.location.href = '/donate';
            alert('Redirect to donation page - Replace this with actual donation logic');
        });
    }

    // Learn More button
    const learnMoreButton = document.querySelector('.learn-more-button');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function() {
            // Add your learn more page redirect or modal logic here
            console.log('Learn More button clicked');
            // Example: window.location.href = '/get-involved';
            alert('Redirect to get involved page - Replace this with actual page logic');
        });
    }
});

// Header scroll effect (optional enhancement)
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(245, 245, 245, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#f5f5f5';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for scroll animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.about, .ministries, .get-involved');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Ministry cards hover effect enhancement
document.addEventListener('DOMContentLoaded', function() {
    const ministryCards = document.querySelectorAll('.ministry-card');
    
    ministryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        try {
            // Option 1: Using EmailJS (recommended for client-side)
            await sendEmailWithEmailJS(formObject);
            
            // Option 2: Using your own backend
            // await sendEmailToBackend(formObject);
            
            // Option 3: Using Formspree
            // await sendEmailWithFormspree(formObject);
            
            showSuccessMessage();
            contactForm.reset();
            
        } catch (error) {
            console.error('Error sending email:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            setLoadingState(false);
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'subject', 'message'];
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const formGroup = field.closest('.form-group');
            
            // Remove existing error states
            formGroup.classList.remove('error');
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Validate field
            if (!field.value.trim()) {
                showFieldError(formGroup, 'This field is required');
                isValid = false;
            } else if (fieldName === 'email' && !validateEmail(field.value)) {
                showFieldError(formGroup, 'Please enter a valid email address');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showFieldError(formGroup, message) {
        formGroup.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            buttonText.style.display = 'none';
            buttonLoader.style.display = 'inline-block';
        } else {
            submitButton.disabled = false;
            buttonText.style.display = 'inline-block';
            buttonLoader.style.display = 'none';
        }
    }
    
    function showSuccessMessage() {
        // Create success message element
        let successMessage = document.querySelector('.success-message');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            contactForm.insertBefore(successMessage, contactForm.firstChild);
        }
        
        successMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
        successMessage.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// EMAIL SENDING OPTIONS

// Option 1: EmailJS (Client-side solution - RECOMMENDED)
async function sendEmailWithEmailJS(formData) {
    // First, you need to:
    // 1. Sign up at https://www.emailjs.com/
    // 2. Create an email service (Gmail, Outlook, etc.)
    // 3. Create an email template
    // 4. Get your public key, service ID, and template ID
    
    // Add EmailJS script to your HTML head:
    // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
    // Initialize EmailJS (replace with your public key)
    emailjs.init("LB7dInoM_AnmRU0ZC");
    
    // Send email (replace with your service ID and template ID)

    const response = await emailjs.send(
        "service_2l4nb9w",
        "template_imgme1f",
        {
            name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            title: formData.subject,
            message: formData.message,
            to_email: "your-email@organization.org"
        }
    );
    
    // // For demo purposes, simulate success
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log('Email sent successfully (demo)');
}


// Form validation and handling (if you add contact forms later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for future use
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 300px;
    `;
    
    // Set colors based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            notification.style.color = 'white';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
            notification.style.color = 'white';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}