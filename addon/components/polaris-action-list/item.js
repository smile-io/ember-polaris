import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-action-list/item';

@tagName('')
@layout(template)
export default class PolarisActionListItem extends Component {
  /**
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * Not currently supported
   * @type {String}
   * @default null
   * @public
   */
  url = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  destructive = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

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
  image = null;

  /**
   * Not currently supported
   * @type {Boolean}
   * @default false
   * @public
   */
  ellipsis = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  active = false;

  /**
   * @type {String}
   * @default null
   * @public
   */
  role = null;

  /**
   * Object with `status` and `content` properties
   * Not currently supported
   * @type {Object}
   * @default null
   * @public
   */
  badge = null;

  /**
   * Callback for the item when clicked
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onAction() {}

  @computed('destructive', 'disabled', 'active')
  get itemClasses() {
    let cssClasses = ['Polaris-ActionList__Item'];
    let { destructive, disabled, active } = this;

    if (destructive) {
      cssClasses.push('Polaris-ActionList--destructive');
    }

    if (disabled) {
      cssClasses.push('Polaris-ActionList--disabled');
    }

    if (active) {
      cssClasses.push('Polaris-ActionList--active');
    }

    return cssClasses.join(' ');
  }

  @computed('image')
  get imageBackgroundStyle() {
    let { image: url } = this;
    return url ? htmlSafe(`background-image: url(${url})`) : '';
  }
}
