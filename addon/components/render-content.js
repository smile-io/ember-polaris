import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import layout from '../templates/components/render-content';

export default Component.extend({
  tagName: '',

  layout,

  content: null,

  contentIsComponentHash: notEmpty('content.componentName').readOnly(),

  contentIsComponentDefinition: computed('content', function() {
    let contentConstructorName = this.get('content.constructor.name') || '';
    return contentConstructorName.indexOf('ComponentDefinition') > -1;
  }).readOnly(),
}).reopenClass({
  positionalParams: ['content'],
});
