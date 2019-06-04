import { attribute, className, classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { notEmpty } from "@ember/object/computed";
import Component from '@ember/component';
import layout from '../templates/components/polaris-skeleton-page';

@classNames('Polaris-SkeletonPage__Page')
@templateLayout(layout)
export default class PolarisSkeletonPage extends Component {
 /**
  * Page title, in large type
  *
  * @property title
  * @public
  * @type {String}
  * @default ''
  */
 title = '';

 /**
  * Remove the normal max-width on the page
  *
  * @property fullwidth
  * @public
  * @type {Boolean}
  * @default false
  */
 fullwidth = false;

 /**
  * Decreases the maximum layout width. Intended for single-column layouts
  *
  * @property singleColumn
  * @public
  * @type {Boolean}
  * @default false
  */
 @className("Polaris-SkeletonPage--singleColumn")
 singleColumn = false;

 /**
  * Shows a skeleton over the primary action
  *
  * @property primaryAction
  * @public
  * @type {Boolean}
  * @default false
  */
 primaryAction = false;

 /**
  * Number of secondary page-level actions to display
  *
  * @property secondaryActions
  * @public
  * @type {Number}
  * @default null
  */
 secondaryActions = null;

 /**
  * Shows a skeleton over the breadcrumb
  *
  * @property breadcrumbs
  * @public
  * @type {Boolean}
  * @default null
  */
 breadcrumbs = null;

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
 text = null;

 'data-test-skeleton-page' = true;

 /**
  * The role of this component, for accessibility purposes
  *
  * @property role
  * @private
  * @type {String}
  */
 @attribute
 role = 'status';

 /**
  * The accessibility label of this component
  *
  * @property ariaLabel
  * @private
  * @type {String}
  */
 @attribute("aria-label")
 ariaLabel = 'Page loading';

 /**
  * Whether the page has an actual text title to display
  *
  * @property hasTitleText
  * @private
  * @type {Boolean}
  */
 @(notEmpty('title').readOnly())
 hasTitleText;

 /**
  * Whether the page should display any kind of title
  *
  * @property hasTitle
  * @private
  * @type {Boolean}
  */
 @(computed('title').readOnly())
 get hasTitle() {
   return this.get('title') !== null;
 }

 /**
  * Array of dummy secondary actions to iterate over in template
  *
  * @property dummySecondaryActions
  * @private
  * @type {Array}
  */
 @(computed('secondaryActions').readOnly())
 get dummySecondaryActions() {
   let secondaryActions = parseInt(this.get('secondaryActions'));
   if (isNaN(secondaryActions)) {
     return null;
   }

   return new Array(Math.max(secondaryActions, 0));
 }
}
