[< Back to Components List](../README.md#components)

## Link

`polaris-link` implements the [Polaris Link
component](https://polaris.shopify.com/components/navigation/link).

### Examples

Basic inline link usage:

```hbs
{{polaris-link
  text="This is an inline link"
  url="http://www.somewhere.com/"
}}
```

External link in block form:

```hbs
{{#polaris-link
  url="http://www.somewhere.com/"
  external=true
}}
  This is a block link
{{/polaris-link}}
```

Button usage:

```hbs
{{polaris-link
  text="Click me"
  onClick=(action "linkButtonClicked")
}}
```
