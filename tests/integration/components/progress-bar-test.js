import { moduleForComponent, test } from 'ember-qunit';
import { find } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('progress-bar', 'Integration | Component | progress bar', {
  integration: true
});

const BAR_SELECTOR = '.Polaris-ProgressBar';
const PROGRESS_SELECTOR = '.Polaris-ProgressBar__Progress';
const INDICATOR_SELECTOR = '.Polaris-ProgressBar__Indicator';
const LABEL_SELECTOR = '.Polaris-ProgressBar__Label';
const PROGRESS = 23;

test('it renders the correct HTML when progress and size are set', function(assert) {
  this.render(hbs`{{progress-bar progress=23 size='small'}}`);

  let barNode = find(BAR_SELECTOR);
  let progressNode = find( buildNestedSelector(BAR_SELECTOR, PROGRESS_SELECTOR) );
  let indicatorNode = find( buildNestedSelector(BAR_SELECTOR, INDICATOR_SELECTOR) );
  let labelNode = find( buildNestedSelector(INDICATOR_SELECTOR, LABEL_SELECTOR) );

  // component renders correctly
  assert.ok(barNode, 'the progress bar container is rendered');
  assert.ok(progressNode, 'the progress node is rendered inside the container');
  assert.ok(indicatorNode, 'the indicator node is rendered inside the container');
  assert.ok(labelNode, 'the label node is rendered inside the indicator');

  // bar attributes
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeSmall'), 'size class is added to the container');

  // progress attributes
  assert.equal(progressNode.getAttribute('value'), PROGRESS, 'progress value attribute is correct');

  // indicator attributes
  let percentStyle = `width: ${ PROGRESS }%;`;

  assert.equal(indicatorNode.getAttribute('style'), percentStyle, 'indicator width style is correct');

  // label attributes
  let percentLabel = `${ PROGRESS }%`;

  assert.equal(labelNode.textContent.trim(), percentLabel, 'progress label is correct');
});

test('it renders a medium sized progress bar is no size is set', function(assert) {
  this.render(hbs`{{progress-bar}}`);

  let barNode = find(BAR_SELECTOR);

  // bar attributes
  assert.ok(barNode.classList.contains('Polaris-ProgressBar--sizeMedium'), 'medium size class is applied to container');
});
