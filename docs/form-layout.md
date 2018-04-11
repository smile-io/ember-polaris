[< Back to Components List](../README.md#components)

## Form layout
`polaris-form-layout` implements the [Polaris Form layout component](https://polaris.shopify.com/components/forms/form-layout).

Any child elements inside a `polaris-form-layout` or `polaris-form-layout/group` block will be auto-wrapped as form items as per the React components.

### Examples

Default form layout:

```hbs
{{#polaris-form-layout}}
  ... items...
{{/polaris-form-layout}}
```

Form layout with two groups, the second of which is condensed:

```hbs
{{#polaris-form-layout as |formLayout|}}
  {{#formLayout.group}}
    ... first group items...
  {{/formLayout.group}}

  {{#formLayout.group condensed=true}}
    ... second (condensed) group items...
  {{/formLayout.group}}
{{/polaris-form-layout}}
```
