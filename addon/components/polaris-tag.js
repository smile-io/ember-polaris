import { className, classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';
import layout from '../templates/components/polaris-tag';
import { handleMouseUpByBlurring } from '../utils/focus';

/**
 * Polaris tag component.
 * See https://polaris.shopify.com/components/forms/tag
 *
 * @component polaris-tag
 */
@tagName('span')
@classNames('Polaris-Tag')
@templateLayout(layout)
export default class PolarisTag extends Component {
 /**
  * The content to display inside the tag.
  *
  * This component can be used in block form,
  * in which case the block content will be used
  * instead of `text`
  *
  * @property text
  * @public
  * @type {String}
  * @default: null
  */
 text = null;

 /**
  * Disables the tag.
  *
  * @property disabled
  * @public
  * @type {boolean}
  * @default: false
  */
 @className("Polaris-Tag--disabled")
 disabled = false;

 /**
  * Callback when tag is removed
  *
  * @property onRemove
  * @public
  * @type {Function}
  * @default no-op
  */
 onRemove() {}

 /**
  * The tag text. When inline-form, will match `text`, otherwise will read the
  * block for this.
  *
  * @property tagText
  * @private
  * @type {String}
  * @default null
  */
 tagText = null;

 handleMouseUpByBlurring = handleMouseUpByBlurring;
 'data-test-tag' = true;

 /**
  * String to be used as the `remove` button's `aria-label`
  * Gets updated after rendering to always use the most up-to-date tag text
  *
  * @property buttonLabel
  * @private
  * @type {String}
  * @default null
  */
 @(computed('tagText').readOnly())
 get buttonLabel() {
   return `Remove ${this.get('tagText')}`;
 }

 updateTagText() {
   // Read the tag text so we can use this for the aria-label.
   // We access the element's `textContent` so that this still works in block usage.
   let tagText = this.get('element.textContent') || '';
   this.set('tagText', tagText.trim());
 }

 didRender() {
   super.didRender(...arguments);
   this.updateTagText();
 }
}
