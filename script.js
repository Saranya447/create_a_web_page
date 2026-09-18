/**
 * Priyanka C - Academic Portfolio Application Logic
 * Assignment 2 - Single Page App
 */

document.addEventListener('DOMContentLoaded', () => {
  // Enforce Light Theme permanently
  document.body.classList.remove('dark-theme');
  localStorage.removeItem('portfolio_theme');

  // Set default view to profile
  switchSection('profile');

  // Initialize Animated Tech Background (Video & Canvas Network without text)
  initTechAnimation();
});

/**
 * Switch Top Level Section (Strict single section visibility)
 * @param {'profile' | 'academic' | 'transport'} sectionId 
 */
function switchSection(sectionId) {
  // Available sections
  const sections = {
    profile: {
      sectionEl: document.getElementById('section-profile'),
      navEl: document.getElementById('btn-nav-profile')
    },
    academic: {
      sectionEl: document.getElementById('section-academic'),
      navEl: document.getElementById('btn-nav-academic')
    },
    transport: {
      sectionEl: document.getElementById('section-transport'),
      navEl: document.getElementById('btn-nav-transport')
    }
  };

  if (!sections[sectionId]) return;

  // Deactivate all sections and navigation buttons
  Object.keys(sections).forEach(key => {
    if (sections[key].sectionEl) {
      sections[key].sectionEl.classList.remove('active');
    }
    if (sections[key].navEl) {
      sections[key].navEl.classList.remove('active');
    }
  });

  // Activate selected section and navigation button
  sections[sectionId].sectionEl.classList.add('active');
  sections[sectionId].navEl.classList.add('active');

  // Scroll to top of main container smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Switch Academic Year (First Year Marks vs Second Year Marks)
 * @param {1 | 2} yearNum 
 */
function switchYear(yearNum) {
  const year1Container = document.getElementById('year-1-container');
  const year2Container = document.getElementById('year-2-container');
  const btnYear1 = document.getElementById('btn-year-1');
  const btnYear2 = document.getElementById('btn-year-2');

  if (yearNum === 1) {
    year1Container.classList.add('active');
    year2Container.classList.remove('active');
    btnYear1.classList.add('active');
    btnYear2.classList.remove('active');
  } else if (yearNum === 2) {
    year2Container.classList.add('active');
    year1Container.classList.remove('active');
    btnYear2.classList.add('active');
    btnYear1.classList.remove('active');
  }
}

/**
 * Clean Print Action
 */
function printActiveSection() {
  window.print();
}


/**
 * ==========================================================================
 * COMPUTER SCIENCE ANIMATED BACKGROUND (VIDEO & TECH CANVAS NETWORK)
 * ==========================================================================
 */
function initTechAnimation() {
  // 1. Try to ensure background video autoplays safely
  const bgVideo = document.getElementById('bg-tech-video');
  if (bgVideo) {
    bgVideo.muted = true;
    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Video autoplay was prevented or resource unavailable; canvas handles it seamlessly
      });
    }
  }

  // 2. High-Performance Canvas Animation
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Resize listener
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track Mouse Interaction
  const mouse = { x: null, y: null, radius: 180 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Network (Vibrant & Bold Nodes)
  const particleCount = Math.min(Math.floor((width * height) / 14000), 80);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: Math.random() * 2.5 + 2.5, // 2.5px to 5px
      isOrange: Math.random() > 0.45,
      pulse: Math.random() * Math.PI * 2
    });
  }

  // Data Pulse Packets Traveling Along Connecting Lines
  const dataPulses = [];
  for (let i = 0; i < 18; i++) {
    dataPulses.push({
      fromIndex: Math.floor(Math.random() * particleCount),
      toIndex: Math.floor(Math.random() * particleCount),
      progress: Math.random(),
      speed: Math.random() * 0.015 + 0.008,
      isOrange: Math.random() > 0.5
    });
  }

  // Animation Loop (Clean Video & Particle Network - No Text Words)
  function render() {
    ctx.clearRect(0, 0, width, height);

    // High Visibility Light Theme Colors (Orange + Blue + White + Black)
    const blueColor = '#1d4ed8';
    const orangeColor = '#ea580c';
    const blueRgb = '29, 78, 216';
    const orangeRgb = '234, 88, 12';

    // 2. Draw & Connect Particles
    const activeConnections = [];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.04;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse Proximity Interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const cursorAlpha = (1 - dist / mouse.radius) * 0.7;
          ctx.strokeStyle = `rgba(${p.isOrange ? orangeRgb : blueRgb}, ${cursorAlpha})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
      }

      // Draw Glowing Particle Node
      const currentRadius = p.radius + Math.sin(p.pulse) * 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1.5, currentRadius), 0, Math.PI * 2);
      ctx.fillStyle = p.isOrange ? orangeColor : blueColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.isOrange ? orangeColor : blueColor;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const linkAlpha = (1 - dist / 135) * 0.42;
          ctx.strokeStyle = p.isOrange ? `rgba(${orangeRgb}, ${linkAlpha})` : `rgba(${blueRgb}, ${linkAlpha})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          activeConnections.push({ p1: p, p2: p2, isOrange: p.isOrange });
        }
      }
    }

    // 3. Draw Data Pulses Traveling Along Connection Lines
    if (activeConnections.length > 0) {
      dataPulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.fromIndex = Math.floor(Math.random() * activeConnections.length);
        }

        const conn = activeConnections[pulse.fromIndex % activeConnections.length];
        if (conn) {
          const px = conn.p1.x + (conn.p2.x - conn.p1.x) * pulse.progress;
          const py = conn.p1.y + (conn.p2.y - conn.p1.y) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = pulse.isOrange ? orangeColor : blueColor;
          ctx.shadowBlur = 10;
          ctx.shadowColor = pulse.isOrange ? orangeColor : blueColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/**
 * Open Certificate Full Image Lightbox Modal
 * @param {string} imgSrc 
 * @param {string} title 
 */
function openCertModal(imgSrc, title) {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const openTabBtn = document.getElementById('cert-modal-open-tab');

  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  modalImg.alt = title || 'Certificate Preview';
  if (modalTitle) modalTitle.textContent = title || 'Certificate Preview';
  if (openTabBtn) openTabBtn.href = imgSrc;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close Certificate Lightbox Modal
 * @param {Event} [event] 
 */
function closeCertModal(event) {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  // If clicked directly on the container child rather than backdrop or close button, don't close
  if (event && event.target && event.target !== modal && !event.target.closest('.cert-modal-close')) {
    return;
  }

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});
