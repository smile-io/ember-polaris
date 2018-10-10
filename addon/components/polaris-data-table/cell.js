import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { isNone } from '@ember/utils';
import layout from '../../templates/components/polaris-data-table/cell';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * @property height
   * @type {Number}
   * @public
   */
  height: null,

  /**
   * @property text
   * @type {String|Component}
   * @public
   */
  text: null,

  /**
   * @property contentType
   * @type {String}
   * @public
   */
  contentType: null,

  /**
   * @property fixed
   * @type {boolean}
   * @default false
   * @public
   */
  fixed: false,

  /**
   * @property truncate
   * @type {boolean}
   * @default false
   * @public
   */
  truncate: false,

  /**
   * @property header
   * @type {boolean}
   * @default false
   * @public
   */
  header: false,

  /**
   * @property total
   * @type {boolean}
   * @default false
   * @public
   */
  total: false,

  /**
   * @property footer
   * @type {boolean}
   * @default false
   * @public
   */
  footer: false,

  /**
   * @property sorted
   * @type {boolean}
   * @default false
   * @public
   */
  sorted: false,

  /**
   * @property sortable
   * @type {boolean}
   * @default false
   * @public
   */
  sortable: false,

  /**
   * @property sortDirection
   * @type {String}
   * @public
   */
  sortDirection: null,

  /**
   * @property defaultSortDirection
   * @type {String}
   * @public
   */
  defaultSortDirection: null,

  /**
   * @property onSort
   * @type {function}
   * @default no-op
   * @public
   */
  onSort() {},

  /**
   * @property cellClassNames
   * @type {String}
   * @private
   */
  cellClassNames: computed(
    'fixed',
    'truncate',
    'header',
    'total',
    'footer',
    'contentType',
    'sorted',
    'sortable',
    function() {
      let classNames = ['Polaris-DataTable__Cell'];

      let {
        fixed,
        truncate,
        header,
        total,
        footer,
        contentType,
        sorted,
        sortable,
      } = this.getProperties(
        'fixed',
        'truncate',
        'header',
        'total',
        'footer',
        'contentType',
        'sorted',
        'sortable'
      );

      if (fixed) {
        classNames.push('Polaris-DataTable__Cell--fixed');

        if (truncate) {
          classNames.push('Polaris-DataTable__Cell--truncated');
        }
      }

      if (header) {
        classNames.push('Polaris-DataTable__Cell--header');
      }

      if (total) {
        classNames.push('Polaris-DataTable__Cell--total');
      }

      if (footer) {
        classNames.push('Polaris-DataTable__Cell--footer');
      }

      if (contentType === 'numeric') {
        classNames.push('Polaris-DataTable__Cell--numeric');
      }

      if (sorted) {
        classNames.push('Polaris-DataTable__Cell--sorted');
      }

      if (sortable) {
        classNames.push('Polaris-DataTable__Cell--sortable');
      }

      return classNames.join(' ');
    }
  ).readOnly(),

  /**
   * @property headerClassNames
   * @type {String}
   * @private
   */
  headerClassNames: computed('header', 'contentType', function() {
    let { header, contentType } = this.getProperties('header', 'contentType');

    if (isNone(header)) {
      return;
    }

    let classNames = ['Polaris-DataTable__Heading'];

    if (contentType === 'text') {
      classNames.push('Polaris-DataTable__Heading--left');
    }

    return classNames.join(' ');
  }).readOnly(),

  /**
   * @property style
   * @type {String}
   * @private
   */
  style: computed('height', function() {
    let height = this.get('height');
    return height ? htmlSafe(`height: ${height}px`) : undefined;
  }).readOnly(),

  /**
   * @property direction
   * @type {String}
   * @private
   */
  direction: computed(
    'sorted',
    'sortDirection',
    'defaultSortDirection',
    function() {
      let { sorted, sortDirection, defaultSortDirection } = this.getProperties(
        'sorted',
        'sortDirection',
        'defaultSortDirection'
      );

      return sorted ? sortDirection : defaultSortDirection;
    }
  ).readOnly(),

  /**
   * @property source
   * @type {String}
   * @private
   */
  source: computed('direction', function() {
    return `caret-${this.get('direction') === 'ascending' ? 'up' : 'down'}`;
  }).readOnly(),

  /**
   * @property oppositeDirection
   * @type {String}
   * @private
   */
  oppositeDirection: computed('sortDirection', function() {
    return this.get('sortDirection') === 'ascending'
      ? 'descending'
      : 'ascending';
  }).readOnly(),

  /**
   * @property sortAccessibilityLabel
   * @type {String}
   * @private
   */
  sortAccessibilityLabel: computed(
    'sorted',
    'oppositeDirection',
    'direction',
    function() {
      let { sorted, oppositeDirection, direction } = this.getProperties(
        'sorted',
        'oppositeDirection',
        'direction'
      );

      return `sort by ${sorted ? oppositeDirection : direction}`;
    }
  ).readOnly(),
});
