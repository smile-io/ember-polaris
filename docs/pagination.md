[< Back to Components List](../README.md#components)

## Pagination

`polaris-pagination` implements the [Polaris Pagination
component](https://polaris.shopify.com/components/navigation/pagination).

**NOTE:** _the - `nextTooltip`, `previousTooltip` `nextUrl` and `previousUrl` properties are not currently implemented._

### Examples

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

With keyboard support:

```hbs
{{polaris-pagination
  hasPrevious=true
  hasNext=true
  previousKeys=(array "ArrowLeft" "KeyH")
  nextKeys=(array "ArrowRight" "KeyL")
  onPrevious=(action "handlePreviousButton")
  onNext=(action "handleNextButton")
}}
```
