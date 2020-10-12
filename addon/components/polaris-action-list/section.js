import Component from '@glimmer/component';
import { action, computed } from '@ember/object';

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
  handleAction(item, event) {
    event.preventDefault();
    event.stopPropagation();

    item.onAction?.();
    this.onActionAnyItem?.();
  }
}
