import {
  attribute,
  className,
  classNames,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isEmpty } from '@ember/utils';
import ObjectProxy from '@ember/object/proxy';
import { errorId } from '../utils/id';
import layout from '../templates/components/polaris-choice-list';

// Wrapper class to add an `isSelected` flag to the supplied choices.
class CheckedChoice extends ObjectProxy {
  selected = null;

  @(computed('content.value', 'selected.[]').readOnly())
  get isSelected() {
    const selected = this.get('selected');
    return selected && selected.indexOf(this.get('value')) > -1;
  }
}

/**
 * Polaris choice list component.
 * See https://polaris.shopify.com/components/forms/choice-list
 */
@tagName('fieldset')
@classNames('Polaris-ChoiceList')
@templateLayout(layout)
export default class PolarisChoiceList extends Component {
  /**
   * Label for list of choices
   *
   * @property title
   * @public
   * @type {String}
   * @default null
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
   * @property choices
   * @public
   * @type {Array}
   * @default null
   */
  choices = null;

  /**
   * Collection of selected choices
   *
   * @property selected
   * @public
   * @type {Array}
   * @default null
   */
  selected = null;

  /**
   * Name for form input
   *
   * @property name
   * @public
   * @type {String}
   * @default null
   */
  name = null;

  /**
   * Allow multiple selections
   *
   * @property allowMultiple
   * @public
   * @type {Boolean}
   * @default false
   */
  allowMultiple = false;

  /**
   * Display an error message
   *
   * @property error
   * @public
   * @type {String|Component}
   * @default null
   */
  error = null;

  /**
   * Toggles display of the title
   *
   * @property titleHidden
   * @public
   * @type {Boolean}
   * @default false
   */
  @className('Polaris-ChoiceList--titleHidden')
  titleHidden = false;

  /**
   * Callback when the selected choices change
   *
   * @property onChange
   * @public
   * @type {Function}
   * @default noop
   */
  onChange() {}

  'data-test-choice-list' = true;

  /**
   * @private
   */
  @computed('error')
  @attribute('aria-invalid')
  get ariaInvalid() {
    return this.get('error') != null;
  }

  /**
   * @private
   */
  @(computed('finalName').readOnly())
  @attribute('aria-describedby')
  get ariaDescribedBy() {
    return errorId(this.get('finalName'));
  }

  /**
   * @private
   */
  @(computed('allowMultiple').readOnly())
  get controlComponent() {
    return this.get('allowMultiple')
      ? 'polaris-checkbox'
      : 'polaris-radio-button';
  }

  /**
   * @private
   */
  @(computed('name', 'allowMultiple').readOnly())
  @attribute('id')
  get finalName() {
    let { name, allowMultiple } = this.getProperties('name', 'allowMultiple');

    if (isEmpty(name)) {
      name = guidFor(this);
    }

    if (allowMultiple) {
      name = `${name}[]`;
    }

    return name;
  }

  /**
   * @private
   */
  @(computed('choices.[]', 'selected.[]').readOnly())
  get checkedChoices() {
    const choices = this.get('choices') || [];
    const selected = this.get('selected');

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

    if (this.get('allowMultiple')) {
      const selected = this.get('selected');
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

    return this.get('onChange')(updatedSelectedChoices, this.get('name'));
  }
}
