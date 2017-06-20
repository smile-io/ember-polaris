import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-card', 'Integration | Component | polaris card', {
  integration: true
});

function buildNestedSelector(...selectors) {
  return selectors.join(' > ');
}

test('it renders the correct HTML', function(assert) {
  // Basic usage.
  this.render(hbs`
    {{#polaris-card title="This is the card title"}}
      <p>This is the card content</p>
    {{/polaris-card}}
  `);

  const cardSelector = 'div.Polaris-Card';
  const cards = findAll(cardSelector);
  assert.equal(cards.length, 1, 'one section, basic usage - renders one card');
  assert.notOk(cards[0].classList.contains('Polaris-Card--subdued'), 'one section, basic usage - does not apply subdued class');

  const headingSelector = buildNestedSelector(cardSelector, 'div.Polaris-Card__Header', 'h2.Polaris-Heading');
  const headings = findAll(headingSelector);
  assert.equal(headings.length, 1 ,'one section, basic usage - renders one heading');
  assert.equal(headings[0].textContent.trim(), 'This is the card title', 'one section, basic usage - renders correct heading text');

  const sectionedParagraphSelector = buildNestedSelector(cardSelector, 'div.Polaris-Card__Section', 'p');
  const sectionedParagraphs = findAll(sectionedParagraphSelector);
  assert.equal(sectionedParagraphs.length, 1 ,'one section, basic usage - renders one section');
  assert.equal(sectionedParagraphs[0].textContent.trim(), 'This is the card content', 'one section, basic usage - renders correct section text');


  // Sectioned attribute.
  this.render(hbs`
    {{#polaris-card title="This is the card title" sectioned=false}}
      <p>This is the card content</p>
    {{/polaris-card}}
  `);

  const unsectionedParagraphSelector = buildNestedSelector(cardSelector, 'p');
  const unsectionedParagraphs = findAll(unsectionedParagraphSelector);
  assert.equal(unsectionedParagraphs.length, 1 ,'one section, basic usage - renders one section');
  assert.equal(unsectionedParagraphs[0].textContent.trim(), 'This is the card content', 'one section, basic usage - renders correct section text');


  // Subdued attribute.
  this.render(hbs`
    {{#polaris-card title="This is the card title" subdued=true}}
      <p>This is the card content</p>
    {{/polaris-card}}
  `);

  const subduedCardSelector = 'div.Polaris-Card.Polaris-Card--subdued';
  const subduedCards = findAll(subduedCardSelector);
  assert.equal(subduedCards.length, 1, 'one section, subdued=true - renders one card with subdued class');
});
