import Component from '@ember/component';
import layout from '../templates/components/polaris-breadcrumbs';

export default Component.extend({
  classNames: [ 'Polaris-Page__Navigation' ],

  layout,

  /**
   * Collection of breadcrumbs
   *
   * @property breadcrumbs
   * @type {Array}
   * @default null
   */
  breadcrumbs: null,
});
