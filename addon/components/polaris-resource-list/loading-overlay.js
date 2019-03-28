import Component from '@ember/component';

/**
 * Internal component used to DRY up rendering resource list loading state.
 */
export default Component.extend({
  loading: false,
  spinnerStyle: null,
  spinnerSize: null,
});
