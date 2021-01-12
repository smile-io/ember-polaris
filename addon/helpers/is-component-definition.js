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
      return (
        propValue &&
        Object.keys(propValue).some((key) => key === 'ComponentClass')
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
