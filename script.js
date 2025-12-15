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
        this.setupPerformanceOptimizations();
    }

    // Preloader with enhanced UX
    setupPreloader() {
        const preloader = document.getElementById('preloader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Fallback
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 3000);
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('.theme-text');
        const body = document.body;

        const getPreferredTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;

            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

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

        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });

        // System theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Navigation
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

            // Prevent body scroll
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
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

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Sticky header
        this.setupStickyHeader();
    }

    setupStickyHeader() {
        const header = document.getElementById('header');
        let ticking = false;

        const updateHeader = () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = 'var(--shadow-lg)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
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

    // Smooth scrolling
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
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                history.pushState(null, null, href);
            });
        });
    }

    // Animations
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
                    
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 300);
                    
                    observer.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.section, .skill-item, .timeline-item, .gallery-item, .video-item, .contact-item, .stat');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Coffee Quiz - SIMPLIFIED to match CSS
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
            }
        ];
    }

    initializeQuiz() {
        this.quiz.currentQuestions = this.getCoffeeQuestions(); // Fixed 5 questions
        this.quiz.userAnswers = new Array(this.quiz.currentQuestions.length).fill(null);
        this.renderQuiz();
        this.quiz.initialized = true;
    }

    renderQuiz() {
        this.quiz.content.innerHTML = '';
        
        this.quiz.currentQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-container';
            questionElement.style.marginBottom = '20px';
            questionElement.style.paddingBottom = '15px';
            questionElement.style.borderBottom = '1px solid rgba(139, 69, 19, 0.1)';
            
            questionElement.innerHTML = `
                <div class="question-text" style="font-weight: 500; margin-bottom: 10px; color: var(--text-color);">
                    ${index + 1}. ${question.question}
                </div>
                <div class="options-container" style="display: flex; flex-direction: column; gap: 8px;">
                    ${question.options.map((option, optionIndex) => `
                        <label style="display: flex; align-items: center; padding: 8px 10px; 
                               background: rgba(255,255,255,0.7); border-radius: 8px; cursor: pointer;
                               transition: all 0.2s ease; border: 2px solid transparent;">
                            <input type="radio" name="question${index}" value="${optionIndex}" 
                                   style="margin-right: 10px; transform: scale(1.2); accent-color: var(--primary-color);">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
            this.quiz.content.appendChild(questionElement);
        });

        this.setupQuizOptionListeners();
    }

    setupQuizOptionListeners() {
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const name = e.target.name;
                const value = parseInt(e.target.value);
                const questionIndex = parseInt(name.replace('question', ''));
                
                this.quiz.userAnswers[questionIndex] = value;
                
                // Visual feedback
                const labels = document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    const label = r.parentElement;
                    if (r.checked) {
                        label.style.borderColor = 'var(--primary-color)';
                        label.style.background = 'rgba(139, 69, 19, 0.1)';
                    } else {
                        label.style.borderColor = 'transparent';
                        label.style.background = 'rgba(255,255,255,0.7)';
                    }
                });
            });
        });
    }

    setupQuizEventListeners() {
        this.quiz.submitBtn.addEventListener('click', () => {
            this.handleQuizSubmission();
        });
    }

    handleQuizSubmission() {
        const unanswered = this.quiz.userAnswers.filter(answer => answer === null).length;
        
        if (unanswered > 0) {
            alert(`Please answer all ${unanswered} remaining question(s) before submitting.`);
            return;
        }
        
        this.showQuizResults();
    }

    calculateScore() {
        return this.quiz.currentQuestions.reduce((score, question, index) => {
            return score + (this.quiz.userAnswers[index] === question.correct ? 1 : 0);
        }, 0);
    }

    showQuizResults() {
        const score = this.calculateScore();
        const totalQuestions = this.quiz.currentQuestions.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        
        let message = '';
        if (percentage >= 90) message = 'Coffee Expert! ☕';
        else if (percentage >= 70) message = 'Coffee Connoisseur!';
        else if (percentage >= 50) message = 'Coffee Enthusiast!';
        else message = 'Coffee Novice';
        
        this.quiz.content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">Quiz Complete!</h3>
                <div style="font-size: 3rem; font-weight: 700; color: var(--primary-color); margin: 20px 0;">
                    ${score}/${totalQuestions}
                </div>
                <div style="font-size: 2rem; color: var(--accent-color); margin-bottom: 15px;">
                    ${percentage}%
                </div>
                <div style="font-size: 1.2rem; margin-bottom: 20px; color: var(--text-color); font-weight: 500;">
                    ${message}
                </div>
                <div style="color: var(--text-color); opacity: 0.8; margin-bottom: 30px; line-height: 1.6;">
                    ${percentage >= 70 ? 'Great job! You know your coffee well.' : 
                      'Keep learning about coffee - it\'s a wonderful journey!'}
                </div>
                
                <div style="margin: 30px 0; text-align: left;">
                    <h4 style="color: var(--primary-color); margin-bottom: 15px;">Your Answers:</h4>
                    ${this.quiz.currentQuestions.map((question, index) => `
                        <div style="margin-bottom: 10px; padding: 10px; 
                             background: ${this.quiz.userAnswers[index] === question.correct ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)'};
                             border-radius: 8px; border-left: 4px solid ${this.quiz.userAnswers[index] === question.correct ? '#27ae60' : '#e74c3c'};">
                            <div style="font-weight: 500; margin-bottom: 5px;">
                                ${index + 1}. ${question.question}
                            </div>
                            <div style="font-size: 0.9em; opacity: 0.8;">
                                You selected: ${question.options[this.quiz.userAnswers[index]]}
                                ${this.quiz.userAnswers[index] !== question.correct ? 
                                  `<br>Correct answer: ${question.options[question.correct]}` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <button id="restart-quiz" style="
                    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                    color: white; border: none; padding: 12px 30px; border-radius: 30px;
                    font-size: 1rem; font-weight: 500; cursor: pointer;
                    transition: all 0.3s ease; box-shadow: var(--shadow-md);">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
        
        document.getElementById('restart-quiz').addEventListener('click', () => {
            this.initializeQuiz();
        });
    }

    // Coffee Animation
    setupCoffeeAnimation() {
        this.coffeeAnimation = document.getElementById('coffeeAnimation');
        this.coffeeFill = document.getElementById('coffeeFill');
        this.closeAnimation = document.getElementById('closeAnimation');

        const coffeeElements = document.querySelectorAll('.coffee-cup, .coffee-steam');

        coffeeElements.forEach(element => {
            element.addEventListener('click', () => {
                this.showCoffeeAnimation();
            });
        });

        this.closeAnimation.addEventListener('click', () => {
            this.hideCoffeeAnimation();
        });

        // Close on ESC
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
        setTimeout(() => {
            this.coffeeFill.style.height = '60px';
        }, 100);
    }

    hideCoffeeAnimation() {
        this.coffeeFill.style.height = '0';
        setTimeout(() => {
            this.coffeeAnimation.style.display = 'none';
        }, 500);
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        this.setupLazyLoading();
        this.setupErrorHandling();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Error:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rejection:', e.reason);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CoffeePortfolio();
});