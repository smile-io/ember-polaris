import Component from '@ember/component';
import layout from '../templates/components/polaris-empty-state';

/**
 * Polaris empty state component.
 * See https://polaris.shopify.com/components/structure/empty-state
 */
export default Component.extend({
  classNames: ['Polaris-EmptyState'],
  classNameBindings: ['imageContained:Polaris-EmptyState--imageContained'],

  layout,

  /**
   * The empty state heading
   *
   * @property heading
   * @type {string}
   * @default null
   */
  heading: null,

  /**
   * The image to use for small screens
   *
   * @property image
   * @type {string}
   * @default null
   */
  image: null,

  /**
   * The image to use for large screens
   *
   * @property largeImage
   * @type {string}
   * @default null
   * TODO: not implemented
   */
  largeImage: null,

  /**
   * The image to use for large screens
   *
   * @property imageContained
   * @type {boolean}
   * @default false
   */
  imageContained: false,

  /**
   * Elements to display inside empty state
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
   * Primary action for empty state
   *
   * @property action
   * @type {Object}
   * @default null
   */
  action: null,

  /**
   * Secondary action for empty state
   *
   * @property secondaryAction
   * @type {Object}
   * @default null
   */
  secondaryAction: null,
});
