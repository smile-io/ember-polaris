# Migrating from v6 to v7

## Component

### PolarisIcon

<!-- TODO #polaris-v5 consider adding a codemod to migrate consuming apps -->
Working with Polaris icons has been simplified and icons are now automatically included in the consuming app.
There are now more Polaris icons and are PascalCased to be consistent with polaris-react.

```hbs
<!-- Old -->
<PolarisIcon @source="notes" />

<!-- New -->
<PolarisIcon @source="NotesMajor" />
```

**NOTE**
1. `PolarisIcon` component leverages [ember-svg-jar](https://github.com/ivanvotti/ember-svg-jar) under the hood, which means consuming apps can add other SVG assets to svg-jar which should be usable directly with this component.
2. Since consuming apps were manually setting up Polaris icons before, all icons should still render properly if they were correctly set up as documented through `ember-svg-jar`.
