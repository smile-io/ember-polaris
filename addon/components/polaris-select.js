import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
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
   * @type {(String|Object)[]}
   * @default []
   * @public
   */
  options = [];

  /**
   * Label for the select
   *
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
   * @type {Object}
   * @default null
   * @public
   */
  labelAction = null;

  /**
   * Visually hide the label
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden = false;

  /**
   * Show the label to the left of the value, inside the control
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  labelInline = false;

  /**
   * Disable input
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Additional text to aide in use
   *
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * Example text to display as placeholder
   *
   * @type {String}
   * @default null
   * @public
   */
  placeholder = null;

  /**
   * ID for form input
   *
   * @type {String}
   * @default null
   * @public
   */
  id = null;

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
   * @default ''
   * @public
   */
  value = '';

  /**
   * Display an error state
   *
   * @type {String|Component|Boolean}
   * @default null
   * @public
   */
  error = null;

  /**
   * Callback when selection is changed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {}

  /**
   * Callback when select is focussed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus is removed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onBlur() {}

  /**
   * Flag indicating whether an error is present
   *
   * @type {Boolean}
   */
  @bool('error')
  hasError;

  /**
   * Internal ID for form input, with a default value.
   *
   * @type {String}
   */
  // eslint disable smile-ember/order-in-components
  @computed('id')
  get _id() {
    return this.id || guidFor(this);
  }

  /**
   * Class names for select element
   *
   * @type {String}
   */
  @computed('error', 'disabled')
  get className() {
    let cssClasses = ['Polaris-Select'];

    if (this.error) {
      cssClasses.push('Polaris-Select--error');
    }

    if (this.disabled) {
      cssClasses.push('Polaris-Select--disabled');
    }

    return cssClasses.join(' ');
  }

  /**
   * Aria described-by field for accessibility
   *
   * @type {String}
   */
  @computed('_id', 'error', 'helpText')
  get describedBy() {
    let { error, helpText, _id: id } = this;
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
   * @type {Object[]}
   */
  @computed('options.[]', 'placeholder')
  get normalizedOptions() {
    let normalizedOptions = this.options.map(normalizeOption);
    if (this.placeholder) {
      normalizedOptions = [
        {
          label: this.placeholder,
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
   * @type {String}
   */
  @computed('normalizedOptions.@each.value', 'value')
  get selectedOption() {
    let { normalizedOptions: options, value } = this;
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
    this.onChange(e.currentTarget.value, this._id);
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
      options: options.map((option) =>
        isString(option) ? normalizeStringOption(option) : option
      ),
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
