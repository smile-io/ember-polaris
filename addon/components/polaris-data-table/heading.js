import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import layout from '../../templates/components/polaris-data-table/heading';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * @property heading
   * @type {String}
   * @public
   */
  heading: null,

  /**
   * @property headingIndex
   * @type {Number}
   * @public
   */
  headingIndex: null,

  /**
   * @property truncate
   * @type {boolean}
   * @default false
   * @public
   */
  truncate: false,

  /**
   * @property heights
   * @type {Number[]}
   * @public
   */
  heights: null,

  /**
   * @property sortable
   * @type {boolean[]}
   * @public
   */
  sortable: null,

  /**
   * @property sortedColumnIndex
   * @type {Number}
   * @public
   */
  sortedColumnIndex: null,

  /**
   * @property sortDirection
   * @type {String}
   * @public
   */
  sortDirection: null,

  /**
   * @property contentTypes
   * @type {String[]}
   * @public
   */
  contentTypes: null,

  /**
   * @property defaultSortDirection
   * @type {String}
   * @public
   */
  defaultSortDirection: null,

  /**
   * @property defaultOnSort
   * @type {function}
   * @default no-op
   * @public
   */
  defaultOnSort() {},

  /**
   * @property isFixed
   * @type {boolean}
   * @private
   */
  isFixed: equal('headingIndex', 0).readOnly(),

  /**
   * @property height
   * @type {Number}
   * @private
   */
  height: computed('truncate', 'heights.[]', function() {
    return !this.get('truncate') ? this.get('heights.firstObject') : undefined;
  }).readOnly(),

  /**
   * @property isSorted
   * @type {boolean}
   * @private
   */
  isSorted: computed('isSortable', 'sortedColumnIndex', 'index', function() {
    let { isSortable, sortedColumnIndex, index } = this.getProperties(
      'isSortable',
      'sortedColumnIndex',
      'index'
    );
    return isSortable && sortedColumnIndex === index;
  }).readOnly(),

  /**
   * @property direction
   * @type {String}
   * @private
   */
  direction: computed('isSorted', 'sortDirection', function() {
    return this.get('isSorted') ? this.get('sortDirection') : 'none';
  }).readOnly(),
});
