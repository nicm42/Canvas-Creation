const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
});

const skyStart = window.innerHeight * 2 / 3;

fireworks();

function fireworks() {
  let particles = [];
  const startX = random(10, canvas.width - 10);
  const startY = random(10, skyStart - 100);
  const colour = '#' + Math.random().toString(16).substr(2, 6);
  let alpha = random(0.5, 1);
  draw();

  function draw() {
    let p = {
      x: startX,
      y: startY,
      xVel: random(-2, 2),
      yVel: random(0.1, 4)
    }
    particles.push(p);

    for (let i = 0; i < particles.length; i++) {
      p = particles[i];
      ctx.fillStyle = colour;
      ctx.globalAlpha = alpha;
      ctx.fillRect(p.x, p.y, 2, 2);
      p.x += p.xVel;
      p.y += p.yVel;
    }

    if (alpha >= 0.1) {
      alpha -= 0.01;
      window.requestAnimationFrame(draw);
    } else {
      window.cancelAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks();
    }
  
  }
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}