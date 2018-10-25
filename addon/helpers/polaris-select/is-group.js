import { helper } from '@ember/component/helper';

export function isGroup(option) {
  return option.options != null;
}

export default helper(([option]) => isGroup(option));
