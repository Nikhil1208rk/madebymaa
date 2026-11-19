/**
 * MadeByMaa - Signature Crochet Needle & Yarn Animation
 * PRD Section 9.2:
 * 1. A yarn strand enters the screen.
 * 2. A crochet needle appears.
 * 3. The needle catches the yarn.
 * 4. The needle moves through crochet loops.
 * 5. Yarn loops form into visible stitches.
 * 6. A crochet flower / decorative element is created.
 * 7. The MadeByMaa hero content is revealed smoothly.
 */

class CrochetNeedleAnimation {
  constructor(canvasId, overlayId, onCompleteCallback) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.overlay = document.getElementById(overlayId);
    this.onComplete = onCompleteCallback;
    this.step = 0;
    this.progress = 0;
    this.animId = null;
    this.isReplay = false;
    this.needle = {
      x: -50,
      y: 120,
      angle: -0.4,
      targetX: 100,
      targetY: 120,
      targetAngle: -0.4
    };
    this.yarnPoints = [];
    this.stitches = [];
    this.flowerPetals = 0;
    this.flowerScale = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 600;
    this.height = rect.height || 360;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  start(isReplay = false) {
    this.isReplay = isReplay;
    this.step = 1;
    this.progress = 0;
    this.yarnPoints = [];
    this.stitches = [];
    this.flowerPetals = 0;
    this.flowerScale = 0;
    this.needle.x = -60;
    this.needle.y = this.centerY - 20;
    this.startTime = performance.now();

    if (this.animId) cancelAnimationFrame(this.animId);
    this.animate(this.startTime);
  }

  skip() {
    this.step = 7;
    this.progress = 1;
    this.flowerPetals = 8;
    this.flowerScale = 1;
    this.render();
    if (this.animId) cancelAnimationFrame(this.animId);
    if (typeof this.onComplete === 'function') {
      this.onComplete();
    }
  }

  animate(now) {
    const elapsed = (now - this.startTime) / 1000;

    // Sequence stages:
    // 0 - 1.2s: Step 1: Yarn strand flows into screen
    // 1.2s - 2.2s: Step 2: Crochet needle appears and moves into position
    // 2.2s - 3.2s: Step 3: Needle catches yarn with its hook
    // 3.2s - 5.0s: Step 4 & 5: Needle pulls yarn into crochet chain loops and formed stitches
    // 5.0s - 6.6s: Step 6: Flower blooms stitch by stitch
    // 6.6s+: Step 7: Completed, hero reveal trigger

    if (elapsed < 1.2) {
      this.step = 1;
      this.progress = elapsed / 1.2;
      this.updateStep1(this.progress);
    } else if (elapsed < 2.2) {
      this.step = 2;
      this.progress = (elapsed - 1.2) / 1.0;
      this.updateStep2(this.progress);
    } else if (elapsed < 3.2) {
      this.step = 3;
      this.progress = (elapsed - 2.2) / 1.0;
      this.updateStep3(this.progress);
    } else if (elapsed < 5.0) {
      this.step = 4;
      this.progress = (elapsed - 3.2) / 1.8;
      this.updateStep4(this.progress);
    } else if (elapsed < 6.4) {
      this.step = 6;
      this.progress = (elapsed - 5.0) / 1.4;
      this.updateStep6(this.progress);
    } else {
      this.step = 7;
      this.updateStep7();
      this.render();
      if (typeof this.onComplete === 'function') {
        this.onComplete();
      }
      return;
    }

    this.render();
    this.animId = requestAnimationFrame((t) => this.animate(t));
  }

  // Step 1: Yarn strand flows in smoothly from left
  updateStep1(p) {
    const totalPoints = 35;
    const currentPoints = Math.floor(p * totalPoints);
    this.yarnPoints = [];
    const startX = 20;
    const endX = this.centerX + 40;
    for (let i = 0; i <= currentPoints; i++) {
      const t = i / totalPoints;
      const x = startX + t * (endX - startX);
      const wave = Math.sin(t * Math.PI * 4 + p * 2) * 18 * (1 - t * 0.4);
      const y = this.centerY + wave + 10;
      this.yarnPoints.push({ x, y });
    }
  }

