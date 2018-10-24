import Component from '@ember/component';
import layout from '../../templates/components/polaris-button-group/item';

export default Component.extend({
  classNames: ['Polaris-ButtonGroup__Item'],
  classNameBindings: [
    'plain:Polaris-ButtonGroup__Item--plain',
    'focused:Polaris-ButtonGroup__Item--focused',
  ],

  layout,

  /**
   * Elements to display inside group item
   *
   * @property text
   * @public
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * Use a plain style for the group item
   *
   * @property plain
   * @public
   * @type {boolean}
   * @default false
   */
  plain: false,

  /**
   * Whether the group item is focused
   *
   * @property focused
   * @private
   * @type {boolean}
   * @default false
   */
  focused: false,

  'data-test-button-group-item': true,

  /**
   * Events.
   */
  focusIn() {
    this.set('focused', true);
  },

  focusOut() {
    this.set('focused', false);
  },
});
