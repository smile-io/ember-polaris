[< Back](../README.md)

## Tag

`polaris-tag` implements the [Polaris Tag component](https://polaris.shopify.com/components/forms/tag).

### Examples

Tag inline usage:

```hbs
{{polaris-tag
  text="Wholesale"
  onRemove=(action "myTagRemoveAction")
}}
```

Tag block usage:

```hbs
{{#polaris-tag
  onRemove=(action "myTagRemoveAction")
}}
  Wholesale
{{/polaris-tag}}
```
