[< Back to Components List](../README.md#components)

## Option list

`polaris-option-list` implements the [Polaris Option list component](https://polaris.shopify.com/components/lists-and-tables/option-list).

### Examples

Simple option list (single-option selection):

```hbs
{{polaris-option-list
  title="Inventory Location"
  options=(array
    (hash value="byward_market" label="Byward Market")
    (hash value="centretown" label="Centretown")
    (hash value="hintonburg" label="Hintonburg")
    (hash value="westboro" label="Westboro")
    (hash value="downtown" label="Downtown")
  )
  selected=selected
  onChange=(action (mut selected))
}}
```

Multiple option list:

```hbs
{{polaris-option-list
  title="Manage sales channels availability"
  allowMultiple=true
  options=(array
    (hash value="online_store" label="Online Store")
    (hash value="messenger" label="Messenger")
    (hash value="facebook" label="Facebook")
    (hash value="wholesale" label="Wholesale")
    (hash value="buzzfeed" label="BuzzFeed")
  )
  selected=selected
  onChange=(action (mut selected))
}}
```

Option list with sections:

```hbs
{{polaris-option-list
  allowMultiple=true
  sections=(array
    (hash
      options=(array
        (hash value="type" label="Sale item type")
        (hash value="kind" label="Sale kind")
      )
    )
    (hash
      title="Traffic"
      options=(array
        (hash value="source" label="Traffic referrer source")
        (hash value="host" label="Traffic referrer host")
        (hash value="path" label="Traffic referrer path")
      )
    )
  )
  selected=selected
  onChange=(action (mut selected))
}}
```
