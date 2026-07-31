import { Game, GameState, GameResult } from "./game.js";
import { Point } from "./snake.js";
import { Rendering } from "./rendering.js";

const fieldSize = 16; 
const fieldSizeRatio = 0.8;
const startDirection = new Point(1, 0);

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const rendering = new Rendering(
  windowHeight, 
  windowWidth, 
  fieldSizeRatio, 
  0.2, 
  0.3,
);

let game = new Game(fieldSize, startDirection);

window.addEventListener('resize', function() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  rendering.updateCanvasSize(windowWidth, windowHeight);
  // draw()?
});

document.addEventListener('keydown', function(event) {
  if (game.currentGameState === GameState.Play) {
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
      Math.abs(newDirection.x - game.direction.x) < 2 && 
      Math.abs(newDirection.y - game.direction.y) < 2
    ) {
      game.direction = newDirection;
    }
  }
});

const updateInterval = 400;
let lastTimestamp = performance.now();
let animationFrameRequestId = 0;

function gameLoop(currentTime) {
  animationFrameRequestId = requestAnimationFrame(gameLoop);

  if (currentTime - lastTimestamp >= updateInterval) {
    lastTimestamp = currentTime;

    game.updateGame();
    rendering.drawGame(game);

    if (game.currentGameState === GameState.Stop) {
      cancelAnimationFrame(animationFrameRequestId);
      if (game.currentGameResult !== GameResult.Process) {
        alert(currentGameResult);
      }
    }
  } 
}

const startButton = document.getElementById("btn-start");
startButton.addEventListener("click", startGame);

const restartButton = document.getElementById("btn-restart");
restartButton.addEventListener("click", restartGame);

const stopButton = document.getElementById("btn-pause");
stopButton.addEventListener("click", stopGame);

function startGame() {
  game.currentGameState = GameState.Play;
  lastTimestamp = performance.now();
  animationFrameRequestId = requestAnimationFrame(gameLoop);
}

function stopGame() {
  game.currentGameState = GameState.Stop;
  cancelAnimationFrame(animationFrameRequestId);
}

function restartGame() {
  if (game.currentGameState === GameState.Play) {
    stopGame();
  }
  game = new Game(fieldSize, startDirection);
  rendering.drawGame(game);
  startGame();
}

rendering.drawGame(game);
