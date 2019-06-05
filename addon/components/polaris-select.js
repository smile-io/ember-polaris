import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { errorId, helpTextId } from '@smile-io/ember-polaris/utils/id';
import { isGroup } from '@smile-io/ember-polaris/helpers/polaris-select/is-group';
import layout from '../templates/components/polaris-select';

const PLACEHOLDER_VALUE = '';

@tagName('')
@templateLayout(layout)
export default class PolarisSelect extends Component {
  /**
   * List of options or option groups to choose from
   *
   * Options may be either simple string values, or
   * objects with the following properties:
   *
   *  value: String. Machine value of the option; this is the value passed to `onChange`
   *  label: String. Human-readable text for the option
   *  disabled: Boolean. Option will be visible, but not selectable
   *
   * Groups are represented by objects with these properties:
   *
   *  title: String. Title for the group
   *  options: (String|Object)[]. List of options
   *
   * @property options
   * @type {(String|Object)[]}
   * @default null
   * @public
   */
  options = null;

  /**
   * Label for the select
   *
   * @property label
   * @type {String}
   * @default null
   * @public
   */
  label = null;

  /**
   * Adds an action to the label
   *
   * Object with the following optional properties:
   *
   *  text: String. Content the action displays
   *  onAction: Function. Callback when an action takes place
   *
   * @property labelAction
   * @type {Object}
   * @default null
   * @public
   */
  labelAction = null;

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
   * Show the label to the left of the value, inside the control
   *
   * @property labelInline
   * @type {Boolean}
   * @default false
   * @public
   */
  labelInline = false;

  /**
   * Disable input
   *
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Additional text to aide in use
   *
   * @property helpText
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * Example text to display as placeholder
   *
   * @property placeholder
   * @type {String}
   * @default null
   * @public
   */
  placeholder = null;

  /* eslint smile-ember/order-in-components: 'off' */
  /**
   * ID for form input
   *
   * @property id
   * @type {String}
   * @default null
   * @public
   */
  id = null;

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
   * @default ''
   * @public
   */
  value = '';

  /**
   * Display an error state
   *
   * @property error
   * @type {String|Component|Boolean}
   * @default null
   * @public
   */
  error = null;

  /**
   * Callback when selection is changed
   *
   * @property onChange
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {}

  /**
   * Callback when select is focussed
   *
   * @property onFocus
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus is removed
   *
   * @property onBlur
   * @type {Function}
   * @default noop
   * @public
   */
  onBlur() {}

  /**
   * Flag indicating whether an error is present
   *
   * @property hasError
   * @type {Boolean}
   * @private
   */
  @(bool('error').readOnly())
  hasError;

  /**
   * Internal ID for form input, with a default value.
   *
   * @property id
   * @type {String}
   * @private
   */
  // eslint disable smile-ember/order-in-components
  @(computed('id').readOnly())
  get _id() {
    return this.get('id') || guidFor(this);
  }

  /**
   * Class names for select element
   *
   * @property className
   * @type {String}
   * @private
   */
  @(computed('error', 'disabled').readOnly())
  get className() {
    let classNames = ['Polaris-Select'];

    if (this.get('error')) {
      classNames.push('Polaris-Select--error');
    }

    if (this.get('disabled')) {
      classNames.push('Polaris-Select--disabled');
    }

    return classNames.join(' ');
  }

  /**
   * Aria described-by field for accessibility
   *
   * @property describedBy
   * @type {String}
   * @private
   */
  @(computed('error', 'helpText').readOnly())
  get describedBy() {
    let { error, helpText, _id: id } = this.getProperties(
      'error',
      'helpText',
      '_id'
    );
    let describedBy = [];

    if (helpText) {
      describedBy.push(helpTextId(id));
    }

    if (error) {
      describedBy.push(errorId(id));
    }

    return describedBy.length ? describedBy.join(' ') : undefined;
  }

  /**
   * Options processed into a renderable state.
   *
   * @property normalizedOptions
   * @type {Object[]}
   * @private
   */
  @(computed('options.[]', 'placeholder').readOnly())
  get normalizedOptions() {
    let options = this.get('options') || [];

    let normalizedOptions = options.map(normalizeOption);

    let placeholder = this.get('placeholder');
    if (placeholder) {
      normalizedOptions = [
        {
          label: placeholder,
          value: PLACEHOLDER_VALUE,
          disabled: true,
        },
        ...normalizedOptions,
      ];
    }

    return normalizedOptions;
  }

  /**
   * Gets the text to display in the UI, for the currently selected option
   *
   * @property selectedOption
   * @type {String}
   * @private
   */
  @(computed('normalizedOptions.@each.value', 'value').readOnly())
  get selectedOption() {
    let { normalizedOptions: options, value } = this.getProperties(
      'normalizedOptions',
      'value'
    );
    let flatOptions = flattenOptions(options);
    let selectedOption = flatOptions.find((option) => value === option.value);

    if (selectedOption === undefined) {
      // Get the first visible option (not the hidden placeholder)
      selectedOption = flatOptions.find((option) => !option.hidden);
    }

    return selectedOption ? selectedOption.label : '';
  }

  @action
  handleChange(e) {
    this.onChange(e.currentTarget.value, this.get('_id'));
  }
}

function isString(option) {
  return typeof option === 'string';
}

function normalizeStringOption(option) {
  return {
    label: option,
    value: option,
  };
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(option) {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    let { title, options } = option;
    return {
      title,
      options: options.map((option) => {
        return isString(option) ? normalizeStringOption(option) : option;
      }),
    };
  }

  return option;
}

/**
 * Ungroups an options array
 */
function flattenOptions(options) {
  let flatOptions = [];

  options.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });

  return flatOptions;
}
