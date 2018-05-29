# ember-polaris Changelog

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
