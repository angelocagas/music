// Dynamic year and age
const now = new Date();
document.getElementById("current-year").textContent = now.getFullYear();

const bday = new Date(2002, 3, 11); // April 11, 2002 (month is 0-indexed)
let age = now.getFullYear() - bday.getFullYear();
if (now < new Date(now.getFullYear(), 3, 11)) age--;
document.getElementById("my-age").textContent = age;

// Scroll-reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar glass
    navbar.classList.toggle('navbar-scrolled', scrollY > 60);

    // Back to top button
    mybutton.style.display = (scrollY > 20) ? 'block' : 'none';

    // Scrollspy
    const sectionNavMap = { 'fingerstyle': 'fingerstyle', 'electric-g': 'fingerstyle', 'about': 'about' };
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

mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
