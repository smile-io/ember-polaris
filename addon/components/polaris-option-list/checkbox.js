import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../../templates/components/polaris-option-list/checkbox';

export default Component.extend({
  classNames: ['Polaris-OptionList-Checkbox'],
  classNameBindings: ['active:Polaris-OptionList-Checkbox--active'],

  layout,

  /**
   * @property checked
   * @type {Boolean}
   * @default false
   * @public
   */
  checked: false,

  /**
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled: false,

  /**
   * @property active
   * @type {Boolean}
   * @default false
   * @public
   */
  active: false,

  /**
   * @property checkboxId
   * @type {String}
   * @public
   */
  checkboxId: computed(function() {
    return guidFor(this);
  }),

  /**
   * @property name
   * @type {String}
   * @default null
   * @public
   */
  name: null,

  /**
   * @property value
   * @type {String}
   * @default null
   * @public
   */
  value: null,

  /**
   * @property role
   * @type {String}
   * @default null
   * @public
   */
  role: null,

  /**
   * @property onChange
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {},
});