  // Step 2: Crochet needle appears from top right and glides down
  updateStep2(p) {
    // Keep yarn steady
    this.updateStep1(1);
    const ease = this.easeOutCubic(p);
    this.needle.x = (this.width + 80) - ease * (this.width + 80 - (this.centerX + 30));
    this.needle.y = (this.centerY - 130) + ease * 125;
    this.needle.angle = -0.55 + ease * 0.2;
  }

  // Step 3: Needle catches yarn with hook
  updateStep3(p) {
    this.updateStep1(1);
    const dip = Math.sin(p * Math.PI) * 15;
    this.needle.x = (this.centerX + 30) - Math.sin(p * Math.PI) * 18;
    this.needle.y = (this.centerY - 5) + dip;
    this.needle.angle = -0.35 + Math.sin(p * Math.PI) * 0.35;

    // Last point of yarn hooks to needle tip
    if (this.yarnPoints.length > 0) {
      const tip = this.getNeedleHookPos();
      this.yarnPoints[this.yarnPoints.length - 1] = { x: tip.x, y: tip.y };
    }
  }

  // Step 4 & 5: Needle performs circular stitching motion, forming crochet chain loops
  updateStep4(p) {
    const stitchCount = 6;
    const currentStitchFloat = p * stitchCount;
    const currentStitchIndex = Math.floor(currentStitchFloat);
    const stitchCycle = currentStitchFloat - currentStitchIndex;

    // Needle loops in an elliptical crochet action
    const loopRadiusX = 22;
    const loopRadiusY = 16;
    const angle = stitchCycle * Math.PI * 2;
    const anchorX = this.centerX - 60 + currentStitchIndex * 24;
    const anchorY = this.centerY - 10;

    this.needle.x = anchorX + Math.cos(angle) * loopRadiusX;
    this.needle.y = anchorY + Math.sin(angle) * loopRadiusY;
    this.needle.angle = -0.4 + Math.sin(angle) * 0.35;

    // Stitches formed along bottom
    this.stitches = [];
    for (let s = 0; s < currentStitchIndex; s++) {
      this.stitches.push({
        x: this.centerX - 60 + s * 24,
        y: this.centerY + 5,
        formed: 1
      });
    }
    // Partial stitch
    this.stitches.push({
      x: anchorX,
      y: this.centerY + 5,
      formed: stitchCycle
    });
  }

  // Step 6: Loops converge into a blooming crochet flower
  updateStep6(p) {
    const ease = this.easeInOutCubic(p);
    this.flowerScale = ease;
    this.flowerPetals = Math.min(8, Math.floor(ease * 8) + 1);

    // Needle withdraws gracefully to the side
    this.needle.x = (this.centerX + 80) + ease * 120;
    this.needle.y = (this.centerY - 40) - ease * 40;
    this.needle.angle = -0.15 - ease * 0.4;
  }

