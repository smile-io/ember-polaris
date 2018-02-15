import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-layout', 'Integration | Component | polaris layout', {
  integration: true
});

const layoutSelector = 'div.Polaris-Layout';
const layoutSectionSelector = buildNestedSelector(layoutSelector, 'div.Polaris-Layout__Section');
const layoutAnnotationWrapperSelector = buildNestedSelector(
  layoutSelector,
  'div.Polaris-Layout__AnnotatedSection',
  'div.Polaris-Layout__AnnotationWrapper'
);

test('it renders the correct HTML in basic usage', function(assert) {
  // Test inline form.
  this.render(hbs`{{polaris-layout text="This is an inline layout"}}`);

  let layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'inline without sectioned flag - renders one layout');

  let layout = layouts[0];
  assert.equal(layout.children.length, 0, 'inline without sectioned flag - layout has no children');
  assert.equal(layout.textContent.trim(), 'This is an inline layout', 'inline without sectioned flag - renders text content');

  // Test block form.
  this.render(hbs`{{#polaris-layout}}This is a block layout{{/polaris-layout}}`);

  layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'block without sectioned flag - renders one layout');

  layout = layouts[0];
  assert.equal(layout.children.length, 0, 'block without sectioned flag - layout has no children');
  assert.equal(layout.textContent.trim(), 'This is a block layout', 'block without sectioned flag - renders text content');

  // Test inline form with sectioned flag.
  this.render(hbs`{{polaris-layout text="This is a sectioned inline layout" sectioned=true}}`);

  layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'inline with sectioned flag - renders one layout');
  assert.equal(layouts[0].children.length, 1, 'inline with sectioned flag - layout has one child');

  let layoutSections = findAll(layoutSectionSelector);
  assert.equal(layoutSections.length, 1, 'inline with sectioned flag - renders layout section');
  assert.equal(layoutSections[0].textContent.trim(), 'This is a sectioned inline layout', 'inline with sectioned flag - renders text content');

  // Test block form with sectioned flag.
  this.render(hbs`{{#polaris-layout sectioned=true}}This is a sectioned block layout{{/polaris-layout}}`);

  layouts = findAll(layoutSelector);
  assert.equal(layouts.length, 1, 'block with sectioned flag - renders one layout');
  assert.equal(layouts[0].children.length, 1, 'block with sectioned flag - layout has one child');

  layoutSections = findAll(layoutSectionSelector);
  assert.equal(layoutSections.length, 1, 'inline with sectioned flag - renders layout section');
  assert.equal(layoutSections[0].textContent.trim(), 'This is a sectioned block layout', 'block with sectioned flag - renders text content');
});

test('it renders the correct HTML when using sections', function(assert) {
  this.render(hbs`
    {{#polaris-layout as |layout|}}
      {{layout.section text="This is an inline section"}}

      {{#layout.section}}
        This is a block section
      {{/layout.section}}

      {{layout.section text="This is a secondary section" secondary=true}}

      {{layout.section text="This is a full-width section" fullWidth=true}}
    {{/polaris-layout}}
  `);

  const layoutSections = findAll(layoutSectionSelector);
  assert.equal(layoutSections.length, 4, 'renders four layout sections');

  // Check the first section.
  let layoutSection = layoutSections[0];
  assert.notOk(layoutSection.classList.contains('Polaris-Layout__Section--secondary'), 'first section - does not have secondary class');
  assert.notOk(layoutSection.classList.contains('Polaris-Layout__Section--fullWidth'), 'first section - does not have full width class');
  assert.equal(layoutSection.textContent.trim(), 'This is an inline section', 'first section - renders text content');

  // Check the second section.
  layoutSection = layoutSections[1];
  assert.notOk(layoutSection.classList.contains('Polaris-Layout__Section--secondary'), 'second section - does not have secondary class');
  assert.notOk(layoutSection.classList.contains('Polaris-Layout__Section--fullWidth'), 'second section - does not have full width class');
  assert.equal(layoutSection.textContent.trim(), 'This is a block section', 'second section - renders text content');

  // Check the third section.
  layoutSection = layoutSections[2];
  assert.ok(layoutSection.classList.contains('Polaris-Layout__Section--secondary'), 'third section - has secondary class');
  assert.notOk(layoutSection.classList.contains('Polaris-Layout__Section--fullWidth'), 'third section - does not have full width class');
  assert.equal(layoutSection.textContent.trim(), 'This is a secondary section', 'third section - renders text content');

  // Check the fourth section.
  layoutSection = layoutSections[3];
  assert.notOk(layoutSection.classList.contains('Polaris-Layout__Section--secondary'), 'fourth section - does not have secondary class');
  assert.ok(layoutSection.classList.contains('Polaris-Layout__Section--fullWidth'), 'fourth section - has full width class');
  assert.equal(layoutSection.textContent.trim(), 'This is a full-width section', 'third section - renders text content');
});

