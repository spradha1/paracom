// playground vars
const grid = document.querySelector('.grid');
const gridW = grid.offsetWidth;
const gridH = grid.offsetHeight;

const brickW = 100;
const brickH = 20;
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
const restartButton = document.querySelector('#restart');


/* ***************************************** */

// brick class
class Brick {

  constructor (x, y) {
    this.topleft = [x, y];
    this.bottomRight = [x + brickW + gap, y + brickH + gap];
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
  const bx = ballPosition[0];
  const by = ballPosition[1];
  let brickSet = new Set();
  let bounced = [false, false]; // if multiple simultaneous collisons with wall, bricks 

  allBricks.forEach( (brick, idx) => {
    // vertical
    if (bx >= brick.topleft[0] - ballD && bx <= brick.bottomRight[0]) {
      if (by == brick.topleft[1] - ballD || by == brick.bottomRight[1]) {
        brickSet.add(idx);
        bounced[1] = true;
      }
    }
    // horizontal
    if (by >= brick.topleft[1] - ballD && by <= brick.bottomRight[1]) {
      if (bx == brick.topleft[0] - ballD || bx == brick.bottomRight[0]) {
        brickSet.add(idx);
        bounced[0] = true;
      }
    }
  });

  // remove hit bricks
  const remBricks = Array.from(document.querySelectorAll('.brick'));
  remBricks.forEach( (remBrick, i) => {
    if (brickSet.has(i)) {
      remBrick.classList.remove('brick');
    }
  });
  allBricks = allBricks.filter( (br, j) => !brickSet.has(j));
  if (allBricks.length == 0) {
    stopGame(1);
  }

  // wall
  if (ballPosition[0] >= gridW - ballD || ballPosition[0] <= 0) {
    bounced[0] = true;
  }
  if (ballPosition[1] <= 0) {
    bounced[1] = true;
  }

  // paddle
  if (ballPosition[1] + ballD == paddlePosition[1]
    && ballPosition[0] + ballD >= paddlePosition[0]
    && ballPosition[0] <= paddlePosition[0] + paddleW
  ) {
    bounced[1] = true;
    if (ballPosition[0] + ballD == paddlePosition[0] || ballPosition[0] == paddlePosition[0] + paddleW) {
      bounced[0] = true;
    }
  }

  // bounce
  bounceBall(bounced[0] ? 1:0, bounced[1] ? 1:0);

  // game over
  if (ballPosition[1] >= gridH - ballD) {
    stopGame(0);
  }

}

function bounceBall (hdir, vdir) {
  ballMove[0] = hdir ? -ballMove[0] : ballMove[0];
  ballMove[1] = vdir ? -ballMove[1] : ballMove[1];
}

// end game
function stopGame (val) {
  clearInterval(ballTimer);
  document.removeEventListener('keydown', movePaddle);
  stat.innerHTML = val ? "You Won" : "Game Over";
}


/* ***************************************** */


// bricks
var allBricks = []
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 5; j++) {
    if (Math.floor(Math.random()*2) == 1) {
      allBricks.push( new Brick(i*(brickW + gap), j*(brickH + gap) ));
    }
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

// restart
restartButton.addEventListener('click', () => location.reload());