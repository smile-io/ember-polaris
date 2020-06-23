import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/day';
import {
  monthsArray,
  isSameDay,
  dateIsInRange,
  dateIsSelected,
  isDateBefore,
  isDateAfter,
} from '../../utils/dates';

@classic
@tagName('')
@templateLayout(layout)
export default class PolarisDatePickerDay extends Component {
  /**
   * @property focusedDate
   * @public
   * @type {Date}
   * @default null
   */
  focusedDate = null;

  /**
   * @property day
   * @public
   * @type {Date}
   * @default null
   */
  day = null;

  /**
   * @property selectedDates
   * @public
   * @type {Object}
   * @default null
   */
  selectedDates = null;

  /**
   * @property disableDatesBefore
   * @public
   * @type {Date}
   * @default null
   */
  disableDatesBefore = null;

  /**
   * @property disableDatesAfter
   * @public
   * @type {Date}
   * @default null
   */
  disableDatesAfter = null;

  /**
   * @property allowRange
   * @public
   * @type {Boolean}
   * @default false
   */
  allowRange = false;

  /**
   * @property onClick
   * @public
   * @type {Function}
   * @default noop
   */
  onClick /* day */() {}

  /**
   * @property onHover
   * @public
   * @type {Function}
   * @default noop
   */
  onHover /* day */() {}

  /**
   * @property onFocus
   * @public
   * @type {Function}
   * @default noop
   */
  onFocus /* day */() {}

  @(computed(
    'selected',
    'disabled',
    'isDateToday',
    'inHoveringRange',
    'inRange'
  ).readOnly())
  get dayButtonClasses() {
    let classNames = ['Polaris-DatePicker__Day'];
    let {
      selected,
      disabled,
      isDateToday,
      inHoveringRange,
      inRange,
    } = this.getProperties(
      'selected',
      'disabled',
      'isDateToday',
      'inHoveringRange',
      'inRange'
    );

    if (selected) {
      classNames.push('Polaris-DatePicker__Day--selected');
    }

    if (disabled) {
      classNames.push('Polaris-DatePicker__Day--disabled');
    }

    if (isDateToday) {
      classNames.push('Polaris-DatePicker__Day--today');
    }

    if (inHoveringRange || inRange) {
      classNames.push('Polaris-DatePicker__Day--inRange');
    }

    return classNames.join(' ');
  }

  @(computed('day').readOnly())
  get date() {
    let day = this.get('day');
    return day.getDate();
  }

  @(computed('day').readOnly())
  get isDateToday() {
    let day = this.get('day');
    return isSameDay(new Date(), day);
  }

  @(computed('focusedDate', 'day').readOnly())
  get focused() {
    let { focusedDate, day } = this.getProperties('focusedDate', 'day');

    return focusedDate != null && isSameDay(day, focusedDate);
  }

  @(computed('selectedDates', 'day').readOnly())
  get selected() {
    let { selectedDates, day } = this.getProperties('selectedDates', 'day');

    return selectedDates != null && dateIsSelected(day, selectedDates);
  }

  @(computed('selectedDates', 'day').readOnly())
  get inRange() {
    let selectedDates = this.get('selectedDates');
    let day = this.get('day');
    return selectedDates != null && dateIsInRange(day, selectedDates);
  }

  @(computed('day', 'disableDatesBefore', 'disableDatesAfter').readOnly())
  get disabled() {
    let { day, disableDatesBefore, disableDatesAfter } = this.getProperties(
      'day',
      'disableDatesBefore',
      'disableDatesAfter'
    );

    return (
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter))
    );
  }

  @(computed('day', 'isDateToday', 'date').readOnly())
  get ariaLabel() {
    let isDateToday = this.get('isDateToday');
    let day = this.get('day');
    let month = monthsArray[day.getMonth()];
    let date = this.get('date');
    let year = day.getFullYear();

    return `${isDateToday ? 'Today ' : ''}${month} ${date} ${year}`;
  }

  @(computed(
    'focused',
    'selected',
    'disabled',
    'date',
    'isDateToday'
  ).readOnly())
  get tabIndex() {
    let { focused, selected, disabled, date, isDateToday } = this.getProperties(
      'focused',
      'selected',
      'disabled',
      'date',
      'isDateToday'
    );

    return (focused || selected || isDateToday || date === 1) && !disabled
      ? 0
      : -1;
  }

  @(computed('day', 'selectedDates', 'hoverDate', 'allowRange').readOnly())
  get inHoveringRange() {
    let { day, allowRange } = this.getProperties('day', 'allowRange');

    if (!allowRange || day === null) {
      return false;
    }

    let { selectedDates = {}, hoverDate } = this.getProperties(
      'selectedDates',
      'hoverDate'
    );

    const { start, end } = selectedDates;

    return isSameDay(start, end) && day > start && day <= hoverDate;
  }

  @(computed('day').readOnly())
  get dataTestDatePickerDate() {
    return this.get('day').toISOString();
  }
}
