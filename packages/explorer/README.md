# Explorer

This is an application dedicated to running [Storybook](https://storybook.js.org/) to explore Polaris.

Multiple pipelines need to be run sequentially for this: this ember-cli application, `ember-polaris` & storybook's one.

**NOTE:** There's no easy way currently to have hot-reload working when changing `ember-polaris` component implementations _(you need to restart Storybook)_, however, story updates should work.
You need to start pipelines sequentially, in different windows & wait until they finished loading.

```bash
# Start `ember-polaris` (packages/ember-polaris)
pnpm start

# Start `explorer` application (packages/explorer)
pnpm start

# Finally, start Storybook
pnpm storybook
```
