class Snake {
  constructor(xStart, yStart, xEnd, yEnd, size) {
    this.body = [new UnbreakableSegment([new Point(xStart, yStart), new Point(xEnd, yEnd)])];
    this.size = size;
  }

  setSnake(body, size) {
    this.body = body;
    this.size = size;
  }

  getDirectionedBodyPoints() {
    const directionedBodyPoints = [];
    for (let segment of this.body) {
      const partNum = segment.size() - 1;

      for (let i = 0; i < partNum; i++) {
        const currentDirection = countVector(segment.get(i + 1), segment.get(i));
        if (segment.get(i).x !== segment.get(i + 1).x) {
          let j = segment.get(i).x - currentDirection.x;
          while (true) {
            directionedBodyPoints.push({
              point: new Point(j, segment.get(i).y),
              direction: currentDirection
            });
            if (segment.get(i + 1).x !== j) {
              j -= currentDirection.x
            } else {
              if (i !== partNum - 1) {
                directionedBodyPoints[directionedBodyPoints.length - 1].direction = new Point(0, 0);
              }
              break;
            }
          }
        } else {
          let j = segment.get(i).y - currentDirection.y;
          while (true) {
            directionedBodyPoints.push({
              point: new Point(segment.get(i).x, j),
              direction: currentDirection
            });

            if (segment.get(i + 1).y !== j) {
              j -= currentDirection.y
            } else {
              if (i !== partNum - 1) {
                directionedBodyPoints[directionedBodyPoints.length - 1].direction = new Point(0, 0);
              }
              break;
            }
          }
        }
      }
    }
    return directionedBodyPoints;
  }

  moveHead(direction, fieldSize) {
    const firstSegment = this.body[0];
    
    const currentDirection = countVector(firstSegment.get(1), firstSegment.get(0));

    const newHeadPoint = new Point(
      firstSegment.get(0).x - currentDirection.x + 2 * direction.x,
      firstSegment.get(0).y - currentDirection.y + 2 * direction.y,
    );

    if (currentDirection.x === direction.x && currentDirection.y === direction.y || firstSegment.get(1).equals(firstSegment.get(0))) {
      firstSegment.set(0, newHeadPoint);
    } else {
      firstSegment.set(0, new Point(firstSegment.get(0).x - currentDirection.x, firstSegment.get(0).y - currentDirection.y));
      firstSegment.unshift(newHeadPoint);
    }

    if (
      newHeadPoint.x > fieldSize || 
      newHeadPoint.x < -1        ||
      newHeadPoint.y > fieldSize ||
      newHeadPoint.y < -1
    ) {
      this.body.unshift(this.countNewSegment(newHeadPoint, fieldSize));
      firstSegment.set(0,  new Point(firstSegment.get(0).x - direction.x, firstSegment.get(0).y - direction.y));
    }

    this.size++;

    const newVirtualHeadPoint = this.body[0].get(0);

    return new Point(newVirtualHeadPoint.x - direction.x, newVirtualHeadPoint.y - direction.y);
  }

  moveTail() {
    const lastSegment = this.body[this.body.length - 1];

    const tailDirection = countVector(lastSegment.get(lastSegment.size() - 1), lastSegment.get(lastSegment.size() - 2));

    const freedCell = lastSegment.get(lastSegment.size() - 1);

    const newTailPoint = new Point(
      lastSegment.get(lastSegment.size() - 1).x + tailDirection.x,
      lastSegment.get(lastSegment.size() - 1).y + tailDirection.y,
    );

    if (lastSegment.size() === 2 && newTailPoint.equals(lastSegment.get(0))) {
      return this.body.pop().get(1);
    } 

    if (newTailPoint.x === lastSegment.get(lastSegment.size() - 2).x && 
        newTailPoint.y === lastSegment.get(lastSegment.size() - 2).y &&
        lastSegment.size() > 2
    ) {
      lastSegment.pop();
    } else {
      lastSegment.set(lastSegment.size() - 1, newTailPoint);
    }

    this.size--;

    return freedCell;
  }

  countNewSegment(point, fieldSize) {
    const newHeadPoint = point.copy();
    const newTailPoint = point.copy();
    for (let coord in newHeadPoint) {
      if (newHeadPoint[coord] > fieldSize) {
        newHeadPoint[coord] = 1;
        newTailPoint[coord] = 0;
      }
      if (newHeadPoint[coord] < 0) {
        newHeadPoint[coord] = fieldSize - 2;
        newTailPoint[coord] = fieldSize - 1;
      }
    }
    return new UnbreakableSegment([newHeadPoint, newTailPoint]);
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  copy() {
    return new Point(this.x, this.y);
  }
}

class UnbreakableSegment {
  constructor(pointArray) {
    this.pointArray = pointArray;
  }

  get(i) {
    return this.pointArray[i];
  }

  set(i, point) {
    this.pointArray[i] = point;
  }

  unshift(point) {
    this.pointArray.unshift(point);
  }

  pop() {
    this.pointArray.pop();
  }

  size() {
    return this.pointArray.length;
  }
}

function countVector(point1, point2) {
  const direction = { x: 0, y: 0 };

  if (point1.x === point2.x) {
    const deltaY = point2.y - point1.y;
    direction.y = deltaY > 0 ? 1 : -1;
  }

  if (point1.y === point2.y) {
    const deltaX = point2.x - point1.x;
    direction.x = deltaX > 0 ? 1 : -1;
  }

  return direction;
}

export { Snake, Point, UnbreakableSegment, countVector };
