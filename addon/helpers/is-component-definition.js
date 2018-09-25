import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';

export function isComponentDefinition([content]) {
  if (typeOf(content) !== 'object') {
    return false;
  }

  let contentConstructorName = content.constructor.name || '';
  return contentConstructorName.indexOf('ComponentDefinition') > -1;
}

export default helper(isComponentDefinition);
