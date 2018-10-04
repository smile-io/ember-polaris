import { module, test } from 'qunit';
import {
  rgbaString,
  hsbaToRgba,
  rgbaToHsb,
  rgbaToHex,
  hexToRgb,
} from '@smile-io/ember-polaris/utils/color';

module('Unit | Utility | color');

test('rgbaString() correctly converts an RGB(a) object color to string', function(assert) {
  let result = rgbaString({ red: 194, green: 204, blue: 143 });
  assert.equal(result, 'rgb(194, 204, 143)');

  result = rgbaString({ red: 194, green: 204, blue: 143, alpha: 0.75 });
  assert.equal(result, 'rgba(194, 204, 143, 0.75)');
});

test('hsbaToRgba() correctly converts HSB(a) colors to RGB(a)', function(assert) {
  let result = hsbaToRgba({ hue: 70, saturation: 0.3, brightness: 0.8 });
  assert.deepEqual(result, { red: 194, green: 204, blue: 143, alpha: 1 });
});

test('rgbaToHsb() correctly converts RGB(a) colors to HSB(a)', function(assert) {
  let result = rgbaToHsb({ red: 194, green: 204, blue: 143, alpha: 1 });

  assert.equal(result.hue, 70);
  // Need to round here to match
  assert.equal(result.saturation.toFixed(1), 0.3);
  assert.equal(result.brightness, 0.8);
  assert.equal(result.alpha, 1);
});

test('rgbaToHex() correctly converts RGB(a) colors to HEX', function(assert) {
  let result = rgbaToHex({ red: 65, green: 131, blue: 196 });
  assert.equal(result, '4183c4');

  result = rgbaToHex(65, 131, 196);
  assert.equal(result, '4183c4');

  result = rgbaToHex('rgb(40, 42, 54)');
  assert.equal(result, '282a36');

  result = rgbaToHex(65, 131, 196, 0.2);
  assert.equal(result, '4183c433');

  result = rgbaToHex(40, 42, 54, '75%');
  assert.equal(result, '282a36bf');

  result = rgbaToHex('rgba(40, 42, 54, 75%)');
  assert.equal(result, '282a36bf');
});

test('hexToRgb() correctly converts HEX colors to RGB', function(assert) {
  let result = hexToRgb('4183c4');
  assert.deepEqual(result, { red: 65, green: 131, blue: 196 });

  result = hexToRgb('#4183c4');
  assert.deepEqual(result, { red: 65, green: 131, blue: 196 });

  result = hexToRgb('#fff');
  assert.deepEqual(result, { red: 255, green: 255, blue: 255 });
});
