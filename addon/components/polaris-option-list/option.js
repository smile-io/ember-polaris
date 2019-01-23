import Component from '@ember/component';
import layout from '../../templates/components/polaris-option-list/option';

export default Component.extend({
  tagName: 'li',
  classNames: ['Polaris-OptionList-Option'],
  attributeBindings: ['tabIndex', 'active:aria-selected', 'role'],

  layout,

  /**
   * @property optionId
   * @type {String}
   * @default null
   * @public
   */
  optionId: null,

  /**
   * @property label
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  label: null,

  /**
   * @property value
   * @type {String}
   * @default null
   * @public
   */
  value: null,

  /**
   * @property section
   * @type {Number}
   * @default null
   * @public
   */
  section: null,

  /**
   * @property index
   * @type {Number}
   * @default null
   * @public
   */
  index: null,

  /**
   * @property media
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  media: null,

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
   * @property select
   * @type {Boolean}
   * @default false
   * @public
   */
  select: false,

  /**
   * @property allowMultiple
   * @type {Boolean}
   * @default false
   * @public
   */
  allowMultiple: false,

  /**
   * @property role
   * @type {String}
   * @default null
   * @public
   */
  role: null,

  /**
   * @property onClick
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {},

  /**
   * @property focused
   * @type {Boolean}
   * @default false
   * @private
   */
  focused: false,

  /**
   * @property active
   * @type {Boolean}
   * @default false
   * @private
   */
  active: false,

  tabIndex: -1,

  actions: {
    handleClick() {
      let { onClick, section, index, disabled } = this.getProperties(
        'onClick',
        'section',
        'index',
        'disabled'
      );

      if (disabled) {
        return;
      }

      onClick(section, index);
    },

    toggleFocus() {
      this.toggleProperty('focused');
    },
  },
});
