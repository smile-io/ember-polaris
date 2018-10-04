import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent(
  'polaris-visually-hidden',
  'Integration | Component | polaris visually hidden',
  {
    integration: true,
  }
);

const visuallyHiddenSelector = 'span.Polaris-VisuallyHidden';

test('it renders the correct HTML in basic inline usage', function(assert) {
  this.render(
    hbs`{{polaris-visually-hidden text="Inline visually hidden content"}}`
  );

  const visuallyHiddens = findAll(visuallyHiddenSelector);
  assert.equal(
    visuallyHiddens.length,
    1,
    'renders one visually hidden component'
  );
  assert.equal(
    visuallyHiddens[0].textContent.trim(),
    'Inline visually hidden content',
    'renders correct visually hidden content'
  );
});

test('it renders the correct HTML in basic block usage', function(assert) {
  this.render(hbs`
    {{#polaris-visually-hidden}}
      Block visually hidden content
    {{/polaris-visually-hidden}}
  `);

  const visuallyHiddens = findAll(visuallyHiddenSelector);
  assert.equal(
    visuallyHiddens.length,
    1,
    'renders one visually hidden component'
  );
  assert.equal(
    visuallyHiddens[0].textContent.trim(),
    'Block visually hidden content',
    'renders correct visually hidden content'
  );
});
