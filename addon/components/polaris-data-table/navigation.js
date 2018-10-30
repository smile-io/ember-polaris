import Component from '@ember/component';
import layout from '../../templates/components/polaris-data-table/navigation';

export default Component.extend({
  classNames: ['Polaris-DataTable__Navigation'],

  layout,

  /**
   * @property isScrolledFarthestLeft
   * @type {Boolean}
   * @public
   */
  isScrolledFarthestLeft: null,

  /**
   * @property isScrolledFarthestRight
   * @type {Boolean}
   * @public
   */
  isScrolledFarthestRight: null,

  /**
   * @property columnVisibilityData
   * @type {Object[]}
   * @public
   */
  columnVisibilityData: null,

  /**
   * @property navigateTableLeft
   * @type {Function}
   * @default no-op
   * @public
   */
  navigateTableLeft() {},

  /**
   * @property navigateTableRight
   * @type {Function}
   * @default no-op
   * @public
   */
  navigateTableRight() {},
});
