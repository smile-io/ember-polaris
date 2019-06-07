import { attribute, className, classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/polaris-page/action';
import { handleMouseUpByBlurring } from '../../utils/focus';
import mapEventToAction from '../../utils/map-event-to-action';

@tagName('button')
@classNames('Polaris-Header-Action')
@templateLayout(layout)
export default class Action extends Component {
 /**
  * @property text
  * @type {String}
  * @default null
  * @public
  */
 text = null;

 /**
  * @property disclosure
  * @type {Boolean}
  * @default false
  * @public
  */
 disclosure = false;

 /**
  * @property url
  * @type {String}
  * @default null
  * @public
  * TODO: not implemented
  */
 url = null;

 /**
  * @property external
  * @type {Boolean}
  * @default false
  * @public
  * TODO: not implemented
  */
 external = false;

 /**
  * @property icon
  * @type {String}
  * @default null
  * @public
  */
 icon = null;

 /**
  * @property accessibilityLabel
  * @type {String}
  * @default null
  * @public
  */
 @attribute("aria-label")
 accessibilityLabel = null;

 /**
  * @property disabled
  * @type {Boolean}
  * @default false
  * @public
  */
 @attribute
 disabled = false;

 /**
  * @property onAction
  * @type {Function}
  * @default noop
  * @public
  */
 onAction() {}

 @attribute
 type = 'button';

 mouseUp = handleMouseUpByBlurring;

 click = mapEventToAction('onAction');

 @(computed('text', 'icon').readOnly())
 @className("Polaris-Header-Action--iconOnly")
 get isIconOnly() {
   return this.get('icon') && isBlank(this.get('text'));
 }
}
