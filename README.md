# ember-polaris

![image](https://user-images.githubusercontent.com/5737342/26935493-c8c81c76-4c74-11e7-90dd-ff8b0fdc434e.png)

`ember-polaris` is an `ember-cli` addon to make [Shopify's Polaris design system](https://polaris.shopify.com/) accessible to Ember developers.

## Status

**NOTE:** _this addon is still in its very early stages. As such the number of components available is limited._

### Implemented components

#### Actions
- Button
- Button group

#### Images and icons
- Badge
- Icon

#### Structure
- Card
- Layout
- Page
- Page actions
- Stack

#### Titles and text
- Display text
- Heading
- Subheading
- VisuallyHidden

#### Forms
- Form layout

#### Navigation
- Link
- Pagination

## Installation

Install `ember-polaris` using `ember-cli`:

```sh
$ ember install ember-polaris
```

This addon will install [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass/) in the host app.
If your app does not already have a `app/styles/app.scss` it will create one with `@import 'ember-polaris';` (you will have to import Polaris styles manually in your `app/styles/app.scss`, if that file already exists):

```css
/* app/styles/app.scss */
@import "ember-polaris";
```

In addition, for icons to work you will need to:
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

**NOTE:** This will be handled by `ember-polaris` in the near future.

## Usage

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

#### Actions

##### Button
`polaris-button` implements the [Polaris Button component](https://polaris.shopify.com/components/actions/button). Currently all properties are supported except for `disclosure` and `icon`; these will be made available once the Icon component has been implemented.

In the future we intend to extend this component to be more Ember-friendly by adding support for `link-to` behavior; however, this is not yet implemented. In the meantime we suggest using something like [`ember-transition-helper`](https://github.com/peec/ember-transition-helper) to achieve the same result.

###### Examples

Basic button:
```hbs
{{#polaris-button onClick=(action "doSomething")}}
  Push me!
{{/polaris-button}}
```

Slim external link:
```hbs
{{#polaris-button
  url="www.example.com"
  external="true"
  size="slim"
}}
  I'm a link
{{/polaris-button}}
```

`polaris-button-group` implements the [Polaris Button group component](https://polaris.shopify.com/components/actions/button-group).

Any child elements inside a `polaris-button-group` block will be auto-wrapped as group items as per the React component. We also make a `polaris-button-group/item` component available inside the block to allow more control over the items if desired.

###### Examples

Basic usage:
```
{{#polaris-button-group}}
  {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
{{/polaris-button-group}}
```

Buttons joined as segmented group:
```
{{#polaris-button-group segmented=true}}
  {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
{{/polaris-button-group}}
```

Plain buttons:
```
{{#polaris-button-group as |buttonGroup|}}
  {{#buttonGroup.item plain=true}}
    {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{/buttonGroup.item}}

  {{#buttonGroup.item plain=true}}
    {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
  {{/buttonGroup.item}}
{{/polaris-button-group}}
```

#### Images and icons

##### Badge
`polaris-badge` implements the [Polaris Badge component](https://polaris.shopify.com/components/images-and-icons/badge).

###### Examples

Basic usage:
```hbs
{{polaris-badge text="Fulfilled"}}
```

With a success status set:
```hbs
{{polaris-badge status="success" text="Complete"}}
```

##### Icon
`polaris-icon` implements the [Polaris Icon component](https://polaris.shopify.com/components/images-and-icons/icon).

###### Examples

Basic usage:
```hbs
{{polaris-icon source="notes"}}
```

Customising with color and backdrop:
```hbs
{{polaris-icon source="add" color="darkTeal" backdrop=true}}
```

**NOTE:** The icon component uses [`ember-svg-jar`](https://github.com/ivanvotti/ember-svg-jar/)
to render the SVG icons.
You will have to make sure that you copy the icons into your public folder and
configure `ember-svg-jar` to serve them from `polaris` namespace.

#### Structure

##### Card
`polaris-card` implements the [Polaris Card component](https://polaris.shopify.com/components/structure/card), with the `actions` property renamed to `headerActions`.

**NOTE:** _the `primaryFooterAction` and `secondaryFooterAction` properties are currently unimplemented._

###### Examples
Each of `{{polaris-card}}` and `{{polaris-card/section}}` can be used in both inline or block form as described above, with the `text` attribute being used for their content when used inline. These examples will only show them in block form, since that is the most common use case.

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

With actions in the header (needs a non-empty title):
```
{{#polaris-card
  title="This is a card with actions"
  headerActions=(array
    (hash
      content="Action 1"
      action=(action "doSomething")
    )
    (hash
      content="Action 2"
      action=(action (mut action2Clicked) true)
    )
  )
}}
  <p>This is the card content</p>
{{/polaris-card}}
```

Three sections - first section with a title, third section subdued:
```hbs
{{#polaris-card title="This is the card title" sectioned=false as |card|}}
  {{#card.section title="Section 1"}}
    <p>This is the first section's content</p>
  {{/card.section}}

  {{#card.section}}
    <p>This is the second section's content</p>
  {{/card.section}}

  {{#card.section subdued=true}}
    <p>This is the third section's subdued content</p>
  {{/card.section}}
{{/polaris-card}}
```

##### Layout
`polaris-layout` implements the [Polaris Layout component](https://polaris.shopify.com/components/structure/layout).

###### Examples
Each of `{{polaris-layout}}`, `{{polaris-layout/section}}` and `{{polaris-layout/annotated-section}}` can be used in both inline or block form as described above, with the `text` attribute being used for their content when used inline. These examples will only show them in block form, since that is the most common use case.

One-column layout:
```hbs
{{#polaris-layout as |layout|}}
  {{#layout.section}}
    <p>Section content goes here</p>
  {{/layout.section}}
{{/polaris-layout}}
```

Two-column layout:
```hbs
{{#polaris-layout as |layout|}}
  {{#layout.section}}
    <p>Column 1</p>
  {{/layout.section}}

  {{#layout.section secondary=true}}
    <p>Column 2</p>
  {{/layout.section}}
{{/polaris-layout}}
```

Annotated layout:
```hbs
{{#polaris-layout as |layout|}}
  {{#layout.annotatedSection
    title="First Section"
    description="This is the first section"
  }}
    <p>Section 1 content here</p>
  {{/layout.annotatedSection}}

  {{#layout.annotatedSection
    title="Second section"
  }}
    <p>Section 2 content here</p>
  {{/layout.annotatedSection}}
{{/polaris-layout}}
```

##### Page
`polaris-page` implements the [Polaris Page component](https://polaris.shopify.com/components/structure/page).

**NOTE:** _the `icon`, `secondaryActions` and `pagination` properties are currently unimplemented._

###### Examples

Basic usage:
```hbs
{{#polaris-page
  title="Welcome to Polaris!"
}}
  Your page content goes here
{{/polaris-page}}
```

Full-width page with disableable primary action:
```hbs
{{polaris-page
  title="This is the title"
  fullWidth=true
  primaryAction=(hash
    text="Take action!"
    action=(action "primaryActionFired")
    disabled=primaryActionDisabled
  )
}}
```

Page with title and breadcrumbs (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):
```hbs
{{#polaris-page
  title="Welcome to Polaris!"
  breadcrumbs=(array
    (hash
      content="Settings"
      route="settings"
    )
    (
      content="Advanced"
      route="settings.advanced"
    )
  )
}}
  Your page content goes here
{{/polaris-page}}
```

##### Page actions
`polaris-page-actions` implements the [Polaris Page actions component](https://polaris.shopify.com/components/structure/page-actions).

###### Examples

Primary action only:
```hbs
{{polaris-page-actions
  primaryAction=(hash
    content="Save"
    action=(action "save")
  )
}}
```

Primary action with two secondary actions (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):
```hbs
{{polaris-page-actions
  primaryAction=(hash
    content="Save"
    action=(action "save")
  )
  secondaryActions=(array
    (hash
      content="Delete"
      action=(action "delete")
    )
    (hash
      content="Cancel"
      action=(action "cancel")
    )
  )
}}
```

##### Stack
`polaris-stack` implements the [Polaris Stack component](https://polaris.shopify.com/components/structure/stack).

Any child elements inside a `polaris-stack` block will be auto-wrapped as stack items as per the React component. We also make a `polaris-stack/item` component available inside the block to allow more control over the items if desired.

###### Examples

Basic usage:
```
{{#polaris-stack}}
  <div>Stack item 1</div>
  <div>Stack item 2</div>
{{/polaris-stack}}
```

Vertical stack with tight spacing:
```
{{#polaris-stack vertical=true spacing="tight"}}
  <div>Stack item 1</div>
  <div>Stack item 2</div>
{{/polaris-stack}}
```

Stack with one item on the left and one pushed to the right:
```
{{#polaris-stack as |stack|}}
  {{#stack.item fill=true}}
    <div>Stack item 1</div>
  {{/stack.item}}

  <div>Stack item 2</div>
{{/polaris-stack}}
```

#### Titles and Text

##### Display text
`polaris-display-text` implements the [Polaris Display text component](https://polaris.shopify.com/components/titles-and-text/display-text).

###### Examples

Basic usage:
```hbs
{{#polaris-display-text}}
  This is some basic display text
{{/polaris-display-text}}
```

Extra-large heading:
```hbs
{{#polaris-display-text
  tagName="h1"
  size="extraLarge"
}}
  This is a LARGE heading
{{/polaris-display-text}}
```

##### Heading
`polaris-heading` implements the [Polaris Heading component](https://polaris.shopify.com/components/titles-and-text/heading).

###### Examples

Basic usage:
```hbs
{{#polaris-heading}}
  This is a basic heading
{{/polaris-heading}}
```

Emphasised heading:
```hbs
{{#polaris-heading
  tagName="em"
}}
  This is an emphasised heading
{{/polaris-heading}}
```

##### Subheading
`polaris-subheading` implements the [Polaris Subheading component](https://polaris.shopify.com/components/titles-and-text/subheading).

###### Examples

Basic usage:
```hbs
{{#polaris-subheading}}
  This is a basic subheading
{{/polaris-subheading}}
```

Underlined subheading:
```hbs
{{#polaris-subheading
  tagName="u"
}}
  This is an underlined subheading
{{/polaris-subheading}}
```

##### VisuallyHidden
`polaris-visually-hidden` implements the [Polaris VisuallyHidden component](https://polaris.shopify.com/components/titles-and-text/visuallyhidden).

###### Examples

Inline form:
```hbs
{{polaris-visually-hidden text="something descriptive"}}
```

Block form:
```hbs
{{#polaris-visually-hidden}}
  another description
{{/polaris-visually-hidden}}
```

#### Forms

##### Form layout
`polaris-form-layout` implements the [Polaris Form layout component](https://polaris.shopify.com/components/forms/form-layout).

Any child elements inside a `polaris-form-layout` or `polaris-form-layout/group` block will be auto-wrapped as items as per the React components.

###### Examples

Default form layout:
```hbs
{{#polaris-form-layout}}
  ... items...
{{/polaris-form-layout}}
```

Form layout with two groups, the second of which is condensed:
```hbs
{{#polaris-form-layout as |formLayout|}}
  {{#formLayout.group}}
    ... first group items...
  {{/formLayout.group}}

  {{#formLayout.group condensed=true}}
    ... second (condensed) group items...
  {{/formLayout.group}}
{{/polaris-form-layout}}
```

#### Navigation

##### Link
`polaris-link` implements the [Polaris Link
component](https://polaris.shopify.com/components/navigation/link).

Basic inline link usage:
```hbs
{{polaris-link
  text="This is an inline link"
  url="http://www.somewhere.com/"
}}
```

External link in block form:
```hbs
{{#polaris-link
  url="http://www.somewhere.com/"
  external=true
}}
  This is a block link
{{/polaris-link}}
```

Button usage:
```hbs
{{polaris-link
  text="Click me"
  onClick=(action "linkButtonClicked")
}}
```

##### Pagination
`polaris-pagination` implements the [Polaris Pagination
component](https://polaris.shopify.com/components/navigation/pagination#navigation).

**NOTE:** Following properties are not currently implemented: `nextUrl` and `previousUrl`.

Basic usage:
```hbs
{{polaris-pagination
  hasPrevious=true
  hasNext=true
  onPrevious=(action "handlePreviousButton")
  onNext=(action "handleNextButton")
}}
```

Plain mode pagination:
```hbs
{{polaris-pagination
  plain=true
  hasPrevious=true
  hasNext=true
  onPrevious=(action "handlePreviousButton")
  onNext=(action "handleNextButton")
}}
```

## Contributing
### Installation

* `git clone` this repository
* `cd ember-polaris`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
