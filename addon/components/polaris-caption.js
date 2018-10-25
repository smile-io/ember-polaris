import Component from '@ember/component';
import layout from '../templates/components/polaris-caption';

export default Component.extend({
  tagName: 'p',
  classNames: ['Polaris-Caption'],

  layout,

  /**
   * The content to use as a graph label or timestamp.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @public
   * @property text
   * @type {String}
   * @default: null
   */
  text: null,

  'data-test-caption': true,
});
