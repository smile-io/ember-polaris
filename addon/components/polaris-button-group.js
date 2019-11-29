import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-button-group';
import AutoWrapper from '../-private/auto-wrapper';

/**
 * Polaris button group component.
 * See https://polaris.shopify.com/components/actions/button-group
 */
@tagName('')
@layout(template)
export default class PolarisButtonGroup extends Component {
  /**
   * Button components
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
   * Join buttons as segmented group
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  segmented = false;

  /**
   * Buttons will stretch/shrink to occupy the full width
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth = false;

  /**
   * Remove top left and right border radius
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  connectedTop = false;

  @action
  setupAutoWrapper(element) {
    // TODO When we're auto-wrapping we bypass the group item component, so we will not handle
    // focus events and hence not apply correct class to the wrapper group item
    this.autoWrapper = new AutoWrapper(element, 'Polaris-ButtonGroup__Item', {
      'data-test-button-group-item': true,
    });
  }

  @action
  teardownAutoWrapper() {
    this.autoWrapper.teardown();
  }
}
