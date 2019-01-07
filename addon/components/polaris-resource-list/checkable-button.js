import Component from '@ember/component';
import { and, not } from '@ember/object/computed';
import mapEventToAction from '@smile-io/ember-polaris/utils/map-event-to-action';
import layout from '../../templates/components/polaris-resource-list/checkable-button';

export default Component.extend({
  classNames: ['Polaris-ResourceList-CheckableButton'],

  classNameBindings: [
    'plain:Polaris-ResourceList-CheckableButton__CheckableButton--plain',
    'shouldApplySelectModeClass:Polaris-ResourceList-CheckableButton__CheckableButton--selectMode',
    'shouldApplySelectedClass:Polaris-ResourceList-CheckableButton__CheckableButton--selected',
    'shouldApplyMeasuringClass:Polaris-ResourceList-CheckableButton__CheckableButton--measuring',
  ],

  layout,

  /**
   * @type {String}
   * @default null
   * @property accessibilityLabel
   */
  accessibilityLabel: null,

  /**
   * @type {String}
   * @default ''
   * @property label
   */
  label: '',

  /**
   *
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   *
   * @type {Boolean|String}
   * @default null
   * @property selected
   */
  selected: null,

  /**
   * @type {Boolean}
   * @default false
   * @property selectMode
   */
  selectMode: false,

  /**
   * @type {Boolean}
   * @default false
   * @property plain
   */
  plain: false,

  /**
   * @type {Boolean}
   * @default false
   * @property measuring
   */
  measuring: false,

  /**
   * @type {Boolean}
   * @default false
   * @property disabled
   */
  disabled: false,

  /**
   * @type {Function}
   * @default noop
   * @property onToggleAll
   */
  click: mapEventToAction('onToggleAll'),

  isNotPlain: not('plain'),
  shouldApplySelectModeClass: and('isNotPlain', 'selectMode'),
  shouldApplySelectedClass: and('isNotPlain', 'selected'),
  shouldApplyMeasuringClass: and('isNotPlain', 'measuring'),
});
