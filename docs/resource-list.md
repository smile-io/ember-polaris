[< Back to Components List](../README.md#components)

## Resource list

`polaris-resource-list` implements the [Polaris Resource list component](https://polaris.shopify.com/components/lists-and-tables/resource-list). The `renderItem` property has been replaced with an `itemComponent` attribute which takes a component name as a string. The provided component will be passed the `item` and its `itemId` as attributes.

The `itemComponent` property is required, so that `polaris-resource-list` knows how to render individual items, and how those items should behave when the user interacts with them. A `polaris-resource-list/item` component is provided as a quick starting point for this. It accepts the following properties: `accessibilityLabel`, `ariaControls`, `ariaExpanded`, `media`, `persistActions`, `shortcutActions`, `children`, `url` and `onClick`.

### Examples

#### Simple resource list

Define a tagless item component `my-item-component` to render items:

```js
/* app/components/my-item-component.js */

import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  // `item` and `itemId` will be passed in by `polaris-resource-list`.
  item: null,
  itemId: null,

  accessibilityLabel: computed('item.name', function() {
    return `View details for ${this.get('item.name')}`;
  }).readOnly(),
});
```

```hbs
{{!-- app/templates/components/my-item-component.hbs --}}

{{#polaris-resource-list/item
  itemId=itemId
  url=item.url
  accessibilityLabel=accessibilityLabel
  media=(component
    "polaris-avatar"
    customer=true
    size="medium"
    name=item.name
  )
}}
  <h3>
    {{polaris-text-style
      variation="strong"
      text=item.name
    }}
  </h3>
  <div>{{item.location}}</div>
{{/polaris-resource-list/item}}
```

then use that component with `polaris-resource-list` to render items (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-resource-list
  resourceName=(hash
    singular="customer"
    plural="customers"
  )
  items=(array
    (hash
      id=341
      url="customers/341"
      name="Mae Jemison"
      location="Decatur, USA"
    )
    (hash
      id=256
      url="customers/256"
      name="Ellen Ochoa"
      location="Los Angeles, USA"
    )
  )
  itemComponent="my-item-component"
}}
```

For additional examples, refer to the source code for the [`resource-list` page](https://github.com/smile-io/ember-polaris/blob/master/tests/dummy/app/templates/resource-list.hbs) and associated [components](https://github.com/smile-io/ember-polaris/blob/master/tests/dummy/app/components/resource-list) in the dummy app.
