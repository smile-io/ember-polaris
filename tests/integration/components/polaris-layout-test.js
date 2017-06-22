import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-layout', 'Integration | Component | polaris layout', {
  integration: true
});

const layoutSelector = 'div.Polaris-Layout';

test('it renders the correct HTML in basic usage', function(assert) {
  // Test inline form.
  this.render(hbs`{{polaris-layout text="This is an inline layout"}}`);

  let layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'inline without sectioned flag - renders one layout');

  let layout = layouts[0];
  assert.equal(layout.children.length, 0, 'inline without sectioned flag - layout has no children');
  assert.equal(layout.textContent.trim(), 'This is an inline layout', 'inline without sectioned flag - renders text content');

  // Test block form.
  this.render(hbs`{{#polaris-layout}}This is a block layout{{/polaris-layout}}`);

  layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'block without sectioned flag - renders one layout');

  layout = layouts[0];
  assert.equal(layout.children.length, 0, 'block without sectioned flag - layout has no children');
  assert.equal(layout.textContent.trim(), 'This is a block layout', 'block without sectioned flag - renders text content');

  // Test inline form with sectioned flag.
  this.render(hbs`{{polaris-layout text="This is a sectioned inline layout" sectioned=true}}`);

  layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'inline with sectioned flag - renders one layout');
  assert.equal(layouts[0].children.length, 1, 'inline with sectioned flag - layout has one child');

  const layoutSectionSelector = buildNestedSelector(layoutSelector, 'div.Polaris-Layout__Section');
  let layoutSections = findAll(layoutSectionSelector);
  assert.equal(layoutSections.length, 1, 'inline with sectioned flag - renders layout section');
  assert.equal(layoutSections[0].textContent.trim(), 'This is a sectioned inline layout', 'inline with sectioned flag - renders text content');

  // Test block form with sectioned flag.
  this.render(hbs`{{#polaris-layout sectioned=true}}This is a sectioned block layout{{/polaris-layout}}`);

  layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'block with sectioned flag - renders one layout');
  assert.equal(layouts[0].children.length, 1, 'block with sectioned flag - layout has one child');

  layoutSections = findAll(layoutSectionSelector);
  assert.equal(layoutSections.length, 1, 'inline with sectioned flag - renders layout section');
  assert.equal(layoutSections[0].textContent.trim(), 'This is a sectioned block layout', 'block with sectioned flag - renders text content');
});
