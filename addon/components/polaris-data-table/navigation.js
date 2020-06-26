import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-data-table/navigation';

@tagName('')
@templateLayout(layout)
export default class Navigation extends Component {
  /**
   * @type {Boolean}
   * @public
   */
  isScrolledFarthestLeft = null;

  /**
   * @type {Boolean}
   * @public
   */
  isScrolledFarthestRight = null;

  /**
   * @type {Object[]}
   * @public
   */
  columnVisibilityData = null;

  /**
   * @type {Function}
   * @default no-op
   * @public
   */
  navigateTableLeft() {}

  /**
   * @type {Function}
   * @default no-op
   * @public
   */
  navigateTableRight() {}
}
