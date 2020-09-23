import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  initialize,
  triggerKeyDown,
  triggerKeyPress,
  triggerKeyUp,
} from 'ember-keyboard';
import { compileTemplate } from '@ember/template-compilation';

module('Integration | Component | key-event-listener', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    initialize();
  });

  const interactionTriggerMap = {
    KeyDown: triggerKeyDown,
    KeyUp: triggerKeyUp,
    KeyPress: triggerKeyPress,
  };

  Object.keys(interactionTriggerMap).forEach((interaction) => {
    test(`it can handle ${interaction}`, async function (assert) {
      this.set('onKeyInteraction', () => assert.step(interaction));

      let template = compileTemplate(
        `{{key-event-listener key="KeyA" on${interaction}=(action onKeyInteraction)}}`
      );
      await render(template);

      interactionTriggerMap[interaction]('KeyA');
      assert.verifySteps([interaction], `${interaction} should work`);
    });

    test(`it can handle dynamic actions with ${interaction}`, async function (assert) {
      this.setProperties({
        onKeyInteraction: (msg) => assert.step(msg),
        isEverythingGood: false,
      });

      await render(
        compileTemplate(`{{key-event-listener
        key="KeyA"
        on${interaction}=(action
          (if isEverythingGood
            (action onKeyInteraction "Lookin good")
            (action onKeyInteraction "Abandon ship")
          )
        )
      }}`)
      );

      interactionTriggerMap[interaction]('KeyA');
      assert.verifySteps(['Abandon ship']);

      this.set('isEverythingGood', true);

      interactionTriggerMap[interaction]('KeyA');
      assert.verifySteps(['Lookin good']);
    });
  });

  test(`it can handle multiple event listeners`, async function (assert) {
    this.set('onKeyInteraction', (msg) => assert.step(msg));

    await render(
      hbs`{{key-event-listener
      key="KeyA"
      onKeyPress=(action onKeyInteraction "key-press")
      onKeyDown=(action onKeyInteraction "key-down")
      onKeyUp=(action onKeyInteraction "key-up")
    }}`
    );

    triggerKeyDown('KeyA');
    triggerKeyUp('KeyA');
    triggerKeyPress('KeyA');

    assert.verifySteps(
      ['key-down', 'key-up', 'key-press'],
      'events are triggered in the correct order'
    );
  });
});
