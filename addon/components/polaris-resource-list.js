import Component from '@ember/component';
import { gt } from '@ember/object/computed';
import { action, get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { assert } from '@ember/debug';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import ContextBoundTasksMixin from 'ember-lifeline/mixins/run';
import createContext from 'ember-context';
import layout from '../templates/components/polaris-resource-list';
import { computedIdVariation } from '@smile-io/ember-polaris/utils/id';

export const SELECT_ALL_ITEMS = 'All';

export const context = createContext({
  selectMode: false,
  resourceName: {
    singular: 'item',
    plural: 'items',
  },
});

const SMALL_SCREEN_WIDTH = 458;
const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

/**
 * Polaris resource list component.
 * See https://polaris.shopify.com/components/lists-and-tables/resource-list
 */
@tagName('')
@templateLayout(layout)
export default class PolarisResourceList extends Component.extend(
  ContextBoundEventListenersMixin,
  ContextBoundTasksMixin
) {
  /**
   * Item data; each item is passed to renderItem
   *
   * @type {Array}
   * @default null
   * @public
   */
  items = null;

  /**
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  filterControl = null;

  /**
   * Name of the resource, such as customers or products
   * Object with `singular` and `plural` properties
   *
   * @type {Object}
   * @default null
   * @public
   */
  resourceName = null;

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
   * @type {Object[]}
   * @default null
   * @public
   */
  promotedBulkActions = null;

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
   * @type {Object[]}
   * @default null
   * @public
   */
  bulkActions = null;

  /**
   * Collection of IDs for the currently selected items
   * Can be either an array of IDs, or the string literal 'All'
   *
   * @type {String|String[]}
   * @default null
   * @public
   */
  selectedItems = null;

  /**
   * If there are more items than currently in the list
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  hasMoreItems = false;

  /**
   * Overlays item list with a spinner while a background action is being performed
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  loading = false;

  /**
   * Boolean to show or hide the header
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  showHeader = false;

  /**
   * Current value of the sort control
   *
   * @type {String}
   * @default null
   * @public
   */
  sortValue = null;

  /**
   * Collection of sort options to choose from
   * Properties are the same as for polaris-select's options
   *
   * @type {(String|Object)[]}
   * @default null
   * @public
   */
  sortOptions = null;

  /**
   * Component to display instead of the sort control
   *
   * @type {Component|Object}
   * @default null
   * @public
   */
  alternateTool = null;

  /**
   * Component to render each list item
   * This is in place of the React implementation's
   * renderItem property
   *
   * @type {String|Component}
   * @default null
   * @public
   * @required
   */
  itemComponent = null;

  /**
   * Callback when selection is changed
   *
   * @type {Function}
   * @default null
   * @public
   */
  onSelectionChange = null;

  /**
   * Function to customize the unique ID for each item
   *
   * @type {Function}
   * @default null
   * @public
   */
  idForItem = null;

  /**
   * Callback when sort option is changed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onSortChange() {}

  /**
   * @type {Boolean}
   * @default false
   */
  selectMode = false;

  /**
   * @type {Number}
   * @default 0
   */
  loadingPosition = 0;

  /**
   * Reference to the `ul` element that makes up the main list.
   * This is used in place of the React implementation's `listRef`.
   *
   * @type {HTMLUListElement}
   * @default null
   */
  listNode = null;

  /**
   * @type {Object}
   */
  defaultResourceName = null;

  /**
   * Internal property used to recreate React implementation's
   * `componentDidUpdate` behaviour.
   *
   * @type {Boolean}
   */
  previousLoading = false;

  /**
   * Internal property used to recreate React implementation's
   * `componentWillReceiveProps` behaviour.
   *
   * @type {String|String[]}
   */
  previousSelectedItems = null;

  @(gt('items.length', 0).readOnly())
  itemsExist;

  @(computedIdVariation('id', 'Select').readOnly())
  selectId;

  /**
   * List of item/id tuples needed for rendering items
   */
  @(computed('items.[]', 'idForItem').readOnly())
  get itemsWithId() {
    let { items, idForItem } = this;
    items = items || [];
    idForItem = idForItem || defaultIdForItem;

    return items.map((item, index) => ({
      item,
      id: idForItem(item, index),
    }));
  }

  @(computed('selectable', 'sortOptions.length', 'alternateTool').readOnly())
  get needsHeader() {
    let { selectable, sortOptions, alternateTool } = this;
    return (
      selectable || (sortOptions && sortOptions.length > 0) || alternateTool
    );
  }

  @(computed('promotedBulkActions.length', 'bulkActions.length').readOnly())
  get selectable() {
    let { promotedBulkActions, bulkActions } = this;
    return Boolean(
      (promotedBulkActions && promotedBulkActions.length > 0) ||
        (bulkActions && bulkActions.length > 0)
    );
  }

  @(computed('selectedItems.length', 'items.length').readOnly())
  get bulkSelectState() {
    let { selectedItems, items } = this;
    let selectState = 'indeterminate';
    if (
      !selectedItems ||
      (Array.isArray(selectedItems) && selectedItems.length === 0)
    ) {
      selectState = false;
    } else if (
      selectedItems === SELECT_ALL_ITEMS ||
      (Array.isArray(selectedItems) && selectedItems.length === items.length)
    ) {
      selectState = true;
    }
    return selectState;
  }

  @(computed(
    'defaultResourceName',
    'items.length',
    'loading',
    'resourceName.{singular,plural}'
  ).readOnly())
  get headerTitle() {
    let { resourceName, items, loading } = this;
    resourceName = resourceName || this.defaultResourceName;

    let itemsCount = items.length;
    let resource =
      itemsCount === 1 && !loading
        ? get(resourceName, 'singular')
        : get(resourceName, 'plural');

    return loading
      ? `Loading ${resource}`
      : `Showing ${itemsCount} ${resource}`;
  }

  @(computed('selectedItems.length', 'items.length').readOnly())
  get bulkActionsLabel() {
    let { selectedItems, items } = this;
    selectedItems = selectedItems || [];

    let selectedItemsCount =
      selectedItems === SELECT_ALL_ITEMS
        ? `${items.length}+`
        : selectedItems.length;

    return `${selectedItemsCount} selected`;
  }

  @(computed(
    'defaultResourceName',
    'items.length',
    'resourceName.{plural,singular}',
    'selectedItems.length'
  ).readOnly())
  get bulkActionsAccessibilityLabel() {
    let { resourceName, selectedItems, items } = this;
    resourceName = resourceName || this.defaultResourceName;
    selectedItems = selectedItems || [];

    let selectedItemsCount = selectedItems.length;
    let totalItemsCount = items.length;
    let allSelected = selectedItemsCount === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return `Deselect ${get(resourceName, 'singular')}`;
    } else if (totalItemsCount === 1) {
      return `Select ${get(resourceName, 'singular')}`;
    } else if (allSelected) {
      return `Deselect all ${items.length} ${get(resourceName, 'plural')}`;
    } else {
      return `Select all ${items.length} ${get(resourceName, 'plural')}`;
    }
  }

  @(computed(
    'defaultResourceName',
    'hasMoreItems',
    'items.length',
    'resourceName.plural',
    'selectable',
    'selectedItems'
  ).readOnly())
  get paginatedSelectAllText() {
    let { hasMoreItems, selectedItems, items, resourceName } = this;
    resourceName = resourceName || this.defaultResourceName;

    if (!this.selectable || !hasMoreItems) {
      return null;
    }

    if (selectedItems === SELECT_ALL_ITEMS) {
      return `All ${items.length}+ ${get(
        resourceName,
        'plural'
      )} in your store are selected.`;
    }

    return null;
  }

  @(computed(
    'defaultResourceName',
    'handleSelectAllItemsInStore',
    'hasMoreItems',
    'items.length',
    'resourceName.plural',
    'selectable',
    'selectedItems'
  ).readOnly())
  get paginatedSelectAllAction() {
    let { hasMoreItems, selectedItems, items, resourceName } = this;
    resourceName = resourceName || this.defaultResourceName;

    if (!this.selectable || !hasMoreItems) {
      return null;
    }

    let actionText =
      selectedItems === SELECT_ALL_ITEMS
        ? 'Undo'
        : `Select all ${items.length}+ ${get(
            resourceName,
            'plural'
          )} in your store`;

    return {
      content: actionText,
      onAction: () => this.handleSelectAllItemsInStore,
    };
  }

  @(computed('defaultResourceName', 'resourceName.plural').readOnly())
  get emptySearchResultTitle() {
    let resourceName = this.resourceName || this.defaultResourceName;
    return `No ${get(resourceName, 'plural')} found`;
  }

  @(computed('filterControl', 'itemsExist', 'loading').readOnly())
  get showEmptyState() {
    let { filterControl, itemsExist, loading } = this;
    return filterControl && !itemsExist && !loading;
  }

  @(computed('loadingPosition').readOnly())
  get spinnerStyle() {
    let { loadingPosition } = this;
    let defaultTopPadding = 8;
    let topPadding = loadingPosition > 0 ? loadingPosition : defaultTopPadding;
    return htmlSafe(`padding-top: ${topPadding}px`);
  }

  @(computed('items.length').readOnly())
  get spinnerSize() {
    return this.items.length < 2 ? 'small' : 'large';
  }

  @(computed(
    'defaultResourceName',
    'loading',
    'resourceName',
    'selectMode',
    'selectable',
    'selectedItems.[]'
  ).readOnly())
  get context() {
    let { selectedItems, resourceName, loading, selectMode, selectable } = this;
    resourceName = resourceName || this.defaultResourceName;
    return {
      selectable,
      selectedItems,
      selectMode,
      resourceName,
      loading,
      onSelectionChange: (...args) => this.handleSelectionChange(...args),
    };
  }

  handleResize() {
    // This is needed to replicate the React implementation's `@debounce` decorator.
    this.debounceTask('debouncedHandleResize', 0);
  }

  debouncedHandleResize() {
    // In the React implementation, the resize event listener
    // is only rendered when `selectable` is truthy. We handle
    // that by bombing out of this handler when that condition
    // is met rather than dynamically managing event listeners.
    if (!this.selectable) {
      return;
    }

    let { selectedItems, selectMode } = this;

    if (
      selectedItems &&
      selectedItems.length === 0 &&
      selectMode &&
      !isSmallScreen()
    ) {
      this.handleSelectMode(false);
    }
  }

  setLoadingPosition() {
    let { listNode } = this;

    if (listNode != null) {
      if (typeof window === 'undefined') {
        return;
      }

      let overlay = listNode.getBoundingClientRect();
      let viewportHeight = Math.max(
        document.documentElement ? document.documentElement.clientHeight : 0,
        window.innerHeight || 0
      );

      let overflow = viewportHeight - overlay.height;

      let spinnerHeight =
        this.items.length === 1 ? SMALL_SPINNER_HEIGHT : LARGE_SPINNER_HEIGHT;

      let spinnerPosition =
        overflow > 0
          ? (overlay.height - spinnerHeight) / 2
          : (viewportHeight - overlay.top - spinnerHeight) / 2;

      this.set('loadingPosition', spinnerPosition);
    }
  }

  handleSelectAllItemsInStore() {
    let { onSelectionChange, selectedItems, items, idForItem } = this;
    idForItem = idForItem || defaultIdForItem;

    let newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, idForItem)
        : SELECT_ALL_ITEMS;

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }

  handleSelectionChange(selected, id) {
    let { onSelectionChange, selectedItems, items, idForItem } = this;
    idForItem = idForItem || defaultIdForItem;

    if (selectedItems == null || onSelectionChange == null) {
      return;
    }

    let newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, idForItem)
        : [...selectedItems];

    if (selected) {
      newlySelectedItems.push(id);
    } else {
      newlySelectedItems.splice(newlySelectedItems.indexOf(id), 1);
    }

    if (newlySelectedItems.length === 0 && !isSmallScreen()) {
      this.handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      this.handleSelectMode(true);
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }

  @action
  handleSelectMode(selectMode) {
    let { onSelectionChange } = this;
    this.set('selectMode', selectMode);
    if (!selectMode && onSelectionChange) {
      onSelectionChange([]);
    }
  }

  @action
  handleToggleAll() {
    let { onSelectionChange, selectedItems, items, idForItem } = this;
    idForItem = idForItem || defaultIdForItem;

    let newlySelectedItems = [];

    if (
      (Array.isArray(selectedItems) && selectedItems.length === items.length) ||
      selectedItems === SELECT_ALL_ITEMS
    ) {
      newlySelectedItems = [];
    } else {
      newlySelectedItems = items.map((item, index) => {
        let id = idForItem(item, index);
        return id;
      });
    }

    if (newlySelectedItems.length === 0 && !isSmallScreen()) {
      this.handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      this.handleSelectMode(true);
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }

  init() {
    super.init(...arguments);

    let { selectedItems } = this;
    this.setProperties({
      defaultResourceName: {
        singular: 'item',
        plural: 'items',
      },
      selectMode: Boolean(selectedItems && selectedItems.length > 0),
    });
  }

  @action
  updateResourceList() {
    assert(
      'ember-polaris::polaris-resource-list - itemComponent must be a component name or definition',
      this.itemComponent
    );

    // This logic is in the React implementation's
    // `componentWillReceiveProps` hook.
    let { selectedItems, previousSelectedItems } = this;

    if (
      previousSelectedItems &&
      previousSelectedItems.length > 0 &&
      (!selectedItems || selectedItems.length === 0) &&
      !isSmallScreen()
    ) {
      this.set('selectMode', false);
    }

    // This logic is in the React implementation's
    // `componentDidUpdate` hook.

    // TODO: check if we need this that's in the React implementation.
    // if (
    //    this.listRef.current &&
    //    this.itemsExist() &&
    //    !this.itemsExist(prevItems)
    //  ) {
    //    this.forceUpdate(); -> triggers rerender of component.
    //  }

    let { loading, previousLoading } = this;

    if (loading && !previousLoading) {
      this.setLoadingPosition();
    }

    this.setProperties({
      previousSelectedItems: selectedItems,
      previousLoading: loading,
    });
  }

  @action
  insertResourceList() {
    this.addEventListener(window, 'resize', this.handleResize);

    if (this.loading) {
      this.setLoadingPosition();
    }
  }

  @action
  insertListNode(element) {
    this.set('listNode', element);
  }
}

function getAllItemsOnPage(items, idForItem) {
  return items.map((item, index) => idForItem(item, index));
}

function defaultIdForItem(item, index) {
  // Not calling `item.hasOwnProperty` directly here because
  // it blows up if the passed-in item came from the `hash`
  // helper.
  return Object.hasOwnProperty.call(item, 'id')
    ? get(item, 'id')
    : index.toString();
}

function isSmallScreen() {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth <= SMALL_SCREEN_WIDTH;
}
