import Ember from 'ember';
import layout from '../templates/components/polaris-action-list';

const {
  Component,
} = Ember;

/**
 * Polaris action list component.
 * See https://polaris.shopify.com/components/actions/action-list
 */
export default Component.extend({
  classNames: ['Polaris-ActionList'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Collection of actions for list
   *
   * @property items
   * @type {Action[]}
   * @default null
   */
  items: null,

  /**
   * Collection of sectioned action items
   *
   * @property sections
   * @type {Section[]}
   * @default null
   * TODO: not implemented
   */
  sections: null,
});
