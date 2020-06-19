import Component from '@ember/component';
import { computed } from '@ember/object';
import {
  classNames,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
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
@classNameBindings('disabled:Polaris-Tag--disabled')
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
   * @default: null
   * @public
   */
  text = null;

  /**
   * Disables the tag.
   *
   * @type {boolean}
   * @default: false
   * @public
   */
  disabled = false;

  /**
   * Callback when tag is removed
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onRemove() {}

  /**
   * The tag text. When inline-form, will match `text`, otherwise will read the
   * block for this.
   *
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
