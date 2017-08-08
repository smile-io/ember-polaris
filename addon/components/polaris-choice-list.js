import Ember from 'ember';
import layout from '../templates/components/polaris-choice-list';

const {
  Component,
  computed,
  get,
  guidFor,
  isEmpty,
  ObjectProxy,
} = Ember;

// Wrapper class to add an `isSelected` flag to the supplied choices.
const CheckedChoice = ObjectProxy.extend({
  choiceList: null,

  isSelected: computed('content.value', 'choiceList.selected.[]', function() {
    return this.get('choiceList.selected').indexOf(this.get('value')) >= 0;
  }).readOnly(),
});

/**
 * Polaris choice list component.
 * See https://polaris.shopify.com/components/forms/choice-list
 */
export default Component.extend({
  tagName: 'fieldset',
  classNames: ['Polaris-ChoiceList'],
  classNameBindings: ['titleHidden:Polaris-ChoiceList--titleHidden'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Label for list of choices
   *
   * @property title
   * @type {string}
   * @default null
   */
  title: null,

  /**
   * Collection of choices
   *
   * @property choices
   * @type {Array}
   * @default null
   */
  choices: null,

  /**
   * Collection of selected choices
   *
   * @property selected
   * @type {Array}
   * @default null
   */
  selected: null,

  /**
   * Name for form input
   *
   * @property name
   * @type {string}
   * @default null
   */
  name: null,

  /**
   * Allow multiple selections
   *
   * @property allowMultiple
   * @type {boolean}
   * @default false
   */
  allowMultiple: false,

  /**
   * Toggles display of the title
   *
   * @property titleHidden
   * @type {boolean}
   * @default false
   */
  titleHidden: false,

  /**
   * Callback when the selected choices change
   *
   * @property onChange
   * @type {function}
   * @default noop
   */
  onChange() {},

  /*
   * Internal properties.
   */
  controlComponent: computed('allowMultiple', function() {
    return this.get('allowMultiple') ? 'polaris-checkbox' : 'polaris-radio-button';
  }).readOnly(),

  finalName: computed('name', 'allowMultiple', function() {
    let { name, allowMultiple } = this.getProperties('name', 'allowMultiple');

    if (isEmpty(name)) {
      name = guidFor(this);
    }

    if (allowMultiple) {
      name += '[]';
    }

    return name;
  }).readOnly(),

  checkedChoices: computed('choices.[]', function() {
    const choices = this.get('choices') || [];
    return choices.map((choice) => {
      return CheckedChoice.create({
        content: choice,
        choiceList: this,
      });
    });
  }).readOnly(),

  /*
   * Actions.
   */
  actions: {
    updateSelectedChoices(choice, checked) {
      const value = get(choice, 'value');
      let updatedSelectedChoices;

      if (this.get('allowMultiple')) {
        const selected = this.get('selected');
        if (checked) {
          updatedSelectedChoices = [...selected, value];
        } else {
          updatedSelectedChoices = selected.filter((selectedChoice) => selectedChoice !== value);
        }
      } else {
        updatedSelectedChoices = [ value ];
      }

      return this.get('onChange')(updatedSelectedChoices, this.get('name'));
    },
  }
});
