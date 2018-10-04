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
  ],

  layout,

  /**
   * The url to link to.
   *
   * @property url
   * @type {string}
   * @default null
   * @public
   *
   */
  url: null,

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
   * The content to display inside link
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

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
