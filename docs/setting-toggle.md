[< Back to Components List](../README.md#components)

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
    loading=isToggleSettingRunning
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
  This setting is currently
  {{polaris-text-style variation="strong"}}
    {{if enabled "enabled" "disabled"}}
  {{/polaris-text-style}}
{{/polaris-setting-toggle}}
```
