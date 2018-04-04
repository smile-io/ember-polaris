import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-date-picker';
import {
  Months,
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth
} from '../utils/dates';

export default Component.extend({
  classNames: ['Polaris-DatePicker'],

  layout,

  /**
   * The selected date or range of dates
   *
   * @property selected
   * @public
   * @type {Date} // TODO: this should probably just always be a { start, end } object
   * @type {Object}
   * @default null
   */
  selected: null,

  /**
   * The month to show
   *
   * @property month
   * @public
   * @type {Number}
   * @default null
   */
  month: null,

  /**
   * The year to show
   *
   * @property year
   * @public
   * @type {Number}
   * @default null
   */
  year: null,

  /**
   * Disable selecting dates before this date
   *
   * @property disableDatesBefore
   * @public
   * @type {Date}
   * @default null
   */
  disableDatesBefore: null,

  /**
   * Disable selecting dates after this
   *
   * @property disableDatesAfter
   * @public
   * @type {Date}
   * @default null
   */
  disableDatesAfter: null,

  /**
   * The selection can span multiple months
   *
   * @property multiMonth
   * @public
   * @type {Boolean}
   * @default null
   */
  multiMonth: null,

  /**
   * Callback when date is selected
   *
   * @property title
   * @public
   * @type {Function}
   * @default noop
   */
  onChange(dateRange) {},

  /**
   * Callback when month is changed
   *
   * @property onMonthChange
   * @public
   * @type {Function}
   * @default noop
   */
  onMonthChange(month, year) {},

  /**
   * Internal Properties
   */
  hoverDate: null,

  focusDate: null,

  showNextYear: computed('month', 'year', function() {
    let { month, year } = this.getProperties('month', 'year');

    return getNextDisplayYear(month, year);
  }),

  showNextMonth: computed('month', function() {
    return getNextDisplayMonth( this.get('month') );
  }),

  showNextToNextYear: computed('showNextMonth', 'showNextYear', function() {
    let { showNextMonth, showNextYear } = this.getProperties('showNextMonth', 'showNextYear');

    return getNextDisplayYear(showNextMonth, showNextYear);
  }),

  showNextToNextMonth: computed('showNextMonth', function() {
    return getNextDisplayMonth( this.get('showNextMonth') );
  }),

  showPreviousYear: computed('month', 'year', function() {
    let { month, year } = this.getProperties('month', 'year');

    return getPreviousDisplayYear(month, year);
  }),

  showPreviousMonth: computed('month', function() {
    return getPreviousDisplayMonth(this.get('month'));
  }),

  previousMonthName: computed('showPreviousMonth', function() {
    return Months[ this.get('showPreviousMonth') ];
  }),

  nextMonth: computed('multiMonth', 'showNextToNextMonth', 'showNextMonth', function() {
    let {
      multiMonth,
      showNextToNextMonth,
      showNextMonth
    } = this.getProperties('multiMonth', 'showNextToNextMonth', 'showNextMonth');

    return multiMonth ? Months[showNextToNextMonth] : Months[showNextMonth];
  }),

  nextYear: computed('multiMonth', 'showNextToNextYear', 'showNextYear', function() {
    let {
      multiYear,
      showNextToNextYear,
      showNextYear
    } = this.getProperties('multiMonth', 'showNextToNextYear', 'showNextYear');

    return multiMonth ? showNextToNextYear : showNextYear;
  }),

  range: computed('selected', function() {
    let selected = this.get('selected');
    let hoverDate = (selected instanceof Date) ? { start: selected, end: selected } : selected;
    return hoverDate && hoverDate.end;
  }),

  actions: {
    handleDateSelection(dateRange) {
      let { end: endDate } = this.get('dateRange');

      this.setProperties({
        hoverDate: endDate,
        focusDate: new Date(endDate)
      });

      this.get('onChange')(dateRange);
    },

    handleHover(date) {
      this.set('hoverDate', date);
    },

    handleFocus(date) {
      this.set('focusDate');
    }
  }

  /**
   * Accessibility labels for the next/previous month buttons.
   * @type {String}
   * @private
   */
  // previousMonthLabel: computed('previousMonthName', 'showPreviousYear', function() {
  //   return `Show previous month, ${ this.get('previousMonthName') } ${ this.get('showPreviousYear') }`;
  // }).readOnly(),

  // nextMonthLabel: computed('nextMonth', 'nextYear', function() {
  //   return `Show next month, ${ this.get('nextMonth') } ${ this.get('nextYear') }`;
  // }).readOnly(),

  // /**
  //  * Actions.
  //  */
  // // TODO date-picker: keyDown/keyUp aren't being fired and need implementing.
  // keyDown() {
  //   console.log('keyDown');
  // },

  // keyUp() {
  //   console.log('keyUp');
  // },

  // actions: {
  //   handleMonthChangeClick(month, year) {
  //     // TODO date-picker: implement handleMonthChangeClick
  //   }
  // }
});
