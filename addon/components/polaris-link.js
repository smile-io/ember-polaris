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
   * The url to link to.
   *
   * @property url
   * @type {string}
   * @default null
   * @public
   */
  url: null,

  /**
   * The content to display inside link
   *
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text: null,

  /**
   * Use for a links that open a different site
   *
   * @property external
   * @type {boolean}
   * @default false
   * @public
   */
  external: false,

  /**
   * Callback when a link is clicked
   *
   * @property onClick
   * @type {function}
   * @default noop
   * @public
   */
  onClick() {},

  /**
   * @private
   */
  linkClass: computed('class', function() {
    let linkClass = 'Polaris-Link';
    const externalClasses = this.get('class');

    if (externalClasses) {
      linkClass += ` ${externalClasses}`;
    }

    return linkClass;
  }).readOnly(),
});
