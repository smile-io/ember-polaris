# Migrating from v6 to v7

## Component

### PolarisIcon

<!-- TODO #polaris-v5 consider adding a codemod to migrate consuming apps -->
Working with Polaris icons has been simplified and icons are now automatically included in the consuming app.
There is a breaking change in that, following [polaris-react](https://github.com/Shopify/polaris-react), the icon changed are now PascalCased.

```hbs
// Old
<PolarisIcon @source="notes" />

// New
<PolarisIcon @source="Notes" />
```

**NOTE** `PolarisIcon` component leverages [ember-svg-jar](https://github.com/ivanvotti/ember-svg-jar) under the hood, which means consuming apps can add other SVG assets to svg-jar which should be usable directly with this component.