test('it renders the correct HTML when using annotated sections in inline form', function(assert) {
  this.render(hbs`
    {{#polaris-layout as |layout|}}
      {{layout.annotatedSection}}

      {{layout.annotatedSection
        text="This is an inline annotated section without title or description"
      }}

      {{layout.annotatedSection
        title="Inline title"
        text="This is an inline annotated section with a title but no description"
      }}

      {{layout.annotatedSection
        description="Inline description"
        text="This is an inline annotated section with a description but no title"
      }}

      {{layout.annotatedSection
        title="Inline title"
        description="Inline description"
        text="This is an inline annotated section with both a title and description"
      }}
    {{/polaris-layout}}
  `);

  const annotationWrappers = findAll(layoutAnnotationWrapperSelector);
  assert.equal(annotationWrappers.length, 5, 'renders five annotation wrappers');

  const textContainerSelector = buildNestedSelector('div.Polaris-Layout__Annotation', 'div.Polaris-TextContainer');
  const headerSelector = buildNestedSelector(textContainerSelector, 'h2.Polaris-Heading');
  const descriptionSelector = buildNestedSelector(textContainerSelector, 'p');
  const contentSelector = 'div.Polaris-Layout__AnnotationContent';

  // Check the first annotation.
  let annotationWrapper = annotationWrappers[0];

  let headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'first annotation - renders header');
  assert.equal(headers[0].textContent.trim(), '', 'first annotation - renders header correctly');

  let descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 0, 'first annotation - renders description paragraph correctly');

  let contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'first annotation - renders content');
  assert.equal(contents[0].textContent.trim(), '', 'first annotation - renders correct content');

  // Check the second annotation.
  annotationWrapper = annotationWrappers[1];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'second annotation - renders header');
  assert.equal(headers[0].textContent.trim(), '', 'second annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 0, 'second annotation - renders description paragraph correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'second annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section without title or description', 'second annotation - renders correct content');

  // Check the third annotation.
  annotationWrapper = annotationWrappers[2];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'third annotation - renders header');
  assert.equal(headers[0].textContent.trim(), 'Inline title', 'third annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 0, 'third annotation - renders description paragraph correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'third annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section with a title but no description', 'third annotation - renders correct content');

  // Check the fourth annotation.
  annotationWrapper = annotationWrappers[3];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'fourth annotation - renders header');
  assert.equal(headers[0].textContent.trim(), '', 'fourth annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 1, 'fourth annotation - renders description paragraph');
  assert.equal(descriptions[0].textContent.trim(), 'Inline description', 'fourth annotation - renders header correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'fourth annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section with a description but no title', 'fourth annotation - renders correct content');

  // Check the fifth annotation.
  annotationWrapper = annotationWrappers[4];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'fifth annotation - renders header');
  assert.equal(headers[0].textContent.trim(), 'Inline title', 'fifth annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 1, 'fifth annotation - renders description paragraph');
  assert.equal(descriptions[0].textContent.trim(), 'Inline description', 'fifth annotation - renders header correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'fifth annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section with both a title and description', 'fifth annotation - renders correct content');
});

test('it renders the correct HTML when using annotated sections in block form', function(assert) {
  this.render(hbs`
    {{#polaris-layout as |layout|}}
      {{#layout.annotatedSection}}{{/layout.annotatedSection}}

      {{#layout.annotatedSection}}
        This is an inline annotated section without title or description
      {{/layout.annotatedSection}}

      {{#layout.annotatedSection
        title="Inline title"
      }}
        This is an inline annotated section with a title but no description
      {{/layout.annotatedSection}}

      {{#layout.annotatedSection
        description="Inline description"
      }}
        This is an inline annotated section with a description but no title
      {{/layout.annotatedSection}}

      {{#layout.annotatedSection
        title="Inline title"
        description="Inline description"
      }}
        This is an inline annotated section with both a title and description
      {{/layout.annotatedSection}}
    {{/polaris-layout}}
  `);

  const annotationWrappers = findAll(layoutAnnotationWrapperSelector);
  assert.equal(annotationWrappers.length, 5, 'renders five annotation wrappers');

  const textContainerSelector = buildNestedSelector('div.Polaris-Layout__Annotation', 'div.Polaris-TextContainer');
  const headerSelector = buildNestedSelector(textContainerSelector, 'h2.Polaris-Heading');
  const descriptionSelector = buildNestedSelector(textContainerSelector, 'p');
  const contentSelector = 'div.Polaris-Layout__AnnotationContent';

  // Check the first annotation.
  let annotationWrapper = annotationWrappers[0];

  let headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'first annotation - renders header');
  assert.equal(headers[0].textContent.trim(), '', 'first annotation - renders header correctly');

  let descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 0, 'first annotation - renders description paragraph correctly');

  let contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'first annotation - renders content');
  assert.equal(contents[0].textContent.trim(), '', 'first annotation - renders correct content');

  // Check the second annotation.
  annotationWrapper = annotationWrappers[1];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'second annotation - renders header');
  assert.equal(headers[0].textContent.trim(), '', 'second annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 0, 'second annotation - renders description paragraph correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'second annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section without title or description', 'second annotation - renders correct content');

  // Check the third annotation.
  annotationWrapper = annotationWrappers[2];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'third annotation - renders header');
  assert.equal(headers[0].textContent.trim(), 'Inline title', 'third annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 0, 'third annotation - renders description paragraph correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'third annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section with a title but no description', 'third annotation - renders correct content');

  // Check the fourth annotation.
  annotationWrapper = annotationWrappers[3];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'fourth annotation - renders header');
  assert.equal(headers[0].textContent.trim(), '', 'fourth annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 1, 'fourth annotation - renders description paragraph');
  assert.equal(descriptions[0].textContent.trim(), 'Inline description', 'fourth annotation - renders header correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'fourth annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section with a description but no title', 'fourth annotation - renders correct content');

  // Check the fifth annotation.
  annotationWrapper = annotationWrappers[4];

  headers = findAll(headerSelector, annotationWrapper);
  assert.equal(headers.length, 1, 'fifth annotation - renders header');
  assert.equal(headers[0].textContent.trim(), 'Inline title', 'fifth annotation - renders header correctly');

  descriptions = findAll(descriptionSelector, annotationWrapper);
  assert.equal(descriptions.length, 1, 'fifth annotation - renders description paragraph');
  assert.equal(descriptions[0].textContent.trim(), 'Inline description', 'fifth annotation - renders header correctly');

  contents = findAll(contentSelector, annotationWrapper);
  assert.equal(contents.length, 1, 'fifth annotation - renders content');
  assert.equal(contents[0].textContent.trim(), 'This is an inline annotated section with both a title and description', 'fifth annotation - renders correct content');
});
