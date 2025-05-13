document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-dot');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let speed = 0.5;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .navbar-links li, .cta-button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Animate cursor
    function animate() {
        // Calculate smooth movement
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        // Apply position
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

        requestAnimationFrame(animate);
    }

    animate();

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Show default cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        document.body.style.cursor = 'auto';
    });

    // Show custom cursor when entering the window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        document.body.style.cursor = 'none';
    });

    // Image scroll effect
    const initialImage = document.querySelector('.hero-image.initial');
    const scrolledImages = document.querySelector('.scrolled-images');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const triggerPoint = 300; // Adjust this value to change when the transition happens

        if (scrollPosition > triggerPoint) {
            initialImage.classList.add('hidden');
            scrolledImages.classList.add('visible');
        } else {
            initialImage.classList.remove('hidden');
            scrolledImages.classList.remove('visible');
        }
    });

    const brochureButton = document.querySelector('.brochure-button');
const dropdownContainer = document.querySelector('.dropdown-container');

const pdfFiles = [
    { name: 'brochure1.pdf', displayName: 'Height Master' },
    { name: 'brochure2.pdf', displayName: 'Multi-Sensor Precision Checking System' },
    { name: 'brochure3.pdf', displayName: '3 Axis-Tool Checking System' },
    { name: 'brochure4.pdf', displayName: 'True Resolution 5-Axis System' }
];

brochureButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const isVisible = dropdownContainer.style.display === 'block';
    dropdownContainer.style.display = isVisible ? 'none' : 'block';

    // Prevent re-adding buttons
    if (dropdownContainer.children.length === 0) {
        pdfFiles.forEach(pdf => {
            const btn = document.createElement('button');
            btn.textContent = pdf.displayName;

            btn.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = pdf.name;
                link.download = pdf.displayName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                dropdownContainer.style.display = 'none'; // optional: close after click
            });

            dropdownContainer.appendChild(btn);
        });
    }
});

// Optional: close dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (!dropdownContainer.contains(e.target) && !brochureButton.contains(e.target)) {
        dropdownContainer.style.display = 'none';
    }
});


    // Scroll Animation Observer
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optionally unobserve after animating once
                // observer.unobserve(entry.target);
            } else {
                // Optionally remove class to re-animate on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const targets = document.querySelectorAll('.animate-on-scroll, .stagger-children');
    targets.forEach(target => observer.observe(target));

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionButton.addEventListener('click', () => {
            const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

            // Close all other items (optional: remove if you want multiple open)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
            //         otherItem.querySelector('.faq-answer').style.paddingTop = null; // Reset padding if needed by your CSS
            //         otherItem.querySelector('.faq-answer').style.paddingBottom = null; 

            //     }
            // });

            // Toggle the clicked item
            questionButton.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                // Calculate the height needed for the content
                answer.style.maxHeight = answer.scrollHeight + "px";
                // Add padding if necessary based on your CSS for the transition
                // answer.style.paddingTop = "16px"; // Example
                // answer.style.paddingBottom = "24px"; // Example
            } else {
                answer.style.maxHeight = null;
                // Reset padding if needed
                // answer.style.paddingTop = null;
                // answer.style.paddingBottom = null;
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Adjust to 'center' or 'end' if needed
                });
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburgerButton = document.getElementById('hamburgerButton');
    const navbarLinks = document.getElementById('navbarLinks');
    const body = document.body;

    if (hamburgerButton && navbarLinks) {
        hamburgerButton.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('is-active');
            navbarLinks.classList.toggle('is-active');
            body.classList.toggle('menu-active');

            // Add transition delay to each menu item
            const menuItems = navbarLinks.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                if (navbarLinks.classList.contains('is-active')) {
                    item.style.transitionDelay = `${index * 0.1}s`;
                } else {
                    item.style.transitionDelay = '0s';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarLinks.contains(event.target) && !hamburgerButton.contains(event.target)) {
                hamburgerButton.classList.remove('is-active');
                navbarLinks.classList.remove('is-active');
                body.classList.remove('menu-active');

                // Reset transition delays
                const menuItems = navbarLinks.querySelectorAll('li');
                menuItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                });
            }
        });

        // Close menu when clicking on a link
        const navLinks = navbarLinks.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerButton.classList.remove('is-active');
                navbarLinks.classList.remove('is-active');
                body.classList.remove('menu-active');

                // Reset transition delays
                const menuItems = navbarLinks.querySelectorAll('li');
                menuItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                });
            });
        });
    }
});
