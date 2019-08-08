import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-page/action';
import { handleMouseUpByBlurring } from '../../utils/focus';

@tagName('')
@layout(template)
export default class ActionComponent extends Component {
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

  type = 'button';

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  @computed('text', 'icon')
  get isIconOnly() {
    return this.icon && isBlank(this.text);
  }
}
