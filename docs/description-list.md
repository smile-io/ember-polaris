[< Back to Components List](../README.md#components)

## Description list

`polaris-description-list` implements the [Polaris Description list component](https://polaris.shopify.com/components/lists/description-list).

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
      term=(component "my-term-component")
      description="..."
    )
    (hash
      term="..."
      description=(component "my-description-component")
    )
  )
}}
```
