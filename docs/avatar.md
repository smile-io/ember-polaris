[< Back to Components List](../README.md#components)

## Avatar

`polaris-avatar` implements the [Polaris Avatar component](https://polaris.shopify.com/components/images-and-icons/avatar). Note that we have added an `avatarSourcePath` property which specifies the path to where the included Polaris avatar SVG images reside in the host application.

### Examples

Basic usage:

```hbs
{{polaris-avatar name="Jim Smith"}}
```

Display a customer avatar with a specific image:

```hbs
{{polaris-avatar customer=true source="/assets/avatars/jim-smith.png"}}
```
