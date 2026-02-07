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

// Reveal animations (standard + directional + hero lines)
function revealElements() {
    // Standard and directional reveals
    document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
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
revealElements();

// Subtle parallax on project screenshots
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
    function updateParallax() {
        const previews = document.querySelectorAll('.project-preview.visible');
        const viewportCenter = window.innerHeight / 2;
        previews.forEach(preview => {
            const rect = preview.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const offset = (elementCenter - viewportCenter) * 0.04;
            preview.style.transform = `translateY(${offset}px)`;
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    }, { passive: true });
}
