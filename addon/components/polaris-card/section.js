import Component from '@ember/component';
import layout from '../../templates/components/polaris-card/section';

export default Component.extend({
  classNames: ['Polaris-Card__Section'],
  classNameBindings: [
    'subdued:Polaris-Card__Section--subdued',
  ],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Title for the section
   *
   * @property title
   * @type {string}
   * @default: null
   */
  title: null,

  /**
   * A less prominent section
   *
   * @property subdued
   * @type {boolean}
   * @default: false
   */
  subdued: false,

  /**
   * Inner content of the section
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default: null
   */
  text: null,
});
