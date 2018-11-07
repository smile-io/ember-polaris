[< Back to Components List](../README.md#components)

## Card

`polaris-card` implements the [Polaris Card component](https://polaris.shopify.com/components/structure/card). The `actions` property on the React implementation has been renamed to `headerActions` for this Ember version.

### Examples

Each of `{{polaris-card}}` and `{{polaris-card/section}}` can be used in both inline or block form as described in the [main documentation](../README.md#children-property), with the `text` attribute being used for their content when used inline. These examples will only show them in block form, since that is the most common use case.

Basic usage:

```hbs
{{#polaris-card title="This is the card title"}}
  <p>This is the card content</p>
{{/polaris-card}}
```

Subdued card with no title:

```hbs
{{#polaris-card subdued=true}}
  <p>This is the subdued card content</p>
{{/polaris-card}}
```

With actions in the header (needs a non-empty title) using [ember-array-helper](https://github.com/kellyselden/ember-array-helper):

```hbs
{{#polaris-card
  title="This is a card with actions"
  headerActions=(array
    (hash
      text="Action 1"
      onAction=(action "doSomething")
    )
    (hash
      text="Action 2"
      onAction=(action (mut action2Clicked) true)
    )
  )
}}
  <p>This is the card content</p>
{{/polaris-card}}
```

Three sections - first section with a title, second full width (without padding), third section subdued:

```hbs
{{#polaris-card title="This is the card title" sectioned=false as |card|}}
  {{#card.section title="Section 1"}}
    <p>This is the first section's content</p>
  {{/card.section}}

  {{#card.section fullWidth=true}}
    <p>This is the second section's content</p>
  {{/card.section}}

  {{#card.section subdued=true}}
    <p>This is the third section's subdued content</p>
  {{/card.section}}
{{/polaris-card}}
```

With footer actions (the buttons support the `loading` attribute which isn't a part of the original spec)

```hbs
{{#polaris-card
  primaryFooterAction=(hash
    text="Save"
    disabled=true
    onAction=(action "successAction")
  )
  secondaryFooterAction=(hash
    text="Cancel"
    onAction=(action "cancelAction")
  )
}}
  I'm a cool card 😎
{{/polaris-card}}
```
