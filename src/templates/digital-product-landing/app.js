// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // Account for sticky header
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle lead form submission
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const reminder = document.getElementById('reminder').value;
            
            // Here you would normally send this data to your backend
            console.log('Lead captured:', { email, reminder });
            
            // Show success message
            const modalBody = document.querySelector('#leadModal .modal-body');
            modalBody.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-check-circle fa-4x text-success mb-3"></i>
                    <h4>Thank You!</h4>
                    <p class="text-muted">We'll be in touch soon with more information.</p>
                    <button type="button" class="btn btn-primary mt-3" data-dismiss="modal">Close</button>
                </div>
            `;
            
            // Reset form and close modal after delay
            setTimeout(() => {
                $('#leadModal').modal('hide');
                // Reset modal content after it's hidden
                setTimeout(() => {
                    location.reload(); // Simple way to reset the modal
                }, 500);
            }, 3000);
        });
    }
    
    // Add scroll effect to header
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature cards and testimonial cards
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Exit intent modal trigger (optional)
    let exitIntentShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            // Only show if modal hasn't been shown before
            const modalShown = sessionStorage.getItem('leadModalShown');
            if (!modalShown) {
                $('#leadModal').modal('show');
                sessionStorage.setItem('leadModalShown', 'true');
            }
        }
    });
    
    // Add active state to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
    
    // Handle FAQ accordion chevron rotation
    const accordionButtons = document.querySelectorAll('.accordion .btn-link');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Reset all other chevrons
            accordionButtons.forEach(btn => {
                if (btn !== this) {
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    });
    
    // Add loading state to buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.hasAttribute('data-toggle')) {
                // Add loading state for demo
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="spinner-border spinner-border-sm mr-2"></span>Loading...';
                this.disabled = true;
                
                // Reset after 2 seconds (for demo)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Add number counter animation for stats (if you add stats section)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Console welcome message
    console.log('%c Welcome to DigiProduct! ', 'background: #B95486; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Built with ❤️ using modern web technologies', 'color: #9EC8DB; font-size: 14px;');
});