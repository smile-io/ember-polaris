import { helper } from '@ember/component/helper';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const sortable = [false, true, false, false, true, false];
const columnContentTypes = ['text', 'numeric', 'numeric', 'numeric', 'numeric'];
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
const footerContent = ['', '', '', 255, '$155,830.00'];

module('Integration | Component | polaris-data-table', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setProperties({
      sortable,
      columnContentTypes,
      headings,
      rows,
      footerContent,
    });

    // Register a simple array helper to avoid "object is not extensible"
    // errors in some versions of Ember.
    this.owner.register(
      'helper:array',
      helper(function array(items) {
        return [...items];
      })
    );
  });

  test('it renders all table body rows', async function(assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        footerContent=footerContent
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
        footerContent=footerContent
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
        footerContent=footerContent
        sortable=firstColumnSortable
      }}
    `);
    const firstHeadingCell = findAll('th.Polaris-DataTable__Cell')[0];

    assert.ok(
      firstHeadingCell.classList.contains('Polaris-DataTable__Cell--sorted')
    );
  });

  test('it sets specified initial sort column', async function(assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        footerContent=footerContent
        sortable=sortable
        initialSortColumnIndex=4
      }}
    `);
    const fifthHeadingCell = findAll('th.Polaris-DataTable__Cell')[5];

    assert.ok(
      fifthHeadingCell.classList.contains('Polaris-DataTable__Cell--sorted')
    );
  });

  test('it accepts both text and component definitions as cell contents', async function(assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=(array
          "text"
          "numeric"
        )
        headings=(array
          "Product"
          (component "polaris-badge" text="Status")
        )
        rows=(array
          (array
            (component "polaris-link" text="Emerald Silk Gown")
            "In stock"
          )
        )
        footerContent=(component "polaris-button" text="Refresh stock statuses")
      }}
    `);

    const headingCells = findAll('thead th');
    const firstHeadingCell = headingCells[0];
    assert.equal(
      firstHeadingCell.textContent.trim(),
      'Product',
      'first heading cell renders correct text'
    );

    const lastHeadingCell = headingCells[headingCells.length - 1];
    assert.ok(
      lastHeadingCell.firstElementChild.classList.contains('Polaris-Badge'),
      'last heading cell renders badge component'
    );
    assert.equal(
      lastHeadingCell.textContent.trim(),
      'Status',
      'last heading cell renders correct text'
    );

    const rowCells = find('tbody tr.Polaris-DataTable__TableRow').children;
    const firstRowCell = rowCells[0];
    assert.ok(
      firstRowCell.firstElementChild.classList.contains('Polaris-Link'),
      'first row cell renders link component'
    );
    assert.equal(
      firstRowCell.textContent.trim(),
      'Emerald Silk Gown',
      'first row cell renders correct text'
    );

    const lastRowCell = rowCells[rowCells.length - 1];
    assert.equal(
      lastRowCell.textContent.trim(),
      'In stock',
      'last row cell renders correct text'
    );

    const footerCell = find('tfoot td.Polaris-DataTable__Cell--footer');
    assert.ok(
      footerCell.firstElementChild.classList.contains('Polaris-Button'),
      'footer cell renders button component'
    );
    assert.equal(
      footerCell.textContent.trim(),
      'Refresh stock statuses',
      'footer cell renders correct text'
    );
  });
});
