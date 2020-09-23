import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, find, render } from '@ember/test-helpers';

module('Integration | Component | polaris stack', function (hooks) {
  setupRenderingTest(hooks);

  const stackSelector = 'div.Polaris-Stack';
  const stackItemSelector = 'div.Polaris-Stack__Item';

  test('it renders the correct HTML with default attributes', async function (assert) {
    await render(hbs`
      {{#polaris-stack}}
        <p>Paragraph</p>
        <div>
          Outer div
          <div>Inner div</div>
        </div>
      {{/polaris-stack}}
    `);

    const stacks = findAll(stackSelector);
    assert.equal(stacks.length, 1, 'renders the correct number of stacks');

    const stackItems = findAll(stackItemSelector);
    assert.equal(
      stackItems.length,
      2,
      'renders the correct number of stack items'
    );

    // Check the first stack item.
    let stackItem = stackItems[0];
    let stackItemChildren = stackItem.children;
    assert.equal(
      stackItemChildren.length,
      1,
      'first stack item - renders the correct number of children'
    );

    let stackItemChild = stackItemChildren[0];
    assert.equal(
      stackItemChild.tagName.toLowerCase(),
      'p',
      'first stack item - renders the correct child element'
    );
    assert
      .dom(stackItemChild)
      .hasText(
        'Paragraph',
        'first stack item - renders the correct child content'
      );

    // Check the second stack item.
    stackItem = stackItems[1];
    stackItemChildren = stackItem.children;
    assert.equal(
      stackItemChildren.length,
      1,
      'second stack item - renders the correct number of children'
    );

    stackItemChild = stackItemChildren[0];
    assert.equal(
      stackItemChild.tagName.toLowerCase(),
      'div',
      'second stack item - renders the correct child element'
    );
    assert.ok(
      stackItemChild.textContent.trim().indexOf('Outer div') > -1,
      'second stack item - renders the correct child content'
    );
  });

  test('it renders the correct HTML with vertical attribute', async function (assert) {
    this.set('vertical', true);
    await render(hbs`{{polaris-stack vertical=vertical}}`);

    const stack = find(stackSelector);
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--vertical',
        'vertical=true - adds the vertical class'
      );

    this.set('vertical', false);
    assert
      .dom(stack)
      .hasNoClass(
        'Polaris-Stack--vertical',
        'vertical=true - does not add the vertical class'
      );
  });

  test('it renders the correct HTML with spacing attribute', async function (assert) {
    this.set('spacing', null);
    await render(hbs`{{polaris-stack spacing=spacing}}`);

    const stack = find(stackSelector);
    assert.equal(
      stack.className.indexOf('Polaris-Stack--spacing'),
      -1,
      'spacing=null - does not add any spacing class'
    );

    this.set('spacing', 'none');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--spacingNone',
        'spacing=none - adds the correct spacing class'
      );

    this.set('spacing', 'loose');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--spacingLoose',
        'spacing=loose - adds the correct spacing class'
      );

    this.set('spacing', 'tight');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--spacingTight',
        'spacing=tight - adds the correct spacing class'
      );
  });

  test('it renders the correct HTML with alignment attribute', async function (assert) {
    this.set('alignment', null);
    await render(hbs`{{polaris-stack alignment=alignment}}`);

    const stack = find(stackSelector);
    assert.equal(
      stack.className.indexOf('Polaris-Stack--alignment'),
      -1,
      'alignment=null - does not add any alignment class'
    );

    this.set('alignment', 'leading');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--alignmentLeading',
        'alignment=leading - adds the correct alignment class'
      );

    this.set('alignment', 'trailing');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--alignmentTrailing',
        'alignment=trailing - adds the correct alignment class'
      );

    this.set('alignment', 'center');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--alignmentCenter',
        'alignment=center - adds the correct alignment class'
      );

    this.set('alignment', 'fill');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--alignmentFill',
        'alignment=fill - adds the correct alignment class'
      );

    this.set('alignment', 'baseline');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--alignmentBaseline',
        'alignment=baseline - adds the correct alignment class'
      );
  });

  test('it renders the correct HTML with distribution attribute', async function (assert) {
    this.set('distribution', 'baseline');
    await render(hbs`{{polaris-stack distribution=distribution}}`);

    const stack = find(stackSelector);
    assert.equal(
      stack.className.indexOf('Polaris-Stack--distribution'),
      -1,
      'distribution=baseline - does not add any distribution class'
    );

    this.set('distribution', 'leading');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--distributionLeading',
        'distribution=leading - adds the correct distribution class'
      );

    this.set('distribution', 'trailing');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--distributionTrailing',
        'distribution=trailing - adds the correct distribution class'
      );

    this.set('distribution', 'center');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--distributionCenter',
        'distribution=center - adds the correct distribution class'
      );

    this.set('distribution', 'fill');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--distributionFill',
        'distribution=fill - adds the correct distribution class'
      );

    this.set('distribution', 'fillEvenly');
    assert
      .dom(stack)
      .hasClass(
        'Polaris-Stack--distributionFillEvenly',
        'distribution=fillEvenly - adds the correct distribution class'
      );
  });

  test('it renders the correct HTML with wrap attribute', async function (assert) {
    await render(hbs`{{polaris-stack wrap=wrap}}`);

    const stack = find(stackSelector);
    assert
      .dom(stack)
      .hasNoClass(
        'Polaris-Stack--noWrap',
        'wrap=undefined - does not add the no-wrap class'
      );

    this.set('wrap', true);
    assert
      .dom(stack)
      .hasNoClass(
        'Polaris-Stack--noWrap',
        'wrap=true - does not add the no-wrap class'
      );

    this.set('wrap', false);
    assert
      .dom(stack)
      .hasClass('Polaris-Stack--noWrap', 'wrap=false - adds the no-wrap class');
  });

  test('it renders the correct HTML in block usage', async function (assert) {
    await render(hbs`
      {{#polaris-stack as |stack|}}
        {{#stack.item fill=true}}
          Block item with fill
        {{/stack.item}}

        {{stack.item text="Inline item"}}

        <div>
          <p>Paragraph inside a magically wrapped item</p>
        </div>
      {{/polaris-stack}}
    `);

    const stackItems = findAll(stackItemSelector);
    assert.equal(
      stackItems.length,
      3,
      'renders the correct number of stack items'
    );

    // Check the first stack item.
    let stackItem = stackItems[0];
    assert
      .dom(stackItem)
      .hasClass(
        'Polaris-Stack__Item--fill',
        'first stack item - has fill class'
      );
    assert
      .dom(stackItem)
      .hasText(
        'Block item with fill',
        'first stack item - renders the correct content'
      );

    // Check the second stack item.
    stackItem = stackItems[1];
    assert
      .dom(stackItem)
      .hasNoClass(
        'Polaris-Stack__Item--fill',
        'second stack item - does not have fill class'
      );
    assert
      .dom(stackItem)
      .hasText(
        'Inline item',
        'second stack item - renders the correct content'
      );

    // Check the third stack item.
    stackItem = stackItems[2];
    assert
      .dom(stackItem)
      .hasNoClass(
        'Polaris-Stack__Item--fill',
        'third stack item - does not have fill class'
      );
    assert
      .dom(stackItem)
      .hasText(
        'Paragraph inside a magically wrapped item',
        'third stack item - renders the correct content'
      );
  });

  test('backwards compatibility - allows a custom class to be applied', async function (assert) {
    await render(hbs`
      {{#polaris-stack class="stack-class" as |stack|}}
        {{stack.item class="stack-item-class"}}
      {{/polaris-stack}}
    `);

    assert
      .dom(stackSelector)
      .hasClass(
        'stack-class',
        'classic syntax - supports a custom `class` to be applied'
      );

    assert
      .dom(stackItemSelector)
      .hasClass(
        'stack-item-class',
        'classic syntax - supports a custom `class` to be applied to stack item'
      );
  });
});
