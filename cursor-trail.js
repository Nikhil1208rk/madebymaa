/**
 * MadeByMaa - Custom Crochet Cursor Trail
 * PRD Section 9.3
 * Features:
 * - Small crochet loops along the cursor trail
 * - Tiny crochet flowers occasionally popping
 * - Small yarn hearts & decorative stitches
 * - Smooth fade out & lightweight particle pool
 * - Disabled automatically on touch devices
 * - Pointer-events: none so clicks & buttons are never blocked
 * - User toggle switch (Enabled by default on desktop)
 */

class CrochetCursorTrail {
  constructor() {
    this.enabled = true;
    this.particles = [];
    this.maxParticles = 24;
    this.lastX = 0;
    this.lastY = 0;
    this.lastTime = 0;
    this.flowerThrottle = 0;

    // Check if touch device
    this.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches;
    if (this.isTouch) {
      this.enabled = false;
      return;
    }

    this.initCanvas();
    this.initEvents();
    this.animate();
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'crochet-cursor-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      if (!this.enabled) return;
      const now = performance.now();
      const dist = Math.hypot(e.clientX - this.lastX, e.clientY - this.lastY);

      if (dist > 14 && now - this.lastTime > 28) {
        this.addParticle(e.clientX, e.clientY);
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.lastTime = now;
      }
    });

    // Hover effect on product cards & buttons
    document.addEventListener('mouseover', (e) => {
      if (!this.enabled) return;
      const card = e.target.closest('.product-card, .btn-primary, .category-pill');
      if (card) {
        const rect = card.getBoundingClientRect();
        this.burstPetals(rect.left + rect.width / 2, rect.top + 10);
      }
    });
  }

  addParticle(x, y) {
    if (this.particles.length >= this.maxParticles) {
      this.particles.shift();
    }

    this.flowerThrottle++;
    const isFlower = this.flowerThrottle % 8 === 0;
    const isHeart = this.flowerThrottle % 12 === 0;

    let type = 'loop';
    if (isFlower) type = 'flower';
    else if (isHeart) type = 'heart';

    const colors = ['#E8929A', '#F7D6D8', '#C47B7B', '#FAF0D7', '#8FA882'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    this.particles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8 - 0.3,
      size: type === 'loop' ? Math.random() * 5 + 6 : Math.random() * 6 + 10,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.05,
      alpha: 1,
      decay: type === 'loop' ? 0.028 : 0.022,
      type: type,
      color: color
    });
  }

  burstPetals(x, y) {
    for (let i = 0; i < 4; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2.2,
        vy: -Math.random() * 2 - 0.5,
        size: Math.random() * 4 + 7,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.1,
        alpha: 0.9,
        decay: 0.03,
        type: 'flower',
        color: '#E8929A'
      });
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.enabled) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);

        if (p.type === 'loop') {
          // Crochet oval loop
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size * 0.45, p.size * 0.75, 0.4, 0, Math.PI * 2);
          this.ctx.strokeStyle = p.color;
          this.ctx.lineWidth = 1.8;
          this.ctx.stroke();

          // Tiny inner dashed thread
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size * 0.25, p.size * 0.45, 0.4, 0, Math.PI * 2);
          this.ctx.strokeStyle = '#FAF0D7';
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        } else if (p.type === 'flower') {
          // Tiny 5-petal crochet flower
          const petals = 5;
          for (let pt = 0; pt < petals; pt++) {
            const a = (pt * 2 * Math.PI) / petals;
            this.ctx.beginPath();
            this.ctx.arc(Math.cos(a) * (p.size * 0.4), Math.sin(a) * (p.size * 0.4), p.size * 0.32, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            this.ctx.strokeStyle = '#4A2E2B';
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
          // Flower center
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
          this.ctx.fillStyle = '#F4CA64';
          this.ctx.fill();
        } else if (p.type === 'heart') {
          // Tiny yarn heart
          const s = p.size * 0.08;
          this.ctx.beginPath();
          this.ctx.moveTo(0, 3 * s);
          this.ctx.bezierCurveTo(-5 * s, -3 * s, -10 * s, 3 * s, 0, 10 * s);
          this.ctx.bezierCurveTo(10 * s, 3 * s, 5 * s, -3 * s, 0, 3 * s);
          this.ctx.fillStyle = '#C47B7B';
          this.ctx.fill();
          this.ctx.strokeStyle = '#4A2E2B';
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }

        this.ctx.restore();
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled && this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.particles = [];
    }
    return this.enabled;
  }
}

window.CrochetCursorTrail = CrochetCursorTrail;
