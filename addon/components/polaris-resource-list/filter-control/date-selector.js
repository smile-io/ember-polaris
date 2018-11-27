import Component from '@ember/component';
import { computed } from '@ember/object';
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

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Can be 'past', 'future' or 'full'.
   *
   * @property dateOptionType
   * @type {String}
   * @default 'full'
   * @public
   */
  dateOptionType: 'full',

  /**
   * @property filterValue
   * @type {String}
   * @default null
   * @public
   */
  filterValue: null,

  /**
   * @property filterKey
   * @type {String}
   * @default null
   * @public
   */
  filterKey: null,

  /**
   * @property filterMinKey
   * @type {String}
   * @default null
   * @public
   */
  filterMinKey: null,

  /**
   * @property filterMaxKey
   * @type {String}
   * @default null
   * @public
   */
  filterMaxKey: null,

  /**
   * @property onFilterValueChange
   * @type {Function}
   * @default noop
   * @public
   */
  onFilterValueChange() {},

  /**
   * @property onFilterKeyChange
   * @type {Function}
   * @default noop
   * @public
   */
  onFilterKeyChange() {},

  /**
   * @property selectedDate
   * @type {Date}
   * @default null
   * @private
   */
  selectedDate: null,

  /**
   * @property userInputDate
   * @type {String}
   * @default null
   * @private
   */
  userInputDate: null,

  /**
   * @property userInputDateError
   * @type {String}
   * @default null
   * @private
   */
  userInputDateError: null,

  /**
   * Month enum value, either string day of month or integer index (0 = Sunday).
   *
   * @property datePickerMonth
   * @type {String|Number}
   * @private
   */
  datePickerMonth: null,

  /**
   * @property datePickerYear
   * @type {Number}
   * @private
   */
  datePickerYear: null,

  /**
   * Will be set on initialisation.
   *
   * @property initialConsumerFilterKey
   * @type {String}
   * @default null
   * @private
   */
  initialConsumerFilterKey: null,

  /**
   * Current date.
   * Marked as volatile to match unmemoized React implementation.
   *
   * @property now
   * @type {Date}
   * @private
   */
  now: computed(function() {
    return new Date();
  }).volatile(),

  init() {
    this._super(...arguments);

    this.setProperties({
      datePickerMonth: this.get('now').getMonth(),
      datePickerYear: this.get('now').getYear(),
      initialConsumerFilterKey: this.get('filterKey'),
    });
  },

  handleDateFilterOptionsChange(newOption) {
    let {
      onFilterValueChange,
      onFilterKeyChange,
      filterMinKey,
      filterMaxKey,
      initialConsumerFilterKey,
      selectedDate,
    } = this.getProperties(
      'onFilterValueChange',
      'onFilterKeyChange',
      'filterMinKey',
      'filterMaxKey',
      'initialConsumerFilterKey',
      'selectedDate'
    );

    if (!initialConsumerFilterKey) {
      return;
    }

    if (newOption === DateFilterOption.OnOrBefore) {
      onFilterKeyChange(filterMaxKey);
      onFilterValueChange(
        selectedDate ? formatDateValue(selectedDate) : undefined,
      );
      return;
    }

    if (newOption === DateFilterOption.OnOrAfter) {
      onFilterKeyChange(filterMinKey);
      onFilterValueChange(
        selectedDate ? formatDateValue(selectedDate) : undefined,
      );
      return;
    }

    onFilterKeyChange(initialConsumerFilterKey);
    onFilterValueChange(newOption);
  },

  handleDateFieldChange(value) {
    let {
      onFilterValueChange,
      userInputDateError,
    } = this.getProperties('onFilterValueChange', 'userInputDateError');

    if (value.length === 0) {
      this.set('selectedDate', undefined);
      onFilterValueChange(undefined);
    }

    if (userInputDateError && isValidDate(value)) {
      this.set('userInputDateError', undefined);
    }

    this.set('userInputDate', value);
  },

  handleDateBlur() {
    let {
      onFilterValueChange,
      dateTextFieldValue,
    } = this.getProperties('onFilterValueChange', 'dateTextFieldValue');

    if (!dateTextFieldValue || !isValidDate(dateTextFieldValue)) {
      this.setProperties({
        selectedDate: undefined,
        userInputDateError: 'Match YYYY-MM-DD format',
      });
      onFilterValueChange(undefined);

      return;
    }

    let userInputDate = this.get('userInputDate');
    if (!userInputDate) {
      return;
    }

    let nextDate = new Date(userInputDate.replace(/-/g, '/'));

    this.setProperties({
      selectedDate: nextDate,
      datePickerMonth: nextDate.getMonth(),
      datePickerYear: nextDate.getFullYear(),
      userInputDate: undefined,
      userInputDateError: undefined,
    });
    this.handleDateChanged();
  },

  handleDateChanged() {
    let {
      onFilterValueChange,
      selectedDate,
    } = this.getProperties('onFilterValueChange', 'selectedDate');

    if (!selectedDate) {
      return;
    }

    this.onFilterValueChange(formatDateValue(selectedDate));
  },

  handleDatePickerChange({end: nextDate}) {
    this.setProperties({
      selectedDate: new Date(nextDate),
      userInputDate: undefined,
      userInputDateError: undefined,
    });

    this.handleDateChanged();
  },

  handleDatePickerMonthChange(month, year) {
    this.setProperties({
      datePickerMonth: month,
      datePickerYear: year,
    });
  },
});

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
  filterMaxKey,
) {
  if (filterKey === filterMaxKey) {
    return DateFilterOption.OnOrBefore;
  }

  if (filterKey === filterMinKey) {
    return DateFilterOption.OnOrAfter;
  }

  return filterValue;
}

function formatDateValue(date) {
  return date.toISOString().slice(0, 10);
}
