[< Back to Components List](../README.md#components)

## Date picker

`polaris-date-picker` implements the [Polaris Date picker component](https://polaris.shopify.com/components/forms/date-picker).

### Examples

Default date picker:

```hbs
{{polaris-date-picker
  month=month
  year=year
  selected=selected
  onChange=(action (mut selected))
  onMonthChange=(action "handleMonthChange")
}}
```

where `handleMonthChange` receives both `month` and `year` arguments as Numbers:

```javascript
/**
parent-component.js
*/

month: 1,
year: 2018,
selected: null,

actions: {
  handleMonthChange(month, year) {
    this.setProperties({
      month,
      year
    });
  }
}
```

Date picker with two months displayed at a time:

```hbs
{{polaris-date-picker
  month=month
  year=year
  selected=selected
  multiMonth=true
  onChange=(action (mut selected))
  onMonthChange=(action "handleMonthChange")
}}
```
