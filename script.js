// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('preloader').style.display = 'none';
        }, 500);
    }, 2000);

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 248, 225, 0.95)';
            if (body.getAttribute('data-theme') === 'dark') {
                header.style.backgroundColor = 'rgba(62, 39, 35, 0.95)';
            }
        } else {
            header.style.backgroundColor = 'rgba(255, 248, 225, 0.95)';
            if (body.getAttribute('data-theme') === 'dark') {
                header.style.backgroundColor = 'rgba(62, 39, 35, 0.95)';
            }
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            }
        });
    }
    
    window.addEventListener('scroll', animateSkillBars);
    // Initial check in case skills are already in view
    animateSkillBars();

    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[index].classList.add('active');
        currentTestimonial = index;
    }
    
    nextButton.addEventListener('click', function() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialItems.length) nextIndex = 0;
        showTestimonial(nextIndex);
    });
    
    prevButton.addEventListener('click', function() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) prevIndex = testimonialItems.length - 1;
        showTestimonial(prevIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialItems.length) nextIndex = 0;
        showTestimonial(nextIndex);
    }, 5000);

    // Download CV Button
    const downloadBtn = document.getElementById('download-cv');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('In a real application, this would download a PDF file of the CV.');
        // For a real implementation, you would link to an actual PDF file
        // window.open('path/to/cv.pdf', '_blank');
    });

    // Coffee Animation
    const coffeeAnimation = document.getElementById('coffeeAnimation');
    const coffeeFill = document.getElementById('coffeeFill');
    const closeAnimation = document.getElementById('closeAnimation');
    
    // Add click event to any coffee-related element to trigger animation
    const coffeeElements = document.querySelectorAll('.coffee-cup, .coffee-steam, .skill-icon i.fa-coffee');
    
    coffeeElements.forEach(element => {
        element.addEventListener('click', function() {
            coffeeAnimation.style.display = 'flex';
            coffeeFill.style.height = '60px';
        });
    });
    
    closeAnimation.addEventListener('click', function() {
        coffeeAnimation.style.display = 'none';
        coffeeFill.style.height = '0';
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section, .skill-item, .timeline-item, .gallery-item, .video-item, .testimonial-item, .contact-item');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    // Initial check in case elements are already in view
    revealOnScroll();

    // WhatsApp Integration
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // In a real implementation, this would open WhatsApp with a pre-filled message
            // For demonstration, we'll just confirm the action
            if (!confirm('Open WhatsApp to contact Barista Nadjib?')) {
                e.preventDefault();
            }
        });
    });
});