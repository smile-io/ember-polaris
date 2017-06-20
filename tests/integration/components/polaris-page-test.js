import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, click } from 'ember-native-dom-helpers';

moduleForComponent('polaris-page', 'Integration | Component | polaris page', {
  integration: true
});

function buildNestedSelector(...selectors) {
  return selectors.join(' > ');
}

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

  const pageSelector = 'div.Polaris-Page';
  const pages = findAll(pageSelector);
  assert.equal(pages.length, 1, 'renders one page div');

  const page = pages[0];
  assert.notOk(page.classList.contains('Polaris-Page--fullWidth'), 'renders normal-width page');

  const headerSelector = buildNestedSelector(pageSelector, 'div.Polaris-Page__Header');
  const headers = findAll(headerSelector);
  assert.equal(headers.length, 1, 'renders one page header div');

  const displayTextSelector = buildNestedSelector(headerSelector, 'h1.Polaris-DisplayText.Polaris-DisplayText--sizeLarge');
  const displayTexts = findAll(displayTextSelector);
  assert.equal(displayTexts.length, 1, 'renders one page header display text');
  const titleText = displayTexts[0].textContent.trim();
  assert.equal(titleText, 'This is the title', 'renders correct page header display text content');

  const contentWrapperSelector = buildNestedSelector(pageSelector, 'div.Polaris-Page__Content');
  const contentWrappers = findAll(contentWrapperSelector);
  assert.equal(contentWrappers.length, 1, 'renders one page content wrapper div');

  const contentSelector = buildNestedSelector(contentWrapperSelector, 'div.test-page-content');
  const contents = findAll(contentSelector);
  assert.equal(contents.length, 1, 'renders one content div');

  const contentText = contents[0].textContent.trim();
  assert.equal(contentText, 'This is some test content', 'renders correct content');

  this.set('fullWidth', true);
  assert.ok(page.classList.contains('Polaris-Page--fullWidth'), 'honours fullWidth flag');
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
