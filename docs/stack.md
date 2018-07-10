[< Back to Components List](../README.md#components)

## Stack

`polaris-stack` implements the [Polaris Stack component](https://polaris.shopify.com/components/structure/stack).

Any child elements inside a `polaris-stack` block will be auto-wrapped as stack items as per the React component. We also make a `polaris-stack/item` component available inside the block to allow more control over the items if desired.

### Examples

Basic usage:

```hbs
{{#polaris-stack}}
  <div>Stack item 1</div>
  <div>Stack item 2</div>
{{/polaris-stack}}
```

Vertical stack with tight spacing:

```hbs
{{#polaris-stack vertical=true spacing="tight"}}
  <div>Stack item 1</div>
  <div>Stack item 2</div>
{{/polaris-stack}}
```

Stack with one item on the left and one pushed to the right:

```hbs
{{#polaris-stack as |stack|}}
  {{#stack.item fill=true}}
    <div>Stack item 1</div>
  {{/stack.item}}

  <div>Stack item 2</div>
{{/polaris-stack}}
```

For dynamic stacks where items are added or removed once the stack has rendered, you must explicitly add an item component around each item to prevent a Glimmer error such as `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node`:

```hbs
{{#polaris-stack as |stack|}}
  {{#each stackItems as |stackItem|}}
    {{#stack.item}}
      ...
    {{/stack.item}}
  {{/each}}

  {{#unless isUpdating}}
    {{#stack.item}}
      ...
    {{/stack.item}}
  {{/unless}}
{{/polaris-stack}}
```
