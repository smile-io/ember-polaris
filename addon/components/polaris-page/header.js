import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/header';
import { gt, or } from '@ember/object/computed';

export default Component.extend({
  classNames: [ 'Polaris-Page__Header' ],
  classNameBindings: [
    'titleHidden:Polaris-Page__Title--hidden',
    'hasBreadcrumbs:Polaris-Page__Header--hasBreadcrumbs',
    'hasRollup:Polaris-Page__Header--hasRollup',
    'separator:Polaris-Page__Header--hasSeparator',
    'hasSecondaryActions:Polaris-Page__Header--hasSecondaryActions'
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
   * @type {Object}
   * @default null
   * TODO: not implemented yet
   */
  pagination: null,

  /**
   * Computed properties.
   */
  hasBreadcrumbs: gt('breadcrumbs.length', 0).readOnly(),
  hasNavigation: or('hasBreadcrumbs', 'pagination').readOnly(),
  hasActions: or('primaryAction', 'secondaryActions').readOnly(),
  hasSecondaryActions: gt('secondaryActions.length', 0).readOnly(),
  hasRollup: gt('secondaryActions.length', 1).readOnly(),
});
