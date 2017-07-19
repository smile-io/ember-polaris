import Ember from 'ember';
import layout from '../templates/components/polaris-page-actions';

const {
  Component,
  computed,
  isArray,
  typeOf,
} = Ember;

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
  showSecondaryActions: computed('secondaryActions.length', function() {
    return isArray(this.get('secondaryActions'));
  }).readOnly(),

  actions: {
    fireAction(action) {
      if (typeOf(action.action) === 'function') {
        return action.action();
      }
    }
  }
});
