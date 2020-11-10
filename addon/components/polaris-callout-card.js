import Component from '@glimmer/component';

/**
 * Polaris callout card component.
 * See https://polaris.shopify.com/components/structure/callout-card
 */
export default class PolarisCalloutCard extends Component {
  /**
   * The content to display inside the callout card.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   */
  text;

  /**
   * The title of the card
   *
   * @type {String}
   */
  title;

  /**
   * URL to the card illustration
   *
   * @type {String}
   */
  illustration;

  /**
   * Primary action for the card
   *
   * @type {Object}
   */
  primaryAction;

  /**
   * Secondary action for the card
   *
   * @type {Object}
   */
  secondaryAction;

  /**
   * Callback when banner is dismissed
   *
   * @type {Function}
   */
  onDismiss;
}
