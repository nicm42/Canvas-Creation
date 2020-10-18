//Stars and ground canvas
const canvas1 = document.querySelector('#canvas1');
const ctxBkg = canvas1.getContext("2d");

ctxBkg.canvas.width = window.innerWidth;
ctxBkg.canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  ctxBkg.canvas.width = window.innerWidth;
  ctxBkg.canvas.height = window.innerHeight;
  //Re-add the stars
  ctxBkg.clearRect(0, 0, canvas1.width, canvas1.height);
  stars();
});

//Fireworks canvas
const canvas3 = document.querySelector('#canvas3');
const ctx = canvas3.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
});

//Fire canvas
const canvas2 = document.querySelector('#canvas2');
const ctxFire = canvas2.getContext("2d");

ctxFire.canvas.width = window.innerWidth;
ctxFire.canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  ctxFire.canvas.width = window.innerWidth;
  ctxFire.canvas.height = window.innerHeight;
  //Re-draw the fire
  ctxFire.clearRect(0, 0, canvas2.width, canvas2.height);  
  fire();
});

//Set up variables
let skyStart = window.innerHeight * 3 / 4;
let fireEnd = window.innerWidth / 6;
let fireworkStart = window.innerHeight / 2;

window.addEventListener('resize', () => {
  skyStart = window.innerHeight * 3 / 4;
  fireEnd = window.innerWidth / 6;
  fireworkStart = window.innerHeight / 2;
});

let randomFireworks = getRandomIntInclusive(5,10);
let numberCatherineWheels = getRandomIntInclusive(3,5);

let fireworkCount = 0;
let catherineWheelCount = 0;

//Add all the elements
ground();
stars();
fire();
//fireworks();

function ground(){
  ctxBkg.fillStyle = '#181818';
  ctxBkg.globalAlpha = 1;
  ctxBkg.fillRect(0, skyStart, ctxBkg.canvas.width, skyStart);
}

function stars() {
  //Add stars to a small fraction of the canvas
  const canvasSize = ctxBkg.canvas.width * skyStart;
  const stars = canvasSize / 10000;

  for(let i = 0; i < stars; i++) {
    //Set up random elements
    let xPos = random(2, ctxBkg.canvas.width - 2);
    let yPos = random(2, skyStart - 2);
    let alpha = random(.5, 1);
    let size = random(1, 2);

    //Add stars
    ctxBkg.fillStyle = '#ffffff';
    ctxBkg.globalAlpha = alpha;
    ctxBkg.fillRect(xPos, yPos, size, size);
  }
}

function fire() {
  ctxFire.globalAlpha = 1;
  let firePixelWidth = 4;
  let leftStart = 0;
  let rowCount = 0;
  let greenCount = 15;

  let rowRed = 'ff';
  let rowGreen1 = 'f';
  let rowGreen2 = 'f';
  let rowBlue = 'ff';

  for (let row = 15; row >= 0; row--) {
    //Going from white (#fffff) to orange (#ffa500)
    if(row % 2 !== 0) {
      greenCount --;
      rowGreen1 = greenCount.toString(16);
    }
    rowGreen2 = row.toString(16);
    let rowGreen = rowGreen1 + rowGreen2;
    rowBlue = row.toString(16) + row.toString(16);
    let rowColour = '#' + rowRed + rowGreen + rowBlue;
    console.log(row.toString(16), rowColour)
    for (let col = 0; col < fireEnd / firePixelWidth; col++) {
      leftStart = col * firePixelWidth;
      bottomStart = ctxFire.canvas.height - (rowCount * 5);
      createBase(rowColour);
    }
    rowCount++;
    fireEnd--;
  }

  createFlames();

  function createBase(rowColour) {
    ctxFire.beginPath();
    ctxFire.arc(leftStart, bottomStart, firePixelWidth, 0, 2 * Math.PI);
    ctxFire.fillStyle = rowColour;
    ctxFire.fill();
  }

  function createFlames() {

  }
}

function fireworks() {
  let particles = [];
  const startX = random(10, canvas1.width - 10);
  const startY = random(10, fireworkStart - 100);
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
      ctx.clearRect(0, 0, canvas3.width, canvas3.height);
      fireworkCount++;
      if(fireworkCount === randomFireworks) {
        numberCatherineWheels = getRandomIntInclusive(3,5);
        catherineWheel(numberCatherineWheels);
        fireworkCount = 0;
      } else {
        fireworks();
      }
    }
  
  }
}

function catherineWheel(numberCatherineWheels) {
  const colour = '#' + Math.random().toString(16).substr(2, 6);
  let alpha = random(0.5, 1);
  let canvasX = random(50, canvas3.width - 50);
  ctx.lineWidth = 1;
  ctx.strokeStyle = colour;
  const randomDirection = getRandomIntInclusive(1,2); //1 = anticlockwise, 2 = clockwise 
  let direction = true;
  if(randomDirection === 2){
    direction = false;
  }
  const startPoint = random(0,6.3);
  let endPoint = 6.2;
  if(!direction){
    endPoint = 0.1;
  }

  drawCatherineWheel();

  function drawCatherineWheel() {
    ctx.beginPath();
    ctx.arc(canvasX, skyStart, 50, startPoint, endPoint, direction);
    ctx.globalAlpha = alpha;
    ctx.stroke();
    if(direction) {
      endPoint -= 0.1
    } else {
      endPoint += 0.1;
    }
    alpha -= 0.01;
    if((direction && endPoint > 0) || (!direction && endPoint < 6.4)){
      requestAnimationFrame(drawCatherineWheel);
    } else {
      window.cancelAnimationFrame(drawCatherineWheel);
      let startOpacity = 1;
      const fading = setInterval(() => {
        canvas3.style.opacity = startOpacity - 0.1;
        startOpacity -= 0.1;
      }, 100);
      setTimeout(() => {
        clearInterval(fading);
        ctx.clearRect(0, 0, canvas3.width, canvas3.height);        
        canvas3.style.opacity = 1;
        catherineWheelCount++;
        if(catherineWheelCount < numberCatherineWheels) {
          catherineWheel(numberCatherineWheels);
        }else {
          catherineWheelCount = 0;
          randomFireworks = getRandomIntInclusive(5,10);
          fireworks();
        }
      }, 1000);
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