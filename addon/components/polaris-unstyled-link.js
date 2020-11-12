import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Undocumented Polaris UnstyledLink component.
 * Note that we do not support the custom link
 * component behaviour provided by the React
 * implementation at this point.
 */
export default class PolarisUnstyledLink extends Component {
  /**
   * Content to display inside the link
   *
   * @type {String}
   * @public
   */
  text;

  /**
   * A destination to link to
   *
   * @type {String}
   * @public
   *
   */
  url;

  /**
   * Forces url to open in a new tab
   *
   * @type {Boolean}
   * @public
   */
  external;

  /**
   * Tells the browser to download the url instead of opening it.
   * Provides a hint for the downloaded filename if it is a string value.
   *
   * @type {String|Boolean}
   * @public
   */
  download;

  /**
   * Callback when a link is clicked
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {}

  get target() {
    return this.args.external ? '_blank' : undefined;
  }

  get rel() {
    return this.args.external ? 'noopener noreferrer' : undefined;
  }

  @action
  handleClick(event) {
    event.stopPropagation();
    this.args.onClick?.();
  }
}
