import Component from '@ember/component';
import layout from '../../templates/components/polaris-card/section';

export default Component.extend({
  classNames: ['Polaris-Card__Section'],
  classNameBindings: [
    'fullWidth:Polaris-Card__Section--fullWidth',
    'subdued:Polaris-Card__Section--subdued',
  ],

  layout,

  /**
   * Title for the section
   *
   * @property title
   * @public
   * @type {string}
   * @default: null
   */
  title: null,

  /**
   * A less prominent section
   *
   * @property subdued
   * @public
   * @type {boolean}
   * @default: false
   */
  subdued: false,

  /**
   * A full-width section without any padding
   *
   * @property fullWidth
   * @public
   * @type {boolean}
   * @default: false
   */
  fullWidth: false,

  /**
   * Inner content of the section
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @public
   * @type {string}
   * @default: null
   */
  text: null,
});
