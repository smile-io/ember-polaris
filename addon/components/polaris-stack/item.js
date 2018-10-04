import Component from '@ember/component';
import layout from '../../templates/components/polaris-stack/item';

export default Component.extend({
  classNames: ['Polaris-Stack__Item'],
  classNameBindings: ['fill:Polaris-Stack__Item--fill'],

  layout,

  /**
   * Elements to display inside stack item
   *
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text: null,

  /**
   * Fill the width of the stack
   *
   * @property fill
   * @type {boolean}
   * @default false
   * @public
   */
  fill: false,
});
