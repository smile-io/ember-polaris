import Component from '@glimmer/component';
import { gt } from '@ember/object/computed';
import { inject as service } from '@ember/service';

/**
 * Polaris action list component.
 * See https://polaris.shopify.com/components/actions/action-list
 *
 * @version 5.6.0
 */
export default class PolarisActionListComponent extends Component {
  @service('polaris-app-provider') polaris;

  /**
   * Collection of actions for list
   * @type {Array}
   */
  items;

  /**
   * Collection of sectioned action items
   * @type {Array}
   */
  sections;

  /**
   * Defines a specific role attribute for each action in the list
   * @type {String}
   */
  actionRole;

  /**
   * Callback when any item is clicked or keypressed
   * @type {Function}
   */
  onActionAnyItem;

  @gt('finalSections.length', 1)
  hasMultipleSections;

  get finalSections() {
    let finalSections = [];

    let { items, sections = [] } = this.args;
    if (items) {
      finalSections = [{ items }, ...sections];
    } else {
      finalSections = sections;
    }

    return finalSections;
  }
}
