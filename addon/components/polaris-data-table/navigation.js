import Component from '@ember/component';
import layout from '../../templates/components/polaris-data-table/navigation';

export default Component.extend({
  classNames: ['Polaris-DataTable__Navigation'],

  layout,

  /**
   * @property currentColumn
   * @type {Object}
   * @public
   */
  currentColumn: null,

  /**
   * @property columnVisibilityData
   * @type {Object[]}
   * @public
   */
  columnVisibilityData: null,

  /**
   * @property navigateTableLeft
   * @type {function}
   * @default no-op
   * @public
   */
  navigateTableLeft() {},

  /**
   * @property navigateTableRight
   * @type {function}
   * @default no-op
   * @public
   */
  navigateTableRight() {},
});
