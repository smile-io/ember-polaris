import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/polaris-radio-button';

/**
 * Polaris radio button component.
 * See https://polaris.shopify.com/components/forms/radio-button
 */
export default Component.extend({
  // Tagless component, renders a `polaris-choice` component internally.
  tagName: '',

  layout,

  /**
   * Label for the radio button
   *
   * @property label
   * @type {String|Component}
   * @default null
   * @public
   */
  label: null,

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @type {boolean}
   * @default false
   * @public
   */
  labelHidden: false,

  /**
   * Radio button is selected
   *
   * @property checked
   * @type {boolean}
   * @default false
   * @public
   */
  checked: false,

  /**
   * Additional text to aid in use
   *
   * @property helpText
   * @type {string or React.ReactNode}
   * @default null
   * @public
   */
  helpText: null,

  /**
   * ID for form input
   *
   * @property inputId
   * @type {string}
   * @default null
   * @public
   */
  inputId: null,

  /**
   * Name for form input
   *
   * @property name
   * @type {string}
   * @default null
   * @public
   */
  name: null,

  /**
   * Value for form input
   *
   * @property value
   * @type {string}
   * @default null
   * @public
   */
  value: null,

  /**
   * Disable the radio button
   *
   * @property disabled
   * @type {boolean}
   * @default false
   * @public
   */
  disabled: false,

  /**
   * Callback when radio button is toggled
   *
   * @property onChange
   * @type {function}
   * @default noop
   * @public
   */
  onChange() {},

  /**
   * Callback when radio button is focussed
   *
   * @property onFocus
   * @type {function}
   * @default noop
   * @public
   */
  onFocus() {},

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @type {function}
   * @default noop
   * @public
   */
  onBlur() {},

  /**
   * @private
   */
  _id: computed('inputId', function() {
    return this.get('inputId') || `polaris-radio-button-${guidFor(this)}`;
  }).readOnly(),

  /**
   * @private
   */
  describedBy: computed('helpText', '_id', function() {
    const helpText = this.get('helpText');
    return helpText ? `${this.get('_id')}HelpText` : null;
  }).readOnly(),
});
