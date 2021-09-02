// playground vars
const grid = document.querySelector('.grid');
const gridW = grid.offsetWidth;
const gridH = grid.offsetHeight;

const brickW = 110;
const brickH = 35;
const gap = 10;

const paddleStart = [340, 480];
let paddlePosition = paddleStart;
const paddleW = 100;

const ballD = 20;
const ballStart = [370, 460]
let ballPosition = ballStart;
let ballMove = [5, 5];
let ballTimer;

const stat = document.querySelector('#stat');


// brick class
class Brick {

  constructor (x, y) {
    this.topleft = [x, y];
    this.topRight = [x + brickW, y];
    this.bottomLeft = [x, y + brickH];
    this.bottomRight = [x + brickW, y + brickH];
  }

}

// draws a brick inside grid
function drawBrick (brick) {
  const brickE = document.createElement('div');
  brickE.classList.add('brick');
  brickE.style.left = (brick.topleft[0] + gap) + 'px';
  brickE.style.top = (brick.topleft[1] + gap) + 'px';
  grid.appendChild(brickE);
}

// draws the paddle
function drawPaddle () {
  paddle.style.left = paddlePosition[0] + 'px';
  paddle.style.top = paddlePosition[1] + 'px';
}

// move paddle
function movePaddle (e) {
  switch (e.key) {
    case 'ArrowLeft':
      if ( paddlePosition[0] > 0) {
        paddlePosition[0] -= 10;
        drawPaddle();
      }
      break;
    case 'ArrowRight':
      if ( paddlePosition[0] < gridW - paddleW) {
        paddlePosition[0] += 10;
        drawPaddle();
      }
      break;
  }
}

// draws the ball
function drawBall () {
  ball.style.left = ballPosition[0] + 'px';
  ball.style.top = ballPosition[1] + 'px';
}

// move ball
function moveBall () {
  ballPosition[0] += ballMove[0];
  ballPosition[1] -= ballMove[1];
  drawBall();
  checkCollision();
}

// ball collision
function checkCollision () {

  // bricks
  

  // wall
  if (ballPosition[0] >= gridW - ballD || ballPosition[0] <= 0) {
    bounceBall(1, 0);
  }
  if (ballPosition[1] <= 0) {
    bounceBall(0, 1);
  }
  if (ballPosition[1] >= gridH - ballD) {
    clearInterval(ballTimer);
    stat.innerHTML = "Game Over";
    document.removeEventListener('keydown', movePaddle);
  }

}

function bounceBall (hdir, vdir) {
  ballMove[0] = hdir ? -ballMove[0] : ballMove[0];
  ballMove[1] = vdir ? -ballMove[1] : ballMove[1];
}


// bricks
var allBricks = []
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 2; j++) {
    allBricks.push( new Brick(i*brickW, j*brickH) );
  }
}
allBricks.forEach(drawBrick);

// paddle
const paddle = document.createElement('div');
paddle.classList.add('paddle');
drawPaddle();
grid.appendChild(paddle);
document.addEventListener('keydown', movePaddle);

// ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);
ballTimer = setInterval(moveBall, 30);