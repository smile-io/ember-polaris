import Component from '@ember/component';
import { A as EmberArray } from '@ember/array';
import { deprecate } from '@ember/debug';
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
   * values can also be set to custom components:
   *
   * items=(array
   *   (hash
   *     term=(component "my-term-component")
   *     description=(component "my-description-component")
   *   )
   * )
   *
   * @public
   * @property items
   * @type {Array}
   * @default: null
   */
  items: null,

  /**
   * Lifecycle hooks.
   */
  didReceiveAttrs() {
    this._super(...arguments);

    let items = EmberArray(this.get('items') || []);
    deprecate(
      'Passing an explicit `termComponent` in `polaris-description-list` `items` is deprecated - pass the component as `term` instead',
      !items.any(item => item && item.termComponent),
      {
        id: 'ember-polaris.polaris-description-list.term-component',
        until: '2.0.0',
      }
    );
    deprecate(
      'Passing an explicit `descriptionComponent` in `polaris-description-list` `items` is deprecated - pass the component as `description` instead',
      !items.any(item => item && item.descriptionComponent),
      {
        id: 'ember-polaris.polaris-description-list.description-component',
        until: '2.0.0',
      }
    );
  },
});
