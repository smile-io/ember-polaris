import Component from '@ember/component';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { errorId, helpTextId } from '@smile-io/ember-polaris/utils/id';
import layout from '../templates/components/polaris-select';

export default Component.extend({
  layout,

  /**
   * List of options or option groups to choose from
   *
   * @property options
   * @type {Object[]}
   * @default null
   * @public
   */
  options: null,

  /**
   * Label for the select
   *
   * @property label
   * @type {String}
   * @default null
   * @public
   */
  label: null,

  /**
   * Adds an action to the label
   *
   * @property labelAction
   * @type {Object}
   * @default null
   * @public
   */
  labelAction: null,

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden: false,

  /**
   * Show the label to the left of the value, inside the control
   *
   * @property labelInline
   * @type {Boolean}
   * @default false
   * @public
   */
  labelInline: false,

  /**
   * Disable input
   *
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled: false,

  /**
   * Additional text to aide in use
   *
   * @property helpText
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  helpText: null,

  /**
   * Example text to display as placeholder
   *
   * @property placeholder
   * @type {String}
   * @default null
   * @public
   */
  placeholder: null,

  /**
   * ID for form input
   *
   * @property id
   * @type {String}
   * @default null
   * @public
   */
  id: null,

  /**
   * Name for form input
   *
   * @property name
   * @type {String}
   * @default null
   * @public
   */
  name: null,

  /**
   * Value for form input
   *
   * @property value
   * @type {String}
   * @default ''
   * @public
   */
  value: '',

  /**
   * Display an error state
   *
   * @property error
   * @type {Object|Boolean}
   * @default null
   * @public
   */
  error: null,

  /**
   * Callback when selection is changed
   *
   * @property onChange
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {},

  /**
   * Callback when select is focussed
   *
   * @property onFocus
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus() {},

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @type {Function}
   * @default noop
   * @public
   */
  onBlur() {},

  /**
   * Flag indicating whether an error is present
   *
   * @property hasError
   * @type {Boolean}
   * @private
   */
  hasError: bool('error').readOnly(),

  /**
   * Class names for select element
   *
   * @property className
   * @type {String}
   * @private
   */
  className: computed('error', 'disabled', function() {
    let classNames = ['Polaris-Select'];

    if (this.get('error')) {
      classNames.push('Polaris-Select--error');
    }

    if (this.get('disabled')) {
      classNames.push('Polaris-Select--disabled');
    }

    return classNames.join(' ');
  }).readOnly(),

  /**
   * Aria described-by field for accessibility
   *
   * @property describedBy
   * @type {String}
   * @private
   */
  describedBy: computed('error', 'helpText', function() {
    let { error, helpText, id } = this.getProperties('error', 'helpText', 'id');
    let describedBy = [];

    if (helpText) {
      describedBy.push(helpTextId(id));
    }

    if (error) {
      describedBy.push(errorId(id));
    }

    return describedBy.length ? describedBy.join(' ') : undefined;
  }).readOnly(),

  actions: {
    handleChange({ value }) {
      this.onChange(value, this.get('id'));
    },
  },
});
