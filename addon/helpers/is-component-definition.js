import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';

// TODO look into getting rid of this concept
export function isComponentDefinition(content) {
  if (typeOf(content) !== 'object') {
    return false;
  }

  let contentPropNames = Object.keys(content);
  // This stopped working in Ember 3.17 when it was switched to use a Symbol instead
  // See https://github.com/glimmerjs/glimmer-vm/blob/master/CHANGELOG.md#v0450-2019-12-18 and
  // https://github.com/glimmerjs/glimmer-vm/pull/993 for more
  let isPreOctaneComponentDefinition = contentPropNames.some(
    (propName) => propName.indexOf('COMPONENT DEFINITION') > -1
  );

  return (
    isPreOctaneComponentDefinition ||
    content.constructor?.name === 'CurriedComponentDefinition'
  );
}

export default helper(([content]) => isComponentDefinition(content));
