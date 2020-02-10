import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { dasherize, htmlSafe } from '@ember/string';
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
@classic
@tagName('')
@templateLayout(layout)
export default class PolarisRangeSlider extends Component {
  /**
   * ID for range input
   *
   * Defaults to Ember's internal GUID for the component instance
   *
   * @property {id}
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
   * @property {label}
   * @type {String}
   * @public
   */
  label = null;

  /**
   * Adds an action to the label
   *
   * @property {labelAction}
   * @type {Object}
   * @public
   */
  labelAction = null;

  /**
   * Visually hide the label
   *
   * @property {labelHidden}
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden = false;

  /**
   * Initial value for range input
   *
   * @property {value}
   * @type {Number}
   * @default 0
   * @public
   */
  value = 0;

  /**
   * Minimum possible value for range input
   *
   * @property {min}
   * @type {Number}
   * @default 0
   * @public
   */
  min = 0;

  /**
   * Maximum possible value for range input
   *
   * @property {max}
   * @type {Number}
   * @default 100
   * @public
   */
  max = 100;

  /**
   * Increment value for range input changes
   *
   * @property {step}
   * @type {Number}
   * @default null
   * @public
   */
  step = null;

  /**
   * Provide a tooltip while sliding, indicating the current value
   *
   * @property {output}
   * @type {Boolean}
   * @default false
   * @public
   */
  output = false;

  /**
   * Additional text to aid in use
   *
   * @property {helpText}
   * @type {String|Component}
   * @public
   */
  helpText = null;

  /**
   * Display an error message
   *
   * @property {error}
   * @type {String|Component}
   * @public
   */
  error = null;

  /**
   * Disable input
   *
   * @property {disabled}
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Element to display before the input
   *
   * @property prefix
   * @type {String|Component}
   * @default null
   * @public
   */
  prefix = null;

  /**
   * Element to display after the input
   *
   * @property suffix
   * @type {String|Component}
   * @default null
   * @public
   */
  suffix = null;

  /**
   * Callback when the range input is changed
   *
   * @property {onChange}
   * @type {Function}
   * @default no-op
   * @public
   */
  onChange() {}

  /**
   * Callback when range input is focused
   *
   * @property {onFocus}
   * @type {Function}
   * @default no-op
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus is removed
   *
   * @property {onBlur}
   * @type {Function}
   * @default no-op
   * @public
   */
  onBlur() {}

  dataTestRangeSlider = true;

  /**
   * Class names for the range wrapper div
   *
   * @property {rangeWrapperClassNames}
   * @type {String}
   * @private
   */
  @(computed('error', 'disabled').readOnly())
  get rangeWrapperClassNames() {
    let { error, disabled } = this.getProperties('error', 'disabled');
    let classNames = ['Polaris-RangeSlider'];

    if (error) {
      classNames.push('Polaris-RangeSlider--error');
    }

    if (disabled) {
      classNames.push('Polaris-RangeSlider--disabled');
    }

    return classNames.join(' ');
  }

  /**
   * Style for the range wrapper div
   *
   * @property {rangeWrapperStyle}
   * @type {String}
   * @private
   */
  @(computed('min', 'max', 'value', 'sliderProgress').readOnly())
  get rangeWrapperStyle() {
    let { min, max, value: current, sliderProgress } = this.getProperties(
      'min',
      'max',
      'value',
      'sliderProgress'
    );
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
   * @property {sliderProgress}
   * @type {Number}
   * @private
   */
  @(computed('min', 'max', 'value').readOnly())
  get sliderProgress() {
    let { min, max, value } = this.getProperties('min', 'max', 'value');
    return ((value - min) * 100) / (max - min);
  }

  /**
   * Stringified boolean flag indicating whether an error is present
   *
   * @property {hasError}
   * @type {String}
   * @private
   */
  @(computed('error').readOnly())
  get hasError() {
    return Boolean(this.get('error')).toString();
  }

  /**
   * Accessibility
   *
   * @property {ariaDescribedBy}
   * @type {Boolean}
   * @private
   */
  @(computed('error', 'helpText').readOnly())
  get ariaDescribedBy() {
    let { error, helpText, id } = this.getProperties('error', 'helpText', 'id');
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
   * @property {shouldShowOutput}
   * @type {Boolean}
   * @private
   */
  @(computed('disabled', 'output').readOnly())
  get shouldShowOutput() {
    let { disabled, output } = this.getProperties('disabled', 'output');
    return !disabled && output;
  }

  @action
  handleChange(event) {
    this.get('onChange')(
      parseFloat(event.currentTarget.value),
      this.get('id')
    );
  }
}
