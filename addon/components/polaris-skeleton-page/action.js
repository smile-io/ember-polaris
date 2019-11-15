import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-skeleton-page/action';

@tagName('')
@layout(template)
export default class SkeletonPageActionComponent extends Component {
  @computed()
  get width() {
    return Math.round(Math.random() * 40 + 60);
  }

  @computed('width')
  get style() {
    return htmlSafe(`width: ${this.get('width')}px;`);
  }
}
