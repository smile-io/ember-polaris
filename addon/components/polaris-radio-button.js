import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-radio-button';

/**
 * Polaris radio button component.
 * See https://polaris.shopify.com/components/forms/radio-button
 */
@tagName('')
@templateLayout(layout)
export default class PolarisRadioButton extends Component {
  /**
   * Label for the radio button
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  label = null;

  /**
   * Visually hide the label
   *
   * @type {boolean}
   * @default false
   * @public
   */
  labelHidden = false;

  /**
   * Radio button is selected
   *
   * @type {boolean}
   * @default false
   * @public
   */
  checked = false;

  /**
   * Additional text to aid in use
   *
   * @type {string or React.ReactNode}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * ID for form input
   *
   * @type {string}
   * @default null
   * @public
   */
  inputId = null;

  /**
   * Name for form input
   *
   * @type {string}
   * @default null
   * @public
   */
  name = null;

  /**
   * Value for form input
   *
   * @type {string}
   * @default null
   * @public
   */
  value = null;

  /**
   * Disable the radio button
   *
   * @type {boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Callback when radio button is toggled
   *
   * @type {function}
   * @default noop
   * @public
   */
  onChange() {}

  /**
   * Callback when radio button is focussed
   *
   * @type {function}
   * @default noop
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus is removed
   *
   * @type {function}
   * @default noop
   * @public
   */
  onBlur() {}

  @(computed('inputId').readOnly())
  get _id() {
    return this.inputId || `polaris-radio-button-${guidFor(this)}`;
  }

  @(computed('helpText', '_id').readOnly())
  get describedBy() {
    return this.helpText ? `${this._id}HelpText` : null;
  }

  @action
  handleChange(event) {
    this.onChange(event.target.value);
  }
}
