import Component from '@ember/component';
import { or } from '@ember/object/computed';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-empty-state';
import deprecateClassArgument from '../utils/deprecate-class-argument';

/**
 * Polaris empty state component.
 * See https://polaris.shopify.com/components/structure/empty-state
 */
@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisEmptyState extends Component {
  /**
   * The empty state heading
   *
   * @type {String}
   * @default null
   */
  heading = null;

  /**
   * The image to use for small screens
   *
   * @type {String}
   * @default null
   */
  image = null;

  /**
   * The image to use for large screens
   *
   * @type {String}
   * @default null
   * TODO: not implemented
   */
  largeImage = null;

  /**
   * The image to use for large screens
   *
   * @type {Boolean}
   * @default false
   */
  imageContained = false;

  /**
   * Elements to display inside empty state
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
   * Primary action for empty state
   *
   * @type {Object}
   * @default null
   */
  primaryAction = null;

  /**
   * Secondary action for empty state
   *
   * @type {Object}
   * @default null
   */
  secondaryAction = null;

  @or('primaryAction', 'action')
  mainAction;

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisEmptyState] Passing 'action' is deprecated! Please use 'primaryAction' instead`,
      !this.action,
      {
        id: 'ember-polaris.polaris-empty-state.action-arg',
        until: '7.0.0',
      }
    );
  }
}
