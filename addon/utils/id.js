import { computed } from '@ember/object';

function makeComputedIdGenerator(idGenerator) {
  return function(idPath, variation) {
    return computed(idPath, function() {
      return idGenerator(this.get(idPath), variation);
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

export function idVariation(id, suffix) {
  return `${id}${suffix}`;
}
export const computedIdVariation = makeComputedIdGenerator(idVariation);
