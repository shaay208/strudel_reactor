// components/Ball.js
const createBall = (ctx, x, y, speedX, speedY, color, size) => {
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  let ball = {
    ctx,
    x,
    y,
    speedX,
    speedY,
    color,
    size,

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.ctx.fill();
    },

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

    collisionDetect(balls) {
      balls.forEach(other => {
        if (other !== this) {
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

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

  return ball;
};

export default createBall;
