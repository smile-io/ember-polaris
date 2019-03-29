import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import layout from '../templates/components/polaris-skeleton-page';

export default Component.extend({
  attributeBindings: ['role', 'ariaLabel:aria-label'],

  classNames: ['Polaris-SkeletonPage__Page'],

  classNameBindings: [
    'fullWidth:Polaris-SkeletonPage--fullWidth',
    'singleColumn:Polaris-SkeletonPage--singleColumn',
  ],

  layout,

  /**
   * Page title, in large type
   *
   * @property title
   * @public
   * @type {String}
   * @default ''
   */
  title: '',

  /**
   * Remove the normal max-width on the page
   *
   * @property fullwidth
   * @public
   * @type {Boolean}
   * @default false
   */
  fullwidth: false,

  /**
   * Decreases the maximum layout width. Intended for single-column layouts
   *
   * @property singleColumn
   * @public
   * @type {Boolean}
   * @default false
   */
  singleColumn: false,

  /**
   * Shows a skeleton over the primary action
   *
   * @property primaryAction
   * @public
   * @type {Boolean}
   * @default false
   */
  primaryAction: false,

  /**
   * Number of secondary page-level actions to display
   *
   * @property secondaryActions
   * @public
   * @type {Number}
   * @default null
   */
  secondaryActions: null,

  /**
   * Shows a skeleton over the breadcrumb
   *
   * @property breadcrumbs
   * @public
   * @type {Boolean}
   * @default null
   */
  breadcrumbs: null,

  /**
   * The contents of the page
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @public
   * @type {String}
   * @default null
   */
  text: null,

  'data-test-skeleton-page': true,

  /**
   * The role of this component, for accessibility purposes
   *
   * @property role
   * @private
   * @type {String}
   */
  role: 'status',

  /**
   * The accessibility label of this component
   *
   * @property ariaLabel
   * @private
   * @type {String}
   */
  ariaLabel: 'Page loading',

  /**
   * Whether the page has an actual text title to display
   *
   * @property hasTitleText
   * @private
   * @type {Boolean}
   */
  hasTitleText: notEmpty('title').readOnly(),

  /**
   * Whether the page should display any kind of title
   *
   * @property hasTitle
   * @private
   * @type {Boolean}
   */
  hasTitle: computed('title', function() {
    return this.get('title') !== null;
  }).readOnly(),

  /**
   * Array of dummy secondary actions to iterate over in template
   *
   * @property dummySecondaryActions
   * @private
   * @type {Array}
   */
  dummySecondaryActions: computed('secondaryActions', function() {
    let secondaryActions = parseInt(this.get('secondaryActions'));
    if (isNaN(secondaryActions)) {
      return null;
    }

    return new Array(Math.max(secondaryActions, 0));
  }).readOnly(),
});
