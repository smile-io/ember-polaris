import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { htmlSafe } from '@ember/string';
import { typeOf, isPresent } from '@ember/utils';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import { getCode } from 'ember-keyboard';
import { runTask, cancelTask } from 'ember-lifeline';
import template from '../templates/components/polaris-text-field';
import { normalizeAutoCompleteProperty } from '../utils/normalize-auto-complete';

/**
 * Returns the length of decimal places in a number
 */
const dpl = (num) => (num.toString().split('.')[1] || []).length;

/**
 * Polaris text-field component.
 * See https://polaris.shopify.com/components/forms/text-field
 */
@tagName('')
@layout(template)
export default class PolarisTextField extends Component {
  /**
   * ID for the input
   *
   * @type {String}
   * @default null
   * @public
   */
  id = null;

  /**
   * Text to display before value
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  prefix = null;

  /**
   * Text to display after value
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  suffix = null;

  /**
   * Hint text to display
   *
   * @type {String}
   * @default null
   * @public
   */
  placeholder = null;

  /**
   * Initial value for the input
   *
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * Additional hint text to display
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * Label for the input
   *
   * @type {String}
   * @default null
   * @public
   */
  label = null;

  /**
   * Adds an action to the label
   *
   * @type {Object}
   * @default null
   * @public
   *
   * Currently supports:
   * { onAction, text, accessibilityLabel }
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
   * Disable the input
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  disabled = null;

  /**
   * Disable editing of the input
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  readOnly = null;

  /**
   * Automatically focus the input
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  autoFocus = null;

  /**
   * Force the focus state on the input
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  focused = null;

  /**
   * Allow for multiple lines of input
   *
   * @type {Boolean|Number}
   * @default null
   * @public
   */
  multiline = null;

  /**
   * Error to display beneath the label
   *
   * @type {String|Component|Boolean|(String|Component)[]}
   * @default null
   * @public
   */
  error = null;

  /**
   * An element connected to the right of the input
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  connectedRight = null;

  /**
   * An element connected to the left of the input
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  connectedLeft = null;

  /**
   * Determine type of input
   *
   * @type {String}
   * @default text
   * @public
   */
  type = 'text';

  /**
   * Name of the input
   *
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * Defines a specific role attribute for the input
   *
   * @type {String}
   * @default null
   * @public
   */
  role = null;

  /**
   * Limit increment value for numeric and date-time inputs
   *
   * @type {Number}
   * @default null
   * @public
   */
  step = null;

  /**
   * Enable automatic completion by the browser
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  autoComplete = null;

  /**
   * Mimics the behavior of the native HTML attribute,
   * limiting how high the spinner can increment the value
   *
   * @type {Number}
   * @default null
   * @public
   */
  max = null;

  /**
   * Maximum character length for an input
   *
   * @type {Number}
   * @default null
   * @public
   */
  maxLength = null;

  /**
   * Mimics the behavior of the native HTML attribute,
   * limiting how low the spinner can decrement the value
   *
   * @type {Number}
   * @default null
   * @public
   */
  min = null;

  /**
   * Minimum character length for an input
   *
   * @type {Number}
   * @default null
   * @public
   */
  minLength = null;

  /**
   * A regular expression to check the value against
   *
   * @type {String}
   * @default null
   * @public
   */
  pattern = null;

  /**
   * Indicate whether value should have spelling checked
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  spellCheck = null;

  /**
   * Indicates the id of a component owned by the input
   *
   * @type {String}
   * @default null
   * @public
   */
  ariaOwns = null;

  /**
   * Indicates the id of a component controlled by the input
   *
   * @type {String}
   * @default null
   * @public
   */
  ariaControls = null;

  /**
   * Indicates the id of a related component's visually focused element ot the input
   *
   * @type {String}
   * @default null
   * @public
   */
  ariaActiveDescendant = null;

  /**
   * Indicates what kind of user input completion suggestions are provided
   *
   * @type {String}
   * @default null
   * @public
   */
  ariaAutocomplete = null;

