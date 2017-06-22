import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-icon', 'Integration | Component | polaris icon', {
  integration: true
});

const iconSelector = 'span.Polaris-Icon';

test('it renders the specified icon correctly', function(assert) {
  this.render(hbs`
    {{polaris-icon source="notes"}}
  `);

  const icons = findAll(iconSelector);
  assert.equal(icons.length, 1, 'renders one icon component');

  const svgSelector = buildNestedSelector(iconSelector, 'svg.Polaris-Icon__Svg');
  const svgs = findAll(svgSelector);
  assert.equal(svgs.length, 1, 'renders one SVG element');
});

/*
<span class="Polaris-Icon Polaris-Icon--colorTealDark" aria-label="blargh">
  <svg class="Polaris-Icon__Svg" viewBox="0 0 20 20"><path d="M6 11h8V9H6v2zm0 4h8v-2H6v2zm0-8h4V5H6v2zm9.707-1.707l-3-3A.996.996 0 0 0 12 2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a.997.997 0 0 0-.293-.707z" fill-rule="evenodd"></path></svg>
</span>
*/
