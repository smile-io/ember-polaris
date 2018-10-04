import Component from '@ember/component';
import layout from '../../templates/components/polaris-layout/annotation';

export default Component.extend({
  classNames: ['Polaris-Layout__Annotation'],

  layout,

  /**
   * Title for the section
   *
   * @property title
   * @type {string}
   * @default: null
   * @public
   */
  title: null,

  /**
   * Description for the section
   *
   * @property description
   * @type {string}
   * @default: null
   * @public
   */
  description: null,
});
