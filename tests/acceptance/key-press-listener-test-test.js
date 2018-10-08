import { module, test } from 'qunit';
import { visit, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | key press listener test', function(hooks) {
  setupApplicationTest(hooks);

  test('hidden easter egg works with key m only on index page', async function(assert) {
    await visit('/');

    let easterEggBanner = '[data-test-banner="easter-egg-banner"]';
    assert.dom(easterEggBanner).doesNotExist();

    await triggerKeyEvent('.ember-application', 'keydown', 'KeyM');
    assert.dom(easterEggBanner).exists();

    await visit('/test');
    await triggerKeyEvent('.ember-application', 'keydown', 'KeyM');
    assert.dom(easterEggBanner).exists(`Event doesn't trigger on other pages`);

    await visit('/');
    await triggerKeyEvent('.ember-application', 'keydown', 'KeyM');
    assert
      .dom(easterEggBanner)
      .doesNotExist(`Event doesn't trigger on other pages`);
  });
});
