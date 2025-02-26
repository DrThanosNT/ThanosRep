// Select the canvas and set up the context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 492;
canvas.height = 700;
canvas.style.position = "absolute"; // Enable manual positioning
canvas.style.left = "600px"; // Move right
canvas.style.top = "100px"; // Move down

// Square class
class Square {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x <= 0 || this.x + this.size >= canvas.width) {
            this.speedX *= -1;
        }
        if (this.y <= 0 || this.y + this.size >= canvas.height) {
            this.speedY *= -1;
        }
    }

    checkCollision(other) {
        return (
            this.x < other.x + other.size &&
            this.x + this.size > other.x &&
            this.y < other.y + other.size &&
            this.y + this.size > other.y
        );
    }

    getCollisionAngle(other) {
        let dx = (other.x + other.size / 2) - (this.x + this.size / 2);
        let dy = (other.y + other.size / 2) - (this.y + this.size / 2);
        return Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Create squares
const squares = [
    new Square(50, 50, 15, 2, 2, "red"),
    new Square(200, 400, 30, -2, -2, "blue"),
    new Square(350, 100, 30, 2, -2, "green"),
    new Square(100, 300, 30, -2, 2, "purple"),
];

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move and draw squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].move();
        squares[i].draw();

        // Check collision with other squares
        for (let j = i + 1; j < squares.length; j++) {
            if (squares[i].checkCollision(squares[j])) {
                let angle = squares[i].getCollisionAngle(squares[j]);

                if (angle >= -45 && angle <= 45) {
                    squares[i].speedX *= -1;
                    squares[j].speedX *= -1;
                } else if (angle > 45 && angle < 135) {
                    squares[i].speedY *= -1;
                    squares[j].speedY *= -1;
                } else if (angle >= 135 || angle <= -135) {
                    squares[i].speedX *= -1;
                    squares[j].speedX *= -1;
                } else {
                    squares[i].speedY *= -1;
                    squares[j].speedY *= -1;
                }
            }
        }
    }

    requestAnimationFrame(update);
}

// Start animation when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    update();
});
