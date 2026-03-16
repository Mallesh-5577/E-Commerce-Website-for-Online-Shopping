document.addEventListener("DOMContentLoaded", () => {

    // 1. Dynamic Active Navbar Links based on current URL
    const currentLocation = location.href;
    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');

    let foundActive = false;

    navLinks.forEach((link, index) => {
        // Reset active state
        if (navItems[index]) {
            navItems[index].classList.remove('active');
        }

        // Match link with current path
        const href = link.getAttribute('href');
        if (href && href !== '#' && currentLocation.includes(href)) {
            navItems[index].classList.add('active');
            foundActive = true;
        }
    });

    // Default to 'Home' if no matches found (e.g., directly landing on root folder)
    if (!foundActive && navItems.length > 0) {
        navItems[0].classList.add('active');
    }

    // 2. Back to Top Button smoother logic
    const backToTopBtn = document.querySelector('.backtop');
    if (backToTopBtn) {
        // Initial state logic
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.visibility = "hidden";
        backToTopBtn.style.transition = "opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease";
        backToTopBtn.style.transform = "translateY(20px)";

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = "1";
                backToTopBtn.style.visibility = "visible";
                backToTopBtn.style.transform = "translateY(0)";
            } else {
                backToTopBtn.style.opacity = "0";
                backToTopBtn.style.visibility = "hidden";
                backToTopBtn.style.transform = "translateY(20px)";
            }
        });

        const link = backToTopBtn.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // 3. Simple Form Validation Enhancements
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Can capture checkout/contact details here before submission if needed
            // e.preventDefault();
            console.log("Form validated & submitted!");
        });
    });

    // 4. Reveal Micro-Animations on Scroll (Premium Feel)
    // Select elements like product cards, features, or sections that should reveal on scroll
    const revealElements = document.querySelectorAll('.single_product, .feature .col-md-4 > div, .shop_by_category .card, .about_text, .testimonial');

    // Set initial custom state for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealThreshold = 80;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealThreshold) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Trigger reveal logic on scroll and once on load
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
