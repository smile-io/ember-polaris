import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/day';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import {
  MonthsArray,
  isSameDay,
  dateIsInRange,
  dateIsSelected,
  isDateBefore,
  isDateAfter
} from '../../utils/dates';

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
   * @property onClick
   * @public
   * @type {Function}
   * @default noop
   */
  onClick(/*day*/) {},

  /**
   * @property onHover
   * @public
   * @type {Function}
   * @default noop
   */
  onHover(/*day*/) {},

  /**
   * @property onFocus
   * @public
   * @type {Function}
   * @default noop
   */
  onFocus(/*day*/) {},

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

  focused: computed('focusedDate', 'day', function() {
    let { focusedDate, day } = this.getProperties('focusedDate', 'day');

    return focusedDate !== null && isSameDay(day, focusedDate);
  }),

  selected: computed('selectedDates', 'day', function() {
    let { selectedDates, day } = this.getProperties('selectedDates', 'day');

    return selectedDates !== null && dateIsSelected(day, selectedDates);
  }),

  inRange: computed('selectedDates', 'day', function() {
    let selectedDates = this.get('selectedDates');
    let day = this.get('day');
    return selectedDates !== null && dateIsInRange(day, selectedDates);
  }),

  disabled: computed('day', 'disableDatesBefore', 'disableDatesAfter', function() {
    let {
      day,
      disableDatesBefore,
      disableDatesAfter
    } = this.getProperties('day', 'disableDatesBefore', 'disableDatesAfter');

    return (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
           (disableDatesAfter && isDateAfter(day, disableDatesAfter))
  }),

  ariaLabel: computed('day', 'today', 'date', function() {
    let today = this.get('today');
    let day = this.get('day');
    let month = MonthsArray[ day.getMonth() ];
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

  inHoveringRange: computed('day', 'selectedDates', 'hoverDate', 'allowRange', function() {
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

  applyInRangeStyles: or('inHoveringRange', 'inRange')
});
