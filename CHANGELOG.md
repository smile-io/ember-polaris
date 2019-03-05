# ember-polaris Changelog

### v4.0.2 (March 5, 2019)
- [#284](https://github.com/smile-io/ember-polaris/pull/284) [FIX] Fix infinite loop in `sticky-manager` service

### v4.0.1 (February 28, 2019)
- [#283](https://github.com/smile-io/ember-polaris/pull/283) [FIX] Fix height bug on multiline text field

### v4.0.0 (February 26, 2019)
- [#282](https://github.com/smile-io/ember-polaris/pull/282) [ENHANCEMENT] Allow passing component for annotated layout section's description

### v3.0.11 (February 22, 2019)
- [#281](https://github.com/smile-io/ember-polaris/pull/281) [ENHANCEMENT] Handle non-numeric/non-finite `progress` values in `polaris-progress-bar`

### v3.0.10 (February 22, 2019)
- [#280](https://github.com/smile-io/ember-polaris/pull/280) [ENHANCEMENT] Allow passing a component as `polaris-choice`'s `helpText` property

### v3.0.9 (February 22, 2019)
- [#279](https://github.com/smile-io/ember-polaris/pull/279) [FIX] Ensure `polaris-choice-list` updates properly when the `selected` array is swapped out

### v3.0.8 (February 21, 2019)
- [#278](https://github.com/smile-io/ember-polaris/pull/278) [ENHANCEMENT] Add support for `destructive` property on `polaris-page`'s `primaryAction`

### v3.0.7 (February 18, 2019)
- [#277](https://github.com/smile-io/ember-polaris/pull/277) [ENHANCEMENT] Add support for props such as `primary` etc. on `polaris-callout-card` actions

### v3.0.6 (January 31, 2019)
- [#276](https://github.com/smile-io/ember-polaris/pull/276) [FIX] Prevent glimmer error when changing selected filter on resource list filter creator

### v3.0.5 (January 28, 2019)
- [#273](https://github.com/smile-io/ember-polaris/pull/273) [FEATURE] Add `polaris-option-list` component

### v3.0.4 (January 22, 2019)
- [#272](https://github.com/smile-io/ember-polaris/pull/272) [ENHANCEMENT] Add `fullWidth` support to `polaris-popover`

### v3.0.3 (January 14, 2019)
- [#271](https://github.com/smile-io/ember-polaris/pull/271) [FIX] Fix dismissable banner class

### v3.0.2 (January 8, 2019)
- [#270](https://github.com/smile-io/ember-polaris/pull/270) [FIX] Avoid null ref error when adding/removing resource list filters

### v3.0.1 (January 8, 2019)
- [#269](https://github.com/smile-io/ember-polaris/pull/269) [FIX] Remove listener that was mutating the text-field's value and properly fire `onChange` callback

### v3.0.0 (January 7, 2019)
- [#266](https://github.com/smile-io/ember-polaris/pull/266) [UPDATE] Overhaul `polaris-resource-list` to match Shopify Polaris implementation (breaks existing usages of `polaris-resource-list`)

### v2.0.4 (November 28, 2018)
- [#256](https://github.com/smile-io/ember-polaris/pull/256) [FIX] Move `ember-lifeline` to deps

### v2.0.3 (November 16, 2018)
- [#251](https://github.com/smile-io/ember-polaris/pull/251) [ENHANCEMENT] Make `allowRange` on `polaris-date-picker` writeable

### v2.0.2 (November 7, 2018)
- [#249](https://github.com/smile-io/ember-polaris/pull/249) [ENHANCEMENT] Add `primaryFooterAction` & `secondaryFooterAction` to `polaris-card`

### v2.0.1 (November 5, 2018)
- [#247](https://github.com/smile-io/ember-polaris/pull/247) [ENHANCEMENT] Add `actionGroups` support to `polaris-page`

### v2.0.0 (October 30, 2018)
- [#168](https://github.com/smile-io/ember-polaris/pull/168) [INTERNAL] Upgrade to Ember CLI `3.4.2`
- [#171](https://github.com/smile-io/ember-polaris/pull/171) [UPDATE] Shopify Polaris `v2.11.0`
- [#174](https://github.com/smile-io/ember-polaris/pull/174) [FEATURE] Add `polaris-inline-error` component
- [#179](https://github.com/smile-io/ember-polaris/pull/179) [ENHANCEMENT] Upgrade `polaris-breadcrumbs` to render button if `url` not present
- [#187](https://github.com/smile-io/ember-polaris/pull/187) [ENHANCEMENT] Add `disabled` attribute to `polaris-choice`
- [#185](https://github.com/smile-io/ember-polaris/pull/185) [ENHANCEMENT] Update `polaris-button` to accept components for `icon` value
- [#191](https://github.com/smile-io/ember-polaris/pull/191) [ENHANCEMENT] Update `polaris-layout/annotated-section` styling to match Polaris v2.11.0
- [#195](https://github.com/smile-io/ember-polaris/pull/195) [ENHANCEMENT] Add `nextKeys` and `previousKeys` attribute to `polaris-pagination`
- [#193](https://github.com/smile-io/ember-polaris/pull/193) [ENHANCEMENT] Update `polaris-choice-list` to render `error` and `aria` attributes
- [#197](https://github.com/smile-io/ember-polaris/pull/197) [ENHANCEMENT] Update `polaris-data-table` to match Polaris v2.11.0 refactor
- [#214](https://github.com/smile-io/ember-polaris/pull/214) [ENHANCEMENT] Update `polaris-empty-state` to match Polaris v2.11.0
- [#216](https://github.com/smile-io/ember-polaris/pull/216) [ENHANCEMENT] Update `polaris-labelled` to match Polaris v2.11.0
- [#218](https://github.com/smile-io/ember-polaris/pull/218) [ENHANCEMENT] Update `polaris-page` to match Polaris v2.11.0 by adding `titleMetadata` and optional `primaryAction` button type override
- [#219](https://github.com/smile-io/ember-polaris/pull/219) [ENHANCEMENT] Update `polaris-date-picker` components to match Polaris v2.11.0
- [#221](https://github.com/smile-io/ember-polaris/pull/221) [ENHANCEMENT] Add `disabled` attribute to `polaris-choice` in `polaris-radio-button`
- [#225](https://github.com/smile-io/ember-polaris/pull/225) [ENHANCEMENT] Update `polaris-drop-zone` to accept Polaris v2.11.0 labelled attributes
- [#226](https://github.com/smile-io/ember-polaris/pull/226) [FEATURE] Add `polaris-sticky` component
- [#227](https://github.com/smile-io/ember-polaris/pull/227) [ENHANCEMENT] Update `polaris-text-field` to match Polaris v2.11.0
- [#230](https://github.com/smile-io/ember-polaris/pull/230) [ENHANCEMENT] Add `fullWidth` and `connectedTop` to `polaris-button-group`
- [#232](https://github.com/smile-io/ember-polaris/pull/232) [FEATURE] Add `polaris-select` component
- [#234](https://github.com/smile-io/ember-polaris/pull/234) [UPDATE] Drop Ember 2.12 support
- [#236](https://github.com/smile-io/ember-polaris/pull/236) [ENHANCEMENT] Add `destructive` attribute to `polaris-action-list/item`
- [#237](https://github.com/smile-io/ember-polaris/pull/237) [FIX] Prevent event bubbling on `polaris-action-list/item`'s `onAction` method
- [#241](https://github.com/smile-io/ember-polaris/pull/241) [FIX] Remove click event from `polaris-breadcrumb` action invocation arguments
- [#243](https://github.com/smile-io/ember-polaris/pull/243) [FIX] Update table cell heights when attrs are updated in `polaris-data-table`
- [#244](https://github.com/smile-io/ember-polaris/pull/244) [FIX] Fix bug where `polaris-data-table` cell heights weren't calculating correctly
- [#245](https://github.com/smile-io/ember-polaris/pull/245) [FIX] Fix initially-selected value on `polaris-select`

### v1.7.8 (October 10, 2018)
- [199](https://github.com/smile-io/ember-polaris/pull/199) [ENHANCEMENT] Add support for disabled and loading states to `polaris-setting-toggle`.

### v1.7.7 (October 8, 2018)
- [189](https://github.com/smile-io/ember-polaris/pull/189) [FIX] Detect length of decimal places in number as per expectations.

### v1.7.6 (October 5, 2018)
- [#181](https://github.com/smile-io/ember-polaris/pull/181) [internal] autofix code to use our latest eslint rules.

### v1.7.5 (October 4, 2018)
- [#173](https://github.com/smile-io/ember-polaris/pull/173) [internal] setup eslint, prettier & ember-template-lint.

### v1.7.4 (September 17, 2018)
- [#170](https://github.com/smile-io/ember-polaris/pull/170) [FIX] Allow class names on `polaris-callout-card`.

### v1.7.3 (August 21, 2018)
- [#163](https://github.com/smile-io/ember-polaris/pull/163) [ENHANCEMENT] Add `image` property to `polaris-action-list/item` component.

### v1.7.2 (July 27, 2018)
- [#159](https://github.com/smile-io/ember-polaris/pull/159) [DOCUMENTATION] Add notes about avoiding Glimmer error under dynamic usages of auto-wrapping components (`polaris-button-group`, `polaris-form-layout`, `polaris-form-layout/group` and `polaris-stack`).
- [#160](https://github.com/smile-io/ember-polaris/pull/160) [FIX] Replace img tag with `svg-jar` usage in `polaris-drop-zone` component to load images. `svg-jar` configuration in the host app isn't required to use this addon anymore.

### v1.7.1 (July 9, 2018)
- [#158](https://github.com/smile-io/ember-polaris/pull/158) [FIX] Pass textfield selectors to `polaris-text-field` event listener.

### v1.7.0 (July 9, 2018)
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

### v1.6.3 (July 5, 2018)
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
