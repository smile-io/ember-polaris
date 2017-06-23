import Ember from 'ember';
import layout from '../templates/components/polaris-layout';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Layout'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Automatically adds sections to layout
   *
   * @property sectioned
   * @type {boolean}
   * @default false
   */
  sectioned: false,

  /**
   * The content to display inside the layout
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
