import Component from '@ember/component';
import { computed } from '@ember/object';
import { gt } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-action-list';

/**
 * Polaris action list component.
 * See https://polaris.shopify.com/components/actions/action-list
 */
@tagName('')
@layout(template)
export default class PolarisActionList extends Component {
  /**
   * Collection of actions for list
   *
   * @type {Array}
   * @default []
   * @public
   */
  items = [];

  /**
   * Collection of sectioned action items
   *
   * @type {Array}
   * @default []
   * @public
   */
  sections = [];

  /**
   * Defines a specific role attribute for each action in the list
   *
   * @type {String}
   * @default null
   * @public
   */
  actionRole = null;

  /**
   * Callback when any item is clicked or keypressed
   *
   * @type {function}
   * @default no-op
   * @public
   */
  onActionAnyItem() {}

  @gt('finalSections.length', 1)
  hasMultipleSections;

  @computed('items', 'sections.[]')
  get finalSections() {
    let finalSections = [];

    let { items } = this;
    if (isPresent(items)) {
      finalSections.push({ items });
    }

    let { sections } = this;
    assert(
      `ember-polaris::polaris-action-list - sections must be an array, you passed ${sections}`,
      isArray(sections)
    );
    finalSections.push(...sections);

    return finalSections;
  }
}
