[< Back to Components List](../README.md#components)

## Button

`polaris-button` implements the [Polaris Button component](https://polaris.shopify.com/components/actions/button).

In the future we intend to extend this component to be more Ember-friendly by adding support for `link-to` behavior; however, this is not yet implemented. In the meantime we suggest using something like [`ember-transition-helper`](https://github.com/peec/ember-transition-helper) to achieve the same result.

### Examples

Basic button:

```hbs
{{#polaris-button onClick=(action "doSomething")}}
  Push me!
{{/polaris-button}}
```

Slim external link:

```hbs
{{#polaris-button
  url="www.example.com"
  external=true
  size="slim"
}}
  I'm a link
{{/polaris-button}}
```

Loading button with a spinner:

```hbs
{{polaris-button
  text="Load something"
  loading=isLoading
  onClick=(action (mut isLoading) true)
}}
```
