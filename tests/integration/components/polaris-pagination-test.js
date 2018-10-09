import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { initialize } from 'ember-keyboard';
import { keyUp } from 'ember-keyboard/test-support/test-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const paginationSelector = 'nav.Polaris-Pagination';

const prevBtnSelector = '[data-test-prev-btn]';
const nextBtnSelector = '[data-test-next-btn]';

module('Integration | Component | polaris pagination', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
    initialize();
  });

  test('it renders defaults correctly', async function(assert) {
    await render(hbs`{{polaris-pagination}}`);

    assert.dom(paginationSelector).exists('inline-mode - renders correctly');

    assert
      .dom(paginationSelector)
      .hasNoClass(
        'Polaris-Pagination--plain',
        `inline-mode - doesn't have 'plain' class`
      );

    assert
      .dom(prevBtnSelector)
      .isDisabled('inline-mode - has previous button disabled');

    assert
      .dom(nextBtnSelector)
      .isDisabled('inline-mode - has next button disabled');

    assert
      .dom(`${prevBtnSelector} > span.Polaris-Icon`)
      .exists('inline-mode - previous button has icon');

    assert
      .dom(`${nextBtnSelector} > span.Polaris-Icon`)
      .exists('inline-mode - next button has icon');

    assert
      .dom(paginationSelector)
      .hasAttribute(
        'aria-label',
        'Pagination',
        'inline mode - has correct default aria-label attribute'
      );
  });

  test('it renders plain mode correctly', async function(assert) {
    await render(hbs`{{polaris-pagination plain=true}}`);

    assert
      .dom(paginationSelector)
      .hasClass(
        'Polaris-Pagination--plain',
        'plain pagination - has `Polaris-Pagination--plain` class'
      );
  });

  test('it handles pagination with previous / next buttons enabled as expected', async function(assert) {
    await render(hbs`{{polaris-pagination
      hasPrevious=true
      hasNext=true
    }}`);

    assert
      .dom(prevBtnSelector)
      .isNotDisabled('inline-mode - has previous button enabled');

    assert
      .dom(nextBtnSelector)
      .isNotDisabled('inline-mode - has next button enabled');
  });

  test('it handles a11y ', async function(assert) {
    await render(
      hbs`{{polaris-pagination accessibilityLabel="Accessible to all"}}`
    );

    assert
      .dom(paginationSelector)
      .hasAttribute(
        'aria-label',
        'Accessible to all',
        'accessibility label - sets aria-label attribute'
      );
  });

  test('it fires events correctly', async function(assert) {
    this.set('clickAction', (msg) => assert.step(msg));

    await render(hbs`{{polaris-pagination
      hasPrevious=true
      hasNext=true
      onPrevious=(action clickAction "on-previous")
      onNext=(action clickAction "on-next")
    }}`);

    await click(prevBtnSelector);

    assert.verifySteps(
      ['on-previous'],
      'clicking previous button fires `onPrevious` callback'
    );

    assert
      .dom(prevBtnSelector)
      .isNotFocused('after clicking previous button, button is not focussed');

    await click(nextBtnSelector);

    assert.verifySteps(
      ['on-next'],
      'clicking next button fires `onNext` callback'
    );

    assert
      .dom(nextBtnSelector)
      .isNotFocused('after clicking previous button, button is not focussed');
  });

  test(`it supports navigation via 'nextKeys' & 'previousKeys'`, async function(assert) {
    this.setProperties({
      clickAction: (msg) => assert.step(msg),
      hasPrevious: true,
      hasNext: true,
    });

    await render(hbs`{{polaris-pagination
      hasPrevious=hasPrevious
      hasNext=hasNext
      previousKeys="KeyJ"
      nextKeys="KeyK"
      onPrevious=(action clickAction "on-previous")
      onNext=(action clickAction "on-next")
    }}`);

    await keyUp('KeyJ');
    assert.verifySteps(
      ['on-previous'],
      'pressing j triggers `onPrevious` action'
    );

    this.set('hasPrevious', false);
    await keyUp('KeyJ');
    assert.verifySteps(
      [],
      "pressing j when `hasPrevious` is `false` shouldn't trigger `onPrevious` action"
    );

    await keyUp('KeyK');
    assert.verifySteps(['on-next'], 'pressing k triggers `onNext` action');

    this.set('hasNext', false);
    await keyUp('KeyK');
    assert.verifySteps(
      [],
      "pressing k when `hasNext` is `false` shouldn't trigger `onNext` action"
    );
  });
});
