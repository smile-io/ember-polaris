import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent(
  'polaris-date-picker',
  'Integration | Component | polaris date picker',
  {
    integration: true,

    beforeEach() {
      this.register('component:svg-jar', MockSvgJarComponent);
    },
  }
);

const DAY_SELECTED_CLASS = 'Polaris-DatePicker__Day--selected';
const DAY_DISABLED_CLASS = 'Polaris-DatePicker__Day--disabled';
const DAY_IN_RANGE_CLASS = 'Polaris-DatePicker__Day--inRange';
const DAY_IS_TODAY_CLASS = 'Polaris-DatePicker__Day--today';

const DAYS_PER_WEEK = 7;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH = 1;
const YEAR = 2018;
const MONTH_NAME = 'February';
const START_DATE = 'Wed Feb 07 2018 00:00:00 GMT-0500 (EST)';
const END_DATE = 'Wed Feb 07 2018 00:00:00 GMT-0500 (EST)';

const container = '.Polaris-DatePicker';
const header = '.Polaris-DatePicker__Header';
const monthContainer = '.Polaris-DatePicker__MonthContainer';
const monthBody = '.Polaris-DatePicker__Month';
const monthTitle = '.Polaris-DatePicker__Title';
const weekdaysHeader = '.Polaris-DatePicker__WeekHeadings';
const weekday = '.Polaris-DatePicker__Weekday';
const week = '.Polaris-DatePicker__Week';
const day = '.Polaris-DatePicker__Day';
const dayEmpty = '.Polaris-DatePicker__EmptyDay';

const headerSelector = buildNestedSelector(container, header);

const headerPrevBtnSelector = `${header} button:first-of-type`;

const headerNextBtnSelector = `${header} button:last-of-type`;

const monthSelector = buildNestedSelector(container, monthContainer);

const monthBodySelector = buildNestedSelector(monthContainer, monthBody);

const monthTitleSelector = buildNestedSelector(
  monthContainer,
  monthBody,
  monthTitle
);

const weekdaySelector = buildNestedSelector(
  monthContainer,
  monthBody,
  weekdaysHeader,
  weekday
);

const monthWeekSelector = buildNestedSelector(monthContainer, monthBody, week);

const daySelector = buildNestedSelector(week, day);

const dayEmptySelector = buildNestedSelector(week, dayEmpty);

const daySelectedSelector = `.${DAY_SELECTED_CLASS}`;

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
    end: new Date(END_DATE),
  };

  this.setProperties({ month: MONTH, year: YEAR, selected });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
    }}
  `);

  let containerEl = find(container);
  assert.ok(containerEl, 'it renders the date picker component');

  let headerEl = find(headerSelector);
  assert.ok(headerEl, 'it renders the date picker header');

  let headerPrevBtnEl = find(headerPrevBtnSelector);
  let iconPrev = find('svg', headerPrevBtnEl);
  assert.ok(headerPrevBtnSelector, 'it renders a `prev` button in the header');
  assert.equal(
    iconPrev.dataset.iconSource,
    'polaris/arrow-left',
    'it renders a left arrow icon as the `prev` button'
  );

  let headerNextBtnEl = find(headerNextBtnSelector);
  let iconNext = find('svg', headerNextBtnEl);
  assert.ok(headerNextBtnSelector, 'it renders a `next` button in the header');
  assert.equal(
    iconNext.dataset.iconSource,
    'polaris/arrow-right',
    'it renders a right arrow icon as the `next` button'
  );

  let monthTitleEl = find(monthTitleSelector);
  let expectedTitle = `${MONTH_NAME} ${YEAR}`;
  assert.equal(
    monthTitleEl.textContent.trim(),
    expectedTitle,
    'it renders a title displaying the current month name and year'
  );

  let monthsEl = findAll(monthSelector);
  assert.ok(monthsEl, 'it renders a single month container');

  let monthBodyEls = findAll(monthBodySelector);
  assert.equal(monthBodyEls.length, 1, 'it renders a single month body');

  let weekdayEls = findAll(weekdaySelector);
  let [sunday] = weekdayEls;
  assert.equal(
    weekdayEls.length,
    DAYS_PER_WEEK,
    'it renders 7 weekday labels in the weekday header'
  );
  assert.equal(
    sunday.textContent.trim(),
    'Su',
    'it abbreviates the weekday names in the weekday header'
  );

  let weekEls = findAll(monthWeekSelector);
  assert.equal(
    weekEls.length,
    FEB_2018_WEEKS,
    'it renders 5 weeks for February 2018'
  );

  let dayEls = findAll(daySelector);
  assert.equal(
    dayEls.length,
    FEB_2018_DAYS,
    'it renders 28 days for February 2018'
  );

  let dayEmptyEls = findAll(dayEmptySelector);
  assert.equal(
    dayEmptyEls.length,
    FEB_2018_DAYS_EMPTY,
    'it renders 6 empty days for February 2018'
  );

  let selectedDay = find(daySelectedSelector);
  assert.equal(
    selectedDay.textContent.trim(),
    '7',
    'it renders February 7th as the selected date'
  );
});

test('it calls a passed-in `onChange` action when a new date is chosen', function(assert) {
  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: null,
    onChangeActionFired: false,
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
      onChange=(action (mut onChangeActionFired) true)
    }}
  `);

  click(daySelector);
  assert.ok(
    this.get('onChangeActionFired'),
    'onChange action is called when a day is clicked'
  );
});

