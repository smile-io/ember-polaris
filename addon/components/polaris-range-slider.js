import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { dasherize, htmlSafe } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { assign } from '@ember/polyfills';
import { errorId, helpTextId } from '@smile-io/ember-polaris/utils/id';
import layout from '../templates/components/polaris-range-slider';

function invertNumber(number) {
  if (Math.sign(number) === 1) {
    return -Math.abs(number);
  } else if (Math.sign(number) === -1) {
    return Math.abs(number);
  } else {
    return 0;
  }
}

/**
 * Polaris range slider component.
 * See https://polaris.shopify.com/components/forms/range-slider
 */
@tagName('')
@templateLayout(layout)
export default class PolarisRangeSlider extends Component {
  /**
   * ID for range input
   *
   * Defaults to Ember's internal GUID for the component instance
   *
   * @type {String}
   * @public
   */
  @computed
  get id() {
    return guidFor(this);
  }

  /**
   * Label for the range input
   *
   * @type {String}
   * @public
   */
  label = null;

  /**
   * Adds an action to the label
   *
   * @type {Object}
   * @public
   */
  labelAction = null;

  /**
   * Visually hide the label
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden = false;

  /**
   * Initial value for range input
   *
   * @type {Number}
   * @default 0
   * @public
   */
  value = 0;

  /**
   * Minimum possible value for range input
   *
   * @type {Number}
   * @default 0
   * @public
   */
  min = 0;

  /**
   * Maximum possible value for range input
   *
   * @type {Number}
   * @default 100
   * @public
   */
  max = 100;

  /**
   * Increment value for range input changes
   *
   * @type {Number}
   * @default null
   * @public
   */
  step = null;

  /**
   * Provide a tooltip while sliding, indicating the current value
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  output = false;

  /**
   * Additional text to aid in use
   *
   * @type {String|Component}
   * @public
   */
  helpText = null;

  /**
   * Display an error message
   *
   * @type {String|Component}
   * @public
   */
  error = null;

  /**
   * Disable input
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Element to display before the input
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  prefix = null;

  /**
   * Element to display after the input
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  suffix = null;

  /**
   * Callback when the range input is changed
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onChange() {}

  /**
   * Callback when range input is focused
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus is removed
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onBlur() {}

  dataTestRangeSlider = true;

  /**
   * Class names for the range wrapper div
   *
   * @type {String}
   */
  @(computed('error', 'disabled').readOnly())
  get rangeWrapperClassNames() {
    let { error, disabled } = this;
    let cssClasses = ['Polaris-RangeSlider'];

    if (error) {
      cssClasses.push('Polaris-RangeSlider--error');
    }

    if (disabled) {
      cssClasses.push('Polaris-RangeSlider--disabled');
    }

    return cssClasses.join(' ');
  }

  /**
   * Style for the range wrapper div
   *
   * @type {String}
   */
  @(computed('min', 'max', 'value', 'sliderProgress').readOnly())
  get rangeWrapperStyle() {
    let { min, max, value: current, sliderProgress } = this;

    let styleProps = assign(
      { min, max, current },
      {
        progress: `${sliderProgress}%`,
        outputFactor: invertNumber((sliderProgress - 50) / 100),
      }
    );

    let styleString = Object.keys(styleProps).reduce(
      (styleString, propName) => {
        return `${styleString} --Polaris-RangeSlider-${dasherize(propName)}:${
          styleProps[propName]
        };`;
      },
      ''
    );

    return htmlSafe(styleString.trim());
  }

  /**
   * Slider progress percentage
   *
   * @type {Number}
   */
  @(computed('min', 'max', 'value').readOnly())
  get sliderProgress() {
    let { min, max, value } = this;
    return ((value - min) * 100) / (max - min);
  }

  /**
   * Stringified boolean flag indicating whether an error is present
   *
   * @type {String}
   */
  @(computed('error').readOnly())
  get hasError() {
    return Boolean(this.error).toString();
  }

  /**
   * Accessibility
   *
   * @type {Boolean}
   */
  @(computed('error', 'helpText', 'id').readOnly())
  get ariaDescribedBy() {
    let { error, helpText, id } = this;
    let describedBy = [];

    if (error) {
      describedBy.push(errorId(id));
    }

    if (helpText) {
      describedBy.push(helpTextId(id));
    }

    return describedBy.length ? describedBy.join(' ') : undefined;
  }

  /**
   * Boolean flag indicating whether the output value should be displayed
   *
   * @type {Boolean}
   */
  @(computed('disabled', 'output').readOnly())
  get shouldShowOutput() {
    let { disabled, output } = this;
    return !disabled && output;
  }

  @action
  handleChange(event) {
    this.onChange(parseFloat(event.currentTarget.value), this.id);
  }
}
