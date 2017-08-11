import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-text-style', 'Integration | Component | polaris text style', {
  integration: true
});

const textStyleSelector = 'span';

test('it renders the correct HTML in inline usage with default attributes', function(assert) {
  this.render(hbs`{{polaris-text-style text="Inline styled text"}}`);

  const textStyles = findAll(textStyleSelector);
  assert.equal(textStyles.length, 1, 'renders one text style component');

  const textStyle = textStyles[0];
  assert.equal(textStyle.textContent.trim(), 'Inline styled text', 'renders the correct content');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationPositive'), 'does not apply positive class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationNegative'), 'does not apply negative class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationStrong'), 'does not apply strong class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationSubdued'), 'does not apply subdued class');
});

test('it renders the correct HTML in block usage with default attributes', function(assert) {
  this.render(hbs`{{#polaris-text-style}}Block styled text{{/polaris-text-style}}`);

  const textStyles = findAll(textStyleSelector);
  assert.equal(textStyles.length, 1, 'renders one text style component');

  const textStyle = textStyles[0];
  assert.equal(textStyle.textContent.trim(), 'Block styled text', 'renders the correct content');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationPositive'), 'does not apply positive class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationNegative'), 'does not apply negative class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationStrong'), 'does not apply strong class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationSubdued'), 'does not apply subdued class');
});

test('it handles the variation attribute correctly', function(assert) {
  this.set('variation', 'positive');
  this.render(hbs`{{polaris-text-style variation=variation}}`);

  const textStyles = findAll(textStyleSelector);
  assert.equal(textStyles.length, 1, 'renders one text style component');

  const textStyle = textStyles[0];
  assert.ok(textStyle.classList.contains('Polaris-TextStyle--variationPositive'), 'positive variation - applies positive class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationNegative'), 'positive variation - does not apply negative class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationStrong'), 'positive variation - does not apply strong class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationSubdued'), 'positive variation - does not apply subdued class');

  this.set('variation', 'negative');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationPositive'), 'negative variation - does not apply positive class');
  assert.ok(textStyle.classList.contains('Polaris-TextStyle--variationNegative'), 'negative variation - applies negative class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationStrong'), 'negative variation - does not apply strong class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationSubdued'), 'negative variation - does not apply subdued class');

  this.set('variation', 'strong');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationPositive'), 'strong variation - does not apply positive class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationNegative'), 'strong variation - does not apply negative class');
  assert.ok(textStyle.classList.contains('Polaris-TextStyle--variationStrong'), 'strong variation - applies strong class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationSubdued'), 'strong variation - does not apply subdued class');

  this.set('variation', 'subdued');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationPositive'), 'subdued variation - does not apply positive class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationNegative'), 'subdued variation - does not apply negative class');
  assert.notOk(textStyle.classList.contains('Polaris-TextStyle--variationStrong'), 'subdued variation - does not apply strong class');
  assert.ok(textStyle.classList.contains('Polaris-TextStyle--variationSubdued'), 'subdued variation - applies subdued class');
});
