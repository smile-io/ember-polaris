import BaseComponent from './base';

export default BaseComponent.extend({
  tagName: 'button',
  attributeBindings: ['type'],

  type: 'button'
});
