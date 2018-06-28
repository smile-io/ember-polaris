import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { guidFor } from '@ember/object/internals';
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
   * @property presentational
   * @type {boolean}
   * @default false
   * @public
   */
  presentational: false,

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
   * Accessibility label for the cell. This will get set dynamically after rendering.
   *
   * @property sortAccessibilityLabel
   * @type {String}
   * @private
   */
  sortAccessibilityLabel: null,

  /**
   * Generated unique ID to be set on the rendered SVG element.
   *
   * @property cellElementId
   * @type {String}
   * @private
   */
  cellElementId: computed(function() {
    return guidFor(this);
  }).readOnly(),

  /**
   * @property cellClassNames
   * @type {String}
   * @private
   */
  cellClassNames: computed('fixed', 'truncate', 'presentational', 'header', 'total', 'footer', 'contentType', 'sorted', 'sortable', function() {
    let classNames = [ 'Polaris-DataTable__Cell' ];

    let { fixed, truncate, presentational, header, total, footer, contentType, sorted, sortable } = this.getProperties('fixed', 'truncate', 'presentational', 'header', 'total', 'footer', 'contentType', 'sorted', 'sortable');

    if (fixed) {
      classNames.push('Polaris-DataTable__Cell--fixed');

      if (truncate) {
        classNames.push('Polaris-DataTable__Cell--truncated');
      }
    }

    if (presentational) {
      classNames.push('Polaris-DataTable__Cell--presentational');
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
  }).readOnly(),

  /**
   * @property style
   * @type {String}
   * @private
   */
  style: computed('height', function() {
    let height = this.get('height');
    return height ? htmlSafe(`height: ${ height }px`) : undefined;
  }).readOnly(),

  /**
   * @property sortIconSource
   * @type {String}
   * @private
   */
  sortIconSource: computed('sortable', 'sorted', 'sortDirection', 'defaultSortDirection', function() {
    if (!this.get('sortable')) {
      return null;
    }

    let sortDirection = this.get('sorted') ? this.get('sortDirection') : this.get('defaultSortDirection');
    return `caret-${ sortDirection === 'ascending' ? 'up' : 'down' }`;
  }).readOnly(),

  updateAccessibilityLabel() {
    let cellElement = document.querySelector(`#${ this.get('cellElementId') }`);
    this.set('sortAccessibilityLabel', `sort by ${ cellElement.textContent.trim().toLowerCase() }`);
  },

  didRender() {
    this._super(...arguments);

    this.updateAccessibilityLabel();
  },

  actions: {
    onKeyDown(event) {
      let { keyCode } = event;
      let sortFunc = this.get('onSort');
      if (keyCode === 13 && sortFunc !== undefined) {
        sortFunc();
      }
    },
  }
});
