import Ember from 'ember';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { warn } from '@ember/debug';
import layout from '../templates/components/polaris-popover';

const { ViewUtils } = Ember;

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
   * @type {string}
   * @default null
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
  verticalPosition: computed('preferredPosition', function() {
    let preferredPosition = this.get('preferredPosition');

    if (preferredPosition === 'above') {
      return preferredPosition;
    }

    if (preferredPosition === 'below') {
      return preferredPosition;
    }

    // If set to `mostSpace`, the value will be calculated
    // and set when the user opens the popover.

    return null;
  }),

  triggerStyle: computed(function() {
    return htmlSafe(`
      display: inline-block;
      overflow: inherit;
      border: none;
    `);
  }).readOnly(),

  /**
   * Checks the dropdown trigger's location on
   * screen to determine which vertical direction
   * has more space to open the dropdown.
   */
  mostVerticalSpace() {
    let component;

    // Hack to get the component's container
    // element since this component uses `tagName: ''`
    if (ViewUtils && ViewUtils.getViewBounds) {
      component =  ViewUtils.getViewBounds(this).parentElement;
    } else {
      component = this._renderNode.contextualElement;
    }

    let triggers = component.querySelectorAll('.ember-basic-dropdown-trigger');

    if (triggers.length > 1) {
      warn('Multiple popover triggers found. Defaulting to `preferredPosition` of `below`');
      return 'below';
    }

    let [trigger] = triggers;
    let { top, bottom } = trigger.getBoundingClientRect();
    let windowHeight = window.innerHeight;
    let bottomSpace = windowHeight - bottom;

    // Use `below` if distance is equal
    return bottomSpace >= top ? 'below' : 'above';
  },

  actions: {
    onOpen() {
      // Check to see if `preferredPosition` is set to `mostSpace`
      // onOpen, since user could have scrolled vertically since
      // the time the component originally rendered.
      let preferredPosition = this.get('preferredPosition');

      if (preferredPosition === 'mostSpace') {
        this.set('verticalPosition', this.mostVerticalSpace());
      }
    }
  }
});
