import Component from '@ember/component';
import layout from '../templates/components/polaris-option-list';

/**
 * Polaris option list component.
 * See https://polaris.shopify.com/components/lists-and-tables/option-list
 */
export default Component.extend({
  /**
   * A unique identifier for the option list
   *
   * @property id
   * @type {String}
   * @default null
   * @public
   */
  id: null,

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
});
