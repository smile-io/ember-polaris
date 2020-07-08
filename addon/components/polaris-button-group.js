import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-button-group';
import AutoWrapper from '../-private/auto-wrapper';
import deprecateClassArgument from '../utils/deprecate-class-argument';

/**
 * Polaris button group component.
 * See https://polaris.shopify.com/components/actions/button-group
 */
@deprecateClassArgument
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

  @computed('segmented', 'fullWidth', 'connectedTop', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-ButtonGroup'];
    if (this.segmented) {
      cssClasses.push('Polaris-ButtonGroup--segmented');
    }
    if (this.fullWidth) {
      cssClasses.push('Polaris-ButtonGroup--fullWidth');
    }
    if (this.connectedTop) {
      cssClasses.push('Polaris-ButtonGroup--connectedTop');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

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
