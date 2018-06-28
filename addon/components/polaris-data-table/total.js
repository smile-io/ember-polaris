import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/polaris-data-table/total';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * @property total
   * @type {String|Number|Component}
   * @public
   */
  total: null,

  /**
   * @property index
   * @type {Number}
   * @public
   */
  index: null,

  /**
   * @property heights
   * @type {Number[]}
   * @public
   */
  heights: null,

  /**
   * @property truncate
   * @type {boolean}
   * @default false
   * @public
   */
  truncate: false,

  /**
   * @property totalsRowHeading
   * @type {String}
   * @public
   */
  totalsRowHeading: null,

  /**
   * @property height
   * @type {Number}
   * @private
   */
  height: computed('heights.[]', 'truncate', function() {
    let { heights, truncate } = this.getProperties('heights', 'truncate');
    return !truncate ? heights[1] : undefined;
  }).readOnly(),
});
