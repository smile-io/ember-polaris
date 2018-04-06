import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/weekday';
import { Weekdays } from '../../utils/dates';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['Polaris-DatePicker__Weekday'],
  classNameBindings: ['current:Polaris-DatePicker__Weekday--current'],
  attributeBindings: ['label:aria-label'],

  layout,

  /**
   * @property label
   * @public
   * @type {String}
   * @default null
   */
  label: null,

  /**
   * @property title
   * @public
   * @type {String}
   * @default null
   */
  title: null,

  /**
   * @property current
   * @public
   * @type {Boolean}
   * @default false
   */
  current: false
});
