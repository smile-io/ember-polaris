[< Back to Components List](../README.md#components)

## Choice list

`polaris-choice-list` implements the [Polaris Choice list component](https://polaris.shopify.com/components/forms/choice-list).

**NOTE:** _the `renderChildren` choice property is currently unimplemented._

### Examples

Single choice list (radio buttons), using [ember-array-helper](https://github.com/kellyselden/ember-array-helper):

```hbs
{{polaris-choice-list
  allowMultiple=false
  choices=(array
    (hash
      label="Option 1"
      value="one"
    )
    (hash
      label="Option 2"
      value="two"
    )
    (hash
      label="Option 3"
      value="three"
    )
  )
  selected=selected
  onChange=(action (mut selected))
}}
```

Multiple choice list (checkboxes) with title:

```hbs
{{polaris-choice-list
  allowMultiple=true
  title="Choose from these options"
  choices=(array
    (hash
      label="Option 1"
      value="one"
    )
    (hash
      label="Option 2"
      value="two"
    )
    (hash
      label="Option 3"
      value="three"
    )
  )
  selected=selected
  onChange=(action (mut selected))
}}
```

Render childComponent for a selected choice

```hbs
{{polaris-choice-list
  title="Choose from these options"
  choices=(array
    (hash
      label="Option 1"
      value="one"
    )
    (hash
      label="Option 2"
      value="two"
      childComponent=(component "polaris-text-field" ...)
    )
  )
  selected=selected
  onChange=(action (mut selected))
}}
```


Always render childComponent for a choice

```hbs
{{polaris-choice-list
  title="Choose from these options"
  choices=(array
    (hash
      label="Option 1"
      value="one"
    )
    (hash
      label="Option 2"
      value="two"
      childComponent=(component "polaris-text-field" ...)
      alwaysRenderChildComponent=true
    )
  )
  selected=selected
  onChange=(action (mut selected))
}}
```
