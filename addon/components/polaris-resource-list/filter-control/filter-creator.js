import Component from '@ember/component';
import { and } from '@ember/object/computed';
import { action, get, computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../../templates/components/polaris-resource-list/filter-control/filter-creator';

@tagName('')
@templateLayout(layout)
export default class PolarisResourceListFilterControlFilterCreator extends Component {
  /**
   * @type {Object[]}
   * @default null
   * @public
   */
  filters = null;

  /**
   * Object with `singular` and `plural` properties.
   *
   * @type {Object}
   * @default null
   * @public
   */
  resourceName = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onAddFilter() {}

  /**
   * @type {Object}
   * @default null
   */
  selectedFilter = null;

  /**
   * @type {String}
   * @default null
   */
  selectedFilterKey = null;

  /**
   * @type {String}
   * @default null
   */
  selectedFilterValue = null;

  @(and(
    'selectedFilter',
    'selectedFilterKey',
    'selectedFilterValue'
  ).readOnly())
  canAddFilter;

  @(computed('resourceName.plural').readOnly())
  get selectLabel() {
    return `Show all ${this.resourceName.plural} where:`;
  }

  @(computed('filters.@each.{key,label}').readOnly())
  get filterOptions() {
    return this.filters.map(({ key, label }) => ({
      value: key,
      label,
    }));
  }

  @action
  handleButtonFocus(...args) {
    let event = args[0];
    if (!this.node && event) {
      this.set('node', event.target);
    }
  }

  @action
  handleFilterKeyChange(filterKey) {
    let { filters } = this;

    let foundFilter = filters.find((filter) => {
      let minKey = get(filter, 'minKey');
      let maxKey = get(filter, 'maxKey');
      let operatorText = get(filter, 'operatorText');

      if (minKey || maxKey) {
        return (
          get(filter, 'key') === filterKey ||
          minKey === filterKey ||
          maxKey === filterKey
        );
      }

      if (operatorText && typeof operatorText !== 'string') {
        return (
          get(filter, 'key') === filterKey ||
          operatorText.filter(({ key }) => key === filterKey).length === 1
        );
      }

      return get(filter, 'key') === filterKey;
    });

    if (!foundFilter) {
      return;
    }

    this.setProperties({
      selectedFilter: foundFilter,
      selectedFilterKey: filterKey,
      selectedFilterValue: undefined,
    });
  }

  @action
  handleAddFilter(popover) {
    let { onAddFilter, selectedFilterKey } = this;

    if (!onAddFilter || !this.canAddFilter || !selectedFilterKey) {
      return;
    }

    onAddFilter({
      key: selectedFilterKey,
      value: this.selectedFilterValue || '',
    });
    this.setProperties({
      selectedFilter: undefined,
      selectedFilterValue: undefined,
    });

    popover.close();

    let { node } = this;
    if (node != null) {
      node.focus();
    }
  }
}
