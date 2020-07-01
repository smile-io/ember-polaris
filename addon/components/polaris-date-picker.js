import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
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
  weekdays,
  isSameDay,
} from '../utils/dates';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

const weekStartsOn = weekdays.Sunday;

@tagName('')
@templateLayout(layout)
export default class PolarisDatePicker extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * The selected date or range of dates
   *
   * @type {Date | Object}
   * @default null
   * @public
   */
  selected = null;

  /**
   * The month to show
   *
   * @type {Number}
   * @default null
   * @public
   */
  month = null;

  /**
   * The year to show
   *
   * @type {Number}
   * @default null
   * @public
   */
  year = null;

  /**
   * Disable selecting dates before this date
   *
   * @type {Date}
   * @default null
   * @public
   */
  disableDatesBefore = null;

  /**
   * Disable selecting dates after this
   *
   * @type {Date}
   * @default null
   * @public
   */
  disableDatesAfter = null;

  /**
   * The selection can span multiple months
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  multiMonth = false;

  /**
   * First day of week. Sunday by default
   *
   * @type {String}
   * @default 'Sunday'
   * @public
   */
  weekStartsOn = weekStartsOn;

  /**
   * Allow a range of dates to be selected
   *
   * @type {Boolean}
   * @public
   */
  @computed('selected')
  get allowRange() {
    return this.selected !== null && !(this.selected instanceof Date);
  }

  /**
   * Callback when date is selected
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onChange /* dateRange */() {}

  /**
   * Callback when month is changed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onMonthChange /* month, year */() {}

  hoverDate = null;
  focusDate = null;

  @computed('month', 'year')
  get showNextYear() {
    return getNextDisplayYear(this.month, this.year);
  }

  @computed('month')
  get showNextMonth() {
    return getNextDisplayMonth(this.month);
  }

  @computed('showNextMonth', 'showNextYear')
  get showNextToNextYear() {
    return getNextDisplayYear(this.showNextMonth, this.showNextYear);
  }

  @computed('showNextMonth')
  get showNextToNextMonth() {
    return getNextDisplayMonth(this.showNextMonth);
  }

  @computed('month', 'year')
  get showPreviousYear() {
    return getPreviousDisplayYear(this.month, this.year);
  }

  @computed('month')
  get showPreviousMonth() {
    return getPreviousDisplayMonth(this.month);
  }

  @computed('showPreviousMonth')
  get previousMonthName() {
    return monthsArray[this.showPreviousMonth];
  }

  @computed('multiMonth', 'showNextToNextMonth', 'showNextMonth')
  get nextMonth() {
    let { multiMonth, showNextToNextMonth, showNextMonth } = this;

    return multiMonth
      ? monthsArray[showNextToNextMonth]
      : monthsArray[showNextMonth];
  }

  @computed('multiMonth', 'showNextToNextYear', 'showNextYear')
  get nextYear() {
    return this.multiMonth ? this.showNextToNextYear : this.showNextYear;
  }

  @computed('previousMonthName', 'showPreviousYear')
  get previousMonthLabel() {
    return `Show previous month, ${this.previousMonthName} ${this.showPreviousYear}`;
  }

  @computed('nextMonth', 'nextYear')
  get nextMonthLabel() {
    return `Show next month, ${this.nextMonth} ${this.nextYear}`;
  }

  setFocusDateAndHandleMonthChange(date) {
    this.onMonthChange(date.getMonth(), date.getFullYear());

    this.setProperties({
      hoverDate: date,
      focusDate: date,
    });
  }

  handleFocus(date) {
    this.set('focusDate', date);
  }

  resetFocus() {
    this.set('focusDate', null);
  }

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
  }

  @action
  handleKeyUp({ key }) {
    let { disableDatesBefore, disableDatesAfter, focusDate, selected } = this;
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
  }

  @action
  handleKeyDown(e) {
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
  }

  @action
  handleSelectedUpdate() {
    let { _previousSelected: previousSelected, selected } = this;

    if (
      previousSelected &&
      !this.isSameSelectedDate(previousSelected, selected)
    ) {
      this.resetFocus();
    }
  }

  @action
  handleDateSelection(dateRange) {
    let { end: endDate } = dateRange;

    this.setProperties({
      hoverDate: endDate,
      focusDate: new Date(endDate),
    });

    this.onChange(dateRange);
  }

  @action
  handleMonthChangeClick(month, year) {
    this.onMonthChange(month, year);
    this.set('focusDate', null);
  }
}
