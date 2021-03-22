import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-skeleton-page/action';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisSkeletonPageAction extends Component {
  @computed()
  get width() {
    return Math.round(Math.random() * 40 + 60);
  }

  @computed('width')
  get style() {
    return htmlSafe(`width: ${this.width}px;`);
  }
}
