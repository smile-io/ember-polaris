import Component from '@ember/component';
import layout from '../../templates/components/polaris-card/section-header';

export default Component.extend({
  classNames: ['Polaris-Card__SectionHeader'],

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
