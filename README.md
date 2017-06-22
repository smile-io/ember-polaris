# ember-polaris

![image](https://user-images.githubusercontent.com/5737342/26935493-c8c81c76-4c74-11e7-90dd-ff8b0fdc434e.png)

`ember-polaris` is an `ember-cli` addon to make [Shopify's Polaris design system](https://polaris.shopify.com/) accessible to Ember developers.

## Status

**NOTE:** _this addon is still in its very early stages. As such the number of components available is limited._

### Implemented components

#### Actions
- Button

#### Structure
- Page

#### Forms
- Text field

#### Titles and text
- Display text
- Heading
- Subheading

## Installation

Install `ember-polaris` using `ember-cli`:

```
ember install ember-polaris
```

This addon will install [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass/) in the host app.
If your app does not already have a `app/styles/app.scss` it will create one with `@import 'ember-polaris';` (you will have to import Polaris styles manually in your `app/styles/app.scss`, if that file already exists):

```css
/* app/styles/app.scss */
@import "ember-polaris";
```

## Usage

`ember-polaris` provides a set of Ember components intended to implement the same behavior and functionality as the [Shopify Polaris React components](https://github.com/Shopify/polaris). In general the usage can be inferred from the [Polaris component documentation](https://polaris.shopify.com/components/get-started), with some exceptions as described below.

### Differences with Polaris React components

We have tried to keep the components provided by `ember-polaris` as similar to the original Polaris React components as possible. However, there are cases where it makes sense to do things in a more Ember-friendly way, and where this is true we will describe the `ember-polaris` usage and how it differs from the original Shopify components.

#### General Differences

##### `children` property
A large number of the Polaris React components have a `children` property listed in their documentation. In these cases, the corresponding `ember-polaris` component can be given a `text` attribute which will take the place of the `children` property and specify the text to be rendered by the component. Alternatively these components can be used in block form to achieve the same result. Note that the block content will take precedence over the `text` attribute (if one is supplied):

```
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

```
{{#polaris-display-text tagName=displayTextTagName}}
  Displays fine to start with...
{{/polaris-display-text}}

{{#polaris-button onClick=(action (mut displayTextTagName) "h5")}}
  ... but clicking this button will cause an error
{{/polaris-button}}
```

### Components

#### Actions

##### Button
`polaris-button` implements the [Polaris Button component](https://polaris.shopify.com/components/actions/button). Currently all properties are supported except for `disclosure` and `icon`; these will be made available once the Icon component has been implemented.

In the future we intend to extend this component to be more Ember-friendly by adding support for `link-to` behavior; however, this is not yet implemented. A possible workaround would be to use [ember-transition-helper](https://github.com/peec/ember-transition-helper) to trigger a transition via an action.

###### Examples

Basic button:
```
{{#polaris-button onClick=(action "doSomething")}}
  Push me!
{{/polaris-button}}
```

Slim external link:
```
{{#polaris-button
  url="www.example.com"
  external="true"
  size="slim"
}}
  I'm a link
{{/polaris-button}}
```

#### Structure

##### Page
`polaris-page` implements the [Polaris Page component](https://polaris.shopify.com/components/structure/page).

**NOTE:** _the `icon`, `breadcrumbs`, `secondaryActions` and `pagination` properties are currently unimplemented._

###### Examples

Basic usage:
```
{{#polaris-page
  title="Welcome to Polaris!"
}}
  Your page content goes here
{{/polaris-page}}
```

Full-width page with disableable primary action:
```
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

#### Forms

##### Text field
`polaris-text-field` implements the [Polaris Text field component](https://polaris.shopify.com/components/forms/text-field).

The `id` property specified in the documentation has been renamed to `inputId` in the `polaris-text-field` component attributes.

**NOTE:** _the `prefix`, `suffix`, `helpText`, `labelAction`, `labelHidden`, `autoFocus`, `multiline`, `error`, `connectedRight`, `connectedLeft`, `type`, `step`, `autoComplete`, `max`, `maxLength`, `min`, `minLength`, `pattern` and `spellCheck` properties are currently unimplemented._

###### Examples

Basic usage with some input attributes:
```
{{polaris-text-field
  placeholder="Enter some text here"
  disabled=isFormActive
  value=myInputValue
  onChange=(action (mut myInputValue))
}}
```

Labelled text field:
```
{{polaris-text-field
  inputId="email"
  name="email"
  label="Email address"
  value=emailAddress
  onChange=(action (mut emailAddress))
}}
```

#### Titles and Text

##### Display text
`polaris-display-text` implements the [Polaris Display text component](https://polaris.shopify.com/components/titles-and-text/display-text).

###### Examples

Basic usage:
```
{{#polaris-display-text}}
  This is some basic display text
{{/polaris-display-text}}
```

Extra-large heading:
```
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
```
{{#polaris-heading}}
  This is a basic heading
{{/polaris-heading}}
```

Emphasised heading:
```
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
```
{{#polaris-subheading}}
  This is a basic subheading
{{/polaris-subheading}}
```

Underlined subheading:
```
{{#polaris-subheading
  tagName="u"
}}
  This is an underlined subheading
{{/polaris-subheading}}
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
