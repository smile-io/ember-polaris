import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { typeOf } from '@ember/utils';
import layout from '../templates/components/polaris-checkbox';

/**
 * Polaris checkbox component.
 * See https://polaris.shopify.com/components/forms/checkbox
 */
export default Component.extend({
  // Tagless component, renders a `polaris-choice` component internally.
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * Label for the checkbox
   *
   * @property label
   * @type {string}
   * @default null
   */
  label: null,

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @type {boolean}
   * @default false
   */
  labelHidden: false,

  /**
   * Checkbox is selected
   *
   * @property checked
   * @type {boolean}
   * @default false
   */
  checked: false,

  /**
   * Additional text to aide in use
   *
   * @property helpText
   * @type {string}
   * @default null
   */
  helpText: null,

  /**
   * ID for form input
   *
   * @property inputId
   * @type {string}
   * @default null
   */
  inputId: null,

  /**
   * Name for form input
   *
   * @property name
   * @type {string}
   * @default null
   */
  name: null,

  /**
   * Value for form input
   *
   * @property value
   * @type {string}
   * @default null
   */
  value: null,

  /**
   * Display an error state
   *
   * @property error
   * @type {string}
   * @default null
   */
  error: null,

  /**
   * Disable the checkbox
   *
   * @property disabled
   * @type {boolean}
   * @default false
   */
  disabled: false,

  /**
   * Callback when checkbox is toggled
   *
   * @property onChange
   * @type {function}
   * @default noop
   */
  onChange() {},

  /**
   * Callback when checkbox is focussed
   *
   * @property onFocus
   * @type {function}
   * @default noop
   */
  onFocus() {},

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @type {function}
   * @default noop
   */
  onBlur() {},

  /*
   * Internal properties.
   */
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
