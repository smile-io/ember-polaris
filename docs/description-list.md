[< Back to Components List](../README.md#components)

## Description list

`polaris-description-list` implements the [Polaris Description list component](https://polaris.shopify.com/components/lists/description-list).

**NOTE:** _The item `term` and `description` properties in this implementation only support string values - to emulate the React component's ability to pass a node in for these attributes, use `termComponent` and `descriptionComponent` instead._

### Example

Basic description list usage (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-description-list
  items=(array
    (hash
      term="My term"
      description="My description"
    )
    (hash
      term="Another term"
      description="Another description"
    )
  )
}}
```

Rendering a component in place of `item` or `description`:

```hbs
{{polaris-description-list
  items=(array
    (hash
      termComponent=(component "my-term-component")
      description="..."
    )
    (hash
      term="..."
      descriptionComponent=(component "my-description-component")
    )
  )
}}
```
