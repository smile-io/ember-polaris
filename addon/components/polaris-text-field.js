import Component from '@ember/component';
import layout from '../templates/components/polaris-text-field';
import { createUniqueIDFactory } from '../utils/other';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';

const allowedTypes = [
  'text',
  'email',
  'number',
  'password',
  'search',
  'tel',
  'url',
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
  'currency'
];

/**
 * Polaris text-field component.
 * See https://polaris.shopify.com/components/forms/text-field
 */
export default Component.extend({
  classNameBindings: ['labelHidden:Polaris-Labelled--hidden'],

  layout,

  /**
   * Text to display before value
   *
   * @property prefix
   * @public
   * @type {String|Component}
   * @default null
   */
  prefix: null,

  /**
   * Text to display after value
   *
   * @property suffix
   * @public
   * @type {String|Component}
   * @default null
   */
  suffix: null,

  /**
   * Hint text to display
   *
   * @property placeholder
   * @public
   * @type {String}
   * @default null
   */
  placeholder: null,

  /**
   * Initial value for the input
   *
   * @property value
   * @public
   * @type {String}
   * @default null
   */
  value: null,

  /**
   * Additional hint text to display
   *
   * @property helpText
   * @public
   * @type {String|Component}
   * @default null
   */
  helpText: null,

  /**
   * Label for the input
   *
   * @property label
   * @public
   * @type {String}
   * @default null
   */
  label: null,

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @public
   * @type {Boolean}
   * @default null
   */
  labelHidden: null,

  /**
   * Disable the input
   *
   * @property disabled
   * @public
   * @type {Boolean}
   * @default null
   */
  disabled: null,

  /**
   * Disable editing of the input
   *
   * @property readOnly
   * @public
   * @type {Boolean}
   * @default null
   */
  readOnly: null,

  /**
   * Automatically focus the input
   *
   * @property autoFocus
   * @public
   * @type {Boolean}
   * @default null
   */
  autoFocus: null,

  /**
   * Force the focus state on the input
   *
   * @property focused
   * @public
   * @type {Boolean}
   * @default null
   */
  focused: null,

  /**
   * Allow for multiple lines of input
   *
   * @property multiline
   * @public
   * @type {Boolean|Number}
   * @default null
   */
  multiline: null,

  /**
   * Error to display beneath the label
   *
   * @property error
   * @public
   * @type {String}
   * @default null
   */
  error: null,

  /**
   * An element connected to the right of the input
   *
   * @property connectedRight
   * @public
   * @type {String|Component}
   * @default null
   */
  connectedRight: null,

  /**
   * An element connected to the left of the input
   *
   * @property connectedLeft
   * @public
   * @type {String|Component}
   * @default null
   */
  connectedLeft: null,

  /**
   * Determine type of input
   *
   * @property type
   * @public
   * @type {String}
   * @default null
   */
  type: null,

  /**
   * Name of the input
   *
   * @property name
   * @public
   * @type {String}
   * @default null
   */
  name: null,

  /**
   * ID for the input
   *
   * @property id
   * @public
   * @type {String}
   * @default null
   */
  id: null,

  /**
   * Limit increment value for numeric and date-time inputs
   *
   * @property step
   * @public
   * @type {Number}
   * @default null
   */
  step: null,

  /**
   * Enable automatic completion by the browser
   *
   * @property autoComplete
   * @public
   * @type {Boolean}
   * @default null
   */
  autoComplete: null,

  /**
   * Mimics the behavior of the native HTML attribute,
   * limiting how high the spinner can increment the value
   *
   * @property max
   * @public
   * @type {Number}
   * @default null
   */
  max: null,

  /**
   * Maximum character length for an input
   *
   * @property maxLength
   * @public
   * @type {Number}
   * @default null
   */
  maxLength: null,

  /**
   * Mimics the behavior of the native HTML attribute,
   * limiting how low the spinner can decrement the value
   *
   * @property min
   * @public
   * @type {Number}
   * @default null
   */
  min: null,

  /**
   * Minimum character length for an input
   *
   * @property minLength
   * @public
   * @type {Number}
   * @default null
   */
  minLength: null,

  /**
   * A regular expression to check the value against
   *
   * @property pattern
   * @public
   * @type {String}
   * @default null
   */
  pattern: null,

  /**
   * Indicate whether value should have spelling checked
   *
   * @property spellCheck
   * @public
   * @type {Boolean}
   * @default null
   */
  spellCheck: null,

  /**
   * Adds an action to the label
   *
   * @property labelAction
   * @public
   * @type {Function}
   * @default noop
   */
  labelAction() {},

  /**
   * Callback when value is changed
   *
   * @property onChange
   * @public
   * @type {Function}
   * @default noop
   */
  onChange(value, id) {},

  /**
   * Callback when input is focused
   *
   * @property onFocus
   * @public
   * @type {Function}
   * @default noop
   */
  onFocus() {},

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @public
   * @type {Function}
   * @default noop
   */
  onBlur() {},

  textFieldClasses: computed('value', 'disabled', 'readOnly', 'error', 'multiline', 'focus', function() {
    let { value, disabled, readOnly, error, multiline, focus } = this.getProperties('value', 'disabled', 'readOnly', 'error', 'multiline', 'focus');

    let valueClass = value ? 'Polaris-TextField--hasValue' : '';
    let disabledClass = disabled ? 'Polaris-TextField--disabled' : '';
    let readOnlyClass = readOnly ? 'Polaris-TextField--readOnly' : '';
    let errorClass = error ? 'Polaris-TextField--error' : '';
    let multilineClass = multiline ? 'Polaris-TextField--multiline' : '';
    let focusClass = focus ? 'Polaris-TextField--focus' : '';

    return `Polaris-TextField ${ valueClass } ${ disabledClass } ${ readOnlyClass } ${ errorClass } ${ multilineClass } ${ focusClass }`;
  }),

  inputType: computed('type', function() {
    let type = this.get('type');

    return type === 'currency' ? 'text' : type;
  }),

  input: computed('multiline', function() {
    let multiline = this.get('multiline');
    return multiline ? 'textarea' : 'input';
  }),

  // prefixMarkup: build in template

  // suffixMarkup: build in template

  // spinnerMarkup: build in template

  // TODO: resizer and style/height?

  // TODO: describedBy

  // TODO: labelledBy


  init() {
    let { id, type } = this.getProperties('id', 'type');

    assert(`ember-polaris::polaris-text-field - ${ type } is not a valid type.`, allowedTypes.indexOf(type) > -1);

    id = id || createUniqueIDFactory('TextField');

    this.setProperties({
      height: null,
      focus: false,
      id
    });
  },

  didReceiveAttrs() {
    let { input, focused } = this.getProperties('input', 'focused');

    if (input && focused) {
      input.focus();
    }
  }
});
