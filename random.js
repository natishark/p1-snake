import { Point } from "./snake.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomUnoccupiedPoint(fieldSize, snakeSize, occupationMap) {
  if (fieldSize * fieldSize === snakeSize) {
    return undefined;
  }
  let randomCellNumber = getRandomInt(fieldSize * fieldSize - snakeSize);

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

export { getRandomUnoccupiedPoint };
