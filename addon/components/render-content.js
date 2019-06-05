import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/render-content';

@tagName('')
@templateLayout(layout)
export default class RenderContent extends Component {
  static positionalParams = 'content';

  content = null;

  @(notEmpty('content.componentName').readOnly())
  contentIsComponentHash;

  @(computed('content').readOnly())
  get contentIsComponentDefinition() {
    let contentConstructorName = this.get('content.constructor.name') || '';
    return contentConstructorName.indexOf('ComponentDefinition') > -1;
  }
}
