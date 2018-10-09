import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  initialize,
  triggerKeyDown,
  triggerKeyPress,
  triggerKeyUp,
} from 'ember-keyboard';

module('Integration | Component | key-event-listener', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    initialize();
  });

  test('it can handle keyDown', async function(assert) {
    this.set('onKeyDown', function() {
      assert.step('key-down');
    });
    await render(hbs`{{key-event-listener key="KeyA" onKeyDown=onKeyDown}}`);

    triggerKeyDown('KeyA');
    assert.verifySteps(['key-down'], 'key down should work');
  });

  test('it can handle keyUp', async function(assert) {
    this.set('onKeyUp', function() {
      assert.step('key-up');
    });
    await render(hbs`{{key-event-listener key="KeyA" onKeyUp=onKeyUp}}`);

    triggerKeyUp('KeyA');
    assert.verifySteps(['key-up'], 'key up should work');
  });

  test('it can handle keyPress', async function(assert) {
    this.set('onKeyPress', function() {
      assert.step('key-press');
    });
    await render(hbs`{{key-event-listener key="KeyA" onKeyPress=onKeyPress}}`);

    triggerKeyPress('KeyA');
    assert.verifySteps(['key-press'], 'key press should work');
  });

  test('it can handle dynamic actions', async function(assert) {
    this.setProperties({
      keyPressAction: (msg) => assert.step(msg),
      isEverythingGood: false,
    });
    await render(hbs`{{key-event-listener
      key="KeyA"
      onKeyPress=(action
        (if isEverythingGood
          (action keyPressAction "Lookin good")
          (action keyPressAction "Abandon ship")
        )
      )
    }}`);

    triggerKeyPress('KeyA');
    assert.verifySteps(['Abandon ship']);

    this.set('isEverythingGood', true);

    triggerKeyPress('KeyA');
    assert.verifySteps(['Lookin good']);
  });
});
