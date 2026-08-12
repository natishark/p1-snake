import { Game, GameState, GameResult } from "./game.js";
import { Point } from "./snake.js";
import { Rendering } from "./rendering.js";
import { getLocalStorageOrNull } from "./storageCheck.js";

// to start server use 'live-server .' in console in project floder for now

const fieldSize = 16; 
const fieldSizeRatio = 0.7;
const startDirection = new Point(1, 0);

const STORAGE_BEST_SCORE_KEY = "snake-best-score";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const appleImage = new Image();
appleImage.src = "/assets/draw/apple.svg";

const rendering = new Rendering(
  appleImage,
  windowHeight, 
  windowWidth, 
  fieldSizeRatio, 
  0.2, 
  0.3,
);

let game = new Game(fieldSize, startDirection);

appleImage.onload = () => rendering.drawGame(game);

window.addEventListener('resize', function() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  rendering.updateCanvasSize(windowWidth, windowHeight);
  rendering.drawGame(game);
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

const currentScoreField = document.getElementById("fld-current-score");
let bestScoreField = document.getElementById("fld-best-score");

const scorePair = { currentScore: parseInt(currentScoreField.textContent) };

const localStorageOrNull = getLocalStorageOrNull();
if (localStorageOrNull) {
  if (localStorageOrNull.getItem(STORAGE_BEST_SCORE_KEY)) {
    bestScoreField.textContent = localStorageOrNull.getItem(STORAGE_BEST_SCORE_KEY);
    scorePair.bestScore = parseInt(bestScoreField.textContent);
  } else {
    localStorageOrNull.setItem(STORAGE_BEST_SCORE_KEY, scorePair.currentScore);
    scorePair.bestScore = scorePair.currentScore;
  }
} else {
  bestScoreField.remove();
  bestScoreField = null;
}

function updateScores() {
  scorePair.currentScore = game.snakeBody.size;
  currentScoreField.textContent = scorePair.currentScore;
  if ("bestScore" in scorePair && scorePair.currentScore > scorePair.bestScore) {
    scorePair.bestScore = scorePair.currentScore;
    localStorageOrNull.setItem(STORAGE_BEST_SCORE_KEY, scorePair.bestScore);
    bestScoreField.textContent = scorePair.bestScore;
  }
}

function gameLoop(currentTime) {
  animationFrameRequestId = requestAnimationFrame(gameLoop);

  if (currentTime - lastTimestamp >= updateInterval) {
    lastTimestamp = currentTime;

    game.updateGame();
    updateScores()
    rendering.drawGame(game);

    if (game.currentGameState === GameState.Stop) {
      cancelAnimationFrame(animationFrameRequestId);
      if (game.currentGameResult !== GameResult.Process) {
        alert(game.currentGameResult);
      }
    }
  } 
}

const playButton = document.getElementById("btn-play");
playButton.addEventListener("click", playGame);

const restartButton = document.getElementById("btn-restart");
restartButton.addEventListener("click", restartGame);

const stopButton = document.getElementById("btn-pause");
stopButton.addEventListener("click", stopGame);

function playGame() {
  game.currentGameState = GameState.Play;
  lastTimestamp = performance.now();
  animationFrameRequestId = requestAnimationFrame(gameLoop);
  playButton.disabled = true;
  stopButton.disabled = false;
}

function stopGame() {
  game.currentGameState = GameState.Stop;
  cancelAnimationFrame(animationFrameRequestId);
  stopButton.disabled = true;
  playButton.disabled = false;
}

function restartGame() {
  if (game.currentGameState === GameState.Play) {
    stopGame();
  }
  game = new Game(fieldSize, startDirection);
  rendering.drawGame(game);
  playGame();
}

rendering.drawField(fieldSize);
