[< Back to Components List](../README.md#components)

## Color picker

`polaris-color-picker` implements the [Polaris Color picker component](https://polaris.shopify.com/components/forms/color-picker).

### Examples

Default color picker:

```hbs
{{polaris-color-picker
  color=color
  onChange=(action (mut color))
}}
```

Color picker with alpha:

```hbs
{{polaris-color-picker
  color=color
  allowAlpha=true
  onChange=(action (mut color))
}}
```
