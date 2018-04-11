[< Back](../README.md)

## Action list

`polaris-action-list` implements the [Polaris Action list component](https://polaris.shopify.com/components/actions/action-list).

### Examples

Basic usage (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-action-list
  items=(array
    (hash
      text="This is the first item"
      onAction=(action "firstItemClicked")
    )
    (hash
      text="This is item number two"
      onAction=(action (mut secondItemClicked) true)
    )
  )
}}
```

With icons:

```hbs
{{polaris-action-list
  items=(array
    (hash
      text="Add an item..."
      icon="add"
      onAction=(action "addItem")
    )
    (hash
      text="Delete this item"
      icon="delete"
      onAction=(action "deleteItem")
    )
  )
}}
```

With sections and an action fired when any item is selected:

```hbs
{{polaris-action-list
  items=(array
    (hash
      text="View"
      onAction=(action "viewItem")
    )
    (hash
      text="Delete"
      onAction=(action "deleteItem")
    )
  )
  sections=(array
    (hash
      title="Social"
      items=(array
        (hash
          text="Share on Facebook"
          onAction=(action "shareOnFacebook")
        )
        (hash
          text="Share on Twitter"
          onAction=(action "shareOnTwitter")
        )
      )
    )
    (hash
      items=(array
        (hash
          text="About"
          onAction=(action "showInfo")
        )
      )
    )
  )
  onActionAnyItem=(action "anyItemSelected")
}}
```
