import Ember from 'ember';
import layout from '../../templates/components/polaris-button-group/item';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-ButtonGroup__Item'],
  classNameBindings: ['plain:Polaris-ButtonGroup__Item--plain'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Elements to display inside group item
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * Use a plain style for the group item
   *
   * @property plain
   * @type {boolean}
   * @default false
   */
  plain: false,
});
