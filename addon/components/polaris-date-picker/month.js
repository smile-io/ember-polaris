import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-date-picker/month';
import {
  monthsArray,
  getWeeksForMonth,
  getNewRange,
  abbreviationForWeekday,
  getWeekdaysOrdered,
} from '../../utils/dates';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisDatePickerMonth extends Component {
  /**
   * @type {Date}
   * @default null
   * @public
   */
  focusedDate = null;

  /**
   * @type {Object}
   * @default null
   * @public
   */
  selected = null;

  /**
   * @type {Date}
   * @default null
   * @public
   */
  hoverDate = null;

  /**
   * @type {Number}
   * @default null
   * @public
   */
  month = null;

  /**
   * @type {Number}
   * @default null
   * @public
   */
  year = null;

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
   * @type {String}
   * @default null
   * @public
   */
  weekStartsOn = null;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onChange /* dateRange */() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onHover /* hoverEnd */() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus /* date */() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  monthName /* month */() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  weekdayName /* weekday */() {}

  @computed('month', 'year')
  get current() {
    let now = new Date();
    let thisMonth = now.getMonth();
    let thisYear = now.getFullYear();

    return thisMonth === this.month && thisYear === this.year;
  }

  @computed('month')
  get monthDisplayName() {
    return monthsArray[this.month];
  }

  @computed('month', 'year', 'weekStartsOn')
  get weeks() {
    let { month, year, weekStartsOn } = this;
    return getWeeksForMonth(month, year, weekStartsOn);
  }

  @computed('current', 'weekStartsOn')
  get weekdays() {
    let { current, weekStartsOn } = this;
    let day = new Date().getDay();

    return getWeekdaysOrdered(weekStartsOn).map((weekday, i) => {
      return {
        title: abbreviationForWeekday(weekday),
        current: current && day === i,
        label: weekday,
      };
    });
  }

  @action
  handleDateClick(day) {
    let range = getNewRange(this.selected, day);
    this.onChange(range);
  }
}
