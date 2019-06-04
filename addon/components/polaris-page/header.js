import { className, classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import { or, gt } from "@ember-decorators/object/computed";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/header';

@classNames('Polaris-Page-Header')
@templateLayout(layout)
export default class Header extends Component {
 /**
  * Page title, in large type
  *
  * @property title
  * @public
  * @type {String}
  * @default null
  */
 title = null;

 /**
  * Important and non-interactive status information shown immediately after the title
  *
  * @property titleMetadata
  * @public
  * @type {String|Component}
  * @default null
  */
 titleMetadata = null;

 /**
  * Visually hide the title (stand-alone app use only)
  *
  * @property titleHidden
  * @public
  * @type {Boolean}
  * @default false
  */
 @className("Polaris-Page-Header__Title--hidden")
 titleHidden = false;

 /**
  * Application icon for identifying embedded applications
  *
  * @property icon
  * @public
  * @type {String}
  * @default null
  * TODO: not implemented yet
  */
 icon = null;

 /**
  * Collection of breadcrumbs
  *
  * @property breadcrumbs
  * @public
  * @type {Array}
  * @default null
  */
 breadcrumbs = null;

 /**
  * Adds a border to the bottom of the page header (stand-alone app use only)
  *
  * @property separator
  * @public
  * @type {Boolean}
  * @default false
  */
 @className("Polaris-Page-Header__Header--hasSeparator")
 separator = false;

 /**
  * Collection of secondary page-level actions
  *
  * @property secondaryActions
  * @public
  * @type {Array}
  * @default null
  */
 secondaryActions = null;

 /**
  * Collection of page-level groups of secondary actions
  *
  * Properties:
  *
  * @property {String} title Action group title
  * @property {String} icon Icon to display
  * @property {Object[]} actions List of actions
  * @property {String|Component|Object} details Action details
  * @property {Function} onActionAnyItem Callback when any action takes place
  *
  * @property actionGroups
  * @public
  * @type {Object[]}
  * @default null
  */
 actionGroups = null;

 /**
  * Primary page-level action
  *
  * @property primaryAction
  * @public
  * @type {Object}
  * @default null
  */
 primaryAction = null;

 /**
  * Page-level pagination (stand-alone app use only)
  *
  * @property pagination
  * @public
  * @type {Object}
  * @default null
  * TODO: not implemented yet
  */
 pagination = null;

 /**
  * Computed properties.
  */
 @(gt('breadcrumbs.length', 0).readOnly())
 @className("Polaris-Page-Header__Header--hasBreadcrumbs")
 hasBreadcrumbs;

 @(or('hasBreadcrumbs', 'pagination').readOnly())
 hasNavigation;

 @(or('primaryAction', 'secondaryActions').readOnly())
 hasActions;

 @(gt('secondaryActions.length', 0).readOnly())
 @className("Polaris-Page-Header__Header--hasSecondaryActions")
 hasSecondaryActions;

 @(gt('actionGroups.length', 0).readOnly())
 hasActionGroups;

 @(computed('primaryAction.primary').readOnly())
 get shouldRenderPrimaryActionAsPrimary() {
   let primaryAction = this.get('primaryAction');

   return (
     primaryAction &&
     (primaryAction.primary === undefined ? true : primaryAction.primary)
   );
 }

 @(computed('secondaryActions.length', 'actionGroups.length').readOnly())
 @className("Polaris-Page-Header__Header--hasRollup")
 get hasRollup() {
   let secondaryActions = this.get('secondaryActions') || [];
   let actionGroups = this.get('actionGroups') || [];

   return secondaryActions.length + actionGroups.length >= 1;
 }

 @(computed('actionGroups.[]').readOnly())
 get actionGroupsAsActionListSections() {
   let actionGroups = this.get('actionGroups') || [];
   return actionGroups.map(({ title, actions }) => {
     return { title, items: actions };
   });
 }
}
