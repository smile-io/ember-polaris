[< Back to Components List](../README.md#components)

## Empty state

`polaris-empty-state` implements the [Polaris Empty state component](https://polaris.shopify.com/components/structure/empty-state).

**NOTE:** _the `largeImage` property is currently unimplemented._

### Examples

Inline usage without secondary action:

```hbs
{{polaris-empty-state
  heading="Check out this new feature"
  image="new-feature.jpg"
  text="This new feature is great"
  action=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
}}
```

Block usage with secondary action:

```hbs
{{#polaris-empty-state
  heading="Check out this new feature"
  image="new-feature.jpg"
  action=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
  secondaryAction=(hash
    text="Learn more"
    onAction=(action "openBlog")
  )
}}
  We've got an awesome new feature!
{{/polaris-empty-state}}
```
