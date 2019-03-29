import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-unstyled-link';
import mapEventToAction from '../utils/map-event-to-action';

/**
 * Undocumented Polaris UnstyledLink component.
 * Note that we do not support the custom link
 * component behaviour provided by the React
 * implementation at this point.
 */
export default Component.extend({
  tagName: 'a',

  attributeBindings: [
    'url:href',
    'dataPolarisUnstyled:data-polaris-unstyled',
    'download',
    'target',
    'rel',
    'ariaLabel:aria-label',
    'ariaDescribedBy:aria-describedby',
    'tabIndex:tabindex',
  ],

  layout,

  /**
   * A destination to link to
   *
   * @property url
   * @type {String}
   * @default null
   * @public
   *
   */
  url: null,

  /**
   * Forces url to open in a new tab
   *
   * @property external
   * @type {Boolean}
   * @default false
   * @public
   */
  external: false,

  /**
   * Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value.
   *
   * @property download
   * @type {String|Boolean}
   * @default null
   * @public
   */
  download: null,

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
   * Content to display inside the link
   *
   * @property text
   * @type {String}
   * @default null
   */
  text: null,

  /**
   * Accessibility label
   *
   * @property ariaLabel
   * @type {String}
   * @default null
   */
  ariaLabel: null,

  /**
   * @property ariaDescribedBy
   * @type {String}
   * @default null
   */
  ariaDescribedBy: null,

  /**
   * @private
   */
  dataPolarisUnstyled: 'true',

  click: mapEventToAction('onClick', {
    preventDefault: false,
    stopPropagation: true,
  }),

  target: computed('external', function() {
    return this.get('external') ? '_blank' : null;
  }).readOnly(),

  rel: computed('external', function() {
    return this.get('external') ? 'noopener noreferrer' : null;
  }).readOnly(),
});