  // Step 7: Final flower resting and sparkles
  updateStep7() {
    this.flowerScale = 1;
    this.flowerPetals = 8;
    this.needle.x = this.width + 100;
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle background warm radial glow
    const grad = this.ctx.createRadialGradient(this.centerX, this.centerY, 10, this.centerX, this.centerY, 200);
    grad.addColorStop(0, 'rgba(247, 214, 216, 0.35)');
    grad.addColorStop(1, 'rgba(253, 251, 247, 0)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 1. Draw yarn strand
    if (this.yarnPoints.length > 1) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(this.yarnPoints[0].x, this.yarnPoints[0].y);
      for (let i = 1; i < this.yarnPoints.length; i++) {
        const xc = (this.yarnPoints[i - 1].x + this.yarnPoints[i].x) / 2;
        const yc = (this.yarnPoints[i - 1].y + this.yarnPoints[i].y) / 2;
        this.ctx.quadraticCurveTo(this.yarnPoints[i - 1].x, this.yarnPoints[i - 1].y, xc, yc);
      }
      this.ctx.strokeStyle = '#E8929A';
      this.ctx.lineWidth = 4;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();

      // Yarn texture highlights
      this.ctx.strokeStyle = '#FFFDF9';
      this.ctx.lineWidth = 1.2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 2. Draw formed crochet stitches / loops
    if (this.stitches.length > 0 && this.step < 6) {
      this.ctx.save();
      this.stitches.forEach((st) => {
        // Draw tear-shaped crochet chain loop
        this.ctx.beginPath();
        this.ctx.ellipse(st.x, st.y, 11 * st.formed, 16 * st.formed, 0.3, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#C47B7B';
        this.ctx.lineWidth = 3.5;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.ellipse(st.x, st.y, 6 * st.formed, 10 * st.formed, 0.3, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#FAF0D7';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      });
      this.ctx.restore();
    }

    // 3. Draw blossoming crochet flower (Step 6 & 7)
    if (this.flowerScale > 0) {
      this.ctx.save();
      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.scale(this.flowerScale, this.flowerScale);

      // Draw 8 layered petals
      const totalPetals = 8;
      for (let i = 0; i < this.flowerPetals; i++) {
        const angle = (i * 2 * Math.PI) / totalPetals;
        this.ctx.save();
        this.ctx.rotate(angle);

        // Petal body
        this.ctx.beginPath();
        this.ctx.ellipse(0, -42, 17, 26, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = '#F8C8DC';
        this.ctx.fill();
        this.ctx.strokeStyle = '#4A2E2B';
        this.ctx.lineWidth = 2.2;
        this.ctx.stroke();

        // Inner stitched accent
        this.ctx.beginPath();
        this.ctx.ellipse(0, -42, 10, 16, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFFDF9';
        this.ctx.fill();
        this.ctx.strokeStyle = '#E8929A';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        this.ctx.restore();
      }

      // Center golden stitched disc
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 24, 0, Math.PI * 2);
      this.ctx.fillStyle = '#F4CA64';
      this.ctx.fill();
      this.ctx.strokeStyle = '#4A2E2B';
      this.ctx.lineWidth = 2.5;
      this.ctx.stroke();

      // Stitch dots around center
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
      this.ctx.strokeStyle = '#8A5E52';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([3, 4]);
      this.ctx.stroke();

      // Center inner ring
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 6, 0, Math.PI * 2);
      this.ctx.fillStyle = '#8A5E52';
      this.ctx.fill();

      // Cute yarn ribbon leaves
      this.ctx.beginPath();
      this.ctx.ellipse(-38, 32, 18, 9, -0.7, 0, Math.PI * 2);
      this.ctx.fillStyle = '#8FA882';
      this.ctx.fill();
      this.ctx.strokeStyle = '#4A2E2B';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.ellipse(38, 32, 18, 9, 0.7, 0, Math.PI * 2);
      this.ctx.fillStyle = '#8FA882';
      this.ctx.fill();
      this.ctx.strokeStyle = '#4A2E2B';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.restore();
    }

    // 4. Draw crochet needle (when in visible range)
    if (this.needle.x < this.width + 60 && this.needle.x > -80) {
      this.drawNeedle(this.needle.x, this.needle.y, this.needle.angle);
    }
  }

  drawNeedle(x, y, angle) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);

    // Bamboo / ergonomic grip handle
    this.ctx.fillStyle = '#EAD7C5';
    this.ctx.strokeStyle = '#4A2E2B';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.roundRect(-8, 35, 16, 90, 8);
    this.ctx.fill();
    this.ctx.stroke();

    // Bamboo texture lines
    this.ctx.strokeStyle = '#D4A373';
    this.ctx.lineWidth = 1.2;
    this.ctx.beginPath();
    this.ctx.moveTo(-5, 60);
    this.ctx.lineTo(5, 60);
    this.ctx.moveTo(-5, 90);
    this.ctx.lineTo(5, 90);
    this.ctx.stroke();

    // Metallic rose-gold shaft
    this.ctx.fillStyle = '#E8929A';
    this.ctx.strokeStyle = '#4A2E2B';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.rect(-3.5, -20, 7, 56);
    this.ctx.fill();
    this.ctx.stroke();

    // The signature crochet hook tip
    this.ctx.beginPath();
    this.ctx.moveTo(-3.5, -20);
    this.ctx.lineTo(-3.5, -45);
    // Hook curve
    this.ctx.quadraticCurveTo(-3.5, -58, 4, -58);
    this.ctx.quadraticCurveTo(11, -58, 10, -50);
    this.ctx.quadraticCurveTo(8, -44, 2, -43);
    this.ctx.lineTo(2, -20);
    this.ctx.closePath();
    this.ctx.fillStyle = '#C47B7B';
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  getNeedleHookPos() {
    const rad = this.needle.angle;
    const hx = this.needle.x + Math.sin(rad) * 45;
    const hy = this.needle.y - Math.cos(rad) * 45;
    return { x: hx, y: hy };
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}

window.CrochetNeedleAnimation = CrochetNeedleAnimation;
