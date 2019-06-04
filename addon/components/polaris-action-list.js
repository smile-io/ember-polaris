import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { gt } from "@ember/object/computed";
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import layout from '../templates/components/polaris-action-list';

/**
 * Polaris action list component.
 * See https://polaris.shopify.com/components/actions/action-list
 */
@tagName('')
@templateLayout(layout)
export default class PolarisActionList extends Component {
 /**
  * Collection of actions for list
  *
  * @property items
  * @public
  * @type {Array}
  * @default null
  */
 items = null;

 /**
  * Collection of sectioned action items
  *
  * @property sections
  * @public
  * @type {Array}
  * @default null
  */
 sections = null;

 /**
  * Defines a specific role attribute for each action in the list
  *
  * @property actionRole
  * @public
  * @type {String}
  * @default null
  */
 actionRole = null;

 /**
  * Callback when any item is clicked or keypressed
  *
  * @property onActionAnyItem
  * @public
  * @type {function}
  * @default no-op
  */
 onActionAnyItem() {}

 /**
  * @private
  */
 @(gt('finalSections.length', 1).readOnly())
 hasMultipleSections;

 /**
  * @private
  */
 @(computed('items', 'sections.[]').readOnly())
 get finalSections() {
   let finalSections = [];

   let items = this.get('items');
   if (isPresent(items)) {
     finalSections.push({ items });
   }

   let sections = this.get('sections') || [];
   assert(
     `ember-polaris::polaris-action-list - sections must be an array, you passed ${sections}`,
     isArray(sections)
   );
   finalSections.push(...sections);

   return finalSections;
 }
}
