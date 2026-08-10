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

      ctx.fillStyle = '#ffffffff';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawField(game.fieldSize);
      this.drawSnake(game.snakeBody.getBodyPoints(), game.fieldSize);
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

  drawSnake(snakeBodyPoints, fieldSize) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    this.drawHead(snakeBodyPoints[0].x, snakeBodyPoints[0].y, fieldSize);

    for (let i = 1; i < snakeBodyPoints.length; i++) {
      this.drawBodyPoint(snakeBodyPoints[i].x, snakeBodyPoints[i].y, fieldSize);
    }
  }

  drawApple(apple, fieldSize) {
    if (this.ctx) {
      const ctx = this.ctx;
      if (apple !== undefined) {
        ctx.fillStyle = '#910404ff';

        const cellWidth = this.pixelFieldSize / fieldSize;
        ctx.beginPath();
        ctx.arc((apple.x + 0.5) * cellWidth, (apple.y + 0.5) * cellWidth, cellWidth * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawHead(x, y, fieldSize) {
    // this.drawSquareInACell(this.snakeHeadPointMargin, x, y, fieldSize);
    this.drawImageInACell(this.imageSourcesCollection.headRight, x, y, fieldSize);
  }

  drawBodyPoint(x, y, fieldSize) {
    this.drawSquareInACell(this.snakeBodyPointMargin, x, y, fieldSize);
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