test('it passes a `selected` range argument to the `onChange` action', function(assert) {
  assert.expect(3);

  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: null,
    onChangeActionFired: false,
    onChange: (selected) => {
      assert.ok(
        selected.start,
        '`onChange` receives a range with a `start` attribute'
      );
      assert.ok(
        selected.end,
        '`onChange` receives a range with an `end` attribute'
      );
      this.set('onChangeActionFired', true);
    },
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
      onChange=(action onChange)
    }}
  `);

  click(daySelector);
  assert.ok(
    this.get('onChangeActionFired'),
    '`onChange` action sends up correct arguments'
  );
});

test('it calls a passed-in `onMonthChange` action when next or prev btn clicked', function(assert) {
  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: null,
    onMonthChangeActionFired: false,
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
      onMonthChange=(action (mut onMonthChangeActionFired) true)
    }}
  `);

  click(headerPrevBtnSelector);
  assert.ok(
    this.get('onMonthChangeActionFired'),
    'onMonthChange action is called when `prev` button is clicked'
  );

  this.set('onMonthChangeActionFired', false);

  click(headerNextBtnSelector);
  assert.ok(
    this.get('onMonthChangeActionFired'),
    'onMonthChange action is called when `next` button is clicked'
  );
});

test('it passes `month` and `year` arguments to the `onMonthChange` action', function(assert) {
  assert.expect(3);

  let expectedMonth = MONTH + 1;
  let expectedYear = YEAR;

  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: null,
    onMonthChangeActionFired: false,
    onMonthChange: (month, year) => {
      assert.equal(
        month,
        expectedMonth,
        '`onMonthChange` receives the correct `month` argument'
      );
      assert.equal(
        year,
        expectedYear,
        '`onMonthChange` receives the correct `year` argument'
      );
      this.set('onMonthChangeActionFired', true);
    },
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
      onMonthChange=(action onMonthChange)
    }}
  `);

  click(headerNextBtnSelector);
  assert.ok(
    this.get('onMonthChangeActionFired'),
    '`onMonthChange` action sends up correct arguments'
  );
});

test('it displays two months at a time when `multiMonth` is true', function(assert) {
  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: null,
    multiMonth: true,
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
      multiMonth=multiMonth
    }}
  `);

  let monthBodyEls = findAll(monthBodySelector);
  assert.equal(
    monthBodyEls.length,
    2,
    'it renders 2 months when `multiMonth` is true'
  );
});

