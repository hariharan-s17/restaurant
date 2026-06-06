/* ============================================
   SAFFRON & SILK — MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // PRELOADER
  // ==========================================
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Trigger hero animations
    triggerHeroSlideAnim();
  }, 2000);
  document.body.style.overflow = 'hidden';

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX - 4 + 'px';
    cursorDot.style.top = mouseY - 4 + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX - 18 + 'px';
    cursorRing.style.top = ringY - 18 + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale cursor on hover
  document.querySelectorAll('a, button, .cuisine-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'scale(2)';
      cursorRing.style.transform = 'scale(1.6)';
      cursorRing.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'scale(1)';
      cursorRing.style.transform = 'scale(1)';
      cursorRing.style.opacity = '0.6';
    });
  });

  // ==========================================
  // NAVIGATION — SCROLL BEHAVIOR
  // ==========================================
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Smooth nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  });

  // ==========================================
  // MOBILE MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Hamburger animation
  const style = document.createElement('style');
  style.textContent = `
    .nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
    .nav-hamburger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }
  `;
  document.head.appendChild(style);

  // ==========================================
  // HERO SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    triggerHeroSlideAnim();
  }

  function triggerHeroSlideAnim() {
    const activeSlide = document.querySelector('.hero-slide.active');
    if (!activeSlide) return;
    const elements = activeSlide.querySelectorAll('.slide-tag, .slide-title, .slide-sub, .btn-primary');
    elements.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = '';
    });
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5500);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  document.getElementById('slideNext').addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    resetAutoSlide();
  });

  document.getElementById('slidePrev').addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    resetAutoSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoSlide();
    });
  });

  startAutoSlide();

  // ==========================================
  // MENU TABS
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuPanels = document.querySelectorAll('.menu-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      menuPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + tab);
      panel.classList.add('active');
      // Re-trigger menu item animations
      panel.querySelectorAll('.menu-item').forEach((item, i) => {
        item.classList.remove('visible');
        setTimeout(() => item.classList.add('visible'), i * 100 + 50);
      });
    });
  });

  // ==========================================
  // TESTIMONIAL SLIDER
  // ==========================================
  const tTrack = document.getElementById('testimonialTrack');
  const tCards = document.querySelectorAll('.testimonial-card');
  let currentT = 0;

  function goToTestimonial(index) {
    currentT = (index + tCards.length) % tCards.length;
    tTrack.style.transform = `translateX(-${currentT * 100}%)`;
  }

  document.getElementById('tNext').addEventListener('click', () => goToTestimonial(currentT + 1));
  document.getElementById('tPrev').addEventListener('click', () => goToTestimonial(currentT - 1));

  // Auto testimonial
  setInterval(() => goToTestimonial(currentT + 1), 6000);

  // ==========================================
  // RESERVATION FORM
  // ==========================================
  const reserveBtn = document.getElementById('reserveBtn');
  const formSuccess = document.getElementById('formSuccess');

  reserveBtn.addEventListener('click', () => {
    // Simple validation
    const inputs = document.querySelectorAll('.form-input');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value) {
        input.style.borderColor = 'rgba(255,80,80,0.5)';
        valid = false;
        setTimeout(() => input.style.borderColor = '', 2000);
      }
    });

    if (valid) {
      reserveBtn.textContent = 'Confirming...';
      setTimeout(() => {
        reserveBtn.style.display = 'none';
        formSuccess.style.display = 'block';
        inputs.forEach(input => input.value = '');
        setTimeout(() => {
          reserveBtn.style.display = 'block';
          formSuccess.style.display = 'none';
          reserveBtn.textContent = 'Confirm Reservation';
        }, 4000);
      }, 1200);
    }
  });

  // ==========================================
  // SCROLL OBSERVER — Fade-in Animations
  // ==========================================
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const observeTargets = [
    '.fade-in',
    '.cuisine-card',
    '.menu-item',
    '.gallery-item',
    '.stat',
    '.about-visual',
    '.about-text',
    '.testimonial-card'
  ];

  observeTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  });

  // ==========================================
  // STAT COUNTER ANIMATION
  // ==========================================
  const statNums = document.querySelectorAll('.stat-num');
  let counted = false;

  const statObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      statNums.forEach(num => {
        const target = num.textContent;
        const isDecimal = target.includes('.');
        const isPlus = target.includes('+');
        const rawNum = parseFloat(target.replace('+', ''));
        let current = 0;
        const step = rawNum / 60;
        const interval = setInterval(() => {
          current += step;
          if (current >= rawNum) {
            current = rawNum;
            clearInterval(interval);
          }
          num.textContent = isDecimal
            ? current.toFixed(1) + (isPlus ? '+' : '')
            : Math.floor(current) + (isPlus ? '+' : '');
        }, 25);
      });
    }
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about-stats');
  if (statsSection) statObserver.observe(statsSection);

  // ==========================================
  // PARALLAX EFFECT ON HERO
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroSlides.forEach(slide => {
      slide.style.backgroundPositionY = `${50 + scrollY * 0.03}%`;
    });
  });

  // ==========================================
  // ACTIVE NAV HIGHLIGHT ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav');
      }
    });
  });

  // Add active-nav style
  const navStyle = document.createElement('style');
  navStyle.textContent = '.nav-link.active-nav { color: var(--gold); }';
  document.head.appendChild(navStyle);

  // ==========================================
  // INITIAL MENU ITEMS VISIBILITY
  // ==========================================
  // Show first tab's items immediately after a delay
  setTimeout(() => {
    document.querySelectorAll('#tab-starters .menu-item').forEach((item, i) => {
      setTimeout(() => item.classList.add('visible'), i * 100);
    });
  }, 100);

  console.log('%cSaffron & Silk 🌸', 'color: #C9A96E; font-size: 20px; font-weight: bold;');
  console.log('%cA World of Flavours — Built with passion.', 'color: #9A9085; font-size: 12px;');
});
