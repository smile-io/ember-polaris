import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../../templates/components/polaris-data-table/row';

export default Component.extend({
  tagName: 'tr',
  classNames: ['Polaris-DataTable__TableRow'],

  layout,

  /**
   * @property row
   * @type {Array}
   * @public
   */
  row: null,

  /**
   * @property index
   * @type {Number}
   * @public
   */
  index: null,

  /**
   * @property totals
   * @type {Number[]}
   * @public
   */
  totals: null,

  /**
   * @property heights
   * @type {Number[]}
   * @public
   */
  heights: null,

  /**
   * @property footerContent
   * @type {String|Number|Component}
   * @public
   */
  footerContent: null,

  /**
   * @property contentTypes
   * @type {String[]}
   * @public
   */
  contentTypes: null,

  /**
   * @property truncate
   * @type {boolean}
   * @default false
   * @public
   */
  truncate: false,

  /**
   * @property bodyCellHeights
   * @type {Number[]}
   * @private
   */
  bodyCellHeights: computed('totals.[]', 'heights.[]', 'footerContent', function() {
    let { totals, heights, footerContent } = this.getProperties(
      'totals',
      'heights',
      'footerContent',
    );
    let bodyCellHeights = isPresent(totals) ? heights.slice(2) : heights.slice(1);

    if (footerContent) {
      bodyCellHeights.pop();
    }

    return bodyCellHeights;
  }).readOnly(),
});
