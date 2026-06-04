/**
 * GRADIX TECHNOLOGIES REDESIGN - PREMIUM ENTIRE SYSTEM SCRIPT
 * High-performance Vanilla JavaScript micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. PERSISTENT DARK MODE TOGGLE
    // ==========================================
    const html = document.documentElement;
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

    function updateToggleAria(isDark) {
        themeToggleBtns.forEach(btn => {
            btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        });
    }

    // Sync initial state of buttons
    updateToggleAria(html.classList.contains('dark'));

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleAria(isDark);
        });
    });



    // ==========================================
    // 2. SCROLL PROGRESS INDICATOR
    // ==========================================
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScrollPos = window.scrollY;
        if (totalScrollHeight > 0 && scrollProgress) {
            const percentage = (currentScrollPos / totalScrollHeight) * 100;
            scrollProgress.style.width = `${percentage}%`;
        }
    });

    // ==========================================
    // 3. CURSOR AMBIENT GLOW TRACKER
    // ==========================================
    const glowElement = document.createElement('div');
    glowElement.classList.add('cursor-glow-element');
    document.body.appendChild(glowElement);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor glow tracking with ease inertia (requestAnimationFrame)
    function updateGlowPosition() {
        // Linear interpolation (lerp) for smooth tracking
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        
        glowElement.style.left = `${glowX}px`;
        glowElement.style.top = `${glowY}px`;
        
        requestAnimationFrame(updateGlowPosition);
    }
    updateGlowPosition();

    // Hide glow on mobile devices or touch interfaces
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        glowElement.style.display = 'none';
    }

    // ==========================================
    // 4. MAGNETIC BUTTONS FORCE
    // ==========================================
    const magneticBtns = document.querySelectorAll('.btn-young-newt, .btn-young-newt-secondary');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate absolute distance between cursor and center of button
            const btnX = rect.left + rect.width / 2;
            const btnY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - btnX;
            const distanceY = e.clientY - btnY;
            
            // Pull factor
            const pullForce = 0.28;
            
            btn.style.transform = `translate3d(${distanceX * pullForce}px, ${distanceY * pullForce}px, 0)`;
            btn.style.boxShadow = `0 15px 35px -5px rgba(37, 99, 235, 0.5), ${distanceX * 0.1}px ${distanceY * 0.1}px 20px rgba(6, 182, 212, 0.3)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0px, 0px, 0px)';
            btn.style.boxShadow = '';
        });
    });

    // ==========================================
    // 5. STICKY NAVBAR & SCROLL SHADOW
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 6. MOBILE & DESKTOP HAMBURGER MENU DRAWER
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    
    // Dynamically inject backdrop overlay if missing
    let backdrop = document.getElementById('mobile-nav-overlay');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-nav-backdrop';
        backdrop.id = 'mobile-nav-overlay';
        document.body.appendChild(backdrop);
    }

    function toggleMobileMenu() {
        const isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
            hamburgerBtn.classList.remove('active');
            mobileNav.classList.remove('open');
            backdrop.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
        } else {
            hamburgerBtn.classList.add('active');
            mobileNav.classList.add('open');
            backdrop.classList.add('open');
            document.body.classList.add('overflow-hidden');
        }
    }

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // ==========================================
    // 7. ACTIVE NAVIGATION LINK INDICATOR
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    function highlightNavigation() {
        const currentPath = window.location.pathname;
        const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            const linkHref = link.getAttribute('href');
            
            // Highlight matching link file
            if (linkHref === pageName) {
                link.classList.add('active-link');
            }
        });
    }
    highlightNavigation();

    // ==========================================
    // 8. ANIMATED STATISTICS COUNTER ON SCROLL
    // ==========================================
    const statsSection = document.getElementById('statistics');
    const counterElements = document.querySelectorAll('.stat-counter');
    let countersAnimated = false;

    function runCountersAnimation() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // Animation duration in milliseconds
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // EaseOutQuad formula for luxury decel feel
                const easeProgress = progress * (2 - progress);
                const currentValue = Math.floor(easeProgress * target);
                
                counter.textContent = currentValue + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    if (statsSection && counterElements.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    runCountersAnimation();
                    countersAnimated = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.25
        });

        statsObserver.observe(statsSection);
    }

    // ==========================================
    // 9. TESTIMONIAL CAROUSEL SLIDER WITH DOTS
    // ==========================================
    const sliderTrack = document.querySelector('.white-catfish-track');
    const slides = document.querySelectorAll('.white-catfish-slide');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    let currentSlideIndex = 0;
    let autoSlideInterval;
    const slideCount = slides.length;

    // Dynamically set track and slide widths to ensure bulletproof positioning
    if (sliderTrack && slideCount > 0) {
        sliderTrack.style.width = `${slideCount * 100}%`;
        slides.forEach(slide => {
            slide.style.width = `${100 / slideCount}%`;
        });
    }

    function updateSlider() {
        if (!sliderTrack || slideCount === 0) return;
        
        // Translate relative to the dynamic track width
        sliderTrack.style.transform = `translateX(-${currentSlideIndex * (100 / slideCount)}%)`;

        // Update indicator dots active state
        dots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }

    function slideNext() {
        if (slides.length === 0) return;
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlider();
    }

    function slidePrev() {
        if (slides.length === 0) return;
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(slideNext, 6000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (prevBtn && nextBtn && sliderTrack) {
        prevBtn.addEventListener('click', () => {
            slidePrev();
            stopAutoSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            slideNext();
            stopAutoSlide();
            startAutoSlide();
        });

        // Dot navigation actions
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetIndex = parseInt(dot.getAttribute('data-slide'), 10);
                currentSlideIndex = targetIndex;
                updateSlider();
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Pause auto sliding on hover for accessibility
        const testimonialSection = document.getElementById('testimonials');
        if (testimonialSection) {
            testimonialSection.addEventListener('mouseenter', stopAutoSlide);
            testimonialSection.addEventListener('mouseleave', startAutoSlide);
        }

        // Initialize Slider
        updateSlider();
        startAutoSlide();
    }

    // ==========================================
    // 10. BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400 && backToTopBtn) {
            backToTopBtn.classList.add('visible');
        } else if (backToTopBtn) {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 11. CONTACT FORM PLACEHOLDER LOGIC
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;
            const phone = document.getElementById('user-phone').value;
            const service = document.getElementById('user-service').value;
            const message = document.getElementById('user-message').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            // High-end submission feedback animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending Message...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)'; // Emerald Green
                submitBtn.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                
                alert(`Thank you, ${name}! Your inquiry has been received. Our team will contact you shortly.`);
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                }, 3000);
                
            }, 1500);
        });
    }

    // ==========================================
    // 9B. AUTOMATED "HOW WE WORK" PROCESS TIMELINE
    // ==========================================
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const progressFiller = document.getElementById('timeline-progress-filler');
    let currentStepIndex = 0;
    let timelineInterval;
    let isTimelineHovered = false;

    function updateTimeline(index) {
        if (timelineSteps.length === 0) return;

        // Toggle active-step classes
        timelineSteps.forEach((step, i) => {
            if (i === index) {
                step.classList.add('active-step');
            } else {
                step.classList.remove('active-step');
            }
        });

        // Set filling width percentage dynamically for desktop
        if (progressFiller) {
            const percentage = (index / (timelineSteps.length - 1)) * 100;
            progressFiller.style.width = `${percentage}%`;
        }

        // Set filling height percentage dynamically for mobile
        const progressFillerMobile = document.getElementById('timeline-progress-filler-mobile');
        if (progressFillerMobile) {
            const percentage = (index / (timelineSteps.length - 1)) * 100;
            progressFillerMobile.style.height = `${percentage}%`;
        }
    }

    function startTimelineLoop() {
        timelineInterval = setInterval(() => {
            currentStepIndex = (currentStepIndex + 1) % timelineSteps.length;
            updateTimeline(currentStepIndex);
        }, 2000); // 2 seconds loop step (Faster and more dynamic)
    }

    if (timelineSteps.length > 0) {
        // Use IntersectionObserver to animate only when visible
        const processSection = document.getElementById('home-process');
        if (processSection) {
            const processObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        currentStepIndex = 0;
                        updateTimeline(currentStepIndex);
                        clearInterval(timelineInterval);
                        startTimelineLoop();
                    } else {
                        clearInterval(timelineInterval);
                    }
                });
            }, {
                threshold: 0.15
            });

            processObserver.observe(processSection);
        }
    }

    // ==========================================
    // 9C. GLASSMORPHIC POPUP CONTACT OVERLAY MODAL
    // ==========================================
    const contactModal = document.getElementById('contact-modal');
    const ctaMessageUs = document.getElementById('cta-message-us');
    const ctaGetQuote = document.getElementById('cta-get-quote');
    const ctaBookCall = document.getElementById('cta-book-call');
    const closeContactModal = document.getElementById('close-contact-modal');

    function openContactModal() {
        if (contactModal) {
            contactModal.classList.add('modal-active');
            document.body.classList.add('overflow-hidden');
        }
    }

    function closeContactModalFunc() {
        if (contactModal) {
            contactModal.classList.remove('modal-active');
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (ctaMessageUs) {
        ctaMessageUs.addEventListener('click', openContactModal);
    }

    if (ctaGetQuote) {
        ctaGetQuote.addEventListener('click', openContactModal);
    }

    if (ctaBookCall) {
        ctaBookCall.addEventListener('click', () => {
            // Pre-select AI Solutions or custom quote defaults
            const serviceSelect = document.getElementById('user-service');
            if (serviceSelect) {
                serviceSelect.value = 'AI Integrations';
            }
            openContactModal();
        });
    }

    if (closeContactModal) {
        closeContactModal.addEventListener('click', closeContactModalFunc);
    }

    if (contactModal) {
        // Close modal when backdrop clicked
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeContactModalFunc();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeContactModalFunc();
        }
    });

    // ==========================================
    // 9D. INTERACTIVE TIMELINE STEP POPUP MODAL (How We Work)
    // ==========================================
    const processModal = document.getElementById('process-modal');
    const closeProcessModal = document.getElementById('close-process-modal');
    
    const stepData = [
        {
            badge: '01',
            title: 'Discovery & Consultation',
            icon: 'fa-solid fa-magnifying-glass',
            desc: 'We understand your business goals, challenges, and requirements to ensure the right solution is planned from the beginning.',
            deliverables: [
                'Stakeholder Interviews & Alignments',
                'Detailed Requirement Documentation',
                'Technology Feasibility Studies',
                'Business Objective Mapping'
            ]
        },
        {
            badge: '02',
            title: 'Strategy & Planning',
            icon: 'fa-solid fa-chess-knight',
            desc: 'We design a clear roadmap including architecture, features, timelines, and technology choices for smooth execution.',
            deliverables: [
                'High-Level Architecture Design',
                'Wireframes & Interactive Prototypes',
                'Development Timeline & Milestones',
                'Infrastructure & Hosting Plan'
            ]
        },
        {
            badge: '03',
            title: 'Development & Execution',
            icon: 'fa-solid fa-laptop-code',
            desc: 'Our team builds and implements your solution using modern technologies with a strong focus on performance and security.',
            deliverables: [
                'High-Performance Frontend & Backend Coding',
                'Secure API Integrations & Cloud Deployment',
                'Comprehensive Unit & Integration Testing',
                'Regular Milestone Demos & Iterations'
            ]
        },
        {
            badge: '04',
            title: 'Launch, Support & Growth',
            icon: 'fa-solid fa-chart-line',
            desc: 'After launch, we provide continuous support, improvements, and optimizations to help your business scale confidently.',
            deliverables: [
                'Production Launch & Domain Setup',
                'Continuous Security & Performance Monitoring',
                'Post-Launch Optimization & Enhancements',
                'Growth Marketing & SEO Campaign Kickoff'
            ]
        }
    ];

    function openProcessModal(stepIndex) {
        if (!processModal || !stepData[stepIndex]) return;
        
        const data = stepData[stepIndex];
        
        // Pause automated timeline loop while modal is open
        clearInterval(timelineInterval);
        
        // Populate modal data dynamically
        document.getElementById('process-modal-badge').textContent = data.badge;
        document.getElementById('process-modal-title').textContent = data.title;
        document.getElementById('process-modal-desc').textContent = data.desc;
        
        // Icon swap
        const iconElem = document.getElementById('process-modal-icon');
        iconElem.className = `${data.icon} text-2xl`;
        
        // Deliverables list injection
        const deliverablesList = document.getElementById('process-modal-deliverables');
        deliverablesList.innerHTML = '';
        data.deliverables.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-3 group';
            li.innerHTML = `
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 group-hover:scale-125 transition-transform"></span>
                <span class="text-xs sm:text-sm font-semibold transition-colors">${item}</span>
            `;
            deliverablesList.appendChild(li);
        });
        
        // Show modal
        processModal.classList.add('modal-active');
        document.body.classList.add('overflow-hidden');
    }

    function closeProcessModalFunc() {
        if (!processModal) return;
        processModal.classList.remove('modal-active');
        document.body.classList.remove('overflow-hidden');
        
        // Restart automated timeline progression loop
        clearInterval(timelineInterval);
        startTimelineLoop();
    }

    if (timelineSteps.length > 0) {
        timelineSteps.forEach((step, idx) => {
            // Click triggers modal display and pauses autoplay
            step.addEventListener('click', () => {
                currentStepIndex = idx;
                updateTimeline(currentStepIndex);
                openProcessModal(idx);
            });
        });
    }

    if (closeProcessModal) {
        closeProcessModal.addEventListener('click', closeProcessModalFunc);
    }

    if (processModal) {
        processModal.addEventListener('click', (e) => {
            if (e.target === processModal) {
                closeProcessModalFunc();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && processModal && processModal.classList.contains('modal-active')) {
            closeProcessModalFunc();
        }
    });

    // ==========================================
    // 12. SCROLLSPY FOR LEGAL PAGES
    // ==========================================
    const legalNavLinks = document.querySelectorAll('aside nav a');
    const legalSections = document.querySelectorAll('.prose [id]');
    const scrollContainer = document.getElementById('legal-content-scroll');
    
    if (legalNavLinks.length > 0 && legalSections.length > 0) {
        const activeSections = new Set();
        let isScrollingToBottom = false;

        const spyObserver = new IntersectionObserver((entries) => {
            // Ignore updates if we are locked to the bottom of the page
            if (isScrollingToBottom) return;

            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                if (entry.isIntersecting) {
                    activeSections.add(id);
                } else {
                    activeSections.delete(id);
                }
            });
            
            if (activeSections.size > 0) {
                // Find the topmost intersecting section in document order
                let activeId = null;
                for (const section of legalSections) {
                    const id = section.getAttribute('id');
                    if (activeSections.has(id)) {
                        activeId = id;
                        break;
                    }
                }
                
                if (activeId) {
                    highlightSidebarLink(activeId);
                }
            }
        }, {
            root: scrollContainer || null,
            rootMargin: '-10% 0px -55% 0px',
            threshold: 0
        });

        legalSections.forEach(section => {
            spyObserver.observe(section);
        });

        // Special case fallback: scroll to bottom highlights the very last item (Contact Us)
        const scrollTarget = scrollContainer || window;
        scrollTarget.addEventListener('scroll', () => {
            let isBottom = false;
            if (scrollContainer) {
                isBottom = (scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight - 25;
            } else {
                isBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60;
            }

            if (isBottom) {
                isScrollingToBottom = true;
                const lastSection = legalSections[legalSections.length - 1];
                if (lastSection) {
                    highlightSidebarLink(lastSection.getAttribute('id'));
                }
            } else {
                isScrollingToBottom = false;
            }
        });

        // Intercept sidebar link clicks to smoothly scroll within the container
        legalNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetHref = link.getAttribute('href');
                if (!targetHref.startsWith('#')) return;
                
                const targetId = targetHref.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement && scrollContainer) {
                    e.preventDefault();
                    
                    const containerTop = scrollContainer.getBoundingClientRect().top;
                    const elementTop = targetElement.getBoundingClientRect().top;
                    const relativeTop = elementTop - containerTop + scrollContainer.scrollTop;
                    
                    scrollContainer.scrollTo({
                        top: relativeTop - 12, // Subtle top margin padding
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without causing a page jump
                    history.pushState(null, null, `#${targetId}`);
                    highlightSidebarLink(targetId);
                }
            });
        });

        function highlightSidebarLink(id) {
            legalNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                const icon = link.querySelector('i');
                
                if (href === `#${id}`) {
                    // Active state transitions
                    link.classList.add('text-primary', 'font-bold', 'translate-x-2');
                    link.classList.remove('text-textBody', 'dark:text-slate-400');
                    if (icon) {
                        icon.classList.remove('opacity-0');
                        icon.classList.add('opacity-100');
                    }
                } else {
                    // Inactive state transitions
                    link.classList.remove('text-primary', 'font-bold', 'translate-x-2');
                    link.classList.add('text-textBody', 'dark:text-slate-400');
                    if (icon) {
                        icon.classList.remove('opacity-100');
                        icon.classList.add('opacity-0');
                    }
                }
            });
        }
    }

    // ==========================================
    // 13. INITIALIZE AOS (Animate On Scroll)
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120
        });
    }
});
