import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/month';
import { computed } from '@ember/object';
import {
  monthsArray,
  getWeeksForMonth,
  getNewRange,
  abbreviationForWeekday,
  getWeekdaysOrdered,
} from '../../utils/dates';

export default Component.extend({
  attributeBindings: ['role'],

  classNames: ['Polaris-DatePicker__Month'],

  layout,

  /**
   * @property focusedDate
   * @public
   * @type {Date}
   * @default null
   */
  focusedDate: null,

  /**
   * @property selected
   * @public
   * @type {Object}
   * @default null
   */
  selected: null,

  /**
   * @property hoverDate
   * @public
   * @type {Date}
   * @default null
   */
  hoverDate: null,

  /**
   * @property month
   * @public
   * @type {Number}
   * @default null
   */
  month: null,

  /**
   * @property year
   * @public
   * @type {Number}
   * @default null
   */
  year: null,

  /**
   * @property disableDatesBefore
   * @public
   * @type {Date}
   * @default null
   */
  disableDatesBefore: null,

  /**
   * @property disableDatesAfter
   * @public
   * @type {Date}
   * @default null
   */
  disableDatesAfter: null,

  /**
   * @property allowRange
   * @public
   * @type {Boolean}
   * @default false
   */
  allowRange: false,

  /**
   * @property weekStartsOn
   * @public
   * @type {String}
   * @default null
   */
  weekStartsOn: null,

  /**
   * @property onChange
   * @public
   * @type {Function}
   * @default noop
   */
  onChange(/* dateRange */) {},

  /**
   * @property onHover
   * @public
   * @type {Function}
   * @default noop
   */
  onHover(/* hoverEnd */) {},

  /**
   * @property onFocus
   * @public
   * @type {Function}
   * @default noop
   */
  onFocus(/* date */) {},

  /**
   * @property monthName
   * @public
   * @type {Function}
   * @default noop
   */
  monthName(/* month */) {},

  /**
   * @property weekdayName
   * @public
   * @type {Function}
   * @default noop
   */
  weekdayName(/* weekday */) {},

  role: 'grid',

  'data-test-date-picker-month': true,

  current: computed('month', 'year', function() {
    let now = new Date();
    let thisMonth = now.getMonth();
    let thisYear = now.getFullYear();

    return thisMonth === this.get('month') && thisYear === this.get('year');
  }).readOnly(),

  monthDisplayName: computed('month', function() {
    return monthsArray[this.get('month')];
  }).readOnly(),

  weeks: computed('month', 'year', 'weekStartsOn', function() {
    let { month, year, weekStartsOn } = this.getProperties(
      'month',
      'year',
      'weekStartsOn'
    );

    return getWeeksForMonth(month, year, weekStartsOn);
  }).readOnly(),

  weekdays: computed('current', 'weekStartsOn', function() {
    let { current, weekStartsOn } = this.getProperties(
      'current',
      'weekStartsOn'
    );
    let day = new Date().getDay();

    return getWeekdaysOrdered(weekStartsOn).map((weekday, i) => {
      return {
        title: abbreviationForWeekday(weekday),
        current: current && day === i,
        label: weekday,
      };
    });
  }).readOnly(),

  actions: {
    handleDateClick(day) {
      let range = getNewRange(this.get('selected'), day);

      this.get('onChange')(range);
    },
  },
});
