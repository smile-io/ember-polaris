import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import { equal } from "@ember-decorators/object/computed";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-data-table/heading';

@tagName('')
@templateLayout(layout)
export default class Heading extends Component {
 /**
  * @property heading
  * @type {String}
  * @public
  */
 heading = null;

 /**
  * @property headingIndex
  * @type {Number}
  * @public
  */
 headingIndex = null;

 /**
  * @property truncate
  * @type {boolean}
  * @default false
  * @public
  */
 truncate = false;

 /**
  * @property heights
  * @type {Number[]}
  * @public
  */
 heights = null;

 /**
  * @property sortable
  * @type {boolean[]}
  * @public
  */
 sortable = null;

 /**
  * @property sortedColumnIndex
  * @type {Number}
  * @public
  */
 sortedColumnIndex = null;

 /**
  * @property sortDirection
  * @type {String}
  * @public
  */
 sortDirection = null;

 /**
  * @property contentTypes
  * @type {String[]}
  * @public
  */
 contentTypes = null;

 /**
  * @property defaultSortDirection
  * @type {String}
  * @public
  */
 defaultSortDirection = null;

 /**
  * @property defaultOnSort
  * @type {function}
  * @default no-op
  * @public
  */
 defaultOnSort() {}

 /**
  * @property isFixed
  * @type {boolean}
  * @private
  */
 @(equal('headingIndex', 0).readOnly())
 isFixed;

 /**
  * @property height
  * @type {Number}
  * @private
  */
 @(computed('truncate', 'heights.[]').readOnly())
 get height() {
   return !this.get('truncate') ? this.get('heights.firstObject') : undefined;
 }

 /**
  * @property direction
  * @type {String}
  * @private
  */
 @(computed('isSorted', 'sortDirection').readOnly())
 get direction() {
   return this.get('isSorted') ? this.get('sortDirection') : 'none';
 }
}
