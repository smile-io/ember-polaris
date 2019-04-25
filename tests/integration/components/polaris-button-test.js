import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  focus,
  blur,
  triggerKeyEvent,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

module('Integration | Component | polaris-button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  module('<Button />', function() {
    module('url', function() {
      hooks.beforeEach(function() {
        this.set('mockUrl', 'http://google.com');
      });

      test('renders a link when present', async function(assert) {
        await render(hbs`{{polaris-button url=mockUrl}}`);
        assert.dom('a[data-polaris-unstyled]').exists();
      });

      test('gets passed into the link', async function(assert) {
        await render(hbs`{{polaris-button url=mockUrl}}`);
        assert
          .dom('a[data-polaris-unstyled]')
          .hasAttribute('href', this.get('mockUrl'));
      });

      test('renders a button when not present', async function(assert) {
        await render(hbs`{{polaris-button}}`);
        assert.dom('button').exists();
      });
    });

    module('children', function() {
      test('renders the given children into the button', async function(assert) {
        this.set('label', 'Click me!');
        await render(hbs`{{#polaris-button}}{{label}}{{/polaris-button}}`);
        assert.dom('button').hasText(this.get('label'));
      });

      test('renders the given children into the link', async function(assert) {
        this.set('label', 'Click me!');
        await render(
          hbs`{{#polaris-button url="http://google.com"}}{{label}}{{/polaris-button}}`
        );
        assert.dom('a').hasText(this.get('label'));
      });
    });

    module('id', function() {
      test('is passed into the button', async function(assert) {
        this.set('id', 'MyID');
        await render(hbs`{{polaris-button id=id}}`);
        assert.dom('button').hasAttribute('id', this.get('id'));
      });

      test('is passed into the link', async function(assert) {
        this.set('id', 'MyID');
        await render(hbs`{{polaris-button url="https://shopify.com" id=id}}`);
        assert.dom('a').hasAttribute('id', this.get('id'));
      });
    });

    module('disabled', function() {
      test('disable without a url renders <button disabled>', async function(assert) {
        await render(hbs`{{polaris-button disabled=true}}`);
        assert.dom('button').hasAttribute('disabled');
      });

      test('disable with a url renders <a> without an href (as <a disabled> is invalid HTML)>', async function(assert) {
        await render(hbs`
          {{polaris-button disabled=true url="http://google.com"}}
        `);
        assert.dom('a').doesNotHaveAttribute('href');
      });
    });

    module('loading', function() {
      test('loading without a url renders <button disabled>', async function(assert) {
        await render(hbs`{{polaris-button loading=true}}`);
        assert.dom('button').hasAttribute('disabled');
      });

      test('loading with a url renders <a> without an href (as <a disabled> is invalid HTML)', async function(assert) {
        await render(hbs`
          {{polaris-button disabled=true url="http://google.com"}}
        `);
        assert.dom('a').doesNotHaveAttribute('href');
      });

      test('renders a spinner into the button', async function(assert) {
        await render(hbs`{{polaris-button loading=true}}`);
        assert.dom('[data-test-spinner]').exists();
      });

      test('renders a spinner into the link', async function(assert) {
        await render(hbs`
          {{#polaris-button loading=true url="http://google.com"}}
            Click me!
          {{/polaris-button}}
        `);
        assert.dom('[data-test-spinner]').exists();
      });

      test('sets an alert role on the button', async function(assert) {
        await render(hbs`{{polaris-button loading=true}}`);
        assert.dom('button').hasAttribute('role', 'alert');
      });

      test('sets aria-busy on the button', async function(assert) {
        await render(hbs`{{polaris-button loading=true}}`);
        assert.dom('button').hasAttribute('aria-busy', 'true');
      });
    });

    module('submit', function() {
      test('sets a submit type on the button when present', async function(assert) {
        await render(hbs`{{polaris-button submit=true}}`);
        assert.dom('button').hasAttribute('type', 'submit');
      });

      test('sets a button type on the button when not present', async function(assert) {
        await render(hbs`{{polaris-button}}`);
        assert.dom('button').hasAttribute('type', 'button');
      });
    });

    module('external', function() {
      test('gets passed into the link', async function(assert) {
        await render(hbs`
          {{polaris-button url="http://google.com" external=true}}
        `);
        assert.dom('[data-polaris-unstyled]').hasAttribute('target', '_blank');
      });

      test('is false when not set', async function(assert) {
        await render(hbs`{{polaris-button url="http://google.com"}}`);
        assert.dom('[data-polaris-unstyled]').doesNotHaveAttribute('target');
      });
    });

    module('download', function() {
      test('gets passed into the link as a boolean', async function(assert) {
        await render(hbs`{{polaris-button url="/foo" download=true}}`);
        assert.dom('[data-polaris-unstyled]').hasAttribute('download', 'true');
      });

      test('gets passed into the link as a string', async function(assert) {
        await render(hbs`
          {{polaris-button url="/foo" download="file.txt"}}
        `);
        assert
          .dom('[data-polaris-unstyled]')
          .hasAttribute('download', 'file.txt');
      });

      test('is false when not set', async function(assert) {
        await render(hbs`{{polaris-button url="http://google.com"}}`);
        assert.dom('[data-polaris-unstyled]').doesNotHaveAttribute('download');
      });
    });

    module('icon', function() {
      test('renders an icon if it’s a string', async function(assert) {
        this.set('source', 'polaris/delete');
        await render(hbs`{{polaris-button icon=source}}`);
        assert.dom('svg').hasAttribute('data-icon-source', this.get('source'));
      });

      test('renders a component if it is one', async function(assert) {
        await render(
          hbs`{{polaris-button icon=(component "wrapper-element" id="icon-component")}}`
        );
        assert.dom('#icon-component').exists();
      });

      test('does not render the markup for the icon if none is provided', async function(assert) {
        await render(hbs`{{polaris-button}}`);
        assert.dom('.Polaris-Button__Icon').doesNotExist();
      });
    });

    module('accessibilityLabel', function() {
      test('sets an aria-label on the button', async function(assert) {
        this.set('label', 'This deletes a thing');
        await render(hbs`
          {{polaris-button accessibilityLabel=label}}
        `);
        assert.dom('button').hasAttribute('aria-label', this.get('label'));
      });

      test('sets an aria-label on the link', async function(assert) {
        this.set('label', 'This deletes a thing');
        await render(hbs`
          {{polaris-button accessibilityLabel=label url="http://google.com"}}
        `);
        assert
          .dom('[data-polaris-unstyled]')
          .hasAttribute('aria-label', this.get('label'));
      });
    });

    module('ariaControls', function() {
      test('sets an aria-controls on the button', async function(assert) {
        this.set('id', 'panel1');
        await render(hbs`{{polaris-button ariaControls=id}}`);
        assert.dom('button').hasAttribute('aria-controls', this.get('id'));
      });
    });

    module('ariaExpanded', function() {
      test('sets an aria-expended on the button', async function(assert) {
        await render(hbs`{{polaris-button ariaExpanded=true}}`);
        assert.dom('button').hasAttribute('aria-expanded', 'true');
      });
    });

    module('ariaPressed', function() {
      test('sets an aria-pressed on the button', async function(assert) {
        await render(hbs`{{polaris-button ariaPressed=true}}`);
        assert.dom('button').hasAttribute('aria-pressed', 'true');
      });
    });

    module('onClick()', function() {
      test('is called when the button is clicked', async function(assert) {
        let clickCount = 0;
        this.set('incrementClickCount', () => clickCount++);
        await render(
          hbs`{{polaris-button onClick=(action incrementClickCount)}}`
        );
        await click('button');
        assert.equal(clickCount, 1);
      });

      test('does not receive any params when the button is clicked', async function(assert) {
        await render(
          hbs`{{polaris-button onClick=(action (mut invocationParam))}}`
        );
        await click('button');
        assert.equal(this.get('invocationParam'), undefined);
      });

      test('is called when the link is clicked', async function(assert) {
        let clickCount = 0;
        this.set('incrementClickCount', () => clickCount++);
        await render(hbs`
          {{polaris-button onClick=(action incrementClickCount) url="#"}}
        `);
        await click('[data-polaris-unstyled]');
        assert.equal(clickCount, 1);
      });

      test('does not receive any params when the link is clicked', async function(assert) {
        await render(
          hbs`{{polaris-button onClick=(action (mut invocationParam)) url="#"}}`
        );
        await click('[data-polaris-unstyled]');
        assert.equal(this.get('invocationParam'), undefined);
      });
    });

    module('onFocus()', function() {
      test('is called when the button is focussed', async function(assert) {
        let focusCount = 0;
        this.set('incrementFocusCount', () => focusCount++);
        await render(
          hbs`{{polaris-button onFocus=(action incrementFocusCount)}}`
        );
        await focus('button');
        assert.equal(focusCount, 1);
      });

      test('is called when the link is focussed', async function(assert) {
        let focusCount = 0;
        this.set('incrementFocusCount', () => focusCount++);
        await render(hbs`
          {{polaris-button onFocus=(action incrementFocusCount) url="http://google.com"}}
        `);
        await focus('[data-polaris-unstyled]');
        assert.equal(focusCount, 1);
      });
    });

    module('onBlur()', function() {
      test('is called when the button is blurred', async function(assert) {
        let blurCount = 0;
        this.set('incrementBlurCount', () => blurCount++);
        await render(
          hbs`{{polaris-button onBlur=(action incrementBlurCount)}}`
        );
        await focus('button');
        await blur('button');
        assert.equal(blurCount, 1);
      });

      test('is called when the link is blurred', async function(assert) {
        let blurCount = 0;
        this.set('incrementBlurCount', () => blurCount++);
        await render(hbs`
          {{polaris-button onBlur=(action incrementBlurCount) url="http://google.com"}}
        `);
        await focus('[data-polaris-unstyled]');
        await blur('[data-polaris-unstyled]');
        assert.equal(blurCount, 1);
      });
    });

    module('onKeyPress()', function() {
      test('is called when a keypress event is registered on the button', async function(assert) {
        await render(
          hbs`{{#polaris-button onKeyPress=(action (mut keyEventData))}}Test{{/polaris-button}}`
        );
        await triggerKeyEvent('button', 'keypress', 'J');
        assert.equal(this.get('keyEventData.key'), 'J');
      });
    });

    module('onKeyUp()', function() {
      test('is called when a keyup event is registered on the button', async function(assert) {
        await render(
          hbs`{{#polaris-button onKeyUp=(action (mut keyEventData))}}Test{{/polaris-button}}`
        );
        await triggerKeyEvent('button', 'keyup', 'J');
        assert.equal(this.get('keyEventData.key'), 'J');
      });
    });

    module('onKeyDown()', function() {
      test('is called when a keydown event is registered on the button', async function(assert) {
        await render(
          hbs`{{#polaris-button onKeyDown=(action (mut keyEventData))}}Test{{/polaris-button}}`
        );
        await triggerKeyEvent('button', 'keydown', 'J');
        assert.equal(this.get('keyEventData.key'), 'J');
      });
    });
  });
});
