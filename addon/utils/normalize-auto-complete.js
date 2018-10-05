import { computed } from '@ember/object';

/**
 * Normalizes a boolean property as a HTML auto-complete value
 *
 * @param {Boolean} autoCompleteProperty
 */
export default function normalizeAutoComplete(autoCompleteProperty) {
  return computed(autoCompleteProperty, function() {
    let autoComplete = this.get(autoCompleteProperty);
    if (autoComplete == null) {
      return autoComplete;
    }

    return autoComplete ? 'on' : 'off';
  }).readOnly();
}
