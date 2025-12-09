const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

// Configuration
const STAR_COUNT = 150;
const STAR_COLOR = '255, 255, 255'; // RGB
const TWINKLE_SPEED = 0.02;

class Star {
    constructor() {
        this.reset();
        // Start with random opacity
        this.opacity = Math.random();
        this.fading = Math.random() > 0.5; // true = fading out, false = fading in
        this.speed = Math.random() * TWINKLE_SPEED + 0.005;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2; // Size between 0 and 2
    }

    update() {
        // Twinkle effect
        if (this.fading) {
            this.opacity -= this.speed;
            if (this.opacity <= 0) {
                this.opacity = 0;
                this.fading = false;
                // Optional: move star when it completely extinguishes for more variety
                this.reset();
            }
        } else {
            this.opacity += this.speed;
            if (this.opacity >= 1) {
                this.opacity = 1;
                this.fading = true;
            }
        }
    }

    draw() {
        ctx.fillStyle = `rgba(${STAR_COLOR}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    resize();
    createStars();
    animate();
}

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', () => {
    resize();
    createStars(); // Re-distribute stars on resize
});

// Start
init();
