import Component from '@ember/component';
import { computed } from '@ember/object';
import { compileTemplate as compile } from '@ember/template-compilation';
import { assign } from '@ember/polyfills';

// Renders a named component with a passed-in hash of properties.
// This effectively allows us to spread/splat a props hash onto
// another component.
//
// Example - dynamically rendering a my-button component with some props:
//   {{component-proxy
//     componentName="my-button"
//     props=(hash
//       buttonText="Click me"
//       onClick=(action "onButtonClicked")
//     )
//   }}
export default Component.extend({
  tagName: '',

  /**
   * Dynamically-generated layout to render the proxied component.
   * @private
   */
  layout: computed('componentName', 'propsString', function() {
    let { componentName, propsString } = this.getProperties(
      'componentName',
      'propsString'
    );

    return compile(`
      {{#if hasBlock}}
        {{#component "${componentName}"${propsString}}}
          {{yield}}
        {{/component}}
      {{else}}
        {{component "${componentName}"${propsString}}}
      {{/if}}
    `);
  }).readOnly(),

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

  /**
   * List of properties that were previously set via the `props` hash.
   * @type {Array}
   * @private
   */
  propNames: null,

  /**
   * String representing the properties to pass to the proxied component.
   * @type {String}
   * @private
   */
  propsString: computed('propNames.[]', function() {
    let propNames = this.get('propNames') || [];
    return propNames.reduce((propsString, propName) => {
      return `${propsString} ${propName}=${propName}`;
    }, '');
  }).readOnly(),

  updateProps() {
    // Unset any properties that were set previously and are now undefined,
    // spread the new passed-in props hash into our component's context,
    // and make a note of which properties are currently set.
    let oldPropNames = this.get('propNames') || [];
    let props = this.get('props') || {};
    let propNames = Object.keys(props);

    let propsToUnset = oldPropNames.reduce((propsToUnset, propName) => {
      propsToUnset[propName] = undefined;
      return propsToUnset;
    }, {});

    let newProps = assign(propsToUnset, props, { propNames });
    this.setProperties(newProps);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.updateProps();
  },
});
