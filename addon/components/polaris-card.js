import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-card';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Polaris card component.
 * See https://polaris.shopify.com/components/structure/card
 */
@tagName('')
@layout(template)
export default class PolarisCard extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * Title content for the card
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  title = null;

  /**
   * Inner content of the card
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
   * A less prominent card
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  subdued = false;

  /**
   * Auto wrap content in section
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  sectioned = false;

  /**
   * Card header actions
   *
   * @type {Action[]}
   * @default null
   * @public
   */
  headerActions = null;

  /**
   * Primary action in the card footer
   *
   * @type {Action}
   * @default null
   */
  primaryFooterAction = null;

  /**
   * Secondary action in the card footer
   *
   * @type {Action}
   * @default null
   */
  secondaryFooterAction = null;
}
