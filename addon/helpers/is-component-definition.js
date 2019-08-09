import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';

export function isComponentDefinition(content) {
  if (typeOf(content) !== 'object') {
    return false;
  }

  let contentPropNames = Object.keys(content);
  return Boolean(
    contentPropNames.find(
      (propName) => propName.indexOf('COMPONENT DEFINITION') > -1
    )
  );
}

export default helper(([content]) => isComponentDefinition(content));
