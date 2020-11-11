[< Back to Components List](../README.md#components)

## Callout card

`PolarisCalloutCard` implements the [Polaris Callout card component](https://polaris.shopify.com/components/structure/callout-card).

### Examples

Inline usage without secondary action:

```hbs
<PolarisCalloutCard
  @title="New feature"
  @text="This new feature is awesome!"
  @primaryAction=(hash
    text="Take a look"
    onAction=(fn this.showNewFeature)
  )
/>
```

Block usage with secondary action:

```hbs
<PolarisCalloutCard
  @title="New feature"
  @primaryAction={{hash
    text="Take a look"
    onAction=(fn this.showNewFeature)
  }}
  @secondaryAction={{hash
    text="Learn more"
    onAction=(fn showDetails)
  }}
>
  We've got an awesome new feature!
</PolarisCalloutCard>
```
