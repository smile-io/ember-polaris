import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/polaris-resource-list/checkable-button';

export default Component.extend({
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
  onToggleAll() {},

  checkableButtonClasses: computed(
    'plain',
    'selectMode',
    'selected',
    'measuring',
    function() {
      let classNames = ['Polaris-ResourceList-CheckableButton'];
      let { plain, selectMode, selected, measuring } = this.getProperties(
        'plain',
        'selectMode',
        'selected',
        'measuring'
      );

      if (plain) {
        classNames.push(
          'Polaris-ResourceList-CheckableButton__CheckableButton--plain'
        );
        return classNames.join(' ');
      }

      if (selectMode) {
        classNames.push(
          'Polaris-ResourceList-CheckableButton__CheckableButton--selectMode'
        );
      }

      if (selected) {
        classNames.push(
          'Polaris-ResourceList-CheckableButton__CheckableButton--selected'
        );
      }

      if (measuring) {
        classNames.push(
          'Polaris-ResourceList-CheckableButton__CheckableButton--measuring'
        );
      }

      return classNames.join(' ');
    }
  ),
});
