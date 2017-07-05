import Ember from 'ember';
import layout from '../templates/components/polaris-link';

const {
  Component,
  computed,
} = Ember;

export default Component.extend({
  tagName: 'a',
  classNames: ['Polaris-Link'],
  attributeBindings: [
    'url:href',
    'dataPolarisUnstyled:data-polaris-unstyled',
    'target',
    'rel',
  ],

  dataPolarisUnstyled: 'true',

  target: computed('external', function() {
    return this.get('external') ? '_blank' : null;
  }),

  rel: computed('external', function() {
    return this.get('external') ? 'noopener noreferrer' : null;
  }).readOnly(),

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
   * @default null
   */
  external: null,

  /**
   * Callback when a link is clicked
   *
   * @property onClick
   * @type {function}
   * @default null
   */
  onClick: null,
});
