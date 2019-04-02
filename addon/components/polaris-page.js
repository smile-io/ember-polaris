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
    'singleColumn:Polaris-Page--singleColumn',
  ],

  layout,

  /**
   * Page title, in large type
   *
   * @property title
   * @public
   * @type {String}
   * @default null
   */
  title: null,

  /**
   * Important and non-interactive status information shown immediately after the title
   *
   * @property titleMetadata
   * @public
   * @type {String|Component}
   * @default null
   */
  titleMetadata: null,

  /**
   * Visually hide the title (stand-alone app use only)
   *
   * @property titleHidden
   * @public
   * @type {Boolean}
   * @default false
   */
  titleHidden: false,

  /**
   * Application icon for identifying embedded applications
   *
   * @property icon
   * @public
   * @type {String}
   * @default null
   * TODO: not implemented yet
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
   * Adds a border to the bottom of the page header (stand-alone app use only)
   *
   * @property separator
   * @public
   * @type {Boolean}
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
   * Page-level pagination (stand-alone app use only)
   *
   * @property pagination
   * @public
   * @type {Object}
   * @default null
   * TODO: not implemented yet
   */
  pagination: null,

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
   * @type {Boolean}
   * @default false
   */
  fullWidth: false,

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
   * Force render in page and do not delegate to the app bridge TitleBar action
   *
   * @property forceRender
   * @public
   * @type {Boolean}
   * @default false
   * TODO: not implemented yet (only for embedded apps)
   */
  forceRender: false,

  /**
   * Computed properties.
   */
  hasHeaderContent: or(
    'title',
    'primaryAction',
    'secondaryActions',
    'actionGroups',
    'breadcrumbs'
  ).readOnly(),
});
