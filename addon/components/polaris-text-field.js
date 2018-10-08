import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import { typeOf } from '@ember/utils';
import { isPresent } from '@ember/utils';
import ContextBoundTasksMixin from 'ember-lifeline/mixins/run';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import layout from '../templates/components/polaris-text-field';

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
  'currency',
];

/**
 * Returns the length of decimal places in a number
 */
const dpl = (num) => (num.toString().split('.')[1] || []).length;

/**
 * Polaris text-field component.
 * See https://polaris.shopify.com/components/forms/text-field
 */
export default Component.extend(
  ContextBoundTasksMixin,
  ContextBoundEventListenersMixin,
  {
    classNameBindings: ['labelHidden:Polaris-Labelled--hidden'],

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
     * @type {String|Component}
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

    ariaInvalid: bool('error').readOnly(),

    textFieldClasses: computed(
      'value',
      'disabled',
      'readOnly',
      'error',
      'multiline',
      'focus',
      function() {
        let {
          value,
          disabled,
          readOnly,
          error,
          multiline,
          focus,
        } = this.getProperties(
          'value',
          'disabled',
          'readOnly',
          'error',
          'multiline',
          'focus'
        );
        let classes = ['Polaris-TextField'];

        if (value) {
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

    ariaDescribedBy: computed('error', 'helpText', 'id', function() {
      let { error, helpText, id } = this.getProperties(
        'error',
        'helpText',
        'id'
      );
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
      return `${this.get('id')}Label`;
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

    addValueListener() {
      this.addEventListener('input, textarea', 'keyup', () => {
        this.debounceTask('debouncedUpdateValue', 250);
      });
    },

    debouncedUpdateValue() {
      let field = this.get('fieldElement');
      this.set('value', field.value);
    },

    checkFocus() {
      let { fieldElement, focused } = this.getProperties(
        'fieldElement',
        'focused'
      );

      if (fieldElement && focused) {
        fieldElement.focus();
      }
    },

    init() {
      this._super(...arguments);

      let { id, type } = this.getProperties('id', 'type');

      assert(
        `ember-polaris::polaris-text-field - ${type} is not a valid type.`,
        allowedTypes.indexOf(type) > -1
      );

      id = id || `TextField-${guidFor(this)}`;

      this.setProperties({
        height: null,
        focus: false,
        id,
      });
    },

    didReceiveAttrs() {
      this._super(...arguments);

      this.checkFocus();
    },

    didInsertElement() {
      this._super(...arguments);

      this.set('fieldElement', this.element.querySelector('input, textarea'));
      this.addValueListener();
      this.checkFocus();
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
        let newValue = Math.min(
          max,
          Math.max(numericValue + steps * step, min)
        );

        onChange(String(newValue.toFixed(decimalPlaces)), id);
      },

      handleExpandingResize(height) {
        this.set('height', height);
      },

      handleChange(e) {
        this.get('onChange')(e.target.value, this.get('id'));
      },

      handleFocus() {
        this.set('focus', true);
      },

      handleBlur() {
        this.set('focus', false);
      },

      handleClick() {
        let field = this.get('fieldElement');
        field.focus();
      },
    },
  }
);
