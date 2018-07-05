[< Back to Components List](../README.md#components)

## Text field

`polaris-text-field` implements the [Polaris Text field component](https://polaris.shopify.com/components/forms/text-field).

### Examples

Basic usage:

```hbs
{{polaris-text-field
  label="First name"
  placeholder="e.g. Bob"
  value=value
  onChange=(action "handleChange")
}}
```

Numeric field with hidden label:

```hbs
{{polaris-text-field
  label="Quantity"
  labelHidden=true
  type="number"
  value=value
  onChange=(action "handleChange")
}}
```

Text field with label action:

```hbs
{{polaris-text-field
  value=value
  onChange=(action "handleChange")
  labelAction=(hash
    text="Forgot password?"
    onAction=(action "resetPassword")
  )
}}
```

Text field with prefix, suffix, and help text:

```hbs
{{polaris-text-field
  label="Price"
  prefix="$"
  suffix="USD"
  helpText="Some help text"
  value=value
}}
```

Text field with connected fields:

```hbs
{{polaris-text-field
  value=value
  connectedLeft="Connection as string"
  connectedRight=(component
    "polaris-button"
    text="Connection as component"
    onClick=(action "myAction")
  )
}}
```

Text field with multiline:

```hbs
{{polaris-text-field
  multiline=true
  value=value
  onChange=(action "handleChange")
}}
```
