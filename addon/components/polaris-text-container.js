import Ember from 'ember';
import layout from '../templates/components/polaris-text-container';

const {
  Component,
} = Ember;

/**
 * Undocumented Polaris text container component.
 */
export default Component.extend({
  classNames: ['Polaris-TextContainer'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The text to display.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,
});