test('it disables certain days when `disableDatesBefore` and `disableDatesAfter` values are passed in', function(assert) {
  const DISABLE_BEFORE = new Date('Mon Feb 05 2018 00:00:00 GMT-0500 (EST)');
  const DISABLE_AFTER = new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)');
  const DISABLE_BEFORE_SELECTOR = '[aria-label="February 4 2018"]';
  const DISABLE_AFTER_SELECTOR = '[aria-label="February 13 2018"]';

  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: null,
    disableDatesBefore: DISABLE_BEFORE,
    disableDatesAfter: DISABLE_AFTER,
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
      disableDatesBefore=disableDatesBefore
      disableDatesAfter=disableDatesAfter
    }}
  `);

  let disabledBeforeDateEl = find(DISABLE_BEFORE_SELECTOR);
  assert.ok(
    disabledBeforeDateEl.classList.contains(DAY_DISABLED_CLASS),
    'dates before `disableDatesBefore` have a disabled class'
  );

  let disabledAfterDateEl = find(DISABLE_AFTER_SELECTOR);
  assert.ok(
    disabledAfterDateEl.classList.contains(DAY_DISABLED_CLASS),
    'dates after `disableDatesAfter` have a disabled class'
  );
});

test('it does not fire actions when disabled days are clicked', function(assert) {
  const DISABLE_AFTER = new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)');
  const DISABLE_AFTER_SELECTOR = '[aria-label="February 13 2018"]';

  this.set('onChangeActionFired', false);

  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: null,
    disableDatesAfter: DISABLE_AFTER,
    onChange: () => {
      this.set('onChangeActionFired', true);
    },
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
      disableDatesAfter=disableDatesAfter
      onChange=(action onChange)
    }}
  `);

  click(DISABLE_AFTER_SELECTOR);
  assert.notOk(
    this.get('onChangeActionFired'),
    'clicking disabled day did not fire `onChange` action'
  );
});

test('it applies an `inRange` class to days between the selected range', function(assert) {
  const RANGE_START = new Date('Mon Feb 05 2018 00:00:00 GMT-0500 (EST)');
  const RANGE_END = new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)');
  const IN_RANGE_SELECTOR = '[aria-label="February 7 2018"]';

  this.setProperties({
    month: MONTH,
    year: YEAR,
    selected: {
      start: RANGE_START,
      end: RANGE_END,
    },
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
    }}
  `);

  let inRangeDayEl = find(IN_RANGE_SELECTOR);
  assert.ok(
    inRangeDayEl.classList.contains(DAY_IN_RANGE_CLASS),
    'days within the provided range contain an `inRange` class'
  );
});

test('it applies a `today` class to the day representing the current day', function(assert) {
  const TODAY = new Date();
  const TODAY_MONTH = TODAY.getMonth();
  const TODAY_DATE = TODAY.getDate();
  const TODAY_YEAR = TODAY.getFullYear();
  const TODAY_LABEL = `${MONTHS[TODAY_MONTH]} ${TODAY_DATE} ${TODAY_YEAR}`; // ex: 'February 9 2018'
  const TODAY_SELECTOR = `[aria-label="Today ${TODAY_LABEL}"]`;

  this.setProperties({
    month: TODAY_MONTH,
    year: TODAY_YEAR,
    selected: null,
  });

  this.render(hbs`
    {{polaris-date-picker
      month=month
      year=year
      selected=selected
    }}
  `);

  let todayEl = find(TODAY_SELECTOR);
  assert.ok(
    todayEl.classList.contains(DAY_IS_TODAY_CLASS),
    'the day representing today contains a `today` class'
  );

  let todayEls = findAll(`.${DAY_IS_TODAY_CLASS}`);
  assert.ok(
    todayEls.length,
    1,
    'only a single day element contains a `today` class'
  );
});
