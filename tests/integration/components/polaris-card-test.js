import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  const cardSelector = 'div.Polaris-Card';
  const headerSelector = buildNestedSelector(
    cardSelector,
    'div.Polaris-Card__Header'
  );
  const sectionSelector = buildNestedSelector(
    'div.Polaris-Card',
    'div.Polaris-Card__Section'
  );

  test('it renders the correct HTML', async function (assert) {
    // Basic usage.
    await render(hbs`
      {{#polaris-card title="This is the card title"}}
        <p>This is the card content</p>
      {{/polaris-card}}
    `);

    let card = assert.dom(cardSelector);
    card.exists({ count: 1 }, 'one section, basic usage - renders one card');
    card.hasNoClass(
      'Polaris-Card--subdued',
      'one section, basic usage - does not apply subdued class'
    );

    const headingSelector = buildNestedSelector(
      headerSelector,
      'h2.Polaris-Heading'
    );
    const heading = assert.dom(headingSelector);
    heading.exists(
      { count: 1 },
      'one section, basic usage - renders one heading'
    );
    heading.hasText(
      'This is the card title',
      'one section, basic usage - renders correct heading text'
    );

    const unsectionedParagraphSelector = buildNestedSelector(cardSelector, 'p');
    const unsectionedParagraphs = assert.dom(unsectionedParagraphSelector);
    unsectionedParagraphs.exists(
      { count: 1 },
      'one section, basic usage - renders one unsectioned paragraph'
    );
    unsectionedParagraphs.hasText(
      'This is the card content',
      'one section, basic usage - renders correct unsectioned paragraph text'
    );

    // Sectioned attribute.
    await render(hbs`
      {{#polaris-card title="This is the card title" sectioned=true}}
        <p>This is the card content</p>
      {{/polaris-card}}
    `);

    const sectionedParagraphSelector = buildNestedSelector(
      sectionSelector,
      'p'
    );
    const sectionedParagraphs = assert.dom(sectionedParagraphSelector);

    sectionedParagraphs.exists(
      { count: 1 },
      'one section, basic usage - renders one sectioned paragraph'
    );
    sectionedParagraphs.hasText(
      'This is the card content',
      'one section, basic usage - renders correct sectioned paragraph text'
    );

    // Subdued attribute.
    await render(hbs`
      {{#polaris-card title="This is the card title" subdued=true}}
        <p>This is the card content</p>
      {{/polaris-card}}
    `);

    const subduedCardSelector = 'div.Polaris-Card.Polaris-Card--subdued';
    assert
      .dom(subduedCardSelector)
      .exists(
        { count: 1 },
        'one section, subdued=true - renders one card with subdued class'
      );

    // Multiple sections.
    await render(hbs`
      {{#polaris-card title="This is the card title" as |card|}}
        {{#card.section title="Section 1"}}
          <p>This is the first section's content</p>
        {{/card.section}}

        {{#card.section fullWidth=true}}
          <p>This is the second section's content</p>
        {{/card.section}}

        {{#card.section subdued=true}}
          <p>This is the third section's subdued content</p>
        {{/card.section}}
      {{/polaris-card}}
    `);

    assert
      .dom(sectionSelector)
      .exists({ count: 3 }, 'multiple sections - renders all sections');

    const sections = findAll(sectionSelector);
    // Check the first section.
    let section = sections[0];
    assert
      .dom(section)
      .doesNotHaveClass(
        'Polaris-Card__Section--subdued',
        'mutiple sections, first section - does not apply subdued class'
      );
    assert
      .dom(section)
      .doesNotHaveClass(
        'Polaris-Card__Section--fullWidth',
        'mutiple sections, first section - does not apply full width class'
      );

    const sectionTitleSelector = 'div.Polaris-Card__SectionHeader';
    assert
      .dom(sectionTitleSelector, section)
      .exists({ count: 1 }, 'mutiple sections, first section - renders title');

    const sectionTitleSubheadingSelector = buildNestedSelector(
      sectionTitleSelector,
      'h3.Polaris-Subheading'
    );
    assert
      .dom(sectionTitleSubheadingSelector, section)
      .exists(
        { count: 1 },
        'mutiple sections, first section - renders title subheading'
      );
    assert
      .dom(sectionTitleSubheadingSelector, section)
      .hasText(
        'Section 1',
        'mutiple sections, first section - renders correct heading text'
      );

    assert
      .dom('p', section)
      .exists(
        { count: 1 },
        'mutiple sections, first section - renders content'
      );
    assert
      .dom('p', section)
      .hasText(
        "This is the first section's content",
        'mutiple sections, first section - renders correct content text'
      );

    // Check the second section.
    section = sections[1];
    assert
      .dom(section)
      .doesNotHaveClass(
        'Polaris-Card__Section--subdued',
        'mutiple sections, second section - does not apply subdued class'
      );
    assert
      .dom(section)
      .hasClass(
        'Polaris-Card__Section--fullWidth',
        'mutiple sections, second section - applies full width class'
      );
    assert
      .dom('p', section)
      .exists(
        { count: 1 },
        'mutiple sections, second section - renders content'
      );
    assert
      .dom('p', section)
      .hasText(
        "This is the second section's content",
        'mutiple sections, second section - renders correct content text'
      );

    // Check the third section.
    section = sections[2];
    assert
      .dom(section)
      .hasClass(
        'Polaris-Card__Section--subdued',
        'mutiple sections, third section - applies subdued class'
      );
    assert
      .dom(section)
      .doesNotHaveClass(
        'Polaris-Card__Section--fullWidth',
        'mutiple sections, third section - does not apply full width class'
      );
    assert
      .dom(sectionTitleSelector, section)
      .doesNotExist('mutiple sections, third section - does not render title');
    assert
      .dom('p', section)
      .exists(
        { count: 1 },
        'mutiple sections, third section - renders content'
      );
    assert
      .dom('p', section)
      .hasText(
        "This is the third section's subdued content",
        'mutiple sections, third section - renders correct content text'
      );
  });

  test('it supports card title property as a component or a string', async function (assert) {
    await render(
      hbs` {{polaris-card title=(component "polaris-badge" text="My title")}} `
    );

    assert
      .dom('.Polaris-Card__Header > .Polaris-Badge')
      .hasText('My title', 'as a component - renders correctly');
    assert
      .dom('Polaris-Heading')
      .doesNotExist(
        'as a component - does not wrap the title in a heading component'
      );

    await render(hbs` {{polaris-card title="My title"}} `);

    assert
      .dom('.Polaris-Card__Header > .Polaris-Heading')
      .hasText('My title', 'renders title as a component');
  });

  test('it handles header actions correctly', async function (assert) {
    let action1HandlerCalled = false;
    this.actions.action1Handler = () => {
      action1HandlerCalled = true;
    };

    this.setProperties({
      action2HandlerCalled: false,
      action3HandlerCalled: false,
    });

    await render(hbs`
      {{polaris-card
        title="This is a card with actions"
        headerActions=(array
          (hash
            text="Action 1"
            onAction=(action "action1Handler")
          )
          (hash
            text="Action 2"
            onAction=(action (mut action2HandlerCalled) true)
          )
          (hash
            text="Action 3"
            disabled=true
            onAction=(action (mut action3HandlerCalled) true)
          )
        )
      }}
    `);

    // Check the title rendered.
    const headerStackSelector = buildNestedSelector(
      headerSelector,
      'div.Polaris-Stack.Polaris-Stack--alignmentBaseline'
    );
    const headingSelector = buildNestedSelector(
      headerStackSelector,
      'div.Polaris-Stack__Item.Polaris-Stack__Item--fill',
      'h2.Polaris-Heading'
    );
    const headings = assert.dom(headingSelector);
    headings.exists({ count: 1 }, 'renders one heading');
    headings.hasText(
      'This is a card with actions',
      'renders correct heading content'
    );

    // Check the actions rendered.
    const actionButtonSelector = buildNestedSelector(
      headerStackSelector,
      'div.Polaris-Stack__Item',
      'div.Polaris-ButtonGroup',
      'div.Polaris-ButtonGroup__Item.Polaris-ButtonGroup__Item--plain',
      'button.Polaris-Button.Polaris-Button--plain'
    );
    const actionButtons = findAll(actionButtonSelector);
    assert.equal(
      actionButtons.length,
      3,
      'renders the correct number of action buttons'
    );
    assert
      .dom(actionButtons[0])
      .hasText('Action 1', 'first action button - renders correct content');
    assert
      .dom(actionButtons[1])
      .hasText('Action 2', 'second action button - renders correct content');
    assert
      .dom(actionButtons[2])
      .hasText('Action 3', 'third action button - renders correct content');

    // Check clicking the buttons.
    await click(actionButtons[0]);
    assert.equal(
      action1HandlerCalled,
      true,
      'clicking first action button - invokes first action handler correctly'
    );
    assert.equal(
      this.get('action2HandlerCalled'),
      false,
      'clicking first action button - does not invoke second action handler'
    );

    await click(actionButtons[1]);
    assert.equal(
      this.get('action2HandlerCalled'),
      true,
      'clicking second action button - invokes second action handler correctly'
    );

    await click(actionButtons[2]);
    assert.equal(
      this.get('action3HandlerCalled'),
      false,
      'clicking disabled third action button - does not invoke third action handler'
    );
    assert
      .dom(actionButtons[2])
      .hasClass(
        'Polaris-Button--disabled',
        'third action is a disabled header action - disabled class'
      );
  });

  test('it allows section header customization', async function (assert) {
    await render(hbs`
      {{#polaris-card as |card|}}
        {{#card.section as |cardSection|}}
          {{#cardSection.header title="Custom section title"}}
            <p>Custom section content</p>
          {{/cardSection.header}}
        {{/card.section}}
      {{/polaris-card}}
    `);

    const sectionHeaderSelector = buildNestedSelector(
      sectionSelector,
      'div.Polaris-Card__SectionHeader'
    );

    const sectionHeaders = findAll(sectionHeaderSelector);
    assert.equal(sectionHeaders.length, 1, 'renders one section header');

    const sectionHeaderTitleSelector = buildNestedSelector(
      sectionHeaderSelector,
      'h3.Polaris-Subheading'
    );
    const sectionHeaderTitles = findAll(sectionHeaderTitleSelector);
    assert.equal(
      sectionHeaderTitles.length,
      1,
      'renders one section header title'
    );
    assert
      .dom(sectionHeaderTitles[0])
      .hasText(
        'Custom section title',
        'renders the correct section header title'
      );

    const sectionHeaderContentSelector = buildNestedSelector(
      sectionHeaderSelector,
      'p'
    );
    const sectionHeaderContents = assert.dom(sectionHeaderContentSelector);

    sectionHeaderContents.exists(
      { count: 1 },
      'renders custom section header content'
    );
    sectionHeaderContents.hasText(
      'Custom section content',
      'renders the correct custom section header content'
    );
  });

  test('can handle primary & secondary footer actions', async function (assert) {
    this.setProperties({
      saveAction: {
        text: 'Save',
        disabled: true,
        onAction() {
          assert.step('primary-action');
        },
      },
      cancelAction: {
        text: 'Cancel',
        onAction() {
          assert.step('secondary-action');
        },
      },
    });

    await render(
      hbs`{{polaris-card primaryFooterAction=saveAction secondaryFooterAction=cancelAction}}`
    );

    let footerClass = '.Polaris-Card__Footer';
    let footerButton = `${footerClass} button`;
    let primaryBtn = '[data-test-id="primaryFooterAction"]';
    let secondaryBtn = '[data-test-id="secondaryFooterAction"]';

    assert.dom(footerClass).exists();
    assert.dom(footerButton).exists({ count: 2 });

    await click(secondaryBtn);
    assert.verifySteps(['secondary-action']);
    assert.dom(primaryBtn).isDisabled();

    this.set('saveAction.disabled', false);
    await click(primaryBtn);
    assert.verifySteps(['primary-action']);
    assert.dom(primaryBtn).isNotDisabled();

    assert.dom(primaryBtn).hasText('Save');
    assert.dom(secondaryBtn).hasText('Cancel');

    await render(hbs`{{polaris-card primaryFooterAction=saveAction}}`);

    assert.dom(footerButton).exists({ count: 1 });
    assert.dom(primaryBtn).exists();
    assert.dom(secondaryBtn).doesNotExist();

    this.set('saveAction.loading', true);
    assert.dom(primaryBtn).hasClass('Polaris-Button--loading');

    await render(hbs`{{polaris-card secondaryFooterAction=cancelAction}}`);

    assert.dom(footerButton).exists({ count: 1 });
    assert.dom(secondaryBtn).exists();
    assert.dom(primaryBtn).doesNotExist();

    this.set('cancelAction.loading', true);
    assert.dom(`${secondaryBtn} .Polaris-Button__Spinner`).exists();
  });
});
