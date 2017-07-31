import Ember from 'ember';
import layout from '../../templates/components/polaris-layout/annotation-content';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Layout__AnnotationContent'],

  layout,

  /*
   * Public attributes.
   */
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
