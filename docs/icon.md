[< Back to Components List](../README.md#components)

## Icon

`PolarisIcon` implements the [Polaris Icon component](https://polaris.shopify.com/components/images-and-icons/icon).

### Examples

Basic usage:

```hbs
<PolarisIcon @source="Notes" />
```

Customizing with color and backdrop:

```hbs
<PolarisIcon @source="AddMinor" @color="tealDark" @backdrop={{true}} />
```


### Rendering custom icons

By default, `PolarisIcon` will render SVG's passed directly as strings to `@source` as external images.
If you want to render custom icons similarly as main Polaris icons are rendered, you can configure `ember-svg-jar` in your app instead.

```javascript
// ember-cli-build.js
var app = new EmberApp(defaults, {
  ...

  svgJar: {
    strategy: 'inline',
    inline: {
      sourceDirs: [
        'public/assets/icons',
      ],
    }
  },
});
```
