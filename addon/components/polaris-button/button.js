import { computed } from '@ember/object';
import BaseComponent from './base';

export default BaseComponent.extend({
  tagName: 'button',
  attributeBindings: [
    'type',
  ],

  type: computed('submit', function() {
    return this.get('submit') === true ? 'submit' : 'button';
  }).readOnly(),
});
