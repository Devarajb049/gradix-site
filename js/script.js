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

    function updateScrollProgress() {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScrollPos = window.scrollY;
        if (totalScrollHeight > 0 && scrollProgress) {
            const percentage = Math.min(100, Math.max(0, Math.round((currentScrollPos / totalScrollHeight) * 100)));
            scrollProgress.style.width = `${percentage}%`;
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    // ==========================================
    // 3. PREMIUM INTERACTIVE CURSOR & BLUEPRINT DEBUG PANEL & TEXT ROLL
    // ==========================================
    
    // Create custom cursor elements
    const cursorCircle = document.createElement('div');
    cursorCircle.classList.add('custom-cursor');
    const cursorText = document.createElement('span');
    cursorText.classList.add('custom-cursor-text');
    cursorText.textContent = '';
    cursorCircle.appendChild(cursorText);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    
    document.body.appendChild(cursorCircle);
    document.body.appendChild(cursorDot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let circX = mouseX;
    let circY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Cursor Lerp Easing Loop
    function updateCursor() {
        // Linear interpolation (lerp) for smooth tracking
        circX += (mouseX - circX) * 0.12; // Eased circles lag
        circY += (mouseY - circY) * 0.12;
        
        dotX += (mouseX - dotX) * 0.35;  // Responsive dot lag
        dotY += (mouseY - dotY) * 0.35;
        
        cursorCircle.style.left = `${circX}px`;
        cursorCircle.style.top = `${circY}px`;
        
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        // Debug Coordinates update
        const debugX = document.querySelector('[data-debug-x]');
        const debugY = document.querySelector('[data-debug-y]');
        if (debugX) debugX.textContent = Math.round(circX);
        if (debugY) debugY.textContent = Math.round(circY);
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Custom hover trigger text label binding
    const hoverSelectors = 'a, button, select, input, textarea, .why-card, .clever-panther-card, .splendid-firefox-card, [data-cursor-text]';
    
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursorCircle.classList.add('active');
            const hoverText = target.getAttribute('data-cursor-text') || 'view';
            cursorText.textContent = hoverText;
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursorCircle.classList.remove('active');
            cursorText.textContent = '';
        }
    });

    // Hide custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursorCircle.style.display = 'none';
        cursorDot.style.display = 'none';
    }

    // Live Tickers & Debug Updates (Time, Scroll Fraction)
    const debugScroll = document.querySelector('[data-debug-scroll]');
    const debugTime = document.querySelector('[data-debug-time]');
    
    // Elapsed Seconds Counter (60fps animation loop)
    const pageLoadTime = performance.now();
    function updateHUDTime() {
        if (debugTime) {
            const elapsed = (performance.now() - pageLoadTime) / 1000;
            debugTime.textContent = elapsed.toFixed(1) + 'S';
        }
        requestAnimationFrame(updateHUDTime);
    }
    requestAnimationFrame(updateHUDTime);

    function updateDebugStats() {
        if (debugScroll) {
            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScrollPos = window.scrollY;
            const percentage = totalScrollHeight > 0
    ? (currentScrollPos / totalScrollHeight) * 100
    : 0;

debugScroll.textContent =
    `${Math.round(percentage)}%`;
        }
    }
    window.addEventListener('scroll', updateDebugStats);
    updateDebugStats(); // Initial call

    // ==========================================
    // HUD HERO SCROLL & PARALLAX ANIMATIONS (Unified Double-Lerp System)
    // ==========================================
    const premiumHero = document.querySelector('#home-hero.premium-hero');
    const heroCenter = document.querySelector('.hero-center-content');
    const discs = document.querySelectorAll('.hero-disc');

    let targetScroll = 0;
    let currentScroll = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Normalize mouse coordinates (-1 to 1) relative to center of screen
    function updateHeroMouse(event) {
        if (!premiumHero) return;
        const rect = premiumHero.getBoundingClientRect();
        targetMouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetMouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function resetHeroMouse() {
        targetMouseX = 0;
        targetMouseY = 0;
    }

    if (premiumHero) {
        premiumHero.addEventListener('mousemove', updateHeroMouse, { passive: true });
        premiumHero.addEventListener('mouseleave', resetHeroMouse, { passive: true });
        premiumHero.addEventListener('pointermove', updateHeroMouse, { passive: true });
        premiumHero.addEventListener('pointerleave', resetHeroMouse, { passive: true });
    }

    // Scroll progress normalized from 0 (top) to 1 (scrolled past hero section)
    function updateTargetScroll() {
        if (!premiumHero) return;
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight || 800;
        targetScroll = Math.min(Math.max(scrollY / viewportHeight, 0), 1.25);
    }
    
    window.addEventListener('scroll', updateTargetScroll, { passive: true });
    window.addEventListener('resize', updateTargetScroll, { passive: true });
    updateTargetScroll(); // Initial computation

    // Core Animation Tick Loop
    function tickHeroAnimation() {
        if (!premiumHero) {
            requestAnimationFrame(tickHeroAnimation);
            return;
        }

        // double-lerping values for luxury inertia effect
        currentScroll += (targetScroll - currentScroll) * 0.08;
        currentMouseX += (targetMouseX - currentMouseX) * 0.08;
        currentMouseY += (targetMouseY - currentMouseY) * 0.08;

        // 1. Center Hero content scroll-fade, scale-down, and blur (starts at 90% scroll)
        if (heroCenter) {
            // Keep the text completely sharp for the first 90% of the scroll.
            // Then rapidly fade and blur it as the next section covers the viewport.
            const startScroll = 0.9;
            const transitionProgress = currentScroll < startScroll
                ? 0
                : Math.min((currentScroll - startScroll) / (1.15 - startScroll), 1);

            const opacity = Math.max(1 - transitionProgress * 1.3, 0);
            const scale = 1 - transitionProgress * 0.15;
            const blur = transitionProgress * 22;

            heroCenter.style.opacity = opacity;
            heroCenter.style.transform = `scale(${scale}) translate3d(0, 0, 0)`;
            heroCenter.style.filter = `blur(${blur}px)`;
        }

        // Viewport scale factor to ensure coordinates are responsive across screens
        // Bounded to a minimum of 0.4 so elements don't collapse too close to the text on mobile
        const screenScale = Math.max(Math.min(window.innerWidth / 1440, 1.0), 0.4);

        // Compute separate scale factors for X and Y coordinates to prevent off-screen clipping on narrow mobile devices
        let screenScaleX = screenScale;
        let screenScaleY = screenScale;

        if (window.innerWidth < 768) {
            screenScaleX = Math.max(Math.min(window.innerWidth / 1440, 1.0), 0.28);
            screenScaleY = Math.max(Math.min(window.innerHeight / 900, 1.0), 0.55);
        }

        // 2. Floating glassmorphism objects 3D explosion and parallax (starts at 50% scroll)
        const startDiscsScroll = 0.5;
        const discsProgress = currentScroll < startDiscsScroll
            ? 0
            : Math.min((currentScroll - startDiscsScroll) / (1.15 - startDiscsScroll), 1.25);

        discs.forEach((disc, idx) => {
            let baseX = parseFloat(disc.dataset.x) || 0;
            let baseY = parseFloat(disc.dataset.y) || 0;
            const z = parseFloat(disc.dataset.z) || 0.5;

            // Restructure baseline positions on mobile so all 6 chips frame the text without overlaps
            if (window.innerWidth < 640) {
                // Left Column Chips
                if (idx === 0) { baseX = -440; baseY = -220; }
                if (idx === 2) { baseX = -440; baseY = 0; }
                if (idx === 4) { baseX = -440; baseY = 220; }
                // Right Column Chips
                if (idx === 1) { baseX = 440; baseY = -220; }
                if (idx === 3) { baseX = 440; baseY = 0; }
                if (idx === 5) { baseX = 440; baseY = 220; }
            }

            // Responsive organic positioning using separate X and Y scales
            const responsiveBaseX = baseX * screenScaleX;
            const responsiveBaseY = baseY * screenScaleY;

            // Ease scroll progression for smooth explosion acceleration
            const scrollProgressScaled = Math.pow(discsProgress, 1.3);

            // Zoom expansion: closer objects fly outward and zoom past faster
            const scrollExpansion = 1 + (scrollProgressScaled / z) * 2.5;
            const scrollX = responsiveBaseX * scrollExpansion;
            const scrollY = responsiveBaseY * scrollExpansion;

            // Scale progressively based on scroll (camera flies through)
            const scaleFactor = 1 + (scrollProgressScaled / z) * 2.2;
            const baseScale = z > 0.6 ? 0.75 : (z > 0.4 ? 0.95 : 1.25);
            const scale = baseScale * scaleFactor;

            // Mouse Parallax: foreground items move more, background items move less
            const parallaxStrength = 42 * (1.5 - z);
            const parallaxX = currentMouseX * parallaxStrength * scale;
            const parallaxY = currentMouseY * parallaxStrength * scale;

            // Combined positioning
            const x = scrollX + parallaxX;
            const y = scrollY + parallaxY;

            // Opacity: fades out as elements pass the camera lens
            const opacity = Math.max(1 - scrollProgressScaled / z, 0);

            // Blur: Simulated depth-of-field focal blurring using quadratic ease
            const blurProgress = Math.pow(discsProgress, 1.8);
            const blur = (blurProgress / z) * 20;

            // Slight rotation during movement
            const rotateSpeed = (1.5 - z) * 35;
            const rotation = discsProgress * rotateSpeed;

            // Apply transformations with GPU hardware acceleration
            disc.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale}) rotate(${rotation}deg)`;
            disc.style.opacity = opacity;
            disc.style.filter = `blur(${blur}px)`;
        });

        requestAnimationFrame(tickHeroAnimation);
    }

    // Launch loop
    tickHeroAnimation();

    // Dynamic Text Roll Constructor
    const rollElements = document.querySelectorAll('.text-roll');
    rollElements.forEach(el => {
        const text = el.textContent.trim();
        if (text && !el.querySelector('.text-roll-row')) {
            el.innerHTML = '';
            el.setAttribute('aria-label', text);
            
            const row = document.createElement('span');
            row.className = 'text-roll-row';
            
            const clone = document.createElement('span');
            clone.className = 'text-roll-row text-roll-clone';
            clone.setAttribute('aria-hidden', 'true');
            
            [...text].forEach((char, idx) => {
                const span = document.createElement('span');
                span.className = 'text-roll-letter';
                span.style.setProperty('--i', idx);
                span.textContent = char === ' ' ? '\u00A0' : char;
                row.appendChild(span);
                
                const spanClone = span.cloneNode(true);
                clone.appendChild(spanClone);
            });
            
            el.appendChild(row);
            el.appendChild(clone);
        }
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
