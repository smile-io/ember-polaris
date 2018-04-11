[< Back to Components List](../README.md#components)

## Icon

`polaris-icon` implements the [Polaris Icon component](https://polaris.shopify.com/components/images-and-icons/icon).

**NOTE:** The icon component uses [`ember-svg-jar`](https://github.com/ivanvotti/ember-svg-jar/)
to render the SVG icons. You will have to make sure that you copy the icons into your public folder and
configure `ember-svg-jar` to serve them from `polaris` namespace.

### Examples

Basic usage:

```hbs
{{polaris-icon source="notes"}}
```

Customizing with color and backdrop:

```hbs
{{polaris-icon source="add" color="darkTeal" backdrop=true}}
```
