import {
  className,
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/polaris-empty-state';

/**
 * Polaris empty state component.
 * See https://polaris.shopify.com/components/structure/empty-state
 */
@classNames('Polaris-EmptyState')
@templateLayout(layout)
export default class PolarisEmptyState extends Component {
  /**
   * The empty state heading
   *
   * @property heading
   * @type {String}
   * @default null
   */
  heading = null;

  /**
   * The image to use for small screens
   *
   * @property image
   * @type {String}
   * @default null
   */
  image = null;

  /**
   * The image to use for large screens
   *
   * @property largeImage
   * @type {String}
   * @default null
   * TODO: not implemented
   */
  largeImage = null;

  /**
   * The image to use for large screens
   *
   * @property imageContained
   * @type {boolean}
   * @default false
   */
  @className('Polaris-EmptyState--imageContained')
  imageContained = false;

  /**
   * Elements to display inside empty state
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   */
  text = null;

  /**
   * Primary action for empty state
   *
   * @property action
   * @type {Object}
   * @default null
   */
  action = null;

  /**
   * Secondary action for empty state
   *
   * @property secondaryAction
   * @type {Object}
   * @default null
   */
  secondaryAction = null;

  'data-test-empty-state' = true;
}
