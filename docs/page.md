[< Back to Components List](../README.md#components)

## Page
`polaris-page` implements the [Polaris Page component](https://polaris.shopify.com/components/structure/page).

**NOTE:** _the `icon`, `actionGroups` and `pagination` properties are currently unimplemented._

### Examples

Basic usage:

```hbs
{{#polaris-page
  title="Welcome to Polaris!"
}}
  Your page content goes here
{{/polaris-page}}
```

Full-width page with disableable primary action and secondary actions (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-page
  title="This is the title"
  fullWidth=true
  primaryAction=(hash
    text="Take action!"
    disabled=primaryActionDisabled
    onAction=(action "primaryActionFired")
  )
  secondaryActions=(array
    (hash
      text="Do something"
      onAction=(action "secondaryAction1Fired")
    )
    (hash
      text="Do something else"
      onAction=(action (mut secondaryAction2Fired) true)
    )
  )
}}
```

Page with title and breadcrumbs. Breadcrumbs take `url` or `onAction` properties. Note that only the last breadcrumb will be rendered:

```hbs
{{#polaris-page
  title="Welcome to Polaris!"
  breadcrumbs=(array
    (hash
      content="Parent"
      url="/home"
    )
    (hash
      content="Child"
      onAction=(action "goToChildRoute")
    )
  )
}}
  Your page content goes here
{{/polaris-page}}
```
