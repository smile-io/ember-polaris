import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-data-table/navigation';

@tagName("")
@templateLayout(layout)
export default class Navigation extends Component {
 /**
  * @property isScrolledFarthestLeft
  * @type {Boolean}
  * @public
  */
 isScrolledFarthestLeft = null;

 /**
  * @property isScrolledFarthestRight
  * @type {Boolean}
  * @public
  */
 isScrolledFarthestRight = null;

 /**
  * @property columnVisibilityData
  * @type {Object[]}
  * @public
  */
 columnVisibilityData = null;

 /**
  * @property navigateTableLeft
  * @type {Function}
  * @default no-op
  * @public
  */
 navigateTableLeft() {}

 /**
  * @property navigateTableRight
  * @type {Function}
  * @default no-op
  * @public
  */
 navigateTableRight() {}
}
