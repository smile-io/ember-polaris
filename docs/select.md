[< Back to Components List](../README.md#components)

## Select

`polaris-select` implements the [Polaris Select component](https://polaris.shopify.com/components/forms/select).

**NOTE:** _the `groups` property in the Polaris documentation is not implemented because it is deprecated._

### Examples

Basic usage:

```hbs
{{polaris-select
  label="Date range"
  options=(array
    (hash
      label="Today"
      value="today"
    )
    (hash
      label="Yesterday"
      value="yesterday"
    )
    (hash
      label="Last 7 days"
      value="lastWeek"
    )
  )
  value=selectedDateRange
  onChange=(action (mut selectedDateRange))
}}
```
