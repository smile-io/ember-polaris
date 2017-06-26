import Ember from 'ember';
import layout from '../templates/components/polaris-badge';

const {
  Component,
  computed,
  isBlank,
  String: EmberString,
} = Ember;

const {
  notEmpty,
} = computed;

const {
  classify,
} = EmberString;

/**
 * Polaris badge component.
 * See https://polaris.shopify.com/components/images-and-icons/badge
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Badge'],
  classNameBindings: ['statusClass'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to display inside the badge.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default: null
   */
  text: null,

  /**
   * Set the color of the badge for the given status.
   *
   * @property status
   * @type {string}
   * @default: null
   */
  status: null,

  /*
   * Internal properties.
   */
  statusSet: notEmpty('status'),

  statusText: computed('status', function() {
    const status = this.get('status');
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return classify(status);
  }).readOnly(),

  statusClass: computed('statusText', function() {
    const statusText = this.get('statusText');
    if (isBlank(statusText)) {
      return null;
    }

    return `Polaris-Badge--status${statusText}`;
  }).readOnly(),
});
