import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/polaris-option-list';

/**
 * Polaris option list component.
 * See https://polaris.shopify.com/components/lists-and-tables/option-list
 */
export default Component.extend({
  tagName: 'ul',
  classNames: ['Polaris-OptionList'],

  layout,

  /**
   * A unique identifier for the option list
   * Defaults to Ember's GUID for this component instance
   *
   * @property id
   * @type {String}
   * @public
   */
  id: computed(function() {
    return guidFor(this);
  }),

  /**
   * List title
   *
   * @property title
   * @type {String}
   * @default null
   * @public
   */
  title: null,

  /**
   * Collection of options to be listed
   *
   * @property options
   * @type {Object[]}
   * @default null
   * @public
   */
  options: null,

  /**
   * Defines a specific role attribute for the list itself
   *
   * @property role
   * @type {String}
   * @default null
   * @public
   */
  role: null,

  /**
   * Defines a specific role attribute for each option in the list
   *
   * @property optionRole
   * @type {String}
   * @default null
   * @public
   */
  optionRole: null,

  /**
   * Sections containing a header and related options
   *
   * @property sections
   * @type {Object[]}
   * @default null
   * @public
   */
  sections: null,

  /**
   * The selected options
   *
   * @property selected
   * @type {String[]}
   * @default null
   * @public
   */
  selected: null,

  /**
   * Allow more than one option to be selected
   *
   * @property allowMultiple
   * @type {Boolean}
   * @default false
   * @public
   */
  allowMultiple: false,

  /**
   * Callback when selection is changed
   *
   * @property onChange
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {},

  /**
   * @property normalizedOptions
   * @type {Object[]}
   * @private
   */
  normalizedOptions: computed('options.[]', 'sections.[]', 'title', function() {
    let { options, sections, title } = this.getProperties(
      'options',
      'sections',
      'title'
    );
    return createNormalizedOptions(options, sections, title);
  }).readOnly(),

  actions: {
    handleClick(sectionIndex, optionIndex) {
      let {
        selected,
        onChange,
        allowMultiple,
        normalizedOptions,
      } = this.getProperties(
        'selected',
        'onChange',
        'allowMultiple',
        'normalizedOptions'
      );
      let selectedValue =
        normalizedOptions[sectionIndex].options[optionIndex].value;
      let foundIndex = selected.indexOf(selectedValue);
      if (allowMultiple) {
        let newSelection =
          foundIndex === -1
            ? [selectedValue, ...selected]
            : [
                ...selected.slice(0, foundIndex),
                ...selected.slice(foundIndex + 1, selected.length),
              ];
        onChange(newSelection);
        return;
      }
      onChange([selectedValue]);
    },
  },
});

function createNormalizedOptions(options, sections, title) {
  if (options == null) {
    let section = { options: [], title };
    return sections == null ? [] : [section, ...sections];
  }
  if (sections == null) {
    return [
      {
        title,
        options,
      },
    ];
  }
  return [
    {
      title,
      options,
    },
    ...sections,
  ];
}
