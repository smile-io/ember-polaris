import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../../templates/components/polaris-resource-list/filter-control/date-selector';

const VALID_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;

export const DateFilterOption = {
  PastWeek: 'past_week',
  PastMonth: 'past_month',
  PastQuarter: 'past_quarter',
  PastYear: 'past_year',
  ComingWeek: 'coming_week',
  ComingMonth: 'coming_month',
  ComingQuarter: 'coming_quarter',
  ComingYear: 'coming_year',
  OnOrBefore: 'on_or_before',
  OnOrAfter: 'on_or_after',
};

@tagName('')
@templateLayout(layout)
export default class DateSelector extends Component {
  /**
   * Can be 'past', 'future' or 'full'.
   *
   * @type {String}
   * @default 'full'
   * @public
   */
  dateOptionType = 'full';

  /**
   * @type {String}
   * @default null
   * @public
   */
  filterValue = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  filterKey = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  filterMinKey = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  filterMaxKey = null;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onFilterValueChange() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onFilterKeyChange() {}

  /**
   * @type {Date}
   * @default null
   * @private
   */
  selectedDate = null;

  /**
   * @type {String}
   * @default null
   * @private
   */
  userInputDate = null;

  /**
   * @type {String}
   * @default null
   * @private
   */
  userInputDateError = null;

  /**
   * Month enum value, either string day of month or integer index (0 = Sunday).
   *
   * @type {String|Number}
   * @private
   */
  datePickerMonth = null;

  /**
   * @type {Number}
   * @private
   */
  datePickerYear = null;

  /**
   * Will be set on initialisation.
   *
   * @type {String}
   * @default null
   * @private
   */
  initialConsumerFilterKey = null;

  dateComparatorOptions = [
    {
      value: DateFilterOption.OnOrBefore,
      label: 'on or before',
    },
    {
      value: DateFilterOption.OnOrAfter,
      label: 'on or after',
    },
  ];

  datePastOptions = [
    {
      value: DateFilterOption.PastWeek,
      label: 'in the last week',
    },
    {
      value: DateFilterOption.PastMonth,
      label: 'in the last month',
    },
    {
      value: DateFilterOption.PastQuarter,
      label: 'in the last 3 months',
    },
    {
      value: DateFilterOption.PastYear,
      label: 'in the last year',
    },
  ];

  dateFutureOptions = [
    {
      value: DateFilterOption.ComingWeek,
      label: 'next week',
    },
    {
      value: DateFilterOption.ComingMonth,
      label: 'next month',
    },
    {
      value: DateFilterOption.ComingQuarter,
      label: 'in the next 3 months',
    },
    {
      value: DateFilterOption.ComingYear,
      label: 'in the next year',
    },
  ];

  dateOptionTypes = {
    past: [...this.datePastOptions, ...this.dateComparatorOptions],
    future: [...this.dateFutureOptions, ...this.dateComparatorOptions],
    full: [
      ...this.datePastOptions,
      ...this.dateFutureOptions,
      ...this.dateComparatorOptions,
    ],
  };

  @computed()
  get now() {
    return new Date();
  }

  @(computed('userInputDate', 'selectedDate').readOnly())
  get dateTextFieldValue() {
    const { userInputDate, selectedDate } = this;

    if (!userInputDate && !selectedDate) {
      return undefined;
    }

    if (userInputDate !== undefined) {
      return userInputDate;
    }

    if (selectedDate) {
      return stripTimeFromISOString(formatDateForLocalTimezone(selectedDate));
    }

    return null;
  }

  @(computed(
    'filterValue',
    'filterKey',
    'filterMinKey',
    'filterMaxKey'
  ).readOnly())
  get dateFilterOption() {
    let { filterValue, filterKey, filterMinKey, filterMaxKey } = this;

    return getDateFilterOption(
      filterValue,
      filterKey,
      filterMinKey,
      filterMaxKey
    );
  }

  @(computed('dateFilterOption').readOnly())
  get showDatePredicate() {
    let { dateFilterOption } = this;

    return (
      dateFilterOption === DateFilterOption.OnOrBefore ||
      dateFilterOption === DateFilterOption.OnOrAfter
    );
  }

  @(computed('dateOptionType').readOnly())
  get dateOptions() {
    let dateOptionType = this.dateOptionType || 'full';

    return this.get(`dateOptionTypes.${dateOptionType}`);
  }

