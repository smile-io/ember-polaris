import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent('polaris-date-picker', 'Integration | Component | polaris date picker', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent);
  }
});

const DAY_SELECTED = 'Polaris-DatePicker__Day--selected';
const DAY_DISABLED = 'Polaris-DatePicker__Day--disabled';
const DAY_IN_RANGE = 'Polaris-DatePicker__Day--inRange';
const DAY_IS_TODAY = 'Polaris-DatePicker__Day--today';

const DAYS_PER_WEEK = 7;

const MONTH = 1;
const YEAR = 2018;
const MONTH_NAME = 'February';
const START_DATE = 'Wed Feb 07 2018 00:00:00 GMT-0500 (EST)';
const END_DATE = 'Wed Feb 07 2018 00:00:00 GMT-0500 (EST)';

const dpContainer      = '.Polaris-DatePicker';
const dpHeader         = '.Polaris-DatePicker__Header';
const dpMonthContainer = '.Polaris-DatePicker__MonthContainer';
const dpMonthBody      = '.Polaris-DatePicker__Month';
const dpMonthTitle     = '.Polaris-DatePicker__Title';
const dpWeekdaysHeader = '.Polaris-DatePicker__WeekHeadings';
const dpWeekday        = '.Polaris-DatePicker__Weekday';
const dpWeek           = '.Polaris-DatePicker__Week';
const dpDay            = '.Polaris-DatePicker__Day';
const dpDayEmpty       = '.Polaris-DatePicker__EmptyDay';

const dpHeaderSelector = buildNestedSelector(
  dpContainer,
  dpHeader
);

const dpHeaderPrevBtnSelector = `${ dpHeader } button:first-of-type`;

const dpHeaderNextBtnSelector = `${ dpHeader } button:last-of-type`;

const dpMonthSelector = buildNestedSelector(
  dpContainer,
  dpMonthContainer
);

const dpMonthBodySelector = buildNestedSelector(
  dpMonthContainer,
  dpMonthBody
);

const dpMonthTitleSelector = buildNestedSelector(
  dpMonthContainer,
  dpMonthBody,
  dpMonthTitle
);

const dpWeekdaySelector = buildNestedSelector(
  dpMonthContainer,
  dpMonthBody,
  dpWeekdaysHeader,
  dpWeekday
);

const dpMonthWeekSelector = buildNestedSelector(
  dpMonthContainer,
  dpMonthBody,
  dpWeek
);

const dpDaySelector = buildNestedSelector(
  dpWeek,
  dpDay
);

const dpDayEmptySelector = buildNestedSelector(
  dpWeek,
  dpDayEmpty
);

const dpDaySelectedSelector = `.${ DAY_SELECTED }`;

test('it renders the correct date-picker HTML', function(assert) {
  /**
   * Assertions made in this test are based
   * off a set month of February 2018, with
   * February 7th set as the selected date.
   */
  const FEB_2018_WEEKS = 5;
  const FEB_2018_DAYS = 28;
  const FEB_2018_DAYS_EMPTY = 7;

  let selected = {
    start: new Date(START_DATE),
    end: new Date(END_DATE)
  };

  this.setProperties({ month: MONTH, year: YEAR, selected });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
    }}
  `);

  let dpContainerEl = find(dpContainer);
  assert.ok(dpContainerEl, 'it renders the date picker component');

  let dpHeaderEl = find(dpHeaderSelector);
  assert.ok(dpHeaderEl, 'it renders the date picker header');

  let dpHeaderPrevBtnEl = find(dpHeaderPrevBtnSelector);
  let iconPrev = find('svg', dpHeaderPrevBtnEl);
  assert.ok(dpHeaderPrevBtnSelector, 'it renders a `prev` button in the header');
  assert.equal(iconPrev.dataset.iconSource, 'polaris/arrowLeft', 'it renders a left arrow icon as the `prev` button');

  let dpHeaderNextBtnEl = find(dpHeaderNextBtnSelector);
  let iconNext = find('svg', dpHeaderNextBtnEl);
  assert.ok(dpHeaderNextBtnSelector, 'it renders a `next` button in the header');
  assert.equal(iconNext.dataset.iconSource, 'polaris/arrowRight', 'it renders a right arrow icon as the `next` button');

  let dpMonthEls = findAll(dpMonthSelector);
  assert.equal(dpMonthEls.length, 1, 'it renders a single month container');

  let dpMonthBodyEl = find(dpMonthBodySelector);
  assert.ok(dpMonthBodyEl, 'it renders the month body');

  let dpWeekdayEls = findAll(dpWeekdaySelector);
  let [ sunday ] = dpWeekdayEls;
  assert.equal(dpWeekdayEls.length, DAYS_PER_WEEK, 'it renders 7 weekday labels in the weekday header');
  assert.equal(sunday.textContent.trim(), 'Su', 'it abbreviates the weekday names in the weekday header');

  let dpWeekEls = findAll(dpMonthWeekSelector);
  assert.equal(dpWeekEls.length, FEB_2018_WEEKS, 'it renders 5 weeks for February 2018');

  let dpDayEls = findAll(dpDaySelector);
  assert.equal(dpDayEls.length, FEB_2018_DAYS, 'it renders 28 days for February 2018');

  let dpDayEmptyEls = findAll(dpDayEmptySelector);
  assert.equal(dpDayEmptyEls.length, FEB_2018_DAYS_EMPTY, 'it renders 6 empty days for February 2018');

  let selectedDay = find(dpDaySelectedSelector);
  assert.equal(selectedDay.textContent.trim(), '7', 'it renders February 7th as the selected date');
});

test('it calls a passed-in `onChange` action when a new date is chosen', function(assert) {

});

test('it calls a passed-in `onMonthChange` action when next or prev btn clicked', function(assert) {

});

test('it sets a selected range with `start` and `end` attrs when clicking dates', function(assert) {

});

test('it resets the range when clicking a day before the selected date(s)', function(assert) {

});

test('it resets the range when clicking a day when a range is currently selected', function(assert) {

});

test('it can change months using prev and next buttons', function(assert) {

});

test('it displays two months at a time when `multiMonth` is true', function(assert) {

});

test('it disables certain days when `disableDatesBefore` and `disableDatesAfter` values are passed in', function(assert) {

});
