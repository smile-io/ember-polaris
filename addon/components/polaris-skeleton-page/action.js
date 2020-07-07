import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-skeleton-page/action';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class PolarisSkeletonPageAction extends Component.extend(
  TaglessCssDeprecation
) {
  @computed()
  get width() {
    return Math.round(Math.random() * 40 + 60);
  }

  @computed('width')
  get style() {
    return htmlSafe(`width: ${this.width}px;`);
  }
}
