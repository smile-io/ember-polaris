import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

const sortable = [false, true, false, false, true, false];
const columnContentTypes = [
  'text',
  'numeric',
  'numeric',
  'numeric',
  'numeric',
];
const headings = ['Product', 'Price', 'Order Number', 'Quantity', 'Subtotal'];
const rows = [
  [
    'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    '$875.00',
    124518,
    83,
    '$122,500.00',
  ],
  ['Emerald Silk Gown', '$230.00', 124689, 32, '$19,090.00'],
  ['Mauve Cashmere Scarf', '$445.00', 124533, 140, '$14,240.00'],
];
const summary = ['', '', '', 255, '$155,830.00'];

module('Integration | Component | polaris-data-table', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setProperties({
      sortable,
      columnContentTypes,
      headings,
      rows,
      summary,
    });
  });

  test('it renders all table body rows', async function(assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        summary=summary
      }}
    `);

    assert.equal(findAll('tbody tr').length, 3);
  });

  test('it defaults to non-sorting column headings', async function(assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        summary=summary
      }}
    `);
    const sortableHeadings = findAll('Polaris-DataTable__Heading--sortable');

    assert.equal(sortableHeadings.length, 0);
  });

  test('initial sort column defaults to first column if not specified', async function(assert) {
    this.set('firstColumnSortable', [true, true, false, false, true, false]);
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        summary=summary
        sortable=firstColumnSortable
      }}
    `);
    const firstHeadingCell = findAll('th.Polaris-DataTable__Cell')[0];

    assert.ok(firstHeadingCell.classList.contains('Polaris-DataTable__Cell--sorted'));
  });

  test('it sets specified initial sort column', async function(assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        summary=summary
        sortable=sortable
        initialSortColumnIndex=4
      }}
    `);
    const fifthHeadingCell = findAll('th.Polaris-DataTable__Cell')[5];

    assert.ok(fifthHeadingCell.classList.contains('Polaris-DataTable__Cell--sorted'));
  });
});
