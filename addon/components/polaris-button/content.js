import { classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-button/content';

/**
 * Internal component to keep rendering button content DRY.
 */
@tagName('span')
@classNames('Polaris-Button__Content')
@templateLayout(layout)
export default class Content extends Component {
  // Properties passed down from parent polaris-button component.
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
