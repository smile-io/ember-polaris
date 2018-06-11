[< Back to Components List](../README.md#components)

## Drop zone

`polaris-dropzone` implements the [Polaris Drop zone component](https://polaris.shopify.com/components/actions/drop-zone).

### Examples

Plain drop zone:

```hbs
{{polaris-dropzone}}
```

Dropzone with image file upload:

```hbs
{{#polaris-dropzone
  accept="image/*"
  type="image"
  onDrop=(action "dropImages")
  as |dropzone|
}}
  {{dropzone.fileUpload}}
{{/polaris-dropzone}}
```
