import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { isNone } from '@ember/utils';
import layout from '../../templates/components/polaris-data-table/cell';

@tagName('')
@templateLayout(layout)
export default class Cell extends Component {
  /**
   * @property height
   * @type {Number}
   * @public
   */
  height = null;

  /**
   * @property text
   * @type {String|Component}
   * @public
   */
  text = null;

  /**
   * @property contentType
   * @type {String}
   * @public
   */
  contentType = null;

  /**
   * @property fixed
   * @type {boolean}
   * @default false
   * @public
   */
  fixed = false;

  /**
   * @property truncate
   * @type {boolean}
   * @default false
   * @public
   */
  truncate = false;

  /**
   * @property header
   * @type {boolean}
   * @default false
   * @public
   */
  header = false;

  /**
   * @property total
   * @type {boolean}
   * @default false
   * @public
   */
  total = false;

  /**
   * @property footer
   * @type {boolean}
   * @default false
   * @public
   */
  footer = false;

  /**
   * @property sorted
   * @type {boolean}
   * @default false
   * @public
   */
  sorted = false;

  /**
   * @property sortable
   * @type {boolean}
   * @default false
   * @public
   */
  sortable = false;

  /**
   * @property sortDirection
   * @type {String}
   * @public
   */
  sortDirection = null;

  /**
   * @property defaultSortDirection
   * @type {String}
   * @public
   */
  defaultSortDirection = null;

  /**
   * @property onSort
   * @type {function}
   * @default no-op
   * @public
   */
  onSort() {}

  /**
   * @property cellClassNames
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

  /**
   * @property headerClassNames
   * @type {String}
   * @private
   */
  @(computed('header', 'contentType').readOnly())
  get headerClassNames() {
    let { header, contentType } = this.getProperties('header', 'contentType');

    if (isNone(header)) {
      return null;
    }

    let classNames = ['Polaris-DataTable__Heading'];

    if (contentType === 'text') {
      classNames.push('Polaris-DataTable__Heading--left');
    }

    return classNames.join(' ');
  }

  /**
   * @property style
   * @type {String}
   * @private
   */
  @(computed('height').readOnly())
  get style() {
    let height = this.get('height');
    return height ? htmlSafe(`height: ${height}px`) : undefined;
  }

  /**
   * @property direction
   * @type {String}
   * @private
   */
  @(computed('sorted', 'sortDirection', 'defaultSortDirection').readOnly())
  get direction() {
    let { sorted, sortDirection, defaultSortDirection } = this.getProperties(
      'sorted',
      'sortDirection',
      'defaultSortDirection'
    );

    return sorted ? sortDirection : defaultSortDirection;
  }

  /**
   * @property source
   * @type {String}
   * @private
   */
  @(computed('direction').readOnly())
  get source() {
    return `caret-${this.get('direction') === 'ascending' ? 'up' : 'down'}`;
  }

  /**
   * @property oppositeDirection
   * @type {String}
   * @private
   */
  @(computed('sortDirection').readOnly())
  get oppositeDirection() {
    return this.get('sortDirection') === 'ascending'
      ? 'descending'
      : 'ascending';
  }

  /**
   * @property sortAccessibilityLabel
   * @type {String}
   * @private
   */
  @(computed('sorted', 'oppositeDirection', 'direction').readOnly())
  get sortAccessibilityLabel() {
    let { sorted, oppositeDirection, direction } = this.getProperties(
      'sorted',
      'oppositeDirection',
      'direction'
    );

    return `sort by ${sorted ? oppositeDirection : direction}`;
  }
}
