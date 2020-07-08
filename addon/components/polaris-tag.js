import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-tag';
import { handleMouseUpByBlurring } from '../utils/focus';
import deprecateClassArgument from '../utils/deprecate-class-argument';

/**
 * Polaris tag component.
 * See https://polaris.shopify.com/components/forms/tag
 *
 * @component polaris-tag
 */
@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisTag extends Component {
  /**
   * The content to display inside the tag.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @public
   */
  text;

  /**
   * Disables the tag.
   *
   * @type {boolean}
   * @public
   */
  disabled;

  /**
   * Callback when tag is removed
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onRemove() {}

  /**
   * The tag title. When inline-form, will match `text`, otherwise will read the
   * block for this.
   *
   * @type {String}
   */
  tagText = '';

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  /**
   * String to be used as the `remove` button's `aria-label`
   * Gets updated after rendering to always use the most up-to-date tag text
   *
   * @type {String}
   * @default null
   */
  @(computed('tagText').readOnly())
  get buttonLabel() {
    return `Remove ${this.tagText}`;
  }

  @action
  setTagText(element) {
    this.set('_tagElement', element);
    this.updateTagText();
  }

  @action
  updateTagText() {
    if (!this._tagElement) {
      return;
    }
    // Read the tag text so we can use this for the title.
    // We access the element's `textContent` so that this still works in block usage.
    let tagText =
      this._tagElement.querySelector('.Polaris-Tag__TagText').textContent || '';
    this.set('tagText', tagText.trim());
  }
}
