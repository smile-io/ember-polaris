import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { isNone } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-data-table/cell';

@tagName('')
@templateLayout(layout)
export default class Cell extends Component {
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
   * @private
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
    } = this;

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

  /**
   * @type {String}
   * @private
   */
  @(computed('header', 'contentType').readOnly())
  get headerClassNames() {
    let { header, contentType } = this;

    if (isNone(header)) {
      return '';
    }

    let classNames = ['Polaris-DataTable__Heading'];

    if (contentType === 'text') {
      classNames.push('Polaris-DataTable__Heading--left');
    }

    return classNames.join(' ');
  }

  /**
   * @type {String}
   * @private
   */
  @(computed('height').readOnly())
  get style() {
    let { height } = this;
    return height ? htmlSafe(`height: ${height}px`) : undefined;
  }

  /**
   * @type {String}
   * @private
   */
  @(computed('sorted', 'sortDirection', 'defaultSortDirection').readOnly())
  get direction() {
    let { sorted, sortDirection, defaultSortDirection } = this;
    return sorted ? sortDirection : defaultSortDirection;
  }

  /**
   * @type {String}
   * @private
   */
  @(computed('direction').readOnly())
  get source() {
    return `caret-${this.direction === 'ascending' ? 'up' : 'down'}`;
  }

  /**
   * @type {String}
   * @private
   */
  @(computed('sortDirection').readOnly())
  get oppositeDirection() {
    return this.sortDirection === 'ascending' ? 'descending' : 'ascending';
  }

  /**
   * @type {String}
   * @private
   */
  @(computed('sorted', 'oppositeDirection', 'direction').readOnly())
  get sortAccessibilityLabel() {
    let { sorted, oppositeDirection, direction } = this;

    return `sort by ${sorted ? oppositeDirection : direction}`;
  }
}
