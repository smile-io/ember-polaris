import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { isArray } from '@ember/array';
import layout from '../templates/components/polaris-action-list';

/**
 * Polaris action list component.
 * See https://polaris.shopify.com/components/actions/action-list
 */
export default Component.extend({
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * Collection of actions for list
   *
   * @property items
   * @type {Array}
   * @default null
   */
  items: null,

  /**
   * Collection of sectioned action items
   *
   * @property sections
   * @type {Array}
   * @default null
   */
  sections: null,

  /**
   * Callback when any item is clicked or keypressed
   *
   * @property onActionAnyItem
   * @type {function}
   * @default null
   */
  onActionAnyItem: null,

  /*
   * Internal properties.
   */
  finalSections: computed('items', 'sections.[]', function() {
    let finalSections = [];

    let items = this.get('items');
    if (isPresent(items)) {
      finalSections.push({ items });
    }

    let sections = this.get('sections');

    if (isArray(sections)) {
      finalSections.push(...sections);
    }

    return finalSections;
  }).readOnly(),

  hasMultipleSections: computed('finalSections.length', function() {
    return this.get('finalSections.length') > 1;
  }).readOnly(),
});
