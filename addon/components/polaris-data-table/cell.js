import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { isNone } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-data-table/cell';

@tagName('')
@templateLayout(layout)
export default class PolarisDataTableCell extends Component {
  /**
   * @type {Number}
   * @public
   */
  height = null;

  /**
   * @type {String|Component}
   * @public
   */
  text = null;

  /**
   * @type {String}
   * @public
   */
  contentType = null;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  fixed = false;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  truncate = false;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  header = false;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  total = false;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  footer = false;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  sorted = false;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  sortable = false;

  /**
   * @type {String}
   * @public
   */
  sortDirection = null;

  /**
   * @type {String}
   * @public
   */
  defaultSortDirection = null;

  /**
   * @type {function}
   * @default no-op
   * @public
   */
  onSort() {}

  /**
   * @type {String}
   */
  @(computed(
    'fixed',
    'truncate',
    'header',
    'total',
    'footer',
    'contentType',
    'sorted',
    'sortable'
  ).readOnly())
  get cellClassNames() {
    let cssClasses = ['Polaris-DataTable__Cell'];

    let {
      fixed,
      truncate,
      header,
      total,
      footer,
      contentType,
      sorted,
      sortable,
    } = this;

    if (fixed) {
      cssClasses.push('Polaris-DataTable__Cell--fixed');

      if (truncate) {
        cssClasses.push('Polaris-DataTable__Cell--truncated');
      }
    }

    if (header) {
      cssClasses.push('Polaris-DataTable__Cell--header');
    }

    if (total) {
      cssClasses.push('Polaris-DataTable__Cell--total');
    }

    if (footer) {
      cssClasses.push('Polaris-DataTable__Cell--footer');
    }

    if (contentType === 'numeric') {
      cssClasses.push('Polaris-DataTable__Cell--numeric');
    }

    if (sorted) {
      cssClasses.push('Polaris-DataTable__Cell--sorted');
    }

    if (sortable) {
      cssClasses.push('Polaris-DataTable__Cell--sortable');
    }

    return cssClasses.join(' ');
  }

  /**
   * @type {String}
   */
  @(computed('header', 'contentType').readOnly())
  get headerClassNames() {
    let { header, contentType } = this;

    if (isNone(header)) {
      return '';
    }

    let cssClasses = ['Polaris-DataTable__Heading'];

    if (contentType === 'text') {
      cssClasses.push('Polaris-DataTable__Heading--left');
    }

    return cssClasses.join(' ');
  }

  /**
   * @type {String}
   */
  @(computed('height').readOnly())
  get style() {
    let { height } = this;
    return height ? htmlSafe(`height: ${height}px`) : undefined;
  }

  /**
   * @type {String}
   */
  @(computed('sorted', 'sortDirection', 'defaultSortDirection').readOnly())
  get direction() {
    let { sorted, sortDirection, defaultSortDirection } = this;
    return sorted ? sortDirection : defaultSortDirection;
  }

  /**
   * @type {String}
   */
  @(computed('direction').readOnly())
  get source() {
    return `caret-${this.direction === 'ascending' ? 'up' : 'down'}`;
  }

  /**
   * @type {String}
   */
  @(computed('sortDirection').readOnly())
  get oppositeDirection() {
    return this.sortDirection === 'ascending' ? 'descending' : 'ascending';
  }

  /**
   * @type {String}
   */
  @(computed('sorted', 'oppositeDirection', 'direction').readOnly())
  get sortAccessibilityLabel() {
    let { sorted, oppositeDirection, direction } = this;

    return `sort by ${sorted ? oppositeDirection : direction}`;
  }
}
