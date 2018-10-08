import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { isEmpty, isNone } from '@ember/utils';
import ObjectProxy from '@ember/object/proxy';
import layout from '../templates/components/polaris-choice-list';

// Wrapper class to add an `isSelected` flag to the supplied choices.
const CheckedChoice = ObjectProxy.extend({
  selected: null,

  isSelected: computed('content.value', 'selected.[]', function() {
    const selected = this.get('selected');
    return selected && selected.indexOf(this.get('value')) > -1;
  }).readOnly(),
});

/**
 * Polaris choice list component.
 * See https://polaris.shopify.com/components/forms/choice-list
 */
export default Component.extend({
  tagName: 'fieldset',

  attributeBindings: [
    'hasError:aria-invalid',
    'finalNameError:aria-described-by',
  ],

  classNames: ['Polaris-ChoiceList'],
  classNameBindings: ['titleHidden:Polaris-ChoiceList--titleHidden'],

  layout,

  /**
   * Label for list of choices
   *
   * @property title
   * @public
   * @type {string}
   * @default null
   */
  title: null,

  /**
   * Collection of choices
   *
   * Each choice can have these properties:
   *
   *  - value
   *  - label
   *  - disabled
   *  - helpText
   *  - renderChildren (not implemented yet)
   *
   * @property choices
   * @public
   * @type {Array}
   * @default null
   */
  choices: null,

  /**
   * Collection of selected choices
   *
   * @property selected
   * @public
   * @type {Array}
   * @default null
   */
  selected: null,

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
   * Allow multiple selections
   *
   * @property allowMultiple
   * @public
   * @type {boolean}
   * @default false
   */
  allowMultiple: false,

  /**
   * Display an error message
   *
   * @property error
   * @public
   * @type {string|component}
   * @default false
   */
  error: null,

  /**
   * Toggles display of the title
   *
   * @property titleHidden
   * @public
   * @type {boolean}
   * @default false
   */
  titleHidden: false,

  /**
   * Callback when the selected choices change
   *
   * @property onChange
   * @public
   * @type {function}
   * @default noop
   */
  onChange() {},

  /**
   * @private
   */
  hasError: bool('error'),

  /**
   * @private
   */
  finalNameError: computed('finalName', 'error', function() {
    if (isNone(this.get('error'))) {
      return null;
    }

    return `${this.get('finalName')}Error`;
  }).readOnly(),

  /**
   * @private
   */
  controlComponent: computed('allowMultiple', function() {
    return this.get('allowMultiple')
      ? 'polaris-checkbox'
      : 'polaris-radio-button';
  }).readOnly(),

  /**
   * @private
   */
  finalName: computed('name', 'allowMultiple', function() {
    let { name, allowMultiple } = this.getProperties('name', 'allowMultiple');

    if (isEmpty(name)) {
      name = guidFor(this);
    }

    if (allowMultiple) {
      name = `${name}[]`;
    }

    return name;
  }).readOnly(),

  /**
   * @private
   */
  checkedChoices: computed('choices.[]', function() {
    const choices = this.get('choices') || [];
    const selected = this.get('selected');

    return choices.map((choice) => {
      return CheckedChoice.create({
        content: choice,
        selected,
      });
    });
  }).readOnly(),

  actions: {
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
    },
  },
});
