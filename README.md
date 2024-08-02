ember-polaris
==============================================================================
[![](https://github.com/smile-io/ember-polaris/workflows/CI/badge.svg)](https://github.com/smile-io/ember-polaris/actions)

![image](https://user-images.githubusercontent.com/5737342/26935493-c8c81c76-4c74-11e7-90dd-ff8b0fdc434e.png)

`ember-polaris` is an `ember-cli` addon to make [Shopify's Polaris design system](https://polaris.shopify.com/) accessible to Ember developers.

## Status

**NOTE:** _This addon is no longer maintained. If you currently use or depend on this library we strongly recommend creating a fork and maintaining it yourself. Not all Polaris components have been implemented or implemented completely, check the [component list](#components) for a list of those components which are currently available._


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

Install `ember-polaris` using `ember-cli`:

```sh
$ ember install @smile-io/ember-polaris
```

### Styles
This addon will install [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass/) in the host app. It will also set up your app's `app/styles/app.scss` to `@import "ember-polaris";`, creating the file if it does not already exist.

### Icons
For icons to work you will need to:
* copy Polaris SVG's into a folder in `public`, ex: `public/assets/images/svg/polaris`
* install `ember-svg-jar`
* add the following `ember-svg-jar` options to your `ember-cli-build.js`:

```javascript
// ember-cli-build.js
var app = new EmberApp(defaults, {
  ...

  svgJar: {
    strategy: 'inline',
    inline: {
      stripPath: false,
      optimizer: {
        removeDimensions: true,
      },
      sourceDirs: [
        'public/assets/images/svg',
      ],
    }
  },

  ...
});
```

### Template compiler
If your app does not already import `ember-template-compiler`, you may get an error similar to this one when passing a hash of `componentName` and `props` into one of the `ember-polaris` components:

```
Uncaught TypeError: _ember.default.HTMLBars.compile is not a function
```

If that happens, you need to add an import statement to its `ember-cli-build.js`.

```javascript
// ember-cli-build.js
app.import('node_modules/ember-source/dist/ember-template-compiler.js');
```

**NOTE:** This setup will be handled by `ember-polaris` in the future.

Usage
------------------------------------------------------------------------------

`ember-polaris` provides a set of Ember components intended to implement the same behavior and functionality as the [Shopify Polaris React components](https://github.com/Shopify/polaris). In general the usage can be inferred from the [Polaris component documentation](https://polaris.shopify.com/components/get-started), with some exceptions as described below.

### Differences with Polaris React components

We have tried to keep the components provided by `ember-polaris` as similar to the original Polaris React components as possible. However, there are cases where it makes sense to do things in a more Ember-friendly way, and where this is true we will describe the `ember-polaris` usage and how it differs from the original Shopify components.

#### General Differences

##### `children` property
A large number of the Polaris React components have a `children` property listed in their documentation. In these cases, the corresponding `ember-polaris` component can be given a `text` attribute which will take the place of the `children` property and specify the text to be rendered by the component. Alternatively these components can be used in block form to achieve the same result. Note that the block content will take precedence over the `text` attribute (if one is supplied):

```hbs
{{polaris-button text="Attribute text"}}
 => renders a button with the content "Attribute text"

{{#polaris-button}}
  Block text
{{/polaris-button}}
 => renders a button with the content "Block text"

{{#polaris-button text="Attribute text"}}
  Block text
{{/polaris-button}}
 => renders a button with the content "Block text"
```

##### `element` property
Some Polaris React components accept an `element` property which changes the tag rendered by the component. In `ember-polaris`, this is replaced by the `tagName` attribute unless otherwise noted. This attribute cannot be dynamic - the following code would cause an error:

```hbs
{{#polaris-display-text tagName=displayTextTagName}}
  Displays fine to start with...
{{/polaris-display-text}}

{{#polaris-button onClick=(action (mut displayTextTagName) "h5")}}
  ... but clicking this button will cause an error
{{/polaris-button}}
```

##### `actions` property
Some Polaris React components accept an `actions` property as a list of actions which can be performed. In `ember-polaris`, this is renamed to avoid collisions with the Ember `actions` hash. The new name will be different based on the component - check the documentation for the specific component to find out what attribute to pass the actions list as.

### Components
Below is a categorised list of the components available in `ember-polaris`. Click an item to see more information and usage examples for that component.

#### Actions
- [Action list](./docs/action-list.md#action-list)
- [Button](./docs/button.md#button)
- [Button group](./docs/button-group.md#button-group)
- [Drop zone](./docs/drop-zone.md#drop-zone)
- [Setting toggle](./docs/setting-toggle.md#setting-toggle)

#### Images and icons
- [Avatar](./docs/avatar.md#avatar)
- [Badge](./docs/badge.md#badge)
- [Icon](./docs/icon.md#icon)
- [Thumbnail](./docs/thumbnail.md#thumbnail)

#### Feedback indicators
- [Banner](./docs/banner.md#banner)
- [Progress bar](./docs/progress-bar.md#progress-bar)
- [Skeleton body text](./docs/skeleton-body-text.md#skeleton-body-text)
- [Skeleton display text](./docs/skeleton-display-text.md#skeleton-display-text)
- [Skeleton page](./docs/skeleton-page.md#skeleton-page)
- [Spinner](./docs/spinner.md#spinner)

#### Structure
- [Callout card](./docs/callout-card.md#callout-card)
- [Card](./docs/card.md#card)
- [Empty state](./docs/empty-state.md#empty-state)
- [Layout](./docs/layout.md#layout)
- [Page](./docs/page.md#page)
- [Page actions](./docs/page-actions.md#page-actions)
- [Stack](./docs/stack.md#stack)

#### Titles and text
- [Caption](./docs/caption.md#caption)
- [Display text](./docs/display-text.md#display-text)
- [Footer help](./docs/footer-help.md#footer-help)
- [Heading](./docs/heading.md#heading)
- [Subheading](./docs/subheading.md#subheading)
- [Text style](./docs/text-style.md#text-style)
- [Visually hidden](./docs/visually-hidden.md#visually-hidden)

#### Forms
- [Checkbox](./docs/checkbox.md#checkbox)
- [Choice list](./docs/choice-list.md#choice-list)
- [Color picker](./docs/color-picker.md#color-picker)
- [Date picker](./docs/date-picker.md#date-picker)
- [Form](./docs/form.md#form)
- [Form layout](./docs/form-layout.md#form-layout)
- [Inline error](./docs/inline-error.md#inline-error)
- [Radio button](./docs/radio-button.md#radio-button)
- [Range slider](./docs/range-slider.md#range-slider)
- [Select](./docs/select.md#select)
- [Tag](./docs/tag.md#tag)
- [Text field](./docs/text-field.md#text-field)

#### Lists and tables
- [Data table](./docs/data-table.md#data-table)
- [Description list](./docs/description-list.md#description-list)
- [List](./docs/list.md#list)
- [Option list](./docs/option-list.md#option-list)
- [Resource list](./docs/resource-list.md#resource-list)

#### Navigation
- [Link](./docs/link.md#link)
- [Pagination](./docs/pagination.md#pagination)

#### Overlays
- [Popover](./docs/popover.md#popover)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

Release preparation
------------------------------------------------------------------------------

`ember-polaris` has an automated changelog generator when preparing releases.
Run `yarn changelog-generator` to generate changelog for the current branch.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
