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
   */
  accessibilityLabel = null;

  /**
   * @type {String}
   * @default ''
   * @property label
   */
  label = '';

  /**
   *
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   *
   * @type {Boolean|String}
   * @default null
   * @property selected
   */
  selected = null;

  /**
   * @type {Boolean}
   * @default false
   * @property selectMode
   */
  selectMode = false;

  /**
   * @type {Boolean}
   * @default false
   * @property plain
   */
  plain = false;

  /**
   * @type {Boolean}
   * @default false
   * @property measuring
   */
  measuring = false;

  /**
   * @type {Boolean}
   * @default false
   * @property disabled
   */
  disabled = false;

  /**
   * @type {Function}
   * @default noop
   * @property onToggleAll
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
