import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-callout-card';
import deprecateClassArgument from '../utils/deprecate-class-argument';

/**
 * Polaris callout card component.
 * See https://polaris.shopify.com/components/structure/callout-card
 */
@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisCalloutCard extends Component {
  /**
   * The content to display inside the callout card.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   */
  text = null;

  /**
   * The title of the card
   *
   * @type {String}
   * @default null
   */
  title = null;

  /**
   * URL to the card illustration
   *
   * @type {String}
   * @default null
   */
  illustration = null;

  /**
   * Primary action for the card
   *
   * @type {Object}
   * @default null
   */
  primaryAction = null;

  /**
   * Secondary action for the card
   *
   * @type {Object}
   * @default null
   */
  secondaryAction = null;

  /**
   * Callback when banner is dismissed
   *
   * @type {Function}
   * @default null
   */
  onDismiss = null;
}
