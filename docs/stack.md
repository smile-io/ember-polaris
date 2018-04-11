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
