import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { gt } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import { assert } from '@ember/debug';
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
export default Component.extend(
  ContextBoundEventListenersMixin,
  ContextBoundTasksMixin,
  {
    tagName: '',

    layout,

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
     * Component to display instead of the sort control
     *
     * @property alternateTool
     * @type {Component|Object}
     * @default null
     * @public
     */
    alternateTool: null,

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
     * Callback when selection is changed
     *
     * @property onSelectionChange
     * @type {Function}
     * @default null
     * @public
     */
    onSelectionChange: null,

    /**
     * Function to customize the unique ID for each item
     *
     * @property idForItem
     * @type {Function}
     * @default null
     * @public
     */
    idForItem: null,

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
     * Reference to the `ul` element that makes up the main list.
     * This is used in place of the React implementation's `listRef`.
     *
     * @property listNode
     * @type {HTMLUListElement}
     * @default null
     * @private
     */
    listNode: null,

    /**
     * @property defaultResourceName
     * @type {Object}
     * @private
     */
    defaultResourceName: null,

    /**
     * Internal property used to recreate React implementation's
     * `componentDidUpdate` behaviour.
     *
     * @property previousLoading
     * @type {Boolean}
     * @private
     */
    previousLoading: false,

    /**
     * Internal property used to recreate React implementation's
     * `componentWillReceiveProps` behaviour.
     *
     * @property previousSelectedItems
     * @type {String|String[]}
     * @private
     */
    previousSelectedItems: null,

    itemsExist: gt('items.length', 0).readOnly(),

    selectId: computedIdVariation('id', 'Select').readOnly(),

    /**
     * ID used to identify our wrapper element from other instances
     */
    wrapperId: computed(function() {
      return guidFor(this);
    }).readOnly(),

    /**
     * List of item/id tuples needed for rendering items
     */
    itemsWithId: computed('items.[]', 'idForItem', function() {
      let { items, idForItem } = this.getProperties('items', 'idForItem');
      items = items || [];
      idForItem = idForItem || defaultIdForItem;

      return items.map((item, index) => {
        return {
          item,
          id: idForItem(item, index),
        };
      });
    }).readOnly(),

    needsHeader: computed(
      'selectable',
      'sortOptions.length',
      'alternateTool',
      function() {
        let { selectable, sortOptions, alternateTool } = this.getProperties(
          'selectable',
          'sortOptions',
          'alternateTool'
        );
        return (
          selectable || (sortOptions && sortOptions.length > 0) || alternateTool
        );
      }
    ).readOnly(),

    selectable: computed(
      'promotedBulkActions.length',
      'bulkActions.length',
      function() {
        let { promotedBulkActions, bulkActions } = this.getProperties(
          'promotedBulkActions',
          'bulkActions'
        );
        return Boolean(
          (promotedBulkActions && promotedBulkActions.length > 0) ||
            (bulkActions && bulkActions.length > 0)
        );
      }
    ).readOnly(),

    bulkSelectState: computed(
      'selectedItems.length',
      'items.length',
      function() {
        let { selectedItems, items } = this.getProperties(
          'selectedItems',
          'items'
        );
        let selectState = 'indeterminate';
        if (
          !selectedItems ||
          (Array.isArray(selectedItems) && selectedItems.length === 0)
        ) {
          selectState = false;
        } else if (
          selectedItems === SELECT_ALL_ITEMS ||
          (Array.isArray(selectedItems) &&
            selectedItems.length === items.length)
        ) {
          selectState = true;
        }
        return selectState;
      }
    ).readOnly(),

    headerTitle: computed(
      'resourceName.{singular,plural}',
      'items.length',
      'loading',
      function() {
        let { resourceName, items, loading } = this.getProperties(
          'resourceName',
          'items',
          'loading'
        );
        resourceName = resourceName || this.get('defaultResourceName');

        let itemsCount = items.length;
        let resource =
          itemsCount === 1 && !loading
            ? get(resourceName, 'singular')
            : get(resourceName, 'plural');

        return loading
          ? `Loading ${resource}`
          : `Showing ${itemsCount} ${resource}`;
      }
    ).readOnly(),

    bulkActionsLabel: computed(
      'selectedItems.length',
      'items.length',
      function() {
        let { selectedItems, items } = this.getProperties(
          'selectedItems',
          'items'
        );
        selectedItems = selectedItems || [];

        let selectedItemsCount =
          selectedItems === SELECT_ALL_ITEMS
            ? `${items.length}+`
            : selectedItems.length;

        return `${selectedItemsCount} selected`;
      }
    ).readOnly(),

    bulkActionsAccessibilityLabel: computed(
      'resourceName.{singular,plural}',
      'selectedItems.length',
      'items.length',
      function() {
        let { resourceName, selectedItems, items } = this.getProperties(
          'resourceName',
          'selectedItems',
          'items'
        );
        resourceName = resourceName || this.get('defaultResourceName');
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
    ).readOnly(),

    paginatedSelectAllText: computed(
      'hasMoreItems',
      'selectedItems',
      'items.length',
      'resourceName.plural',
      function() {
        let {
          hasMoreItems,
          selectedItems,
          items,
          resourceName,
        } = this.getProperties(
          'hasMoreItems',
          'selectedItems',
          'items',
          'resourceName'
        );
        resourceName = resourceName || this.get('defaultResourceName');

        if (!this.get('selectable') || !hasMoreItems) {
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
    ).readOnly(),

    paginatedSelectAllAction: computed(
      'hasMoreItems',
      'selectedItems',
      'items.length',
      'resourceName.plural',
      function() {
        let {
          hasMoreItems,
          selectedItems,
          items,
          resourceName,
        } = this.getProperties(
          'hasMoreItems',
          'selectedItems',
          'items',
          'resourceName'
        );
        resourceName = resourceName || this.get('defaultResourceName');

        if (!this.get('selectable') || !hasMoreItems) {
          return;
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
    ).readOnly(),

    emptySearchResultTitle: computed('resourceName.plural', function() {
      let resourceName =
        this.get('resourceName') || this.get('defaultResourceName');

      return `No ${get(resourceName, 'plural')} found`;
    }).readOnly(),

    showEmptyState: computed(
      'filterControl',
      'itemsExist',
      'loading',
      function() {
        let { filterControl, itemsExist, loading } = this.getProperties(
          'filterControl',
          'itemsExist',
          'loading'
        );

        return filterControl && !itemsExist && !loading;
      }
    ).readOnly(),

    spinnerStyle: computed('loadingPosition', function() {
      let loadingPosition = this.get('loadingPosition');
      let defaultTopPadding = 8;
      let topPadding =
        loadingPosition > 0 ? loadingPosition : defaultTopPadding;
      return htmlSafe(`padding-top: ${topPadding}px`);
    }).readOnly(),

    spinnerSize: computed('items.length', function() {
      return this.get('items.length') < 2 ? 'small' : 'large';
    }).readOnly(),

    context: computed(
      'selectedItems.[]',
      'resourceName',
      'loading',
      'selectMode',
      'selectable',
      function() {
        let {
          selectedItems,
          resourceName,
          loading,
          selectMode,
          selectable,
        } = this.getProperties(
          'selectedItems',
          'resourceName',
          'loading',
          'selectMode',
          'selectable'
        );
        resourceName = resourceName || this.get('defaultResourceName');
        return {
          selectable,
          selectedItems,
          selectMode,
          resourceName,
          loading,
          onSelectionChange: (...args) => {
            return this.handleSelectionChange(...args);
          },
        };
      }
    ).readOnly(),

    handleResize() {
      // This is needed to replicate the React implementation's `@debounce` decorator.
      this.debounceTask('debouncedHandleResize', 0);
    },

    debouncedHandleResize() {
      // In the React implementation, the resize event listener
      // is only rendered when `selectable` is truthy. We handle
      // that by bombing out of this handler when that condition
      // is met rather than dynamically managing event listeners.
      if (!this.get('selectable')) {
        return;
      }

      let { selectedItems, selectMode } = this.getProperties(
        'selectedItems',
        'selectMode'
      );

      if (
        selectedItems &&
        selectedItems.length === 0 &&
        selectMode &&
        !isSmallScreen()
      ) {
        this.handleSelectMode(false);
      }
    },

    setLoadingPosition() {
      let listNode = this.get('listNode');

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
          this.get('items.length') === 1
            ? SMALL_SPINNER_HEIGHT
            : LARGE_SPINNER_HEIGHT;

        let spinnerPosition =
          overflow > 0
            ? (overlay.height - spinnerHeight) / 2
            : (viewportHeight - overlay.top - spinnerHeight) / 2;

        this.set('loadingPosition', spinnerPosition);
      }
    },

    handleSelectAllItemsInStore() {
      let {
        onSelectionChange,
        selectedItems,
        items,
        idForItem,
      } = this.getProperties(
        'onSelectionChange',
        'selectedItems',
        'items',
        'idForItem'
      );
      idForItem = idForItem || defaultIdForItem;

      let newlySelectedItems =
        selectedItems === SELECT_ALL_ITEMS
          ? getAllItemsOnPage(items, idForItem)
          : SELECT_ALL_ITEMS;

      if (onSelectionChange) {
        onSelectionChange(newlySelectedItems);
      }
    },

    handleSelectionChange(selected, id) {
      let {
        onSelectionChange,
        selectedItems,
        items,
        idForItem,
      } = this.getProperties(
        'onSelectionChange',
        'selectedItems',
        'items',
        'idForItem'
      );
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
    },

    handleSelectMode(selectMode) {
      let onSelectionChange = this.get('onSelectionChange');
      this.set('selectMode', selectMode);
      if (!selectMode && onSelectionChange) {
        onSelectionChange([]);
      }
    },

    handleToggleAll() {
      let {
        onSelectionChange,
        selectedItems,
        items,
        idForItem,
      } = this.getProperties(
        'onSelectionChange',
        'selectedItems',
        'items',
        'idForItem'
      );
      idForItem = idForItem || defaultIdForItem;

      let newlySelectedItems = [];

      if (
        (Array.isArray(selectedItems) &&
          selectedItems.length === items.length) ||
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
    },

    setListNode() {
      let listNode =
        document.querySelector(
          `#${this.get('wrapperId')} ul.Polaris-ResourceList`
        ) || null;
      this.set('listNode', listNode);
    },

    init() {
      this._super(...arguments);

      let selectedItems = this.get('selectedItems');
      this.setProperties({
        defaultResourceName: {
          singular: 'item',
          plural: 'items',
        },
        selectMode: Boolean(selectedItems && selectedItems.length > 0),
      });
    },

    didReceiveAttrs() {
      this._super(...arguments);

      assert(
        'ember-polaris::polaris-resource-list - itemComponent must be a component name or definition',
        this.get('itemComponent')
      );

      // This logic is in the React implementation's
      // `componentWillReceiveProps` hook.
      let { selectedItems, previousSelectedItems } = this.getProperties(
        'selectedItems',
        'previousSelectedItems'
      );

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

      let { loading, previousLoading } = this.getProperties(
        'loading',
        'previousLoading'
      );

      if (loading && !previousLoading) {
        this.setLoadingPosition();
      }

      this.setProperties({
        previousSelectedItems: selectedItems,
        previousLoading: loading,
      });
    },

    didInsertElement() {
      this._super(...arguments);

      this.addEventListener(window, 'resize', this.handleResize);

      if (this.get('loading')) {
        this.setLoadingPosition();
      }
    },

    didRender() {
      this._super(...arguments);

      this.setListNode();
    },
  }
);

function getAllItemsOnPage(items, idForItem) {
  return items.map((item, index) => {
    return idForItem(item, index);
  });
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
