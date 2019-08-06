import Component from '@ember/component';
import { computed } from '@ember/object';
import { classNames, tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-button/content';

@tagName('span')
@classNames('Polaris-Button__Content')
@layout(template)
export default class ContentComponent extends Component {
  text = null;
  primary = false;
  destructive = false;
  loading = false;
  disclosure = false;
  icon = null;

  @(computed('primary', 'destructive').readOnly())
  get spinnerColor() {
    let { primary, destructive } = this.getProperties('primary', 'destructive');
    return primary || destructive ? 'white' : 'inkLightest';
  }
}
