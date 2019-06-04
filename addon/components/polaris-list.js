import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import { equal } from "@ember-decorators/object/computed";
import Component from '@ember/component';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-list';

const allowedListTypes = ['bullet', 'number'];
const defaultListType = 'bullet';

@tagName('')
@templateLayout(layout)
export default class PolarisList extends Component {
 /**
  * Type of list to display
  *
  * @property type
  * @public
  * @type {String}
  * @default 'bullet'
  */
 type = defaultListType;

 /**
  * Flag to determine whether to render an ordered or unordered list
  *
  * @property isBulletListType
  * @private
  * @type {boolean}
  */
 @(equal('listType', 'bullet').readOnly())
 isBulletListType;

 /**
  * Actual list type for internal use
  *
  * @property listType
  * @private
  * @type {String}
  */
 @(computed('type').readOnly())
 get listType() {
   let type = this.get('type');
   if (allowedListTypes.indexOf(type) === -1) {
     type = defaultListType;
   }

   return type;
 }

 /**
  * Class for list element
  *
  * @property listElementClass
  * @private
  * @type {String}
  */
 @(computed('listType').readOnly())
 get listElementClass() {
   let classNames = ['Polaris-List'];

   let type = this.get('listType');
   classNames.push(`Polaris-List--type${classify(type)}`);

   return classNames.join(' ');
 }
}
