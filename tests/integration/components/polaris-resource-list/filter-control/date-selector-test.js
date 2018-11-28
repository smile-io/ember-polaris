import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  findAll,
  triggerEvent,
  click,
  blur,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { DateFilterOption } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/date-selector';
import DatePickerComponent from '@smile-io/ember-polaris/components/polaris-date-picker';

const textFieldInputSelector = '.Polaris-TextField input';

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

async function triggerChangeEventWithValue(selector, value) {
  find(selector).value = value;
  await triggerEvent(selector, 'change');
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

      test('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with minimum date predicate (on or after) and current date selection', async function(assert) {
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

      test('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with maximum date predicate (on or before) and current date selection', async function(assert) {
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

      test('gets called with formatted YYYY-MM-DD date when date is updated in DatePicker', async function(assert) {
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
        const initialConsumerFilterKey = 'starts';
        this.set('initialConsumerFilterKey', initialConsumerFilterKey);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterKey=initialConsumerFilterKey
            onFilterKeyChange=(action (mut changedFilterKey))
          }}
        `);

        await triggerChangeEventWithValue('select', DateFilterOption.PastMonth);

        assert.equal(this.get('changedFilterKey'), initialConsumerFilterKey);
      });

      test('gets called with max filter key prop when date filter is updated to filter with maximum date predicate (on or before)', async function(assert) {
        const filterMaxKey = 'starts_max';
        this.set('filterMaxKey', filterMaxKey);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterMaxKey=filterMaxKey
            onFilterKeyChange=(action (mut changedFilterKey))
          }}
        `);

        await triggerChangeEventWithValue(
          'select',
          DateFilterOption.OnOrBefore
        );

        assert.equal(this.get('changedFilterKey'), filterMaxKey);
      });

      test('gets called with min filter key when date filter is updated to filter with minimum date predicate (on or after)', async function(assert) {
        const filterMinKey = 'starts_min';
        this.set('filterMinKey', filterMinKey);

        await render(hbs`
          {{polaris-resource-list/filter-control/date-selector
            filterKey="starts"
            filterMinKey="starts_min"
            filterMaxKey="starts_max"
            filterMinKey=filterMinKey
            onFilterKeyChange=(action (mut changedFilterKey))
          }}
        `);

        await triggerChangeEventWithValue('select', DateFilterOption.OnOrAfter);

        assert.equal(this.get('changedFilterKey'), filterMinKey);
      });
    });

    skip('resets date in DatePicker when user removes date in TextField', async function(/* assert */) {
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

      // TODO: how do we check this?
      // expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
    });

    skip('updates selected date in DatePicker when user enters a valid date in TextField and field is blurred', async function(/* assert */) {
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

      // TODO: how do we check this?
      // const selectedDate = wrapper.find(DatePicker).prop('selected') as Date;
      // expect(selectedDate.toISOString()).toContain(validUserInputDate);
    });

    skip('does not update selected date in DatePicker when user enters an invalid date in TextField and field is blurred', async function(/* assert */) {
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

      // TODO: how do we check this?
      // expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
    });

    skip('resets selected date in DatePicker when user enters an invalid date in TextField and field is blurred', async function(/* assert */) {
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

      // TODO: how do we check this?
      // expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
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

    test('does not display error when date is added in date filed by DatePicker and date field is blurred', async function(assert) {
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
