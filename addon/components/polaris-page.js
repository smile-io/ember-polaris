import Component from '@ember/component';
import { or } from '@ember/object/computed';
import layout from '../templates/components/polaris-page';

/**
 * Polaris page component.
 * See https://polaris.shopify.com/components/structure/page
 */
export default Component.extend({
  classNames: ['Polaris-Page'],
  classNameBindings: [
    'fullWidth:Polaris-Page--fullWidth',
    'singleColumn:Polaris-Page--singleColumn'
  ],

  layout,

  /**
   * Page title, in large type
   *
   * @property title
   * @public
   * @type {string}
   * @default null
   */
  title: null,

  /**
   * Visually hide the title
   *
   * @property titleHidden
   * @public
   * @type {boolean}
   * @default false
   */
  titleHidden: false,

  /**
   * App icon, for pages that are part of Shopify apps
   *
   * @property icon
   * @public
   * @type {string}
   * @default null
   * TODO: not implemented yet.
   */
  icon: null,

  /**
   * Collection of breadcrumbs
   *
   * @property breadcrumbs
   * @public
   * @type {Array}
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
   * Remove the normal max-width on the page
   *
   * @property fullWidth
   * @public
   * @type {boolean}
   * @default false
   */
  fullWidth: false,

  /**
   * Decreases the maximum layout width. Intended for single-column layouts
   *
   * @property singleColumn
   * @public
   * @type {boolean}
   * @default false
   */
  singleColumn: false,

  /**
   * Adds a border to the bottom of the page header
   *
   * @property separator
   * @public
   * @type {boolean}
   * @default false
   */
  separator: false,

  /**
   * Collection of secondary page-level actions
   *
   * @property secondaryActions
   * @public
   * @type {Array}
   * @default null
   */
  secondaryActions: null,

  /**
   * Collection of page-level groups of secondary actions
   *
   * @property actionGroups
   * @public
   * @type {Array}
   * @default null
   * TODO: not implemented yet
   */
  actionGroups: null,

  /**
   * Primary page-level action
   *
   * @property primaryAction
   * @public
   * @type {Object}
   * @default null
   */
  primaryAction: null,

  /**
   * Page-level pagination
   *
   * @property pagination
   * @public
   * @type {PaginationDescriptor}
   * @default null
   * TODO: not implemented yet
   */
  pagination: null,

  /**
   * Computed properties.
   */
  hasHeaderContent: or('title', 'primaryAction', 'secondaryActions', 'breadcrumbs').readOnly(),
});
