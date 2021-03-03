import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';

// TODO look into getting rid of this concept
export function isComponentDefinition(content) {
  if (typeOf(content) !== 'object') {
    return false;
  }

  // Glimmer now uses Symbol keys in its component definitions so we check those first.
  let symbolPropKeys = Object.getOwnPropertySymbols?.(content);
  if (symbolPropKeys?.length) {
    let isGlimmerComponentDefinition = symbolPropKeys.some((symbolPropKey) => {
      let propValue = content[symbolPropKey];
      // The check for `__container__` is due to an update in Ember 3.25.1 where ComponentClass
      // is no longer a key in the INNER symbol. As far as I can tell the combination of Symbols
      // and having a `__container__` key is specific only to components. Passing other objects
      // such as JS objects, Ember objects, hashes, or services, etc, do not share these traits.
      return (
        propValue &&
        Object.keys(propValue).some(
          (key) => key === 'ComponentClass' || key === '__container__'
        )
      );
    });

    if (isGlimmerComponentDefinition) {
      return true;
    }
  }

  let contentPropNames = Object.keys(content);
  let isPreOctaneComponentDefinition = contentPropNames.some(
    (propName) => propName.indexOf('COMPONENT DEFINITION') > -1
  );

  return (
    isPreOctaneComponentDefinition ||
    content.constructor?.name === 'CurriedComponentDefinition'
  );
}

export default helper(([content]) => isComponentDefinition(content));
