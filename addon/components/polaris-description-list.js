import Component from '@ember/component';
import layout from '../templates/components/polaris-description-list';
import { warn } from '@ember/debug';
import { computed } from '@ember/object';

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
   * values can also be set to custom components:
   *
   * items=(array
   *  (hash
   *    termComponent=(component my-term-component)
   *    descriptionComponent=(component my-description-component)
   *  )
   * )
   *
   * @public
   * @property items
   * @type {Array}
   * @default: null
   */
  items: null
});
