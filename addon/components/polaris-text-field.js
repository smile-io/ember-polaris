import Ember from 'ember';
import layout from '../templates/components/polaris-text-field';
import mapEventToAction from '../utils/map-event-to-action';
import { invokeAction } from 'ember-invoke-action';

const {
  Component,
  computed,
} = Ember;

const {
  notEmpty,
} = computed;

export default Component.extend({
  layout,

  /*
   * Public attributes.
   */
  /**
   * Text to display before value
   *
   * @property prefix
   * @type React.ReactNode
   * @default null
   * TODO: not implemented
   */
  prefix: null,

  /**
   * Text to display after value
   *
   * @property suffix
   * @type React.ReactNode
   * @default null
   * TODO: not implemented
   */
  suffix: null,

  /**
   * Hint text to display
   *
   * @property placeholder
   * @type string
   * @default null
   */
  placeholder: null,

  /**
   * Initial value for the input
   *
   * @property value
   * @type string
   * @default null
   */
  value: null,

  /**
   * Additional hint text to display
   *
   * @property helpText
   * @type React.ReactNode
   * @default null
   * TODO: not implemented
   */
  helpText: null,

  /**
   * Label for the input
   *
   * @property label
   * @type string
   * @default null
   */
  label: null,

  /**
   * Adds an action to the label
   *
   * @property labelAction
   * @type Action
   * @default null
   * TODO: not implemented
   */
  labelAction: null,

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @type boolean
   * @default null
   * TODO: not implemented
   */
  labelHidden: null,

  /**
   * Disable the input
   *
   * @property disabled
   * @type boolean
   * @default null
   */
  disabled: null,

  /**
   * Disable editing of the input
   *
   * @property readOnly
   * @type boolean
   * @default null
   */
  readOnly: null,

  /**
   * Automatically focus the input
   *
   * @property autoFocus
   * @type boolean
   * @default null
   * TODO: not implemented
   */
  autoFocus: null,

  /**
   * Allow for multiple lines of input
   *
   * @property multiline
   * @type boolean or number
   * @default null
   * TODO: not implemented
   */
  multiline: null,

  /**
   * Error to display beneath the label
   *
   * @property error
   * @type boolean or string
   * @default null
   * TODO: not implemented
   */
  error: null,

  /**
   * An element connected to the right of the input
   *
   * @property connectedRight
   * @type React.ReactNode
   * @default null
   * TODO: not implemented
   */
  connectedRight: null,

  /**
   * An element connected to the left of the input
   *
   * @property connectedLeft
   * @type React.ReactNode
   * @default null
   * TODO: not implemented
   */
  connectedLeft: null,

  /**
   * Determine type of input
   *
   * @property type
   * @type enum
   * @default null
   * TODO: not implemented
   */
  type: null,

  /**
   * Name of the input
   *
   * @property name
   * @type string
   * @default null
   */
  name: null,

  /**
   * ID for the input
   *
   * Note that this is renamed from the React component to avoid Ember issues.
   *
   * @property id
   * @type string
   * @default null
   */
  inputId: null,

  /**
   * Limit increment value for numeric and date-time inputs
   *
   * @property step
   * @type number
   * @default null
   * TODO: not implemented
   */
  step: null,

  /**
   * Enable automatic completion by the browser
   *
   * @property autoComplete
   * @type boolean
   * @default null
   * TODO: not implemented
   */
  autoComplete: null,

  /**
   * Maximum value for a numeric or date-time input
   *
   * @property max
   * @type number
   * @default null
   * TODO: not implemented
   */
  max: null,

  /**
   * Maximum character length for an input
   *
   * @property maxLength
   * @type number
   * @default null
   * TODO: not implemented
   */
  maxLength: null,

  /**
   * Minimum value for a numeric or date-time input
   *
   * @property min
   * @type number
   * @default null
   * TODO: not implemented
   */
  min: null,

  /**
   * Minimum character length for an input
   *
   * @property minLength
   * @type number
   * @default null
   * TODO: not implemented
   */
  minLength: null,

  /**
   * A regular expression to check the value against
   *
   * @property pattern
   * @type string
   * @default null
   * TODO: not implemented
   */
  pattern: null,

  /**
   * Indicate whether value should have spelling checked
   *
   * @property spellCheck
   * @type boolean
   * @default null
   * TODO: not implemented
   */
  spellCheck: null,

  /**
   * Callback when value is changed
   *
   * @property onChange
   * @type function(value: string)
   * @default null
   * TODO: not implemented
   */
  onChange: null,

  /**
   * Callback when input is focused
   *
   * @property onFocus
   * @type function()
   * @default null
   * TODO: not implemented
   */
  onFocus: null,

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @type function()
   * @default null
   * TODO: not implemented
   */
  onBlur: null,

  /*
   * Internal properties.
   */
  hasValue: notEmpty('value'),
  labelId: computed('inputId', function() {
    return `${this.get('inputId')}Label`;
  }).readOnly(),

  /**
   * Action handlers.
   */
  focusIn: mapEventToAction('onFocus'),
  focusOut: mapEventToAction('onBlur'),

  actions: {
    onUpdate(value) {
      return invokeAction(this, 'onChange', value);
    }
  }
});
