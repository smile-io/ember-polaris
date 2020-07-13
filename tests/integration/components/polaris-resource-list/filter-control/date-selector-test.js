import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  findAll,
  triggerEvent,
  click,
  blur,
  waitUntil,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { DateFilterOption } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/date-selector';
import DatePickerComponent from '@smile-io/ember-polaris/components/polaris-date-picker';
import { setUpAttributeCaptureOnComponent } from '../../../../helpers/component-attribute-capture';

const textFieldInputSelector = '.Polaris-TextField input';
const selectedDaySelector = '.Polaris-DatePicker__Day--selected';

const dateOptionType = {
  past: [
    DateFilterOption.PastWeek,
    DateFilterOption.PastMonth,
    DateFilterOption.PastQuarter,
    DateFilterOption.PastYear,
    DateFilterOption.OnOrBefore,
    DateFilterOption.OnOrAfter,
  ],
  future: [
    DateFilterOption.ComingWeek,
    DateFilterOption.ComingMonth,
    DateFilterOption.ComingQuarter,
    DateFilterOption.ComingYear,
    DateFilterOption.OnOrBefore,
    DateFilterOption.OnOrAfter,
  ],
  full: [
    DateFilterOption.PastWeek,
    DateFilterOption.PastMonth,
    DateFilterOption.PastQuarter,
    DateFilterOption.PastYear,
    DateFilterOption.ComingWeek,
    DateFilterOption.ComingMonth,
    DateFilterOption.ComingQuarter,
    DateFilterOption.ComingYear,
    DateFilterOption.OnOrBefore,
    DateFilterOption.OnOrAfter,
  ],
};

function getOptionsValuesList(options) {
  if (!options) {
    return [];
  }

  return options.map((option) => {
    return typeof option === 'string' ? option : option.value;
  });
}

async function triggerChangeEventWithValue(
  selector,
  value,
  eventName = 'change'
) {
  find(selector).value = value;
  await triggerEvent(selector, eventName);
}

function hackDatePickerToFireOnChangeWithValue(value) {
  // Hack the date picker so we can trigger its onChange easily.
  // TODO: find a better way of doing this.
  DatePickerComponent.reopen({
    click() {
      this.get('onChange')(value);
    },
  });
}

