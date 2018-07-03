import Component from '@ember/component';
import layout from '../templates/components/render-content';

export default Component.extend({
  layout,

  tagName: '',

  content: null,
}).reopenClass({
  positionalParams: ['content'],
});
