const bgCanvas = document.getElementById('background-particles-canvas');
const bgCtx = bgCanvas.getContext('2d');
let bgParticlesArray;

// Set canvas size
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

// Handle resize
window.addEventListener('resize', () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    bgInit();
});

// Subtle particle class for background
class BGParticle {
    constructor() {
        this.x = Math.random() * bgCanvas.width;
        this.y = Math.random() * bgCanvas.height;
        this.size = Math.random() * 2 + 0.2; // Slightly larger for mobile visibility
        this.speedX = (Math.random() - 0.5) * 0.15; // Very slow
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.4 + 0.1; // Increased opacity for mobile
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > bgCanvas.width) this.x = 0;
        else if (this.x < 0) this.x = bgCanvas.width;
        if (this.y > bgCanvas.height) this.y = 0;
        else if (this.y < 0) this.y = bgCanvas.height;
    }

    draw() {
        bgCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.fill();
    }
}

function bgInit() {
    bgParticlesArray = [];
    const numberOfParticles = (bgCanvas.width * bgCanvas.height) / 3500; // Significantly increased for mobile visibility
    for (let i = 0; i < numberOfParticles; i++) {
        bgParticlesArray.push(new BGParticle());
    }
}

function bgAnimate() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (let i = 0; i < bgParticlesArray.length; i++) {
        bgParticlesArray[i].update();
        bgParticlesArray[i].draw();
    }
    requestAnimationFrame(bgAnimate);
}

bgInit();
bgAnimate();
