import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/header';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { gt, or } from '@ember/object/computed';
import { copy } from '@ember/object/internals';

export default Component.extend({
  classNames: [ 'Polaris-Page__Header' ],
  classNameBindings: [
    'hasBreadcrumbs:Polaris-Page__Header--hasBreadcrumbs',
    'hasRollup:Polaris-Page__Header--hasRollup',
    'separator:Polaris-Page__Header--hasSeparator',
    'secondaryActions:Polaris-Page__Header--hasSecondaryActions'
  ],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Page title, in large type
   *
   * @property title
   * @type {String}
   * @default null
   */
  title: null,

  /**
   * App icon, for pages that are part of Shopify apps
   *
   * @property icon
   * @type {String}
   * @default null
   * TODO: not implemented yet
   */
  icon: null,

  /**
   * Collection of breadcrumbs
   *
   * @property breadcrumbs
   * @type {Array}
   * @default null
   */
  breadcrumbs: null,

  /**
   * Adds a border to the bottom of the page header
   *
   * @property separator
   * @type {boolean}
   * @default false
   */
  separator: false,

  /**
   * Collection of secondary page-level actions
   *
   * @property secondaryActions
   * @type {Array}
   * @default null
   */
  secondaryActions: null,

  /**
   * Primary page-level action
   *
   * @property primaryAction
   * @type {Object}
   * @default null
   */
  primaryAction: null,

  /**
   * Page-level pagination
   *
   * @property pagination
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
  hasRollup: gt('secondaryActions.length', 1).readOnly(),

  secondaryActionsRollupItems: computed('secondaryActions.[]', function() {
    let secondaryActions = this.get('secondaryActions') || [];

    // `polaris-action-list` uses the `content` property while our secondary actions use `text`.
    // Create a map of items with `text` renamed to `content` so the action list items display.
    return secondaryActions.map((secondaryAction) => {
      let actionProps = copy(secondaryAction);
      actionProps.content = secondaryAction.text;
      delete actionProps.text;

      return EmberObject.create(actionProps);
    });
  }).readOnly(),
});
