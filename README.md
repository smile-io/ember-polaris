# ember-polaris

[Shopify’s design system](https://polaris.shopify.com/) implemented in Ember.js.

This is an [`embroider` V2 addon](https://github.com/emberjs/rfcs/blob/master/text/0507-embroider-v2-package-format.md) using:

- [template imports](https://github.com/ember-template-imports/ember-template-imports) - _Ember's next-gen component authoring format._
- typescript & [glint](https://typed-ember.gitbook.io/glint) - _a template-aware tool for performing end-to-end TypeScript typechecking on your project._


## Compatibility

- Ember.js v4.12 or above
- Embroider or ember-auto-import v2

## Installation

```
ember install @smile-io/ember-polaris
```

## Usage

[Longer description of how to use the addon in apps.]

## Editor Integrations

To get syntax highlighting inside embedded templates and support for the GJS/GTS
file extensions, you may need to configure your editor.

### Visual Studio Code

Check [extensions.json](./.vscode/extensions.json) for a list of recommended extensions and make sure you follow [Glint docs](https://typed-ember.gitbook.io/glint/getting-started#glint-editor-extensions) to disable the builtin *TypeScript and JavaScript Language Features* extension.

### Other editors

Check [ember-template-imports docs](https://github.com/ember-template-imports/ember-template-imports?tab=readme-ov-file#editor-integrations) & [Glint docs](https://typed-ember.gitbook.io/glint/getting-started#glint-editor-extensions) to add `glint-language-server`.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
