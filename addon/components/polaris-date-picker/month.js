import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/month';
import { computed } from '@ember/object';
import {
  monthsArray,
  weekdaysArray,
  getWeeksForMonth,
  getNewRange,
  abbreviationForWeekday,
} from '../../utils/dates';

export default Component.extend({
  classNames: ['Polaris-DatePicker__Month'],
  attributeBindings: ['role'],

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

  current: computed('month', 'year', function() {
    let date = new Date();
    let thisMonth = date.getMonth();
    let thisYear = date.getFullYear();

    return thisMonth === this.get('month') && thisYear === this.get('year');
  }).readOnly(),

  monthDisplayName: computed('month', function() {
    return monthsArray[this.get('month')];
  }).readOnly(),

  weeks: computed('month', 'year', function() {
    let { month, year } = this.getProperties('month', 'year');

    return getWeeksForMonth(month, year);
  }).readOnly(),

  weekdays: computed('current', function() {
    let current = this.get('current');
    let day = new Date().getDay();

    return weekdaysArray.map((weekday, i) => {
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
