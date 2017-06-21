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
  let sectionedParagraphs = findAll(sectionedParagraphSelector);
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


  // Multiple sections.
  this.render(hbs`
    {{#polaris-card title="This is the card title" sectioned=false as |card|}}
      {{#card.section title="Section 1"}}
        <p>This is the first section's content</p>
      {{/card.section}}

      {{#card.section}}
        <p>This is the second section's content</p>
      {{/card.section}}

      {{#card.section subdued=true}}
        <p>This is the third section's subdued content</p>
      {{/card.section}}
    {{/polaris-card}}
  `);

  const sectionSelector = buildNestedSelector('div.Polaris-Card', 'div.Polaris-Card__Section');
  const sections = findAll(sectionSelector);
  assert.equal(sections.length, 3, 'multiple sections - renders all sections');

  // Check the first section.
  let section = sections[0];
  assert.notOk(section.classList.contains('Polaris-Card__Section--subdued'), 'mutiple sections, first section - does not apply subdued class');

  const sectionTitleSelector = 'div.Polaris-Card__SectionHeader';
  let sectionTitles = findAll(sectionTitleSelector, section);
  assert.equal(sectionTitles.length, 1, 'mutiple sections, first section - renders title');

  const sectionTitleSubheadingSelector = buildNestedSelector(sectionTitleSelector, 'h3.Polaris-Subheading');
  const sectionTitleSubheadings = findAll(sectionTitleSubheadingSelector, section);
  assert.equal(sectionTitleSubheadings.length, 1, 'mutiple sections, first section - renders title subheading');
  assert.equal(sectionTitleSubheadings[0].textContent.trim(), 'Section 1', 'mutiple sections, first section - renders correct heading text');

  let sectionContents = findAll('p', section);
  assert.equal(sectionContents.length, 1, 'mutiple sections, first section - renders content');
  assert.equal(sectionContents[0].textContent.trim(), 'This is the first section\'s content', 'mutiple sections, first section - renders correct content text');

  // Check the second section.
  section = sections[1];
  assert.notOk(section.classList.contains('Polaris-Card__Section--subdued'), 'mutiple sections, second section - does not apply subdued class');

  sectionTitles = findAll(sectionTitleSelector, section);
  assert.equal(sectionTitles.length, 0, 'mutiple sections, second section - does not render title');

  sectionContents = findAll('p', section);
  assert.equal(sectionContents.length, 1, 'mutiple sections, second section - renders content');
  assert.equal(sectionContents[0].textContent.trim(), 'This is the second section\'s content', 'mutiple sections, second section - renders correct content text');

  // Check the third section.
  section = sections[2];
  assert.ok(section.classList.contains('Polaris-Card__Section--subdued'), 'mutiple sections, third section - applies subdued class');

  sectionTitles = findAll(sectionTitleSelector, section);
  assert.equal(sectionTitles.length, 0, 'mutiple sections, third section - does not render title');

  sectionContents = findAll('p', section);
  assert.equal(sectionContents.length, 1, 'mutiple sections, third section - renders content');
  assert.equal(sectionContents[0].textContent.trim(), 'This is the third section\'s subdued content', 'mutiple sections, third section - renders correct content text');
});
