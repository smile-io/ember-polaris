import Component from '@ember/component';
import { not, and } from '@ember/object/computed';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-resource-list/checkable-button';

@tagName('')
@templateLayout(layout)
export default class CheckableButton extends Component {
  /**
   * @type {String}
   * @default null
   * @property accessibilityLabel
   * @public
   */
  accessibilityLabel = null;

  /**
   * @type {String}
   * @default ''
   * @property label
   * @public
   */
  label = '';

  /**
   *
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   *
   * @type {Boolean|String}
   * @default null
   * @property selected
   * @public
   */
  selected = null;

  /**
   * @type {Boolean}
   * @default false
   * @property selectMode
   * @public
   */
  selectMode = false;

  /**
   * @type {Boolean}
   * @default false
   * @property plain
   * @public
   */
  plain = false;

  /**
   * @type {Boolean}
   * @default false
   * @property measuring
   * @public
   */
  measuring = false;

  /**
   * @type {Boolean}
   * @default false
   * @property disabled
   * @public
   */
  disabled = false;

  /**
   * @type {Function}
   * @default noop
   * @property onToggleAll
   * @public
   */
  onToggleAll() {}

  @not('plain')
  isNotPlain;

  @and('isNotPlain', 'selectMode')
  shouldApplySelectModeClass;

  @and('isNotPlain', 'selected')
  shouldApplySelectedClass;

  @and('isNotPlain', 'measuring')
  shouldApplyMeasuringClass;
}
