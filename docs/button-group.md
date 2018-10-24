[< Back to Components List](../README.md#components)

## Button group

`polaris-button-group` implements the [Polaris Button group component](https://polaris.shopify.com/components/actions/button-group).

Any child elements inside a `polaris-button-group` block will be auto-wrapped as group items as per the React component. We also make a `polaris-button-group/item` component available inside the block to allow more control over the items if desired.

### Examples

Basic usage:

```hbs
{{#polaris-button-group}}
  {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
{{/polaris-button-group}}
```

Buttons joined as segmented group (*N.B.* when using segmented button groups, you must explicitly add group item wrappers around each item to handle focused styling correctly):

```hbs
{{#polaris-button-group segmented=true as |group|}}
  {{#group.item}}
    {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{/group.item}}

  {{#group.item}}
    {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
  {{/group.item}}
{{/polaris-button-group}}
```

Plain buttons:

```hbs
{{#polaris-button-group as |buttonGroup|}}
  {{#buttonGroup.item plain=true}}
    {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{/buttonGroup.item}}

  {{#buttonGroup.item plain=true}}
    {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
  {{/buttonGroup.item}}
{{/polaris-button-group}}
```

Full width and connected top options:

```hbs
{{#polaris-button-group fullWidth=true connectedTop=true}}
  {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
{{/polaris-button-group}}
```

For dynamic button groups where buttons are added or removed once the button group has rendered, you must explicitly add an item component around each item to prevent a Glimmer error such as `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node`:

```hbs
{{#polaris-button-group as |group|}}
  {{#each buttons as |button|}}
    {{#group.item}}
      ...
    {{/group.item}}
  {{/each}}

  {{#if canRemove}}
    {{#group.item}}
      ...
    {{/group.item}}
  {{/if}}
{{/polaris-button-group}}
```
