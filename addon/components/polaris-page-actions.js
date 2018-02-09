import Component from '@ember/component';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { invokeAction } from 'ember-invoke-action';
import layout from '../templates/components/polaris-page-actions';

/**
 * Polaris page actions component.
 * See https://polaris.shopify.com/components/structure/page-actions
 */
export default Component.extend({
  classNames: ['Polaris-PageActions'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The primary action for the page
   *
   * @property primaryAction
   * @type {Object}
   * @default null
   */
  primaryAction: null,

  /**
   * The secondary actions for the page
   *
   * @property secondaryActions
   * @type {Array}
   * @default null
  */
  secondaryActions: null,

  /*
   * Internal properties.
   */
  showSecondaryActions: computed('secondaryActions', function() {
    return isArray(this.get('secondaryActions'));
  }).readOnly(),

  actions: {
    fireAction(action) {
      invokeAction(action, 'onAction');
    }
  }
});
