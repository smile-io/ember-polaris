import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/day';
import { computed } from '@ember/object';
import { Months, isSameDay } from '../utils/dates';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * @property focused
   * @public
   * @type {Boolean}
   * @default false
   */
  focused: false,

  /**
   * @property day
   * @public
   * @type {Date}
   * @default null
   */
  day: null,

  /**
   * @property selected
   * @public
   * @type {Boolean}
   * @default false
   */
  selected: false,

  /**
   * @property inRange
   * @public
   * @type {Boolean}
   * @default false
   */
  inRange: false,

  /**
   * @property inHoveringRange
   * @public
   * @type {Boolean}
   * @default false
   */
  inHoveringRange: false,

  /**
   * @property disabled
   * @public
   * @type {Boolean}
   * @default false
   */
  disabled: false,

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
  })
});
