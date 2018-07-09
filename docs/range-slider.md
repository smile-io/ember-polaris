[< Back to Components List](../README.md#components)

## Range slider

`polaris-range-slider` implements the [Polaris Range slider component](https://polaris.shopify.com/components/forms/range-slider).

### Examples

Default range slider (range of `0`-`100`):

```hbs
{{polaris-range-slider
  label="Opacity percentage"
  value=value
  onChange=(action (mut value))
}}
```

Range slider with custom minimum, maximum and step sizes:

```hbs
{{polaris-range-slider
  label="Logo offset"
  min=-10
  max=10
  step=5
  value=value
  onChange=(action (mut value))
}}
```

Passing help text and error information:

```hbs
{{polaris-range-slider
  label="Opacity percentage"
  value=value
  helpText="Choose the opacity of your logo image"
  error="Invalid opacity value"
  onChange=(action (mut value))
}}
```
