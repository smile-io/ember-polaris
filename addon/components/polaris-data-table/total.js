import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-data-table/total';

@tagName('')
@templateLayout(layout)
export default class Total extends Component {
 /**
  * @property total
  * @type {String|Number|Component}
  * @public
  */
 total = null;

 /**
  * @property index
  * @type {Number}
  * @public
  */
 index = null;

 /**
  * @property heights
  * @type {Number[]}
  * @public
  */
 heights = null;

 /**
  * @property truncate
  * @type {boolean}
  * @default false
  * @public
  */
 truncate = false;

 /**
  * @property totalsRowHeading
  * @type {String}
  * @public
  */
 totalsRowHeading = null;

 /**
  * @property contentType
  * @type {String}
  * @private
  */
 @computed('total', 'index')
 get contentType() {
   let { total, index } = this.getProperties('total', 'index');

   if (total !== '' && index > 0) {
     return 'numeric';
   }

   return null;
 }
}
