import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../../templates/components/polaris-resource-list/bulk-actions/bulk-action-button';
import { handleMouseUpByBlurring } from '../../../utils/focus';

@tagName('')
@templateLayout(layout)
export default class PolarisResourceListBulkActionsBulkActionButton extends Component {
  /**
   * Content the action displays
   *
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  content = null;

  /**
   * Visually hidden text for screen readers
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * A destination to link to, rendered in the action
   *
   * @type {String}
   * @default null
   * @public
   */
  url = null;

  /**
   * Forces url to open in a new tab
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  external = false;

  /**
   * Should the action be disabled
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disclosure = false;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  handleMeasurement() {}

  /**
   * Callback when an action takes place
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onAction() {}

  handleMouseUpByBlurring = handleMouseUpByBlurring;
}
