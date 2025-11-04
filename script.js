// Coffee Portfolio - Professional JavaScript
class CoffeePortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupQuiz();
        this.setupCoffeeAnimation();
        this.setupWhatsAppIntegration();
        this.setupPerformanceOptimizations();
    }

    // Preloader with enhanced UX
    setupPreloader() {
        const preloader = document.getElementById('preloader');
        
        // Ensure preloader is visible initially
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';

        // Wait for all critical resources to load
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    this.trackEvent('Preloader', 'Complete');
                }, 500);
            }, 1000);
        });

        // Fallback in case load event doesn't fire
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 3000);
    }

    // Theme Toggle with system preference detection
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('.theme-text');
        const body = document.body;

        // Check for saved theme preference or system preference
        const getPreferredTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;

            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        // Apply theme
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Light Mode';
            } else {
                body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Dark Mode';
            }
            localStorage.setItem('theme', theme);
        };

        // Initialize theme
        applyTheme(getPreferredTheme());

        // Toggle theme on click
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            this.trackEvent('Theme', 'Toggle', newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Navigation with enhanced mobile experience
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle mobile menu
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isExpanded);

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            this.trackEvent('Navigation', 'Mobile Menu Toggle', !isExpanded ? 'open' : 'close');
        });

        // Close mobile menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Sticky header with performance optimization
        this.setupStickyHeader();
    }

    setupStickyHeader() {
        const header = document.getElementById('header');
        let ticking = false;

        const updateHeader = () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 248, 225, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
                if (document.body.getAttribute('data-theme') === 'dark') {
                    header.style.backgroundColor = 'rgba(62, 39, 35, 0.98)';
                }
            } else {
                header.style.backgroundColor = 'rgba(255, 248, 225, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                if (document.body.getAttribute('data-theme') === 'dark') {
                    header.style.backgroundColor = 'rgba(62, 39, 35, 0.95)';
                }
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Smooth scrolling with offset for fixed header
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#' || href === '#0') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (!target) return;

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without page jump
                history.pushState(null, null, href);
                
                this.trackEvent('Navigation', 'Smooth Scroll', href);
            });
        });
    }

    // Animations with Intersection Observer for better performance
    setupAnimations() {
        this.setupSkillBars();
        this.setupScrollReveal();
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const level = bar.getAttribute('data-level');
                    
                    // Use requestAnimationFrame for smooth animation
                    requestAnimationFrame(() => {
                        bar.style.width = level + '%';
                    });
                    
                    observer.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    setupScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.section, .skill-item, .timeline-item, .gallery-item, .video-item, .contact-item, .stat'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Enhanced Coffee Quiz with better UX
    setupQuiz() {
        this.quiz = {
            content: document.getElementById('quiz-content'),
            submitBtn: document.getElementById('submit-quiz'),
            questions: this.getCoffeeQuestions(),
            currentQuestions: [],
            userAnswers: [],
            initialized: false
        };

        this.initializeQuiz();
        this.setupQuizEventListeners();
    }

    getCoffeeQuestions() {
        return [
            {
                question: "What is the ideal brewing temperature for coffee?",
                options: ["80-85°C", "90-96°C", "100-105°C", "70-75°C"],
                correct: 1,
                explanation: "The ideal brewing temperature is 90-96°C (195-205°F) for optimal extraction."
            },
            {
                question: "Which country is the largest producer of coffee?",
                options: ["Colombia", "Brazil", "Vietnam", "Ethiopia"],
                correct: 1,
                explanation: "Brazil is the world's largest coffee producer, accounting for about 35% of global production."
            },
            {
                question: "What is the standard dose for a single espresso shot?",
                options: ["5-7g", "7-9g", "18-20g", "12-15g"],
                correct: 1,
                explanation: "A single espresso shot typically uses 7-9g of coffee, while a double uses 14-18g."
            },
            {
                question: "Which coffee brewing method uses pressure?",
                options: ["French Press", "Pour Over", "Espresso", "Cold Brew"],
                correct: 2,
                explanation: "Espresso uses 9-10 bars of pressure to force hot water through finely-ground coffee."
            },
            {
                question: "What does 'crema' refer to in coffee?",
                options: ["Coffee grounds", "The golden foam on espresso", "A type of coffee bean", "Brewing time"],
                correct: 1,
                explanation: "Crema is the golden-brown foam that forms on top of a properly extracted espresso shot."
            },
            {
                question: "Which of these is NOT a coffee roast level?",
                options: ["Light", "Medium", "Dark", "Extra Bold"],
                correct: 3,
                explanation: "'Extra Bold' is a marketing term, not an official roast level classification."
            },
            {
                question: "What is the main active ingredient in coffee?",
                options: ["Theobromine", "Caffeine", "Tannin", "Antioxidants"],
                correct: 1,
                explanation: "Caffeine is the primary psychoactive substance in coffee that provides its stimulating effects."
            },
            {
                question: "Which coffee drink contains equal parts espresso, steamed milk, and foam?",
                options: ["Latte", "Cappuccino", "Macchiato", "Americano"],
                correct: 1,
                explanation: "A traditional cappuccino has equal parts espresso, steamed milk, and milk foam."
            },
            {
                question: "What is 'single origin' coffee?",
                options: ["Coffee from one specific region", "Coffee with one type of bean", "Light roast coffee", "Decaffeinated coffee"],
                correct: 0,
                explanation: "Single origin coffee comes from one specific geographic region, farm, or cooperative."
            },
            {
                question: "How long should espresso extraction typically take?",
                options: ["10-15 seconds", "45-60 seconds", "25-30 seconds", "5-10 seconds"],
                correct: 2,
                explanation: "Proper espresso extraction typically takes 25-30 seconds for a balanced flavor profile."
            }
        ];
    }

    initializeQuiz() {
        this.quiz.currentQuestions = this.getRandomQuestions(5); // Reduced to 5 for better UX
        this.quiz.userAnswers = new Array(this.quiz.currentQuestions.length).fill(null);
        this.renderQuiz();
        this.quiz.initialized = true;
        
        this.trackEvent('Quiz', 'Initialized');
    }

    getRandomQuestions(count) {
        const shuffled = [...this.quiz.questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    renderQuiz() {
        this.quiz.content.innerHTML = '';
        
        this.quiz.currentQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-container';
            questionElement.innerHTML = `
                <div class="question-text">${index + 1}. ${question.question}</div>
                <div class="options-container">
                    ${question.options.map((option, optionIndex) => `
                        <div class="option ${this.quiz.userAnswers[index] === optionIndex ? 'selected' : ''}" 
                             data-question="${index}" data-option="${optionIndex}"
                             role="radio" aria-checked="${this.quiz.userAnswers[index] === optionIndex}">
                            <input type="radio" id="q${index}o${optionIndex}" name="question${index}" value="${optionIndex}" 
                                   ${this.quiz.userAnswers[index] === optionIndex ? 'checked' : ''}>
                            <label for="q${index}o${optionIndex}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            this.quiz.content.appendChild(questionElement);
        });

        this.setupQuizOptionListeners();
    }

    setupQuizOptionListeners() {
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => {
                const questionIndex = parseInt(option.dataset.question);
                const optionIndex = parseInt(option.dataset.option);
                
                this.selectQuizOption(questionIndex, optionIndex);
            });

            // Keyboard navigation
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const questionIndex = parseInt(option.dataset.question);
                    const optionIndex = parseInt(option.dataset.option);
                    this.selectQuizOption(questionIndex, optionIndex);
                }
            });
        });
    }

    selectQuizOption(questionIndex, optionIndex) {
        // Remove selected class from all options in this question
        document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-checked', 'false');
        });
        
        // Add selected class to clicked option
        const selectedOption = document.querySelector(`.option[data-question="${questionIndex}"][data-option="${optionIndex}"]`);
        selectedOption.classList.add('selected');
        selectedOption.setAttribute('aria-checked', 'true');
        
        // Update user answers
        this.quiz.userAnswers[questionIndex] = optionIndex;
        
        // Update radio button
        const radio = selectedOption.querySelector('input');
        radio.checked = true;

        this.trackEvent('Quiz', 'Answer Selected', `Q${questionIndex + 1}`);
    }

    setupQuizEventListeners() {
        this.quiz.submitBtn.addEventListener('click', () => {
            this.handleQuizSubmission();
        });

        // Keyboard shortcut for quiz submission
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                this.handleQuizSubmission();
            }
        });
    }

    handleQuizSubmission() {
        const unanswered = this.quiz.userAnswers.filter(answer => answer === null).length;
        
        if (unanswered > 0) {
            this.showQuizAlert(`Please answer all ${unanswered} remaining question(s) before submitting.`);
            return;
        }
        
        this.showQuizResults();
        this.trackEvent('Quiz', 'Submitted', `${this.calculateScore()}/${this.quiz.currentQuestions.length}`);
    }

    showQuizAlert(message) {
        // Create a non-intrusive alert
        const alert = document.createElement('div');
        alert.className = 'quiz-alert';
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('show');
        }, 100);

        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 3000);
    }

    calculateScore() {
        return this.quiz.currentQuestions.reduce((score, question, index) => {
            return score + (this.quiz.userAnswers[index] === question.correct ? 1 : 0);
        }, 0);
    }

    showQuizResults() {
        const score = this.calculateScore();
        const totalQuestions = this.quiz.currentQuestions.length;
        const percentage = (score / totalQuestions) * 100;
        
        const { message, description } = this.getQuizResultMessage(percentage);
        
        this.quiz.content.innerHTML = `
            <div class="results-container">
                <h3>Quiz Complete!</h3>
                <div class="score-display">${score}/${totalQuestions}</div>
                <div class="score-percentage">${percentage}%</div>
                <div class="score-message">${message}</div>
                <div class="score-description">${description}</div>
                
                <div class="quiz-breakdown">
                    <h4>Question Breakdown:</h4>
                    ${this.quiz.currentQuestions.map((question, index) => `
                        <div class="question-result ${this.quiz.userAnswers[index] === question.correct ? 'correct' : 'incorrect'}">
                            <span class="result-icon">
                                ${this.quiz.userAnswers[index] === question.correct ? '✓' : '✗'}
                            </span>
                            <span class="result-text">${question.question}</span>
                            ${this.quiz.userAnswers[index] !== question.correct ? 
                                `<div class="correct-answer">Correct: ${question.options[question.correct]}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
                
                <button class="restart-btn" id="restart-quiz">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
        
        document.getElementById('restart-quiz').addEventListener('click', () => {
            this.initializeQuiz();
        });
    }

    getQuizResultMessage(percentage) {
        if (percentage >= 90) {
            return {
                message: 'Coffee Expert! ☕',
                description: 'You truly know your coffee! Your knowledge is impressive and barista-worthy.'
            };
        } else if (percentage >= 70) {
            return {
                message: 'Coffee Connoisseur!',
                description: 'Great job! You have solid coffee knowledge and a refined palate.'
            };
        } else if (percentage >= 50) {
            return {
                message: 'Coffee Enthusiast!',
                description: 'Good effort! You know the basics well and are on your coffee journey.'
            };
        } else {
            return {
                message: 'Coffee Novice',
                description: 'Keep learning! Coffee is a wonderful journey of discovery and taste.'
            };
        }
    }

    // Coffee Animation with enhanced interactions
    setupCoffeeAnimation() {
        this.coffeeAnimation = document.getElementById('coffeeAnimation');
        this.coffeeFill = document.getElementById('coffeeFill');
        this.closeAnimation = document.getElementById('closeAnimation');

        const coffeeElements = document.querySelectorAll('.coffee-cup, .coffee-steam, .skill-icon i.fa-coffee, .nav-logo');

        coffeeElements.forEach(element => {
            element.addEventListener('click', () => {
                this.showCoffeeAnimation();
            });
            
            // Add hover effect for desktop
            element.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    element.style.transform = 'scale(1.05)';
                    element.style.transition = 'transform 0.3s ease';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    element.style.transform = 'scale(1)';
                }
            });
        });

        this.closeAnimation.addEventListener('click', () => {
            this.hideCoffeeAnimation();
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.coffeeAnimation.style.display === 'flex') {
                this.hideCoffeeAnimation();
            }
        });

        // Close on background click
        this.coffeeAnimation.addEventListener('click', (e) => {
            if (e.target === this.coffeeAnimation) {
                this.hideCoffeeAnimation();
            }
        });
    }

    showCoffeeAnimation() {
        this.coffeeAnimation.style.display = 'flex';
        
        // Trigger animation after display
        setTimeout(() => {
            this.coffeeFill.style.height = '60px';
        }, 100);
        
        this.trackEvent('Animation', 'Coffee Animation', 'show');
    }

    hideCoffeeAnimation() {
        this.coffeeFill.style.height = '0';
        
        setTimeout(() => {
            this.coffeeAnimation.style.display = 'none';
        }, 500);
        
        this.trackEvent('Animation', 'Coffee Animation', 'hide');
    }

    // WhatsApp Integration with enhanced UX
    setupWhatsAppIntegration() {
        const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (!this.confirmWhatsAppAction()) {
                    e.preventDefault();
                } else {
                    this.trackEvent('Contact', 'WhatsApp Click');
                }
            });
        });
    }

    confirmWhatsAppAction() {
        return confirm('Open WhatsApp to contact Barista Nadjib? You can discuss coffee opportunities, training, or collaborations.');
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup error handling
        this.setupErrorHandling();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalResources() {
        // Preload critical images
        const criticalImages = ['Nadjib.jpg'];
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            this.trackEvent('Error', 'JavaScript Error', e.message);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.trackEvent('Error', 'Promise Rejection', e.reason);
        });
    }

    // Analytics and Tracking
    trackEvent(category, action, label = '') {
        // In a real application, this would integrate with Google Analytics
        console.log(`Event tracked: ${category} - ${action}${label ? ` - ${label}` : ''}`);
        
        // Example: Send to analytics service
        // gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        // });
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CoffeePortfolio();
    });
} else {
    new CoffeePortfolio();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoffeePortfolio;
}