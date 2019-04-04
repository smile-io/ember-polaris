import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import { typeOf } from '@ember/utils';
import { isPresent } from '@ember/utils';
import { getCode } from 'ember-keyboard';
import layout from '../templates/components/polaris-text-field';
import { normalizeAutoCompleteProperty } from '../utils/normalize-auto-complete';
import { runTask, cancelTask, runDisposables } from 'ember-lifeline';

/**
 * Returns the length of decimal places in a number
 */
const dpl = (num) => (num.toString().split('.')[1] || []).length;

/**
 * Polaris text-field component.
 * See https://polaris.shopify.com/components/forms/text-field
 */
export default Component.extend({
  tagName: '',

  layout,

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
   * Adds an action to the label
   *
   * @property labelAction
   * @public
   * @type {Object}
   * @default null
   *
   * Currently supports:
   * { onAction, text, accessibilityLabel }
   */
  labelAction: null,

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @public
   * @type {Boolean}
   * @default false
   */
  labelHidden: false,

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
   * @type {String|Component|Boolean|(String|Component)[]}
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
   * @default text
   */
  type: 'text',

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
   * Defines a specific role attribute for the input
   *
   * @property role
   * @public
   * @type {String}
   * @default null
   */
  role: null,

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
   * Indicates the id of a component owned by the input
   *
   * @property ariaOwns
   * @public
   * @type {String}
   * @default null
   */
  ariaOwns: null,

  /**
   * Indicates the id of a component controlled by the input
   *
   * @property ariaControls
   * @public
   * @type {String}
   * @default null
   */
  ariaControls: null,

  /**
   * Indicates the id of a related component's visually focused element ot the input
   *
   * @property ariaActiveDescendant
   * @public
   * @type {String}
   * @default null
   */
  ariaActiveDescendant: null,

  /**
   * Indicates what kind of user input completion suggestions are provided
   *
   * @property ariaAutocomplete
   * @public
   * @type {String}
   * @default null
   */
  ariaAutocomplete: null,

  /**
   * Indicates whether or not the character count should be displayed
   *
   * @property showCharacterCount
   * @public
   * @type {Boolean}
   * @default null
   */
  showCharacterCount: false,

  /**
   * Callback when value is changed
   *
   * @property onChange
   * @public
   * @type {Function}
   * @default noop
   */
  onChange(/* value, id */) {},

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

  /**
   * @private
   */

  buttonPressTimer: null,
  wasFocused: false,

  dataTestTextField: 'text-field',

  ariaInvalid: bool('error').readOnly(),
  autoCompleteInputs: normalizeAutoCompleteProperty('autoComplete'),

  textFieldClasses: computed(
    'normalizedValue',
    'disabled',
    'readOnly',
    'error',
    'multiline',
    'focus',
    function() {
      let {
        normalizedValue,
        disabled,
        readOnly,
        error,
        multiline,
        focus,
      } = this.getProperties(
        'normalizedValue',
        'disabled',
        'readOnly',
        'error',
        'multiline',
        'focus'
      );
      let classes = ['Polaris-TextField'];

      if (normalizedValue) {
        classes.push('Polaris-TextField--hasValue');
      }

      if (disabled) {
        classes.push('Polaris-TextField--disabled');
      }

      if (readOnly) {
        classes.push('Polaris-TextField--readOnly');
      }

      if (error) {
        classes.push('Polaris-TextField--error');
      }

      if (multiline) {
        classes.push('Polaris-TextField--multiline');
      }

      if (focus) {
        classes.push('Polaris-TextField--focus');
      }

      return classes.join(' ');
    }
  ).readOnly(),

  inputClassName: computed('suffix', function() {
    let classes = ['Polaris-TextField__Input'];
    if (this.get('suffix')) {
      classes.push('Polaris-TextField__Input--suffixed');
    }

    return classes.join(' ');
  }).readOnly(),

  ariaDescribedBy: computed('error', 'helpText', 'id', function() {
    let { error, helpText, id } = this.getProperties('error', 'helpText', 'id');
    let describedBy = [];

    if (error) {
      describedBy.push(`${id}Error`);
    }

    if (helpText) {
      describedBy.push(`${id}HelpText`);
    }

    return describedBy.join(' ');
  }).readOnly(),

  ariaLabelledBy: computed('id', function() {
    let { id, prefix, suffix } = this.getProperties('id', 'prefix', 'suffix');
    let labelledBy = [`${id}Label`];

    if (prefix) {
      labelledBy.push(`${id}Prefix`);
    }

    if (suffix) {
      labelledBy.push(`${id}Suffix`);
    }

    return labelledBy.join(' ');
  }).readOnly(),

  inputType: computed('type', function() {
    let type = this.get('type');

    return type === 'currency' ? 'text' : type;
  }).readOnly(),

  minimumLines: computed('multiline', function() {
    let multiline = this.get('multiline');

    return typeOf(multiline) === 'number' ? multiline : 1;
  }).readOnly(),

  heightStyle: computed('height', 'multiline', function() {
    let { height, multiline } = this.getProperties('height', 'multiline');

    return height && multiline ? htmlSafe(`height: ${height}px`) : null;
  }).readOnly(),

  shouldShowSpinner: computed('disabled', 'inputType', function() {
    let { inputType, disabled } = this.getProperties('inputType', 'disabled');

    return inputType === 'number' && !disabled;
  }).readOnly(),

  normalizedValue: computed('value', function() {
    let value = this.get('value');
    return value != null ? value : '';
  }).readOnly(),

  characterCount: computed('normalizedValue.length', function() {
    return this.get('normalizedValue.length') || 0;
  }).readOnly(),

  characterCountLabel: computed('maxLength', 'characterCount', function() {
    let { maxLength, characterCount } = this.getProperties(
      'maxLength',
      'characterCount'
    );

    return maxLength
      ? `${characterCount} characters of ${maxLength} used`
      : `${characterCount} characters`;
  }).readOnly(),

  characterCountClassName: computed('multiline', function() {
    let classNames = ['Polaris-TextField__CharacterCount'];

    if (this.get('multiline')) {
      classNames.push('Polaris-TextField__AlignFieldBottom');
    }

    return classNames.join(' ');
  }).readOnly(),

  characterCountText: computed('maxLength', 'characterCount', function() {
    let { maxLength, characterCount } = this.getProperties(
      'maxLength',
      'characterCount'
    );

    return !maxLength ? characterCount : `${characterCount}/${maxLength}`;
  }).readOnly(),

  focus: computed('focused', function() {
    return this.get('focused') || false;
  }).readOnly(),

  setInput() {
    this.set('input', document.querySelector(`[id='${this.get('id')}']`));
  },

  handleButtonPress(onChange) {
    let minInterval = 50;
    let decrementBy = 10;
    let interval = 200;

    let onChangeInterval = () => {
      if (interval > minInterval) {
        interval -= decrementBy;
      }

      onChange();

      this.buttonPressTaskId = runTask(this, onChangeInterval, interval);
    };

    this.buttonPressTaskId = runTask(this, onChangeInterval, interval);
  },

  handleButtonRelease() {
    cancelTask(this, this.buttonPressTaskId);
  },

  init() {
    this._super(...arguments);

    let id = this.get('id');
    id = id || `TextField-${guidFor(this)}`;

    this.setProperties({
      height: null,
      id,
    });
  },

  didInsertElement() {
    this._super(...arguments);

    this.setInput();

    if (!this.get('focused')) {
      return;
    }

    this.get('input').focus();
  },

  didUpdateAttrs() {
    this._super(...arguments);

    let { wasFocused, focused, input } = this.getProperties(
      'wasFocused',
      'focused',
      'input'
    );

    if (!wasFocused && focused) {
      input.focus();
    } else if (wasFocused && !focused) {
      input.blur();
    }

    this.set('wasFocused', focused);
  },

  willDestroyElement() {
    this._super(...arguments);
    runDisposables(this);
  },

  actions: {
    handleNumberChange(steps) {
      let { id, onChange, value, step, min, max } = this.getProperties(
        'id',
        'onChange',
        'value',
        'step',
        'min',
        'max'
      );

      step = step || 1;
      min = isPresent(min) ? min : -Infinity;
      max = isPresent(max) ? max : Infinity;

      let numericValue = value ? parseFloat(value) : 0;

      if (isNaN(numericValue)) {
        return;
      }

      // Making sure the new value has the same length of decimal places as the
      // step / value has.
      let decimalPlaces = Math.max(dpl(numericValue), dpl(step));
      let newValue = Math.min(max, Math.max(numericValue + steps * step, min));

      onChange(String(newValue.toFixed(decimalPlaces)), id);
    },

    handleExpandingResize(height) {
      this.set('height', height);
    },

    handleChange(event) {
      this.get('onChange')(event.target.value, this.get('id'));
    },

    handleFocus() {
      this.set('focus', true);
    },

    handleBlur() {
      this.set('focus', false);
    },

    handleClick() {
      let input = this.get('input');
      input.focus();
    },

    handleKeyPress(event) {
      let { key } = event;
      let type = this.get('type');
      let numbersSpec = /[\d.eE+-]$/;

      if (
        type !== 'number' ||
        getCode(event) === 'Enter' ||
        key.match(numbersSpec)
      ) {
        return;
      }

      event.preventDefault();
    },
  },
});
