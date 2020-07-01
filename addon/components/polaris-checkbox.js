import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-checkbox';

/**
 * Polaris checkbox component.
 * See https://polaris.shopify.com/components/forms/checkbox
 */
@tagName('')
@layout(template)
export default class PolarisCheckbox extends Component {
  /**
   * Label for the checkbox
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  label = null;

  /**
   * Visually hide the label
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden = false;

  /**
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   *
   * @type {Boolean/String}
   * @default false
   * @public
   */
  checked = false;

  /**
   * Additional text to aide in use
   *
   * @type {String}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * ID for form input
   *
   * @type {String}
   * @default null
   * @public
   */
  inputId = null;

  /**
   * Name for form input
   *
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * Value for form input
   *
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * Display an error state
   *
   * @type {String|Boolean}
   * @default null
   * @public
   */
  error = null;

  /**
   * Disable the checkbox
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Callback when checkbox is toggled
   *
   * @type {function}
   * @default noop
   * @public
   */
  onChange() {}

  /**
   * Callback when checkbox is focussed
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

  @equal('checked', 'indeterminate')
  isIndeterminate;

  @computed('isIndeterminate', 'checked')
  get isChecked() {
    return !this.isIndeterminate && Boolean(this.checked);
  }

  @computed('isIndeterminate', 'isChecked')
  get checkedState() {
    return this.isIndeterminate ? 'mixed' : `${this.isChecked}`;
  }

  @computed('isIndeterminate')
  get checkboxClasses() {
    let cssClasses = ['Polaris-Checkbox__Input'];

    if (this.isIndeterminate) {
      cssClasses.push('Polaris-Checkbox__Input--indeterminate');
    }

    return cssClasses.join(' ');
  }

  @computed('inputId')
  get _id() {
    return this.inputId || `polaris-checkbox-${guidFor(this)}`;
  }

  @computed('error', 'helpText', '_id')
  get describedBy() {
    let describedBy = [];
    const { error, helpText } = this;

    if (error) {
      describedBy.push(`${this._id}Error`);
    }

    if (helpText) {
      describedBy.push(`${this._id}HelpText`);
    }

    return describedBy.length ? describedBy.join(' ') : undefined;
  }

  @action
  handleChange(event) {
    let { onChange, inputId, checked } = this;
    if (onChange == null) {
      return;
    }

    let { currentTarget } = event;
    onChange(currentTarget.checked, inputId);

    if (checked && !currentTarget.checked) {
      currentTarget.focus();
    }
  }
}
