import Ember from 'ember';
import layout from '../../templates/components/polaris-stack/item';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Stack__Item'],
  classNameBindings: ['fill:Polaris-Stack__Item--fill'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Elements to display inside stack item
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * Fill the width of the stack
   *
   * @property fill
   * @type {boolean}
   * @default false
   */
  fill: false,
});
