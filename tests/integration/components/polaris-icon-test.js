import { moduleForComponent, test } from 'ember-qunit';
import { classify } from '@ember/string';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent('polaris-icon', 'Integration | Component | polaris icon', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent);
  },
});

const iconSelector = 'span.Polaris-Icon';

test('it renders the specified icon correctly', function(assert) {
  this.render(hbs`{{polaris-icon source="notes"}}`);

  const icons = findAll(iconSelector);
  assert.equal(icons.length, 1, 'renders one icon component');

  const svgSelector = buildNestedSelector(iconSelector, 'svg.Polaris-Icon__Svg');
  const svgs = findAll(svgSelector);
  assert.equal(svgs.length, 1, 'renders one SVG element');
  assert.equal(svgs[0].dataset.iconSource, 'polaris/notes', 'uses the correct SVG source');
});

test('it applies colors correctly', function(assert) {
  // Colors lifted from shopify source.
  const colors = [
    'white',
    'black',
    'skyLighter', 'skyLight', 'sky', 'skyDark',
    'inkLightest', 'inkLighter', 'inkLight', 'ink',
    'blueLighter', 'blueLight', 'blue', 'blueDark', 'blueDarker',
    'indigoLighter', 'indigoLight', 'indigo', 'indigoDark', 'indigoDarker',
    'tealLighter', 'tealLight', 'teal', 'tealDark', 'tealDarker',
    'greenLighter', 'green', 'greenDark',
    'yellowLighter', 'yellow', 'yellowDark',
    'orange',
    'redLighter', 'red', 'redDark',
    'purple'
  ];

  this.render(hbs`{{polaris-icon source="add" color=color}}`);

  // Check without any color set first.
  const icon = find(iconSelector);
  assert.equal(icon.classList.length, 2, 'icon without color does not add color class');

  // Check all the available colors.
  for (const color of colors) {
    this.set('color', color);

    const colorClass = `Polaris-Icon--color${classify(color)}`;
    assert.ok(icon.classList.contains(colorClass), `icon with ${color} color applies ${colorClass} class`);
    assert.equal(icon.classList.length, 3, `icon with ${color} color does not add other color classes`);
  }
});

test('it handles backdrop correctly', function(assert) {
  this.render(hbs`{{polaris-icon source="add" backdrop=backdrop}}`);

  // Check default setting.
  const icon = find(iconSelector);
  const backdropClass = 'Polaris-Icon--hasBackdrop';
  assert.notOk(icon.classList.contains(backdropClass), 'icon without backdrop set does not apply backdrop class');

  this.set('backdrop', true);
  assert.ok(icon.classList.contains(backdropClass), `icon with backdrop=true applies backdrop class`);

  this.set('backdrop', false);
  assert.notOk(icon.classList.contains(backdropClass), `icon with backdrop=false does not apply backdrop class`);
});

test('it handles accessibilityLabel correctly', function(assert) {
  this.render(hbs`{{polaris-icon source="add" accessibilityLabel=accessibilityLabel}}`);

  // Check default setting.
  const icon = find(iconSelector);
  assert.notOk(icon.attributes['aria-label'], 'no accessibilityLabel set - does not add aria-label attribute');

  this.set('accessibilityLabel', 'This is the accessibility label');
  assert.ok(icon.attributes['aria-label'], 'accessibilityLabel set - adds aria-label attribute');
  assert.equal(icon.attributes['aria-label'].value, 'This is the accessibility label', 'accessibilityLabel set - adds correct aria-label value');
});

test('it handles placeholder icons correctly', function(assert) {
  this.render(hbs`{{polaris-icon source="placeholder"}}`);

  const iconPlaceholderSelector = buildNestedSelector(iconSelector, 'div.Polaris-Icon__Placeholder');
  const iconPlaceholders = findAll(iconPlaceholderSelector);
  assert.equal(iconPlaceholders.length, 1, 'renders one icon placeholder');
});
