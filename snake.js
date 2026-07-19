// snake is an array of points
class Snake {
  constructor(x, y) {
    this.body = [new UnbreakableSegment([new Point(x, y), new Point(x, y)])];
  }

  setSnake(body) {
    this.body = body;
  }

  move(direction, hasAte, fieldSize) {
    const firstSegment = this.body[0];
    
    const currentDirection = countVector(firstSegment.get(1), firstSegment.get(0));

    const newHeadPoint = new Point(
      firstSegment.get(0).x + direction.x,
      firstSegment.get(0).y + direction.y,
    );

    if (
      newHeadPoint.x >= fieldSize || 
      newHeadPoint.x <  0         ||
      newHeadPoint.y >= fieldSize ||
      newHeadPoint.y < 0
    ) {
      this.body.unshift(this.countNewSegment(newHeadPoint, fieldSize));
    } else if (currentDirection.x === direction.x && currentDirection.y === direction.y || firstSegment.get(1).equals(firstSegment.get(0))) {
      firstSegment.set(0, newHeadPoint);
    } else {
      firstSegment.unshift(newHeadPoint);
    }

    if (!hasAte) {
      const lastSegment = this.body[this.body.length - 1];

      if (lastSegment.get(lastSegment.size() - 1).equals(lastSegment.get(lastSegment.size() - 2))) {
        this.body.pop();
      } else {
        const tailDirection = countVector(lastSegment.get(lastSegment.size() - 1), lastSegment.get(lastSegment.size() - 2));
        const newTailPoint = new Point(
          lastSegment.get(lastSegment.size() - 1).x + tailDirection.x,
          lastSegment.get(lastSegment.size() - 1).y + tailDirection.y,
        );

        if (newTailPoint.x === lastSegment.get(lastSegment.size() - 2).x && 
            newTailPoint.y === lastSegment.get(lastSegment.size() - 2).y &&
            lastSegment.size() > 2
        ) {
          lastSegment.pop();
        } else {
          lastSegment.set(lastSegment.size() - 1, newTailPoint);
        }
      }
    }
  }

  countNewSegment(point, fieldSize) {
    const newPoint = point.copy();
    for (let coord in newPoint) {
      if (newPoint[coord] >= fieldSize) {
        newPoint[coord] = 0;
      }
      if (newPoint[coord] < 0) {
        newPoint[coord] = fieldSize - 1;
      }
    }
    return new UnbreakableSegment([newPoint, newPoint.copy()]);
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
    // if (deltaY > 0) {
    //   direction.y = 1;
    // } else if (deltaY < 0) {
    //   direction.y = -1;
    // } else {
    //   direction.y = 0;
    // }
    direction.y = deltaY > 0 ? 1 : -1;
  }

  if (point1.y === point2.y) {
    const deltaX = point2.x - point1.x;
    // if (deltaX > 0) {
    //   direction.x = 1;
    // } else if (deltaX < 0) {
    //   direction.x = -1;
    // } else {
    //   direction.x = 0;
    // }
    direction.x = deltaX > 0 ? 1 : -1;
  }

  return direction;
}

export { Snake, Point, UnbreakableSegment };