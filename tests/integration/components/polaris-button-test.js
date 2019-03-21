import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, click, focus, blur } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const buttonTextSelector = buildNestedSelector(
  'span.Polaris-Button__Content',
  'span:not(.Polaris-Button__Icon)'
);
const buttonIconWrapperSelector = buildNestedSelector(
  'span.Polaris-Button__Content',
  'span.Polaris-Button__Icon'
);
const buttonIconSelector = buildNestedSelector(
  buttonIconWrapperSelector,
  'span.Polaris-Icon'
);

moduleForComponent(
  'polaris-button',
  'Integration | Component | polaris button',
  {
    integration: true,

    beforeEach() {
      this.register('component:svg-jar', MockSvgJarComponent);
    },
  }
);

test('renders the correct HTML', function(assert) {
  // Basic button, no text.
  this.render(hbs`{{polaris-button}}`);

  let buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'basic button with no text - renders');

  let button = buttons[0];
  let buttonTextElement = find(buttonTextSelector, button);
  assert.notOk(
    buttonTextElement,
    'basic button with no text - does not render text content element'
  );

  // Basic button, using text attribute.
  this.render(hbs`{{polaris-button text="Look at my text"}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'basic button with text attribute - renders');

  button = buttons[0];
  let buttonText = find(buttonTextSelector, button).innerText;
  assert.equal(
    buttonText,
    'Look at my text',
    'basic button with text attribute - text'
  );

  // Basic button, block form, no content.
  this.render(hbs`{{#polaris-button}}{{/polaris-button}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(
    buttons.length,
    1,
    'basic button in block form with no text - renders'
  );

  // TODO: prevent rendering empty span.
  // button = buttons[0];
  // buttonTextElement = find(buttonTextSelector, button);
  // assert.notOk(buttonTextElement, 'basic button in block form with no text - does not render text content element');

  // Basic button, block form.
  this.render(
    hbs`{{#polaris-button}}Does this look blocky to you?{{/polaris-button}}`
  );

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'basic button in block form - renders');

  button = buttons[0];
  buttonText = find(buttonTextSelector, button).innerText;
  assert.equal(
    buttonText,
    'Does this look blocky to you?',
    'basic button in block form - text'
  );

  // With a URL.
  this.render(
    hbs`{{#polaris-button url="http://www.somewhere.com/lets-go/"}}Links zwei drei vier{{/polaris-button}}`
  );

  buttons = findAll('a.Polaris-Button');
  assert.equal(buttons.length, 1, 'link button - renders');

  button = buttons[0];
  buttonText = find(buttonTextSelector, button).innerText;
  assert.equal(buttonText, 'Links zwei drei vier', 'link button - text');

  let linkHref = button.href;
  assert.equal(
    linkHref,
    'http://www.somewhere.com/lets-go/',
    'link button - href'
  );

  let dataPolarisUnstyled = button.dataset.polarisUnstyled;
  assert.equal(
    dataPolarisUnstyled,
    'true',
    'link button - data-polaris-unstyled'
  );

  let linkTarget = button.target;
  assert.equal(linkTarget, '', 'link button - target');

  let linkRel = button.rel;
  assert.equal(linkRel, '', 'link button - rel');

  // With a URL and external flag set.
  this.render(
    hbs`{{#polaris-button url="http://www.somewhere.com/lets-go/" external=true}}Links zwei drei vier{{/polaris-button}}`
  );

  buttons = findAll('a.Polaris-Button');
  assert.equal(buttons.length, 1, 'external link button - renders');

  button = buttons[0];
  buttonText = find(buttonTextSelector, button).innerText;
  assert.equal(
    buttonText,
    'Links zwei drei vier',
    'external link button - text'
  );

  linkHref = button.href;
  assert.equal(
    linkHref,
    'http://www.somewhere.com/lets-go/',
    'external link button - href'
  );

  dataPolarisUnstyled = button.dataset.polarisUnstyled;
  assert.equal(
    dataPolarisUnstyled,
    'true',
    'external link button - data-polaris-unstyled'
  );

  linkTarget = button.target;
  assert.equal(linkTarget, '_blank', 'external link button - target');

  linkRel = button.rel;
  assert.equal(linkRel, 'noopener noreferrer', 'external link button - rel');

  // Button with primary flag set.
  this.render(hbs`{{polaris-button primary=true}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'primary button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass('Polaris-Button--primary', 'primary button - primary class');

  // Button with destructive flag set.
  this.render(hbs`{{polaris-button destructive=true}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'destructive button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass(
      'Polaris-Button--destructive',
      'destructive button - destructive class'
    );

  // Button with disabled flag set.
  this.render(hbs`{{polaris-button disabled=true}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'disabled button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass('Polaris-Button--disabled', 'disabled button - disabled class');
  assert.ok(button.disabled, 'disabled button - disabled attribute');

  // Link button with disabled flag set.
  this.render(
    hbs`{{polaris-button url="http://www.somewhere.com/lets-go/" disabled=true}}`
  );

  buttons = findAll('a.Polaris-Button');
  assert.equal(buttons.length, 1, 'disabled link button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass(
      'Polaris-Button--disabled',
      'disabled link button - disabled class'
    );
  assert.notOk(
    button.attributes['href'],
    'disabled link button - does not have href'
  );

  // Slim button.
  this.render(hbs`{{polaris-button size="slim"}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'slim button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass('Polaris-Button--sizeSlim', 'slim button - slim class');
  assert
    .dom(button)
    .hasNoClass('Polaris-Button--sizeLarge', 'slim button - no large class');

  // Large button.
  this.render(hbs`{{polaris-button size="large"}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'large button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass('Polaris-Button--sizeLarge', 'large button - large class');
  assert
    .dom(button)
    .hasNoClass('Polaris-Button--sizeSlim', 'large button - no slim class');

  // Button with outline flag set.
  this.render(hbs`{{polaris-button outline=true}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'outline button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass('Polaris-Button--outline', 'outline button - outline class');

  // Button with fullWidth flag set.
  this.render(hbs`{{polaris-button fullWidth=true}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'fullWidth button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass(
      'Polaris-Button--fullWidth',
      'fullWidth button - fullWidth class'
    );

  // Button with submit flag set.
  this.render(hbs`{{polaris-button submit=true}}`);

  buttons = findAll('button[type="submit"].Polaris-Button');
  assert.equal(buttons.length, 1, 'submit button - renders');

  // Button with plain flag set.
  this.render(hbs`{{polaris-button plain=true}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'plain button - renders');

  button = buttons[0];
  assert
    .dom(button)
    .hasClass('Polaris-Button--plain', 'plain button - plain class');

  // Button with accessibility label.
  this.render(hbs`{{polaris-button accessibilityLabel="You can't see me!"}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'accessible button - renders');

  button = buttons[0];
  assert.equal(
    button.attributes['aria-label'].value,
    "You can't see me!",
    'accessible button - aria-label'
  );

  // Button with aria controls.
  this.render(hbs`{{polaris-button ariaControls=ariaControls}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'button with aria controls - renders');

  button = buttons[0];
  assert.notOk(
    button.attributes['aria-controls'],
    'button with aria controls undefined - does not set aria-controls'
  );

  this.set('ariaControls', 'some-element');
  assert.equal(
    button.attributes['aria-controls'].value,
    'some-element',
    'button with aria controls set - sets aria-controls'
  );

  // Button with aria expanded.
  this.render(hbs`{{polaris-button ariaExpanded=ariaExpanded}}`);

  buttons = findAll('button[type="button"].Polaris-Button');
  assert.equal(buttons.length, 1, 'button with aria expanded - renders');

  button = buttons[0];
  assert.notOk(
    button.attributes['aria-expanded'],
    'button with aria expanded undefined - does not set aria-expanded'
  );

  this.set('ariaExpanded', false);
  assert.equal(
    button.attributes['aria-expanded'].value,
    'false',
    'button with aria expanded set - sets aria-expanded'
  );
});

test('it supports an icon source value for `icon`', function(assert) {
  this.render(hbs`{{polaris-button icon=icon text=text}}`);

  let button = find('button.Polaris-Button');
  let icon = find(buttonIconWrapperSelector, button);
  assert.notOk(icon, 'button without icon - no icon rendered');

  this.set('icon', 'cancel');

  icon = find(buttonIconWrapperSelector, button);
  let iconSvg = find('span.Polaris-Icon > svg.Polaris-Icon__Svg', icon);
  assert.ok(icon, 'button with icon - renders icon');
  assert.equal(
    iconSvg.dataset.iconSource,
    'polaris/cancel',
    'button with icon - renders correct icon SVG'
  );
  assert
    .dom(button)
    .hasClass(
      'Polaris-Button--iconOnly',
      'button with icon - without text, has icon-only class'
    );

  this.set('text', 'Some text');
  assert
    .dom(button)
    .hasNoClass(
      'Polaris-Button--iconOnly',
      'button with icon - with text, does not have icon-only class'
    );
});

test('it supports a component value for `icon`', function(assert) {
  this.render(hbs`
    {{polaris-button
      text=""
      icon=(component "polaris-avatar"
        name="Tom"
      )
    }}
  `);

  let buttonIconComponentSelector = buildNestedSelector(
    buttonIconWrapperSelector,
    '.Polaris-Avatar'
  );

  assert
    .dom(buttonIconComponentSelector)
    .exists('component renders inside the icon wrapper');
  assert
    .dom(buttonIconSelector)
    .doesNotExist('icon is not rendered inside the icon wrapper');
});

test('it supports `disclosure`', function(assert) {
  this.render(hbs`{{polaris-button text="Click me" disclosure=disclosure}}`);

  let button = find('button.Polaris-Button');
  let disclosureIcon = find(buttonIconWrapperSelector, button);
  assert.notOk(
    disclosureIcon,
    'button without disclosure - no disclosure icon rendered'
  );

  this.set('disclosure', true);

  let contentSpans = findAll('span.Polaris-Button__Content > span', button);
  assert.equal(
    contentSpans.length,
    2,
    'button with disclosure - renders both text and disclosure icon'
  );

  disclosureIcon = contentSpans[1];
  assert
    .dom(disclosureIcon)
    .hasClass(
      'Polaris-Button__Icon',
      'button with disclosure - has disclosure icon after text'
    );
  let iconSvg = find('span.Polaris-Icon > svg', disclosureIcon);
  assert.equal(
    iconSvg.dataset.iconSource,
    'polaris/caret-down',
    'button with disclosure - uses `caret-down` as the SVG'
  );
});

test('handles events correctly', function(assert) {
  let clickHandlerCalled = false;
  this.on('click', () => {
    clickHandlerCalled = true;
  });

  let focusHandlerCalled = false;
  this.on('focus', () => {
    focusHandlerCalled = true;
  });

  let blurHandlerCalled = false;
  this.on('blur', () => {
    blurHandlerCalled = true;
  });

  this.render(hbs`{{polaris-button
    onClick=(action "click")
    onFocus=(action "focus")
    onBlur=(action "blur")
  }}`);

  const buttonSelector = 'button[type="button"].Polaris-Button';
  const buttons = findAll(buttonSelector);
  assert.equal(buttons.length, 1, 'button renders');
  assert.notOk(clickHandlerCalled, 'after render, click handler not fired');
  assert.notOk(focusHandlerCalled, 'after render, focus handler not fired');
  assert.notOk(blurHandlerCalled, 'after render, blur handler not fired');

  return focus(buttonSelector)
    .then(() => {
      assert.notOk(clickHandlerCalled, 'after focus, click handler not fired');
      assert.ok(focusHandlerCalled, 'after focus, focus handler fired');
      assert.notOk(blurHandlerCalled, 'after focus, blur handler not fired');

      return blur(buttonSelector);
    })
    .then(() => {
      assert.notOk(clickHandlerCalled, 'after blur, click handler not fired');
      assert.ok(blurHandlerCalled, 'after blur, blur handler fired');

      return click(buttonSelector);
    })
    .then(() => {
      assert.ok(clickHandlerCalled, 'after click, click handler fired');

      const focussedButton = find(`${buttonSelector}:focus`);
      assert.notOk(focussedButton, 'after click, button is not focussed');
    });
});

test('it applies passed-in classes to the rendered element when rendering a button', function(assert) {
  this.set('class', 'my-button press-me');
  this.render(hbs`{{polaris-button class=class}}`);

  let button = find('button.Polaris-Button.my-button.press-me');
  assert.ok(button, 'renders button with input classes');

  // Try updating the classes.
  this.set('class', 'press-me-to-make-something-happen');

  button = find('button.Polaris-Button.press-me-to-make-something-happen');
  assert.ok(button, 'renders button with updated classes');
  assert.dom(button).hasNoClass('my-button');
});

test('it applies passed-in classes to the rendered element when rendering a link', function(assert) {
  this.set('class', 'my-link click-me');
  this.render(
    hbs`{{polaris-button class=class url="http://www.somewhere.com/lets-go/"}}`
  );

  let linkButton = find('a.Polaris-Button.my-link.click-me');
  assert.ok(linkButton, 'renders link button with input classes');

  // Try updating the classes.
  this.set('class', 'click-me-to-go-somewhere');

  linkButton = find('a.Polaris-Button.click-me-to-go-somewhere');
  assert.ok(linkButton, 'renders link button with updated classes');
  assert.dom(linkButton).hasNoClass('my-link');
});

test('handles the loading flag correctly', function(assert) {
  this.render(hbs`{{polaris-button
    text="This is a loading button"
    icon="cancel"
    disclosure=true
    loading=loading
    primary=primary
    destructive=destructive
  }}`);

  // Before setting the loading flag, the button should show text, icon and disclosure icon.
  let button = find('button.Polaris-Button');
  assert
    .dom(button)
    .hasNoClass(
      'Polaris-Button--loading',
      'loading unset - does not have loading class'
    );
  assert
    .dom(button)
    .hasNoClass(
      'Polaris-Button--disabled',
      'loading unset - does not have disabled class'
    );

  let buttonText = find(buttonTextSelector, button).innerText;
  assert.equal(
    buttonText,
    'This is a loading button',
    'loading unset - renders correct button text'
  );

  const iconSvgSelector = buildNestedSelector(
    buttonIconWrapperSelector,
    'span.Polaris-Icon',
    'svg.Polaris-Icon__Svg'
  );
  let buttonIconSvgs = findAll(iconSvgSelector, button);
  assert.equal(
    buttonIconSvgs.length,
    2,
    'loading unset - renders icon and disclosure icon'
  );

  const spinnerSelector = buildNestedSelector(
    'span.Polaris-Button__Content',
    'span.Polaris-Button__Spinner',
    'svg.Polaris-Spinner'
  );
  let spinners = findAll(spinnerSelector, button);
  assert.equal(spinners.length, 0, 'loading unset - does not render a spinner');

  // Set the button's loading flag.
  this.set('loading', true);

  // Button should now:
  //  - have the "loading" class;
  //  - display placeholders for the icon and disclosure icon;
  //  - render a spinner;
  //  - be disabled.
  assert
    .dom(button)
    .hasClass('Polaris-Button--loading', 'loading set - has loading class');
  assert
    .dom(button)
    .hasClass('Polaris-Button--disabled', 'loading set - has disabled class');
  const iconPlaceholderSelector = buildNestedSelector(
    buttonIconWrapperSelector,
    'span.Polaris-Icon',
    'div.Polaris-Icon__Placeholder'
  );
  let iconPlaceholders = findAll(iconPlaceholderSelector, button);
  assert.equal(
    iconPlaceholders.length,
    2,
    'loading set - renders placeholders for icon and disclosure icon'
  );

  assert
    .dom(button)
    .hasClass(
      'Polaris-Button--disabled',
      'loading set - button has disabled class'
    );
  assert.ok(button.disabled, 'loading set - button is disabled');

  spinners = findAll(spinnerSelector, button);
  assert.equal(spinners.length, 1, 'loading set - renders one spinner');

  let spinner = spinners[0];
  assert
    .dom(spinner)
    .hasClass(
      'Polaris-Spinner--sizeSmall',
      'loading set - renders small spinner'
    );

  // Check the spinner color is correct for all button states.
  assert
    .dom(spinner)
    .hasClass(
      'Polaris-Spinner--colorInkLightest',
      'loading set, primary and destructive unset - uses inkLightest color for spinner'
    );

  this.set('primary', true);
  assert
    .dom(spinner)
    .hasClass(
      'Polaris-Spinner--colorWhite',
      'loading and primary set, destructive unset - uses white color for spinner'
    );

  this.set('destructive', true);
  assert
    .dom(spinner)
    .hasClass(
      'Polaris-Spinner--colorWhite',
      'loading, primary and destructive set - uses white color for spinner'
    );

  this.set('primary', false);
  assert
    .dom(spinner)
    .hasClass(
      'Polaris-Spinner--colorWhite',
      'loading and destructive set, primary unset - uses white color for spinner'
    );
});
