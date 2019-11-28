import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { invokeAction } from 'ember-invoke-action';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-action-list/section';

@tagName('')
@layout(template)
export default class PolarisActionListSection extends Component {
  /**
   * Collection of action items
   *
   * @type {Object}
   * @default null
   * @public
   */
  section = null;

  /**
   * Whether the parent action list has multiple sections
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  hasMultipleSections = false;

  /**
   * Defines a specific role attribute for each action in the list
   *
   * @type {String}
   * @default null
   * @public
   */
  actionRole = null;

  @computed('actionRole')
  get sectionRole() {
    return this.actionRole === 'option' ? 'presentation' : undefined;
  }

  @action
  onItemAction(item, event) {
    event.preventDefault();
    event.stopPropagation();

    invokeAction(item, 'onAction');
    invokeAction(this, 'onActionAnyItem');
  }
}
