import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-date-picker/day';
import {
  monthsArray,
  isSameDay,
  dateIsInRange,
  dateIsSelected,
  isDateBefore,
  isDateAfter,
} from '../../utils/dates';

@tagName('')
@templateLayout(layout)
export default class PolarisDatePickerDay extends Component {
  /**
   * @type {Date}
   * @default null
   * @public
   */
  focusedDate = null;

  /**
   * @type {Date}
   * @default null
   * @public
   */
  day = null;

  /**
   * @type {Object}
   * @default null
   * @public
   */
  selectedDates = null;

  /**
   * @type {Date}
   * @default null
   * @public
   */
  disableDatesBefore = null;

  /**
   * @type {Date}
   * @default null
   * @public
   */
  disableDatesAfter = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  allowRange = false;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onClick /* day */() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onHover /* day */() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus /* day */() {}

  @computed('selected', 'disabled', 'isDateToday', 'inHoveringRange', 'inRange')
  get dayButtonClasses() {
    let cssClasses = ['Polaris-DatePicker__Day'];
    let { selected, disabled, isDateToday, inHoveringRange, inRange } = this;

    if (selected) {
      cssClasses.push('Polaris-DatePicker__Day--selected');
    }

    if (disabled) {
      cssClasses.push('Polaris-DatePicker__Day--disabled');
    }

    if (isDateToday) {
      cssClasses.push('Polaris-DatePicker__Day--today');
    }

    if (inHoveringRange || inRange) {
      cssClasses.push('Polaris-DatePicker__Day--inRange');
    }

    return cssClasses.join(' ');
  }

  @computed('day')
  get date() {
    return this.day.getDate();
  }

  @computed('day')
  get isDateToday() {
    return isSameDay(new Date(), this.day);
  }

  @computed('focusedDate', 'day')
  get focused() {
    let { focusedDate, day } = this;
    return focusedDate != null && isSameDay(day, focusedDate);
  }

  @computed('selectedDates', 'day')
  get selected() {
    let { selectedDates, day } = this;
    return selectedDates != null && dateIsSelected(day, selectedDates);
  }

  @computed('selectedDates', 'day')
  get inRange() {
    let { selectedDates, day } = this;
    return selectedDates != null && dateIsInRange(day, selectedDates);
  }

  @computed('day', 'disableDatesBefore', 'disableDatesAfter')
  get disabled() {
    let { day, disableDatesBefore, disableDatesAfter } = this;

    return (
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter))
    );
  }

  @computed('day', 'isDateToday', 'date')
  get ariaLabel() {
    let { isDateToday, day, date } = this;
    let month = monthsArray[day.getMonth()];
    let year = day.getFullYear();

    return `${isDateToday ? 'Today ' : ''}${month} ${date} ${year}`;
  }

  @computed('focused', 'selected', 'disabled', 'date', 'isDateToday')
  get tabIndex() {
    let { focused, selected, disabled, date, isDateToday } = this;

    return (focused || selected || isDateToday || date === 1) && !disabled
      ? 0
      : -1;
  }

  @computed('day', 'selectedDates', 'hoverDate', 'allowRange')
  get inHoveringRange() {
    let { day, allowRange } = this;

    if (!allowRange || day === null) {
      return false;
    }

    let { selectedDates = {}, hoverDate } = this;
    const { start, end } = selectedDates;

    return isSameDay(start, end) && day > start && day <= hoverDate;
  }

  @computed('day')
  get dataTestDatePickerDate() {
    return this.day.toISOString();
  }
}
