import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../../templates/components/polaris-resource-list/filter-control/date-selector';

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
});
