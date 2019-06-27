import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

const layoutSelector = 'div.Polaris-Layout';
const layoutSectionSelector = buildNestedSelector(
  layoutSelector,
  'div.Polaris-Layout__Section'
);
const layoutAnnotationWrapperSelector = buildNestedSelector(
  layoutSelector,
  'div.Polaris-Layout__AnnotatedSection',
  'div.Polaris-Layout__AnnotationWrapper'
);

const textContainerSelector = buildNestedSelector(
  'div.Polaris-Layout__Annotation',
  'div.Polaris-TextContainer'
);
const headerSelector = `${layoutAnnotationWrapperSelector} ${buildNestedSelector(
  textContainerSelector,
  'h2.Polaris-Heading'
)}`;

const contentSelector = `${layoutAnnotationWrapperSelector} div.Polaris-Layout__AnnotationContent`;
const descriptionSelector = `${layoutAnnotationWrapperSelector} [data-test-annotation-description]`;

module('Integration | Component | polaris layout', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the correct HTML in basic usage', async function(assert) {
    // Test inline form.
    await render(hbs`{{polaris-layout text="This is an inline layout"}}`);

    let layouts = findAll(layoutSelector);
    assert.equal(
      layouts.length,
      1,
      'inline without sectioned flag - renders one layout'
    );

    let layout = layouts[0];
    assert.equal(
      layout.children.length,
      0,
      'inline without sectioned flag - layout has no children'
    );
    assert
      .dom(layout)
      .hasText(
        'This is an inline layout',
        'inline without sectioned flag - renders text content'
      );

    // Test block form.
    await render(
      hbs`{{#polaris-layout}}This is a block layout{{/polaris-layout}}`
    );

    layouts = findAll(layoutSelector);
    assert.equal(
      layouts.length,
      1,
      'block without sectioned flag - renders one layout'
    );

    layout = layouts[0];
    assert.equal(
      layout.children.length,
      0,
      'block without sectioned flag - layout has no children'
    );
    assert
      .dom(layout)
      .hasText(
        'This is a block layout',
        'block without sectioned flag - renders text content'
      );

    // Test inline form with sectioned flag.
    await render(
      hbs`{{polaris-layout text="This is a sectioned inline layout" sectioned=true}}`
    );

    layouts = findAll(layoutSelector);
    assert.equal(
      layouts.length,
      1,
      'inline with sectioned flag - renders one layout'
    );
    assert.equal(
      layouts[0].children.length,
      1,
      'inline with sectioned flag - layout has one child'
    );

    let layoutSections = findAll(layoutSectionSelector);
    assert.equal(
      layoutSections.length,
      1,
      'inline with sectioned flag - renders layout section'
    );
    assert
      .dom(layoutSections[0])
      .hasText(
        'This is a sectioned inline layout',
        'inline with sectioned flag - renders text content'
      );

    // Test block form with sectioned flag.
    await render(
      hbs`{{#polaris-layout sectioned=true}}This is a sectioned block layout{{/polaris-layout}}`
    );

    layouts = findAll(layoutSelector);
    assert.equal(
      layouts.length,
      1,
      'block with sectioned flag - renders one layout'
    );
    assert.equal(
      layouts[0].children.length,
      1,
      'block with sectioned flag - layout has one child'
    );

    layoutSections = findAll(layoutSectionSelector);
    assert.equal(
      layoutSections.length,
      1,
      'inline with sectioned flag - renders layout section'
    );
    assert
      .dom(layoutSections[0])
      .hasText(
        'This is a sectioned block layout',
        'block with sectioned flag - renders text content'
      );
  });

  test('it renders the correct HTML when using sections', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.section text="This is an inline section"}}

        {{#layout.section}}
          This is a block section
        {{/layout.section}}

        {{layout.section text="This is a secondary section" secondary=true}}

        {{layout.section text="This is a full-width section" fullWidth=true}}

        {{layout.section text="This is a half-width section" oneHalf=true}}

        {{layout.section text="This is a third-width section" oneThird=true}}
      {{/polaris-layout}}
    `);

    const layoutSections = findAll(layoutSectionSelector);
    assert.equal(layoutSections.length, 6, 'renders six layout sections');

    // Check the first section.
    let layoutSection = layoutSections[0];
    assert
      .dom(layoutSection)
      .hasNoClass(
        'Polaris-Layout__Section--secondary',
        'first section - does not have secondary class'
      );
    assert
      .dom(layoutSection)
      .hasNoClass(
        'Polaris-Layout__Section--fullWidth',
        'first section - does not have full width class'
      );
    assert
      .dom(layoutSection)
      .hasNoClass(
        'Polaris-Layout__Section--oneHalf',
        'first section - does not have half width class'
      );
    assert
      .dom(layoutSection)
      .hasNoClass(
        'Polaris-Layout__Section--oneThird',
        'first section - does not have third width class'
      );
    assert
      .dom(layoutSection)
      .hasText(
        'This is an inline section',
        'first section - renders text content'
      );

    // Check the second section.
    layoutSection = assert.dom(layoutSections[1]);

    layoutSection.hasNoClass(
      'Polaris-Layout__Section--secondary',
      'second section - does not have secondary class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--fullWidth',
      'second section - does not have full width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneHalf',
      'second section - does not have half width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneThird',
      'second section - does not have third width class'
    );
    layoutSection.hasText(
      'This is a block section',
      'second section - renders text content'
    );

    // Check the third section.
    layoutSection = assert.dom(layoutSections[2]);
    layoutSection.hasClass(
      'Polaris-Layout__Section--secondary',
      'third section - has secondary class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--fullWidth',
      'third section - does not have full width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneHalf',
      'third section - does not have half width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneThird',
      'third section - does not have third width class'
    );
    layoutSection.hasText(
      'This is a secondary section',
      'third section - renders text content'
    );

    // Check the fourth section.
    layoutSection = assert.dom(layoutSections[3]);
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--secondary',
      'fourth section - does not have secondary class'
    );
    layoutSection.hasClass(
      'Polaris-Layout__Section--fullWidth',
      'fourth section - has full width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneHalf',
      'fourth section - does not have half width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneThird',
      'fourth section - does not have third width class'
    );
    layoutSection.hasText(
      'This is a full-width section',
      'fourth section - renders text content'
    );

    // Check the fifth section.
    layoutSection = assert.dom(layoutSections[4]);

    layoutSection.hasNoClass(
      'Polaris-Layout__Section--secondary',
      'fifth section - does not have secondary class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--fullWidth',
      'fifth section - does not have full width class'
    );
    layoutSection.hasClass(
      'Polaris-Layout__Section--oneHalf',
      'fifth section - has half width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneThird',
      'fifth section - does not have third width class'
    );
    layoutSection.hasText(
      'This is a half-width section',
      'fifth section - renders text content'
    );

    // Check the sixth section.
    layoutSection = assert.dom(layoutSections[5]);

    layoutSection.hasNoClass(
      'Polaris-Layout__Section--secondary',
      'sixth section - does not have secondary class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--fullWidth',
      'sixth section - does not have full width class'
    );
    layoutSection.hasNoClass(
      'Polaris-Layout__Section--oneHalf',
      'sixth section - does not have half width class'
    );
    layoutSection.hasClass(
      'Polaris-Layout__Section--oneThird',
      'sixth section - has third width class'
    );
    layoutSection.hasText(
      'This is a third-width section',
      'sixth section - renders text content'
    );
  });

  test('it renders the correct HTML when no title, text or description are passed to annotated section', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.annotatedSection}}
      {{/polaris-layout}}
    `);

    assert
      .dom(layoutAnnotationWrapperSelector)
      .exists({ count: 1 }, 'renders one annotation wrapper');

    let headers = assert.dom(headerSelector);
    headers.exists({ count: 1 }, 'renders header');
    headers.hasText('', 'renders header correctly');

    let descriptions = assert.dom(descriptionSelector);
    descriptions.doesNotExist('renders description paragraph correctly');

    let contents = assert.dom(contentSelector);
    contents.exists({ count: 1 }, 'renders content');
    contents.hasText('', 'renders correct content');
  });

  test('it renders the correct HTML when a title and no text or description are passed to annotated section', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.annotatedSection
          text="This is an inline annotated section without title or description"
        }}
      {{/polaris-layout}}
    `);

    assert
      .dom(layoutAnnotationWrapperSelector)
      .exists({ count: 1 }, 'renders one annotation wrapper');

    let headers = assert.dom(headerSelector);
    headers.exists({ count: 1 }, 'renders header');
    headers.hasText('', 'renders header correctly');

    assert
      .dom(descriptionSelector)
      .doesNotExist('renders description paragraph correctly');

    let contents = assert.dom(contentSelector);
    contents.exists({ count: 1 }, 'renders content');
    contents.hasText(
      'This is an inline annotated section without title or description',
      'renders correct content'
    );
  });

  test('it renders the correct HTML when a title and text and no description are passed to annotated section', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.annotatedSection
          title="Inline title"
          text="This is an inline annotated section with a title but no description"
        }}
      {{/polaris-layout}}
    `);

    const annotationWrappers = assert.dom(layoutAnnotationWrapperSelector);

    annotationWrappers.exists({ count: 1 }, 'renders one annotation wrapper');

    let headers = assert.dom(headerSelector);
    headers.exists({ count: 1 }, 'renders header');
    headers.hasText('Inline title', 'renders header correctly');

    assert
      .dom(descriptionSelector)
      .doesNotExist('renders description paragraph correctly');

    let contents = assert.dom(contentSelector);
    contents.exists({ count: 1 }, 'renders content');
    contents.hasText(
      'This is an inline annotated section with a title but no description',
      'renders correct content'
    );
  });

  test('it renders the correct HTML when text and description string and no title are passed to annotated section', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.annotatedSection
          description="Inline description"
          text="This is an inline annotated section with a description but no title"
        }}
      {{/polaris-layout}}
    `);

    const annotationWrappers = assert.dom(layoutAnnotationWrapperSelector);

    annotationWrappers.exists({ count: 1 }, 'renders one annotation wrapper');

    let headers = assert.dom(headerSelector);
    headers.exists({ count: 1 }, 'renders header');
    headers.hasText('', 'renders header correctly');

    let descriptions = assert.dom(descriptionSelector);
    descriptions.exists({ count: 1 }, 'renders description paragraph');
    descriptions.hasText('Inline description', 'renders header correctly');

    let contents = assert.dom(contentSelector);
    contents.exists({ count: 1 }, 'renders content');
    contents.hasText(
      'This is an inline annotated section with a description but no title',
      'renders correct content'
    );
  });

  test('it renders the correct HTML when text and description string and title are passed to annotated section', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.annotatedSection
          title="Inline title"
          description="Inline description"
          text="This is an inline annotated section with both a title and description"
        }}
      {{/polaris-layout}}
    `);

    const annotationWrappers = assert.dom(layoutAnnotationWrapperSelector);

    annotationWrappers.exists({ count: 1 }, 'renders one annotation wrapper');

    let headers = assert.dom(headerSelector);
    headers.exists({ count: 1 }, 'renders header');
    headers.hasText('Inline title', 'renders header correctly');

    let descriptions = assert.dom(descriptionSelector);
    descriptions.exists({ count: 1 }, 'renders description paragraph');
    descriptions.hasText('Inline description', 'renders header correctly');

    let contents = assert.dom(contentSelector);
    contents.exists({ count: 1 }, 'renders content');
    contents.hasText(
      'This is an inline annotated section with both a title and description',
      'renders correct content'
    );
  });

  test('it renders the correct HTML when description component is passed to annotated section', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.annotatedSection
          description=(component "wrapper-element" data-test-annotation-description-content=true)
        }}
      {{/polaris-layout}}
    `);

    const descriptionSelector = buildNestedSelector(
      '[data-test-annotation-description]',
      '[data-test-annotation-description-content]'
    );
    assert.dom(descriptionSelector).exists({ count: 1 });
  });

  test('it renders the correct HTML when description hash is passed to annotated section', async function(assert) {
    await render(hbs`
      {{#polaris-layout as |layout|}}
        {{layout.annotatedSection
          description=(hash
            componentName="wrapper-element"
            props=(hash
              data-test-annotation-description-content=true
            )
          )
        }}
      {{/polaris-layout}}
    `);

    const descriptionSelector = buildNestedSelector(
      '[data-test-annotation-description]',
      '[data-test-annotation-description-content]'
    );

    assert.dom(descriptionSelector).exists({ count: 1 });
  });
});
