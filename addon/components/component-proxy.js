import Component from '@ember/component';
import { computed } from '@ember/object';
import Ember from 'ember';

// Renders another component with a passed-in hash of properties.
// This effectively allows us to spread/splat a props hash onto
// another component.
//
// Example: dynamically render a my-button component with some props:
//   {{component-renderer
//     componentName="my-button"
//     props=(hash
//       buttonText="Click me"
//       onClick=(action "onButtonClicked")
//     )
//   }}
export default Component.extend({
  tagName: '',

  /**
   * The name of the component to render.
   * @type {String}
   * @public
   * @required
   */
  componentName: null,

  /**
   * Optional hash of properties to pass to the component being rendered.
   * @type {Object}
   * @public
   */
  props: null,

  layout: computed('componentName', 'propsString', function() {
    let { componentName, propsString } = this.getProperties('componentName', 'propsString');
    return Ember.HTMLBars.compile(`
      {{#if hasBlock}}
        {{#component "${ componentName }"${ propsString }}}
          {{yield}}
        {{/component}}
      {{else}}
        {{component "${ componentName }"${ propsString }}}
      {{/if}}
    `);
  }).readOnly(),

  propsString: computed('props', function() {
    let props = this.get('props') || {};
    return Object.keys(props).reduce((propsString, propName) => {
      return `${propsString} ${ propName }=${ propName }`;
    }, '');
  }).readOnly(),

  didReceiveAttrs() {
    this._super(...arguments);

    // Spread the passed-in props hash into our component's context.
    this.setProperties(this.get('props') || {});
  },
});
