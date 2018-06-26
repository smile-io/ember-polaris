[< Back to Components List](../README.md#components)

## Checkbox

`polaris-checkbox` implements the [Polaris Checkbox component](https://polaris.shopify.com/components/forms/checkbox).

**NOTE:** _the React component's `id` property has been renamed to `inputId` in this Ember implementation._

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

Checkbox with a component rendered as its label:

```hbs
{{polaris-checkbox
  label=(component "my-awesome-label" color="purple")
  checked=checked
  onChange=(action (mut checked))
}}
```
