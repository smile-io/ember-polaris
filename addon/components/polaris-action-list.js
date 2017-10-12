import Component from '@ember/component';
import { typeOf } from '@ember/utils';
import layout from '../templates/components/polaris-action-list';

/**
 * Polaris action list component.
 * See https://polaris.shopify.com/components/actions/action-list
 */
export default Component.extend({
  classNames: ['Polaris-ActionList'],

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
   * TODO: not implemented
   */
  sections: null,

  /*
   * Internal properties.
   */
  actions: {
    fireItemAction(item, event) {
      event.stopPropagation();

      if (typeOf(item.action) === 'function') {
        return item.action();
      }

      return null;
    }
  }
});
