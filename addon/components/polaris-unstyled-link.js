import {
  attribute,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/polaris-unstyled-link';
import mapEventToAction from '../utils/map-event-to-action';

/**
 * Undocumented Polaris UnstyledLink component.
 * Note that we do not support the custom link
 * component behaviour provided by the React
 * implementation at this point.
 */
@tagName('a')
@templateLayout(layout)
export default class PolarisUnstyledLink extends Component {
  /**
   * Content to display inside the link
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * A destination to link to
   *
   * @property url
   * @type {String}
   * @default null
   * @public
   *
   */
  @attribute('href')
  url = null;

  /**
   * Forces url to open in a new tab
   *
   * @property external
   * @type {Boolean}
   * @default false
   * @public
   */
  external = false;

  /**
   * Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value.
   *
   * @property download
   * @type {String|Boolean}
   * @default null
   * @public
   */
  @attribute
  download = null;

  /**
   * Accessibility label
   *
   * @property ariaLabel
   * @type {String}
   * @default null
   * @public
   */
  @attribute('aria-label')
  ariaLabel = null;

  /**
   * @property ariaDescribedBy
   * @type {String}
   * @default null
   * @public
   */
  @attribute('aria-describedby')
  ariaDescribedBy = null;

  /**
   * Callback when a link is clicked
   *
   * @property onClick
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {}

  /**
   * @private
   */
  @attribute('data-polaris-unstyled')
  dataPolarisUnstyled = 'true';

  dataTestId = null;

  click = mapEventToAction('onClick', {
    preventDefault: false,
    stopPropagation: true,
  });

  @(computed('external').readOnly())
  @attribute
  get target() {
    return this.get('external') ? '_blank' : null;
  }

  @(computed('external').readOnly())
  @attribute
  get rel() {
    return this.get('external') ? 'noopener noreferrer' : null;
  }
}
