import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const paginationSelector = 'nav.Polaris-Pagination';

module('Integration | Component | polaris pagination', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  test('it renders correctly', async function(assert) {
    assert.expect(11);

    await render(hbs`{{polaris-pagination}}`);

    let pagination = find(paginationSelector);
    assert.ok(pagination, 'inline-mode - renders correctly');
    assert.notOk(
      pagination.classList.contains('Polaris-Pagination--plain'),
      `inline-mode - doesn't have 'plain' class`
    );

    assert.ok(
      find(
        'button.Polaris-Pagination__Button[aria-label="Previous"][disabled]'
      ),
      'inline-mode - has previous button disabled'
    );
    assert.ok(
      find('button.Polaris-Pagination__Button > span.Polaris-Icon'),
      'inline-mode - previous button has icon'
    );

    assert.ok(
      find(
        'button.Polaris-Pagination__Button[aria-label="Next"][disabled] > span.Polaris-Icon'
      ),
      'inline-mode - has next button disabled'
    );
    assert.ok(
      find('button.Polaris-Pagination__Button > span.Polaris-Icon'),
      'inline-mode - next button has icon'
    );

    assert.equal(
      pagination.attributes['aria-label'].value,
      'Pagination',
      'inline mode - has correct default aria-label attribute'
    );

    // Pagination in plain mode
    await render(hbs`{{polaris-pagination plain=true}}`);

    pagination = find(paginationSelector);
    assert.ok(
      pagination.classList.contains('Polaris-Pagination--plain'),
      'plain pagination - has `Polaris-Pagination--plain` class'
    );

    // Pagination with previous / next buttons enabled
    await render(hbs`{{polaris-pagination
      hasPrevious=true
      hasNext=true
    }}`);

    assert.ok(
      find(
        'button.Polaris-Pagination__Button[aria-label="Previous"]:not([disabled])'
      ),
      'inline-mode - has previous button enabled'
    );
    assert.ok(
      find(
        'button.Polaris-Pagination__Button[aria-label="Next"]:not([disabled])'
      ),
      'inline-mode - has next button enabled'
    );

    // Pagination with accessibility label
    await render(
      hbs`{{polaris-pagination accessibilityLabel="Accessible to all"}}`
    );

    pagination = find(paginationSelector);
    assert.equal(
      pagination.attributes['aria-label'].value,
      'Accessible to all',
      'accessibility label - sets aria-label attribute'
    );
  });

  test('it fires events correctly', async function(assert) {
    assert.expect(5);

    this.setProperties({
      previousClicked: false,
      nextClicked: false,
    });

    await render(hbs`{{polaris-pagination
      hasPrevious=true
      hasNext=true
      onPrevious=(action (mut previousClicked) true)
      onNext=(action (mut nextClicked) true)
    }}`);

    const previousButtonSelector = 'button[aria-label="Previous"]';
    click(previousButtonSelector);
    assert.ok(
      this.get('previousClicked'),
      'clicking previous button fires `onPrevious` callback'
    );
    assert.notOk(
      this.get('nextClicked'),
      'clicking previous button does not fire `onNext` callback'
    );

    let focussedButton = find(`${previousButtonSelector}:focus`);
    assert.notOk(
      focussedButton,
      'after clicking previous button, button is not focussed'
    );

    const nextButtonSelector = 'button[aria-label="Next"]';
    click(nextButtonSelector);
    assert.ok(
      this.get('nextClicked'),
      'clicking next button fires `onNext` callback'
    );

    focussedButton = find(`${nextButtonSelector}:focus`);
    assert.notOk(
      focussedButton,
      'after clicking next button, button is not focussed'
    );
  });
});
