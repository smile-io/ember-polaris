import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const spinnerSelector = 'svg.Polaris-Spinner';

moduleForComponent('polaris-spinner', 'Integration | Component | polaris spinner', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent.extend({
      attributeBindings: [ 'role' ],
    }));
  },
});

test('renders the correct HTML with default attributes', function(assert) {
  this.render(hbs`{{polaris-spinner}}`);

  let spinners = findAll(spinnerSelector);
  assert.equal(spinners.length, 1, 'renders one spinner');

  let spinner = spinners[0];
  assert.equal(spinner.dataset.iconSource, 'polaris/spinner-large', 'renders spinner-large SVG');
  assert.ok(spinner.classList.contains('Polaris-Spinner--sizeLarge'), 'spinner size defaults to large');
  assert.ok(spinner.classList.contains('Polaris-Spinner--colorTeal'), 'spinner color defaults to teal');
  assert.equal(spinner.getAttribute('role'), 'status', 'has correct role attribute');
});

test('handles size and color correctly', function(assert) {
  // Set unsupported size and color values initially.
  this.setProperties({
    size: 'unknown',
    color: 'unknown'
  });
  this.render(hbs`{{polaris-spinner size=size color=color}}`);

  let spinners = findAll(spinnerSelector);
  assert.equal(spinners.length, 1, 'renders one spinner');

  // Check the correct defaults were used for size and color.
  let spinner = spinners[0];
  assert.equal(spinner.dataset.iconSource, 'polaris/spinner-large', 'with unsupported size - renders spinner-large SVG');
  assert.ok(spinner.classList.contains('Polaris-Spinner--sizeLarge'), 'with unsupported size - spinner size defaults to large');
  assert.ok(spinner.classList.contains('Polaris-Spinner--colorTeal'), 'with unsupported color - spinner color defaults to teal');

  // Set a color that isn't supported at large size.
  this.setProperties({
    size: 'large',
    color: 'white',
  });

  assert.equal(spinner.dataset.iconSource, 'polaris/spinner-small', 'with unsupported color for large size - renders spinner-small SVG');
  assert.ok(spinner.classList.contains('Polaris-Spinner--sizeSmall'), 'with unsupported color for large size - spinner size changes to small');
  assert.ok(spinner.classList.contains('Polaris-Spinner--colorWhite'), 'with unsupported color for large size - spinner color is honored');

  // Set a color that's supported at large size.
  this.setProperties({
    size: 'large',
    color: 'inkLightest',
  });

  assert.equal(spinner.dataset.iconSource, 'polaris/spinner-large', 'with supported color for large size - renders spinner-large SVG');
  assert.ok(spinner.classList.contains('Polaris-Spinner--sizeLarge'), 'with supported color for large size - spinner size changes to large');
  assert.ok(spinner.classList.contains('Polaris-Spinner--colorInkLightest'), 'with supported color for large size - spinner color is honored');
});

test('handles `accessibilityLabel` correctly', function(assert) {
  this.render(hbs`{{polaris-spinner accessibilityLabel="access granted"}}`);

  let spinners = findAll(spinnerSelector);
  assert.equal(spinners.length, 1, 'renders one spinner');

  let spinner = spinners[0];
  assert.equal(spinner.getAttribute('aria-label'), 'access granted', 'sets the correct aria-label');
});
