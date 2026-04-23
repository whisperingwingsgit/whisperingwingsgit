// ── NAV SCROLL ──
const nav = document.getElementById('main-nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav?.classList.add('scrolled');
  else nav?.classList.remove('scrolled');
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── LIGHTBOX ──
function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.add('open');
  const img = lb.querySelector('.lb-img');
  const ph = lb.querySelector('.lightbox-ph');
  if (src) {
    if (img) { img.src = src; img.alt = alt || ''; img.style.display = 'block'; }
    if (ph) ph.style.display = 'none';
  } else {
    if (img) img.style.display = 'none';
    if (ph) ph.style.display = 'flex';
  }
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    openLightbox(img?.src, `Gallery Photo ${i+1}`);
  });
});

// ── VIDEO MODAL ──
function openVideo(url) {
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  const frame = modal.querySelector('iframe');
  if (frame && url) frame.src = url + '?autoplay=1';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeVideo() {
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  const frame = modal.querySelector('iframe');
  if (frame) frame.src = '';
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// ── CONTACT FORM ──
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const success = form.querySelector('.form-success');
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    setTimeout(() => {
      if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
      if (success) { success.style.display = 'block'; }
      form.reset();
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
    }, 1200);
  });
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ── SMOOTH COUNT ANIMATION ──
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      countObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
