import { computed } from '@ember/object';

function makeComputedIdGenerator(idGenerator) {
  return function(idPath) {
    return computed(idPath, function() {
      return idGenerator(this.get(idPath));
    });
  };
}

export function labelId(id) {
  return `${id}Label`;
}
export const computedLabelId = makeComputedIdGenerator(labelId);

export function errorId(id) {
  return `${id}Error`;
}
export const computedErrorId = makeComputedIdGenerator(errorId);

export function helpTextId(id) {
  return `${id}HelpText`;
}
export const computedHelpTextId = makeComputedIdGenerator(helpTextId);
