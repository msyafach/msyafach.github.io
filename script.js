// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".section-title, .project-card, .skills-section, .contact-content",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Contact form handling
// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = "7633063242:AAHKGy4bb84_nS47v3bN0OQzzT_o0dqCmNo"
const TELEGRAM_CHAT_ID = "2142354455"

const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Prepare UI feedback
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Compose Telegram message in HTML format
  const telegramMessage = (
    `<b>New Contact Form Submission</b>\n\n` +
    `<b>Name:</b> ${name}\n` +
    `<b>Email:</b> ${email}\n` +
    `<b>Message:</b>\n${message}`
  ).trim()

  // Send message via Telegram Bot API
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
      parse_mode: "HTML",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        alert("Thank you for your message! I'll get back to you soon.")
        contactForm.reset()
      } else {
        console.error("Telegram API error:", data)
        alert("Sorry, there was an issue sending your message. Please try again later.")
      }
    })
    .catch((error) => {
      console.error("Network error:", error)
      alert("Network error occurred. Please check your connection and try again.")
    })
    .finally(() => {
      submitButton.textContent = originalText
      submitButton.disabled = false
    })
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent

    // Add a small delay before starting the typing effect
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50)
    }, 500)
  }
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Project Navigation and Showcase
const projectNavBtns = document.querySelectorAll(".project-nav-btn")
const projectSlides = document.querySelectorAll(".project-slide")

projectNavBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and slides
    projectNavBtns.forEach((b) => b.classList.remove("active"))
    projectSlides.forEach((s) => s.classList.remove("active"))

    // Add active class to clicked button and corresponding slide
    btn.classList.add("active")
    const targetProject = btn.getAttribute("data-project")
    const targetSlide = document.querySelector(`.project-slide[data-project="${targetProject}"]`)
    if (targetSlide) {
      targetSlide.classList.add("active")
    }
  })
})

// Project Modal Functionality
const modal = document.getElementById("project-modal")
const modalBody = document.getElementById("modal-body")
const modalClose = document.querySelector(".modal-close")

// Project data for modals
const projectData = [
  {
    title: "Data Entry and Audit System",
    description:
      "Advanced OCR-powered data processing system that revolutionizes document handling in audit processes.",
    fullDescription: `This comprehensive system leverages AWS Textract's advanced OCR capabilities to automatically process various document formats including PDFs, images, and scanned documents. The system features intelligent data validation, real-time error detection, and automated audit trail generation.

        The solution has been deployed in production environments where it processes thousands of documents daily, achieving a 99.5% accuracy rate while reducing manual data entry time by 80%. The system includes a RESTful API for seamless integration with existing audit workflows and supports batch processing for large document volumes.`,
    features: [
      "Intelligent document classification and routing",
      "Multi-language OCR support with 99.5% accuracy",
      "Real-time data validation and error correction",
      "Automated audit trail and compliance reporting",
      "RESTful API with comprehensive documentation",
      "Batch processing capabilities for high-volume operations",
      "Integration with popular audit software platforms",
      "Advanced security features including data encryption",
    ],
    technologies: [
      "AWS Textract",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Redis",
      "Celery",
      "JWT Authentication",
    ],
    metrics: {
      "Processing Speed": "500+ documents/hour",
      "Accuracy Rate": "99.5%",
      "Time Savings": "80% reduction",
      "Cost Reduction": "60% operational cost savings",
    },
    github: "#",
    demo: "#",
  },
  {
    title: "Graph Database for Audit",
    description: "Neo4j-powered graph database system for complex audit trail analysis and relationship mapping.",
    fullDescription: `This sophisticated graph database solution is designed specifically for financial audit processes, enabling auditors to visualize complex relationships between entities, transactions, and accounts. Built on Neo4j, the system provides powerful querying capabilities using Cypher and includes advanced fraud detection algorithms.

        The platform features an interactive visualization dashboard that allows auditors to explore data relationships intuitively. It includes automated pattern recognition for suspicious activities and generates comprehensive reports for compliance purposes.`,
    features: [
      "Complex relationship mapping and visualization",
      "Advanced Cypher query optimization for performance",
      "Real-time fraud detection with machine learning",
      "Interactive graph visualization dashboard",
      "Automated suspicious pattern alerts and notifications",
      "Comprehensive audit reporting and compliance tools",
      "Multi-dimensional data analysis capabilities",
      "Integration with existing audit management systems",
    ],
    technologies: ["Neo4j", "Cypher", "Python", "D3.js", "React", "GraphQL", "Node.js", "Machine Learning"],
    metrics: {
      "Query Performance": "Sub-second response times",
      "Data Relationships": "Millions of connected entities",
      "Fraud Detection": "95% accuracy rate",
      "Processing Volume": "10M+ transactions daily",
    },
    github: "#",
    demo: "#",
  },
  {
    title: "Sales Analytics Dashboard",
    description: "Comprehensive sales data analysis platform processing millions of transaction records.",
    fullDescription: `A powerful business intelligence platform that transforms raw sales data into actionable insights. The dashboard processes millions of transaction records in real-time, providing comprehensive analytics, predictive modeling, and strategic recommendations for sales optimization.

        The system features advanced data visualization, customer segmentation analysis, and predictive forecasting capabilities. It includes automated reporting, alert systems, and integration with popular CRM platforms.`,
    features: [
      "Real-time sales performance monitoring and KPI tracking",
      "Advanced predictive analytics and sales forecasting",
      "Customer segmentation and behavioral analysis",
      "Interactive data visualization with drill-down capabilities",
      "Automated reporting and intelligent alert systems",
      "Integration with CRM and ERP systems",
      "Mobile-responsive dashboard for on-the-go access",
      "Custom report generation and scheduling",
    ],
    technologies: ["Python", "SQL", "Pandas", "Plotly", "Streamlit", "PostgreSQL", "Apache Airflow", "Scikit-learn"],
    metrics: {
      "Data Processing": "10M+ records daily",
      "Report Generation": "Real-time updates",
      "Forecast Accuracy": "92% prediction accuracy",
      "User Adoption": "500+ active users",
    },
    github: "#",
    demo: "#",
  },
]

