import Component from '@ember/component';
import { computed } from '@ember/object';
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
   * @type {Boolean}
   * @default false
   */
  hasMultipleSections: false,

  /**
   * Defines a specific role attribute for each action in the list
   *
   * @property actionRole
   * @public
   * @type {String}
   * @default null
   */
  actionRole: null,

  sectionRole: computed('actionRole', function() {
    return this.get('actionRole') === 'option' ? 'presentation' : undefined;
  }).readOnly(),

  actions: {
    onItemAction(item, event) {
      event.preventDefault();
      event.stopPropagation();

      invokeAction(item, 'onAction');
      invokeAction(this, 'onActionAnyItem');
    },
  },
});
