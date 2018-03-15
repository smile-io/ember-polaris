import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { typeOf } from '@ember/utils';
import { equal } from '@ember/object/computed';
import layout from '../templates/components/polaris-checkbox';

/**
 * Polaris checkbox component.
 * See https://polaris.shopify.com/components/forms/checkbox
 */
export default Component.extend({
  // Tagless component, renders a `polaris-choice` component internally.
  tagName: '',

  layout,

  /**
   * Label for the checkbox
   *
   * @property label
   * @public
   * @type {string}
   * @default null
   */
  label: null,

  /**
   * Component to render for the checkbox's label
   *
   * @property labelComponent
   * @public
   * @type {string | component}
   * @default null
   */
  labelComponent: null,

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @public
   * @type {boolean}
   * @default false
   */
  labelHidden: false,

  /**
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   *
   * @property checked
   * @public
   * @type {boolean/String}
   * @default false
   */
  checked: false,

  /**
   * Additional text to aide in use
   *
   * @property helpText
   * @public
   * @type {string}
   * @default null
   */
  helpText: null,

  /**
   * ID for form input
   *
   * @property inputId
   * @public
   * @type {string}
   * @default null
   */
  inputId: null,

  /**
   * Name for form input
   *
   * @property name
   * @public
   * @type {string}
   * @default null
   */
  name: null,

  /**
   * Value for form input
   *
   * @property value
   * @public
   * @type {string}
   * @default null
   */
  value: null,

  /**
   * Display an error state
   *
   * @property error
   * @public
   * @type {string}
   * @default null
   */
  error: null,

  /**
   * Disable the checkbox
   *
   * @property disabled
   * @public
   * @type {boolean}
   * @default false
   */
  disabled: false,

  /**
   * Callback when checkbox is toggled
   *
   * @property onChange
   * @public
   * @type {function}
   * @default noop
   */
  onChange() {},

  /**
   * Callback when checkbox is focussed
   *
   * @property onFocus
   * @public
   * @type {function}
   * @default noop
   */
  onFocus() {},

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @public
   * @type {function}
   * @default noop
   */
  onBlur() {},

  /*
   * Internal properties.
   */
  isIndeterminate: equal('checked', 'indeterminate').readOnly(),

  isChecked: computed('isIndeterminate', 'checked', function() {
    return !this.get('isIndeterminate') && Boolean(this.get('checked'));
  }).readOnly(),

  checkedState: computed('isIndeterminate', 'isChecked', function() {
    return this.get('isIndeterminate') ? 'mixed' : `${ this.get('isChecked') }`;
  }).readOnly(),

  checkboxClasses: computed('isIndeterminate', function() {
    let classNames = ['Polaris-Checkbox__Input'];

    if (this.get('isIndeterminate')) {
      classNames.push('Polaris-Checkbox__Input--indeterminate');
    }

    return classNames.join(' ');
  }).readOnly(),

  _id: computed('inputId', function() {
    return this.get('inputId') || `polaris-checkbox-${ guidFor(this) }`;
  }).readOnly(),

  describedBy: computed('error', 'helpText', '_id', function() {
    let describedBy = [];
    const { error, helpText } = this.getProperties('error', 'helpText');

    if (typeOf(error) === 'string') {
      describedBy.push(`${ this.get('_id') }Error`);
    }

    if (helpText) {
      describedBy.push(`${ this.get('_id') }HelpText`);
    }

    return describedBy.join(' ');
  }).readOnly(),
});
