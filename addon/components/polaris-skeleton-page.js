import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-skeleton-page';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class PolarisSkeletonPageComponent extends Component.extend(
  TaglessCssDeprecation
) {
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

  /**
   * The role of this component, for accessibility purposes
   *
   * @type {String}
   */
  role = 'status';

  /**
   * The accessibility label of this component
   *
   * @type {String}
   */
  ariaLabel = 'Page loading';

  /**
   * Whether the page has an actual text title to display
   *
   * @type {Boolean}
   */
  @notEmpty('title')
  hasTitleText;

  /**
   * Whether the page should display any kind of title
   *
   * @type {Boolean}
   */
  @computed('title')
  get hasTitle() {
    return this.title !== null;
  }

  /**
   * Array of dummy secondary actions to iterate over in template
   *
   * @type {Array}
   */
  @computed('secondaryActions')
  get dummySecondaryActions() {
    let secondaryActions = parseInt(this.secondaryActions);
    if (isNaN(secondaryActions)) {
      return null;
    }

    return new Array(Math.max(secondaryActions, 0));
  }

  @computed('fullWidth', 'singleColumn', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-SkeletonPage__Page'];
    if (this.fullWidth) {
      cssClasses.push('Polaris-SkeletonPage--fullWidth');
    }
    if (this.singleColumn) {
      cssClasses.push('Polaris-SkeletonPage--singleColumn');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }
}
