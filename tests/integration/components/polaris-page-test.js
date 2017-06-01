import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-native-dom-helpers';

moduleForComponent('polaris-page', 'Integration | Component | polaris page', {
  integration: true
});

test('it renders the page correctly', function(assert) {
  this.set('fullWidth', false);
  this.render(hbs`
    {{#polaris-page
      title="This is the title"
      fullWidth=fullWidth
    }}
      <div class="test-page-content">This is some test content</div>
    {{/polaris-page}}`
  );

  const $pages = this.$(' > div.Polaris-Page');
  assert.equal($pages.length, 1, 'renders one page div');
  assert.notOk($pages.hasClass('Polaris-Page--fullWidth'), 'renders normal-width page');

  const $headers = $pages.find(' > div.Polaris-Page__Header');
  assert.equal($headers.length, 1, 'renders one page header div');

  const $displayTexts = $headers.find(' > h1.Polaris-DisplayText.Polaris-DisplayText--sizeLarge');
  assert.equal($displayTexts.length, 1, 'renders one page header display text');
  const titleText = $displayTexts.text().trim();
  assert.equal(titleText, 'This is the title');

  const $contentWrappers = $pages.find(' > div.Polaris-Page__Content');
  assert.equal($contentWrappers.length, 1, 'renders one page content wrapper div');

  const $contents = $contentWrappers.find(' > div.test-page-content');
  assert.equal($contents.length, 1, 'renders one content div');

  const contentText = $contents.text().trim();
  assert.equal(contentText, 'This is some test content', 'renders correct content');

  this.set('fullWidth', true);
  assert.ok($pages.hasClass('Polaris-Page--fullWidth'), 'honours fullWidth flag');
});

test('it handles primary action correctly when a primary action is supplied', function(assert) {
  let primaryActionFired = false;
  this.on('primaryActionFired', () => {
    primaryActionFired = true;
  });
  this.set('primaryActionDisabled', true);

  this.render(hbs`
    {{polaris-page
      title="This is the title"
      primaryAction=(hash
        text="Take action!"
        action=(action "primaryActionFired")
        disabled=primaryActionDisabled
      )
    }}
  `);

  const primaryButtonSelector = [
    'div.Polaris-Page',
    'div.Polaris-Page__Header',
    'div.Polaris-Page__Actions',
    'div.Polaris-Page__PrimaryAction',
    'button.Polaris-Button.Polaris-Button--primary'
  ].join('>');

  const $primaryButtons = this.$(` > ${primaryButtonSelector}`);
  assert.equal($primaryButtons.length, 1, 'renders one primary button');
  const primaryButtonText = $primaryButtons.text().trim();
  assert.equal(primaryButtonText, 'Take action!', 'uses correct text on primary button');

  assert.ok($primaryButtons.attr('disabled'), 'primary action button is initially disabled');
  this.set('primaryActionDisabled', false);
  assert.notOk($primaryButtons.attr('disabled'), 'primary action button becomes enabled');

  assert.notOk(primaryActionFired, 'hasn\'t fired primary action before clicking button');
  return click(primaryButtonSelector)
  .then(() => {
    assert.ok(primaryActionFired, 'fires primary action on click');
  });
});
