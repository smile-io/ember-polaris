[< Back to Components List](../README.md#components)

## Layout

`polaris-layout` implements the [Polaris Layout component](https://polaris.shopify.com/components/structure/layout).

### Examples

Each of `{{polaris-layout}}`, `{{polaris-layout/section}}` and `{{polaris-layout/annotated-section}}` can be used in both inline or block form as described in the [main documentation](../README.md#children-property), with the `text` attribute being used for their content when used inline. These examples will only show them in block form, since that is the most common use case.

One-column layout:

```hbs
{{#polaris-layout as |layout|}}
  {{#layout.section}}
    <p>Section content goes here</p>
  {{/layout.section}}
{{/polaris-layout}}
```

Two-column layout:

```hbs
{{#polaris-layout as |layout|}}
  {{#layout.section}}
    <p>Column 1</p>
  {{/layout.section}}

  {{#layout.section secondary=true}}
    <p>Column 2</p>
  {{/layout.section}}
{{/polaris-layout}}
```

Annotated layout:

```hbs
{{#polaris-layout as |layout|}}
  {{#layout.annotatedSection
    title="First Section"
    description="This is the first section"
  }}
    <p>Section 1 content here</p>
  {{/layout.annotatedSection}}

  {{#layout.annotatedSection
    title="Second section"
    description=(component "my-custom-description-component")
  }}
    <p>Section 2 content here</p>
  {{/layout.annotatedSection}}
{{/polaris-layout}}
```
