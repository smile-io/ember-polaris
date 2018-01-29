import Component from '@ember/component';
import layout from '../templates/components/wrapper-element';

/**
 * This is a simple utility component that lets us wrap block content
 * in e.g. a conditional element, since `tagName` must be constant.
 */
export default Component.extend({
  layout,
});
