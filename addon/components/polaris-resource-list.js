import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import layout from '../templates/components/polaris-resource-list';

/**
 * Polaris resource list component.
 * See https://polaris.shopify.com/components/lists-and-tables/resource-list
 */
export default Component.extend({
  classNames: ['Polaris-ResourceList__ResourceListWrapper'],

  layout,

  context: service('polaris-resource-list/context'),

  /**
   * Item data; each item is passed to renderItem
   *
   * @property items
   * @type {Array}
   * @default null
   * @public
   */
  items: null,

  /**
   * @property filterControl
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  filterControl: null,

  /**
   * Name of the resource, such as customers or products
   * Object with `singular` and `plural` properties
   *
   * @property resourceName
   * @type {Object}
   * @default null
   * @public
   */
  resourceName: null,

  /**
   * Up to 2 bulk actions that will be given more prominence
   * Array of objects with properties:
   *  id
   *  content
   *  accessibilityLabel
   *  url
   *  external
   *  disabled
   *  onAction
   *
   * @property promotedBulkActions
   * @type {Object[]}
   * @default null
   * @public
   */
  promotedBulkActions: null,

  /**
   * Actions available on the currently selected items
   * Array of action objects with properties:
   *  id
   *  content
   *  accessibilityLabel
   *  url
   *  external
   *  disabled
   *  onAction
   *
   * or section object with properties:
   *  title
   *  items
   *
   * where items is a list of action objects
   *
   * @property bulkActions
   * @type {Object[]}
   * @default null
   * @public
   */
  bulkActions: null,

  /**
   * Collection of IDs for the currently selected items
   * Can be either an array of IDs, or the string literal 'All'
   *
   * @property selectedItems
   * @type {String|String[]}
   * @default null
   * @public
   */
  selectedItems: null,

  /**
   * If there are more items than currently in the list
   *
   * @property hasMoreItems
   * @type {Boolean}
   * @default false
   * @public
   */
  hasMoreItems: false,

  /**
   * Overlays item list with a spinner while a background action is being performed
   *
   * @property loading
   * @type {Boolean}
   * @default false
   * @public
   */
  loading: false,

  /**
   * Boolean to show or hide the header
   *
   * @property showHeader
   * @type {Boolean}
   * @default false
   * @public
   */
  showHeader: false,

  /**
   * Current value of the sort control
   *
   * @property sortValue
   * @type {String}
   * @default null
   * @public
   */
  sortValue: null,

  /**
   * Collection of sort options to choose from
   * Properties are the same as for polaris-select's options
   *
   * @property sortOptions
   * @type {(String|Object)[]}
   * @default null
   * @public
   */
  sortOptions: null,

  /**
   * Component to render each list item
   * This is in place of the React implementation's
   * renderItem property
   *
   * @property itemComponent
   * @type {String|Component}
   * @default null
   * @public
   * @required
   */
  itemComponent: null,

  /**
   * Callback when sort option is changed
   *
   * @property onSortChange
   * @type {Function}
   * @default noop
   * @public
   */
  onSortChange() {},

  /**
   * Callback when selection is changed
   *
   * @property onSelectionChange
   * @type {Function}
   * @default noop
   * @public
   */
  onSelectionChange() {},

  /**
   * Function to customize the unique ID for each item
   *
   * @property idForItem
   * @type {Function}
   * @default noop
   * @public
   */
  idForItem() {},

  /**
   * @property selectMode
   * @type {Boolean}
   * @default false
   * @private
   */
  selectMode: false,

  /**
   * @property loadingPosition
   * @type {Number}
   * @default 0
   * @private
   */
  loadingPosition: 0,

  /**
   * @property listNode
   * @type {HTMLUListElement}
   * @default null
   * @private
   */
  listNode: null,

  showEmptyState: computed('filterControl', 'itemsExist', function() {
    let { filterControl, itemsExist } = this.getProperties(
      'filterControl',
      'itemsExist'
    );

    return filterControl && !itemsExist;
  }).readOnly(),

  didReceiveAttrs() {
    this._super(...arguments);

    assert(
      'ember-polaris::polaris-resource-list - itemComponent must be a component name or definition',
      this.get('itemComponent')
    );
  },
});
