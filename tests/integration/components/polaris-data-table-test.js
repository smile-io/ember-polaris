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

module('Integration | Component | polaris-data-table', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      sortable,
      columnContentTypes,
      headings,
      rows,
      footerContent,
    });
  });

  test('it renders all table body rows', async function (assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        footerContent=footerContent
      }}
    `);

    assert.dom('[data-test-data-table-row]').exists({ count: 3 });
  });

  test('it defaults to non-sorting column headings', async function (assert) {
    await render(hbs`
      {{polaris-data-table
        columnContentTypes=columnContentTypes
        headings=headings
        rows=rows
        footerContent=footerContent
      }}
    `);
    const sortableHeadings = findAll('.Polaris-DataTable__Heading--sortable');

    assert.equal(sortableHeadings.length, 0);
  });

  test('initial sort column defaults to first column if not specified', async function (assert) {
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

    assert.dom(firstHeadingCell).hasClass('Polaris-DataTable__Cell--sorted');
  });

  test('it sets specified initial sort column', async function (assert) {
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
    const fifthHeadingCell = findAll('.Polaris-DataTable__Cell--header')[4];
    assert.dom(fifthHeadingCell).hasClass('Polaris-DataTable__Cell--sorted');
  });

  test('it accepts both text and component definitions as cell contents', async function (assert) {
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

    const headingCells = findAll('.Polaris-DataTable__Cell--header');

    const firstHeadingCell = headingCells[0];
    assert
      .dom(firstHeadingCell)
      .hasText('Product', 'first heading cell renders correct text');

    const lastHeadingCell = headingCells[headingCells.length - 1];
    assert
      .dom(lastHeadingCell.firstElementChild)
      .hasClass('Polaris-Badge', 'last heading cell renders badge component');
    assert
      .dom(lastHeadingCell)
      .hasText('Status', 'last heading cell renders correct text');

    const rowCells = find('[data-test-data-table-row]').children;
    const firstRowCell = rowCells[0];
    assert
      .dom(firstRowCell.firstElementChild)
      .hasClass('Polaris-Link', 'first row cell renders link component');
    assert
      .dom(firstRowCell)
      .hasText('Emerald Silk Gown', 'first row cell renders correct text');

    const lastRowCell = rowCells[rowCells.length - 1];
    assert
      .dom(lastRowCell)
      .hasText('In stock', 'last row cell renders correct text');

    const footerCell = find('tfoot td.Polaris-DataTable__Cell--footer');
    assert
      .dom(footerCell.firstElementChild)
      .hasClass('Polaris-Button', 'footer cell renders button component');
    assert
      .dom(footerCell)
      .hasText('Refresh stock statuses', 'footer cell renders correct text');
  });
});
