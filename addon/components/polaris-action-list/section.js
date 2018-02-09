import Component from '@ember/component';
import { get } from '@ember/object';
import { typeOf } from '@ember/utils';
import layout from '../../templates/components/polaris-action-list/section';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Collection of action items
   *
   * @property section
   * @type {Object}
   * @default null
   */
  section: null,

  /**
   * Whether the parent action list has multiple sections
   *
   * @property hasMultipleSections
   * @type {boolean}
   * @default false
   */
  hasMultipleSections: false,

  actions: {
    onItemAction(item, event) {
      event.stopPropagation();

      let itemAction = get(item, 'onAction');
      if (typeOf(itemAction) === 'function') {
        itemAction();
      }

      let listAction = this.get('onActionAnyItem');
      if (typeOf(listAction) === 'function') {
        listAction();
      }
    },
  }
});
