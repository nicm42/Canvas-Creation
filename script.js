const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
});

const skyStart = window.innerHeight * 2 / 3;

//fireworks();
catherineWheel();
let fireworkCount = 0;

function fireworks() {
  let particles = [];
  const startX = random(10, canvas.width - 10);
  const startY = random(10, skyStart - 100);
  const colour = '#' + Math.random().toString(16).substr(2, 6);
  let alpha = random(0.5, 1);
  drawFireworks();

  function drawFireworks() {
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
      window.requestAnimationFrame(drawFireworks);
    } else {
      window.cancelAnimationFrame(drawFireworks);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworkCount++;
      if(fireworkCount === 5) {
        catherineWheel();
      } else {
        fireworks();
      }
    }
  
  }
}

function catherineWheel() {
  const colour = '#' + Math.random().toString(16).substr(2, 6);
  let alpha = random(0.5, 1);
  ctx.lineWidth = 2;
  ctx.strokeStyle = colour;
  ctx.globalAlpha = alpha;
  let endPoint = 6.2;

  drawFireworks();

  function drawFireworks() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, skyStart, 50, 0, endPoint, true);
    ctx.stroke();
    endPoint -= 0.1
    if(endPoint > 0){
      requestAnimationFrame(drawFireworks);
    } else {
      window.cancelAnimationFrame(drawFireworks);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

}

function random(min, max) {
  return min + Math.random() * (max + 1 - min);
}