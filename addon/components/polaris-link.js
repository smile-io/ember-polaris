import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-link';

/**
 * Polaris link component.
 * See https://polaris.shopify.com/components/navigation/link
 */
export default Component.extend({
  // No tag since we dynamically render either an anchor or a button element.
  tagName: '',

  layout,

  /**
   * The url to link to
   *
   * @property url
   * @type {String}
   * @default null
   * @public
   */
  url: null,

  /**
   * The content to display inside link
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text: null,

  /**
   * Use for a links that open a different site
   *
   * @property external
   * @type {Boolean}
   * @default false
   * @public
   */
  external: false,

  /**
   * Makes the link color the same as the current text color and adds an underline
   *
   * @property monochrome
   * @type {Boolean}
   * @default false
   * @public
   */
  monochrome: false,

  /**
   * Callback when a link is clicked
   *
   * @property onClick
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {},

  /**
   * @private
   */
  linkClass: computed('class', function() {
    let linkClasses = ['Polaris-Link'];

    if (this.get('monochrome')) {
      linkClasses.push('Polaris-Link--monochrome');
    }

    const externalClasses = this.get('class');
    if (externalClasses) {
      linkClasses.push(externalClasses);
    }

    return linkClasses.join(' ');
  }).readOnly(),
});
