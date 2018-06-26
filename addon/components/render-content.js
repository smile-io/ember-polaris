import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/render-content';

export default Component.extend({
  tagName: '',

  layout,

  content: null,

  contentIsComponent: computed('content', function() {
    let contentConstructorName = this.get('content.constructor.name') || '';
    return contentConstructorName.indexOf('ComponentDefinition') > -1;
  }).readOnly(),
}).reopenClass({
  positionalParams: ['content'],
});
