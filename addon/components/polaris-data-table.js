import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { scheduleOnce } from '@ember/runloop';
import { assign } from '@ember/polyfills';
import { isEqual } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import ContextBoundTasksMixin from 'ember-lifeline/mixins/run';
import layout from '../templates/components/polaris-data-table';
import { measureColumn, getPrevAndCurrentColumns } from '../utils/data-table';
import deprecateClassArgument from '../utils/deprecate-class-argument';

function elementLookup(selector) {
  return computed('dataTableElement', function () {
    return this.dataTableElement.querySelector(selector);
  });
}

/**
 * Polaris data table component.
 * See https://polaris.shopify.com/components/lists-and-tables/data-table
 */
@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisDataTable extends Component.extend(
  ContextBoundEventListenersMixin,
  ContextBoundTasksMixin
) {
  /**
   * List of data types, which determines content alignment for each column.
   * Data types are "text," which aligns left, or "numeric," which aligns right.
   *
   * @type {String[]}
   * @public
   */
  columnContentTypes = null;

  /**
   * List of column headings.
   *
   * @type {String[]}
   * @public
   */
  headings = null;

  /**
   * List of numeric column totals, highlighted in the table’s header below column headings.
   * Use empty strings as placeholders for columns with no total.
   *
   * @type {Array}
   * @public
   */
  totals = null;

  /**
   * Lists of data points which map to table body rows.
   *
   * @type {Array[]}
   * @public
   */
  rows = null;

  /**
   * Truncate content in first column instead of wrapping.
   *
   * @type {boolean}
   * @default false
   * @public
   */
  truncate = false;

  /**
   * Content centered in the full width cell of the table footer row.
   *
   * @type {String|Number|Component}
   * @public
   */
  footerContent = null;

  /**
   * List of booleans, which maps to whether sorting is enabled or not for each column.
   * Defaults to false for all columns.
   *
   * @type {boolean[]}
   * @public
   */
  sortable = null;

  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading.
   * Defaults to ascending.
   *
   * @type {String}
   * @default 'ascending'
   * @public
   */
  defaultSortDirection = 'ascending';

  /**
   * The index of the heading that the table rows are initially sorted by.
   * Defaults to the first column.
   *
   * @type {Number}
   * @default 0
   * @public
   */
  initialSortColumnIndex = 0;

  /**
   * Callback fired on click or keypress of a sortable column heading.
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onSort(/* headingIndex, direction */) {}

  /**
   * @type {Boolean}
   * @default false
   */
  collapsed = false;

  /**
   * @type {Object[]}
   */
  columnVisibilityData = [];

  /**
   * @type {Object}
   */
  previousColumn = null;

  /**
   * @type {Object}
   */
  currentColumn = null;

  /**
   * @type {Number}
   */
  sortedColumnIndex = null;

  /**
   * @type {String}
   */
  sortDirection = null;

  /**
   * @type {Number[]}
   */
  heights = [];

  /**
   * @type {Number}
   */
  fixedColumnWidth = null;

  /**
   * @type {Object}
   */
  preservedScrollPosition = {};

  /**
   * @type {Boolean}
   */
  isScrolledFarthestLeft = true;

  /**
   * @type {Boolean}
   */
  isScrolledFarthestRight = false;

  /**
   * @type {String}
   */
  totalsRowHeading = 'Totals';

  /**
   * @type {HTMLElement}
   */
  @(elementLookup('.Polaris-DataTable').readOnly())
  dataTable;

  /**
   * @type {HTMLElement}
   */
  @(elementLookup('.Polaris-DataTable__Table').readOnly())
  table;

  /**
   * @type {HTMLElement}
   */
  @(elementLookup('.Polaris-DataTable__ScrollContainer').readOnly())
  scrollContainer;

  /**
   * @type {String}
   */
  @(computed('footerContent', 'heights.[]').readOnly())
  get scrollContainerStyle() {
    if (isBlank(this.footerContent)) {
      return null;
    }

    return htmlSafe(`margin-bottom: ${this.heights.lastObject}px;`);
  }

  resetScrollPosition() {
    let { scrollContainer } = this;

    if (scrollContainer) {
      let { left, top } = this.preservedScrollPosition;

      if (left) {
        scrollContainer.scrollLeft = left;
      }

      if (top) {
        window.scrollTo(0, top);
      }
    }
  }

  setHeightsAndScrollPosition() {
    this.set('heights', this.tallestCellHeights());

    scheduleOnce('afterRender', this, this.resetScrollPosition);
  }

  calculateColumnVisibilityData(collapsed) {
    let { table, scrollContainer, dataTable } = this;

    if (collapsed && table && scrollContainer && dataTable) {
      let headerCells = table.querySelectorAll('[data-polaris-header-cell]');
      let collapsedHeaderCells = Array.from(headerCells).slice(1);
      let fixedColumnWidth = headerCells[0].offsetWidth;
      let firstVisibleColumnIndex = collapsedHeaderCells.length - 1;
      let tableLeftVisibleEdge = scrollContainer.scrollLeft + fixedColumnWidth;
      let tableRightVisibleEdge =
        scrollContainer.scrollLeft + dataTable.offsetWidth;

      let tableData = {
        fixedColumnWidth,
        firstVisibleColumnIndex,
        tableLeftVisibleEdge,
        tableRightVisibleEdge,
      };

      let columnVisibilityData = collapsedHeaderCells.map(
        measureColumn(tableData)
      );

      let lastColumn = columnVisibilityData[columnVisibilityData.length - 1];

      return assign(
        {
          fixedColumnWidth,
          columnVisibilityData,
          isScrolledFarthestLeft: tableLeftVisibleEdge === fixedColumnWidth,
          isScrolledFarthestRight:
            lastColumn.rightEdge <= tableRightVisibleEdge,
        },
        getPrevAndCurrentColumns(tableData, columnVisibilityData)
      );
    }

    return {
      columnVisibilityData: [],
      previousColumn: undefined,
      currentColumn: undefined,
    };
  }

  handleResize() {
    // This is needed to replicate the React implementation's `@debounce` decorator.
    this.debounceTask('debouncedHandleResize', 0);
  }

  debouncedHandleResize() {
    let { footerContent, truncate, table, scrollContainer } = this;

    let collapsed = false;

    if (table && scrollContainer) {
      collapsed = table.scrollWidth > scrollContainer.clientWidth;
      scrollContainer.scrollLeft = 0;
    }

    this.setProperties(
      assign(
        {
          collapsed,
          heights: [],
        },
        this.calculateColumnVisibilityData(collapsed)
      )
    );

    if (footerContent || !truncate) {
      scheduleOnce('afterRender', this, this.setHeightsAndScrollPosition);
    }
  }

  scrollListener() {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    this.setProperties(this.calculateColumnVisibilityData(this.collapsed));
  }

  tallestCellHeights() {
    let { footerContent, truncate, heights, table } = this;

    if (table) {
      let rows = Array.from(table.getElementsByTagName('tr'));

      if (!truncate) {
        return (heights = rows.map((row) => {
          let fixedCell = row.hasChildNodes() && row.children[0];
          return Math.max(row.clientHeight, fixedCell.clientHeight);
        }));
      }

      if (footerContent) {
        let footerCellHeight = rows[rows.length - 1].childNodes[0].clientHeight;
        heights = [footerCellHeight];
      }

      return heights;
    }
  }

  addEventHandlers() {
    this.addEventListener(window, 'resize', this.handleResize);
    this.addEventListener(window, 'scroll', this.scrollListener, {
      capture: true,
    });
  }

  @action
  insertDataTable(element) {
    this.set('dataTableElement', element);
    this.handleResize();
    this.addEventHandlers();
  }

  // footerContent, truncate, and rows are passed in via template
  // in order to re-trigger the `did-update` modifier to run
  // when these attributes change.
  @action
  updateDataTable(/**footerContent, truncate, rows */) {
    if (isEqual(this.get('oldAttrs'), this.get('attrs'))) {
      return;
    }

    this.handleResize();

    this.set('oldAttrs', this.get('attrs'));
  }

  @action
  navigateTable(direction) {
    let {
      currentColumn,
      previousColumn,
      fixedColumnWidth,
      scrollContainer,
    } = this;

    if (!currentColumn || !previousColumn || !fixedColumnWidth) {
      return;
    }

    if (scrollContainer) {
      scrollContainer.scrollLeft =
        direction === 'right'
          ? currentColumn.rightEdge - fixedColumnWidth
          : previousColumn.leftEdge - fixedColumnWidth;

      // TODO: use run loop instead of `requestAnimationFrame` here?
      requestAnimationFrame(() => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }

        this.setProperties(this.calculateColumnVisibilityData(this.collapsed));
      });
    }
  }

  @action
  defaultOnSort(headingIndex) {
    let {
      onSort,
      truncate,
      defaultSortDirection = 'ascending',
      initialSortColumnIndex,
      sortDirection,
      sortedColumnIndex,
      scrollContainer,
    } = this;

    sortDirection = sortDirection || defaultSortDirection;
    sortedColumnIndex = isNone(sortedColumnIndex)
      ? initialSortColumnIndex
      : sortedColumnIndex;
    let newSortDirection = defaultSortDirection;
    if (sortedColumnIndex === headingIndex) {
      newSortDirection =
        sortDirection === 'ascending' ? 'descending' : 'ascending';
    }

    this.setProperties({
      sortDirection: newSortDirection,
      sortedColumnIndex: headingIndex,
    });

    /* eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions */
    scheduleOnce('afterRender', () => {
      if (onSort) {
        onSort(headingIndex, newSortDirection);

        if (!truncate && scrollContainer) {
          let preservedScrollPosition = {
            left: scrollContainer.scrollLeft,
            top: window.scrollY,
          };
          this.set('preservedScrollPosition', preservedScrollPosition);
          this.handleResize();
        }
      }
    });
  }
}
