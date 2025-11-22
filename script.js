// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Enable custom cursor only if elements exist
if (cursorDot && cursorOutline) {
    document.body.classList.add('custom-cursor-enabled');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay (using animate for smoothness)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Canvas Particle Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2;
        this.directionY = (Math.random() * 0.4) - 0.2;
        this.size = Math.random() * 2;
        this.color = 'rgba(255, 255, 255, 0.1)';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// GSAP Animations

// Hero Animations
const heroTimeline = gsap.timeline();

heroTimeline
    .to('.hero-label', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.line', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
    .to('.hero-description', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

// Scroll Animations
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1, // Stagger effect
        ease: 'power3.out'
    });
});

// Vanilla Tilt Initialization
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    // Note: In a real production app, you'd want a better toggle class logic for animation
    // For this implementation, we'll keep it simple or add a class
    navMenu.classList.toggle('active');
});

// Project Modal Logic
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');

const projectDetails = [
    {
        title: "Murakabi Property",
        desc: "A modern real-estate landing page built with vanilla web technologies.",
        content: `
            <h3>Overview</h3>
            <p>This project was designed to showcase luxury properties with a focus on visual storytelling. The challenge was to create a high-performance landing page without heavy frameworks.</p>
            <h3>Tech Stack</h3>
            <div class="skill-tags" style="margin-top: 1rem;">
                <span>HTML5</span><span>CSS3</span><span>JavaScript</span>
            </div>
        `
    },
    {
        title: "Audit Graph DB",
        desc: "Neo4j-powered graph database solution for financial audit trails.",
        content: `
            <h3>Overview</h3>
            <p>A complex system designed to detect fraud patterns in financial transactions. By leveraging graph theory, we could identify circular transaction loops that traditional SQL databases missed.</p>
            <h3>Key Features</h3>
            <div class="skill-tags" style="margin-top: 1rem;">
                <span>Real-time fraud detection</span>
                <span>Interactive graph visualization</span>
                <span>Cypher query optimization</span>
            </div>
            <h3>Tech Stack</h3>
            <div class="skill-tags" style="margin-top: 1rem;">
                <span>Neo4j</span><span>Python</span><span>React</span><span>D3.js</span>
            </div>
        `
    },
    {
        title: "Sales Intelligence",
        desc: "BI platform processing millions of records for predictive analytics.",
        content: `
            <h3>Overview</h3>
            <p>This platform aggregates data from multiple sources to provide real-time insights into sales performance. It uses machine learning models to forecast future trends with 92% accuracy.</p>
            <h3>Impact</h3>
            <p>Helped the client identify underperforming regions and optimize their inventory distribution, resulting in a 15% revenue increase.</p>
            <h3>Tech Stack</h3>
            <div class="skill-tags" style="margin-top: 1rem;">
                <span>Python</span><span>PostgreSQL</span><span>Streamlit</span><span>Scikit-learn</span>
            </div>
        `
    }
];

window.openProjectModal = (index) => {
    const project = projectDetails[index];
    if (!project) return;

    modalContent.innerHTML = `
        <h2 class="section-title" style="font-size: 2rem; margin-bottom: 0.5rem;">${project.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">${project.desc}</p>
        <div class="modal-details">
            ${project.content}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    lenis.stop();
};

window.closeProjectModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    lenis.start();
};

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        window.closeProjectModal();
    }
});

// Contact Form Handling (Preserved from original)
const contactForm = document.getElementById("contact-form");
const TELEGRAM_BOT_TOKEN = "7633063242:AAHKGy4bb84_nS47v3bN0OQzzT_o0dqCmNo";
const TELEGRAM_CHAT_ID = "2142354455";

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = "<span>Sending...</span>";
        submitButton.disabled = true;

        const telegramMessage = (
            `<b>New Contact Form Submission</b>\n\n` +
            `<b>Name:</b> ${name}\n` +
            `<b>Email:</b> ${email}\n` +
            `<b>Message:</b>\n${message}`
        ).trim();

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: "HTML",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    alert("Thank you! I'll get back to you soon.");
                    contactForm.reset();
                } else {
                    alert("Error sending message. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Network error. Please try again.");
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
    });
}

// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function updateCarousel() {
        const cards = Array.from(track.children);
        if (cards.length === 0) return;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const moveAmount = cardWidth + gap;

        // Calculate visible cards based on container width
        const containerWidth = track.parentElement.getBoundingClientRect().width;
        const visibleCards = Math.round(containerWidth / moveAmount);
        const maxIndex = Math.max(0, cards.length - visibleCards);

        // Clamp index
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        // Move track
        track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

        // Update buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateCarousel, 100);
    });

    // Initial setup
    // Wait for layout to stabilize
    setTimeout(updateCarousel, 100);
});
