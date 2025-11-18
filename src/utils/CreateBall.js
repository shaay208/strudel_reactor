// CreateBall function
// Utility function to create a ball object with properties and methods for drawing,
// updating position, and detecting collisions on a canvas.
const createBall = (ctx, x, y, speedX, speedY, color, size) => {
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  // Define the ball object
  let ball = {
    ctx,
    x,
    y,
    speedX,
    speedY,
    color,
    size,

  // Method to draw the ball on the canvas
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.ctx.fill();
    },

    // Method to update the ball's position and handle wall collisions
    update(width, height) {
      if (this.x + this.size >= width || this.x - this.size <= 0) {
        this.speedX = -this.speedX;
      }
      if (this.y + this.size >= height || this.y - this.size <= 0) {
        this.speedY = -this.speedY;
      }
      this.x += this.speedX;
      this.y += this.speedY;
    },

    // Method to detect collisions with other balls and change color on collision
    collisionDetect(balls) {
      balls.forEach(other => {
        if (other !== this) {
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Change color on collision
          if (distance < this.size + other.size) {
            const red = random(0, 255);
            const green = random(0, 255);
            const blue = random(0, 255);

            this.color = other.color = `rgb(${red},${green},${blue})`;
          }
        }
      });
    }
  };
// Return the ball object
  return ball;
};

export default createBall;
