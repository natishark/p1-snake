class Rendering {
  constructor(
    imageSourcesCollection, 
    windowHeight, 
    windowWidth, 
    fieldSizeRatio, 
    snakeHeadPointMargin, 
    snakeBodyPointMargin
  ) {
    this.imageSourcesCollection = imageSourcesCollection;
    this.snakeHeadPointMargin = snakeHeadPointMargin;
    this.snakeBodyPointMargin = snakeBodyPointMargin;

    this.fieldSizeRatio = fieldSizeRatio;
    this.pixelFieldSize = this.countPixelFieldSize(windowHeight, windowWidth, fieldSizeRatio);

    this.canvas = document.getElementById("field");
    this.canvas.width = this.pixelFieldSize;
    this.canvas.height = this.pixelFieldSize;

    this.ctx = null;
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
  }

  updateCanvasSize(windowWidth, windowHeight) {
    this.pixelFieldSize = this.countPixelFieldSize(windowHeight, windowWidth, this.fieldSizeRatio);
    this.canvas.width = this.pixelFieldSize;
    this.canvas.height = this.pixelFieldSize;
  }

  countPixelFieldSize(windowHeight, windowWidth, fieldSizeRatio) {
    return Math.floor(Math.min(windowHeight, windowWidth) * fieldSizeRatio);
  }

  drawGame(game) {
    if (this.ctx) {
      const ctx = this.ctx;

      ctx.fillStyle = 'rgb(252, 224, 181)';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawField(game.fieldSize);
      this.drawSnake(game.snakeBody.getDirectionedBodyPoints(), game.fieldSize);
      this.drawApple(game.apple, game.fieldSize);
    }
  }

  drawField(fieldSize) {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(41, 19, 78, 0.5)';
    ctx.beginPath();
    for (let row = 0; row <= fieldSize; row++) {
      for (let column = 0; column <= fieldSize; column++) {
        const rowPix = Math.floor(this.pixelFieldSize / fieldSize * row);
        const columnPix = Math.floor(this.pixelFieldSize / fieldSize * column);

        this.drawLine(rowPix, 0, rowPix, this.pixelFieldSize);
        this.drawLine(0, columnPix, this.pixelFieldSize, columnPix);
      }
    }
    ctx.stroke();
  }

  drawSnake(snakeDirectionedBodyPoints, fieldSize) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    const pointsNumber = snakeDirectionedBodyPoints.length;

    this.drawHead(
      snakeDirectionedBodyPoints[0].point, 
      snakeDirectionedBodyPoints[0].direction, 
      fieldSize
    );

    for (let i = 1; i < pointsNumber - 1; i++) {
      this.drawBodyPoint(
        snakeDirectionedBodyPoints[i].point, 
        snakeDirectionedBodyPoints[i].direction, 
        fieldSize
      );
    }

    this.drawTail(
      snakeDirectionedBodyPoints[pointsNumber - 1].point,
      snakeDirectionedBodyPoints[pointsNumber - 1].direction,
      fieldSize
    )
  }

  drawApple(apple, fieldSize) {
    if (apple !== undefined) {
      this.drawImageInACell(this.imageSourcesCollection.appleBody, apple.x, apple.y, fieldSize);
    }
  }

  drawHead(point, direction, fieldSize) {
    const image = (() => {
      switch (true) {
        case direction.x > 0:
          return this.imageSourcesCollection.headRight;
        case direction.x < 0:
          return this.imageSourcesCollection.headLeft;
        case direction.y > 0:
          return this.imageSourcesCollection.headDown;
        case direction.y < 0:
          return this.imageSourcesCollection.headUp;
      }
    })();
    this.drawImageInACell(image, point.x, point.y, fieldSize);
  }

  drawTail(point, direction, fieldSize) {
    const image = (() => {
      switch (true) {
        case direction.x > 0:
          return this.imageSourcesCollection.tailLeft;
        case direction.x < 0:
          return this.imageSourcesCollection.tailRight;
        case direction.y > 0:
          return this.imageSourcesCollection.tailUp;
        case direction.y < 0:
          return this.imageSourcesCollection.tailDown;
      }
    })();
    this.drawImageInACell(image, point.x, point.y, fieldSize);
  }

  drawBodyPoint(point, direction, fieldSize) {
    console.log("drawBodyPoint: direction ", direction.x, " and ", direction.y);
    const image = (() => {
      switch (true) {
        case direction.x === 0 && direction.y === 0:
          return this.imageSourcesCollection.bodyJoint;
        case direction.x === 0:
          return this.imageSourcesCollection.bodyVertical;
        case direction.y === 0:
          return this.imageSourcesCollection.bodyHorizontal;
      }
    })();
    this.drawImageInACell(image, point.x, point.y, fieldSize);
  }

  drawSquareInACell(margin, x, y, fieldSize) {
    const cellWidth = this.pixelFieldSize / fieldSize;

    const xStart = cellWidth * x + cellWidth * margin;
    const yStart = cellWidth * y + cellWidth * margin;
    const xEnd = cellWidth * (x + 1) - cellWidth * margin;
    const yEnd = cellWidth * (y + 1) - cellWidth * margin;

    this.ctx.fillRect(xStart, yStart, xEnd - xStart, yEnd - yStart);
  }

  drawImageInACell(image, x, y, fieldSize) {
    const cellWidth = this.pixelFieldSize / fieldSize;

    this.ctx.drawImage(image, cellWidth * x + 1, cellWidth * y + 1, cellWidth - 2, cellWidth - 2);
  }

  drawLine(fromX, fromY, toX, toY) {
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
  }
}

export { Rendering };
