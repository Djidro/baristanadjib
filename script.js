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

    // Coffee Knowledge Quiz
    const quizContent = document.getElementById('quiz-content');
    const submitQuizBtn = document.getElementById('submit-quiz');
    
    // Coffee Quiz Questions Database
    const coffeeQuestions = [
        {
            question: "What is the ideal brewing temperature for coffee?",
            options: ["80-85°C", "90-96°C", "100-105°C", "70-75°C"],
            correct: 1
        },
        {
            question: "Which country is the largest producer of coffee?",
            options: ["Colombia", "Brazil", "Vietnam", "Ethiopia"],
            correct: 1
        },
        {
            question: "What is the standard dose for a single espresso shot?",
            options: ["5-7g", "7-9g", "18-20g", "12-15g"],
            correct: 1
        },
        {
            question: "Which coffee brewing method uses pressure?",
            options: ["French Press", "Pour Over", "Espresso", "Cold Brew"],
            correct: 2
        },
        {
            question: "What does 'crema' refer to in coffee?",
            options: ["Coffee grounds", "The golden foam on espresso", "A type of coffee bean", "Brewing time"],
            correct: 1
        },
        {
            question: "Which of these is NOT a coffee roast level?",
            options: ["Light", "Medium", "Dark", "Extra Bold"],
            correct: 3
        },
        {
            question: "What is the main active ingredient in coffee?",
            options: ["Theobromine", "Caffeine", "Tannin", "Antioxidants"],
            correct: 1
        },
        {
            question: "Which coffee drink contains equal parts espresso, steamed milk, and foam?",
            options: ["Latte", "Cappuccino", "Macchiato", "Americano"],
            correct: 1
        },
        {
            question: "What is 'single origin' coffee?",
            options: ["Coffee from one specific region", "Coffee with one type of bean", "Light roast coffee", "Decaffeinated coffee"],
            correct: 0
        },
        {
            question: "How long should espresso extraction typically take?",
            options: ["10-15 seconds", "45-60 seconds", "25-30 seconds", "5-10 seconds"],
            correct: 2
        },
        {
            question: "Which coffee variety is known for its wine-like characteristics?",
            options: ["Typica", "Bourbon", "Geisha", "Caturra"],
            correct: 2
        },
        {
            question: "What is the purpose of 'tamping' in espresso preparation?",
            options: ["To grind the beans", "To compress the coffee grounds", "To steam the milk", "To clean the machine"],
            correct: 1
        },
        {
            question: "Which milk alternative foams best for latte art?",
            options: ["Almond milk", "Soy milk", "Oat milk", "Coconut milk"],
            correct: 2
        },
        {
            question: "What does 'SCA' stand for in the coffee industry?",
            options: ["Specialty Coffee Association", "Superior Coffee Alliance", "Special Coffee Authority", "Supreme Coffee Association"],
            correct: 0
        },
        {
            question: "Which country is considered the birthplace of coffee?",
            options: ["Brazil", "Colombia", "Ethiopia", "Yemen"],
            correct: 2
        },
        {
            question: "What is 'bloom' in coffee brewing?",
            options: ["The coffee's aroma", "The initial pouring of water to release gases", "The color of the coffee", "The crema on espresso"],
            correct: 1
        },
        {
            question: "Which grind size is best for French Press?",
            options: ["Fine", "Medium", "Coarse", "Extra Fine"],
            correct: 2
        },
        {
            question: "What is 'third wave' coffee?",
            options: ["Coffee served in three cups", "The third brewing method", "A movement focusing on high-quality artisanal coffee", "Coffee with three types of beans"],
            correct: 2
        },
        {
            question: "Which coffee drink is traditionally served in a clear glass?",
            options: ["Cappuccino", "Latte", "Americano", "Flat White"],
            correct: 1
        },
        {
            question: "What is the main difference between Arabica and Robusta coffee?",
            options: ["Color", "Caffeine content", "Bean size", "Growing altitude"],
            correct: 1
        },
        {
            question: "How should coffee beans be stored?",
            options: ["In the freezer", "In a cool, dark, airtight container", "In direct sunlight", "In the refrigerator door"],
            correct: 1
        },
        {
            question: "What is 'cupping' in coffee terminology?",
            options: ["A brewing method", "A professional tasting technique", "A type of coffee cup", "A roasting process"],
            correct: 1
        },
        {
            question: "Which coffee drink contains the most caffeine?",
            options: ["Decaf Americano", "Regular Brewed Coffee", "Single Espresso", "Cold Brew"],
            correct: 3
        },
        {
            question: "What is the 'golden ratio' for coffee brewing?",
            options: ["1:1 coffee to water", "1:15 coffee to water", "1:50 coffee to water", "1:5 coffee to water"],
            correct: 1
        },
        {
            question: "Which part of the coffee plant produces the beans?",
            options: ["The leaves", "The roots", "The cherry fruit", "The stem"],
            correct: 2
        }
    ];

    let currentQuestions = [];
    let userAnswers = [];

    // Initialize Quiz
    function initializeQuiz() {
        // Select 10 random questions
        currentQuestions = getRandomQuestions(10);
        userAnswers = new Array(currentQuestions.length).fill(null);
        renderQuiz();
    }

    function getRandomQuestions(count) {
        const shuffled = [...coffeeQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function renderQuiz() {
        quizContent.innerHTML = '';
        
        currentQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-container';
            questionElement.innerHTML = `
                <div class="question-text">${index + 1}. ${question.question}</div>
                <div class="options-container">
                    ${question.options.map((option, optionIndex) => `
                        <div class="option ${userAnswers[index] === optionIndex ? 'selected' : ''}" data-question="${index}" data-option="${optionIndex}">
                            <input type="radio" id="q${index}o${optionIndex}" name="question${index}" value="${optionIndex}" ${userAnswers[index] === optionIndex ? 'checked' : ''}>
                            <label for="q${index}o${optionIndex}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            quizContent.appendChild(questionElement);
        });

        // Add event listeners to options
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                const questionIndex = parseInt(this.dataset.question);
                const optionIndex = parseInt(this.dataset.option);
                
                // Remove selected class from all options in this question
                document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update user answers
                userAnswers[questionIndex] = optionIndex;
                
                // Update radio button
                const radio = this.querySelector('input');
                radio.checked = true;
            });
        });
    }

    function calculateScore() {
        let score = 0;
        currentQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correct) {
                score++;
            }
        });
        return score;
    }

    function showResults() {
        const score = calculateScore();
        const percentage = (score / currentQuestions.length) * 100;
        
        let message = '';
        let description = '';
        
        if (percentage >= 90) {
            message = 'Coffee Expert! ☕';
            description = 'You truly know your coffee! Your knowledge is impressive.';
        } else if (percentage >= 70) {
            message = 'Coffee Connoisseur!';
            description = 'Great job! You have solid coffee knowledge.';
        } else if (percentage >= 50) {
            message = 'Coffee Enthusiast!';
            description = 'Good effort! You know the basics well.';
        } else {
            message = 'Coffee Novice';
            description = 'Keep learning! Coffee is a wonderful journey.';
        }
        
        quizContent.innerHTML = `
            <div class="results-container">
                <h3>Quiz Complete!</h3>
                <div class="score-display">${score}/${currentQuestions.length}</div>
                <div class="score-message">${message}</div>
                <div class="score-description">${description}</div>
                <button class="restart-btn" id="restart-quiz">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
        
        document.getElementById('restart-quiz').addEventListener('click', function() {
            initializeQuiz();
        });
    }

    // Quiz Event Listeners
    submitQuizBtn.addEventListener('click', function() {
        // Check if all questions are answered
        const unanswered = userAnswers.filter(answer => answer === null).length;
        
        if (unanswered > 0) {
            alert(`Please answer all ${unanswered} remaining question(s) before submitting.`);
            return;
        }
        
        showResults();
    });

    // Initialize quiz when page loads
    initializeQuiz();

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
    const revealElements = document.querySelectorAll('.section, .skill-item, .timeline-item, .gallery-item, .video-item, .contact-item');
    
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