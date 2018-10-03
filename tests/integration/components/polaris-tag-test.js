import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent('polaris-tag', 'Integration | Component | polaris tag', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent);
  },
});

const tag = 'Wholesale';
const componentSelector = 'span.Polaris-Tag';
const buttonSelector = 'button.Polaris-Tag__Button';
const iconSelector = 'span.Polaris-Icon';

const tagValueSelector = buildNestedSelector(componentSelector, 'span');
const tagButtonSelector = buildNestedSelector(componentSelector, buttonSelector);
const tagIconSelector = buildNestedSelector(buttonSelector, iconSelector);

test('it renders the correct HTML in inline usage', function(assert) {
  this.set('text', tag);
  this.render(hbs`{{polaris-tag text=text}}`);

  const tagComponent = findAll(componentSelector);
  assert.equal(tagComponent.length, 1, 'it renders a single tag component');

  const tagValue = find(tagValueSelector);
  assert.ok(tagValue, 'it renders a span to hold the `text` value');
  assert.equal(tagValue.textContent.trim(), tag, 'it renders the `text` value correctly');

  const tagButton = find(tagButtonSelector);
  assert.ok(tagButton, 'it renders a tag button');
  assert.equal(
    tagButton.getAttribute('aria-label'),
    `Remove ${tag}`,
    'it gives the remove button the correct aria-label'
  );

  const tagIcon = find(tagIconSelector);
  const { iconSource } = tagIcon.querySelector('svg').dataset;
  assert.ok(tagIcon, 'it renders an icon inside the tag button');
  assert.equal(
    iconSource,
    'polaris/cancel-small',
    'it uses the correct polaris/cancel-small icon as the icon source'
  );
});

test('it renders the correct HTML in block usage', function(assert) {
  this.set('tag', tag);

  this.render(hbs`
    {{#polaris-tag}}
      {{tag}}
    {{/polaris-tag}}
  `);

  const tagComponent = findAll(componentSelector);
  assert.equal(tagComponent.length, 1, 'it renders a single tag component');

  const tagValue = find(tagValueSelector);
  assert.ok(tagValue, 'it renders a span to hold the `tag` value');
  assert.equal(tagValue.textContent.trim(), tag, 'it renders the `tag` value correctly');

  const tagButton = find(tagButtonSelector);
  assert.ok(tagButton, 'it renders a tag button');
  assert.equal(
    tagButton.getAttribute('aria-label'),
    `Remove ${tag}`,
    'it gives the remove button the correct aria-label'
  );

  const tagIcon = find(tagIconSelector);
  const { iconSource } = tagIcon.querySelector('svg').dataset;
  assert.ok(tagIcon, 'it renders an icon inside the tag button');
  assert.equal(
    iconSource,
    'polaris/cancel-small',
    'it uses the correct polaris/cancel-small icon as the icon source'
  );
});

test('it handles the disabled attribute correctly', function(assert) {
  this.render(hbs`{{polaris-tag disabled=disabled}}`);

  const tagComponent = find(componentSelector);
  assert.ok(tagComponent, 'it renders the tag component');

  const button = find(buttonSelector, tagComponent);
  assert.ok(tagComponent, 'it renders the remove button');

  // Check the component when no value for `disabled` is given.
  assert.notOk(
    tagComponent.classList.contains('Polaris-Tag--disabled'),
    'when disabled is not specified - does not apply disabled class to tag'
  );
  assert.notOk(
    button.disabled,
    'when disabled is not specified - does not disable the remove button'
  );

  // Specify that the tag's disabled and check the component again.
  this.set('disabled', true);
  assert.ok(
    tagComponent.classList.contains('Polaris-Tag--disabled'),
    'when disabled is specified - applies disabled class to tag'
  );
  assert.ok(button.disabled, 'when disabled is specified - disables the remove button');
});

test('it calls an `onRemove` action when the button is clicked', function(assert) {
  this.set('onRemoveActionFired', false);

  this.render(hbs`
    {{polaris-tag
      onRemove=(action (mut onRemoveActionFired) true)
    }}
  `);

  click(tagButtonSelector);
  assert.ok(this.get('onRemoveActionFired'), 'button clicked - onRemove action is called');
});
