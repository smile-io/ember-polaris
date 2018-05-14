import Ember from 'ember';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { warn } from '@ember/debug';
import layout from '../templates/components/polaris-popover';

const { ViewUtils } = Ember;
const ABOVE = 'above';
const BELOW = 'below';

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
   * @default 'below'
   */
  preferredPosition: BELOW,

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
  verticalPosition: computed('preferredPosition', {
    // If `preferredPosition` is set to `mostSpace`, the value
    // will be calculated and set when the user opens the popover.
    // The only allowed values are 'above' and 'below', so we
    // return null for anything other than those values and let
    // ember-basic-dropdown use its default value.
    get() {
      let preferredPosition = this.get('preferredPosition');

      if (preferredPosition === ABOVE || preferredPosition === BELOW) {
        return preferredPosition;
      }

      return null;
    },

    set(key, value) {
      if (value === ABOVE || value === BELOW) {
        return value;
      }

      return null;
    }
  }),

  triggerStyle: computed(function() {
    return htmlSafe(`
      display: inline-block;
      overflow: inherit;
      border: none;
    `);
  }).readOnly(),

  /**
   * Checks the dropdown activator's location on
   * screen to determine which vertical direction
   * has more space to open the dropdown.
   */
  getMostVerticalSpace() {
    let component;

    // Hack to get the component's container
    // element since this component uses `tagName: ''`
    // https://github.com/emberjs/rfcs/issues/168#issue-178381310
    if (ViewUtils && ViewUtils.getViewBounds) {
      component =  ViewUtils.getViewBounds(this).parentElement;
    } else {
      component = this._renderNode.contextualElement;
    }

    let activators = component.querySelectorAll('.ember-basic-dropdown-trigger');

    if (activators.length > 1) {
      warn(
        'Multiple popover activators found. Defaulting to `preferredPosition` of `below`',
        { id: 'ember-polaris.polaris-popover.multiple-popover-activators' }
      );

      return BELOW;
    }

    let [activator] = activators;
    let { top, bottom } = activator.getBoundingClientRect();
    let windowHeight = window.innerHeight;
    let bottomSpace = windowHeight - bottom;

    // Use `below` if distance is equal
    return bottomSpace >= top ? BELOW : ABOVE;
  },

  actions: {
    onOpen() {
      // Check to see if `preferredPosition` is set to `mostSpace`
      // onOpen, since user could have scrolled vertically since
      // the time the component originally rendered.
      let preferredPosition = this.get('preferredPosition');

      if (preferredPosition === 'mostSpace') {
        this.set('verticalPosition', this.getMostVerticalSpace());
      }
    }
  }
});
