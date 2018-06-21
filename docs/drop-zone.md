[< Back to Components List](../README.md#components)

## Drop zone

`polaris-drop-zone` implements the [Polaris Drop zone component](https://polaris.shopify.com/components/actions/drop-zone).

### Examples

Plain drop zone:

```hbs
{{polaris-drop-zone}}
```

Drop zone with image file upload:

```hbs
{{#polaris-drop-zone
  accept="image/*"
  type="image"
  onDrop=(action "dropImages")
  as |dropZone|
}}
  {{dropZone.fileUpload}}
{{/polaris-drop-zone}}
```
