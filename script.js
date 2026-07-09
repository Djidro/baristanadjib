// Coffee Portfolio - Professional JavaScript
class CoffeePortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupCurtainIntro();
        this.setupCustomCursor();
        this.setupParticles();
        this.setupParallax();
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupQuiz();
        this.setupCoffeeAnimation();
        this.setupErrorHandling();
    }

    // Whether the visitor's device/browser wants reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

        // Fallback in case 'load' never fires
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 3000);
    }

    // Page-load curtain reveal: two panels slide away right after the preloader hides
    setupCurtainIntro() {
        const curtainLeft = document.getElementById('curtainLeft');
        const curtainRight = document.getElementById('curtainRight');
        if (!curtainLeft || !curtainRight) return;

        if (this.prefersReducedMotion()) {
            curtainLeft.style.display = 'none';
            curtainRight.style.display = 'none';
            return;
        }

        const revealSite = () => {
            curtainLeft.classList.add('slide-left');
            curtainRight.classList.add('slide-right');
            setTimeout(() => {
                curtainLeft.style.display = 'none';
                curtainRight.style.display = 'none';
            }, 1000);
        };

        // Preloader hides ~1500ms after 'load'; slide curtains right after that
        window.addEventListener('load', () => {
            setTimeout(revealSite, 1500);
        });

        // Fallback in case 'load' is delayed
        setTimeout(revealSite, 3500);
    }

    // Custom animated cursor (desktop / fine-pointer devices only)
    setupCustomCursor() {
        const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!isFinePointer || this.prefersReducedMotion()) return;

        const dot = document.getElementById('cursorDot');
        const ring = document.getElementById('cursorRing');
        if (!dot || !ring) return;

        let ringX = window.innerWidth / 2;
        let ringY = window.innerHeight / 2;
        let targetX = ringX;
        let targetY = ringY;

        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        });

        // Smoothly trail the ring behind the dot
        const animateRing = () => {
            ringX += (targetX - ringX) * 0.18;
            ringY += (targetY - ringY) * 0.18;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            requestAnimationFrame(animateRing);
        };
        requestAnimationFrame(animateRing);

        // Grow the ring over interactive elements
        const interactiveSelector = 'a, button, .btn, input, label, .gallery-item, .skill-item';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveSelector)) {
                ring.classList.add('hovering');
                dot.classList.add('hovering');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveSelector)) {
                ring.classList.remove('hovering');
                dot.classList.remove('hovering');
            }
        });

        document.addEventListener('mouseleave', () => {
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            dot.style.opacity = '1';
            ring.style.opacity = '0.55';
        });
    }

    // Floating coffee bean / steam particles drifting up the page
    setupParticles() {
        const container = document.getElementById('particlesContainer');
        if (!container || this.prefersReducedMotion()) return;

        const spawnParticle = () => {
            const isBean = Math.random() > 0.45;
            const particle = document.createElement('div');
            particle.className = isBean ? 'particle-bean' : 'particle-steam';

            const left = Math.random() * 100;
            const duration = isBean ? 9 + Math.random() * 6 : 7 + Math.random() * 5;
            const size = isBean ? 0.8 + Math.random() * 0.8 : 0.7 + Math.random() * 1;

            particle.style.left = `${left}vw`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.transform = `scale(${size})`;

            container.appendChild(particle);

            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        };

        // Keep a gentle, continuous stream of particles
        for (let i = 0; i < 4; i++) {
            setTimeout(spawnParticle, i * 800);
        }
        this.particleInterval = setInterval(spawnParticle, 1400);
    }

    // Subtle parallax drift for elements tagged with data-parallax="<speed>"
    setupParallax() {
        const parallaxEls = document.querySelectorAll('[data-parallax]');
        if (!parallaxEls.length || this.prefersReducedMotion()) return;

        let ticking = false;
        const update = () => {
            const scrollY = window.scrollY;
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.2;
                el.style.transform = `translateY(${scrollY * speed * -1}px)`;
            });
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
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

        // React to system theme changes if user hasn't manually chosen
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

            // Prevent body scroll while menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
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

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        this.setupStickyHeader();
    }

    setupStickyHeader() {
        const header = document.getElementById('header');
        let ticking = false;

        const updateHeader = () => {
            header.style.boxShadow = window.scrollY > 100 ? 'var(--shadow-lg)' : 'var(--shadow-sm)';
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

    // Smooth scrolling for in-page anchor links
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

    // Motion: skill bars + scroll reveal
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

        skillBars.forEach(bar => observer.observe(bar));
    }

    setupScrollReveal() {
        // Give each section (after the hero) an alternating slide/zoom entrance
        const sections = document.querySelectorAll('main > .section');
        const directions = ['reveal-left', 'reveal-right', 'reveal-zoom'];
        let directionIndex = 0;

        sections.forEach(section => {
            if (section.id === 'home') {
                // Hero is visible immediately, no scroll-triggered entrance needed
                section.classList.add('visible');
                return;
            }
            section.classList.add(directions[directionIndex % directions.length]);
            directionIndex++;
        });

        const cardElements = document.querySelectorAll(
            '.skill-item, .timeline-item, .gallery-item, .video-item, .contact-item, .stat'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        sections.forEach(section => {
            if (section.id !== 'home') observer.observe(section);
        });
        cardElements.forEach(element => observer.observe(element));
    }

    // Coffee Quiz
    setupQuiz() {
        this.quiz = {
            content: document.getElementById('quiz-content'),
            submitBtn: document.getElementById('submit-quiz'),
            allQuestions: this.getCoffeeQuestions(),
            currentQuestions: [],
            userAnswers: [],
            questionsPerRound: 5
        };

        this.initializeQuiz();
        this.setupQuizEventListeners();
    }

    // A larger question bank lets each round feel fresh
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
            },
            {
                question: "Which coffee bean species is considered higher quality: Arabica or Robusta?",
                options: ["Robusta", "Arabica", "They're identical", "Neither is a real species"],
                correct: 1
            },
            {
                question: "What is a 'ristretto'?",
                options: ["A long, watered-down shot", "A short, concentrated shot", "A cold brew method", "A type of milk foam"],
                correct: 1
            },
            {
                question: "What temperature should milk be steamed to for the best microfoam texture?",
                options: ["30-40°C", "55-65°C", "80-90°C", "95-100°C"],
                correct: 1
            },
            {
                question: "Which of these is NOT a common latte art pattern?",
                options: ["Rosetta", "Heart", "Tulip", "Nebula"],
                correct: 3
            },
            {
                question: "What does 'single origin' mean on a coffee bag?",
                options: [
                    "The coffee is decaffeinated",
                    "The beans come from one specific place, not a blend",
                    "The coffee was roasted once",
                    "The coffee is instant"
                ],
                correct: 1
            }
        ];
    }

    // Fisher-Yates shuffle
    shuffleArray(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    initializeQuiz() {
        const count = Math.min(this.quiz.questionsPerRound, this.quiz.allQuestions.length);
        this.quiz.currentQuestions = this.shuffleArray(this.quiz.allQuestions).slice(0, count);
        this.quiz.userAnswers = new Array(this.quiz.currentQuestions.length).fill(null);
        this.renderQuiz();
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
                               border: 2px solid transparent;">
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
        this.quiz.content.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const name = e.target.name;
                const value = parseInt(e.target.value, 10);
                const questionIndex = parseInt(name.replace('question', ''), 10);

                this.quiz.userAnswers[questionIndex] = value;

                // Visual feedback for the selected option in this question group
                this.quiz.content.querySelectorAll(`input[name="${name}"]`).forEach(r => {
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

    // Coffee-cup click animation (decorative)
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
