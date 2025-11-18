import React, { useEffect, useRef, useCallback } from 'react';
import createBall from '../utils/CreateBall';

//  BallAnimation Component use to display animated balls on a canvas
const BallAnimation = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const widthRef = useRef(0);
  const heightRef = useRef(0);

  const ballsRef = useRef([]);

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  // Main animation loop
  const loop = useCallback(() => {
    const ctx = ctxRef.current;
    const width = widthRef.current;
    const height = heightRef.current;
    const balls = ballsRef.current;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    // Spawn balls
    while (balls.length < 25) {
      const size = random(10, 20);
      const x = random(size, width - size);
      const y = random(size, height - size);
      const speedX = random(-7, 7);
      const speedY = random(-7, 7);
      const red = random(0, 255);
      const green = random(0, 255);
      const blue = random(0, 255);

      const ball = createBall(
        ctx,
        x,
        y,
        speedX,
        speedY,
        `rgb(${red},${green},${blue})`,
        size
      );

      balls.push(ball);
    }

    // Update all balls
    balls.forEach((ball) => {
      ball.draw();
      ball.update(width, height);
      ball.collisionDetect(balls);
    });

    requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Important: Use parent size, NOT fullscreen
    const parent = canvas.parentElement;
    widthRef.current = canvas.width = parent.clientWidth;
    heightRef.current = canvas.height = parent.clientHeight;

    loop();
  }, [loop]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '10px',
      }}
    />
  );
};

export default BallAnimation;
