import { moduleForComponent, test } from 'ember-qunit';
import { find } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-progress-bar', 'Integration | Component | polaris progress bar', {
  integration: true
});

const BAR_SELECTOR = 'div.Polaris-ProgressBar';
const PROGRESS_SELECTOR = 'progress.Polaris-ProgressBar__Progress';
const INDICATOR_SELECTOR = 'div.Polaris-ProgressBar__Indicator';
const LABEL_SELECTOR = 'span.Polaris-ProgressBar__Label';
const PROGRESS = 23;

test('it renders the correct HTML when progress and size are set', function(assert) {
  this.render(hbs`{{polaris-progress-bar progress=23 size='small'}}`);

  let barNode = find(BAR_SELECTOR);
  let progressNode = find( buildNestedSelector(BAR_SELECTOR, PROGRESS_SELECTOR) );
  let indicatorNode = find( buildNestedSelector(BAR_SELECTOR, INDICATOR_SELECTOR) );
  let labelNode = find( buildNestedSelector(INDICATOR_SELECTOR, LABEL_SELECTOR) );

  // Component renders correctly
  assert.ok(barNode, 'the progress bar container is rendered');
  assert.ok(progressNode, 'the progress node is rendered inside the container');
  assert.ok(indicatorNode, 'the indicator node is rendered inside the container');
  assert.ok(labelNode, 'the label node is rendered inside the indicator');

  // Bar attributes
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeSmall'), 'size class is added to the container');

  // Progress attributes
  assert.equal(progressNode.getAttribute('value'), PROGRESS, 'progress value attribute is correct');

  // Indicator attributes
  let percentStyle = `width: ${ PROGRESS }%;`;

  assert.equal(indicatorNode.getAttribute('style'), percentStyle, 'indicator width style is correct');

  // Label attributes
  let percentLabel = `${ PROGRESS }%`;

  assert.equal(labelNode.textContent.trim(), percentLabel, 'progress label is correct');
});

test('it renders a correctly-sized progress bar', function(assert) {
  this.set('size', '');
  this.render(hbs`{{polaris-progress-bar size=size}}`);

  let barNode = find(BAR_SELECTOR);

  // No size should default to medium
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeSmall'), 'no size - does not apply small size class');
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeMedium'), 'no size - applies medium size class');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeLarge'), 'no size - does not apply large size class');

  this.set('size', 'small');
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeSmall'), 'small size - applies small size class');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeMedium'), 'small size - does not apply medium size class');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeLarge'), 'small size - does not apply large size class');

  this.set('size', 'medium');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeSmall'), 'medium size - does not apply small size class');
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeMedium'), 'medium size - applies medium size class');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeLarge'), 'medium size - does not apply large size class');

  this.set('size', 'large');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeSmall'), 'large size - does not apply small size class');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeMedium'), 'large size - does not apply medium size class');
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeLarge'), 'large size - applies large size class');

  this.set('size', 'unsupported');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeSmall'), 'unsupported size - does not apply small size class');
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeMedium'), 'unsupported size - applies medium size class');
  assert.notOk(barNode.classList.contains('Polaris-ProgressBar--sizeLarge'), 'unsupported size - does not apply large size class');
});

test('it correctly handles out-of-bounds progress numbers', function(assert) {
  this.set('progress', -23);
  this.render(hbs`{{polaris-progress-bar progress=progress}}`);

  let progressNode = find( buildNestedSelector(BAR_SELECTOR, PROGRESS_SELECTOR) );
  let indicatorNode = find( buildNestedSelector(BAR_SELECTOR, INDICATOR_SELECTOR) );
  let labelNode = find( buildNestedSelector(INDICATOR_SELECTOR, LABEL_SELECTOR) );

  assert.equal(progressNode.getAttribute('value'), '0', 'negative progress value - value attribute limited to a min of 0');
  assert.equal(indicatorNode.style.width, '0%', 'negative progress value - indicator width limited to a min of 0%');
  assert.equal(labelNode.textContent.trim(), '0%', 'negative progress value - label limited to a min of 0% in progress label');

  this.set('progress', 145);
  assert.equal(progressNode.getAttribute('value'), '100', 'progress value over 100 - value attribute limited to a max of 100');
  assert.equal(indicatorNode.style.width, '100%', 'progress value over 100 - indicator width limited to a max of 100%');
  assert.equal(labelNode.textContent.trim(), '100%', 'progress value over 100 - label limited to a max of 100% in progress label');
});
