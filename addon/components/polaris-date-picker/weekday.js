import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/weekday';

export default Component.extend({
  attributeBindings: ['label:aria-label'],

  classNames: ['Polaris-DatePicker__Weekday'],

  classNameBindings: ['current:Polaris-DatePicker__Weekday--current'],

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
  current: false,

  'data-test-date-picker-weekday': true,
});
