import Component from '@ember/component';
import layout from '../../templates/components/polaris-action-list/image';

export default Component.extend({
  classNames: ['Polaris-ActionList__Image'],

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
