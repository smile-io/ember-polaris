import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-spinner';

const allowedColors = ['white', 'teal', 'inkLightest'];
const colorsForLargeSpinner = ['teal', 'inkLightest'];
const defaultColor = 'teal';

const defaultSize = 'large';
const allowedSizes = ['small', defaultSize];

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
   * @type {String}
   * @default teal
   * @public
   */
  color = defaultColor;

  /**
   * Size of spinner
   *
   * @type {String}
   * @default large
   * @public
   */
  size = defaultSize;

  /**
   * Accessible label for the spinner
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  @computed('color')
  get normalizedColor() {
    return allowedColors.includes(this.color) ? this.color : defaultColor;
  }

  @computed('size', 'normalizedColor')
  get normalizedSize() {
    if (allowedSizes.includes(this.size)) {
      return colorsForLargeSpinner.includes(this.normalizedColor)
        ? this.size
        : 'small';
    }

    return defaultSize;
  }

  @computed('normalizedSize')
  get spinnerSVG() {
    let size = this.normalizedSize === defaultSize ? 'large' : 'small';
    return spinnerSVGSources[size];
  }

  @computed('normalizedColor', 'normalizedSize')
  get spinnerClass() {
    return [
      'Polaris-Spinner',
      `Polaris-Spinner--color${classify(this.normalizedColor)}`,
      `Polaris-Spinner--size${classify(this.normalizedSize)}`,
    ].join(' ');
  }
}
