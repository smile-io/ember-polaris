import { computed } from '@ember/object';
import Component from '@ember/component';
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

  /*
   * Public attributes.
   */
  /**
   * The url to link to.
   *
   * @property url
   * @type {string}
   * @default null
   */
  url: null,

  /**
   * The content to display inside link
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * Use for a links that open a different site
   *
   * @property external
   * @type {boolean}
   * @default false
   */
  external: false,

  /**
   * Callback when a link is clicked
   *
   * @property onClick
   * @type {function}
   * @default noop
   */
  onClick() {},

  /*
   * Internal properties.
   */
  dataPolarisUnstyled: 'true',

  target: computed('external', function() {
    return this.get('external') ? '_blank' : null;
  }).readOnly(),

  rel: computed('external', function() {
    return this.get('external') ? 'noopener noreferrer' : null;
  }).readOnly(),

  /**
   * Action handlers.
   */
  click: mapEventToAction('onClick', { preventDefault: false, stopPropagation: true }),
});