  /**
   * Indicates whether or not the character count should be displayed
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  showCharacterCount = false;

  /**
   * Callback when value is changed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onChange(/* value, id */) {}

  /**
   * Callback when input is focused
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus is removed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onBlur() {}

  buttonPressTimer = null;

  wasFocused = false;
  dataTestTextField = 'text-field';

  @bool('error')
  ariaInvalid;

  @normalizeAutoCompleteProperty('autoComplete')
  autoCompleteInputs;

  @computed(
    'normalizedValue',
    'disabled',
    'readOnly',
    'error',
    'multiline',
    'focus'
  )
  get textFieldClasses() {
    let { normalizedValue, disabled, readOnly, error, multiline, focus } = this;
    let cssClasses = ['Polaris-TextField'];

    if (normalizedValue) {
      cssClasses.push('Polaris-TextField--hasValue');
    }
    if (disabled) {
      cssClasses.push('Polaris-TextField--disabled');
    }
    if (readOnly) {
      cssClasses.push('Polaris-TextField--readOnly');
    }
    if (error) {
      cssClasses.push('Polaris-TextField--error');
    }
    if (multiline) {
      cssClasses.push('Polaris-TextField--multiline');
    }
    if (focus) {
      cssClasses.push('Polaris-TextField--focus');
    }

    return cssClasses.join(' ');
  }

  @computed('suffix')
  get inputClassName() {
    let cssClasses = ['Polaris-TextField__Input'];
    if (this.suffix) {
      cssClasses.push('Polaris-TextField__Input--suffixed');
    }

    return cssClasses.join(' ');
  }

  @computed('error', 'helpText', 'id')
  get ariaDescribedBy() {
    let { error, helpText, id } = this;
    let describedBy = [];

    if (error) {
      describedBy.push(`${id}Error`);
    }

    if (helpText) {
      describedBy.push(`${id}HelpText`);
    }

    return describedBy.join(' ');
  }

  @computed('id', 'prefix', 'suffix')
  get ariaLabelledBy() {
    let { id, prefix, suffix } = this;
    let labelledBy = [`${id}Label`];

    if (prefix) {
      labelledBy.push(`${id}Prefix`);
    }

    if (suffix) {
      labelledBy.push(`${id}Suffix`);
    }

    return labelledBy.join(' ');
  }

  @computed('type')
  get inputType() {
    let { type } = this;
    return type === 'currency' ? 'text' : type;
  }

  @computed('multiline')
  get minimumLines() {
    let { multiline } = this;
    return typeOf(multiline) === 'number' ? multiline : 1;
  }

  @computed('height', 'multiline')
  get heightStyle() {
    let { height, multiline } = this;
    return height && multiline ? htmlSafe(`height: ${height}px`) : null;
  }

  @computed('disabled', 'inputType')
  get shouldShowSpinner() {
    let { inputType, disabled } = this;
    return inputType === 'number' && !disabled;
  }

  @computed('value')
  get normalizedValue() {
    let { value } = this;
    return value != null ? value : '';
  }

  @computed('normalizedValue.length')
  get characterCount() {
    return this.normalizedValue.length || 0;
  }

  @computed('maxLength', 'characterCount')
  get characterCountLabel() {
    let { maxLength, characterCount } = this;

    return maxLength
      ? `${characterCount} characters of ${maxLength} used`
      : `${characterCount} characters`;
  }

  @computed('multiline')
  get characterCountClassName() {
    let cssClasses = ['Polaris-TextField__CharacterCount'];

    if (this.multiline) {
      cssClasses.push('Polaris-TextField__AlignFieldBottom');
    }

    return cssClasses.join(' ');
  }

  @computed('maxLength', 'characterCount')
  get characterCountText() {
    let { maxLength, characterCount } = this;
    return !maxLength ? characterCount : `${characterCount}/${maxLength}`;
  }

  @computed('focused')
  get focus() {
    return this.focused || false;
  }

  init() {
    super.init(...arguments);

    let { id } = this;
    id = id || `TextField-${guidFor(this)}`;

    this.setProperties({
      height: null,
      id,
    });

    deprecate(
      `[polaris-text-field] Passing 'dataTestTextField' argument is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.class,
      {
        id: 'ember-polaris.polaris-text-field.dataTestTextField-arg',
        until: '7.0.0',
      }
    );
  }

  @action
  handleFocusChange() {
    let { wasFocused, focused, input } = this;

    if (!wasFocused && focused) {
      input.focus();
    } else if (wasFocused && !focused) {
      input.blur();
    }

    this.set('wasFocused', focused);
  }

  @action
  setInput(element) {
    this.set('input', element);

    if (!this.focused) {
      return;
    }

    this.input.focus();
  }

  @action
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
  }

  @action
  handleButtonRelease() {
    cancelTask(this, this.buttonPressTaskId);
  }

  @action
  handleNumberChange(steps) {
    let { id, onChange, value, step, min, max } = this;

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
  }

  @action
  handleExpandingResize(height) {
    this.set('height', height);
  }

  @action
  handleChange(event) {
    this.onChange(event.target.value, this.id);
  }

  @action
  handleFocus() {
    this.set('focus', true);
  }

  @action
  handleBlur() {
    this.set('focus', false);
  }

  @action
  handleClick() {
    this.input.focus();
  }

  @action
  handleKeyPress(event) {
    let { key } = event;
    let numbersSpec = /[\d.eE+-]$/;

    if (
      this.type !== 'number' ||
      getCode(event) === 'Enter' ||
      key.match(numbersSpec)
    ) {
      return;
    }

    event.preventDefault();
  }
}
