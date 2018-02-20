import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-skeleton-body-text', 'Integration | Component | polaris skeleton body text', {
  integration: true
});

const containerSelector = 'div.Polaris-SkeletonBodyText__SkeletonBodyTextContainer';
const lineSelector = buildNestedSelector(
  containerSelector,
  'div.Polaris-SkeletonBodyText'
);

test('it renders the specified number of lines', function(assert) {
  this.render(hbs`{{polaris-skeleton-body-text lines=lines}}`);

  let containers = findAll(containerSelector);
  assert.equal(containers.length, 1, 'renders one skeleton body text container');

  let lines = findAll(lineSelector);
  assert.equal(lines.length, 3, 'lines not specified - renders three skeleton body text lines');

  this.set('lines', 1);
  lines = findAll(lineSelector);
  assert.equal(lines.length, 1, 'lines set to 1 - renders one skeleton body text line');

  this.set('lines', 5);
  lines = findAll(lineSelector);
  assert.equal(lines.length, 5, 'lines set to 5 - renders five skeleton body text lines');
});
