import Ember from 'ember';
import layout from '../../templates/components/polaris-layout/annotated-section';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Layout__AnnotatedSection'],

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
   * Description for the section
   *
   * @property description
   * @type {string}
   * @default: null
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
   */
  text: null,
});
