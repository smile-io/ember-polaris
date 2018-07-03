import { helper } from '@ember/component/helper';

// Helper to allow array access from templates.
// This is only needed to support Ember 2.12,
// which doesn't allow passing non-string keys
// to the `get` helper. If we stop supporting
// Ember 2.12, we can remove this helper and
// replace its usages with the existing `get`
// helper.
export function getArrayItem([array, index]) {
  return array[index];
}

export default helper(getArrayItem);
