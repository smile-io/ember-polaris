import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-page/action';
import { handleMouseUpByBlurring } from '../../utils/focus';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@layout(template)
export default class ActionComponent extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disclosure = false;

  /**
   * @type {String}
   * @default null
   * @public
   * TODO: not implemented
   */
  url = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   * TODO: not implemented
   */
  external = false;

  /**
   * @type {String}
   * @default null
   * @public
   */
  icon = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onAction() {}

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  @computed('text', 'icon')
  get isIconOnly() {
    return this.icon && isBlank(this.text);
  }

  @computed('isIconOnly', 'disabled', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-Header-Action'];
    if (this.isIconOnly) {
      cssClasses.push('Polaris-Header-Action--iconOnly');
    }

    if (this.disabled) {
      cssClasses.push('Polaris-Header-Action--disabled');
    }

    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  @action
  handleClick(/* event */) {
    this.onAction();
  }
}
