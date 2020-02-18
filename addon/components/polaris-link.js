import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-link';

/**
 * Polaris link component.
 * See https://polaris.shopify.com/components/navigation/link
 */
@tagName('')
@templateLayout(layout)
export default class PolarisLink extends Component {
  /**
   * The url to link to
   *
   * @property url
   * @type {String}
   * @default null
   * @public
   */
  url = null;

  /**
   * The content to display inside link
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * Use for a links that open a different site
   *
   * @property external
   * @type {Boolean}
   * @default false
   * @public
   */
  external = false;

  /**
   * Makes the link color the same as the current text color and adds an underline
   *
   * @property monochrome
   * @type {Boolean}
   * @default false
   * @public
   */
  monochrome = false;

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
  @(computed('class').readOnly())
  get linkClass() {
    let linkClasses = ['Polaris-Link'];

    if (this.get('monochrome')) {
      linkClasses.push('Polaris-Link--monochrome');
    }

    const externalClasses = this.class;
    if (externalClasses) {
      linkClasses.push(externalClasses);
    }

    return linkClasses.join(' ');
  }
}
