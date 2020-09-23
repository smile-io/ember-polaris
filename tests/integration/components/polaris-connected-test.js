import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

const leftContent = 'left content';
const rightContent = 'right content';
const yieldedContent = 'yielded content';
const connectedContainerSelector = '.Polaris-Connected';
const primaryContentSelector = buildNestedSelector(
  connectedContainerSelector,
  '.Polaris-Connected__Item--primary'
);

// These selectors are for when both `left` AND `right` attributes are passed-in
const leftContentSelector = buildNestedSelector(
  connectedContainerSelector,
  '.Polaris-Connected__Item--connection:first-of-type'
);
const rightContentSelector = buildNestedSelector(
  connectedContainerSelector,
  '.Polaris-Connected__Item--connection:last-of-type'
);

module('Integration | Component | polaris-connected', function (hooks) {
  setupRenderingTest(hooks);

  test('it does not render any connected elements if `left` or `right` attributes are missing', async function (assert) {
    this.setProperties({
      primary: yieldedContent,
    });

    await render(hbs`
      {{#polaris-connected}}
        <div class="primary-content">
          {{primary}}
        </div>
      {{/polaris-connected}}
    `);

    const primaryContentSelector = '.primary-content';

    assert
      .dom(connectedContainerSelector)
      .doesNotExist('connected component container does not get rendered');
    assert
      .dom(leftContentSelector)
      .doesNotExist('left content node does not get rendered');
    assert
      .dom(rightContentSelector)
      .doesNotExist('right content node does not get rendered');
    assert
      .dom(primaryContentSelector)
      .exists(
        'the block content still renders when connected sides are not passed in'
      );
    assert
      .dom(primaryContentSelector)
      .hasText(yieldedContent, 'block content value is correct');
  });

  test('it renders yielded content inside the primary content div', async function (assert) {
    this.setProperties({
      left: leftContent,
      right: rightContent,
      primary: yieldedContent,
    });

    // `left` and `right` are passed in here because otherwise the
    // component does not render any `Polaris-Connected` elements
    await render(hbs`
      {{#polaris-connected
        left=left
        right=right
      }}
        {{primary}}
      {{/polaris-connected}}
    `);

    assert
      .dom(primaryContentSelector)
      .exists('a primary content block is rendered');
    assert
      .dom(primaryContentSelector)
      .hasText(yieldedContent, 'the block content renders correctly');
  });

  test('it renders connected blocks when `left` and `right` are passed-in', async function (assert) {
    this.setProperties({
      left: leftContent,
      right: rightContent,
    });

    await render(hbs`
      {{#polaris-connected
        left=left
        right=right
      }}
      {{/polaris-connected}}
    `);

    assert.dom(leftContentSelector).exists('a left content block is rendered');
    assert
      .dom(rightContentSelector)
      .exists('a right content block is rendered');
    assert
      .dom(leftContentSelector)
      .hasText(leftContent, 'the left block content renders correctly');
    assert
      .dom(rightContentSelector)
      .hasText(rightContent, 'the right block content renders correctly');
  });
});
