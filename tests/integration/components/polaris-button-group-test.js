import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-button-group', 'Integration | Component | polaris button group', {
  integration: true
});

const buttonGroupSelector = 'div.Polaris-ButtonGroup';

test('it renders the correct HTML with default attributes', function(assert) {
  this.render(hbs`
    {{#polaris-button-group}}
      {{polaris-button text="Button 1"}}
      {{polaris-button text="Button 2"}}
    {{/polaris-button-group}}
  `);

  const buttonGroups = findAll(buttonGroupSelector);
  assert.equal(buttonGroups.length, 1, 'renders one button group');

  const buttonSelector = buildNestedSelector(
    buttonGroupSelector,
    'div.Polaris-ButtonGroup__Item',
    'button.Polaris-Button'
  );
  const buttons = findAll(buttonSelector);
  assert.equal(buttons.length, 2, 'renders the correct number of buttons');
});

test('it renders the correct HTML with segmented attribute', function(assert) {
  this.set('segmented', true);
  this.render(hbs`{{polaris-button-group segmented=segmented}}`);

  const buttonGroup = find(buttonGroupSelector);
  assert.ok(buttonGroup.classList.contains('Polaris-ButtonGroup--segmented'), 'segmented=true - adds the segmented class');

  this.set('segmented', false);
  assert.notOk(buttonGroup.classList.contains('Polaris-ButtonGroup--segmented'), 'segmented=true - does not add the segmented class');
});
