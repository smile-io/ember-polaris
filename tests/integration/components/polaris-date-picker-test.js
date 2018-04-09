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

const dpContainer      = '.Polaris-DatePicker';
const dpHeader         = '.Polaris-DatePicker__Header';
const dpMonthContainer = '.Polaris-DatePicker__MonthContainer';
const dpMonthBody      = '.Polaris-DatePicker__Month';
const dpMonthTitle     = '.Polaris-DatePicker__Title';
const dpWeekdays       = '.Polaris-DatePicker__WeekHeadings';
const dpWeek           = '.Polaris-DatePicker__Week';
const dpDay            = '.Polaris-DatePicker__Day';
const dpDayEmpty       = '.Polaris-DatePicker__EmptyDay';

const dpHeaderSelector = buildNestedSelector(
  dpContainer,
  dpHeader
);

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

const dpMonthWeekdaysSelector = buildNestedSelector(
  dpMonthContainer,
  dpMonthBody,
  dpWeekdays
);

const dpMonthWeekSelector = buildNestedSelector(
  dpMonthContainer,
  dpMonthBody,
  dpWeek
);

const dpDayPerWeekSelector = buildNestedSelector(
  dpWeek,
  dpDay
);

const dpDayEmptyPerWeekSelector = buildNestedSelector(
  dpWeek,
  dpDayEmpty
);

const DAY_SELECTED = 'Polaris-DatePicker__Day--selected';
const DAY_DISABLED = 'Polaris-DatePicker__Day--disabled';
const DAY_IN_RANGE = 'Polaris-DatePicker__Day--inRange';
const DAY_IS_TODAY = 'Polaris-DatePicker__Day--today';

const DAYS_PER_WEEK = 7;

test('it renders the correct HTML', function(assert) {

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
