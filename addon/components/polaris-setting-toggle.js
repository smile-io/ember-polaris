import Component from '@ember/component';
import { invokeAction } from 'ember-invoke-action';
import layout from '../templates/components/polaris-setting-toggle';

/**
 * Polaris setting toggle component.
 * See https://polaris.shopify.com/components/actions/setting-toggle
 */
export default Component.extend({
  // Tagless component, renders a `polaris-card` internally.
  tagName: '',

  layout,

  /**
   * Inner content of the card
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text: null,

  /**
   * Card header action
   *
   * @property action
   * @type {Object}
   * @default null
   * @public
   */
  action: null,

  /**
   * Sets toggle state to enabled or disabled
   *
   * @property enabled
   * @type {boolean}
   * @default null
   * @public
   */
  enabled: null,

  actions: {
    fireAction(action) {
      invokeAction(action, 'onAction');
    },
  },
});
