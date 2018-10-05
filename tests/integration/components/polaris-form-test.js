import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const name = 'form-name';
const noValidate = true;
const acceptCharset = 'UTF-8';
const action = 'shopifyapi.com';
const encType = 'text/plain';
const method = 'get';
const target = '_blank';

module('Integration | Component | polaris-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function(assert) {
    this.setProperties({
      name: name,
      noValidate: noValidate,
      acceptCharset: acceptCharset,
      action: action,
      encType: encType,
      method: method,
      target: target,
      implicitSubmit: true,
    });

    await render(hbs`{{polaris-form
      acceptCharset=acceptCharset
      action=action
      autoComplete=false
      encType=encType
      implicitSubmit=implicitSubmit
      method=method
      name=name
      noValidate=noValidate
      target=target
    }}`);

    assert.dom('[data-test-form]').exists();
    assert
      .dom('[data-test-form]')
      .hasAttribute(
        'accept-charset',
        acceptCharset,
        'renders acceptCharset attribute when provided'
      );
    assert
      .dom('[data-test-form]')
      .hasAttribute('action', action, 'renders action attribute when provided');
    assert
      .dom('[data-test-form]')
      .hasAttribute(
        'autoComplete',
        'off',
        'renders autoComplete attribute when provided'
      );
    assert
      .dom('[data-test-form]')
      .hasAttribute(
        'encType',
        encType,
        'renders encType attribute when provided'
      );
    assert
      .dom('[data-test-form-button]')
      .exists('renders implicit submit button');
    assert
      .dom('[data-test-form]')
      .hasAttribute('method', method, 'renders method attribute when provided');
    assert
      .dom('[data-test-form]')
      .hasAttribute('name', name, 'renders name attribute when provided');
    assert
      .dom('[data-test-form]')
      .hasAttribute(
        'novalidate',
        '',
        'renders novalidate attribute when provided'
      );
    assert
      .dom('[data-test-form]')
      .hasAttribute('target', target, 'renders target attribute when provided');

    this.set('implicitSubmit', false);

    assert
      .dom('[data-test-form-button]')
      .doesNotExist(
        'does not render submit button when `implicitSubmit` is false'
      );
  });

  test('invokes `onSubmit` when form is submitted', async function(assert) {
    assert.expect(1);

    this.onSubmitSpy = () => {
      assert.ok('invokes `onSubmit` action');
    };

    await render(hbs`{{polaris-form
      onSubmit=(action onSubmitSpy)
    }}`);

    await triggerEvent('[data-test-form]', 'submit');
  });

  module('preventDefault', function() {
    test('allows default handler to handle submit event when set to false', async function(assert) {
      assert.expect(0);

      this.onSubmitSpy = () => {
        assert.notOk('does not invoke `onSubmit`');
      };
      this.preventDefaultSpy = () => {
        assert.notOk('does not prevents default');
      };

      await render(hbs`
        <form on-submit={{action preventDefaultSpy}}>
          {{polaris-form
            preventDefault=false
            onSubmit=(action onSubmitSpy)
          }}
        </form>
      `);

      await triggerEvent('[data-test-form]', 'submit');
    });

    test('submits the form preventing default when not provided', async function(assert) {
      assert.expect(0);

      this.onSubmitSpy = () => {
        assert.ok('invokes `onSubmit`');
      };
      this.preventDefaultSpy = () => {
        assert.ok('prevents default `submit`');
      };

      await render(hbs`
        <form on-submit={{action preventDefaultSpy}}>
          {{polaris-form
            onSubmit=(action onSubmitSpy)
          }}
        </form>
      `);

      await triggerEvent('[data-test-form]', 'submit');
    });

    test('submits the form preventing default when set to true', async function(assert) {
      assert.expect(0);

      this.onSubmitSpy = () => {
        assert.ok('invokes `onSubmit`');
      };
      this.preventDefaultSpy = () => {
        assert.ok('prevents default `submit`');
      };

      await render(hbs`
        <form on-submit={{action preventDefaultSpy}}>
          {{polaris-form
            preventDefault=true
            onSubmit=(action onSubmitSpy)
          }}
        </form>
      `);

      await triggerEvent('[data-test-form]', 'submit');
    });
  });
});
