[< Back to Components List](../README.md#components)

## Banner

`polaris-banner` implements the [Polaris Banner component](https://polaris.shopify.com/components/feedback-indicators/banner).

### Examples

Basic usage:

```hbs
{{polaris-banner text="This order has been shipped."}}
```

With a success status set, custom icon, content, dismiss button and actions:

```hbs
{{#polaris-banner
  status="success"
  icon="confetti"
  action=(hash
    text="Track"
    onAction=(action "trackPackage")
  )
  secondaryAction=(hash
    text="View"
    onAction=(action "viewOrder")
  )
  onDismiss=(action "handleDismiss")
}}
  <p>This order has been shipped.</p>
{{/polaris-banner}}
```

**NOTE:** If using the banner inside a card/modal, you need to manually pass `withinContentContainer=true`. This manual requirement won't be needed once `app-provider` component is implemented.
