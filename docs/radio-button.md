[< Back to Components List](../README.md#components)

## Radio button

`polaris-radio-button` implements the [Polaris Radio button component](https://polaris.shopify.com/components/forms/radio-button).

**NOTE:** _the React component's `id` property has been renamed to `inputId` in this Ember implementation._

### Examples

Basic radio button:

```hbs
{{polaris-radio-button
  label="This is a radio button"
  value="option-1"
  onChange=(action (mut selectedValue))
}}
```

Radio button with help text:

```hbs
{{polaris-radio-button
  label="This is a radio button"
  helpText="Click the button to change the selected value"
  value="option-1"
  onChange=(action (mut selectedValue))
}}
```

Radio button with custom label component:

```hbs
{{polaris-radio-button
  label=(component "my-custom-label")
  value="option-1"
  onChange=(action (mut selectedValue))
}}
```
