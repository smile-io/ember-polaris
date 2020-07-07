import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-data-table/navigation';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class PolarisDataTableNavigation extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * @type {Boolean}
   * @public
   */
  isScrolledFarthestLeft = false;

  /**
   * @type {Boolean}
   * @public
   */
  isScrolledFarthestRight = false;

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
