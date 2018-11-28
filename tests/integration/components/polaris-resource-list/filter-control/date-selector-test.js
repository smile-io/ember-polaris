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

async function triggerSelectChangeEventWithValue(value) {
  find('select').value = value;
  await triggerEvent('select', 'change');
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

        await triggerSelectChangeEventWithValue(newDateFilter);

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

        await triggerSelectChangeEventWithValue(newDateFilter);

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

        await triggerSelectChangeEventWithValue(newDateFilter);

        assert.equal(this.get('newDateFilter'), undefined);
      });

      test('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with minimum date predicate (on or after) and current date selection', async function(assert) {
        const newDateFilter = DateFilterOption.OnOrAfter;
        const date = '2019-05-28';
        this.set('filterValue', DateFilterOption.OnOrBefore);

        // Hack the date picker so we can trigger its onChange easily.
        // TODO: find a better way of doing this.
        DatePickerComponent.reopen({
          click() {
            this.get('onChange')({ end: new Date(date) });
          },
        });

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
        await triggerSelectChangeEventWithValue(newDateFilter);

        assert.equal(this.get('newDateFilter'), '2019-05-28');
      });

      test('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with maximum date predicate (on or before) and current date selection', async function(assert) {
        const newDateFilter = DateFilterOption.OnOrBefore;
        const date = '2019-05-28';
        this.set('filterValue', DateFilterOption.OnOrAfter);

        // Hack the date picker so we can trigger its onChange easily.
        // TODO: find a better way of doing this.
        DatePickerComponent.reopen({
          click() {
            this.get('onChange')({ end: new Date(date) });
          },
        });

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
        await triggerSelectChangeEventWithValue(newDateFilter);

        assert.equal(this.get('newDateFilter'), '2019-05-28');
      });

      test('gets called with formatted YYYY-MM-DD date when date is updated in DatePicker', async function(assert) {
        const dateFilter = DateFilterOption.OnOrBefore;
        const date = '2019-05-28';
        this.set('dateFilter', dateFilter);

        // Hack the date picker so we can trigger its onChange easily.
        // TODO: find a better way of doing this.
        DatePickerComponent.reopen({
          click() {
            this.get('onChange')({ end: new Date(date) });
          },
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

        find('.Polaris-TextField input').value = date;
        await triggerEvent('.Polaris-TextField input', 'change');
        await blur('.Polaris-TextField input', 'blur');

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

        find('.Polaris-TextField input').value = invalidDate;
        await triggerEvent('.Polaris-TextField input', 'change');
        await blur('.Polaris-TextField input', 'blur');

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

        await triggerSelectChangeEventWithValue(DateFilterOption.PastMonth);

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

        await triggerSelectChangeEventWithValue(DateFilterOption.OnOrBefore);

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

        await triggerSelectChangeEventWithValue(DateFilterOption.OnOrAfter);

        assert.equal(this.get('changedFilterKey'), filterMinKey);
      });
    });
  }
);
