import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { deriveRange } from '../helpers/polaris-date-picker/derive-range';
import layout from '../templates/components/polaris-date-picker';
import {
  monthsArray,
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
  weekdays, // obj
  isSameDay,
} from '../utils/dates';

// TODO: add changes for Polaris v2.2.0
// See https://github.com/Shopify/polaris/compare/v2.0.0...v2.2.0?diff=split#diff-31dd30c75130536eea45b3bccfbb92b9
// (fixes https://github.com/Shopify/polaris/issues/313, if the bug's present in our Ember implementation)

export default Component.extend({
  classNames: ['Polaris-DatePicker'],

  layout,

  /**
   * The selected date or range of dates
   *
   * @property selected
   * @public
   * @type {Date | Object}
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
   * @default false
   */
  multiMonth: false,

  /**
   * Callback when date is selected
   *
   * @property title
   * @public
   * @type {Function}
   * @default noop
   */
  onChange(/* dateRange */) {},

  /**
   * Callback when month is changed
   *
   * @property onMonthChange
   * @public
   * @type {Function}
   * @default noop
   */
  onMonthChange(/* month, year */) {},

  hoverDate: null,

  focusDate: null,

  'data-test-date-picker': true,

  allowRange: computed('selected', function() {
    let selected = this.get('selected');

    return selected !== null && !(selected instanceof Date);
  }).readOnly(),

  showNextYear: computed('month', 'year', function() {
    let { month, year } = this.getProperties('month', 'year');

    return getNextDisplayYear(month, year);
  }).readOnly(),

  showNextMonth: computed('month', function() {
    return getNextDisplayMonth(this.get('month'));
  }).readOnly(),

  showNextToNextYear: computed('showNextMonth', 'showNextYear', function() {
    let { showNextMonth, showNextYear } = this.getProperties(
      'showNextMonth',
      'showNextYear'
    );

    return getNextDisplayYear(showNextMonth, showNextYear);
  }).readOnly(),

  showNextToNextMonth: computed('showNextMonth', function() {
    return getNextDisplayMonth(this.get('showNextMonth'));
  }).readOnly(),

  showPreviousYear: computed('month', 'year', function() {
    let { month, year } = this.getProperties('month', 'year');

    return getPreviousDisplayYear(month, year);
  }).readOnly(),

  showPreviousMonth: computed('month', function() {
    return getPreviousDisplayMonth(this.get('month'));
  }).readOnly(),

  previousMonthName: computed('showPreviousMonth', function() {
    return monthsArray[this.get('showPreviousMonth')];
  }).readOnly(),

  nextMonth: computed(
    'multiMonth',
    'showNextToNextMonth',
    'showNextMonth',
    function() {
      let {
        multiMonth,
        showNextToNextMonth,
        showNextMonth,
      } = this.getProperties(
        'multiMonth',
        'showNextToNextMonth',
        'showNextMonth'
      );

      return multiMonth
        ? monthsArray[showNextToNextMonth]
        : monthsArray[showNextMonth];
    }
  ).readOnly(),

  nextYear: computed(
    'multiMonth',
    'showNextToNextYear',
    'showNextYear',
    function() {
      let { multiMonth, showNextToNextYear, showNextYear } = this.getProperties(
        'multiMonth',
        'showNextToNextYear',
        'showNextYear'
      );

      return multiMonth ? showNextToNextYear : showNextYear;
    }
  ).readOnly(),

  previousMonthLabel: computed(
    'previousMonthName',
    'showPreviousYear',
    function() {
      return `Show previous month, ${this.get('previousMonthName')} ${this.get(
        'showPreviousYear'
      )}`;
    }
  ).readOnly(),

  nextMonthLabel: computed('nextMonth', 'nextYear', function() {
    return `Show next month, ${this.get('nextMonth')} ${this.get('nextYear')}`;
  }).readOnly(),

  setFocusDateAndHandleMonthChange(date) {
    this.get('onMonthChange')(date.getMonth(), date.getFullYear());

    this.setProperties({
      hoverDate: date,
      focusDate: date,
    });
  },

  handleFocus(date) {
    this.set('focusDate', date);
  },

  resetFocus() {
    this.set('focusDate', null);
  },

  isSameSelectedDate(previousSelection, currentSelection) {
    if (previousSelection == null || currentSelection == null) {
      return previousSelection == null && currentSelection == null;
    }

    if (previousSelection instanceof Date || currentSelection instanceof Date) {
      return (
        previousSelection instanceof Date &&
        currentSelection instanceof Date &&
        isSameDay(previousSelection, currentSelection)
      );
    }

    return (
      isSameDay(previousSelection.start, currentSelection.start) &&
      isSameDay(previousSelection.end, currentSelection.end)
    );
  },

  /**
   * Events
   */
  keyUp({ key }) {
    let {
      disableDatesBefore,
      disableDatesAfter,
      focusDate,
      selected,
    } = this.getProperties(
      'disableDatesBefore',
      'disableDatesAfter',
      'focusDate',
      'selected'
    );

    let range = deriveRange(selected);
    let focusedDate = focusDate || (range && range.start);

    if (isNone(focusedDate)) {
      return;
    }

    if (key === 'ArrowUp') {
      let previousWeek = new Date(focusedDate);

      previousWeek.setDate(focusedDate.getDate() - 7);

      if (
        !(disableDatesBefore && isDateBefore(previousWeek, disableDatesBefore))
      ) {
        this.setFocusDateAndHandleMonthChange(previousWeek);
      }
    }

    if (key === 'ArrowDown') {
      let nextWeek = new Date(focusedDate);

      nextWeek.setDate(focusedDate.getDate() + 7);

      if (disableDatesAfter && isDateAfter(nextWeek, disableDatesAfter)) {
        this.setFocusDateAndHandleMonthChange(nextWeek);
      }
    }

    if (key === 'ArrowRight') {
      let tomorrow = new Date(focusedDate);

      tomorrow.setDate(focusedDate.getDate() + 1);

      if (!(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(tomorrow);
      }
    }

    if (key === 'ArrowLeft') {
      let yesterday = new Date(focusedDate);

      yesterday.setDate(focusedDate.getDate() - 1);

      if (
        !(disableDatesBefore && isDateBefore(yesterday, disableDatesBefore))
      ) {
        this.setFocusDateAndHandleMonthChange(yesterday);
      }
    }
  },

  keyDown(e) {
    let { key } = e;

    if (
      key === 'ArrowUp' ||
      key === 'ArrowDown' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight'
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let previousSelected = this.get('_previousSelected');
    let selected = this.get('selected');

    if (
      previousSelected &&
      !this.isSameSelectedDate(previousSelected, selected)
    ) {
      this.resetFocus();
    }
  },

  actions: {
    handleDateSelection(dateRange) {
      let { end: endDate } = dateRange;

      this.setProperties({
        hoverDate: endDate,
        focusDate: new Date(endDate),
      });

      this.get('onChange')(dateRange);
    },

    handleMonthChangeClick(month, year) {
      this.get('onMonthChange')(month, year);

      this.set('focusDate', null);
    },
  },

  /**
   * First day of week. Sunday by default
   *
   * @property weekStartsOn
   * @public
   * @type {String}
   * @default 'Sunday'
   */
  weekStartsOn: weekdays.Sunday,
});
