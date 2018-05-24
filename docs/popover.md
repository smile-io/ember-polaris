[< Back to Components List](../README.md#components)

## Popover

`polaris-popover` implements the [Polaris Popover
component](https://polaris.shopify.com/components/overlays/popover). This component uses [`ember-basic-dropdown`](https://github.com/cibernox/ember-basic-dropdown) to implement popover functionality. Note that the usage is slightly different from the React implementation so please pay attention to the examples below.


**NOTE:** _the `active`, `activatorWrapper`, and `preventAutofocus` properties are currently unimplemented._

### Examples

Basic usage:

```hbs
{{#polaris-popover as |popover|}}
  {{#popover.activator}}
    {{polaris-button text="Toggle popover"}}
  {{/popover.activator}}

  {{#popover.content}}
    This is the popover content
  {{/popover.content}}
{{/polaris-popover}}
```

Sectioned popover with `onClose` action:

```hbs
{{#polaris-popover
  sectioned=true
  onClose=(action "myCloseAction")
  as |popover|
}}
  {{#popover.activator}}
    {{polaris-button text="Toggle popover"}}
  {{/popover.activator}}

  {{#popover.content}}
    This is the popover content
  {{/popover.content}}
{{/polaris-popover}}
```
