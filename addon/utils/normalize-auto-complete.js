import { computed } from '@ember/object';

/**
 * Normalizes a boolean as a HTML auto-complete value
 *
 * @param {Boolean} autoComplete
 */
export function normalizeAutoComplete(autoComplete) {
  if (autoComplete == null) {
    return autoComplete;
  }

  return autoComplete ? 'on' : 'off';
}

/**
 * Takes a property name and normalizes as a HTML auto-complete value
 *
 * @param {String} autoCompleteProperty
 */
export function normalizeAutoCompleteProperty(autoCompleteProperty) {
  return computed(autoCompleteProperty, function () {
    let autoComplete = this.get(autoCompleteProperty);
    return normalizeAutoComplete(autoComplete);
  }).readOnly();
}