  @action
  handleDateFilterOptionsChange(newOption) {
    let {
      onFilterValueChange,
      onFilterKeyChange,
      filterMinKey,
      filterMaxKey,
      initialConsumerFilterKey,
      selectedDate,
    } = this;

    if (!initialConsumerFilterKey) {
      return;
    }

    if (newOption === DateFilterOption.OnOrBefore) {
      onFilterKeyChange(filterMaxKey);
      onFilterValueChange(
        selectedDate
          ? stripTimeFromISOString(formatDateForLocalTimezone(selectedDate))
          : undefined
      );
      return;
    }

    if (newOption === DateFilterOption.OnOrAfter) {
      onFilterKeyChange(filterMinKey);
      onFilterValueChange(
        selectedDate
          ? stripTimeFromISOString(formatDateForLocalTimezone(selectedDate))
          : undefined
      );
      return;
    }

    onFilterKeyChange(initialConsumerFilterKey);
    onFilterValueChange(newOption);
  }

  @action
  handleDateFieldChange(value) {
    let { onFilterValueChange, userInputDateError } = this;

    if (value.length === 0) {
      this.set('selectedDate', undefined);
      onFilterValueChange(undefined);
    }

    if (userInputDateError && isValidDate(value)) {
      this.set('userInputDateError', undefined);
    }

    this.set('userInputDate', value);
  }

  @action
  handleDateBlur() {
    let { onFilterValueChange, dateTextFieldValue } = this;

    if (!dateTextFieldValue || !isValidDate(dateTextFieldValue)) {
      this.setProperties({
        selectedDate: undefined,
        userInputDateError: 'Match YYYY-MM-DD format',
      });
      onFilterValueChange(undefined);

      return;
    }

    let { userInputDate } = this;
    if (!userInputDate) {
      return;
    }

    let formattedDateForTimezone = new Date(
      formatDateForLocalTimezone(new Date(userInputDate))
    );

    this.setProperties({
      selectedDate: formattedDateForTimezone,
      datePickerMonth: formattedDateForTimezone.getMonth(),
      datePickerYear: formattedDateForTimezone.getFullYear(),
      userInputDate: undefined,
      userInputDateError: undefined,
    });
    this.handleDateChanged();
  }

  handleDateChanged() {
    let { onFilterValueChange, selectedDate } = this;

    if (!selectedDate) {
      return;
    }

    onFilterValueChange(
      stripTimeFromISOString(formatDateForLocalTimezone(selectedDate))
    );
  }

  @action
  handleDatePickerChange({ end: nextDate }) {
    this.setProperties({
      selectedDate: new Date(nextDate),
      userInputDate: undefined,
      userInputDateError: undefined,
    });

    this.handleDateChanged();
  }

  @action
  handleDatePickerMonthChange(month, year) {
    this.setProperties({
      datePickerMonth: month,
      datePickerYear: year,
    });
  }

  init() {
    super.init(...arguments);

    this.setProperties({
      datePickerMonth: this.now.getMonth(),
      datePickerYear: this.now.getYear(),
      initialConsumerFilterKey: this.filterKey,
    });
  }
}

function isValidDate(date) {
  if (!date) {
    return false;
  }
  return VALID_DATE_REGEX.test(date) && !isNaN(new Date(date).getTime());
}

function getDateFilterOption(
  filterValue,
  filterKey,
  filterMinKey,
  filterMaxKey
) {
  if (filterKey === filterMaxKey) {
    return DateFilterOption.OnOrBefore;
  }

  if (filterKey === filterMinKey) {
    return DateFilterOption.OnOrAfter;
  }

  return filterValue;
}

function stripTimeFromISOString(ISOString) {
  return ISOString.slice(0, 10);
}

function formatDateForLocalTimezone(date) {
  let timezoneOffset = date.getTimezoneOffset();
  let timezoneOffsetMs = timezoneOffset * 60 * 1000;
  let isFringeTimezone = timezoneOffset === -720 || timezoneOffset === 720;
  let formattedDate = new Date();

  if (isFringeTimezone && date.getHours() !== 0) {
    return date.toISOString();
  }

  let newTime =
    timezoneOffset > -1
      ? date.getTime() + timezoneOffsetMs
      : date.getTime() - timezoneOffsetMs;

  formattedDate.setTime(newTime);
  return formattedDate.toISOString();
}
