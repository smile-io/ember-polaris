import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import {
  attribute,
  className,
  classNames,
  layout,
} from '@ember-decorators/component';
import template from '../templates/components/polaris-skeleton-page';

@classNames('Polaris-SkeletonPage__Page')
@layout(template)
export default class PolarisSkeletonPageComponent extends Component {
  /**
   * Page title, in large type
   *
   * @type {String}
   * @default ''
   * @public
   */
  title = '';

  /**
   * Remove the normal max-width on the page
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullwidth = false;

  /**
   * Decreases the maximum layout width. Intended for single-column layouts
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  @className('Polaris-SkeletonPage--singleColumn')
  singleColumn = false;

  /**
   * Shows a skeleton over the primary action
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  primaryAction = false;

  /**
   * Number of secondary page-level actions to display
   *
   * @type {Number}
   * @default null
   * @public
   */
  secondaryActions = null;

  /**
   * Shows a skeleton over the breadcrumb
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  breadcrumbs = null;

  /**
   * The contents of the page
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

  'data-test-skeleton-page' = true;

  /**
   * The role of this component, for accessibility purposes
   *
   * @type {String}
   */
  @attribute
  role = 'status';

  /**
   * The accessibility label of this component
   *
   * @type {String}
   */
  @attribute('aria-label')
  ariaLabel = 'Page loading';

  /**
   * Whether the page has an actual text title to display
   *
   * @type {Boolean}
   */
  @(notEmpty('title').readOnly())
  hasTitleText;

  /**
   * Whether the page should display any kind of title
   *
   * @type {Boolean}
   */
  @computed('title')
  get hasTitle() {
    return this.get('title') !== null;
  }

  /**
   * Array of dummy secondary actions to iterate over in template
   *
   * @type {Array}
   */
  @computed('secondaryActions')
  get dummySecondaryActions() {
    let secondaryActions = parseInt(this.get('secondaryActions'));
    if (isNaN(secondaryActions)) {
      return null;
    }

    return new Array(Math.max(secondaryActions, 0));
  }
}
