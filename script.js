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
  ctx.lineWidth = 1;
  ctx.strokeStyle = colour;
  const randomDirection = getRandomIntInclusive(1,2); //1 = anticlockwise, 2 = clockwise 
  let direction = true;
  if(randomDirection === 2){
    direction = false;
  }
  let endPoint = 6.2;
  if(!direction){
    endPoint = 0.1;
  }

  drawFireworks();

  function drawFireworks() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, skyStart, 50, 0, endPoint, direction);
    ctx.globalAlpha = alpha;
    ctx.stroke();
    if(direction) {
      endPoint -= 0.1
    } else {
      endPoint += 0.1;
    }
    alpha -= 0.01;
    if((direction && endPoint > 0) || (!direction && endPoint < 6.4)){
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}