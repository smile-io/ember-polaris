[< Back](../README.md)

## Setting toggle

`polaris-setting-toggle` implements the [Polaris Setting toggle component](https://polaris.shopify.com/components/actions/setting-toggle).

### Examples

Inline usage:

```hbs
{{polaris-setting-toggle
  text="Some boolean setting"
  enabled=enabled
  action=(hash
    text="Toggle it!"
    onAction=(action "toggleSetting")
  )
}}
```

Block usage:

```hbs
{{#polaris-setting-toggle
  enabled=enabled
  action=(hash
    text="Disable it!"
    onAction=(action (mut enabled) false)
  )
}}
  This setting is currently <strong>{{if enabled "enabled" "disabled"}}</strong>
{{/polaris-setting-toggle}}
```
