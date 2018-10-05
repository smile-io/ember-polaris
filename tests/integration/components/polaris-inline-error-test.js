import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-inline-error', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function(assert) {
    this.setProperties({
      message: "Message can't be blank",
      fieldID: 'uniqueID',
    });

    await render(hbs`
      {{polaris-inline-error
        message=message
        fieldID=fieldID
      }}
    `);

    assert.dom('[data-test-inline-error]').exists();
    assert
      .dom('[data-test-inline-error]')
      .hasClass('Polaris-InlineError', 'has correct class applied');
    assert
      .dom('[data-test-inline-error]')
      .hasText(this.message, 'has correct message');
    assert
      .dom('[data-test-inline-error]')
      .hasAttribute(
        'id',
        `${this.fieldID}Error`,
        'has ID generated from the fieldID'
      );
    assert
      .dom('[data-test-inline-error-icon]')
      .exists('renders inline error icon');
    assert
      .dom('[data-test-inline-error-icon]')
      .hasClass('Polaris-InlineError__Icon', 'error icon has correct class');

    this.set('message', null);
    assert
      .dom('[data-test-inline-error]')
      .doesNotExist('does not renders when message is not truthy');
  });

  test('works with `message` being a component', async function(assert) {
    this.setProperties({
      message: "Message can't be blank",
      fieldID: 'uniqueID',
    });

    await render(hbs`
      {{polaris-inline-error
        fieldID=fieldID
        message=(component "polaris-display-text" text=message)
      }}
    `);

    assert
      .dom('[data-test-inline-error] > .Polaris-DisplayText')
      .exists('renders `message` as a component');
  });
});
