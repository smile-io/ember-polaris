import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PolarisActionListSection extends Component {
  /**
   * Section action item
   *
   * @type {Object}
   * @property {Array} items  Required. Collection of action items for the list.
   * @property {Array} title  Section title.
   */
  section;

  get sectionRole() {
    return this.args.actionRole === 'option' ? 'presentation' : undefined;
  }

  @action
  handleAction(itemOnAction, event) {
    event?.preventDefault();
    event?.stopPropagation();

    itemOnAction?.();
    this.args.onActionAnyItem?.();
  }
}
