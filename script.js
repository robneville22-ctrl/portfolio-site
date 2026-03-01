// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal animations
function revealElements() {
    // Standard and directional reveals
    document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add('visible');
        }
    });

    // Hero headline line reveals
    document.querySelectorAll('.line-text:not(.visible)').forEach(line => {
        const headline = line.closest('.hero-headline');
        if (headline) {
            const rect = headline.getBoundingClientRect();
            if (rect.top < window.innerHeight - 30) {
                line.classList.add('visible');
            }
        }
    });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);
setTimeout(revealElements, 100);

// Subtle parallax on project previews
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
    function updateParallax() {
        const previews = document.querySelectorAll('.project-preview.visible');
        const viewportCenter = window.innerHeight / 2;
        previews.forEach(preview => {
            const rect = preview.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const offset = (elementCenter - viewportCenter) * 0.05;
            preview.style.transform = `translateY(${offset}px)`;
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    }, { passive: true });
}

// Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');
if (cursor && !prefersReducedMotion.matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth trailing effect
    function animateCursor() {
        // Move cursor toward mouse position (lerp)
        const speed = 0.2;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .nav-toggle, [data-cursor-hover]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}
