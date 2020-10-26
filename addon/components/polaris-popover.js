import Component from '@ember/component';
import { action, computed } from '@ember/object';
import Ember from 'ember';
import { htmlSafe } from '@ember/string';
import { warn } from '@ember/debug';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { getRectForNode } from '@shopify/javascript-utilities/geometry';
import layout from '../templates/components/polaris-popover';

const { ViewUtils } = Ember;
const ABOVE = 'above';
const BELOW = 'below';

/**
 * Polaris popover component.
 * See https://polaris.shopify.com/components/overlays/popover
 */
@tagName('')
@templateLayout(layout)
export default class PolarisPopover extends Component {
  /**
   * The content to display inside the popover
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * The preferred direction to open the popover
   *
   * @type {String}
   * @default 'below'
   * @public
   */
  preferredPosition = BELOW;

  /**
   * Show or hide the Popover
   *
   * TODO: not implemented
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  active = false;

  /**
   * The element type to wrap the activator with
   *
   * TODO: not implemented
   *
   * @type {String}
   * @default null
   * @public
   */
  activatorWrapper = null;

  /**
   * Prevent automatic focus of the first field on activation
   *
   * TODO: not implemented
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  preventAutofocus = false;

  /**
   * Automatically add wrap content in a section
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  sectioned = false;

  /**
   * Allow popover to stretch to the full width of its activator
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth = false;

  /**
   * Allow popover to stretch to fit content vertically
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullHeight = false;

  /**
   * Callback when popover is closed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onClose() {}

  triggerStyle = htmlSafe(`
    display: inline-block;
    overflow: inherit;
    border: none;
  `);

  @computed('preferredPosition')
  get verticalPosition() {
    // If `preferredPosition` is set to `mostSpace`, the value
    // will be calculated and set when the user opens the popover.
    // The only allowed values are 'above' and 'below', so we
    // return null for anything other than those values and let
    // ember-basic-dropdown use its default value.
    let { preferredPosition } = this;

    if (preferredPosition === ABOVE || preferredPosition === BELOW) {
      return preferredPosition;
    }

    return null;
  }

  set verticalPosition(value) {
    this.set('preferredPosition', value);
  }

  /**
   * Checks the dropdown activator's location on
   * screen to determine which vertical direction
   * has more space to open the dropdown.
   */
  getMostVerticalSpace() {
    let component;

    // Hack to get the component's container
    // element since this component is tagless
    // https://github.com/emberjs/rfcs/issues/168#issue-178381310
    if (ViewUtils && ViewUtils.getViewBounds) {
      component = ViewUtils.getViewBounds(this).parentElement;
    } else {
      component = this._renderNode.contextualElement;
    }

    let activators = component.querySelectorAll(
      '.ember-basic-dropdown-trigger'
    );

    if (activators.length > 1) {
      warn(
        'Multiple popover activators found. Defaulting to `preferredPosition` of `below`',
        {
          id: 'ember-polaris.polaris-popover.multiple-popover-activators',
        }
      );

      return BELOW;
    }

    let [activator] = activators;
    let { top, bottom } = getRectForNode(activator);
    let windowHeight = window.innerHeight;
    let bottomSpace = windowHeight - bottom;

    // Use `below` if distance is equal
    return bottomSpace >= top ? BELOW : ABOVE;
  }

  @action
  onOpen() {
    // Check to see if `preferredPosition` is set to `mostSpace`
    // onOpen, since user could have scrolled vertically since
    // the time the component originally rendered.
    if (this.preferredPosition === 'mostSpace') {
      this.set('verticalPosition', this.getMostVerticalSpace());
    }
  }
}
