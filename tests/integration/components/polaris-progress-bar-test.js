import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris progress bar', function (hooks) {
  setupRenderingTest(hooks);

  const barSelector = '[data-test-progress-bar]';
  const barProgressSelector = '[data-test-progress-bar-progress]';
  const barIndicatorSelector = '[data-test-progress-bar-indicator]';
  const barIndicatorLabelSelector = '[data-test-progress-bar-indicator-label]';

  test('it renders the correct HTML when progress and size are set', async function (assert) {
    this.set('progress', 23);
    let percentStyle = `width: ${this.progress}%;`;
    let percentLabel = `${this.progress}%`;

    await render(hbs`{{polaris-progress-bar progress=progress size='small'}}`);

    assert
      .dom(barSelector)
      .hasClass('Polaris-ProgressBar', 'has correct default class applied');
    assert
      .dom(barSelector)
      .hasClass('Polaris-ProgressBar--sizeSmall', 'has small class applied');
    assert
      .dom(buildNestedSelector(barSelector, barProgressSelector))
      .exists('renders the progress element');

    assert
      .dom(barProgressSelector)
      .hasClass(
        'Polaris-ProgressBar__Progress',
        'bar progress has correct class applied'
      );
    assert
      .dom(barProgressSelector)
      .hasAttribute('max', '100', 'bar progress has max attribute set to 100');
    assert
      .dom(barProgressSelector)
      .hasAttribute(
        'value',
        `${this.progress}`,
        'bar progress has correct value attribute'
      );

    assert
      .dom(buildNestedSelector(barSelector, barIndicatorSelector))
      .exists('renders the bar indicator');
    assert
      .dom(barIndicatorSelector)
      .hasClass(
        'Polaris-ProgressBar__Indicator',
        'indicator has correct class applied'
      );
    assert
      .dom(barIndicatorSelector)
      .hasAttribute(
        'style',
        percentStyle,
        'indicator has correct width style applied'
      );

    assert
      .dom(buildNestedSelector(barIndicatorSelector, barIndicatorLabelSelector))
      .exists('renders the bar label indicator');
    assert
      .dom(barIndicatorLabelSelector)
      .hasClass(
        'Polaris-ProgressBar__Label',
        'indicator label has correct class applied'
      );
    assert
      .dom(barIndicatorLabelSelector)
      .hasText(percentLabel, 'indicator label has correct text');
  });

  test('it renders a correctly-sized progress bar', async function (assert) {
    this.set('size', '');
    await render(hbs`{{polaris-progress-bar size=size}}`);

    // No size should default to medium
    assert
      .dom(barSelector)
      .hasClass(
        'Polaris-ProgressBar--sizeMedium',
        'no size - applies medium size class'
      );

    this.set('size', 'small');
    assert
      .dom(barSelector)
      .hasClass(
        'Polaris-ProgressBar--sizeSmall',
        'no size - applies small size class'
      );

    this.set('size', 'medium');
    assert
      .dom(barSelector)
      .hasClass(
        'Polaris-ProgressBar--sizeMedium',
        'no size - applies medium size class'
      );

    this.set('size', 'medium');
    assert
      .dom(barSelector)
      .hasClass(
        'Polaris-ProgressBar--sizeMedium',
        'no size - applies medium size class'
      );

    this.set('size', 'large');
    assert
      .dom(barSelector)
      .hasClass(
        'Polaris-ProgressBar--sizeLarge',
        'no size - applies large size class'
      );

    this.set('size', 'unsupported');
    assert
      .dom(barSelector)
      .hasClass(
        'Polaris-ProgressBar--sizeMedium',
        'no size - applies medium size class'
      );
  });

  test('it correctly handles out-of-bounds progress values', async function (assert) {
    this.set('progress', -23);
    await render(hbs`{{polaris-progress-bar progress=progress}}`);

    assert
      .dom(barProgressSelector)
      .hasAttribute(
        'value',
        '0',
        'sets the progress element to 0 when the progress is negative'
      );

    this.set('progress', -Infinity);
    assert
      .dom(barProgressSelector)
      .hasAttribute(
        'value',
        '0',
        'sets the progress element to 0 when the progress is negative infinity'
      );

    this.set('progress', 145);
    assert
      .dom(barProgressSelector)
      .hasAttribute(
        'value',
        '100',
        'sets the progress element to 100 when the progress is greater than 100'
      );

    this.set('progress', Infinity);
    assert
      .dom(barProgressSelector)
      .hasAttribute(
        'value',
        '100',
        'sets the progress element to 100 when the progress is infinite'
      );

    this.set('progress', null);
    assert
      .dom(barProgressSelector)
      .doesNotHaveAttribute(
        'value',
        'does not set the progress element value when progress is null'
      );

    this.set('progress', 'a string');
    assert
      .dom(barProgressSelector)
      .doesNotHaveAttribute(
        'value',
        'does not set the progress element value when progress is a string'
      );

    this.set('progress', undefined);
    assert
      .dom(barProgressSelector)
      .doesNotHaveAttribute(
        'value',
        'does not set the progress element value when progress is undefined'
      );
  });
});
