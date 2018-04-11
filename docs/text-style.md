[< Back to Components List](../README.md#components)

## Text style

`polaris-text-style` implements the [Polaris Text style component](https://polaris.shopify.com/components/titles-and-text/text-style). The only available attribute is `variation` which specifies the style to apply to the `text` or block content. Allowed values are `positive` (green text), `negative` (red text), `strong` (bold text) and `subdued` (muted text).

### Examples

Inline form with positive (green) text:

```hbs
{{polaris-text-style variation="positive" text="This text is positive and green"}}
```

Block form with subdued (muted) text:

```hbs
{{#polaris-text-style variation="subdued"}}
  This text is subdued and looks muted
{{/polaris-text-style}}
```
