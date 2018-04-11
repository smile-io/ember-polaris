[< Back](../README.md)

## Popover

`polaris-popover` implements the [Polaris Popover
component](https://polaris.shopify.com/components/overlays/popover). This component uses [`ember-basic-dropdown`](https://github.com/cibernox/ember-basic-dropdown) to implement popover functionality. Note that the usage is slightly different from the React implementation so please pay attention to the examples below.


**NOTE:** _the `preferredPosition`, `active`, `activatorWrapper`, `preventAutofocus` and `onClose` properties are currently unimplemented._

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

Sectioned popover:

```hbs
{{#polaris-popover sectioned=true as |popover|}}
  {{#popover.activator}}
    {{polaris-button text="Toggle popover"}}
  {{/popover.activator}}

  {{#popover.content}}
    This is the popover content
  {{/popover.content}}
{{/polaris-popover}}
```
