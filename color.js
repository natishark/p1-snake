class RgbaColor {
  constructor(r, g, b, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}

function getSoftGradientBreakdown(startColor, endColor, colorsNumber, softnessThreshold) {
  if (colorsNumber > softnessThreshold) {
    return getGradientBreakdown(startColor, endColor, colorsNumber);
  } else {
    return getGradientBreakdown(startColor, endColor, softnessThreshold).slice(0, colorsNumber);
  }
}

function getGradientBreakdown(startColor, endColor, colorsNumber) {
  if (colorsNumber < 2) {
    throw new Error("The number of colors has to be bigger then one.");
  }

  const breakdown = [startColor];
  const step = 1 / (colorsNumber - 1);

  for (let i = 1; i < colorsNumber - 1; i++) {
    breakdown.push(new RgbaColor(
      Math.round(startColor.r + (endColor.r - startColor.r) * step * i),
      Math.round(startColor.g + (endColor.g - startColor.g) * step * i),
      Math.round(startColor.b + (endColor.b - startColor.b) * step * i),
      Math.round(startColor.a + (endColor.a - startColor.a) * step * i),
    ));
  }

  breakdown.push(endColor);

  return breakdown;
}

export { RgbaColor, getGradientBreakdown, getSoftGradientBreakdown };
