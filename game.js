import { Snake } from "./snake.js";
import { getRandomUnoccupiedPoint } from "./random.js";

const GameState = {
  Play: "Play",
  Stop: "Stop",
}

const GameResult = {
  Process: "Process",
  Lose: "Lose",
  Win: "Win",
}

class Game {
  occupationMap;
  snakeBody;
  apple;
  currentGameState;
  currentGameResult;
  fieldSize;
  direction;

  constructor(fieldSize, direction) {
    this.fieldSize = fieldSize;
    this.direction = direction;
    this.occupationMap = [];
    for (let i = 0; i < fieldSize; i++) {
      const row = [];
      for (let j = 0; j < fieldSize; j++) {
        row.push(false);
      }
      this.occupationMap.push(row);
    }

    this.snakeBody = new Snake(Math.floor(fieldSize / 2) - 1, Math.floor(fieldSize / 2) - 1);
    this.fillOccupied();
    this.apple = getRandomUnoccupiedPoint(fieldSize, this.snakeBody.size, this.occupationMap);
    this.currentGameState = GameState.Stop;
    this.currentGameResult = GameResult.Process;
  }

  fillOccupied() {
    const bodyPoints = this.snakeBody.getBodyPoints();
    for (let {x, y} of bodyPoints) {
      this.occupationMap[x][y] = true;
    }
  }

  updateGame() {
    const newHead = this.snakeBody.moveHead(this.direction, this.fieldSize);
    let collision = this.occupationMap[newHead.x][newHead.y];
    this.occupationMap[newHead.x][newHead.y] = true;
    if (newHead.equals(this.apple)) {
      this.apple = getRandomUnoccupiedPoint(this.fieldSize, this.snakeBody.size, this.occupationMap);
    } else {
      const freedCell = this.snakeBody.moveTail();
      
      if (newHead.equals(freedCell)) {
        collision = false;
      } else {
        this.occupationMap[freedCell.x][freedCell.y] = false;
      }
    }

    if (this.snakeBody.size === this.fieldSize * this.fieldSize) {
      this.currentGameState = GameState.Stop;
      this.currentGameResult = GameResult.Win;
    }

    if (collision) {
      this.currentGameState = GameState.Stop;
      this.currentGameResult = GameResult.Lose;
    }
  }
}

export { Game, GameResult, GameState };
