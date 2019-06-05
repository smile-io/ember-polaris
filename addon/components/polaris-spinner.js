import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/polaris-spinner';
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

@tagName('')
@templateLayout(layout)
export default class PolarisSpinner extends Component {
  /**
   * Color of spinner
   *
   * @property color
   * @public
   * @type {String}
   * @default teal
   */
  color = defaultColor;

  /**
   * Size of spinner
   *
   * @property size
   * @public
   * @type {String}
   * @default large
   */
  size = defaultSize;

  /**
   * Accessible label for the spinner
   *
   * @property accessibilityLabel
   * @public
   * @type {String}
   * @default null
   */
  accessibilityLabel = null;

  /**
   * @private
   */
  @(computed('color').readOnly())
  get normalizedColor() {
    let color = this.get('color');
    return allowedColors.includes(color) ? color : defaultColor;
  }

  /**
   * @private
   */
  @(computed('size', 'normalizedColor').readOnly())
  get normalizedSize() {
    let size = this.get('size');
    if (allowedSizes.includes(size)) {
      return colorsForLargeSpinner.includes(this.get('normalizedColor'))
        ? size
        : 'small';
    }

    return defaultSize;
  }

  /**
   * @private
   */
  @(computed('normalizedSize').readOnly())
  get spinnerSVG() {
    let size = this.get('normalizedSize') === 'large' ? 'large' : 'small';
    return spinnerSVGSources[size];
  }

  /**
   * @private
   */
  @(computed('normalizedSize').readOnly())
  get spinnerClass() {
    return [
      'Polaris-Spinner',
      `Polaris-Spinner--color${classify(this.get('normalizedColor'))}`,
      `Polaris-Spinner--size${classify(this.get('normalizedSize'))}`,
    ].join(' ');
  }
}
