[< Back to Components List](../README.md#components)

## Skeleton page

`polaris-skeleton-page` implements the [Polaris Skeleton page component](https://polaris.shopify.com/components/feedback-indicators/skeleton-page).

### Examples

Rendering a basic skeleton page with a dynamic title:

```hbs
{{#polaris-skeleton-page}}
  ... page content here ...
{{/polaris-skeleton-page}}
```

Skeleton page with a text title and skeleton breadcrumbs, a primary action, and two secondary actions:

```hbs
{{#polaris-skeleton-page
  title="Skeleton Page"
  breadcrumbs=true
  primaryAction=true
  secondaryActions=2
}}
  ... page content here ...
{{/polaris-skeleton-page}}
```
