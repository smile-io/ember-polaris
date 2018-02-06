import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/action-icon';

export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Page__ActionIcon'],

  layout,

  /**
   * The icon to display
   *
   * @property icon
   * @type {String}
   * @default null
   */
  icon: null,
});
