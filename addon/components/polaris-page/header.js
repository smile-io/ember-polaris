import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/header';
import { computed } from '@ember/object';
import { gt, or } from '@ember/object/computed';

export default Component.extend({
  classNames: ['Polaris-Page__Header'],
  classNameBindings: [
    'titleHidden:Polaris-Page__Title--hidden',
    'hasBreadcrumbs:Polaris-Page__Header--hasBreadcrumbs',
    'hasRollup:Polaris-Page__Header--hasRollup',
    'separator:Polaris-Page__Header--hasSeparator',
    'hasSecondaryActions:Polaris-Page__Header--hasSecondaryActions',
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
   * @type {Boolean}
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
   * @type {Boolean}
   * @default false
   */
  separator: false,

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
  hasActionGroups: gt('actionGroups.length', 0).readOnly(),

  hasRollup: computed('secondaryActions.length', 'actionGroups.length', function() {
    let secondaryActions = this.get('secondaryActions') || [];
    let actionGroups = this.get('actionGroups') || [];

    return secondaryActions.length + actionGroups.length > 1;
  }).readOnly(),

  actionGroupsAsActionListSections: computed('actionGroups.[]', function() {
    let actionGroups = this.get('actionGroups') || [];
    return actionGroups.map(({ title, actions }) => {
      return { title, items: actions };
    });
  }).readOnly(),
});
