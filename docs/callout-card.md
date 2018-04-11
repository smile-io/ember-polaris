[< Back to Components List](../README.md#components)

## Callout card

`polaris-callout-card` implements the [Polaris Callout card component](https://polaris.shopify.com/components/structure/callout-card).

### Examples

Inline usage without secondary action:

```hbs
{{polaris-callout-card
  title="New feature"
  text="This new feature is awesome!"
  primaryAction=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
}}
```

Block usage with secondary action:

```hbs
{{#polaris-callout-card
  title="New feature"
  primaryAction=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
  secondaryAction=(hash
    text="Learn more"
    onAction=(action "showDetails")
  )
}}
  We've got an awesome new feature!
{{/polaris-callout-card}}
```
