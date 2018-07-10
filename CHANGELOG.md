# ember-polaris Changelog

### Unreleased
- [#159](https://github.com/smile-io/ember-polaris/pull/159) [DOCUMENTATION] Add notes about avoiding Glimmer error under dynamic usages of auto-wrapping components (`polaris-button-group`, `polaris-form-layout`, `polaris-form-layout/group` and `polaris-stack`).

### v.1.7.1 (July 9, 2018)
- [#158](https://github.com/smile-io/ember-polaris/pull/158) [FIX] Pass textfield selectors to `polaris-text-field` event listener.

### v.1.7.0 (July 9, 2018)
- [#144](https://github.com/smile-io/ember-polaris/pull/144) [UPDATE] Shopify Polaris `v2.2.0`
- [#146](https://github.com/smile-io/ember-polaris/pull/146) [ENHANCEMENT] Add `new` status to the Badge component
- [#148](https://github.com/smile-io/ember-polaris/pull/148) [FEATURE] Add `polaris-label` and `polaris-labelled` components.
- [#150](https://github.com/smile-io/ember-polaris/pull/150) [ENHANCEMENT] Auto-bind supplied attributes on internal `wrapper-element` component.
- [#151](https://github.com/smile-io/ember-polaris/pull/151) [FIX] Add missing `hidden` class to `polaris-label`.
- [#152](https://github.com/smile-io/ember-polaris/pull/152) Accept card title as a string or a component
- [#154](https://github.com/smile-io/ember-polaris/pull/154) [FEATURE] Add `polaris-range-slider` component.
- [#152](https://github.com/smile-io/ember-polaris/pull/152) [ENHANCEMENT] Accept card title as a string or a component
- [#155](https://github.com/smile-io/ember-polaris/pull/155) [ENHANCEMENT] Add support for extra large dropzone
- [#157](https://github.com/smile-io/ember-polaris/pull/157) [ENHANCEMENT] Add withinContentContainer property to the banner component

### v.1.6.3 (July 5, 2018)
- [#145](https://github.com/smile-io/ember-polaris/pull/145) [FEATURE] Add `polaris-text-field` component.

### v1.6.2 (July 4, 2018)
- [#147](https://github.com/smile-io/ember-polaris/pull/147) [FEATURE] Allow passing hash of `componentName` and `props` to `polaris-data-table` cells.

### v1.6.1 (June 28, 2018)

- [#141](https://github.com/smile-io/ember-polaris/pull/141) [FEATURE] Add `polaris-data-table` component.
- [#142](https://github.com/smile-io/ember-polaris/pull/142) [ENHANCEMENT] Support React-style child content.
- [#143](https://github.com/smile-io/ember-polaris/pull/143) [ENHANCEMENT] Remove need for separate `label` and `labelComponent` properties for `polaris-checkbox`, and `termComponent`/`term` and `descriptionComponent`/`description` properties for `polaris-description-list` `items`.

### v1.6.0 (June 25, 2018)
- [#133](https://github.com/smile-io/ember-polaris/pull/133) [FEATURE] Add [polaris-drop-zone](https://polaris.shopify.com/components/actions/drop-zone) component
- [##140](https://github.com/smile-io/ember-polaris/pull/140) [INTERNAL] Update some dependencies and other minor tweaks

### v1.5.7 (June 12, 2018)

- [#139](https://github.com/smile-io/ember-polaris/pull/139) [FIX] Make `polaris-spinner` respect the `color` property.

### v1.5.5 (May 31, 2018)

- [#137](https://github.com/smile-io/ember-polaris/pull/137) [ENHANCEMENT] Replace hand-rolled `<div class="Polaris-TextContainer">` with `polaris-text-container` in `polaris-layout/annotation`.

### v1.5.4 (May 30, 2018)

- [#135](https://github.com/smile-io/ember-polaris/pull/135) [FIX] Fix component documentation links on npm.

### v1.5.3 (May 29, 2018)

- [#136](https://github.com/smile-io/ember-polaris/pull/136) [FIX] Minor fixes for `polaris-tag`: use the correct icon on the remove button, apply blur on mouseup to the remove button instead of the whole component, and ensure the button's `aria-label` always contains the latest tag text.

### v1.5.2 (May 29, 2018)

- [#134](https://github.com/smile-io/ember-polaris/pull/134) [ENHANCEMENT] Yield `item` component from `polaris-form-layout` and `polaris-form-layout/group`.

### v1.5.1 (May 24, 2018)

- [#131](https://github.com/smile-io/ember-polaris/pull/131) [FEATURE] Add `onClose` attribute to polaris-popover.

### v1.4.0 (May 16, 2018)

- [#122](https://github.com/smile-io/ember-polaris/pull/122) [UPDATE] Bring in Polaris v2.0.0 styles and component updates.
- [#123](https://github.com/smile-io/ember-polaris/pull/123) [UPDATE] Add new `isColored` class, `aria-hidden` and `focusable` attributes to `polaris-icon`.
- [#126](https://github.com/smile-io/ember-polaris/pull/126) [UPDATE] Add subdued text style to polaris-layout's annotated section description.
- [#127](https://github.com/smile-io/ember-polaris/pull/127) [UPDATE] Change `div`s to `span`s in `polaris-checkbox` and `polaris-radio-button`.
- [#128](https://github.com/smile-io/ember-polaris/pull/128) [UPDATE] Add new internal `fullWidth` property to `polaris-card/section`.
- [#129](https://github.com/smile-io/ember-polaris/pull/129) [UPDATE] Add `disabled` property to `polaris-tag`.

### v1.3.2 (May 14, 2018)

- [#119](https://github.com/smile-io/ember-polaris/pull/119) [FIX] Add missing class to polaris-action-list section.
- [#121](https://github.com/smile-io/ember-polaris/pull/121) [FIX] Fix z-index of focused `polaris-button-group` items to prevent border rendering bug.
- [#124](https://github.com/smile-io/ember-polaris/pull/124) [FIX] Fix polaris-page breadcrumb test failure caused by URL mismatch on Travis.
- [#125](https://github.com/smile-io/ember-polaris/pull/125) [FIX] Fix test failures caused by deprecation warnings from `Ember.warn`.

### v1.3.0 (April 24, 2018)

- [#117](https://github.com/smile-io/ember-polaris/pull/117) [FEATURE] Add `preferredPosition` attribute to polaris-popover.

### v1.2.2 (April 17, 2018)

- [#115](https://github.com/smile-io/ember-polaris/pull/115) [BUGFIX] Fix date-picker `disabled` attribute.
