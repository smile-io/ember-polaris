/*
 * Implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
 * to convert a hue/saturation/brightness color to RGB.
 *
 * If an alpha value is present in the input, it will be passed through,
 * otherwise a default value of 1 will be included in the output.
 *
 * Examples:
 *   hsbaToRgba({ hue: 70, saturation: 0.3, brightness: 0.8 })
 *     => { red: 194, green: 204, blue: 143, alpha: 1 }
 */
export function hsbaToRgba(color) {
  const { hue, saturation, brightness, alpha = 1 } = color;
  const chroma = brightness * saturation;
  const huePrime = hue / 60;
  const hueDelta = 1 - Math.abs(huePrime % 2 - 1);
  const intermediateValue = chroma * hueDelta;

  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime <= 1) {
    red = chroma;
    green = intermediateValue;
    blue = 0;
  }

  if (huePrime >= 1 && huePrime <= 2) {
    red = intermediateValue;
    green = chroma;
    blue = 0;
  }

  if (huePrime >= 2 && huePrime <= 3) {
    red = 0;
    green = chroma;
    blue = intermediateValue;
  }

  if (huePrime >= 3 && huePrime <= 4) {
    red = 0;
    green = intermediateValue;
    blue = chroma;
  }

  if (huePrime >= 4 && huePrime <= 5) {
    red = intermediateValue;
    green = 0;
    blue = chroma;
  }

  if (huePrime >= 5 && huePrime <= 6) {
    red = chroma;
    green = 0;
    blue = intermediateValue;
  }

  const chromaBrightnessDelta = brightness - chroma;
  red += chromaBrightnessDelta;
  green += chromaBrightnessDelta;
  blue += chromaBrightnessDelta;

  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha,
  };
}
