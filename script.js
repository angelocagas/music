// ── Dynamic year and age ──
const now = new Date();
document.getElementById("current-year").textContent = now.getFullYear();

const bday = new Date(2002, 3, 11);
let age = now.getFullYear() - bday.getFullYear();
if (now < new Date(now.getFullYear(), 3, 11)) age--;
document.getElementById("my-age").textContent = age;

// ── Scroll-reveal ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Elements ──
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('btn-back-to-top');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-links');

// ── Mobile nav toggle ──
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ── Scroll events ──
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar glass effect
    navbar.classList.toggle('navbar-scrolled', scrollY > 60);

    // Back to top visibility
    backToTop.style.display = (scrollY > 20) ? 'flex' : 'none';

    // Scrollspy
    const sectionNavMap = {
        'fingerstyle': 'fingerstyle',
        'electric-g': 'fingerstyle',
        'about': 'about'
    };
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 120) {
            current = sectionNavMap[section.getAttribute('id')] || '';
        }
    });
    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === current);
    });
});

// ── Back to top ──
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Carousel ──
const carousel = document.getElementById('fingerstyle-carousel');
if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });
}
