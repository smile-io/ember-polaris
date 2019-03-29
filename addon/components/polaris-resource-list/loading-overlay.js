import Component from '@ember/component';
import layout from '../../templates/components/polaris-resource-list/loading-overlay';

/**
 * Internal component used to DRY up rendering resource list loading state.
 */
export default Component.extend({
  tagName: '',

  layout,

  loading: false,
  spinnerStyle: null,
  spinnerSize: null,
});
