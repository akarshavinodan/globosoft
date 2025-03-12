const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        navLinks.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.dataset.to);
    const speed = parseInt(element.dataset.speed);
    const increment = target / speed * 10;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 10);
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.timer');
            if (counter) {
                animateCounter(counter);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.de_count').forEach(counter => {
    observer.observe(counter);
});