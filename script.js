/* ==========================================================================
   ROMANTIC BIRTHDAY GIFT JAVASCRIPT
   Interactive logic for 7 romantic slides, animations, audio & effects
   ========================================================================== */

let currentSlide = 0;
const totalSlides = 7;
let hugCount = 0;
let isCandleBlown = false;
let isLetterOpened = false;

// DOM Elements
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const progressBar = document.getElementById('progress-bar');
const navPrev = document.getElementById('nav-prev');
const navNext = document.getElementById('nav-next');
const audio = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-btn');

/* ==========================================================================
   1. SLIDE NAVIGATION LOGIC
   ========================================================================== */
function updateSlideView() {
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });

  // Update Progress Bar
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Update side arrow buttons visibility
  if (navPrev) navPrev.style.display = currentSlide === 0 ? 'none' : 'flex';
  if (navNext) navNext.style.display = currentSlide === totalSlides - 1 ? 'none' : 'flex';

  // Trigger special celebrations on specific slides
  if (currentSlide === 1) {
    // Mini confetti on slide 2 greeting
    fireConfettiShower(1);
  }
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlideView();
    tryPlayAudio();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlideView();
  }
}

function goToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    currentSlide = index;
    updateSlideView();
    tryPlayAudio();
  }
}

// Dot button click events
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => goToSlide(idx));
});

// Keyboard navigation (Arrow keys)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown') {
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    prevSlide();
  }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 55;
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) > swipeThreshold) {
    if (diff < 0) {
      nextSlide(); // Swiped left -> Next
    } else {
      prevSlide(); // Swiped right -> Previous
    }
  }
}

/* ==========================================================================
   2. BACKGROUND MUSIC & AUDIO CONTROLLER
   ========================================================================== */
let isAudioPlaying = false;

function toggleMusic() {
  if (isAudioPlaying) {
    audio.pause();
    isAudioPlaying = false;
    musicBtn.classList.remove('playing');
  } else {
    audio.play().then(() => {
      isAudioPlaying = true;
      musicBtn.classList.add('playing');
    }).catch((err) => {
      console.log('Audio autoplay prevented by browser policy:', err);
    });
  }
}

function tryPlayAudio() {
  if (!isAudioPlaying && audio) {
    audio.play().then(() => {
      isAudioPlaying = true;
      musicBtn.classList.add('playing');
    }).catch(() => {
      // Browsers require user interaction first
    });
  }
}

if (musicBtn) {
  musicBtn.addEventListener('click', toggleMusic);
}

/* ==========================================================================
   3. SLIDE 1: GIFT BOX OPENING
   ========================================================================== */
function openGift() {
  const giftBox = document.getElementById('gift-box');
  giftBox.classList.add('opened');

  // Confetti explosion
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });

  tryPlayAudio();

  setTimeout(() => {
    nextSlide();
  }, 900);
}

/* ==========================================================================
   4. SLIDE 3: POLAROID LIGHTBOX
   ========================================================================== */
function expandPhoto(card) {
  const img = card.querySelector('.polaroid-img');
  const caption = card.querySelector('.handwritten');
  const modal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (img && modal) {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    modal.classList.add('active');
  }
}

function closeLightbox(e) {
  const modal = document.getElementById('lightbox-modal');
  if (e.target.id === 'lightbox-modal' || e.target.classList.contains('lightbox-close')) {
    modal.classList.remove('active');
  }
}

/* ==========================================================================
   5. SLIDE 4: WHY I LOVE YOU FLIP CARDS
   ========================================================================== */
function flipCard(card) {
  card.classList.toggle('flipped');
  createMiniSparkle(card);
}

function createMiniSparkle(element) {
  const rect = element.getBoundingClientRect();
  confetti({
    particleCount: 15,
    angle: 90,
    spread: 45,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight
    },
    colors: ['#ff4d6d', '#ffd166', '#ffffff']
  });
}

/* ==========================================================================
   6. SLIDE 5: ENVELOPE & LOVE LETTER
   ========================================================================== */
function toggleLetter() {
  const envelope = document.getElementById('envelope');
  const hint = document.getElementById('letter-toggle-hint');

  isLetterOpened = !isLetterOpened;
  if (isLetterOpened) {
    envelope.classList.add('opened');
    hint.innerHTML = '<i class="fa-solid fa-heart"></i> Semoga kamu suka surat kecil ini!';

    // Heart confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ff758f', '#ffccd5']
    });
  } else {
    envelope.classList.remove('opened');
    hint.innerHTML = '<i class="fa-solid fa-envelope-open-text"></i> Klik amplop di atas untuk membaca isi surat!';
  }
}

