# ember-polaris

![image](https://user-images.githubusercontent.com/5737342/26935493-c8c81c76-4c74-11e7-90dd-ff8b0fdc434e.png)

`ember-polaris` is an `ember-cli` addon to make [Shopify's Polaris design system](https://polaris.shopify.com/) accessible to Ember developers.

## Status

**NOTE:** _this addon is still in its very early stages. As such the number of components available is limited and some features of those which have been built may be unimplemented._

### Implemented components

#### Actions
- Action list
- Button
- Button group
- Setting toggle

#### Images and icons
- Avatar
- Badge
- Icon
- Thumbnail

#### Feedback indicators
- Banner
- Progress bar
- Skeleton body text
- Skeleton display text
- Skeleton page
- Spinner

#### Structure
- Callout card
- Card
- Empty state
- Layout
- Page
- Page actions
- Stack

#### Titles and text
- Display text
- Footer help
- Heading
- Subheading
- Text style
- VisuallyHidden

#### Forms
- Checkbox
- Choice list
- Color picker
- Form layout
- Radio button

#### Lists
- List
- Resource list

#### Navigation
- Link
- Pagination

#### Overlays
- Popover

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

##### Action list
`polaris-action-list` implements the [Polaris Action list component](https://polaris.shopify.com/components/actions/action-list).

###### Examples

Basic usage:

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

##### Button
`polaris-button` implements the [Polaris Button component](https://polaris.shopify.com/components/actions/button).

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
  external=true
  size="slim"
}}
  I'm a link
{{/polaris-button}}
```

Loading button with a spinner:

```hbs
{{polaris-button
  text="Load something"
  loading=isLoading
  onClick=(action (mut isLoading) true)
}}
```

##### Button group
`polaris-button-group` implements the [Polaris Button group component](https://polaris.shopify.com/components/actions/button-group).

Any child elements inside a `polaris-button-group` block will be auto-wrapped as group items as per the React component. We also make a `polaris-button-group/item` component available inside the block to allow more control over the items if desired.

###### Examples

Basic usage:

```hbs
{{#polaris-button-group}}
  {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
{{/polaris-button-group}}
```

Buttons joined as segmented group:

```hbs
{{#polaris-button-group segmented=true}}
  {{polaris-button text="Button 1" onClick=(action "doSomething")}}
  {{polaris-button text="Button 2" onClick=(action (mut button2Clicked) true)}}
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

##### Setting toggle
`polaris-setting-toggle` implements the [Polaris Setting toggle component](https://polaris.shopify.com/components/actions/setting-toggle).

###### Examples

Inline usage:

```hbs
{{polaris-setting-toggle
  text="Some boolean setting"
  enabled=enabled
  action=(hash
    text="Toggle it!"
    onAction=(action "toggleSetting")
  )
}}
```

Block usage:

```hbs
{{#polaris-setting-toggle
  enabled=enabled
  action=(hash
    text="Disable it!"
    onAction=(action (mut enabled) false)
  )
}}
  This setting is currently <strong>{{if enabled "enabled" "disabled"}}</strong>
{{/polaris-setting-toggle}}
```

#### Images and icons

##### Avatar
`polaris-avatar` implements the [Polaris Avatar component](https://polaris.shopify.com/components/images-and-icons/avatar). Note that we have added an `avatarSourcePath` property which specifies the path to where the included Polaris avatar SVG images reside in the host application.

###### Examples

Basic usage:

```hbs
{{polaris-avatar name="Jim Smith"}}
```

Display a customer avatar with a specific image:

```hbs
{{polaris-avatar customer=true source="/assets/avatars/jim-smith.png"}}
```

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

With a progress status set:

```hbs
{{polaris-badge progress="partiallyComplete" text="Partially complete"}}
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

##### Thumbnail
`polaris-thumbnail` implements the [Polaris Thumbnail component](https://polaris.shopify.com/components/images-and-icons/thumbnail).

###### Examples

Basic usage:

```hbs
{{polaris-thumbnail source="image.jpg"}}
```

With alt text and size:

```hbs
{{polaris-thumbnail size="small" source="image.jpg" alt="My image"}}
```

#### Feedback indicators

##### Banner
`polaris-banner` implements the [Polaris Banner component](https://polaris.shopify.com/components/feedback-indicators/banner).

###### Examples

Basic usage:

```hbs
{{polaris-banner text="This order has been shipped."}}
```

With a success status set, custom icon, content, dismiss button and actions:

```hbs
{{#polaris-banner
  status="success"
  icon="confetti"
  action=(hash
    text="Track"
    onAction=(action "trackPackage")
  )
  secondaryAction=(hash
    text="View"
    onAction=(action "viewOrder")
  )
  onDismiss=(action "handleDismiss")
}}
  <p>This order has been shipped.</p>
{{/polaris-banner}}
```

##### Progress bar
`polaris-progress-bar` implements the [Polaris Progress bar component](https://polaris.shopify.com/components/feedback-indicators/progress-bar).

###### Example

Basic usage (renders medium-sized progress bar):

```hbs
{{polaris-progress-bar progress=75}}
```

With size option:

```hbs
{{polaris-progress-bar size="large" progress=75}}
```

##### Skeleton body text
`polaris-skeleton-body-text` implements the [Polaris Skeleton body text component](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text).

###### Examples

Basic usage (renders three skeleton text lines):

```hbs
{{polaris-skeleton-body-text}}
```

Single skeleton text line:

```hbs
{{polaris-skeleton-body-text lines=1}}
```

##### Skeleton display text
`polaris-skeleton-display-text` implements the [Polaris Skeleton display text component](https://polaris.shopify.com/components/feedback-indicators/skeleton-display-text).

###### Examples

Basic usage (renders medium-sized skeleton display text):

```hbs
{{polaris-skeleton-display-text}}
```

Large skeleton display text:

```hbs
{{polaris-skeleton-display-text size="large"}}
```

##### Skeleton page
`polaris-skeleton-page` implements the [Polaris Skeleton page component](https://polaris.shopify.com/components/feedback-indicators/skeleton-page).

###### Examples

Rendering a basic skeleton page with a dynamic title:

```hbs
{{#polaris-skeleton-page}}
  ... page content here ...
{{/polaris-skeleton-page}}
```

Skeleton page with a text title and skeleton breadcrumbs and two secondary actions:

```hbs
{{#polaris-skeleton-page
  title="Skeleton Page"
  breadcrumbs=true
  secondaryActions=2
}}
  ... page content here ...
{{/polaris-skeleton-page}}
```

##### Spinner
`polaris-spinner` implements the [Polaris Spinner component](https://polaris.shopify.com/components/feedback-indicators/spinner).

###### Examples

Basic usage (renders a large, teal-colored spinner):

```hbs
{{polaris-spinner}}
```

With a size and color specified and an accessibility label:

```hbs
{{polaris-spinner
  size="small"
  color="inkLightest"
  accessibilityLabel="access granted"
}}
```

#### Structure

##### Callout card
`polaris-callout-card` implements the [Polaris Callout card component](https://polaris.shopify.com/components/structure/callout-card).

###### Examples

Inline usage without secondary action:

```hbs
{{polaris-callout-card
  title="New feature"
  text="This new feature is awesome!"
  primaryAction=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
}}
```

Block usage with secondary action:

```hbs
{{#polaris-callout-card
  title="New feature"
  primaryAction=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
  secondaryAction=(hash
    text="Learn more"
    onAction=(action "showDetails")
  )
}}
  We've got an awesome new feature!
{{/polaris-callout-card}}
```

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

##### Empty state
`polaris-empty-state` implements the [Polaris Empty state component](https://polaris.shopify.com/components/structure/empty-state).

**NOTE:** _the `largeImage` property is currently unimplemented._

###### Examples

Inline usage without secondary action:

```hbs
{{polaris-empty-state
  heading="Check out this new feature"
  image="new-feature.jpg"
  text="This new feature is great"
  action=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
}}
```

Block usage with secondary action:

```hbs
{{#polaris-empty-state
  heading="Check out this new feature"
  image="new-feature.jpg"
  action=(hash
    text="Take a look"
    onAction=(action "showNewFeature")
  )
  secondaryAction=(hash
    text="Learn more"
    onAction=(action "openBlog")
  )
}}
  We've got an awesome new feature!
{{/polaris-empty-state}}
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

**NOTE:** _the `icon`, `actionGroups` and `pagination` properties are currently unimplemented._

###### Examples

Basic usage:

```hbs
{{#polaris-page
  title="Welcome to Polaris!"
}}
  Your page content goes here
{{/polaris-page}}
```

Full-width page with disableable primary action and secondary actions (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-page
  title="This is the title"
  fullWidth=true
  primaryAction=(hash
    text="Take action!"
    disabled=primaryActionDisabled
    onAction=(action "primaryActionFired")
  )
  secondaryActions=(array
    (hash
      text="Do something"
      onAction=(action "secondaryAction1Fired")
    )
    (hash
      text="Do something else"
      onAction=(action (mut secondaryAction2Fired) true)
    )
  )
}}
```

Page with title and breadcrumbs (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)). Breadcrumbs take `text` and `route` properties, and an optional `models` property for dynamic route segments. N.B. only the last breadcrumb will be rendered:

```hbs
{{#polaris-page
  title="Welcome to Polaris!"
  breadcrumbs=(array
    (hash
      text="Parent"
      route="parent"
      models=parent
    )
    (hash
      text="Child"
      route="parent.child"
      models=(array parent child)
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
    text="Save"
    onAction=(action "save")
  )
}}
```

Primary action with two secondary actions (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-page-actions
  primaryAction=(hash
    text="Save"
    onAction=(action "save")
  )
  secondaryActions=(array
    (hash
      text="Delete"
      onAction=(action "delete")
    )
    (hash
      text="Cancel"
      onAction=(action "cancel")
    )
  )
}}
```

##### Stack
`polaris-stack` implements the [Polaris Stack component](https://polaris.shopify.com/components/structure/stack).

Any child elements inside a `polaris-stack` block will be auto-wrapped as stack items as per the React component. We also make a `polaris-stack/item` component available inside the block to allow more control over the items if desired.

###### Examples

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

##### Footer help
`polaris-footer-help` implements the [Polaris Footer help component](https://polaris.shopify.com/components/titles-and-text/footer-help).

###### Examples

Inline usage:

```hbs
{{polaris-footer-help text="Looking for help? Call us on 1234 56 78."}}
```

Block usage:

```hbs
{{#polaris-footer-help}}
  Learn more about {{polaris-link url="http://www.some-product.com/this-one" text="this product"}}.
{{/polaris-footer-help}}
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

##### Text style
`polaris-text-style` implements the (currently undocumented) Polaris Text style component. The only available attribute is `variation` which specifies the style to apply to the `text` or block content. Allowed values are `positive` (green text), `negative` (red text), `strong` (bold text) and `subdued` (muted text).

###### Examples

Inline form with positive (green) text:

```hbs
{{polaris-text-style variation="positive" text="This text is positive and green"}}
```

Block form with subdued (muted) text:

```hbs
{{#polaris-text-style variation="subdued"}}
  This text is subdued and looks muted
{{/polaris-text-style}}
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

##### Checkbox
`polaris-checkbox` implements the [Polaris Checkbox component](https://polaris.shopify.com/components/forms/checkbox).

**NOTE:** _the React component's `id` property has been renamed to `inputId` in this Ember implementation. The `label` property in this implementation only supports string values - to emulate the React component's ability to pass a node in for the `label`, use `labelComponent` instead._

###### Examples

Basic checkbox:

```hbs
{{polaris-checkbox
  label="This is a checkbox"
  checked=checked
  onChange=(action (mut checked))
}}
```

Checkbox with help text and value:

```hbs
{{polaris-checkbox
  label="This is a checkbox with help text"
  helpText="Click the checkbox to toggle something"
  value="my-checkbox-value"
  checked=checked
  onChange=(action (mut checked))
}}
```

Checkbox with a simple component rendered as its label:

```hbs
{{polaris-checkbox
  labelComponent="my-awesome-label"
  checked=checked
  onChange=(action (mut checked))
}}
```

Checkbox with more advanced component usage for the label:

```hbs
{{polaris-checkbox
  labelComponent=(component "my-awesome-label" color="purple")
  checked=checked
  onChange=(action (mut checked))
}}
```

##### Choice list
`polaris-choice-list` implements the [Polaris Choice list component](https://polaris.shopify.com/components/forms/choice-list).

**NOTE:** _the `renderChildren` choice property is currently unimplemented._

###### Examples

Single choice list (radio buttons):

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

##### Color picker
`polaris-color-picker` implements the [Polaris Color picker component](https://polaris.shopify.com/components/forms/color-picker).

###### Examples

Default color picker:

```hbs
{{polaris-color-picker
  color=color
  onChange=(action (mut color))
}}
```

Color picker with alpha:

```hbs
{{polaris-color-picker
  color=color
  allowAlpha=true
  onChange=(action (mut color))
}}
```

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

##### Radio button
`polaris-radio-button` implements the [Polaris Radio button component](https://polaris.shopify.com/components/forms/radio-button).

**NOTE:** _the React component's `id` property has been renamed to `inputId` in this Ember implementation._

###### Examples

Basic radio button:

```hbs
{{polaris-radio-button
  label="This is a radio button"
  value="option-1"
  onChange=(action (mut selectedValue))
}}
```

Radio button with help text:

```hbs
{{polaris-radio-button
  label="This is a radio button"
  helpText="Click the button to change the selected value"
  value="option-1"
  onChange=(action (mut selectedValue))
}}
```

#### Lists

##### List
`polaris-list` implements the [Polaris List component](https://polaris.shopify.com/components/lists/list). This component should be used in block form to access the `list.item` component, as in the examples below.

###### Examples

Default (bulleted) list - can also be achieved by explicitly passing `type="bullet"` to the `polaris-list`:

```hbs
{{#polaris-list as |list|}}
  {{list.item text="Point one (inline form)"}}

  {{#list.item}}
    Second point (block form)
  {{/list.item}}
{{/polaris-list}}
```

Numbered list iterating over a `numberedItems` array:

```hbs
{{#polaris-list type="number" as |list|}}
  {{#each numberedItems as |item|}}
    {{list.item text=item}}
  {{/each}}
{{/polaris-list}}
```

##### Resource list
`polaris-resource-list` implements the [Polaris Resource list component](https://polaris.shopify.com/components/lists/resource-list). The `renderItem` property has been replaced with an `itemComponent` attribute which takes a component name as a string. The provided component will be passed the `item` and its `index` as attributes.

The default list item component (`polaris-resource-list/item`) replicates the React component's behaviour and accepts the following `item` properties: `url`, `media`, `attributeOne`, `attributeTwo`, `attributeThree`, `badges`, `exceptions`, `actions` and `persistActions`. **NOTE:** _the `url`, `media`, `badges`, `exceptions`, `actions` and `persistActions` item properties are currently unimplemented._

###### Examples

Basic usage with Shopify's default item rendering:

```hbs
{{polaris-resource-list
  items=(array
    (hash
      attributeOne="An item"
      attributeTwo="by Bob Smith"
      attributeThree="Yesterday"
    )
    (hash
      attributeOne="Another item"
      attributeTwo="by Jim Jones"
      attributeThree="Today"
    )
  )
}}
```

Using a custom component to render each item:

```hbs
{{polaris-resource-list
  items=items
  itemComponent="my-custom-resource-list-item"
}}
```

#### Navigation

##### Link
`polaris-link` implements the [Polaris Link
component](https://polaris.shopify.com/components/navigation/link).

###### Examples

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
component](https://polaris.shopify.com/components/navigation/pagination).

**NOTE:** _the following properties are not currently implemented: `nextUrl` and `previousUrl`._

###### Examples

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

#### Overlays

##### Popover
`polaris-popover` implements the [Polaris Popover
component](https://polaris.shopify.com/components/overlays/popover). This component uses [`ember-basic-dropdown`](https://github.com/cibernox/ember-basic-dropdown) to implement popover functionality. Note that the usage is slightly different from the React implementation so please pay attention to the examples below.


**NOTE:** _the `preferredPosition`, `active`, `activatorWrapper`, `preventAutofocus` and `onClose` properties are currently unimplemented._

###### Examples

Basic usage:

```hbs
{{#polaris-popover as |popover|}}
  {{#popover.activator}}
    {{polaris-button text="Toggle popover"}}
  {{/popover.activator}}

  {{#popover.content}}
    This is the popover content
  {{/popover.content}}
{{/polaris-popover}}
```

Sectioned popover:

```hbs
{{#polaris-popover sectioned=true as |popover|}}
  {{#popover.activator}}
    {{polaris-button text="Toggle popover"}}
  {{/popover.activator}}

  {{#popover.content}}
    This is the popover content
  {{/popover.content}}
{{/polaris-popover}}
```

## Contributing
### Installation

* `git clone` this repository
* `cd ember-polaris`
* `yarn install`

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
