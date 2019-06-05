import {
  className,
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/polaris-card';

/**
 * Polaris card component.
 * See https://polaris.shopify.com/components/structure/card
 */
@classNames('Polaris-Card')
@templateLayout(layout)
export default class PolarisCard extends Component {
  /**
   * Title content for the card
   *
   * @property title
   * @type {String|Component}
   * @default: null
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
   * @property text
   * @type {String}
   * @default: null
   * @public
   */
  text = null;

  /**
   * A less prominent card
   *
   * @property subdued
   * @type {Boolean}
   * @default: false
   * @public
   */
  @className('Polaris-Card--subdued')
  subdued = false;

  /**
   * Auto wrap content in section
   *
   * @property sectioned
   * @type {Boolean}
   * @default: false
   * @public
   */
  sectioned = false;

  /**
   * Card header actions
   *
   * @property headerActions
   * @type {Action[]}
   * @default: null
   * @public
   */
  headerActions = null;

  /**
   * Primary action in the card footer
   *
   * @property primaryFooterAction
   * @type {Action}
   * @default: null
   */
  primaryFooterAction = null;

  /**
   * Secondary action in the card footer
   *
   * @property secondaryFooterAction
   * @type {Action}
   * @default: null
   */
  secondaryFooterAction = null;
}
