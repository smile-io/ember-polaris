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

module('Integration | Component | key-press-listener', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    initialize();
  });

  test('it can handle keyDown', async function(assert) {
    this.set('onKeyDown', function() {
      assert.step('key-down');
    });
    await render(hbs`{{key-press-listener key="KeyA" onKeyDown=onKeyDown}}`);

    triggerKeyDown('KeyA');
    assert.verifySteps(['key-down'], 'key down should work');
  });

  test('it can handle keyUp', async function(assert) {
    this.set('onKeyUp', function() {
      assert.step('key-up');
    });
    await render(hbs`{{key-press-listener key="KeyA" onKeyUp=onKeyUp}}`);

    triggerKeyUp('KeyA');
    assert.verifySteps(['key-up'], 'key up should work');
  });

  test('it can handle keyPress', async function(assert) {
    this.set('onKeyPress', function() {
      assert.step('key-press');
    });
    await render(hbs`{{key-press-listener key="KeyA" onKeyPress=onKeyPress}}`);

    triggerKeyPress('KeyA');
    assert.verifySteps(['key-press'], 'key press should work');
  });
});
