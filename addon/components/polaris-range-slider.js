import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { computed } from '@ember/object';
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
export default Component.extend({
  tagName: '',

  layout,

  /**
   * Label for the range input
   *
   * @property {label}
   * @type {String}
   * @public
   */
  label: null,

  /**
   * Adds an action to the label
   *
   * @property {labelAction}
   * @type {Object}
   * @public
   */
  labelAction: null,

  /**
   * Visually hide the label
   *
   * @property {labelHidden}
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden: false,

  /**
   * ID for range input
   *
   * Defaults to Ember's internal GUID for the component instance
   *
   * @property {id}
   * @type {String}
   * @public
   */
  id: computed(function() {
    return guidFor(this);
  }),

  /**
   * Initial value for range input
   *
   * @property {value}
   * @type {Number}
   * @default 0
   * @public
   */
  value: 0,

  /**
   * Minimum possible value for range input
   *
   * @property {min}
   * @type {Number}
   * @default 0
   * @public
   */
  min: 0,

  /**
   * Maximum possible value for range input
   *
   * @property {max}
   * @type {Number}
   * @default 100
   * @public
   */
  max: 100,

  /**
   * Increment value for range input changes
   *
   * @property {step}
   * @type {Number}
   * @default null
   * @public
   */
  step: null,

  /**
   * Provide a tooltip while sliding, indicating the current value
   *
   * @property {output}
   * @type {Boolean}
   * @default false
   * @public
   */
  output: false,

  /**
   * Additional text to aid in use
   *
   * @property {helpText}
   * @type {String|Component}
   * @public
   */
  helpText: null,

  /**
   * Display an error message
   *
   * @property {error}
   * @type {String|Component}
   * @public
   */
  error: null,

  /**
   * Disable input
   *
   * @property {disabled}
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled: false,

   /**
   * Callback when the range input is changed
   *
   * @property {onChange}
   * @type {Function}
   * @default no-op
   * @public
   */
  onChange() {},

  /**
   * Callback when range input is focused
   *
   * @property {onFocus}
   * @type {Function}
   * @default no-op
   * @public
   */
  onFocus() {},

  /**
   * Callback when focus is removed
   *
   * @property {onBlur}
   * @type {Function}
   * @default no-op
   * @public
   */
  onBlur() {},

  /**
   * Class names for the range input wrapper div
   *
   * @property {rangeInputWrapperClassNames}
   * @type {String}
   * @private
   */
  rangeInputWrapperClassNames: computed('error', 'disabled', function() {
    let { error, disabled } = this.getProperties('error', 'disabled');
    let classNames = ['Polaris-RangeSlider'];

    if (error) {
      classNames.push('Polaris-RangeSlider--error');
    }

    if (disabled) {
      classNames.push('Polaris-RangeSlider--disabled');
    }

    return classNames.join(' ');
  }).readOnly(),

  /**
   * Style for the range input wrapper div
   *
   * @property {rangeInputWrapperStyle}
   * @type {String}
   * @private
   */
  rangeInputWrapperStyle: computed('min', 'max', 'value', 'sliderProgress', function() {
    let { min, max, value: current, sliderProgress } = this.getProperties('min', 'max', 'value', 'sliderProgress');
    let styleProps = assign({ min, max, current }, {
      progress: `${ sliderProgress }%`,
      outputFactor: invertNumber((sliderProgress - 50) / 100),
    });

    let styleString = Object.keys(styleProps).reduce((styleString, propName) => {
      return `${ styleString } --Polaris-RangeSlider-${ dasherize(propName) }:${ styleProps[propName] };`;
    }, '');

    return htmlSafe(styleString.trim());
  }).readOnly(),

  /**
   * Slider progress percentage
   *
   * @property {sliderProgress}
   * @type {Number}
   * @private
   */
  sliderProgress: computed('min', 'max', 'value', function() {
    let { min, max, value } = this.getProperties('min', 'max', 'value');
    return ((value - min) * 100) / (max - min);
  }).readOnly(),

  /**
   * Stringified boolean flag indicating whether an error is present
   *
   * @property {hasError}
   * @type {String}
   * @private
   */
  hasError: computed('error', function() {
    return Boolean(this.get('error')).toString();
  }).readOnly(),

  /**
   * Accessibility
   *
   * @property {ariaDescribedBy}
   * @type {Boolean}
   * @private
   */
  ariaDescribedBy: computed('error', 'helpText', function() {
    let { error, helpText, id } = this.getProperties('error', 'helpText', 'id');
    let describedBy = [];

    if (error) {
      describedBy.push(errorId(id));
    }

    if (helpText) {
      describedBy.push(helpTextId(id));
    }

    return describedBy.length ? describedBy.join(' ') : undefined;
  }).readOnly(),

  /**
   * Boolean flag indicating whether the output value should be displayed
   *
   * @property {shouldShowOutput}
   * @type {Boolean}
   * @private
   */
  shouldShowOutput: computed('disabled', 'output', function() {
    let { disabled, output } = this.getProperties('disabled', 'output');
    return !disabled && output;
  }).readOnly(),

  actions: {
    handleChange(event) {
      this.get('onChange')(parseFloat(event.currentTarget.value), this.get('id'));
    },
  }
});
