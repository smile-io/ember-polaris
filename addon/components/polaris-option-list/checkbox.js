import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-option-list/checkbox';

@tagName('')
@templateLayout(layout)
export default class Checkbox extends Component {
  /**
   * @property checked
   * @type {Boolean}
   * @default false
   * @public
   */
  checked = false;

  /**
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * @property active
   * @type {Boolean}
   * @default false
   * @public
   */
  active = false;

  /**
   * @property name
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * @property value
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * @property role
   * @type {String}
   * @default null
   * @public
   */
  role = null;

  /**
   * @property checkboxId
   * @type {String}
   * @public
   */
  @computed
  get checkboxId() {
    return guidFor(this);
  }

  /**
   * @property onChange
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {}
}
