import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/month';
import { computed } from '@ember/object';
import {
  Months,
  Weekdays,
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  abbreviationForWeekday
} from '../utils/dates';

const WEEKDAYS = [
  Weekdays.Sunday,
  Weekdays.Monday,
  Weekdays.Tuesday,
  Weekdays.Wednesday,
  Weekdays.Thursday,
  Weekdays.Friday,
  Weekdays.Saturday,
];

export default Component.extend({
  classNames: ['Polaris-DatePicker__Month'],
  attributeBindings: ['role'],

  role: 'grid',

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
   * @property onChange
   * @public
   * @type {Function}
   * @default noop
   */
  onChange(dateRange) {},

  /**
   * @property onHover
   * @public
   * @type {Function}
   * @default noop
   */
  onHover(hoverEnd) {},

  /**
   * @property onFocus
   * @public
   * @type {Function}
   * @default noop
   */
  onFocus(date) {},

  /**
   * @property monthName
   * @public
   * @type {Function}
   * @default noop
   */
  monthName(month) {},

  /**
   * @property weekdayName
   * @public
   * @type {Function}
   * @default noop
   */
  weekdayName(weekday) {},

  /**
   * Internal Properties
   */
  current: computed('month', function() {
    return new Date().getMonth() === this.get('month');
  }),

  weeks: computed('month', 'year', function() {
    let month = this.get('month');
    let year = this.get('year');

    return getWeeksForMonth(month, year);
  }),

  weekdays: computed(function() {
    let current = this.get('current');

    return WEEKDAYS.map((weekday, i) => {
      return {
        title: abbreviationForWeekday(weekday),
        current: (current && new Date().getDay() === i),
        label: weekday
      };
    })
  })
});
