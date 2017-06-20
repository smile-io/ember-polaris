import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-card', 'Integration | Component | polaris card', {
  integration: true
});

function buildNestedSelector(...selectors) {
  return selectors.join(' > ');
}

test('it renders the correct HTML in basic usage', function(assert) {
  this.render(hbs`
    {{#polaris-card title="This is the card title"}}
      This is the card content
    {{/polaris-card}}
  `);

  const cardSelector = 'div.Polaris-Card';
  const cards = findAll(cardSelector);
  assert.equal(cards.length, 1, 'basic usage - renders one card');

  const headingSelector = buildNestedSelector(cardSelector, 'div.Polaris-Card__Header', 'h2.Polaris-Heading');
  const headings = findAll(headingSelector);
  assert.equal(headings.length, 1 ,'basic usage - renders one heading');
  assert.equal(headings[0].textContent.trim(), 'This is the card title', 'basic usage - renders correct heading text');

  const sectionSelector = buildNestedSelector(cardSelector, 'div.Polaris-Card__Section');
  const sections = findAll(sectionSelector);
  assert.equal(sections.length, 1 ,'basic usage - renders one section');

  const sectionParagraphSelector = buildNestedSelector(sectionSelector, 'p');
  const sectionParagraphs = findAll(sectionParagraphSelector);
  assert.equal(sectionParagraphs.length, 1 ,'basic usage - renders one section paragraph');
  assert.equal(sectionParagraphs[0].textContent.trim(), 'This is the card content', 'basic usage - renders correct section text');
});
