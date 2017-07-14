import Ember from 'ember';
import layout from '../../templates/components/polaris-popover/content';

const {
  Component,
} = Ember;

export default Component.extend({
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * Content wrapper component.
   *
   * @property contentComponent
   * @type {component}
   * @default: null
   */
  contentComponent: null,

  /**
   * Simple text for quick popovers.
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
