import { action } from '@ember/object';
import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-option-list/option';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisOptionListOption extends Component {
  /**
   * @type {String}
   * @default null
   * @public
   */
  optionId = null;

  /**
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  label = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * @type {Number}
   * @default null
   * @public
   */
  section = null;

  /**
   * @type {Number}
   * @default null
   * @public
   */
  index = null;

  /**
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  media = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  active = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  select = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  allowMultiple = false;

  /**
   * @type {String}
   * @default null
   * @public
   */
  role = null;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {}

  /**
   * @type {Boolean}
   * @default false
   */
  focused = false;

  tabIndex = -1;

  @action
  handleClick() {
    if (this.disabled) {
      return;
    }

    this.onClick(this.section, this.index);
  }

  @action
  toggleFocus() {
    this.toggleProperty('focused');
  }
}
