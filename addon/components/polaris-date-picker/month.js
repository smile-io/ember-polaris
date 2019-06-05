import { attribute, classNames, layout as templateLayout } from "@ember-decorators/component";
import { action, computed } from "@ember/object";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/month';
import {
  monthsArray,
  getWeeksForMonth,
  getNewRange,
  abbreviationForWeekday,
  getWeekdaysOrdered,
} from '../../utils/dates';

@classNames('Polaris-DatePicker__Month')
@templateLayout(layout)
export default class Month extends Component {
 /**
  * @property focusedDate
  * @public
  * @type {Date}
  * @default null
  */
 focusedDate = null;

 /**
  * @property selected
  * @public
  * @type {Object}
  * @default null
  */
 selected = null;

 /**
  * @property hoverDate
  * @public
  * @type {Date}
  * @default null
  */
 hoverDate = null;

 /**
  * @property month
  * @public
  * @type {Number}
  * @default null
  */
 month = null;

 /**
  * @property year
  * @public
  * @type {Number}
  * @default null
  */
 year = null;

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
  * @property weekStartsOn
  * @public
  * @type {String}
  * @default null
  */
 weekStartsOn = null;

 /**
  * @property onChange
  * @public
  * @type {Function}
  * @default noop
  */
 onChange/* dateRange */() {}

 /**
  * @property onHover
  * @public
  * @type {Function}
  * @default noop
  */
 onHover/* hoverEnd */() {}

 /**
  * @property onFocus
  * @public
  * @type {Function}
  * @default noop
  */
 onFocus/* date */() {}

 /**
  * @property monthName
  * @public
  * @type {Function}
  * @default noop
  */
 monthName/* month */() {}

 /**
  * @property weekdayName
  * @public
  * @type {Function}
  * @default noop
  */
 weekdayName/* weekday */() {}

 @attribute
 role = 'grid';

 'data-test-date-picker-month' = true;

 @(computed('month', 'year').readOnly())
 get current() {
   let now = new Date();
   let thisMonth = now.getMonth();
   let thisYear = now.getFullYear();

   return thisMonth === this.get('month') && thisYear === this.get('year');
 }

 @(computed('month').readOnly())
 get monthDisplayName() {
   return monthsArray[this.get('month')];
 }

 @(computed('month', 'year', 'weekStartsOn').readOnly())
 get weeks() {
   let { month, year, weekStartsOn } = this.getProperties(
     'month',
     'year',
     'weekStartsOn'
   );

   return getWeeksForMonth(month, year, weekStartsOn);
 }

 @(computed('current', 'weekStartsOn').readOnly())
 get weekdays() {
   let { current, weekStartsOn } = this.getProperties(
     'current',
     'weekStartsOn'
   );
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
   let range = getNewRange(this.get('selected'), day);

   this.get('onChange')(range);
 }
}
