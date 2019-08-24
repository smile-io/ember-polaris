import { attribute, classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import layout from '../../templates/components/polaris-skeleton-page/action';

@classNames('Polaris-SkeletonPage__Action')
@templateLayout(layout)
export default class ActionComponent extends Component {
  @(computed().readOnly())
  get width() {
    return Math.round(Math.random() * 40 + 60);
  }

  @(computed('width').readOnly())
  @attribute
  get style() {
    return htmlSafe(`width: ${this.get('width')}px;`);
  }
}
