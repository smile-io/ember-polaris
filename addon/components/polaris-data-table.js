import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank, isPresent, isNone } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { scheduleOnce, debounce } from '@ember/runloop';
import { assign } from '@ember/polyfills';
import layout from '../templates/components/polaris-data-table';

const eventHandlerParams = [
  [ window, 'resize', 'handleResize' ],
  [ window, 'scroll', 'scrollListener', true ],
];

function volatileElementLookup(selector) {
  return computed(function() {
    return this.element.querySelector(selector);
  }).volatile();
}

function measureColumn(tableData) {
  return function(column, index) {
    let {
      tableLeftVisibleEdge,
      tableRightVisibleEdge,
      firstVisibleColumnIndex,
      fixedColumnWidth,
    } = tableData;
    let width = column.offsetWidth;
    let leftEdge = column.offsetLeft - fixedColumnWidth;
    let rightEdge = leftEdge + width;
    let leftEdgeIsVisible = isEdgeVisible(
      leftEdge,
      tableLeftVisibleEdge,
      tableRightVisibleEdge,
    );
    let rightEdgeIsVisible = isEdgeVisible(
      rightEdge,
      tableLeftVisibleEdge,
      tableRightVisibleEdge,
    );
    let isCompletelyVisible =
      leftEdge < tableLeftVisibleEdge && rightEdge > tableRightVisibleEdge;
    let isVisible =
      isCompletelyVisible || leftEdgeIsVisible || rightEdgeIsVisible;
    if (isVisible) {
      tableData.firstVisibleColumnIndex = Math.min(
        firstVisibleColumnIndex,
        index,
      );
    }
    return {leftEdge, rightEdge, isVisible};
  };
}

function isEdgeVisible(target, start, end) {
  let minVisiblePixels = 30;
  return target >= start + minVisiblePixels && target <= end - minVisiblePixels;
}

function getPrevAndCurrentColumns(tableData, columnData) {
  let {
    tableRightVisibleEdge,
    tableLeftVisibleEdge,
    firstVisibleColumnIndex,
  } = tableData;
  let previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0);
  let previousColumn = columnData[previousColumnIndex];
  let lastColumnIndex = columnData.length - 1;
  let lastColumn = columnData[lastColumnIndex];
  let currentColumn = assign(
    {
      isScrolledFarthestLeft:
        firstVisibleColumnIndex === 0 && tableLeftVisibleEdge === 0,
      isScrolledFarthestRight: lastColumn.rightEdge <= tableRightVisibleEdge,
    },
    columnData[firstVisibleColumnIndex]
  );
  return {previousColumn, currentColumn};
}

/**
 * Polaris data table component.
 * See https://polaris.shopify.com/components/lists-and-tables/data-table
 */
