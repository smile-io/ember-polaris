[< Back](../README.md)

## Checkbox

`polaris-checkbox` implements the [Polaris Checkbox component](https://polaris.shopify.com/components/forms/checkbox).

**NOTE:** _the React component's `id` property has been renamed to `inputId` in this Ember implementation. The `label` property in this implementation only supports string values - to emulate the React component's ability to pass a node in for the `label`, use `labelComponent` instead._

### Examples

Basic checkbox:

```hbs
{{polaris-checkbox
  label="This is a checkbox"
  checked=checked
  onChange=(action (mut checked))
}}
```

Checkbox with help text and value:

```hbs
{{polaris-checkbox
  label="This is a checkbox with help text"
  helpText="Click the checkbox to toggle something"
  value="my-checkbox-value"
  checked=checked
  onChange=(action (mut checked))
}}
```

Checkbox with a simple component rendered as its label:

```hbs
{{polaris-checkbox
  labelComponent="my-awesome-label"
  checked=checked
  onChange=(action (mut checked))
}}
```

Checkbox with more advanced component usage for the label:

```hbs
{{polaris-checkbox
  labelComponent=(component "my-awesome-label" color="purple")
  checked=checked
  onChange=(action (mut checked))
}}
```
