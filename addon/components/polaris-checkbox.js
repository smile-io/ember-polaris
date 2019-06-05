import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { deprecate } from '@ember/debug';
import layout from '../templates/components/polaris-checkbox';

/**
 * Polaris checkbox component.
 * See https://polaris.shopify.com/components/forms/checkbox
 */
@tagName('')
@templateLayout(layout)
export default class PolarisCheckbox extends Component {
  /**
   * Label for the checkbox
   *
   * @property label
   * @type {String|Component}
   * @default null
   * @public
   */
  label = null;

  /**
   * Component to render for the checkbox's label
   *
   * DEPRECATED: pass the component as `label` instead.
   *
   * @property labelComponent
   * @type {String | Component}
   * @default null
   * @deprecated
   * @public
   */
  labelComponent = null;

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden = false;

  /**
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   *
   * @property checked
   * @type {Boolean/String}
   * @default false
   * @public
   */
  checked = false;

  /**
   * Additional text to aide in use
   *
   * @property helpText
   * @type {String}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * ID for form input
   *
   * @property inputId
   * @type {String}
   * @default null
   * @public
   */
  inputId = null;

  /**
   * Name for form input
   *
   * @property name
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * Value for form input
   *
   * @property value
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * Display an error state
   *
   * @property error
   * @type {String|Boolean}
   * @default null
   * @public
   */
  error = null;

  /**
   * Disable the checkbox
   *
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Callback when checkbox is toggled
   *
   * @property onChange
   * @type {function}
   * @default noop
   * @public
   */
  onChange() {}

  /**
   * Callback when checkbox is focussed
   *
   * @property onFocus
   * @type {function}
   * @default noop
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @type {function}
   * @default noop
   * @public
   */
  onBlur() {}

  /**
   * @private
   */
  @(equal('checked', 'indeterminate').readOnly())
  isIndeterminate;

  /**
   * @private
   */
  @(computed('isIndeterminate', 'checked').readOnly())
  get isChecked() {
    return !this.get('isIndeterminate') && Boolean(this.get('checked'));
  }

  /**
   * @private
   */
  @(computed('isIndeterminate', 'isChecked').readOnly())
  get checkedState() {
    return this.get('isIndeterminate') ? 'mixed' : `${this.get('isChecked')}`;
  }

  /**
   * @private
   */
  @(computed('isIndeterminate').readOnly())
  get checkboxClasses() {
    let classNames = ['Polaris-Checkbox__Input'];

    if (this.get('isIndeterminate')) {
      classNames.push('Polaris-Checkbox__Input--indeterminate');
    }

    return classNames.join(' ');
  }

  /**
   * @private
   */
  @(computed('inputId').readOnly())
  get _id() {
    return this.get('inputId') || `polaris-checkbox-${guidFor(this)}`;
  }

  /**
   * @private
   */
  @(computed('error', 'helpText', '_id').readOnly())
  get describedBy() {
    let describedBy = [];
    const { error, helpText } = this.getProperties('error', 'helpText');

    if (error) {
      describedBy.push(`${this.get('_id')}Error`);
    }

    if (helpText) {
      describedBy.push(`${this.get('_id')}HelpText`);
    }

    return describedBy.length ? describedBy.join(' ') : undefined;
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    deprecate(
      'Passing an explicit `labelComponent` to `polaris-checkbox` is deprecated - pass the component as `label` instead',
      !this.get('labelComponent'),
      {
        id: 'ember-polaris.polaris-checkbox.label-component',
        until: '2.0.0',
      }
    );
  }

  @action
  handleChange(event) {
    let { onChange, inputId, checked } = this.getProperties(
      'onChange',
      'inputId',
      'checked'
    );
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
