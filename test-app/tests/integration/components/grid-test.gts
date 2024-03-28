import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { Grid, formatAreas } from '@smile-io/ember-polaris';

const xsAreas = ['xs1 xs2 xs3'];
const smAreas = ['sm1', 'sm2 sm3'];
const mdAreas = ['md1', 'md2', 'md3'];
const lgAreas = ['lg1', 'lg2', 'lg3'];
const xlAreas = ['xl1', 'xl2', 'xl3'];

module('Integration | Component | grid', function (hooks) {
  setupRenderingTest(hooks);

  test('applies grid-template-areas as custom properties', async function (assert) {
    await render(
      <template>
        <Grid
          data-test-grid
          @areas={{hash xs=xsAreas sm=smAreas md=mdAreas lg=lgAreas xl=xlAreas}}
        />
      </template>
    );

    assert.customDom('[data-test-grid]').hasStyle({
      '--pc-grid-areas-xs': formatAreas(xsAreas),
      '--pc-grid-areas-sm': formatAreas(smAreas),
      '--pc-grid-areas-md': formatAreas(mdAreas),
      '--pc-grid-areas-lg': formatAreas(lgAreas),
      '--pc-grid-areas-xl': formatAreas(xlAreas),
    });
  });

  test('renders inline custom properties for custom columns', async function (assert) {
    await render(
      <template><Grid data-test-grid @columns={{hash xs=1 sm=3 md=7 lg=12 xl=12}} /></template>
    );

    assert.customDom('[data-test-grid]').hasStyle({
      '--pc-grid-columns-xs': '1',
      '--pc-grid-columns-sm': '3',
      '--pc-grid-columns-md': '7',
      '--pc-grid-columns-lg': '12',
      '--pc-grid-columns-xl': '12',
    });
  });

  test('renders inline custom properties for custom gaps', async function (assert) {
    await render(
      <template>
        <Grid
          data-test-grid
          @gap={{hash
            xs="var(--p-space-100)"
            sm="var(--p-space-100)"
            md="var(--p-space-200)"
            lg="var(--p-space-400)"
            xl="var(--p-space-400)"
          }}
        />
      </template>
    );

    assert.customDom('[data-test-grid]').hasStyle({
      '--pc-grid-gap-xs': 'var(--p-space-100)',
      '--pc-grid-gap-sm': 'var(--p-space-100)',
      '--pc-grid-gap-md': 'var(--p-space-200)',
      '--pc-grid-gap-lg': 'var(--p-space-400)',
      '--pc-grid-gap-xl': 'var(--p-space-400)',
    });
  });

  module('formatAreas', function () {
    test('formats a single area', function (assert) {
      const areas = ['area1'];
      assert.equal(formatAreas(areas), "'area1'");
    });

    test('formats multiple areas', function (assert) {
      const areas = ['area1 area2 area3'];
      assert.equal(formatAreas(areas), "'area1 area2 area3'");
    });

    test('formats multiple grouped areas', function (assert) {
      const areas = ['area1 area2 area3', 'area4 area5 area6'];
      assert.equal(formatAreas(areas), "'area1 area2 area3' 'area4 area5 area6'");
    });
  });
});
