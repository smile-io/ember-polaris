import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { keyDown } from 'ember-keyboard/test-support/test-helpers';

module('Acceptance | key event listener test', function(hooks) {
  setupApplicationTest(hooks);

  test('hidden easter egg works with key m only on index page', async function(assert) {
    await visit('/');

    let easterEggBanner = '[data-test-banner="easter-egg-banner"]';
    assert
      .dom(easterEggBanner)
      .doesNotExist(`Easter egg banner should be hidden by default`);

    await keyDown('KeyM');
    assert
      .dom(easterEggBanner)
      .exists(`Easter egg banner should appear when m is pressed`);

    await visit('/test');
    await keyDown('KeyM');
    assert
      .dom(easterEggBanner)
      .exists(
        `Easter egg banner doesn't hide when pressing m on a page w/o the key-event-listener`
      );

    await visit('/');
    await keyDown('KeyM');
    assert
      .dom(easterEggBanner)
      .doesNotExist(
        `Easter egg banner is hidden when pressing m on index page which has key-event-listener`
      );
  });
});
