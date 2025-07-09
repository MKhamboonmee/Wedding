// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Enhanced smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Calculate the position to scroll to
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    
    // Smooth scroll
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Update URL without jumping
    history.pushState(null, null, targetId);
  });
});

// Photo Gallery Navigation
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const dotsContainer = document.querySelector('.gallery-dots');
  let currentIndex = 0;

  // Create dots
  galleryItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('gallery-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.gallery-dot');
  const galleryPrev = document.querySelector('.gallery-prev');
  const galleryNext = document.querySelector('.gallery-next');

  function updateGallery() {
    galleryItems.forEach((item, index) => {
      item.classList.toggle('active', index === currentIndex);
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    updateGallery();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Event listeners
  galleryPrev.addEventListener('click', prevSlide);
  galleryNext.addEventListener('click', nextSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Auto-advance (optional)
  // setInterval(nextSlide, 5000);
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);

// Create floating hearts
function createHearts(containerId, count = 15) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    
    // Random positioning
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';
    
    // Random animation duration and delay
    heart.style.animationDuration = Math.random() * 20 + 10 + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(heart);
  }
}

// Initialize floating hearts
createHearts('floatingHearts', 20);
createHearts('floatingHearts2', 15);

// Countdown timer to wedding date
const countdown = () => {
  const countDate = new Date("August 10, 2025 16:30:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  // Time calculations
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(gap / day);
  const hours = Math.floor((gap % day) / hour);
  const minutes = Math.floor((gap % hour) / minute);
  const seconds = Math.floor((gap % minute) / second);

  // Update the UI
  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
};

// Run countdown every 1 second
setInterval(countdown, 1000);
countdown(); // Initial call

// Add animation to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.detail-card, .story-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for animation
document.querySelectorAll('.detail-card, .story-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
