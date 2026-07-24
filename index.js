import { Point, Snake, UnbreakableSegment } from "./snake.js";

// const fieldSize = 16; 
const fieldSize = 4; 

const GameState = {
  Play: "Play",
  Stop: "Stop",
}

const GameResult = {
  Process: "Process",
  Lose: "Lose",
  Win: "Win",
}

let currentGameState = GameState.Play;
let currentGameResult = GameResult.Process;

const occupationMap = [];
for (let i = 0; i < fieldSize; i++) {
  const row = [];
  for (let j = 0; j < fieldSize; j++) {
    row.push(false);
  }
  occupationMap.push(row);
}

function fillOccupied(snake) {
  const bodyPoinst = snake.getBodyPoints();
  for (let {x, y} of bodyPoinst) {
    occupationMap[x][y] = true;
  }
  console.log(occupationMap);
}

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const pixelFieldSize = Math.floor(Math.min(windowHeight, windowWidth) * 0.8);

window.addEventListener('resize', function() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
});

const canvas = document.getElementById("field");
canvas.width = pixelFieldSize;
canvas.height = pixelFieldSize;

function drawField(ctx) {
  ctx.strokeStyle = 'rgba(41, 19, 78, 0.5)';
  ctx.beginPath();
  for (let row = 0; row <= fieldSize; row++) {
    for (let column = 0; column <= fieldSize; column++) {
      const rowPix = Math.floor(pixelFieldSize / fieldSize * row);
      const columnPix = Math.floor(pixelFieldSize / fieldSize * column);

      drawLine(ctx, rowPix, 0, rowPix, pixelFieldSize);
      drawLine(ctx, 0, columnPix, pixelFieldSize, columnPix);
    }
  }
  ctx.stroke();
}

function drawLine(ctx, fromX, fromY, toX, toY) {
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomUnoccupiedPoint(snake) {
  if (fieldSize * fieldSize === snake.size) {
    return undefined;
  }
  let randomCellNumber = getRandomInt(fieldSize * fieldSize - snake.size);

  for (let x = 0; x < fieldSize; x++) {
    for (let y = 0; y < fieldSize; y++) {
      if (!occupationMap[x][y]) {
        randomCellNumber--;
      }

      if (randomCellNumber < 0) {
        return new Point(x, y);
      }
    }
  }
}

let direction = { x: 0, y: 1 };

const snakeBody = new Snake(Math.floor(fieldSize / 2) - 1, Math.floor(fieldSize / 2) - 1);

// const snakeBody = new Snake();
// snakeBody.setSnake([{x: 15, y:12}, {x: 12, y:12}, {x: 12, y:5}, {x: 6, y: 5}]);
// snakeBody.setSnake([new UnbreakableSegment([new Point(5, 2), new Point(5, 1), new Point(10, 1), new Point(10, 8)])], 14);

fillOccupied(snakeBody);

let apple = getRandomUnoccupiedPoint(snakeBody);

function drawSnake(ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  const bodyPoints = snakeBody.getBodyPoints();
  drawHead(ctx, bodyPoints[0].x, bodyPoints[0].y);

  for (let i = 1; i < bodyPoints.length; i++) {
    drawBodyPoint(ctx, bodyPoints[i].x, bodyPoints[i].y);
  }
}

function drawHead(ctx, x, y) {
  const headMargin = 0.2;
  
  drawSquareInACell(ctx, headMargin, x, y);
}

function drawBodyPoint(ctx, x, y) {
  const bodyMargin = 0.3;

  drawSquareInACell(ctx, bodyMargin, x, y);
}

function drawApple(ctx, apple) {
  if (apple !== undefined) {
    ctx.fillStyle = '#910404ff';

    const cellWidth = pixelFieldSize / fieldSize;
    ctx.beginPath();
    ctx.arc((apple.x + 0.5) * cellWidth, (apple.y + 0.5) * cellWidth, cellWidth * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSquareInACell(ctx, margin, x, y) {
  const cellWidth = pixelFieldSize / fieldSize;

  const xStart = cellWidth * x + cellWidth * margin;
  const yStart = cellWidth * y + cellWidth * margin;
  const xEnd = cellWidth * (x + 1) - cellWidth * margin;
  const yEnd = cellWidth * (y + 1) - cellWidth * margin;

  ctx.fillRect(xStart, yStart, xEnd - xStart, yEnd - yStart);
}

let lastTimestamp = performance.now();
const updateInterval = 400;
// const updateInterval = 10000;

function gameLoop(currentTime) {
  const requestId = requestAnimationFrame(gameLoop);

  if (currentTime - lastTimestamp >= updateInterval) {
    lastTimestamp = currentTime;

    updateGame();
    draw();

    if (currentGameState === GameState.Stop) {
      cancelAnimationFrame(requestId);
      if (currentGameResult !== GameResult.Process) {
        alert(currentGameResult);
      }
    }
  } 
}

function updateGame() {
  const newHead = snakeBody.moveHead(direction, fieldSize);
  let collision = occupationMap[newHead.x][newHead.y];
  occupationMap[newHead.x][newHead.y] = true;
  if (newHead.equals(apple)) {
    apple = getRandomUnoccupiedPoint(snakeBody);
  } else {
    const freedCell = snakeBody.moveTail();
    
    if (newHead.equals(freedCell)) {
      collision = false;
    } else {
      occupationMap[freedCell.x][freedCell.y] = false;
    }
  }

  if (snakeBody.size === fieldSize * fieldSize) {
    currentGameState = GameState.Stop;
    currentGameResult = GameResult.Win;
  }

  if (collision) {
    currentGameState = GameState.Stop;
    currentGameResult = GameResult.Lose;
  }
}

function draw() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = '#ffffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawField(ctx);
    drawSnake(ctx);
    console.log(occupationMap);
    console.log(apple);
    drawApple(ctx, apple);
  }
}

document.addEventListener('keydown', function(event) {
  let newDirection = { x: 0, y: 0 };
  console.log(event.key)
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      newDirection.x = -1;
      event.preventDefault();
      break;
    case 'ArrowRight':
    case 'd':
      newDirection.x = 1;
      event.preventDefault();
      break;
    case 'ArrowUp':
    case 'w':
      newDirection.y = -1;
      event.preventDefault();
      break;
    case 'ArrowDown':
    case 's':
      newDirection.y = 1;
      event.preventDefault();
      break;
  }

  if (
    Math.abs(newDirection.x - direction.x) < 2 && 
    Math.abs(newDirection.y - direction.y) < 2
  ) {
    direction = newDirection;
  }

});

draw();
requestAnimationFrame(gameLoop);