function openProjectModal(projectIndex) {
  const project = projectData[projectIndex]

  modalBody.innerHTML = `
        <div class="modal-project-header">
            <h2>${project.title}</h2>
            <p class="modal-project-description">${project.description}</p>
        </div>
        
        <div class="modal-project-content">
            <div class="modal-section">
                <h3>Project Overview</h3>
                <p>${project.fullDescription}</p>
            </div>
            
            <div class="modal-section">
                <h3>Key Features</h3>
                <ul class="modal-features-list">
                    ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3>Technology Stack</h3>
                <div class="modal-tech-grid">
                    ${project.technologies.map((tech) => `<span class="modal-tech-tag">${tech}</span>`).join("")}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Project Metrics</h3>
                <div class="modal-metrics-grid">
                    ${Object.entries(project.metrics)
                      .map(
                        ([key, value]) => `
                        <div class="metric-item">
                            <div class="metric-label">${key}</div>
                            <div class="metric-value">${value}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="${project.demo}" class="btn btn-primary">Live Demo</a>
                <a href="${project.github}" class="btn btn-secondary">View Code</a>
                <button class="btn btn-outline" onclick="closeProjectModal()">Close</button>
            </div>
        </div>
    `

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeProjectModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside of it
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeProjectModal()
  }
})

// Close modal with escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeProjectModal()
  }
})

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal)
}

// Skill tag interactions
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    tag.style.transform = "scale(0.95)"
    setTimeout(() => {
      tag.style.transform = "scale(1)"
    }, 150)
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Smooth reveal animations for sections
const revealSections = () => {
  const sections = document.querySelectorAll("section")
  const windowHeight = window.innerHeight

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const revealPoint = 150

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("revealed")
    }
  })
}

window.addEventListener("scroll", revealSections)
window.addEventListener("load", revealSections)

// Auto-rotate projects (optional)
let currentProject = 0
const autoRotateProjects = () => {
  setInterval(() => {
    currentProject = (currentProject + 1) % projectSlides.length
    projectNavBtns.forEach((btn) => btn.classList.remove("active"))
    projectSlides.forEach((slide) => slide.classList.remove("active"))

    projectNavBtns[currentProject].classList.add("active")
    projectSlides[currentProject].classList.add("active")
  }, 10000) // Change project every 10 seconds
}

// Uncomment the line below to enable auto-rotation
// autoRotateProjects();
