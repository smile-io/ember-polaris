import { isPresent } from '@ember/utils';
import { clamp } from './math';

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

/*
 * Implements https://en.wikipedia.org/wiki/HSL_and_HSV
 * to convert an rgba color to hsba.
 *
 * If an alpha value is present in the input, it will be passed through,
 * otherwise a default value of 1 will be included in the output.
 *
 * Examples:
 *   rgbaToHsb({ red: 194, green: 204, blue: 143, alpha: 1 })
 *     => { hue: 70, saturation: 0.3, brightness: 0.8 }
 */
export function rgbaToHsb(color) {
  const { red, green, blue, alpha = 1 } = color;
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const largestComponent = Math.max(r, g, b);
  const smallestComponent = Math.min(r, g, b);

  const delta = largestComponent - smallestComponent;
  const saturation = largestComponent === 0 ? 0 : delta / largestComponent;

  let huePercentage = 0;
  switch (largestComponent) {
    case r:
      huePercentage = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      huePercentage = (b - r) / delta + 2;
      break;
    case b:
      huePercentage = (r - g) / delta + 4;
      break;
  }

  const hue = Math.round(huePercentage / 6 * 360);

  return {
    hue: clamp(hue, 0, 360) || 0,
    saturation: clamp(saturation, 0, 1),
    brightness: clamp(largestComponent, 0, 1),
    alpha,
  };
}

/*
 * Converts an RGB(a) color represented as an object into a valid CSS `rgb` / `rgba`
 * color.
 *
 * Examples:
 *   rgbaString({ red: 194, green: 204, blue: 143, alpha: 1 })
 *     => rga()
 *

 */
export function rgbaString(color) {
  const { red, green, blue, alpha } = color;

  if (isPresent(alpha)) {
    return `rgba(${ red }, ${ green }, ${ blue }, ${ alpha })`;
  }

  return `rgb(${ red }, ${ green }, ${ blue })`;
}

export function rgbToHex({red, green, blue}) {
  return `#${ componentToHex(red) }${ componentToHex(green) }${ componentToHex(blue) }`;
}

function componentToHex(component) {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${ hex }` : hex;
}

export function hsbToHex(color) {
  return rgbToHex(hsbaToRgba(color));
}

/*
 * Converts an object representation of an RGB(a) color to HEX.
 *
 * NOTE: This is shamelessly copied from https://github.com/sindresorhus/rgb-hex
 *
 * Examples:
 *
 * rgbHex({ 65, 131, 196 });
 * => '4183c4'
 *
 * rgbHex(65, 131, 196);
 * => '4183c4'
 *
 * rgbHex('rgb(40, 42, 54)');
 * => '282a36'
 *
 * rgbHex(65, 131, 196, 0.2);
 * => '4183c433'
 *
 * rgbHex(40, 42, 54, '75%');
 * => '282a36bf'
 *
 * rgbHex('rgba(40, 42, 54, 75%)');
 * => '282a36bf'
 */
export function rgbaToHex(red, green, blue, alpha) {
  const isPercent = `${ red }${ alpha || '' }`.toString().includes('%');

  if (typeof red === 'string') {
    const res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
    [ red, green, blue, alpha ] = res;
  } else if (typeof red === 'object') {
    ({ red, green, blue, alpha } = red);
  } else if (isPresent(alpha)) {
    alpha = parseFloat(alpha);
  }

  if (typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    red > 255 ||
    green > 255 ||
    blue > 255) {
    throw new TypeError('Expected three numbers below 256');
  }

  if (typeof alpha === 'number') {
    if (!isPercent && alpha >= 0 && alpha <= 1) {
      alpha = Math.round(255 * alpha);
    } else if (isPercent && alpha >= 0 && alpha <= 100) {
      alpha = Math.round(255 * alpha / 100);
    } else {
      throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
    }
    alpha = (alpha | 1 << 8).toString(16).slice(1);
  } else {
    alpha = '';
  }

  return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
}

export function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string');
  }

  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const num = parseInt(hex, 16);

  return {
    red: num >> 16,
    green: num >> 8 & 255,
    blue: num & 255,
  };
}

export function hexToHsb(hex) {
  return rgbaToHsb(hexToRgb(hex));
}

export function hsbaToHex(color) {
  return rgbaToHex(hsbaToRgba(color));
}
