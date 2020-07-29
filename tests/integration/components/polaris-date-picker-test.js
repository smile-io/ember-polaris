import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

module('Integration | Component | polaris date picker', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

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

  const container = '[data-test-date-picker]';
  const header = '[data-test-date-picker-header]';
  const monthContainer = '[data-test-date-picker-month-container]';
  const monthBody = '[data-test-date-picker-month]';
  const monthTitle = '[data-test-date-picker-title]';
  const weekdaysHeader = '[data-test-date-picker-week-heading]';
  const weekday = '[data-test-date-picker-weekday]';
  const week = '[data-test-date-picker-week]';
  const day = '[data-test-date-picker-day]';
  const dayEmpty = '[data-test-date-picker-day-empty]';

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

  const monthWeekSelector = buildNestedSelector(
    monthContainer,
    monthBody,
    week
  );

  const daySelector = buildNestedSelector(week, day);

  const dayEmptySelector = buildNestedSelector(week, dayEmpty);

  const daySelectedSelector = `.${DAY_SELECTED_CLASS}`;

  test('it renders the correct date-picker HTML', async function (assert) {
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

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
      }}
    `);

    assert.dom(container).exists('it renders the date picker component');

    assert.dom(headerSelector).exists('it renders the date picker header');

    assert
      .dom(headerPrevBtnSelector)
      .exists('it renders a `prev` button in the header');

    assert
      .dom(`${headerPrevBtnSelector} svg`)
      .hasAttribute(
        'data-icon-source',
        'polaris/arrow-left',
        'it renders a left arrow icon as the `prev` button'
      );

    assert
      .dom(headerNextBtnSelector)
      .exists('it renders a `next` button in the header');

    assert
      .dom(`${headerNextBtnSelector} svg`)
      .hasAttribute(
        'data-icon-source',
        'polaris/arrow-right',
        'it renders a right arrow icon as the `next` button'
      );

    assert
      .dom(monthTitleSelector)
      .hasText(
        `${MONTH_NAME} ${YEAR}`,
        'it renders a title displaying the current month name and year'
      );

    assert.dom(monthSelector).exists('it renders a single month container');

    assert
      .dom(monthBodySelector)
      .exists({ count: 1 }, 'it renders a single month body');

    assert
      .dom(weekdaySelector)
      .exists(
        { count: DAYS_PER_WEEK },
        'it renders 7 weekday labels in the weekday header'
      );

    assert
      .dom(weekdaySelector)
      .hasText('Su', 'it abbreviates the weekday names in the weekday header');

    assert
      .dom(monthWeekSelector)
      .exists(
        { count: FEB_2018_WEEKS },
        'it renders 5 weeks for February 2018'
      );

    assert
      .dom(daySelector)
      .exists({ count: FEB_2018_DAYS }, 'it renders 28 days for February 2018');

    assert
      .dom(dayEmptySelector)
      .exists(
        { count: FEB_2018_DAYS_EMPTY },
        'it renders 6 empty days for February 2018'
      );

    assert
      .dom(daySelectedSelector)
      .hasText('7', 'it renders February 7th as the selected date');
  });

  test('it calls a passed-in `onChange` action when a new date is chosen', async function (assert) {
    this.setProperties({
      month: MONTH,
      year: YEAR,
      selected: null,
      onChangeActionFired: false,
    });

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
        onChange=(action (mut onChangeActionFired) true)
      }}
    `);

    await click(daySelector);
    assert.ok(
      this.get('onChangeActionFired'),
      'onChange action is called when a day is clicked'
    );
  });

  test('it passes a `selected` range argument to the `onChange` action', async function (assert) {
    assert.expect(2);

    this.setProperties({
      month: MONTH,
      year: YEAR,
      selected: null,
      onChange: (selected) => {
        assert.ok(
          selected.start,
          '`onChange` receives a range with a `start` attribute'
        );
        assert.ok(
          selected.end,
          '`onChange` receives a range with an `end` attribute'
        );
      },
    });

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
        onChange=(action onChange)
      }}
    `);

    await click(daySelector);
  });

  test('it calls a passed-in `onMonthChange` action when next or prev btn clicked', async function (assert) {
    this.setProperties({
      month: MONTH,
      year: YEAR,
      selected: null,
      onMonthChangeActionFired: false,
    });

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
        onMonthChange=(action (mut onMonthChangeActionFired) true)
      }}
    `);

    await click(headerPrevBtnSelector);
    assert.ok(
      this.get('onMonthChangeActionFired'),
      'onMonthChange action is called when `prev` button is clicked'
    );

    this.set('onMonthChangeActionFired', false);

    await click(headerNextBtnSelector);
    assert.ok(
      this.get('onMonthChangeActionFired'),
      'onMonthChange action is called when `next` button is clicked'
    );
  });

  test('it passes `month` and `year` arguments to the `onMonthChange` action', async function (assert) {
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

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
        onMonthChange=(action onMonthChange)
      }}
    `);

    await click(headerNextBtnSelector);
    assert.ok(
      this.get('onMonthChangeActionFired'),
      '`onMonthChange` action sends up correct arguments'
    );
  });

  test('it displays two months at a time when `multiMonth` is true', async function (assert) {
    this.setProperties({
      month: MONTH,
      year: YEAR,
      selected: null,
      multiMonth: true,
    });

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
        multiMonth=multiMonth
      }}
    `);

    assert
      .dom(monthBodySelector)
      .exists({ count: 2 }, 'it renders 2 months when `multiMonth` is true');
  });

  test('it disables certain days when `disableDatesBefore` and `disableDatesAfter` values are passed in', async function (assert) {
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

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
        disableDatesBefore=disableDatesBefore
        disableDatesAfter=disableDatesAfter
      }}
    `);

    assert
      .dom(DISABLE_BEFORE_SELECTOR)
      .hasClass(
        DAY_DISABLED_CLASS,
        'dates before `disableDatesBefore` have a disabled class'
      );

    assert
      .dom(DISABLE_AFTER_SELECTOR)
      .hasClass(
        DAY_DISABLED_CLASS,
        'dates after `disableDatesAfter` have a disabled class'
      );
  });

  test('it does not fire actions when disabled days are clicked', async function (assert) {
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

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
        disableDatesAfter=disableDatesAfter
        onChange=(action onChange)
      }}
    `);

    await click(DISABLE_AFTER_SELECTOR);
    assert.notOk(
      this.get('onChangeActionFired'),
      'clicking disabled day did not fire `onChange` action'
    );
  });

  test('it applies an `inRange` class to days between the selected range', async function (assert) {
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

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
      }}
    `);

    assert
      .dom(IN_RANGE_SELECTOR)
      .hasClass(
        DAY_IN_RANGE_CLASS,
        'days within the provided range contain an `inRange` class'
      );
  });

  test('it applies a `today` class to the day representing the current day', async function (assert) {
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

    await render(hbs`
      {{polaris-date-picker
        month=month
        year=year
        selected=selected
      }}
    `);

    assert
      .dom(TODAY_SELECTOR)
      .hasClass(
        DAY_IS_TODAY_CLASS,
        'the day representing today contains a `today` class'
      );

    assert
      .dom(`.${DAY_IS_TODAY_CLASS}`)
      .exists(
        { count: 1 },
        'only a single day element contains a `today` class'
      );
  });
});
