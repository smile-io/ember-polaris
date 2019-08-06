import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-button/content';

@tagName('')
@layout(template)
export default class ContentComponent extends Component {
  @(computed('primary', 'destructive').readOnly())
  get spinnerColor() {
    let { primary, destructive } = this.getProperties('primary', 'destructive');
    return primary || destructive ? 'white' : 'inkLightest';
  }
}
