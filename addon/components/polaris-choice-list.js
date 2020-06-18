import Component from '@ember/component';
import { get, action, computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isEmpty } from '@ember/utils';
import ObjectProxy from '@ember/object/proxy';
import { tagName, layout } from '@ember-decorators/component';
import { errorId } from '../utils/id';
import template from '../templates/components/polaris-choice-list';

// Wrapper class to add an `isSelected` flag to the supplied choices.
class CheckedChoice extends ObjectProxy {
  selected = [];

  @computed('content.value', 'selected.[]', 'value')
  get isSelected() {
    const selected = this.get('selected');
    return selected && selected.indexOf(this.get('value')) > -1;
  }
}

/**
 * Polaris choice list component.
 * See https://polaris.shopify.com/components/forms/choice-list
 */
@tagName('')
@layout(template)
export default class PolarisChoiceList extends Component {
  /**
   * Label for list of choices
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Collection of choices
   *
   * Each choice can have these properties:
   *
   *  - value
   *  - label
   *  - disabled
   *  - helpText
   *  - childComponent (Polaris's renderChildren equivalent)
   *  - alwaysRenderChildComponent
   *
   * TODO try to find a nicer API for React's `renderChildren`
   *
   * @type {Array}
   * @default []
   * @public
   */
  choices = [];

  /**
   * Collection of selected choices
   *
   * @type {Array}
   * @default []
   * @public
   */
  selected = [];

  /**
   * Name for form input
   *
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * Allow multiple selections
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  allowMultiple = false;

  /**
   * Display an error message
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  error = null;

  /**
   * Toggles display of the title
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  titleHidden = false;

  /**
   * Callback when the selected choices change
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {}

  @computed('error')
  get ariaInvalid() {
    return this.error != null;
  }

  @computed('finalName')
  get ariaDescribedBy() {
    return errorId(this.finalName);
  }

  @computed('allowMultiple')
  get controlComponent() {
    return this.allowMultiple ? 'polaris-checkbox' : 'polaris-radio-button';
  }

  @computed('name', 'allowMultiple')
  get finalName() {
    let { name, allowMultiple } = this;

    if (isEmpty(name)) {
      name = guidFor(this);
    }

    if (allowMultiple) {
      name = `${name}[]`;
    }

    return name;
  }

  @computed('choices.[]', 'selected.[]')
  get checkedChoices() {
    const { choices, selected } = this;

    return choices.map((choice) => {
      return CheckedChoice.create({
        content: choice,
        selected,
      });
    });
  }

  @action
  updateSelectedChoices(choice, checked) {
    const value = get(choice, 'value');
    let updatedSelectedChoices;

    if (this.allowMultiple) {
      const { selected } = this;
      if (checked) {
        updatedSelectedChoices = [...selected, value];
      } else {
        updatedSelectedChoices = selected.filter(
          (selectedChoice) => selectedChoice !== value
        );
      }
    } else {
      updatedSelectedChoices = [value];
    }

    return this.onChange(updatedSelectedChoices, this.name);
  }
}
