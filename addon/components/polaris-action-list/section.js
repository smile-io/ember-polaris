import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PolarisActionListSection extends Component {
  @service('polaris-app-provider') polaris;

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
