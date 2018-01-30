import Component from '@ember/component';
import layout from '../templates/components/wrapper-element';

/**
 * This is a simple utility component that lets us do things like wrap block content
 * in a conditional element, since `tagName` can't be a computed property.
 */
export default Component.extend({
  layout,
});
