import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import layout from '../../templates/components/polaris-connected/item';

export default Component.extend({
  classNames: ['Polaris-Connected__Item'],
  classNameBindings: [
    'focused:Polaris-Connected__Item--focused',
    'left:Polaris-Connected__Item--connection',
    'right:Polaris-Connected__Item--connection',
    'primary:Polaris-Connected__Item--primary',
  ],

  layout,

  /**
   * The position of the item.
   *
   * Allowed values: 'left', 'right', or 'primary'
   *
   * @property position
   * @public
   * @type {String}
   * @default null
   */
  position: null,

  /**
   * Whether or not the item is focused.
   *
   * @property focused
   * @private
   * @type {Boolean}
   * @default false
   */
  focused: false,

  left: equal('position', 'left').readOnly(),
  right: equal('position', 'right').readOnly(),
  primary: equal('position', 'primary').readOnly(),

  focusIn() {
    this.set('focused', true);
  },

  focusOut() {
    this.set('focused', false);
  },
});
