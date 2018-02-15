import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';

moduleForComponent('polaris-stack', 'Integration | Component | polaris stack', {
  integration: true
});

const stackSelector = 'div.Polaris-Stack';
const stackItemSelector = 'div.Polaris-Stack__Item';

test('it renders the correct HTML with default attributes', function(assert) {
  this.render(hbs`
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
  assert.equal(stackItems.length, 2, 'renders the correct number of stack items');

  // Check the first stack item.
  let stackItem = stackItems[0];
  let stackItemChildren = stackItem.children;
  assert.equal(stackItemChildren.length, 1, 'first stack item - renders the correct number of children');

  let stackItemChild = stackItemChildren[0];
  assert.equal(stackItemChild.tagName.toLowerCase(), 'p', 'first stack item - renders the correct child element');
  assert.equal(stackItemChild.textContent.trim(), 'Paragraph', 'first stack item - renders the correct child content');

  // Check the second stack item.
  stackItem = stackItems[1];
  stackItemChildren = stackItem.children;
  assert.equal(stackItemChildren.length, 1, 'second stack item - renders the correct number of children');

  stackItemChild = stackItemChildren[0];
  assert.equal(stackItemChild.tagName.toLowerCase(), 'div', 'second stack item - renders the correct child element');
  assert.ok(stackItemChild.textContent.trim().indexOf('Outer div') > -1, 'second stack item - renders the correct child content');
});

test('it renders the correct HTML with vertical attribute', function(assert) {
  this.set('vertical', true);
  this.render(hbs`{{polaris-stack vertical=vertical}}`);

  const stack = find(stackSelector);
  assert.ok(stack.classList.contains('Polaris-Stack--vertical'), 'vertical=true - adds the vertical class');

  this.set('vertical', false);
  assert.notOk(stack.classList.contains('Polaris-Stack--vertical'), 'vertical=true - does not add the vertical class');
});

test('it renders the correct HTML with spacing attribute', function(assert) {
  this.set('spacing', null);
  this.render(hbs`{{polaris-stack spacing=spacing}}`);

  const stack = find(stackSelector);
  assert.equal(stack.className.indexOf('Polaris-Stack--spacing'), -1, 'spacing=null - does not add any spacing class');

  this.set('spacing', 'none');
  assert.ok(stack.classList.contains('Polaris-Stack--spacingNone'), 'spacing=none - adds the correct spacing class');

  this.set('spacing', 'loose');
  assert.ok(stack.classList.contains('Polaris-Stack--spacingLoose'), 'spacing=loose - adds the correct spacing class');

  this.set('spacing', 'tight');
  assert.ok(stack.classList.contains('Polaris-Stack--spacingTight'), 'spacing=tight - adds the correct spacing class');
});

test('it renders the correct HTML with alignment attribute', function(assert) {
  this.set('alignment', null);
  this.render(hbs`{{polaris-stack alignment=alignment}}`);

  const stack = find(stackSelector);
  assert.equal(stack.className.indexOf('Polaris-Stack--alignment'), -1, 'alignment=null - does not add any alignment class');

  this.set('alignment', 'leading');
  assert.ok(stack.classList.contains('Polaris-Stack--alignmentLeading'), 'alignment=leading - adds the correct alignment class');

  this.set('alignment', 'trailing');
  assert.ok(stack.classList.contains('Polaris-Stack--alignmentTrailing'), 'alignment=trailing - adds the correct alignment class');

  this.set('alignment', 'center');
  assert.ok(stack.classList.contains('Polaris-Stack--alignmentCenter'), 'alignment=center - adds the correct alignment class');

  this.set('alignment', 'fill');
  assert.ok(stack.classList.contains('Polaris-Stack--alignmentFill'), 'alignment=fill - adds the correct alignment class');

  this.set('alignment', 'baseline');
  assert.ok(stack.classList.contains('Polaris-Stack--alignmentBaseline'), 'alignment=baseline - adds the correct alignment class');
});

test('it renders the correct HTML with distribution attribute', function(assert) {
  this.set('distribution', 'baseline');
  this.render(hbs`{{polaris-stack distribution=distribution}}`);

  const stack = find(stackSelector);
  assert.equal(stack.className.indexOf('Polaris-Stack--distribution'), -1, 'distribution=baseline - does not add any distribution class');

  this.set('distribution', 'leading');
  assert.ok(stack.classList.contains('Polaris-Stack--distributionLeading'), 'distribution=leading - adds the correct distribution class');

  this.set('distribution', 'trailing');
  assert.ok(stack.classList.contains('Polaris-Stack--distributionTrailing'), 'distribution=trailing - adds the correct distribution class');

  this.set('distribution', 'center');
  assert.ok(stack.classList.contains('Polaris-Stack--distributionCenter'), 'distribution=center - adds the correct distribution class');

  this.set('distribution', 'fill');
  assert.ok(stack.classList.contains('Polaris-Stack--distributionFill'), 'distribution=fill - adds the correct distribution class');

  this.set('distribution', 'fillEvenly');
  assert.ok(stack.classList.contains('Polaris-Stack--distributionFillEvenly'), 'distribution=fillEvenly - adds the correct distribution class');
});

test('it renders the correct HTML with wrap attribute', function(assert) {
  this.render(hbs`{{polaris-stack wrap=wrap}}`);

  const stack = find(stackSelector);
  assert.notOk(stack.classList.contains('Polaris-Stack--noWrap'), 'wrap=undefined - does not add the no-wrap class');

  this.set('wrap', true);
  assert.notOk(stack.classList.contains('Polaris-Stack--noWrap'), 'wrap=true - does not add the no-wrap class');

  this.set('wrap', false);
  assert.ok(stack.classList.contains('Polaris-Stack--noWrap'), 'wrap=false - adds the no-wrap class');
});

test('it renders the correct HTML in block usage', function(assert) {
  this.render(hbs`
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
  assert.equal(stackItems.length, 3, 'renders the correct number of stack items');

  // Check the first stack item.
  let stackItem = stackItems[0];
  assert.ok(stackItem.classList.contains('Polaris-Stack__Item--fill'), 'first stack item - has fill class');
  assert.equal(stackItem.textContent.trim(), 'Block item with fill', 'first stack item - renders the correct content');

  // Check the second stack item.
  stackItem = stackItems[1];
  assert.notOk(stackItem.classList.contains('Polaris-Stack__Item--fill'), 'second stack item - does not have fill class');
  assert.equal(stackItem.textContent.trim(), 'Inline item', 'second stack item - renders the correct content');

  // Check the third stack item.
  stackItem = stackItems[2];
  assert.notOk(stackItem.classList.contains('Polaris-Stack__Item--fill'), 'third stack item - does not have fill class');
  assert.equal(stackItem.textContent.trim(), 'Paragraph inside a magically wrapped item', 'third stack item - renders the correct content');
});
