import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-popover/content';

@tagName('')
@templateLayout(layout)
export default class Content extends Component {
 /**
  * Automatically add wrap content in a section
  *
  * @property sectioned
  * @type {Boolean}
  * @default false
  * @public
  */
 sectioned = false;

 /**
  * Allow popover to stretch to the full width of its activator
  *
  * @property fullWidth
  * @type {Boolean}
  * @default false
  * @public
  */
 fullWidth = false;

 /**
  * Allow popover to stretch to fit content vertically
  *
  * @property fullHeight
  * @type {Boolean}
  * @default false
  * @public
  */
 fullHeight = false;

 /**
  * Content wrapper component.
  *
  * @property contentComponent
  * @type {Component}
  * @default: null
  * @public
  */
 contentComponent = null;

 /**
  * Simple text for quick popovers.
  *
  * This component can be used in block form,
  * in which case the block content will be used
  * instead of `text`
  *
  * @property text
  * @type {String}
  * @default null
  * @public
  */
 text = null;

 /**
  * `ember-basic-dropdown`'s generated ID, used to look up
  *
  * @property uniqueId
  * @type {String}
  * @default: null
  * @public
  */
 uniqueId = null;
}
