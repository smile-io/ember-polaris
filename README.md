# ember-polaris

`ember-polaris` is an `ember-cli` addon to make [Shopify's Polaris design system](https://polaris.shopify.com/) accessible to Ember developers.

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

### Components

#### Button
`polaris-button` implements the [Polaris Button component](https://polaris.shopify.com/components/actions/button). Currently all properties are supported except for `disclosure` and `icon`; these will be made available once the Icon component has been implemented.

In the future we intend to extend this component to be more Ember-friendly by adding support for `link-to` behavior; however, this is not yet implemented.

##### Examples

###### Basic button:
```
{{#polaris-button onClick=(action "doSomething")}}
  Push me!
{{/polaris-button}}
```

###### Slim external link:
```
{{#polaris-button url="www.example.com" external="true" size="slim"}}
  I'm a link
{{/polaris-button}}
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
