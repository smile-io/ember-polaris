[< Back to Components List](../README.md#components)

## Resource list

`polaris-resource-list` implements the [Polaris Resource list component](https://polaris.shopify.com/components/lists/resource-list). The `renderItem` property has been replaced with an `itemComponent` attribute which takes a component name as a string. The provided component will be passed the `item` and its `index` as attributes.

The default list item component (`polaris-resource-list/item`) replicates the React component's behaviour and accepts the following `item` properties: `url`, `media`, `attributeOne`, `attributeTwo`, `attributeThree`, `badges`, `exceptions`, `actions` and `persistActions`. **NOTE:** _the `url`, `media`, `badges`, `exceptions`, `actions` and `persistActions` item properties are currently unimplemented._

### Examples

Basic usage with Shopify's default item rendering (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-resource-list
  items=(array
    (hash
      attributeOne="An item"
      attributeTwo="by Bob Smith"
      attributeThree="Yesterday"
    )
    (hash
      attributeOne="Another item"
      attributeTwo="by Jim Jones"
      attributeThree="Today"
    )
  )
}}
```

Using a custom component to render each item:

```hbs
{{polaris-resource-list
  items=items
  itemComponent="my-custom-resource-list-item"
}}
```
