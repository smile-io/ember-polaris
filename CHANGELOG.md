# Changelog


## [v6.0.0](https://github.com/smile-io/ember-polaris/tree/v6.0.0)

[Full Changelog](https://github.com/smile-io/ember-polaris/compare/v6.0.0-beta.0...v6.0.0)

:bug: Bugfixes

- Fix yielded `section` on sectioned `PolarisCard` [\#642](https://github.com/smile-io/ember-polaris/pull/642) ([andrewpye](https://github.com/andrewpye))



## [v6.0.0-beta.0](https://github.com/smile-io/ember-polaris/tree/v6.0.0-beta.0)

[Full Changelog](https://github.com/smile-io/ember-polaris/compare/v5.2.1...v6.0.0-beta.0)


:boom: Breaking Change

**All components** have been converted into tag-less components.
If you relied on any functionality that just worked in Ember with with non-tagless components *(ex: passing `class` argument, `tagName`, etc)*, these will no longer work. We've tried to keep backwards support as much as possible, especially with `class` arguments. Feel free to open a fix if you notice anything could have better backwards support.

- Misc updates for v6 [\#620](https://github.com/smile-io/ember-polaris/pull/620) ([vladucu](https://github.com/vladucu))
- Upgrade to Ember 3.18 [\#592](https://github.com/smile-io/ember-polaris/pull/592) ([vladucu](https://github.com/vladucu))

:house: Internal

- Update linting tools [\#637](https://github.com/smile-io/ember-polaris/pull/637) ([renovate[bot]](https://github.com/apps/renovate))
- Update Node.js to v12.18.2 [\#636](https://github.com/smile-io/ember-polaris/pull/636) ([renovate[bot]](https://github.com/apps/renovate))
- Pin dependencies [\#635](https://github.com/smile-io/ember-polaris/pull/635) ([renovate[bot]](https://github.com/apps/renovate))
- Update build tools \(major\) [\#632](https://github.com/smile-io/ember-polaris/pull/632) ([renovate[bot]](https://github.com/apps/renovate))
- Add deprecations for v6 [\#634](https://github.com/smile-io/ember-polaris/pull/634) ([vladucu](https://github.com/vladucu))
- Update dependency ember-cli-htmlbars to v5 [\#626](https://github.com/smile-io/ember-polaris/pull/626) ([renovate[bot]](https://github.com/apps/renovate))
- Update dependency ember-cli-code-coverage to v1.0.0-beta.9 [\#622](https://github.com/smile-io/ember-polaris/pull/622) ([renovate[bot]](https://github.com/apps/renovate))
- Improve backwards compatibility support [\#631](https://github.com/smile-io/ember-polaris/pull/631) ([vladucu](https://github.com/vladucu))
- Stop currying click event to action handlers [\#630](https://github.com/smile-io/ember-polaris/pull/630) ([vladucu](https://github.com/vladucu))
- Modernize date-picker component [\#619](https://github.com/smile-io/ember-polaris/pull/619) ([vladucu](https://github.com/vladucu))
- Modernize description-list component [\#618](https://github.com/smile-io/ember-polaris/pull/618) ([vladucu](https://github.com/vladucu))
- Modernize display-text component [\#617](https://github.com/smile-io/ember-polaris/pull/617) ([vladucu](https://github.com/vladucu))
- Modernize empty-search-result component [\#616](https://github.com/smile-io/ember-polaris/pull/616) ([vladucu](https://github.com/vladucu))
- Modernize connected component [\#615](https://github.com/smile-io/ember-polaris/pull/615) ([vladucu](https://github.com/vladucu))
- Modernize empty-state component [\#614](https://github.com/smile-io/ember-polaris/pull/614) ([vladucu](https://github.com/vladucu))
- Modernize footer-help component [\#613](https://github.com/smile-io/ember-polaris/pull/613) ([vladucu](https://github.com/vladucu))
- Modernize label component [\#612](https://github.com/smile-io/ember-polaris/pull/612) ([vladucu](https://github.com/vladucu))
- Modernize spinner component [\#611](https://github.com/smile-io/ember-polaris/pull/611) ([vladucu](https://github.com/vladucu))
- Modernize sticky component [\#610](https://github.com/smile-io/ember-polaris/pull/610) ([vladucu](https://github.com/vladucu))
- Modernize select component [\#609](https://github.com/smile-io/ember-polaris/pull/609) ([vladucu](https://github.com/vladucu))
- Modernize polaris-icon component [\#608](https://github.com/smile-io/ember-polaris/pull/608) ([vladucu](https://github.com/vladucu))
- Modernize form-layout component [\#607](https://github.com/smile-io/ember-polaris/pull/607) ([vladucu](https://github.com/vladucu))
- Modernize form component [\#606](https://github.com/smile-io/ember-polaris/pull/606) ([vladucu](https://github.com/vladucu))
- Modernize inline-error component [\#605](https://github.com/smile-io/ember-polaris/pull/605) ([vladucu](https://github.com/vladucu))
- Modernize list component [\#604](https://github.com/smile-io/ember-polaris/pull/604) ([vladucu](https://github.com/vladucu))
- Modernize text field [\#603](https://github.com/smile-io/ember-polaris/pull/603) ([vladucu](https://github.com/vladucu))
- Modernize text-container component [\#602](https://github.com/smile-io/ember-polaris/pull/602) ([vladucu](https://github.com/vladucu))
- Modernize tag component [\#601](https://github.com/smile-io/ember-polaris/pull/601) ([vladucu](https://github.com/vladucu))
- Modernize layout component [\#600](https://github.com/smile-io/ember-polaris/pull/600) ([vladucu](https://github.com/vladucu))
- Modernize page-actions component [\#599](https://github.com/smile-io/ember-polaris/pull/599) ([vladucu](https://github.com/vladucu))
- Modernize setting-toggle component [\#598](https://github.com/smile-io/ember-polaris/pull/598) ([vladucu](https://github.com/vladucu))
- Configure Renovate [\#595](https://github.com/smile-io/ember-polaris/pull/595) ([renovate[bot]](https://github.com/apps/renovate))
- Migrate to GitHub actions [\#594](https://github.com/smile-io/ember-polaris/pull/594) ([vladucu](https://github.com/vladucu))
- \[Security\] Bump websocket-extensions from 0.1.3 to 0.1.4 [\#581](https://github.com/smile-io/ember-polaris/pull/581) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump jquery from 3.4.1 to 3.5.0 [\#559](https://github.com/smile-io/ember-polaris/pull/559) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump broccoli-merge-trees from 3.0.2 to 4.2.0 [\#539](https://github.com/smile-io/ember-polaris/pull/539) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump acorn from 5.7.3 to 5.7.4 [\#525](https://github.com/smile-io/ember-polaris/pull/525) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Modernize polaris-popover components [\#511](https://github.com/smile-io/ember-polaris/pull/511) ([tomnez](https://github.com/tomnez))
- Modernize polaris-option-list components [\#510](https://github.com/smile-io/ember-polaris/pull/510) ([tomnez](https://github.com/tomnez))
- Modernize polaris-link component [\#509](https://github.com/smile-io/ember-polaris/pull/509) ([tomnez](https://github.com/tomnez))
- Modernize polaris-radio-button component [\#504](https://github.com/smile-io/ember-polaris/pull/504) ([tomnez](https://github.com/tomnez))
- Modernize polaris-pagination component [\#503](https://github.com/smile-io/ember-polaris/pull/503) ([tomnez](https://github.com/tomnez))
- Modernize polaris-resource-list components [\#502](https://github.com/smile-io/ember-polaris/pull/502) ([tomnez](https://github.com/tomnez))
- Modernize polaris-range-slider component [\#501](https://github.com/smile-io/ember-polaris/pull/501) ([tomnez](https://github.com/tomnez))
- Modernize polaris-text-style component [\#496](https://github.com/smile-io/ember-polaris/pull/496) ([tomnez](https://github.com/tomnez))
- Modernize polaris-progress-bar component [\#495](https://github.com/smile-io/ember-polaris/pull/495) ([tomnez](https://github.com/tomnez))
- Modernize polaris-data-table components [\#494](https://github.com/smile-io/ember-polaris/pull/494) ([tomnez](https://github.com/tomnez))
- Modernize polaris-color-picker components [\#493](https://github.com/smile-io/ember-polaris/pull/493) ([tomnez](https://github.com/tomnez))
- Bump node-sass from 4.13.0 to 4.13.1 [\#484](https://github.com/smile-io/ember-polaris/pull/484) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-cli-htmlbars from 4.0.9 to 4.2.2 [\#482](https://github.com/smile-io/ember-polaris/pull/482) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-resolver from 6.0.0 to 7.0.0 [\#471](https://github.com/smile-io/ember-polaris/pull/471) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump @ember/optional-features from 1.1.0 to 1.3.0 [\#470](https://github.com/smile-io/ember-polaris/pull/470) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump eslint-plugin-prettier from 3.1.1 to 3.1.2 [\#466](https://github.com/smile-io/ember-polaris/pull/466) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-cli-babel from 7.13.0 to 7.13.2 [\#465](https://github.com/smile-io/ember-polaris/pull/465) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-try from 1.3.0 to 1.4.0 [\#461](https://github.com/smile-io/ember-polaris/pull/461) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-template-lint from 1.8.2 to 1.10.0 [\#458](https://github.com/smile-io/ember-polaris/pull/458) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-source from 3.14.2 to 3.14.3 [\#457](https://github.com/smile-io/ember-polaris/pull/457) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-cli-htmlbars from 4.0.8 to 4.0.9 [\#456](https://github.com/smile-io/ember-polaris/pull/456) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump eslint from 6.7.1 to 6.7.2 [\#453](https://github.com/smile-io/ember-polaris/pull/453) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Modernize polaris-choice component [\#452](https://github.com/smile-io/ember-polaris/pull/452) ([vladucu](https://github.com/vladucu))
- Modernize polaris-choice-list component [\#451](https://github.com/smile-io/ember-polaris/pull/451) ([vladucu](https://github.com/vladucu))
- Modernize polaris-checkbox component [\#450](https://github.com/smile-io/ember-polaris/pull/450) ([vladucu](https://github.com/vladucu))
- Modernize polaris-caption component [\#449](https://github.com/smile-io/ember-polaris/pull/449) ([vladucu](https://github.com/vladucu))
- Modernize polaris-callout-card component [\#448](https://github.com/smile-io/ember-polaris/pull/448) ([vladucu](https://github.com/vladucu))
- Refactor polaris-button-group component [\#447](https://github.com/smile-io/ember-polaris/pull/447) ([vladucu](https://github.com/vladucu))
- Refactor polaris-breadcrumbs component [\#446](https://github.com/smile-io/ember-polaris/pull/446) ([vladucu](https://github.com/vladucu))
- Refactor polaris-banner component [\#445](https://github.com/smile-io/ember-polaris/pull/445) ([vladucu](https://github.com/vladucu))
- Refactor smaller misc components [\#424](https://github.com/smile-io/ember-polaris/pull/424) ([vladucu](https://github.com/vladucu))



## [v5.2.1](https://github.com/smile-io/ember-polaris/tree/v5.2.1) (August 9, 2019)

[Full Changelog](https://github.com/smile-io/ember-polaris/compare/v5.2.0...v5.2.1)

:bug: Bug Fix

- Fix component definition detection [\#365](https://github.com/smile-io/ember-polaris/pull/365) ([andrewpye](https://github.com/andrewpye))

:house: Internal

- Bump ember-resolver from 5.1.3 to 5.2.0 [\#356](https://github.com/smile-io/ember-polaris/pull/356) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump husky from 3.0.1 to 3.0.2 [\#354](https://github.com/smile-io/ember-polaris/pull/354) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump ember-qunit from 4.4.1 to 4.5.1 [\#352](https://github.com/smile-io/ember-polaris/pull/352) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump husky from 3.0.0 to 3.0.1 [\#350](https://github.com/smile-io/ember-polaris/pull/350) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))



### v5.2.0 (July 11, 2019)
- [#342](https://github.com/smile-io/ember-polaris/pull/342) [INTERNAL] Bump fs-extra from 8.0.1 to 8.1.0 & ember-auto-import from 1.4.1 to 1.5.1
- [#341](https://github.com/smile-io/ember-polaris/pull/341) [INTERNAL],[SECURITY] Bump lodash from 4.17.11 to 4.17.14
- [#340](https://github.com/smile-io/ember-polaris/pull/340) [INTERNAL],[SECURITY] Bump lodash.merge from 4.6.1 to 4.6.2
- [#339](https://github.com/smile-io/ember-polaris/pull/339) [INTERNAL],[SECURITY] Bump lodash.defaultsdeep from 4.6.0 to 4.6.1
- [#338](https://github.com/smile-io/ember-polaris/pull/338) [INTERNAL] Bump @shopify/javascript-utilities from 2.3.0 to 2.4.0
- [#334](https://github.com/smile-io/ember-polaris/pull/334) [INTERNAL] Bump ember-cli-code-coverage from 1.0.0-beta.4 to 1.0.0-beta.8
- [#333](https://github.com/smile-io/ember-polaris/pull/333) [INTERNAL] Bump husky from 2.5.0 to 3.0.0
- [#331](https://github.com/smile-io/ember-polaris/pull/331) [INTERNAL],[SECURITY] Bump tar from 2.2.1 to 2.2.2
- [#330](https://github.com/smile-io/ember-polaris/pull/330) [INTERNAL] Bump ember-cli-htmlbars from 3.0.1 to 3.1.0
- [#328](https://github.com/smile-io/ember-polaris/pull/328) [INTERNAL],[SECURITY] Bump jquery from 3.3.1 to 3.4.1

### V5.1.0 (July 8, 2019)
- [#327](https://github.com/smile-io/ember-polaris/pull/327) [BUG] Stop popover content from jumping around

### v5.0.0 (June 27, 2019)
- [#320](https://github.com/smile-io/ember-polaris/pull/320) [INTERNAL] Upgrade to ember 3.10

### v4.3.1 (June 24, 2019)
- [#325](https://github.com/smile-io/ember-polaris/pull/325) [ENHANCEMENT] Add the ability to disable shortcutActions in polaris resource list item
- [#319](https://github.com/smile-io/ember-polaris/pull/319) [BUG] Fix rendering choice-list child components
- [#318](https://github.com/smile-io/ember-polaris/pull/318) [ENHANCEMENT] Add support for choice-list extra component aka renderChildren

### v4.2.0 (May 10, 2019)
- [#318](https://github.com/smile-io/ember-polaris/pull/318) [ENHANCEMENT] Add childComponent support to `polaris-choice-list` choices

### v4.1.0 (April 25, 2019)
- [#285](https://github.com/smile-io/ember-polaris/pull/285) [UPDATE] Update action list to Polaris v3.10.0
- [#286](https://github.com/smile-io/ember-polaris/pull/286) [UPDATE] Update avatar to Polaris v3.10.0
- [#287](https://github.com/smile-io/ember-polaris/pull/287) [UPDATE] Update badge to Polaris v3.10.0
- [#288](https://github.com/smile-io/ember-polaris/pull/288) [UPDATE] Update banner to Polaris v3.10.0
- [#289](https://github.com/smile-io/ember-polaris/pull/289) [UPDATE] Update callout card to Polaris v3.10.0
- [#290](https://github.com/smile-io/ember-polaris/pull/290) [UPDATE] Update unstyled link to Polaris v3.10.0
- [#291](https://github.com/smile-io/ember-polaris/pull/291) [UPDATE] Update button to Polaris v3.10.0
- [#292](https://github.com/smile-io/ember-polaris/pull/292) [UPDATE] Update card to Polaris v3.10.0
- [#293](https://github.com/smile-io/ember-polaris/pull/293) [UPDATE] Update checkbox to Polaris v3.10.0
- [#294](https://github.com/smile-io/ember-polaris/pull/294) [UPDATE] Update choice property descriptions
- [#295](https://github.com/smile-io/ember-polaris/pull/295) [INTERNAL] Upgrade to Ember CLI `3.8.1`
- [#296](https://github.com/smile-io/ember-polaris/pull/296) [INTERNAL] Update misc dependencies
- [#297](https://github.com/smile-io/ember-polaris/pull/297) [UPDATE] Update data table to Polaris v3.10.0
- [#298](https://github.com/smile-io/ember-polaris/pull/298) [UPDATE] Update date picker to Polaris v3.10.0
- [#299](https://github.com/smile-io/ember-polaris/pull/299) [UPDATE] Update drop zone to Polaris v3.10.0
- [#300](https://github.com/smile-io/ember-polaris/pull/300) [UPDATE] Update empty search result to Polaris v3.10.0
- [#301](https://github.com/smile-io/ember-polaris/pull/301) [UPDATE] Update form to Polaris v3.10.0
- [#302](https://github.com/smile-io/ember-polaris/pull/302) [UPDATE] Update form layout to Polaris v3.10.0
- [#303](https://github.com/smile-io/ember-polaris/pull/303) [UPDATE] Update layout to Polaris v3.10.0
- [#304](https://github.com/smile-io/ember-polaris/pull/304) [UPDATE] Update link to Polaris v3.10.0
- [#305](https://github.com/smile-io/ember-polaris/pull/305) [UPDATE] Update option list to Polaris v3.10.0
- [#306](https://github.com/smile-io/ember-polaris/pull/306) [UPDATE] Update resource list to Polaris v3.10.0
- [#307](https://github.com/smile-io/ember-polaris/pull/307) [UPDATE] Update skeleton page to Polaris v3.10.0
- [#308](https://github.com/smile-io/ember-polaris/pull/308) [UPDATE] Update spinner to Polaris v3.10.0
- [#309](https://github.com/smile-io/ember-polaris/pull/309) [UPDATE] Update text style to Polaris v3.10.0
- [#310](https://github.com/smile-io/ember-polaris/pull/310) [UPDATE] Update text field to Polaris v3.10.0
- [#311](https://github.com/smile-io/ember-polaris/pull/311) [UPDATE] Update page to Polaris v3.10.0
- [#313](https://github.com/smile-io/ember-polaris/pull/313) [FIX] Fix spinner icon paths
- [#314](https://github.com/smile-io/ember-polaris/pull/314) [FIX] Remove event object from button mouse action handler invocations
- [#315](https://github.com/smile-io/ember-polaris/pull/315) [FEATURE] Add `polaris-skeleton-thumbnail` component
- [#316](https://github.com/smile-io/ember-polaris/pull/316) [FIX] Make text field "focus" property writeable

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
