import Component from '@ember/component';
import layout from '../templates/components/polaris-spinner';
import { computed } from '@ember/object';
import { classify } from '@ember/string';

const allowedColors = ['white', 'teal', 'inkLightest'];
const colorsForLargeSpinner = ['teal', 'inkLightest'];
const defaultColor = 'teal';

const allowedSizes = ['small', 'large'];
const defaultSize = 'large';

const spinnerSVGSources = {
  small: '/@smile-io/ember-polaris/images/spinner-small.svg',
  large: '/@smile-io/ember-polaris/images/spinner-large.svg',
};

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Color of spinner
   *
   * @property color
   * @public
   * @type {String}
   * @default teal
   */
  color: defaultColor,

  /**
   * Size of spinner
   *
   * @property size
   * @public
   * @type {String}
   * @default large
   */
  size: defaultSize,

  /**
   * Accessible label for the spinner
   *
   * @property accessibilityLabel
   * @public
   * @type {String}
   * @default null
   */
  accessibilityLabel: null,

  /**
   * @private
   */
  normalizedColor: computed('color', function() {
    let color = this.get('color');
    return allowedColors.includes(color) ? color : defaultColor;
  }).readOnly(),

  /**
   * @private
   */
  normalizedSize: computed('size', 'normalizedColor', function() {
    let size = this.get('size');
    if (allowedSizes.includes(size)) {
      return colorsForLargeSpinner.includes(this.get('normalizedColor'))
        ? size
        : 'small';
    }

    return defaultSize;
  }).readOnly(),

  /**
   * @private
   */
  spinnerSVG: computed('normalizedSize', function() {
    let size = this.get('normalizedSize') === 'large' ? 'large' : 'small';
    return spinnerSVGSources[size];
  }).readOnly(),

  /**
   * @private
   */
  spinnerClass: computed('normalizedSize', function() {
    return [
      'Polaris-Spinner',
      `Polaris-Spinner--color${classify(this.get('normalizedColor'))}`,
      `Polaris-Spinner--size${classify(this.get('normalizedSize'))}`,
    ].join(' ');
  }).readOnly(),
});