export default Component.extend({
  classNameBindings: ['collapsed:Polaris-DataTable--collapsed'],

  layout,

  /**
   * List of data types, which determines content alignment for each column.
   * Data types are "text," which aligns left, or "numeric," which aligns right.
   *
   * @property columnContentTypes
   * @type {String[]}
   * @public
   */
  columnContentTypes: null,

  /**
   * List of column headings.
   *
   * @property headings
   * @type {String[]}
   * @public
   */
  headings: null,

  /**
   * List of numeric column totals, highlighted in the table’s header below column headings.
   * Use empty strings as placeholders for columns with no total.
   *
   * @property totals
   * @type {Array}
   * @public
   */
  totals: null,

  /**
   * Lists of data points which map to table body rows.
   *
   * @property rows
   * @type {Array[]}
   * @public
   */
  rows: null,

  /**
   * Truncate content in first column instead of wrapping.
   *
   * @property truncate
   * @type {boolean}
   * @default false
   * @public
   */
  truncate: false,

  /**
   * Content centered in the full width cell of the table footer row.
   *
   * @property footerContent
   * @type {String|Number|Component}
   * @public
   */
  footerContent: null,

  /**
   * List of booleans, which maps to whether sorting is enabled or not for each column.
   * Defaults to false for all columns.
   *
   * @property sortable
   * @type {boolean[]}
   * @public
   */
  sortable: null,

  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading.
   * Defaults to ascending.
   *
   * @property defaultSortDirection
   * @type {String}
   * @default 'ascending'
   * @public
   */
  defaultSortDirection: 'ascending',

  /**
   * The index of the heading that the table rows are initially sorted by.
   * Defaults to the first column.
   *
   * @property initialSortColumnIndex
   * @type {Number}
   * @default 0
   * @public
   */
  initialSortColumnIndex: 0,

  /**
   * Callback fired on click or keypress of a sortable column heading.
   *
   * @property onSort
   * @type {function}
   * @public
   */
  onSort(/* headingIndex, direction */) {},

  /**
   * @property collapsed
   * @type {boolean}
   * @default false
   * @private
   */
  collapsed: false,

  /**
   * @property columnVisibilityData
   * @type {Object[]}
   * @private
   */
  columnVisibilityData: null,

  /**
   * @property previousColumn
   * @type {Object}
   * @private
   */
  previousColumn: null,

  /**
   * @property currentColumn
   * @type {Object}
   * @private
   */
  currentColumn: null,

  /**
   * @property sorted
   * @type {boolean}
   * @default false
   * @private
   */
  sorted: false,

  /**
   * @property sortedColumnIndex
   * @type {Number}
   * @private
   */
  sortedColumnIndex: null,

  /**
   * @property sortDirection
   * @type {String}
   * @private
   */
  sortDirection: null,

  /**
   * @property heights
   * @type {Number[]}
   * @private
   */
  heights: null,

  /**
   * @property preservedScrollPosition
   * @type {Object}
   * @private
   */
  preservedScrollPosition: null,

  /**
   * @property previousTruncate
   * @type {boolean}
   * @private
   */
  previousTruncate: null,

  /**
   * @property totalsRowHeading
   * @type {String}
   * @private
   */
  totalsRowHeading: 'Totals',

  /**
   * @property eventHandlerParams
   * @type {Array[]}
   * @private
   */
  eventHandlerParams,

  /**
   * @property dataTable
   * @type {HTMLElement}
   * @private
   */
  dataTable: volatileElementLookup('.Polaris-DataTable').readOnly(),

  /**
   * @property scrollContainer
   * @type {HTMLElement}
   * @private
   */
  scrollContainer: volatileElementLookup('.Polaris-DataTable__ScrollContainer').readOnly(),

  /**
   * @property table
   * @type {HTMLElement}
   * @private
   */
  table: volatileElementLookup('.Polaris-DataTable__Table').readOnly(),

  /**
   * @property contentTypes
   * @type {String[]}
   * @private
   */
  contentTypes: computed('columnContentTypes.[]', function() {
    let columnContentTypes = this.get('columnContentTypes');
    let fixedCellType = columnContentTypes[0];

    return [ fixedCellType, ...columnContentTypes ];
  }).readOnly(),

  /**
   * @property scrollContainerStyle
   * @type {String}
   * @private
   */
  scrollContainerStyle: computed('footerContent', 'heights.[]', function() {
    if (isBlank(this.get('footerContent'))) {
      return null;
    }

    return htmlSafe(`margin-bottom: ${ this.get('heights.lastObject') }px;`);
  }).readOnly(),

  resetScrollPosition() {
    let { left, top } = this.get('preservedScrollPosition');

    if (left) {
      this.get('scrollContainer').scrollLeft = left;
    }

    if (top) {
      window.scrollTo(0, top);
    }
  },

  setHeightsAndScrollPosition() {
    this.set('heights', this.tallestCellHeights());

    scheduleOnce('afterRender', this, this.resetScrollPosition);
  },

  calculateColumnVisibilityData(collapsed) {
    if (collapsed) {
      let headerCells = this.get('table').querySelectorAll(
        '[class*=header]',
      );
      let collapsedHeaderCells = Array.from(headerCells).slice(2);
      let fixedColumnWidth = headerCells[0].offsetWidth;
      let tableData = {
        fixedColumnWidth,
        firstVisibleColumnIndex: collapsedHeaderCells.length - 1,
        tableLeftVisibleEdge: this.get('scrollContainer').scrollLeft,
        tableRightVisibleEdge:
          this.get('scrollContainer').scrollLeft +
          (this.get('dataTable').offsetWidth - fixedColumnWidth),
      };
      let columnVisibilityData = collapsedHeaderCells.map(
        measureColumn(tableData),
      );

      return assign(
        {
          columnVisibilityData,
        },
        getPrevAndCurrentColumns(tableData, columnVisibilityData)
      );
    }

    return {
      columnVisibilityData: [],
      previousColumn: undefined,
      currentColumn: undefined,
    };
  },

  handleResize() {
    // This is needed to replicate the React implementation's `@debounce` decorator.
    debounce(this, 'debouncedHandleResize', 0);
  },

  debouncedHandleResize() {
    let { footerContent, truncate } = this.getProperties('footerContent', 'truncate');
    let collapsed = this.get('table.scrollWidth') > this.get('dataTable.offsetWidth');

    this.get('scrollContainer').scrollLeft = 0;
    this.setProperties(assign(
      {
        collapsed,
        heights: [],
      },
      this.calculateColumnVisibilityData(collapsed),
    ));

    scheduleOnce('afterRender', () => {
      if (footerContent || !truncate) {
        this.setHeightsAndScrollPosition();
      }
    });
  },

  scrollListener() {
    this.setProperties(this.calculateColumnVisibilityData(this.get('collapsed')));
  },

  tallestCellHeights() {
    let { footerContent, truncate, heights } = this.getProperties('footerContent', 'truncate', 'heights');
    let rows = Array.from(this.get('table').getElementsByTagName('tr'));

    if (!truncate) {
      return (heights = rows.map((row) => {
        let fixedCell = row.children[0];
        return Math.max(row.clientHeight, fixedCell.clientHeight);
      }));
    }

    if (footerContent) {
      let footerCellHeight = rows[rows.length - 1].children[0].clientHeight;
      heights = [footerCellHeight];
    }

    return heights;
  },

  addEventHandlers() {
    this.get('eventHandlerParams').forEach(([ target, eventName, callbackName, ...rest ]) => {
      target.addEventListener(eventName, this[callbackName].bind(this), ...rest);
    });
  },

  removeEventHandlers() {
    this.get('eventHandlerParams').forEach(([ target, eventName, callbackName, ...rest ]) => {
      target.removeEventListener(eventName, this[callbackName].bind(this), ...rest);
    });
  },

  /*
   * Lifecycle hooks.
   */
  init() {
    this._super(...arguments);

    this.setProperties({
      columnVisibilityData: [],
      sorted: isPresent(this.get('sortable')),
      heights: [],
      preservedScrollPosition: {},
    });
  },

  didInsertElement() {
    this._super(...arguments);

    this.handleResize();

    this.addEventHandlers();
  },

  willDestroyElement() {
    this.removeEventHandlers();
  },

  didUpdateAttrs() {
    this._super(...arguments);

    let truncate = this.get('truncate');
    if (!truncate && this.get('previousTruncate')) {
      this.handleResize();
    }

    this.set('previousTruncate', truncate);
  },

  actions: {
    navigateTable(direction) {
      let { scrollContainer, currentColumn, previousColumn } = this.getProperties('scrollContainer', 'currentColumn', 'previousColumn');

      if (direction === 'right' && currentColumn) {
        scrollContainer.scrollLeft = currentColumn.rightEdge;
      } else if (previousColumn) {
        scrollContainer.scrollLeft =
          previousColumn.leftEdge < 10 ? 0 : previousColumn.leftEdge;
      }

      // TODO: use run loop instead of `requestAnimationFrame` here?
      requestAnimationFrame(() => {
        this.setProperties(this.calculateColumnVisibilityData(this.get('collapsed')));
      });
    },

    defaultOnSort(headingIndex) {
      let {
        onSort,
        truncate,
        defaultSortDirection = 'ascending',
        initialSortColumnIndex,
        sortDirection,
        sortedColumnIndex,
      } = this.getProperties('onSort', 'truncate', 'defaultSortDirection', 'initialSortColumnIndex', 'sortDirection', 'sortedColumnIndex');
      sortedColumnIndex = isNone(sortedColumnIndex) ? initialSortColumnIndex : sortedColumnIndex;
      let newSortDirection = defaultSortDirection;
      if (sortedColumnIndex === headingIndex) {
        newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
      }

      this.setProperties({
        sorted: true,
        sortDirection: newSortDirection,
        sortedColumnIndex: headingIndex,
      });

      scheduleOnce('afterRender', () => {
        if (onSort) {
          onSort(headingIndex, newSortDirection);
          if (!truncate) {
            let preservedScrollPosition = {
              left: this.get('scrollContainer').scrollLeft,
              top: window.scrollY,
            };
            this.set('preservedScrollPosition', preservedScrollPosition);
            this.handleResize();
          }
        }
      });
    },
  }
});
