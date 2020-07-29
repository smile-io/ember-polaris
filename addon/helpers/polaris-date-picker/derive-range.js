import { helper } from '@ember/component/helper';
import { isPresent, typeOf } from '@ember/utils';

export function deriveRange(selected) {
  if (isPresent(selected) && typeOf(selected) === 'date') {
    return { start: selected, end: selected };
  }

  return selected;
}

export default helper(function ([selected]) {
  return deriveRange(selected);
});
