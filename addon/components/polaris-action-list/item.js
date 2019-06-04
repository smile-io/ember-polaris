import { attribute, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import layout from '../../templates/components/polaris-action-list/item';

@tagName('li')
@templateLayout(layout)
export default class Item extends Component {
 /**
  * @property text
  * @type {String}
  * @default null
  * @public
  */
 text = null;

 /**
  * @property helpText
  * @type {String}
  * @default null
  * @public
  */
 helpText = null;

 /**
  * Not currently supported
  * @property url
  * @type {String}
  * @default null
  * @public
  */
 url = null;

 /**
  * @property destructive
  * @type {Boolean}
  * @default false
  * @public
  */
 destructive = false;

 /**
  * @property disabled
  * @type {Boolean}
  * @default false
  * @public
  */
 disabled = false;

 /**
  * @property icon
  * @type {String}
  * @default null
  * @public
  */
 icon = null;

 /**
  * @property image
  * @type {String}
  * @default null
  * @public
  */
 image = null;

 /**
  * Not currently supported
  * @property ellipsis
  * @type {Boolean}
  * @default false
  * @public
  */
 ellipsis = false;

 /**
  * @property active
  * @type {Boolean}
  * @default false
  * @public
  */
 @attribute("aria-selected")
 active = false;

 /**
  * @property role
  * @type {String}
  * @default null
  * @public
  */
 @attribute
 role = null;

 /**
  * Object with `status` and `content` properties
  * Not currently supported
  * @property badge
  * @type {Object}
  * @default null
  * @public
  */
 badge = null;

 /**
  * Callback for the item when clicked
  *
  * @property onAction
  * @public
  * @type {Function}
  * @default no-op
  */
 onAction() {}

 @computed('destructive', 'disabled', 'active')
 get itemClasses() {
   let classNames = ['Polaris-ActionList__Item'];
   let { destructive, disabled, active } = this;

   if (destructive) {
     classNames.push('Polaris-ActionList--destructive');
   }

   if (disabled) {
     classNames.push('Polaris-ActionList--disabled');
   }

   if (active) {
     classNames.push('Polaris-ActionList--active');
   }

   return classNames.join(' ');
 }

 @(computed('image').readOnly())
 get imageBackgroundStyle() {
   let url = this.get('image');
   return url ? htmlSafe(`background-image: url(${url})`) : '';
 }
}