/* ==========================================================================
   7. SLIDE 6: BIRTHDAY CAKE & CANDLE BLOWING
   ========================================================================== */
function blowCandle() {
  if (isCandleBlown) return;

  const flame = document.getElementById('candle-flame');
  const smoke = document.getElementById('candle-smoke');
  const wishBox = document.getElementById('wish-reveal-box');
  const actionBtn = document.getElementById('blow-action-btn');
  const instruction = document.getElementById('cake-instruction');

  // Extinguish candle
  flame.classList.add('blown-out');
  smoke.classList.add('active');
  isCandleBlown = true;

  // Change instruction
  if (instruction) instruction.textContent = 'Lilin berhasil ditiup! Harapanmu terbang ke langit ✨';
  if (actionBtn) {
    actionBtn.innerHTML = '<i class="fa-solid fa-check"></i> Lilin Telah Ditiup!';
    actionBtn.style.opacity = '0.7';
    actionBtn.style.pointerEvents = 'none';
  }

  // Grand Confetti Blast
  fireGrandCelebration();

  // Reveal prayer card
  setTimeout(() => {
    wishBox.style.display = 'block';
  }, 600);
}

function fireGrandCelebration() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
}

function fireConfettiShower(count = 1) {
  confetti({
    particleCount: 50 * count,
    spread: 60,
    origin: { y: 0.6 }
  });
}

/* ==========================================================================
   8. SLIDE 7: COUPONS & VIRTUAL HUGS
   ========================================================================== */
function claimCoupon(card, title) {
  if (!card.classList.contains('claimed')) {
    card.classList.add('claimed');
    const claimBtn = card.querySelector('.claim-btn');
    if (claimBtn) claimBtn.textContent = 'Terklaim ✓';
    showToast(`"${title}" berhasil diklaim! 🎁`);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 }
    });
  } else {
    showToast(`Voucher ini sudah kamu miliki sayang! 💕`);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-text');
  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function sendVirtualHug() {
  hugCount++;
  document.getElementById('hug-counter-text').innerHTML =
    `Pelukan telah dikirim: <strong>${hugCount}</strong> kali 💕 (Kuingin peluk kamu terus!)`;

  // Create floating hearts on screen
  for (let i = 0; i < 7; i++) {
    createFloatingHeart();
  }

  showToast('Pelukan hangat terkirim untukmu! 🤗❤️');
}

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-screen-heart';
  heart.innerHTML = ['❤️', '💖', '🥰', '💕', '✨'][Math.floor(Math.random() * 5)];
  heart.style.position = 'fixed';
  heart.style.left = `${Math.random() * 80 + 10}vw`;
  heart.style.bottom = '20px';
  heart.style.fontSize = `${Math.random() * 24 + 20}px`;
  heart.style.zIndex = '9999';
  heart.style.pointerEvents = 'none';
  heart.style.transition = 'all 2s cubic-bezier(0.25, 1, 0.5, 1)';
  heart.style.opacity = '1';
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translateY(-${Math.random() * 300 + 200}px) scale(${Math.random() * 0.8 + 1})`;
    heart.style.opacity = '0';
  });

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

/* ==========================================================================
   9. CANVAS AMBIENT FLOATING PARTICLES (HEARTS & SPARKLES)
   ========================================================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 45;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 0.8 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.isHeart = Math.random() > 0.4;
    this.color = Math.random() > 0.5 ? 'rgba(255, 77, 109, ' : 'rgba(255, 209, 102, ';
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;

    if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color + '0.8)';

    if (this.isHeart) {
      // Draw simple heart
      const x = this.x;
      const y = this.y;
      const s = this.size / 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - s, y - s, x - s * 2, y + s / 3, x, y + s * 1.5);
      ctx.bezierCurveTo(x + s * 2, y + s / 3, x + s, y - s, x, y);
      ctx.fill();
    } else {
      // Draw glowing sparkle circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

for (let i = 0; i < particleCount; i++) {
  const p = new Particle();
  p.y = Math.random() * canvas.height; // Distribute initially
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Initialize View on load
document.addEventListener('DOMContentLoaded', () => {
  updateSlideView();
});

