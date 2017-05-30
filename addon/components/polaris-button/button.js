import BaseComponent from './base';
import Ember from 'ember';

const {
  computed,
} = Ember;

export default BaseComponent.extend({
  tagName: 'button',
  attributeBindings: [
    'type',
  ],

  type: computed('submit', function() {
    return this.get('submit') === true ? 'submit' : 'button';
  }).readOnly(),
});
