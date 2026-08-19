import { Game, GameState, GameResult } from "./game.js";
import { countVector, Point } from "./snake.js";
import { Rendering } from "./rendering.js";
import { getLocalStorageOrNull } from "./storageCheck.js";

const fieldSize = 10; 
const startDirection = new Point(1, 0);
const initialSnakeSize = 2;

const STORAGE_BEST_SCORE_KEY = "snake-best-score";
const CLICKABLE_CLASS = "clickable";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const fieldSizeRatio = countFieldSizeRatio(windowWidth, windowHeight);

function countFieldSizeRatio(width, height) {
  const windowRatio = Math.max(width, height) / Math.min(width, height);
  return (windowRatio < 1.4) ? 0.5 : 0.7;
}

const appleImage = new Image();
appleImage.src = "./assets/draw/apple.svg";

const fonts = [
  new FontFace('Pixelated', 'url(./fonts/8bitoperatorJVE.woff)'),
  new FontFace('Pixelated', 'url(./fonts/8bitoperatorJVE.ttf)'),
];

const rendering = new Rendering(
  appleImage,
  windowHeight, 
  windowWidth, 
  fieldSizeRatio, 
  0.2, 
  0.3,
);

let game = new Game(fieldSize, startDirection, initialSnakeSize);

window.addEventListener('resize', function() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  rendering.updateCanvasSize(windowWidth, windowHeight, countFieldSizeRatio(windowWidth, windowHeight));
  rendering.drawGame(game);
});

document.addEventListener('keydown', function(event) {
  if (event.key === ' ') {
    handlePlayEvent();
    event.preventDefault();
    return;
  }

  if (game.currentGameState === GameState.Play) {
    let newDirection = { x: 0, y: 0 };
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
      default:
        return;
    }

    const currentDirection = countVector(
      game.snakeBody.body[0].get(1),
      game.snakeBody.body[0].get(0)
    );

    if (
      Math.abs(newDirection.x - currentDirection.x) < 2 && 
      Math.abs(newDirection.y - currentDirection.y) < 2
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
  scorePair.currentScore = game.snakeBody.size - initialSnakeSize;
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
      stopGame();
    }
  } 
}

const playButton = document.getElementById("btn-play");
playButton.addEventListener("click", handlePlayEvent);

const restartButton = document.getElementById("btn-restart");
restartButton.addEventListener("click", restartGame);

const stopButton = document.getElementById("btn-pause");
stopButton.addEventListener("click", stopGame);

const canvas = document.getElementById("field");
canvas.classList.add(CLICKABLE_CLASS);
canvas.addEventListener("click", handlePlayEvent);

function handlePlayEvent() {
  if (game.currentGameResult !== GameResult.Process) {
    restartGame();
  }
  playGame();
}

function playGame() {
  if (game.currentGameState !== GameState.Play) {
    game.currentGameState = GameState.Play;
    canvas.classList.remove(CLICKABLE_CLASS);
    rendering.drawGame(game);
    lastTimestamp = performance.now();
    animationFrameRequestId = requestAnimationFrame(gameLoop);
    playButton.disabled = true;
    stopButton.disabled = false;
    restartButton.disabled = false;
  }
}

function stopGame() {
  game.currentGameState = GameState.Stop;
  canvas.classList.add(CLICKABLE_CLASS);
  cancelAnimationFrame(animationFrameRequestId);
  rendering.drawGame(game);
  stopButton.disabled = true;
  playButton.disabled = false;
}

function restartGame() {
  if (game.currentGameState === GameState.Play) {
    stopGame();
  }
  game = new Game(fieldSize, startDirection, initialSnakeSize);
  rendering.drawGame(game);
}

const fontPromises = fonts.map(f => f.load()
  .then(loadedFont => {
    document.fonts.add(loadedFont);
  })
  .catch(err => { throw err; }));

const imagePromise = new Promise((resolve, reject) => {
  appleImage.onload = () => {
    resolve();
  };
  appleImage.onerror = (err) => {
    reject(err);
  };
});

Promise.all([...fontPromises, imagePromise])
  .then(() => {
    rendering.textFont = 'Pixelated';
    cancelAnimationFrame(animationFrameRequestId);
    rendering.drawGame(game);
    playButton.disabled = false;
  })
  .catch(error => {
    console.error('Не удалось загрузить ресурсы:', error);
  });

const loadingUpdateInterval = 30;
let loadingShift = 0;

function loadingLoop(currentTime) {
  animationFrameRequestId = requestAnimationFrame(loadingLoop);

  if (currentTime - lastTimestamp >= loadingUpdateInterval) {
    lastTimestamp = currentTime;

    loadingShift = rendering.drawLoading(loadingShift);
  }
}

loadingLoop(performance.now());
