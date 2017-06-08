# ember-polaris

![image](https://user-images.githubusercontent.com/5737342/26935493-c8c81c76-4c74-11e7-90dd-ff8b0fdc434e.png)

`ember-polaris` is an `ember-cli` addon to make [Shopify's Polaris design system](https://polaris.shopify.com/) accessible to Ember developers.

**NOTE:** _this addon is still in its very early stages. As such the number of components available is limited._

## Status

### Implemented components
None right now, check back soon!

### Up next

#### Actions
- Button

#### Titles and text
- Display text
- Heading
- Subheading

## Installation

Install `ember-polaris` using `ember-cli`:

```
> ember install ember-polaris
```

This addon requires [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass/) to be installed in the host app, and you will need to import the Polaris styles in your `app.scss`:

```css
/* app.scss */
@import "polaris/styles.scss";
```

## Usage

`ember-polaris` provides a set of Ember components intended to implement the same behavior and functionality as the [Shopify Polaris React components](https://github.com/Shopify/polaris). In general the usage can be inferred from the [Polaris component documentation](https://polaris.shopify.com/components/get-started), with some exceptions as described below.

### Differences with Polaris React components

We have tried to keep the components provided by `ember-polaris` as similar to the original Polaris React components as possible. However, there are cases where it makes sense to do things in a more Ember-friendly way, and where this is true we will describe the `ember-polaris` usage and how it differs from the original Shopify components.

#### General Differences

##### `children` property
A large number of the Polaris React components have a `children` property documented. In these cases, the corresponding `ember-polaris` component can be used in block form, with the block taking the place of the `children` property.

##### `element` property
Some Polaris React components accept an `element` property which changes the tag rendered by the component. In `ember-polaris`, this is replaced by the `tagName` attribute unless otherwise noted.

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
