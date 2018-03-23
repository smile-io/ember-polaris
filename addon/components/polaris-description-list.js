import Component from '@ember/component';
import layout from '../templates/components/polaris-description-list';

export default Component.extend({
  tagName: 'dl',
  classNames: ['Polaris-DescriptionList'],

  layout,

  /**
   * Collection of items for list
   *
   * format with `term` and `description` keys:
   *
   * [{
   *   term: 'Term here',
   *   description: 'Description here'
   * }]
   *
   * @public
   * @property items
   * @type {Array}
   * @default: null
   */
  items: null
});
