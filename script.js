// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollToTop');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
        
        // Active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Scroll to top button click event
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        // Update button icon
        if (document.body.classList.contains('light-mode')) {
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showFormMessage(formError, 'Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage(formError, 'Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (in a real app, you'd send data to a server)
            setTimeout(function() {
                showFormMessage(formSuccess, 'Your message has been sent successfully!');
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form messages
    function showFormMessage(element, message) {
        // Hide both message elements first
        formSuccess.classList.add('d-none');
        formError.classList.add('d-none');
        
        // Show the appropriate message
        element.textContent = message;
        element.classList.remove('d-none');
        
        // Hide message after 5 seconds
        setTimeout(function() {
            element.classList.add('d-none');
        }, 5000);
    }
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Initial call to set active nav link
    updateActiveNavLink();
});