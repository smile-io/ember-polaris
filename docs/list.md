[< Back to Components List](../README.md#components)

## List

`polaris-list` implements the [Polaris List component](https://polaris.shopify.com/components/lists/list). This component should be used in block form to access the `list.item` component, as in the examples below.

### Examples

Default (bulleted) list (this can also be achieved by explicitly passing `type="bullet"` to the `polaris-list`):

```hbs
{{#polaris-list as |list|}}
  {{list.item text="Point one (inline form)"}}

  {{#list.item}}
    Second point (block form)
  {{/list.item}}
{{/polaris-list}}
```

Numbered list iterating over a `numberedItems` array:

```hbs
{{#polaris-list type="number" as |list|}}
  {{#each numberedItems as |item|}}
    {{list.item text=item}}
  {{/each}}
{{/polaris-list}}
```
