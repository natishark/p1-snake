import { IMAGE_SOURCES } from "./assets/draw/imageSources.js";
function getDrawableImageSources() {
  for (const image in IMAGE_SOURCES) {
    IMAGE_SOURCES[image].draw = (ctx, x, y, width, height, color) => {
      const img = IMAGE_SOURCES[image];
      console.log("In draw, " + img.rectangles);
      for (const rect of img.rectangles) {
        ctx.fillStyle = color;
        ctx.fillRect(
          Math.round(x + rect.x * width / img.width),
          Math.round(y + rect.y * height / img.height),
          Math.round(rect.width * width / img.width),
          Math.round(rect.height * height / img.height)
        )
      }
    }
  }

  return IMAGE_SOURCES;
}

export { getDrawableImageSources };
