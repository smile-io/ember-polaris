import Component from '@ember/component';
import { invokeAction } from 'ember-invoke-action';
import layout from '../../templates/components/polaris-action-list/section';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Collection of action items
   *
   * @property section
   * @public
   * @type {Object}
   * @default null
   */
  section: null,

  /**
   * Whether the parent action list has multiple sections
   *
   * @property hasMultipleSections
   * @public
   * @type {boolean}
   * @default false
   */
  hasMultipleSections: false,

  actions: {
    onItemAction(item, event) {
      event.stopPropagation();

      invokeAction(item, 'onAction');
      invokeAction(this, 'onActionAnyItem');
    },
  }
});
