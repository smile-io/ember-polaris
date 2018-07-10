[< Back to Components List](../README.md#components)

## Form layout
`polaris-form-layout` implements the [Polaris Form layout component](https://polaris.shopify.com/components/forms/form-layout).

`polaris-form-layout` and `polaris-form-layout/group` yield an `item` component that can be used to explicitly wrap form items should you wish to. Any items inside a `polaris-form-layout` or `polaris-form-layout/group` block that are not explicitly wrapped in this way will be auto-wrapped as per the React components.

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

For dynamic forms where items are added or removed once the form has rendered, you must explicitly add a form layout item component around each item to prevent a Glimmer error such as `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node`:

```hbs
{{#polaris-form-layout as |formLayout|}}
  {{#if canEdit}}
    {{#formLayout.item}}
      ...
    {{/formLayout.item}}
  {{/if}}

  {{#formLayout.group as |group|}}
    {{#each formGroupItems as |formGroupItem|}}
      {{#group.item}}
        ...
      {{/group.item}}
    {{/each}}
  {{/formLayout.group}}
{{/polaris-form-layout}}
```
