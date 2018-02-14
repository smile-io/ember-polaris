import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import layout from '../templates/components/polaris-skeleton-page';

export default Component.extend({
  classNames: ['Polaris-SkeletonPage__Page'],
  classNameBindings: ['fullWidth:Polaris-SkeletonPage--fullWidth'],
  attributeBindings: [
    'role',
    'ariaLabel:aria-label'
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
   * @type {boolean}
   * @default false
   */
  fullwidth: false,

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
   * @type {boolean}
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
   * Whether the page should display any kind of title
   *
   * @property hasTitle
   * @private
   * @type {boolean}
   */
  hasTitle: computed('title', function() {
    return this.get('title') !== null;
  }).readOnly(),

  /**
   * Whether the page has an actual text title to display
   *
   * @property hasTitleText
   * @private
   * @type {boolean}
   */
  hasTitleText: notEmpty('title').readOnly(),

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
