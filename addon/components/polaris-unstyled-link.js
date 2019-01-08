import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-unstyled-link';
import mapEventToAction from '../utils/map-event-to-action';

export default Component.extend({
  tagName: 'a',

  attributeBindings: [
    'url:href',
    'dataPolarisUnstyled:data-polaris-unstyled',
    'target',
    'rel',
    'ariaLabel:aria-label',
    'ariaDescribedBy:aria-describedby',
  ],

  layout,

  /**
   * The url to link to.
   *
   * @property url
   * @type {String}
   * @default null
   * @public
   *
   */
  url: null,

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
   * Callback when a link is clicked
   *
   * @property onClick
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {},

  /**
   * The content to display inside link
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
