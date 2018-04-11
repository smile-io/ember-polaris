[< Back to Components List](../README.md#components)

## Page actions

`polaris-page-actions` implements the [Polaris Page actions component](https://polaris.shopify.com/components/structure/page-actions).

### Examples

Primary action only:

```hbs
{{polaris-page-actions
  primaryAction=(hash
    text="Save"
    onAction=(action "save")
  )
}}
```

Primary action with two secondary actions (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-page-actions
  primaryAction=(hash
    text="Save"
    onAction=(action "save")
  )
  secondaryActions=(array
    (hash
      text="Delete"
      onAction=(action "delete")
    )
    (hash
      text="Cancel"
      onAction=(action "cancel")
    )
  )
}}
```
