import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('polaris-button', 'Integration | Component | polaris button', {
  integration: true
});

test('renders the correct HTML', function(assert) {
  // Basic button, using children attribute.
  this.render(hbs`{{polaris-button children="Look at my children"}}`);
  let $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'basic button with children attribute - renders');

  let buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Look at my children', 'basic button with children attribute - text');


  // Basic button, block form.
  this.render(hbs`{{#polaris-button}}Does this look blocky to you?{{/polaris-button}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'basic button in block form - renders');

  buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Does this look blocky to you?', 'basic button in block form - text');


  // With a URL.
  this.render(hbs`{{#polaris-button url="http://www.somewhere.com/lets-go/"}}Links zwei drei vier{{/polaris-button}}`);
  $button = this.$(' > a.Polaris-Button');
  assert.equal($button.length, 1, 'link button - renders');

  buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Links zwei drei vier', 'link button - text');

  let linkHref = $button.attr('href');
  assert.equal(linkHref, 'http://www.somewhere.com/lets-go/', 'link button - href');

  let dataPolarisUnstyled = $button.attr('data-polaris-unstyled');
  assert.equal(dataPolarisUnstyled, 'true', 'link button - data-polaris-unstyled');

  let linkTarget = $button.attr('target');
  assert.equal(linkTarget, undefined, 'link button - target');

  let linkRel = $button.attr('rel');
  assert.equal(linkRel, undefined, 'link button - rel');


  // With a URL and external flag set.
  this.render(hbs`{{#polaris-button url="http://www.somewhere.com/lets-go/" external=true}}Links zwei drei vier{{/polaris-button}}`);
  $button = this.$(' > a.Polaris-Button');
  assert.equal($button.length, 1, 'external link button - renders');

  buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Links zwei drei vier', 'external link button - text');

  linkHref = $button.attr('href');
  assert.equal(linkHref, 'http://www.somewhere.com/lets-go/', 'external link button - href');

  dataPolarisUnstyled = $button.attr('data-polaris-unstyled');
  assert.equal(dataPolarisUnstyled, 'true', 'external link button - data-polaris-unstyled');

  linkTarget = $button.attr('target');
  assert.equal(linkTarget, '_blank', 'external link button - target');

  linkRel = $button.attr('rel');
  assert.equal(linkRel, 'noopener noreferrer', 'external link button - rel');


  // Button with primary flag set.
  this.render(hbs`{{polaris-button primary=true}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'primary button - renders');

  assert.ok($button.hasClass('Polaris-Button--primary'), 'primary button - primary class');


  // Button with destructive flag set.
  this.render(hbs`{{polaris-button destructive=true}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'destructive button - renders');

  assert.ok($button.hasClass('Polaris-Button--destructive'), 'destructive button - destructive class');


  // Button with disabled flag set.
  this.render(hbs`{{polaris-button disabled=true}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'disabled button - renders');

  assert.ok($button.hasClass('Polaris-Button--disabled'), 'disabled button - disabled class');
  assert.ok($button.attr('disabled'), 'disabled button - disabled attribute');


  // Link button with disabled flag set.
  this.render(hbs`{{polaris-button url="http://www.somewhere.com/lets-go/" disabled=true}}`);
  $button = this.$(' > a.Polaris-Button');
  assert.equal($button.length, 1, 'disabled link button - renders');

  assert.ok($button.hasClass('Polaris-Button--disabled'), 'disabled link button - disabled class');
  assert.ok($button.attr('disabled'), 'disabled link button - disabled attribute');


  // Slim button.
  this.render(hbs`{{polaris-button size="slim"}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'slim button - renders');

  assert.ok($button.hasClass('Polaris-Button--sizeSlim'), 'slim button - slim class');
  assert.notOk($button.hasClass('Polaris-Button--sizeLarge'), 'slim button - no large class');


  // Large button.
  this.render(hbs`{{polaris-button size="large"}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'large button - renders');

  assert.ok($button.hasClass('Polaris-Button--sizeLarge'), 'large button - large class');
  assert.notOk($button.hasClass('Polaris-Button--sizeSlim'), 'large button - no slim class');


  // Button with outline flag set.
  this.render(hbs`{{polaris-button outline=true}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'outline button - renders');

  assert.ok($button.hasClass('Polaris-Button--outline'), 'outline button - outline class');


  // Button with fullWidth flag set.
  this.render(hbs`{{polaris-button fullWidth=true}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'fullWidth button - renders');

  assert.ok($button.hasClass('Polaris-Button--fullWidth'), 'fullWidth button - fullWidth class');


  // Button with disclosure flag set.
  // TODO: needs polaris-icon component.
  // this.render(hbs`{{polaris-button disclosure=true}}`);
  // $button = this.$(' > button[type="button"].Polaris-Button');
  //
  // assert.ok( what to check here? );


  // Button with submit flag set.
  this.render(hbs`{{polaris-button submit=true}}`);
  $button = this.$(' > button[type="submit"].Polaris-Button');
  assert.equal($button.length, 1, 'submit button - renders');


  // Button with plain flag set.
  this.render(hbs`{{polaris-button plain=true}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'plain button - renders');

  assert.ok($button.hasClass('Polaris-Button--plain'), 'plain button - plain class');


  // TODO: icon


  // Button with accessibility label.
  this.render(hbs`{{polaris-button accessibilityLabel="You can't see me!"}}`);
  $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'accessible button - renders');

  assert.equal($button.attr('aria-label'), 'You can\'t see me!', 'accessible button - aria-label');
});

test('Handles events correctly', function(assert) {
  let clickHandlerCallCount = 0;
  this.set('clickHandler', () => {
    clickHandlerCallCount++;
  });

  let focusHandlerCallCount = 0;
  this.set('focusHandler', () => {
    focusHandlerCallCount++;
  });

  let blurHandlerCallCount = 0;
  this.set('blurHandler', () => {
    blurHandlerCallCount++;
  });

  this.render(hbs`{{polaris-button
    onClick=(action clickHandler)
    onFocus=(action focusHandler)
    onBlur=(action blurHandler)
  }}`);

  const $button = this.$(' > button[type="button"].Polaris-Button');
  assert.equal($button.length, 1, 'button renders');
  assert.equal(clickHandlerCallCount, 0, 'after render, click handler fired 0 times');
  assert.equal(focusHandlerCallCount, 0, 'after render, focus handler fired 0 times');
  assert.equal(blurHandlerCallCount, 0, 'after render, blur handler fired 0 times');

  $button.focus();
  return wait()
  .then(() => {
    assert.equal(clickHandlerCallCount, 0, 'after first focus, click handler fired 0 times');
    assert.equal(focusHandlerCallCount, 1, 'after first focus, focus handler fired 1 time');
    assert.equal(blurHandlerCallCount, 0, 'after first focus, blur handler fired 0 times');

    $button.blur();
    return wait();
  })
  .then(() => {
    assert.equal(clickHandlerCallCount, 0, 'after first blur, click handler fired 0 times');
    assert.equal(focusHandlerCallCount, 1, 'after first blur, focus handler fired 1 time');
    assert.equal(blurHandlerCallCount, 1, 'after first blur, blur handler fired 1 time');

    $button.focus();
    return wait();
  })
  .then(() => {
    assert.equal(clickHandlerCallCount, 0, 'after second focus, click handler fired 0 times');
    assert.equal(focusHandlerCallCount, 2, 'after second focus, focus handler fired 2 times');
    assert.equal(blurHandlerCallCount, 1, 'after second focus, blur handler fired 1 time');

    $button.click();
    return wait();
  })
  .then(() => {
    assert.equal(clickHandlerCallCount, 1, 'after first click, click handler fired 1 time');
    assert.equal(focusHandlerCallCount, 2, 'after first click, focus handler fired 2 times');
    assert.equal(blurHandlerCallCount, 1, 'after first click, blur handler fired 1 time');
  });
});
