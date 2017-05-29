import BaseComponent from './base';

export default BaseComponent.extend({
  tagName: 'a',
  attributeBindings: ['url:href']
});
