import Component from '@ember/component';
import layout from '../../templates/components/polaris-layout/annotated-section';

export default Component.extend({
  classNames: ['Polaris-Layout__AnnotatedSection'],

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
   * @public
   */
  text: null,
});
