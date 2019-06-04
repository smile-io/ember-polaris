import { classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import layout from '../../templates/components/polaris-data-table/row';

@tagName('tr')
@classNames('Polaris-DataTable__TableRow')
@templateLayout(layout)
export default class Row extends Component {
 /**
  * @property row
  * @type {Array}
  * @public
  */
 row = null;

 /**
  * @property index
  * @type {Number}
  * @public
  */
 index = null;

 /**
  * @property totals
  * @type {Number[]}
  * @public
  */
 totals = null;

 /**
  * @property heights
  * @type {Number[]}
  * @public
  */
 heights = null;

 /**
  * @property footerContent
  * @type {String|Number|Component}
  * @public
  */
 footerContent = null;

 /**
  * @property contentTypes
  * @type {String[]}
  * @public
  */
 contentTypes = null;

 /**
  * @property truncate
  * @type {boolean}
  * @default false
  * @public
  */
 truncate = false;

 'data-test-data-table-row' = true;

 /**
  * @property bodyCellHeights
  * @type {Number[]}
  * @private
  */
 @(computed('totals.[]', 'heights.[]', 'footerContent').readOnly())
 get bodyCellHeights() {
   let { totals, heights, footerContent } = this.getProperties(
     'totals',
     'heights',
     'footerContent'
   );
   let bodyCellHeights = isPresent(totals)
     ? heights.slice(2)
     : heights.slice(1);

   if (footerContent) {
     bodyCellHeights.pop();
   }

   return bodyCellHeights;
 }
}