module(
  'Integration | Component | polaris-resource-list/filter-control/date-selector',
  function(hooks) {
    let origGetTimezoneOffset;

    hooks.beforeEach(function() {
      origGetTimezoneOffset = Date.prototype.getTimezoneOffset;
      Date.prototype.getTimezoneOffset = () => -540;
    });

    hooks.afterEach(function() {
      Date.prototype.getTimezoneOffset = origGetTimezoneOffset;
    });

    setupRenderingTest(hooks);

    module('dateOptionType', function() {
      test('builds date filters Select options for past option type', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            dateOptionType="past"
          }}
        `);

        const expectOptionValues = dateOptionType.past;

        assert.deepEqual(
          getOptionsValuesList(
            findAll('.Polaris-Select option:not([disabled])')
          ),
          expectOptionValues
        );
      });

      test('builds date filters Select options for future option type', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            dateOptionType="future"
          }}
        `);

        const expectOptionValues = dateOptionType.future;

        assert.deepEqual(
          getOptionsValuesList(
            findAll('.Polaris-Select option:not([disabled])')
          ),
          expectOptionValues
        );
      });

      test('builds date filters Select options for full option type', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            dateOptionType="full"
          }}
        `);

        const expectOptionValues = dateOptionType.full;

        assert.deepEqual(
          getOptionsValuesList(
            findAll('.Polaris-Select option:not([disabled])')
          ),
          expectOptionValues
        );
      });

      test('defaults to full date filters Select options when option type is missing', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
          }}
        `);

        const expectOptionValues = dateOptionType.full;

        assert.deepEqual(
          getOptionsValuesList(
            findAll('.Polaris-Select option:not([disabled])')
          ),
          expectOptionValues
        );
      });
    });

    module('filterValue', function() {
      test('sets option in date filters Select', async function(assert) {
        const dateFilterValue = DateFilterOption.PastMonth;
        this.set('dateFilterValue', dateFilterValue);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=dateFilterValue
          }}
        `);

        assert.dom('select').hasValue(dateFilterValue);
      });

      test('displays DatePicker when filterValue is filter with minimum date predicate (on or after)', async function(assert) {
        this.set('dateFilterValue', DateFilterOption.OnOrAfter);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=dateFilterValue
          }}
        `);

        assert.dom('.Polaris-DatePicker').exists();
      });

      test('displays DatePicker when filterValue is filter with maximum date predicate (on or before)', async function(assert) {
        this.set('dateFilterValue', DateFilterOption.OnOrBefore);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=dateFilterValue
          }}
        `);

        assert.dom('.Polaris-DatePicker').exists();
      });

      test('does not display DatePicker when filterValue is filter without date predicate', async function(assert) {
        this.set('dateFilterValue', DateFilterOption.PastMonth);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=dateFilterValue
          }}
        `);

        assert.dom('.Polaris-DatePicker').doesNotExist();
      });

      test('is used to calculate dateFilterOption and gets passed to Select as value', async function(assert) {
        const filterValue = 'coming_week';
        this.set('filterValue', filterValue);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=filterValue
          }}
        `);

        assert.dom('select').hasValue(filterValue);
      });
    });

    module('filterKey and filterMaxKey', function() {
      test('is used to calculate dateFilterOption and gets passed to Select as value', async function(assert) {
        const filterValue = 'coming_week';
        const filterKey = 'before';
        const filterMaxKey = 'before';
        this.setProperties({ filterValue, filterKey, filterMaxKey });

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterMinKey="starts_min"
            filterValue=filterValue
            filterKey=filterKey
            filterMaxKey=filterMaxKey
          }}
        `);
        assert.dom('select').hasValue('on_or_before');
      });
    });

    module(
      'timezones adjustments',
      {
        beforeEach() {
          setUpAttributeCaptureOnComponent(
            this,
            'polaris-date-picker',
            DatePickerComponent,
            'selected'
          );
        },
      },
      function() {
        // Skipping these tests for the time being since they pass when
        // dev tools is open but time out otherwise :wat:
        skip('sets the selected date with negative timezone offset on DatePicker and TextField', async function(assert) {
          const nextUserInputDate = '2019-01-01';
          const timezoneOffset = -540;
          const timezoneOffsetInHours = Math.abs(timezoneOffset / 60);
          Date.prototype.getTimezoneOffset = () => timezoneOffset;

          await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue="on_or_before"
          }}
        `);

          await triggerChangeEventWithValue(
            textFieldInputSelector,
            nextUserInputDate,
            'input'
          );
          await blur(textFieldInputSelector, 'blur');

          // Grab the selected date from the date picker. For some reason this
          // doesn't get updated during the `blur` event above so we need to
          // wait for it.
          let selectedDate = null;
          await waitUntil(() => (selectedDate = this.get('selected')));

          assert.equal(
            selectedDate.toISOString(),
            `2019-01-01T0${timezoneOffsetInHours}:00:00.000Z`
          );
          assert.dom(textFieldInputSelector).hasValue(nextUserInputDate);
        });

        skip('sets the selected date with fringe timezone offset on DatePicker and TextField', async function(assert) {
          const nextUserInputDate = '2019-01-01';
          Date.prototype.getTimezoneOffset = () => -720;

          await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue="on_or_before"
          }}
        `);

          await triggerChangeEventWithValue(
            textFieldInputSelector,
            nextUserInputDate,
            'input'
          );
          await blur(textFieldInputSelector, 'blur');

          // Grab the selected date from the date picker. For some reason this
          // doesn't get updated during the `blur` event above so we need to
          // wait for it.
          let selectedDate = null;
          await waitUntil(() => (selectedDate = this.get('selected')));

          assert.ok(selectedDate.toISOString().indexOf(nextUserInputDate) > -1);
          assert.dom(textFieldInputSelector).hasValue(nextUserInputDate);
        });

        skip('sets the selected date with positive timezone offset on DatePicker and TextField', async function(assert) {
          const nextUserInputDate = '2019-01-01';
          const timezoneOffset = 300;
          const timezoneOffsetInHours = Math.abs(timezoneOffset / 60);
          Date.prototype.getTimezoneOffset = () => timezoneOffset;

          await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue="on_or_before"
          }}
        `);

          await triggerChangeEventWithValue(
            textFieldInputSelector,
            nextUserInputDate,
            'input'
          );
          await blur(textFieldInputSelector, 'blur');

          // Grab the selected date from the date picker. For some reason this
          // doesn't get updated during the `blur` event above so we need to
          // wait for it.
          let selectedDate = null;
          await waitUntil(() => (selectedDate = this.get('selected')));

          assert.equal(
            selectedDate.toISOString(),
            `2019-01-01T0${timezoneOffsetInHours}:00:00.000Z`
          );
          assert.dom(textFieldInputSelector).hasValue(nextUserInputDate);
        });
      }
    );

    module('filterKey and filterMinKey', function() {
      test('is used to calculate dateFilterOption and gets passed to Select as value', async function(assert) {
        const filterValue = 'filter value';
        const filterKey = 'after';
        const filterMinKey = 'after';
        this.setProperties({ filterValue, filterKey, filterMinKey });

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterMaxKey="starts_max"
            filterValue=filterValue
            filterKey=filterKey
            filterMinKey=filterMinKey
          }}
        `);
        assert.dom('select').hasValue('on_or_after');
      });
    });

    module('onFilterValueChange', function() {
      test('gets called with new filter value when date filter is updated to filter without date predicate', async function(assert) {
        const newDateFilter = DateFilterOption.PastMonth;

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await triggerChangeEventWithValue('select', newDateFilter);

        assert.equal(this.get('newDateFilter'), newDateFilter);
      });

      test('gets called with undefined when date filter is updated to filter with minimum date predicate (on or after) and no current date selection', async function(assert) {
        const newDateFilter = DateFilterOption.OnOrAfter;
        this.set('newDateFilter', newDateFilter);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await triggerChangeEventWithValue('select', newDateFilter);

        assert.equal(this.get('newDateFilter'), undefined);
      });

      test('gets called with undefined when date filter is updated to filter with maximum date predicate (on or before) and no current date selection', async function(assert) {
        const newDateFilter = DateFilterOption.OnOrBefore;
        this.set('newDateFilter', newDateFilter);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await triggerChangeEventWithValue('select', newDateFilter);

        assert.equal(this.get('newDateFilter'), undefined);
      });

      skip('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with minimum date predicate (on or after) and current date selection', async function(assert) {
        const newDateFilter = DateFilterOption.OnOrAfter;
        const date = '2019-05-28';
        this.set('filterValue', DateFilterOption.OnOrBefore);

        hackDatePickerToFireOnChangeWithValue({ end: new Date(date) });

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=filterValue
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await click('.Polaris-DatePicker');
        await triggerChangeEventWithValue('select', newDateFilter);

        assert.equal(this.get('newDateFilter'), '2019-05-28');
      });

      skip('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with maximum date predicate (on or before) and current date selection', async function(assert) {
        const newDateFilter = DateFilterOption.OnOrBefore;
        const date = '2019-05-28';
        this.set('filterValue', DateFilterOption.OnOrAfter);

        hackDatePickerToFireOnChangeWithValue({ end: new Date(date) });

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=filterValue
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await click('.Polaris-DatePicker');
        await triggerChangeEventWithValue('select', newDateFilter);

        assert.equal(this.get('newDateFilter'), '2019-05-28');
      });

      skip('gets called with formatted YYYY-MM-DD date when date is updated in DatePicker', async function(assert) {
        const dateFilter = DateFilterOption.OnOrBefore;
        const date = '2019-05-28';
        this.set('dateFilter', dateFilter);

        hackDatePickerToFireOnChangeWithValue({ end: new Date(date) });

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=dateFilter
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await click('.Polaris-DatePicker');

        assert.equal(this.get('newDateFilter'), '2019-05-28');
      });

      /**
       * TODO: this has a timezone issue for me (@andrewpye)
       * in my GMT+2 time zone: the date returned is the day
       * before the one selected. However this only shows up
       * if I'm not debugging - if I close dev tools,
       * `this.get('newDateFilter')` returns `undefined`
       * as if there's a timing error of some sort.
       */
      skip('gets called with date when date is updated in TextField with YYYY-MM-DD date and TextField is blurred', async function(assert) {
        const dateFilter = DateFilterOption.OnOrBefore;
        const date = '2019-08-22';
        this.set('dateFilter', dateFilter);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=dateFilter
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await triggerChangeEventWithValue(textFieldInputSelector, date);
        await blur(textFieldInputSelector, 'blur');

        assert.equal(this.get('newDateFilter'), date);
      });

      /**
       * Skipping this test for now as well since it seems to fail
       * for similar timing-ish reasons as the one above.
       */
      skip('gets called with undefined when date is updated in TextField with invalid date and TextField is blurred', async function(assert) {
        const dateFilter = DateFilterOption.OnOrBefore;
        const invalidDate = '2019/08/22';
        this.setProperties({
          dateFilter,
          newDateFilter: dateFilter,
        });

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterValue=dateFilter
            onFilterValueChange=(action (mut newDateFilter))
          }}
        `);

        await triggerChangeEventWithValue(textFieldInputSelector, invalidDate);
        await blur(textFieldInputSelector, 'blur');

        assert.equal(this.get('newDateFilter'), undefined);
      });
    });

    module('onFilterKeyChange', function() {
      test('gets called with consumer filter key when date filter is updated to filter without date predicate', async function(assert) {
        this.set('initialConsumerFilterKey', 'starts');

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            onFilterKeyChange=(action (mut changedFilterKey))
          }}
        `);

        await triggerChangeEventWithValue('select', DateFilterOption.PastMonth);

        assert.equal(
          this.get('changedFilterKey'),
          this.initialConsumerFilterKey
        );
      });

      test('gets called with max filter key prop when date filter is updated to filter with maximum date predicate (on or before)', async function(assert) {
        this.set('filterMaxKey', 'starts_max');

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey=this.filterMaxKey
            onFilterKeyChange=(action (mut changedFilterKey))
          }}
        `);

        await triggerChangeEventWithValue(
          'select',
          DateFilterOption.OnOrBefore
        );

        assert.equal(this.get('changedFilterKey'), this.filterMaxKey);
      });

      test('gets called with min filter key when date filter is updated to filter with minimum date predicate (on or after)', async function(assert) {
        this.set('filterMinKey', 'starts_min');

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey=this.filterMinKey
            filterMaxKey="starts_max"
            onFilterKeyChange=(action (mut changedFilterKey))
          }}
        `);

        await triggerChangeEventWithValue('select', DateFilterOption.OnOrAfter);

        assert.equal(this.get('changedFilterKey'), this.filterMinKey);
      });
    });

    test('resets date in DatePicker when user removes date in TextField', async function(assert) {
      this.set('filterValue', DateFilterOption.OnOrBefore);
      await render(hbs`
        {{polaris-resource-list/filter-control/date-selector
          filterKey="starts"
          filterMinKey="starts_min"
          filterMaxKey="starts_max"
          filterValue=filterValue
        }}
      `);

      await triggerChangeEventWithValue(textFieldInputSelector, '');

      assert.dom(selectedDaySelector).doesNotExist();
    });

    /**
     * TODO: this has a timezone issue for me (@andrewpye)
     * in my GMT+2 time zone: the date returned is the day
     * before the one selected.
     */
    skip('updates selected date in DatePicker when user enters a valid date in TextField and field is blurred', async function(assert) {
      const validUserInputDate = '2020-08-30';
      this.set('filterValue', DateFilterOption.OnOrBefore);
      await render(hbs`
        {{polaris-resource-list/filter-control/date-selector
          filterKey="starts"
          filterMinKey="starts_min"
          filterMaxKey="starts_max"
          filterValue=filterValue
        }}
      `);

      await triggerChangeEventWithValue(
        textFieldInputSelector,
        validUserInputDate
      );
      await blur(textFieldInputSelector);

      assert
        .dom(selectedDaySelector)
        .hasAttribute(
          'data-test-date-picker-date',
          new RegExp(validUserInputDate)
        );
    });

    test('does not update selected date in DatePicker when user enters an invalid date in TextField and field is blurred', async function(assert) {
      this.set('filterValue', DateFilterOption.OnOrBefore);
      await render(hbs`
        {{polaris-resource-list/filter-control/date-selector
          filterKey="starts"
          filterMinKey="starts_min"
          filterMaxKey="starts_max"
          filterValue=filterValue
        }}
      `);

      await triggerChangeEventWithValue(textFieldInputSelector, 'INVALID');
      await blur(textFieldInputSelector);

      assert.dom(selectedDaySelector).doesNotExist();
    });

    test('resets selected date in DatePicker when user enters an invalid date in TextField and field is blurred', async function(assert) {
      const invalidUserInputDate = '08/20/2020';
      this.set('filterValue', DateFilterOption.OnOrBefore);
      await render(hbs`
        {{polaris-resource-list/filter-control/date-selector
          filterKey="starts"
          filterMinKey="starts_min"
          filterMaxKey="starts_max"
          filterValue=filterValue
        }}
      `);

      await triggerChangeEventWithValue(
        textFieldInputSelector,
        invalidUserInputDate
      );
      await blur(textFieldInputSelector);

      assert.dom(selectedDaySelector).doesNotExist();
    });

    test('removes date field error when invalid date is replaced by valid date in TextField', async function(assert) {
      const validUserInputDate = '2020-08-30';
      const invalidUserInputDate = '08/30/2020';
      this.set('filterValue', DateFilterOption.OnOrBefore);
      await render(hbs`
        {{polaris-resource-list/filter-control/date-selector
          filterKey="starts"
          filterMinKey="starts_min"
          filterMaxKey="starts_max"
          filterValue=filterValue
        }}
      `);

      await triggerChangeEventWithValue(
        textFieldInputSelector,
        invalidUserInputDate
      );
      await blur(textFieldInputSelector);

      await triggerChangeEventWithValue(
        textFieldInputSelector,
        validUserInputDate
      );

      assert.dom('[data-test-labelled-error]').doesNotExist();
    });

    test('removes date field error when new date is selected in DatePicker', async function(assert) {
      const invalidUserInputDate = '08/30/2020';
      this.set('filterValue', DateFilterOption.OnOrBefore);
      await render(hbs`
        {{polaris-resource-list/filter-control/date-selector
          filterKey="starts"
          filterMinKey="starts_min"
          filterMaxKey="starts_max"
          filterValue=filterValue
        }}
      `);

      await triggerChangeEventWithValue(
        textFieldInputSelector,
        invalidUserInputDate
      );
      await blur(textFieldInputSelector);

      hackDatePickerToFireOnChangeWithValue({ end: new Date() });

      assert.dom('[data-test-labelled-error]').doesNotExist();
    });

    skip('does not display error when date is added in date filed by DatePicker and date field is blurred', async function(assert) {
      this.set('filterValue', DateFilterOption.OnOrBefore);
      await render(hbs`
        {{polaris-resource-list/filter-control/date-selector
          filterKey="starts"
          filterMinKey="starts_min"
          filterMaxKey="starts_max"
          filterValue=filterValue
        }}
      `);

      hackDatePickerToFireOnChangeWithValue({ end: new Date() });
      await blur(textFieldInputSelector);

      assert.dom('[data-test-labelled-error]').doesNotExist();
    });
  }
);
