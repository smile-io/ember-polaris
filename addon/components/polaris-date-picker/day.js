import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/day';
import { computed } from '@ember/object';
import {
  Months,
  isSameDay,
  dateIsSelected,
  isDateBefore,
  isDateAfter
} from '../utils/dates';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * @property focusedDate
   * @public
   * @type {Date}
   * @default null
   */
  focusedDate: null,

  focused: computed('focusedDate', 'day', function() {
    let focusedDate = this.get('focusedDate');
    let day = this.get('day');
    return focusedDate !== null && isSameDay(day, focusedDate);
  }),

  /**
   * @property day
   * @public
   * @type {Date}
   * @default null
   */
  day: null,

  /**
   * @property selectedDates
   * @public
   * @type {Object}
   * @default null
   */
  selectedDates: null,

  selected: computed('selectedDates', 'day', function() {
    let selectedDates = this.get('selectedDates');
    let day = this.get('day');
    return selectedDates !== null && dateIsSelected(day, selectedDates);
  }),

  inRange: computed('selectedDates', 'day', function() {
    let selectedDates = this.get('selectedDates');
    let day = this.get('day');
    return selectedDates !== null && dateIsInRange(day, selectedDates);
  }),

  /**
   * @property inHoveringRange
   * @public
   * @type {Boolean}
   * @default false
   */
  inHoveringRange: false,

  /**
   * @property disabledDatesBefore
   * @public
   * @type {Date}
   * @default null
   */
  disabledDatesBefore: null,

  /**
   * @property disabledDatesAfter
   * @public
   * @type {Date}
   * @default null
   */
  disabledDatesAfter: null,

  disabled: computed('day', 'disableDatesBefore', 'disabledDatesAfter', function() {
    let {
      day,
      disableDatesBefore,
      disabledDatesAfter
    } = this.getProperties('day', 'disableDatesBefore', 'disabledDatesAfter');

    return (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
           (disableDatesAfter && isDateAfter(day, disableDatesAfter))
  }),

  /**
   * @property allowRange
   * @public
   * @type {Boolean}
   * @default false
   */
  allowRange: false,

  /**
   * @property focused
   * @public
   * @type {Function}
   * @default noop
   */
  onClick(day) {},

  /**
   * @property focused
   * @public
   * @type {Function}
   * @default noop
   */
  onHover(day) {},

  /**
   * @property focused
   * @public
   * @type {Function}
   * @default noop
   */
  onFocus(day) {},

  /**
   * Internal Properties
   */
  date: computed('day', function() {
    let day = this.get('day');
    return day.getDate();
  }),

  today: computed('day', function() {
    let day = this.get('day');
    return isSameDay(new Date(), day);
  }),

  ariaLabel: computed('day', 'today', 'date', function() {
    let today = this.get('today');
    let day = this.get('day');
    let month = Months[day.getMonth()];
    let date = this.get('date');
    let year = day.getFullYear();

    return [
      `${ today ? 'Today ' : '' }`,
      `${ month } `,
      `${ date } `,
      `${ year }`
    ].join('');
  }),

  tabIndex: computed('focused', 'selected', 'disabled', 'date', 'today', function() {
    let {
      focused,
      selected,
      disabled,
      date,
      today
    } = this.getProperties('focused', 'selected', 'disabled', 'date', 'today');

    return (focused || selected || today || date === 1) && !disabled ? 0 : -1;
  }),

  inHoveringRange: computed('day', 'selectedDates', 'hoverDate', 'allowRange' function() {
    let {
      day,
      selectedDates,
      hoverDate,
      allowRange
    } = this.getProperties('day', 'selectedDates', 'hoverDate', 'allowRange');

    if (!allowRange || day === null) {
      return false;
    }

    const { start, end } = selectedDates;

    return Boolean(start === end && day > start && day <= hoverDate);
  }),
});
