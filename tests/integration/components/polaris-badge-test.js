import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris badge', function (hooks) {
  setupRenderingTest(hooks);

  const badgeSelector = '.Polaris-Badge';

  test('it renders the correct HTML in basic inline usage', async function (assert) {
    await render(hbs`{{polaris-badge text="Inline badge"}}`);

    assert.dom(badgeSelector).exists({ count: 1 }, 'renders one badge');
    assert
      .dom(badgeSelector)
      .hasText('Inline badge', 'renders the correct badge content');
  });

  test('it renders the correct HTML in basic block usage', async function (assert) {
    await render(hbs`
      {{#polaris-badge}}
        Block badge
      {{/polaris-badge}}
    `);

    assert.dom(badgeSelector).exists({ count: 1 }, 'renders one badge');
    assert
      .dom(badgeSelector)
      .hasText('Block badge', 'renders the correct badge content');
  });

  test('it renders the correct HTML when status is set', async function (assert) {
    await render(hbs`
      {{#polaris-badge status=status}}
        Block badge
      {{/polaris-badge}}
    `);

    let badge = find(badgeSelector);
    let visuallyHiddenSelector = buildNestedSelector(
      badgeSelector,
      'span.Polaris-VisuallyHidden'
    );

    // With status unset:
    //  - shouldn't apply any status classes
    //  - shouldn't render any visually hidden components
    assert.equal(
      badge.className.indexOf('Polaris-Badge--status'),
      -1,
      'status not set - does not apply status classes'
    );
    assert
      .dom(visuallyHiddenSelector)
      .doesNotExist(
        'status not set - does not render any visually hidden components'
      );

    // With status set to default:
    //  - shouldn't apply any status classes
    //  - should render empty visually hidden component
    this.set('status', 'default');
    assert.equal(
      badge.className.indexOf('Polaris-Badge--status'),
      -1,
      'status set to default - does not apply status classes'
    );
    assert
      .dom(visuallyHiddenSelector)
      .doesNotExist(
        'status set to default - does not render any visually hidden components'
      );

    // With status set to success:
    //  - should apply success status class
    //  - should render visually hidden component with success text
    this.set('status', 'success');
    assert
      .dom(badgeSelector)
      .hasClass(
        'Polaris-Badge--statusSuccess',
        'status set to success - applies correct status class'
      );
    assert
      .dom(visuallyHiddenSelector)
      .hasText(
        'Success',
        'status set to success - renders correct visually hidden content'
      );

    // With status set to info:
    //  - should apply info status class
    //  - should render visually hidden component with info text
    this.set('status', 'info');
    assert
      .dom(badge)
      .hasClass(
        'Polaris-Badge--statusInfo',
        'status set to info - applies correct status class'
      );
    assert
      .dom(visuallyHiddenSelector)
      .hasText(
        'Info',
        'status set to info - renders correct visually hidden content'
      );

    // With status set to attention:
    //  - should apply attention status class
    //  - should render visually hidden component with attention text
    this.set('status', 'attention');
    assert
      .dom(badge)
      .hasClass(
        'Polaris-Badge--statusAttention',
        'status set to attention - applies correct status class'
      );
    assert
      .dom(visuallyHiddenSelector)
      .hasText(
        'Attention',
        'status set to attention - renders correct visually hidden content'
      );

    // With status set to warning:
    //  - should apply warning status class
    //  - should render visually hidden component with warning text
    this.set('status', 'warning');
    assert
      .dom(badge)
      .hasClass(
        'Polaris-Badge--statusWarning',
        'status set to warning - applies correct status class'
      );
    assert
      .dom(visuallyHiddenSelector)
      .hasText(
        'Warning',
        'status set to warning - renders correct visually hidden content'
      );

    // With status set to new:
    //  - should apply new status class
    //  - should render visually hidden component with new text
    this.set('status', 'new');
    assert
      .dom(badge)
      .hasClass(
        'Polaris-Badge--statusNew',
        'status set to new - applies correct status class'
      );
    assert
      .dom(visuallyHiddenSelector)
      .hasText(
        'New',
        'status set to new - renders correct visually hidden content'
      );
  });

  test('it renders the correct HTML when progress is set', async function (assert) {
    await render(hbs`
      {{#polaris-badge progress=progress}}
        Block badge
      {{/polaris-badge}}
    `);

    let badge = find(badgeSelector);
    let badgePipSelector = '.Polaris-Badge__Pip';
    let badgePipVisuallyHiddenSelector = buildNestedSelector(
      '.Polaris-Badge__Pip',
      '.Polaris-VisuallyHidden'
    );

    // With progress unset:
    //  - shouldn't apply any progress classes
    //  - shouldn't render any visually hidden components
    assert.equal(
      badge.className.indexOf('Polaris-Badge--progress'),
      -1,
      'progress not set - does not apply progress classes'
    );
    assert
      .dom(badgePipSelector)
      .doesNotExist('progress not set - does not render a pip div');
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .doesNotExist(
        'progress not set - does not render a pip visually hidden component'
      );

    // With progress set to default:
    //  - shouldn't apply any progress classes
    //  - shouldn't render any visually hidden components
    this.set('progress', 'default');
    assert.equal(
      badge.className.indexOf('Polaris-Badge--progress'),
      -1,
      'progress set to default - does not apply progress classes'
    );
    assert
      .dom(badgePipSelector)
      .doesNotExist('progress set to default - does not render a pip div');
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .doesNotExist(
        'progress set to default - does not render a pip visually hidden component'
      );

    // With progress set to 'incomplete':
    //  - should apply an incomplete progress class
    //  - should render visually hidden component with incomplete text
    this.set('progress', 'incomplete');
    assert
      .dom(badge)
      .hasClass(
        'Polaris-Badge--progressIncomplete',
        'progress set to incomplete - applies correct progress class'
      );
    assert
      .dom(badgePipSelector)
      .exists('progress set to incomplete - renders one pip div');
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .exists(
        'progress set to incomplete - renders one pip visually hidden component'
      );
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .hasText(
        'Incomplete',
        'progress set to incomplete - renders correct pip visually hidden content'
      );

    // With progress set to 'partiallyComplete':
    //  - should apply an incomplete progress class
    //  - should render visually hidden component with incomplete text
    this.set('progress', 'partiallyComplete');
    assert
      .dom(badge)
      .hasClass(
        'Polaris-Badge--progressPartiallyComplete',
        'progress set to partiallyComplete - applies correct progress class'
      );
    assert
      .dom(badgePipSelector)
      .exists('progress set to partiallyComplete - renders one pip div');
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .exists(
        'progress set to partiallyComplete - renders one pip visually hidden component'
      );
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .hasText(
        'Partially complete',
        'progress set to partiallyComplete - renders correct pip visually hidden content'
      );

    // With progress set to 'complete':
    //  - should apply a complete progress class
    //  - should render visually hidden component with complete text
    this.set('progress', 'complete');
    assert
      .dom(badge)
      .hasClass(
        'Polaris-Badge--progressComplete',
        'progress set to complete - applies correct progress class'
      );
    assert
      .dom(badgePipSelector)
      .exists('progress set to complete - renders one pip div');
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .exists(
        'progress set to complete - renders one pip visually hidden component'
      );
    assert
      .dom(badgePipVisuallyHiddenSelector)
      .hasText(
        'Complete',
        'progress set to complete - renders correct pip visually hidden content'
      );
  });

  test('supports passing a @class argument for backwards compatibility', async function (assert) {
    await render(hbs`
      {{polaris-badge class="custom-class"}}
    `);

    assert
      .dom(badgeSelector)
      .hasClass(
        'custom-class',
        'applies `class` when used in curly-brackets form'
      );

    await render(hbs`
      <PolarisBadge @class="custom-class" />
    `);
    assert
      .dom(badgeSelector)
      .hasClass(
        'custom-class',
        'applies `@class` when used in angle-brackets form'
      );

    await render(hbs`
      <PolarisBadge class="custom-class" />
    `);
    assert
      .dom(badgeSelector)
      .hasClass(
        'custom-class',
        'applies `class` when used in angle-brackets form'
      );
  });
});
