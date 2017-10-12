import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/polaris-popover';

/**
 * Polaris popover component.
 * See https://polaris.shopify.com/components/overlays/popover
 */
export default Component.extend({
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to display inside the popover
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * The preferred direction to open the popover
   *
   * @property preferredPosition
   * @type {enum}
   * @default null
   * TODO: not implemented
   */
  preferredPosition: null,

  /**
   * Show or hide the Popover
   *
   * @property active
   * @type {boolean}
   * @default false
   * TODO: not implemented
   */
  active: false,

  /**
   * The element type to wrap the activator with
   *
   * @property activatorWrapper
   * @type {string}
   * @default null
   * TODO: not implemented
   */
  activatorWrapper: null,

  /**
   * Prevent automatic focus of the first field on activation
   *
   * @property preventAutofocus
   * @type {boolean}
   * @default false
   * TODO: not implemented
   */
  preventAutofocus: false,

  /**
   * Automatically add wrap content in a section
   *
   * @property sectioned
   * @type {boolean}
   * @default false
   */
  sectioned: false,

  /**
   * Callback when popover is closed
   *
   * @property onClose
   * @type {function(source: React.ReactElement)}
   * @default null
   * TODO: not implemented
   */
  onClose: null,

  /*
   * Internal properties.
   */
  triggerStyle: computed(function() {
    return htmlSafe(`
      display: inline-block;
      overflow: inherit;
      border: none;
    `);
  }).readOnly(),
});
